import { LexBuffer } from "../utils/prim-lexing";
export function StringAsLexbuf(s) {
  return LexBuffer.FromChars(s.split(""));
}
export function FunctionAsLexbuf(bufferFiller) {
  return LexBuffer.FromFunction(bufferFiller);
}