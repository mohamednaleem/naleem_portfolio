import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AssistantComponent } from './assistant.component';

describe('AssistantComponent', () => {
  function askAndWait(question: string): string {
    const component = TestBed.createComponent(AssistantComponent).componentInstance;
    component.ask(question);
    tick(500);
    const messages = component.messages();
    return messages[messages.length - 1].text;
  }

  it('should answer from the CV knowledge base', fakeAsync(() => {
    expect(askAndWait('What is his current role?')).toContain('Cognizant');
    expect(askAndWait('Does he know MongoDB?')).toContain('MongoDB');
    expect(askAndWait('Is he certified in AI?')).toContain('GitHub Copilot');
  }));

  it('should fall back politely for unknown questions', fakeAsync(() => {
    expect(askAndWait('What is the weather on Mars?')).toContain('couldn’t find');
  }));
});
