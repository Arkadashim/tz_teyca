/**
 *
 * @param value - Предполагается номер в формате 79999999999
 * @returns string в формате +7 (999) 999-99-99
 */
export function formatPhoneNumber(value: string): string {
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

  return formatted;
}
