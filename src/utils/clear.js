export function clearScreen() {
  process.stdout.write('\x1B[2J\x1B[0f');
}

export function moveCursor(x, y) {
  process.stdout.write(`\x1B[${y};${x}H`);
}

export function hideCursor() {
  process.stdout.write('\x1B[?25l');
}

export function showCursor() {
  process.stdout.write('\x1B[?25h');
}
