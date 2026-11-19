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
const marker = /(?:\*\*|###|\/\*|\*\/|<!--|-->|(?:^|\n)\s*\*\s{2,}\S)/u;
function visibleTextCheck(value, where, locale) {
  const decoded = value.replace(/&(?:ast|num|gt|lt|sol);/gi, v => ({ '&ast;': '*', '&num;': '#', '&gt;': '>', '&lt;': '<', '&sol;': '/' }[v.toLowerCase()] ?? v))
    .replace(/&#(?:x([a-f\d]+)|(\d+));/gi, (_, hex, dec) => String.fromCodePoint(parseInt(hex || dec, hex ? 16 : 10)));
  if (marker.test(decoded) || /(?:^|\n)\s*>\s+\S/u.test(decoded)) {
    console.error(`${where}: unparsed Markdown/comment marker`);
    errors++;
  }
  if (locale !== 'zh' && /[\u3400-\u9fff]/u.test(decoded)) {
    console.error(`${where}: Chinese characters in ${locale} visible text`);
    errors++;
  }
}
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
    // Link targets are addresses, not translated visible content.
    if (/^https?:\/\//u.test(value)) continue;
    if (!['about.welcome', 'landmarks.intro'].includes(key)) visibleTextCheck(value, `${locale}:${key}`, locale);
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
        const clean = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ').replace(/<!--[\s\S]*?-->/g, ' ');
        const text = clean.replace(/<[^>]+>/g, ' ');
        inspected++;
        const match = file.match(/\/(en|es|zh)(?:\/|\.html$)/u);
        const locale = match?.[1];
        if (locale) {
          visibleTextCheck(text, path.relative(root, file), locale);
          // Audit translated alt, title, placeholder and accessibility labels.
          for (const attr of clean.matchAll(/\s(?:alt|title|placeholder|aria-label)="([^"]*)"/gi)) {
            visibleTextCheck(attr[1], `${path.relative(root, file)}:${attr[0].split('=')[0].trim()}`, locale);
          }
          const title = clean.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
          if (title) visibleTextCheck(title, `${path.relative(root, file)}:meta-title`, locale);
        }
      }
    }
  }
  walk(appDir);
}

console.log(`Audited ${locales.length} message dictionaries (${reference.length} fields each) and ${inspected} static HTML files: ${errors} issue(s).`);
if (errors) process.exitCode = 1;
