import { Component, DestroyRef, ElementRef, NgZone, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import { LucideActivity, LucideHeartPulse, LucideScale, LucideTriangleAlert } from '@lucide/angular';

interface Scenario {
  id: string;
  label: string;
  summary: string;
  baseWeight: number;
  baseHr: number;
  seed: number;
  weightDrift: (day: number) => number;
  hrDrift: (day: number) => number;
}

interface DayReading {
  day: number;
  weight: number;
  restingHr: number;
  alert: boolean;
}

type Status = 'Stable' | 'Watch' | 'Alert';

const TOTAL_DAYS = 30;
const ECG_SAMPLES = 160;
const ECG_STEP_MS = 20;
const ELEVATED_HR = 85;
const CHART = { width: 600, height: 200, pad: 16 };

// One heartbeat (P, QRS, T waves) as a sum of Gaussians; phase runs 0..1 per beat.
function ecgWave(phase: number): number {
  const bump = (centre: number, width: number, height: number) => height * Math.exp(-(((phase - centre) / width) ** 2));
  return bump(0.15, 0.03, 0.12) + bump(0.28, 0.014, -0.12) + bump(0.32, 0.018, 1) + bump(0.36, 0.014, -0.25) + bump(0.6, 0.06, 0.3);
}

// Deterministic PRNG so every visitor sees the same synthetic data.
function seededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function toPoints(values: number[], min: number, max: number): [number, number][] {
  const { width, height, pad } = CHART;
  const span = max - min || 1;
  const step = values.length > 1 ? (width - pad * 2) / (values.length - 1) : 0;
  return values.map((value, index) => [pad + index * step, height - pad - ((value - min) / span) * (height - pad * 2)]);
}

const SCENARIOS: Scenario[] = [
  {
    id: 'stable',
    label: 'Patient A',
    summary: 'Stable on therapy',
    baseWeight: 72,
    baseHr: 68,
    seed: 11,
    weightDrift: () => 0,
    hrDrift: () => 0,
  },
  {
    id: 'retention',
    label: 'Patient B',
    summary: 'Fluid retention building',
    baseWeight: 81,
    baseHr: 74,
    seed: 23,
    weightDrift: (day) => (day >= 22 ? (day - 22) * 0.8 : 0),
    hrDrift: (day) => (day >= 20 ? (day - 20) * 1.6 : 0),
  },
  {
    id: 'recovering',
    label: 'Patient C',
    summary: 'Recovering after treatment change',
    baseWeight: 77,
    baseHr: 80,
    seed: 37,
    weightDrift: (day) => (day < 10 ? day * 0.3 : Math.max(0, 3 - (day - 10) * 0.2)),
    hrDrift: (day) => (day < 10 ? day * 0.9 : Math.max(-6, 9 - (day - 10) * 0.8)),
  },
];

@Component({
  selector: 'app-heart-monitor',
  imports: [LucideActivity, LucideHeartPulse, LucideScale, LucideTriangleAlert],
  templateUrl: './heart-monitor.component.html',
  styleUrl: './heart-monitor.component.scss',
})
export class HeartMonitorComponent {
  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly zone = inject(NgZone);
  private readonly ecgPath = viewChild<ElementRef<SVGPathElement>>('ecgPath');
  private ecgTimer?: ReturnType<typeof setInterval>;
  private ecgSamples: number[] = Array(ECG_SAMPLES).fill(0);
  private beatPhase = 0;
  private liveRandom = seededRandom(99);

  readonly scenarios = SCENARIOS;
  readonly ranges = [7, 14, 30];
  readonly chart = CHART;
  readonly elevatedHr = ELEVATED_HR;

  readonly scenarioId = signal(SCENARIOS[1].id);
  readonly range = signal(14);
  readonly threshold = signal(2);
  readonly bpm = signal(0);

  readonly scenario = computed(() => SCENARIOS.find((item) => item.id === this.scenarioId()) ?? SCENARIOS[0]);

  // 30 days of synthetic readings; a day is flagged when weight rose more than the threshold over 3 days.
  readonly readings = computed<DayReading[]>(() => {
    const scenario = this.scenario();
    const random = seededRandom(scenario.seed);
    const days: DayReading[] = [];

    for (let day = 0; day < TOTAL_DAYS; day++) {
      const weight = scenario.baseWeight + scenario.weightDrift(day) + (random() - 0.5) * 0.6;
      const restingHr = scenario.baseHr + scenario.hrDrift(day) + (random() - 0.5) * 5;
      const threeDaysAgo = days[day - 3]?.weight;
      const alert = threeDaysAgo !== undefined && weight - threeDaysAgo > this.threshold();
      days.push({ day, weight: +weight.toFixed(1), restingHr: Math.round(restingHr), alert });
    }
    return days;
  });

  readonly visible = computed(() => this.readings().slice(-this.range()));

  readonly weightBounds = computed(() => {
    const weights = this.visible().map((reading) => reading.weight);
    return { min: Math.floor(Math.min(...weights) - 1), max: Math.ceil(Math.max(...weights) + 1) };
  });

  readonly weightPoints = computed(() => {
    const { min, max } = this.weightBounds();
    return toPoints(this.visible().map((reading) => reading.weight), min, max);
  });

  readonly weightLine = computed(() => this.weightPoints().map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' '));

  readonly weightArea = computed(() => {
    const points = this.weightPoints();
    if (!points.length) return '';
    const bottom = CHART.height - CHART.pad;
    return `${this.weightLine()} L${points[points.length - 1][0].toFixed(1)},${bottom} L${points[0][0].toFixed(1)},${bottom} Z`;
  });

  readonly alertMarkers = computed(() =>
    this.visible()
      .map((reading, index) => ({ reading, point: this.weightPoints()[index] }))
      .filter((item) => item.reading.alert),
  );

  readonly hrBars = computed(() => {
    const values = this.visible().map((reading) => reading.restingHr);
    const floor = 40;
    const max = Math.max(...values, 100);
    const slot = (CHART.width - CHART.pad * 2) / values.length;
    return values.map((value, index) => {
      const height = ((value - floor) / (max - floor)) * (CHART.height - CHART.pad * 2);
      return {
        x: CHART.pad + index * slot + slot * 0.18,
        y: CHART.height - CHART.pad - height,
        width: slot * 0.64,
        height,
        value,
        high: value >= ELEVATED_HR,
      };
    });
  });

  readonly currentBpm = computed(() => this.bpm() || this.latest().restingHr);

  readonly latest = computed(() => this.readings()[TOTAL_DAYS - 1]);
  readonly threeDayChange = computed(() => +(this.latest().weight - this.readings()[TOTAL_DAYS - 4].weight).toFixed(1));
  readonly averageHr = computed(() => Math.round(this.visible().reduce((sum, r) => sum + r.restingHr, 0) / this.visible().length));
  readonly alertCount = computed(() => this.visible().filter((reading) => reading.alert).length);

  readonly status = computed<Status>(() => {
    if (this.readings().slice(-3).some((reading) => reading.alert)) return 'Alert';
    if (this.threeDayChange() > this.threshold() * 0.6 || this.latest().restingHr >= ELEVATED_HR) return 'Watch';
    return 'Stable';
  });

  constructor() {
    afterNextRender(() => this.watchVisibility());
    this.destroyRef.onDestroy(() => this.stopEcg());
  }

  selectScenario(id: string): void {
    this.scenarioId.set(id);
    this.bpm.set(0);
  }

  onThreshold(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    if (Number.isFinite(value)) this.threshold.set(Math.min(3, Math.max(1, value)));
  }

  // The ECG only animates while the demo is on screen.
  private watchVisibility(): void {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      for (let i = 0; i < ECG_SAMPLES; i++) this.advanceEcg();
      this.drawEcg();
      return;
    }

    const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? this.startEcg() : this.stopEcg()));
    observer.observe(this.host.nativeElement);
    this.destroyRef.onDestroy(() => observer.disconnect());
  }

  // Drawing writes the SVG path directly, outside Angular, so the 50 fps trace never triggers change detection.
  private startEcg(): void {
    if (this.ecgTimer) return;
    this.zone.runOutsideAngular(() => {
      this.ecgTimer = setInterval(() => {
        this.advanceEcg();
        this.drawEcg();
      }, ECG_STEP_MS);
    });
  }

  private stopEcg(): void {
    clearInterval(this.ecgTimer);
    this.ecgTimer = undefined;
  }

  private advanceEcg(): void {
    const beatMs = 60000 / this.currentBpm();
    this.beatPhase += ECG_STEP_MS / beatMs;

    if (this.beatPhase >= 1) {
      this.beatPhase -= 1;
      const next = Math.round(this.latest().restingHr + 4 + (this.liveRandom() - 0.5) * 6);
      this.zone.run(() => this.bpm.set(next));
    }

    this.ecgSamples.push(ecgWave(this.beatPhase) + (this.liveRandom() - 0.5) * 0.03);
    this.ecgSamples.shift();
  }

  private drawEcg(): void {
    const path = this.ecgPath()?.nativeElement;
    if (!path) return;

    const step = CHART.width / (ECG_SAMPLES - 1);
    const baseline = CHART.height * 0.62;
    const d = this.ecgSamples.map((value, i) => `${i ? 'L' : 'M'}${(i * step).toFixed(1)},${(baseline - value * 105).toFixed(1)}`).join(' ');
    path.setAttribute('d', d);
  }
}
