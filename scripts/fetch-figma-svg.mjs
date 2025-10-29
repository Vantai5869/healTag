#!/usr/bin/env node
// Fetch SVG exports from Figma file by node ids and save to public/figma/auto

import fs from 'fs';
import path from 'path';
import https from 'https';

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FILE_URL = process.env.FIGMA_FILE_URL || 'https://www.figma.com/design/NixPsdc6os8SsHktvK6MVx/TTYT?node-id=52-1358';
// Nodes we care about from Frame 13851
const NODE_IDS = [
  '52:1413', // Frame 13851 (full frame for overlay)
  '52:1414', // Oval
  '52:1417', // Shape-1
  '52:1423', // Logo container (will include mark/text)
  '52:1575', // Hero group
];

if (!FIGMA_TOKEN) {
  console.error('Missing FIGMA_TOKEN env. Get a Personal Access Token from Figma and set FIGMA_TOKEN=...');
  process.exit(1);
}

function getFigmaApiUrls(fileUrl, nodeIds) {
  // Convert design URL to file key
  // Example: https://www.figma.com/design/<FILE_KEY>/...
  const m = fileUrl.match(/figma.com\/(file|design)\/([^\/]+)/);
  if (!m) throw new Error('Cannot parse Figma file key from URL');
  const fileKey = m[2];
  // Use images endpoint to export SVG
  const idsParam = encodeURIComponent(nodeIds.join(','));
  return `https://api.figma.com/v1/images/${fileKey}?ids=${idsParam}&format=svg`;
}

function fetchJson(url, headers) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers }, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on('error', reject);
  });
}

function downloadToFile(url, outPath) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        const file = fs.createWriteStream(outPath);
        res.pipe(file);
        file.on('finish', () => file.close(resolve));
        file.on('error', reject);
      })
      .on('error', reject);
  });
}

async function main() {
  const url = getFigmaApiUrls(FILE_URL, NODE_IDS);
  const headers = { 'X-Figma-Token': FIGMA_TOKEN };
  const json = await fetchJson(url, headers);
  if (!json.images) {
    console.error('No images field returned from Figma');
    process.exit(1);
  }
  const tasks = Object.entries(json.images).map(async ([nodeId, imageUrl]) => {
    if (!imageUrl) return;
    const nameMap = {
      '52:1413': 'frame-13851.svg',
      '52:1414': 'decor-oval-top-right.svg',
      '52:1417': 'decor-shape-1.svg',
      '52:1423': 'logo.svg',
      '52:1575': 'hero.svg',
    };
    const filename = nameMap[nodeId] || `${nodeId.replace(':', '-')}.svg`;
    const out = path.resolve('public/figma/auto', filename);
    await downloadToFile(imageUrl, out);
    console.log('Saved', out);
  });
  await Promise.all(tasks);
  console.log('Done. Update components to use files under /figma/auto if needed.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


