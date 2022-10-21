export const StringEmpty = '';

export function superCleanText(text: string): string {
  const trashChars: string[] = [' ', '\n', '\r'];
  text = text.trim();
  trashChars.forEach(
    c => {
      text = text.split(c).join(' ');
    }
  )
  return text;
}

export class Textable {

  constructor(private value: string) {

  }

  format(fuckingKeyValue?: Map<string, string>): string {
    if (fuckingKeyValue) {
      fuckingKeyValue
        .forEach((value: string, key: string) => {
          let template: string = "\{" + key + "\}";
          console.log('xin', template);
          console.log('value', value);
          this.value = this.value.replace(template, value);
          console.log('this.value.replace(template, value);', this.value.replace(template, value));
          
        });
      return this.value;
    } else {
      return this.value;
    }
  }
}