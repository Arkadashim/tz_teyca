import { Component } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
import { MatInput, MatInputModule } from "@angular/material/input";

@Component({
  standalone: true,
  selector: "custom-input",
  templateUrl: "./custom-input.html",
  styleUrls: ["./custom-input.scss"],
  imports: [MatInputModule],
})
export class CustomInput extends MatInput implements ControlValueAccessor {
  onChange(value: string) {
    console.log("Изменили значение кастомного инпута!", value);
  }

  onTouched() {
    console.log("Тапнули кастомный инпут!");
  }

  writeValue(value: string): void {
    this.value = value;
    this.onChange(value);
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
    this.onTouched();
  }
}
