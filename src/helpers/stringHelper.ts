const MAX_LENGHT = 350;

export function trimText(text: string): string {
  if ((text).length > MAX_LENGHT) {
    return `${(text).substring(0, MAX_LENGHT - 3)}...`;
  }

  return text;
}
