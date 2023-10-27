export function firstLetterUppercase(text: string) {
  return text.substring(0, 1).toUpperCase().concat(text.substring(1))
}
