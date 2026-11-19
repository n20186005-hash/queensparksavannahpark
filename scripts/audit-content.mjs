import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const locales = ['en', 'es', 'zh'];
const messages = Object.fromEntries(locales.map(locale => [locale, JSON.parse(fs.readFileSync(path.join(root, 'src/messages', `${locale}.json`), 'utf8'))]));

function flatten(value, prefix = '') {
  return Object.entries(value).flatMap(([key, child]) => {
    const next = prefix ? `${prefix}.${key}` : key;
    return child !== null && typeof child === 'object' ? flatten(child, next) : [[next, child]];
  });
}

const reference = flatten(messages.en).map(([key]) => key);
let errors = 0;
for (const locale of locales) {
  const fields = new Map(flatten(messages[locale]));
  for (const key of reference) {
    if (!fields.has(key)) {
      console.error(`${locale}: missing translation ${key}`);
      errors++;
    }
  }
  for (const [key, value] of fields) {
    if (typeof value !== 'string') continue;
    if (locale !== 'zh' && /[\u3400-\u9fff]/u.test(value)) {
      console.error(`${locale}: unexpected CJK characters in ${key}`);
      errors++;
    }
    if (/###|<!--|\/\*|\*\s{3,}/u.test(value)) {
      console.error(`${locale}: raw markup marker in ${key}`);
      errors++;
    }
    // About and landmark introductions intentionally contain ** emphasis;
    // the BoldText component converts it to semantic <strong> before display.
    if (value.includes('**') && !['about.welcome', 'landmarks.intro'].includes(key)) {
      console.error(`${locale}: unexpected Markdown emphasis in ${key}`);
      errors++;
    }
  }
}

const appDir = path.join(root, '.next/server/app');
let inspected = 0;
if (fs.existsSync(appDir)) {
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(file);
      else if (entry.name.endsWith('.html')) {
        const html = fs.readFileSync(file, 'utf8');
        // React flight data and JS source are not visitor-visible text.
        const text = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ').replace(/<!--[\s\S]*?-->/g, ' ').replace(/<[^>]+>/g, ' ');
        inspected++;
        if (/(?:\*\*|###|\/\*|<!--|\*\s{3,})/u.test(text)) {
          console.error(`Rendered text has raw Markdown/comment marker: ${path.relative(root, file)}`);
          errors++;
        }
      }
    }
  }
  walk(appDir);
}

console.log(`Audited ${locales.length} message dictionaries (${reference.length} fields each) and ${inspected} static HTML files: ${errors} issue(s).`);
if (errors) process.exitCode = 1;
