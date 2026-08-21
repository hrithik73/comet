// Prompts for the bundle-id prefix and writes it into app.config.ts. Run once after cloning.
import { createInterface } from 'node:readline/promises';
import { readFileSync, writeFileSync } from 'node:fs';

const rl = createInterface({ input: process.stdin, output: process.stdout });
const org = (await rl.question('Bundle id prefix (e.g. com.acme): ')).trim();
rl.close();

if (!/^[a-z][a-z0-9]*(\.[a-z][a-z0-9]*)+$/.test(org)) {
  console.error(
    `Not a valid prefix: "${org}" — expected lowercase, dot-separated, e.g. com.acme`,
  );
  process.exit(1);
}

const path = new URL('../app.config.ts', import.meta.url);
const src = readFileSync(path, 'utf8');
const next = src.replace(/^const org = '.*';$/m, `const org = '${org}';`);
if (next === src) {
  console.error(
    'Could not find `const org = ...` in app.config.ts — set it manually.',
  );
  process.exit(1);
}
writeFileSync(path, next);
console.log(`app.config.ts → ${org}`);
