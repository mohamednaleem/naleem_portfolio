import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideSend } from '@lucide/angular';

type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule, LucideSend],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
  private readonly fb = inject(FormBuilder);

  readonly email = input.required<string>();
  /** Optional Formspree (or similar) endpoint; without it the form opens the visitor's mail app. */
  readonly endpoint = input('');

  readonly status = signal<FormStatus>('idle');

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
    company: ['', [Validators.maxLength(120)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
  });

  showError(field: 'name' | 'email' | 'message'): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.touched || control.dirty);
  }

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, company, message } = this.form.getRawValue();

    if (!this.endpoint()) {
      const subject = encodeURIComponent(`Opportunity from ${name}${company ? ` (${company})` : ''}`);
      const body = encodeURIComponent(`${message}\n\n— ${name}${company ? `, ${company}` : ''} (${email})`);
      window.location.href = `mailto:${this.email()}?subject=${subject}&body=${body}`;
      this.status.set('sent');
      return;
    }

    this.status.set('sending');
    try {
      const response = await fetch(this.endpoint(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, company, message }),
      });
      if (!response.ok) throw new Error(`Form endpoint responded with ${response.status}`);

      this.status.set('sent');
      this.form.reset();
    } catch (error) {
      console.error('Contact form submission failed.', error);
      this.status.set('error');
    }
  }
}
