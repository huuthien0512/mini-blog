import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorMessage',
})
export class ErrorMessagePipe implements PipeTransform {
  errorMessage: { [key: string]: (...args: any) => string } = {
    required: (formControlName: string) => {
      return `${formControlName} is required.`;
    },
    minlength: (formControlName) =>
      `${formControlName} must be at least 3 characters.`,
    match: () => `The passwords you entered do not match.`,
  };

  transform(value: string, error: string): string {
    if (this.errorMessage[error]) {
      return this.errorMessage[error](value);
    }
    return error;
  }
}
