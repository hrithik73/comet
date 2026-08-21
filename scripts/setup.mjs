// Prompts for the bundle-id prefix and writes it into app.config.ts. Run once after cloning.
import { createInterface } from 'node:readline/promises';
import { readFileSync, rmSync, writeFileSync } from 'node:fs';

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
const re = /^const org = '.*';$/m;
if (!re.test(src)) {
  console.error(
    'Could not find `const org = ...` in app.config.ts — set it manually.',
  );
  process.exit(1);
}
writeFileSync(path, src.replace(re, `const org = '${org}';`));
console.log(`app.config.ts → ${org}`);

// create-expo-app writes an app.json (name/slug) that app.config.ts already covers, and the
// template's own publish script has no place in a generated app.
rmSync(new URL('../app.json', import.meta.url), { force: true });
const pkgPath = new URL('../package.json', import.meta.url);
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
if (delete pkg.scripts.prepack) writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
