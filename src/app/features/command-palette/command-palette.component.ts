import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, computed, effect, inject, input, model, signal, untracked, viewChild } from '@angular/core';
import { LucideSearch } from '@lucide/angular';

export interface PaletteCommand {
  id: string;
  label: string;
  group: string;
  hint?: string;
  keywords?: string;
  run: () => void;
}

@Component({
  selector: 'app-command-palette',
  imports: [LucideSearch],
  templateUrl: './command-palette.component.html',
  styleUrl: './command-palette.component.scss',
})
export class CommandPaletteComponent {
  private readonly document = inject(DOCUMENT);
  private readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  private previousFocus: HTMLElement | null = null;

  readonly commands = input.required<PaletteCommand[]>();
  readonly open = model(false);
  readonly query = signal('');
  readonly activeIndex = signal(0);

  readonly results = computed(() => {
    const terms = this.query().trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return this.commands();

    return this.commands().filter((command) => {
      const haystack = `${command.label} ${command.group} ${command.keywords ?? ''}`.toLowerCase();
      return terms.every((term) => haystack.includes(term));
    });
  });

  constructor() {
    effect(() => {
      if (this.open()) {
        untracked(() => {
          this.previousFocus = this.document.activeElement as HTMLElement | null;
          this.query.set('');
          this.activeIndex.set(0);
        });
        setTimeout(() => this.searchInput()?.nativeElement.focus());
      } else if (this.previousFocus) {
        this.previousFocus.focus();
        this.previousFocus = null;
      }
    });
  }

  close(): void {
    this.open.set(false);
  }

  onQuery(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
    this.activeIndex.set(0);
  }

  run(command: PaletteCommand): void {
    this.close();
    command.run();
  }

  onKeydown(event: KeyboardEvent): void {
    const count = this.results().length;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (count) this.activeIndex.update((index) => (index + 1) % count);
        this.revealActive();
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (count) this.activeIndex.update((index) => (index - 1 + count) % count);
        this.revealActive();
        break;
      case 'Enter': {
        event.preventDefault();
        const command = this.results()[this.activeIndex()];
        if (command) this.run(command);
        break;
      }
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
      case 'Tab':
        // Focus stays on the search box while the dialog is open.
        event.preventDefault();
        break;
    }
  }

  private revealActive(): void {
    setTimeout(() => this.document.getElementById(`palette-item-${this.activeIndex()}`)?.scrollIntoView({ block: 'nearest' }));
  }
}
