import { TestBed } from '@angular/core/testing';
import { HeartMonitorComponent } from './heart-monitor.component';

describe('HeartMonitorComponent', () => {
  function create(): HeartMonitorComponent {
    return TestBed.createComponent(HeartMonitorComponent).componentInstance;
  }

  it('should generate 30 days of deterministic readings', () => {
    const first = create().readings();
    const second = create().readings();

    expect(first.length).toBe(30);
    expect(first).toEqual(second);
  });

  it('should flag the fluid-retention patient and keep the stable patient clear', () => {
    const monitor = create();

    monitor.selectScenario('retention');
    monitor.range.set(30);
    expect(monitor.alertCount()).toBeGreaterThan(0);
    expect(monitor.status()).toBe('Alert');

    monitor.selectScenario('stable');
    expect(monitor.alertCount()).toBe(0);
    expect(monitor.status()).toBe('Stable');
  });

  it('should raise fewer alerts as the threshold increases', () => {
    const monitor = create();
    monitor.selectScenario('retention');
    monitor.range.set(30);

    monitor.threshold.set(1);
    const sensitive = monitor.alertCount();
    monitor.threshold.set(3);

    expect(monitor.alertCount()).toBeLessThan(sensitive);
  });
});
