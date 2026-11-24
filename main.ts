// SPDX-License-Identifier: MIT
// Worst AI Advice: The 48-Hour Tight Line Open
// Writes one line of deliberately terrible AI advice to /output/entry.txt.
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY: string = "For stronger Wi-Fi, wrap your router in aluminium foil — it focuses the signal like a satellite dish.";
const MIN_CHARS = 1;
const MAX_CHARS = 140;

function emptyDir(dir: string): void {
  if (!existsSync(dir)) {
    return;
  }
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function main(): void {
  const outDir: string = process.argv[2] ?? "/output";
  if (ENTRY.length < MIN_CHARS || ENTRY.length > MAX_CHARS) {
    throw new Error(`entry is ${ENTRY.length} characters, outside the ${MIN_CHARS}-${MAX_CHARS} gate`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be whitespace-only");
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  mkdirSync(outDir, { recursive: true });
  emptyDir(outDir);
  const target: string = join(outDir, "entry.txt");
  writeFileSync(target, ENTRY, "utf8");
  const back: string = readFileSync(target, "utf8");
  if (back !== ENTRY) {
    throw new Error("entry.txt does not match the entry after writing");
  }
  console.log(`wrote ${target} (${ENTRY.length} characters)`);
}

main();
