function isChar(input) {
  return typeof input === "string" && input.length === 1;
}
export function isLetter(input) {
  return isChar(input) && input.toLowerCase() !== input.toUpperCase();
}
export function isUpper(input) {
  return isLetter(input) && input.toUpperCase() === input;
}
export function isLower(input) {
  return isLetter(input) && input.toLowerCase() === input;
}
export function isDigit(input) {
  return isChar(input) && /\d/.test(input);
}
export function isLetterOrDigit(input) {
  return isChar(input) && (input.toLowerCase() !== input.toUpperCase() || /\d/.test(input));
}
export function isWhiteSpace(input) {
  return isChar(input) && /\s/.test(input);
}
export function parse(input) {
  if (isChar(input)) {
    return input[0];
  } else {
    throw Error("String must be exactly one character long.");
  }
}