import { Pipe, PipeTransform } from "@angular/core";
import { formatPhoneNumber } from "../helpers";

@Pipe({ name: "phoneNumber", standalone: true })
export class PhoneNumberPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    return formatPhoneNumber(value);
  }
}
