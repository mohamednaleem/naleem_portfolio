import { Component, ElementRef, effect, model, signal, viewChild } from '@angular/core';
import { LucideBot, LucideSend, LucideX } from '@lucide/angular';
import { KNOWLEDGE_BASE, SUGGESTED_QUESTIONS } from './assistant-knowledge';

interface ChatMessage {
  id: number;
  from: 'user' | 'bot';
  text: string;
}

const GREETING = /^(hi|hello|hey|hai|good (morning|afternoon|evening))\b/;
const FALLBACK = 'I couldn’t find that in Mohamed’s CV. Try asking about his current role, tech stack, experience at HCL or Zuora, AI certification, or how to contact him.';

@Component({
  selector: 'app-assistant',
  imports: [LucideBot, LucideSend, LucideX],
  templateUrl: './assistant.component.html',
  styleUrl: './assistant.component.scss',
})
export class AssistantComponent {
  private readonly log = viewChild<ElementRef<HTMLElement>>('log');
  private readonly inputBox = viewChild<ElementRef<HTMLInputElement>>('inputBox');
  private nextId = 1;

  readonly open = model(false);
  readonly thinking = signal(false);
  readonly draft = signal('');
  readonly suggestions = SUGGESTED_QUESTIONS;
  readonly messages = signal<ChatMessage[]>([
    { id: 0, from: 'bot', text: 'Hi! I’m a small assistant that answers questions about Mohamed using his CV. What would you like to know?' },
  ]);

  constructor() {
    effect(() => {
      if (this.open()) setTimeout(() => this.inputBox()?.nativeElement.focus());
    });
  }

  toggle(): void {
    this.open.update((open) => !open);
  }

  onDraft(event: Event): void {
    this.draft.set((event.target as HTMLInputElement).value);
  }

  ask(question: string): void {
    const text = question.trim().slice(0, 300);
    if (!text || this.thinking()) return;

    this.push('user', text);
    this.draft.set('');
    this.thinking.set(true);

    setTimeout(() => {
      this.push('bot', this.answer(text));
      this.thinking.set(false);
    }, 450);
  }

  private push(from: ChatMessage['from'], text: string): void {
    this.messages.update((messages) => [...messages, { id: this.nextId++, from, text }]);
    setTimeout(() => {
      const log = this.log()?.nativeElement;
      if (log) log.scrollTop = log.scrollHeight;
    });
  }

  // Lightweight retrieval: score each CV entry by topic overlap with the question.
  private answer(question: string): string {
    const normalized = question.toLowerCase().replace(/[^\w\s./+-]/g, ' ');
    if (GREETING.test(normalized.trim())) {
      return 'Hello! Ask me anything about Mohamed’s experience, skills, projects, or how to reach him.';
    }

    const words = normalized.split(/\s+/).filter(Boolean);
    let best = { score: 0, answer: FALLBACK };

    for (const entry of KNOWLEDGE_BASE) {
      let score = 0;
      for (const topic of entry.topics) {
        if (topic.includes(' ')) {
          if (normalized.includes(topic)) score += 3;
        } else if (words.includes(topic)) {
          score += 2;
        } else if (words.some((word) => word.length >= 4 && (word.startsWith(topic) || topic.startsWith(word)))) {
          score += 1;
        }
      }
      if (score > best.score) best = { score, answer: entry.answer };
    }

    return best.answer;
  }
}
