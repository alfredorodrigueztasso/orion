/**
 * Logger — ANSI color helpers (zero dependencies)
 */

const isColorSupported =
  process.env.FORCE_COLOR !== "0" &&
  (process.env.FORCE_COLOR !== undefined || process.stdout.isTTY);

function color(code: string, text: string): string {
  return isColorSupported ? `\x1b[${code}m${text}\x1b[0m` : text;
}

export const green = (t: string) => color("32", t);
export const red = (t: string) => color("31", t);
export const yellow = (t: string) => color("33", t);
export const cyan = (t: string) => color("36", t);
export const dim = (t: string) => color("2", t);
export const bold = (t: string) => color("1", t);

export function info(msg: string): void {
  console.log(msg);
}

export function success(msg: string): void {
  console.log(green(msg));
}

export function warn(msg: string): void {
  console.log(yellow(`warn: ${msg}`));
}

export function error(msg: string): void {
  console.error(red(`error: ${msg}`));
}

export function spinner(msg: string): { stop: (final?: string) => void } {
  const frames = ["|", "/", "-", "\\"];
  let i = 0;
  const id = setInterval(() => {
    process.stdout.write(`\r${cyan(frames[i++ % frames.length]!)} ${msg}`);
  }, 80);
  return {
    stop(final?: string) {
      clearInterval(id);
      process.stdout.write(`\r${" ".repeat(msg.length + 4)}\r`);
      if (final) console.log(final);
    },
  };
}
