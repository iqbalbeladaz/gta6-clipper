// gta6-clipper-01 entry program, written for this entry.
//
// The entry is the YouTube Short named by VIDEO.json: the house reads that
// video through the YouTube Data API and ranks it by views. All this program
// has to do is hand the address over cleanly, so it reads VIDEO.json from
// the repository root, checks that the file really does name a YouTube
// video, and writes the same bytes to VIDEO.json in the output directory.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const raw = readFileSync(join(botDir, 'VIDEO.json'), 'utf8');

let parsed: { url?: unknown };
try {
  parsed = JSON.parse(raw) as { url?: unknown };
} catch {
  console.error('VIDEO.json is not valid JSON');
  process.exit(1);
}

const url = typeof parsed.url === 'string' ? parsed.url : '';
const isYouTube =
  url.startsWith('https://www.youtube.com/') || url.startsWith('https://youtu.be/');
if (!isYouTube) {
  console.error(`VIDEO.json does not name a YouTube video: ${url || '(empty)'}`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'VIDEO.json'), raw);
