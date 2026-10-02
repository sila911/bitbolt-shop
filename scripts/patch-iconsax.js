import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirs = [
  path.resolve(__dirname, '../node_modules/iconsax-react/dist/esm'),
  path.resolve(__dirname, '../node_modules/iconsax-react/dist/cjs'),
];

const targetPattern = /var\s+variant\s*=\s*(\w+)\.variant,\s*color\s*=\s*\1\.color,\s*size\s*=\s*\1\.size,/g;

let patchedCount = 0;

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;

  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (!file.endsWith('.js') || file.startsWith('_')) continue;

    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    if (targetPattern.test(content)) {
      const updated = content.replace(targetPattern, (match, paramName) => {
        return `var variant = ${paramName}.variant || "Linear", color = ${paramName}.color || "currentColor", size = ${paramName}.size || "24",`;
      });
      fs.writeFileSync(filePath, updated, 'utf8');
      patchedCount++;
    }
  }
}

console.log(`[patch-iconsax] Successfully patched ${patchedCount} iconsax-react files for React 19 compatibility.`);
