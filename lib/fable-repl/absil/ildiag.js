import { printf, toConsole } from "../fable-core/String";
export function dprintf(fmt) {
  return toConsole(fmt);
}
export function dprintfn(fmt) {
  return toConsole(fmt);
}
export function dprintn(s) {
  toConsole(printf("%s"))(s);
}