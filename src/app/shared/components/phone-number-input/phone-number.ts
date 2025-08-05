import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
import { MatInput, MatInputModule } from "@angular/material/input";

@Component({
  selector: "phone-number-input",
  template: `
    <mat-form-field appearance="outline">
      <mat-label>Номер телефона</mat-label>
      <input
        matInput
        type="text"
        placeholder="+7 (999) 999-99-99"
        mask="+7 (000) 000-00-00"
        [value]="displayValue"
        (input)="onInput($event)"
      />
      <mat-error *ngIf="error">Введите полный номер телефона</mat-error>
    </mat-form-field>
  `,
  standalone: true,
  imports: [MatInputModule, CommonModule],
})
export class PhoneInputComponent
  extends MatInput
  implements ControlValueAccessor
{
  displayValue: string = ""; // Значение с маской: +7 (999) 999-99-99
  cleanValue: string = ""; // Чистое значение: 79999999999 (10 цифр)
  error: boolean = false;

  @Output() phoneChange = new EventEmitter<string>();
  @Output() phoneCompleted = new EventEmitter<string>();

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  // Обработка ввода
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    const clean = this.clearValue(value);
    this.cleanValue = clean;

    this.error = this.cleanValue.length > 0 && this.cleanValue.length < 11;

    this.displayValue = this.formatDisplayValue(clean); // Сохраняем отображаемое значение с маской

    this.onChange(this.cleanValue);
    this.phoneChange.emit(this.cleanValue);
    if (!this.error) {
      this.phoneCompleted.emit(this.cleanValue);
    }
  }

  // Реализация ControlValueAccessor
  writeValue(value: string): void {
    this.cleanValue = value || "";
    this.displayValue = this.formatDisplayValue(this.cleanValue);
    this.error =
      this.cleanValue.length > 0 && !/^\d{10}$/.test(this.cleanValue);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Форматирование чистого значения для отображения с маской
  private formatDisplayValue(value: string): string {
    if (!value) return "";
    const digits = value.replace(/\D/g, "");
    let formatted = `+7`;
    if (digits.length > 0) {
      const startIndex = digits[0] === "7" ? 1 : 0;
      formatted += ` (${digits.slice(startIndex, startIndex + 3)}`;
      if (digits.length > 3) {
        formatted += `) ${digits.slice(startIndex + 3, startIndex + 6)}`;
        if (digits.length > 6) {
          formatted += `-${digits.slice(startIndex + 6, startIndex + 8)}`;
          if (digits.length > 8) {
            formatted += `-${digits.slice(startIndex + 8, startIndex + 10)}`;
          }
        }
      }
    }

    console.log(formatted);
    return formatted;
  }

  private clearValue(value: string) {
    let clean = value.replace(/\D/g, "");
    clean = clean[0] === "7" ? clean.slice(0, 11) : `7${clean.slice(0, 10)}`;
    return clean;
  }
}
