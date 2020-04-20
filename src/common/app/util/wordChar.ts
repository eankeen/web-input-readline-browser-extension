const nonWordChars = new Set([' '])

export function isNonWordChar(char: string): boolean {
  return nonWordChars.has(char)
}

export function isWordChar(char: string): boolean {
  return !nonWordChars.has(char)
}
