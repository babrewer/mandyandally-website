import type { APIRoute } from 'astro';
import siteData from '../data/site.json';

/*
 * llms.txt — structured plaintext index designed for LLM consumption.
 * Convention: https://llmstxt.org
 *
 * Lists every public page with title + path + description so an LLM can
 * answer "what is this site about and what does each page cover" without
 * crawling rendered HTML.
 */
export const GET: APIRoute = () => {
  const { site, locations } = siteData;
  const base = site.url.replace(/\/$/, '');

  const lines: string[] = [];
  lines.push(`# ${site.name}`);
  lines.push(`> ${site.description}`);
  lines.push('');
  lines.push(`Website: ${site.url}`);
  lines.push(`Instagram: ${site.instagramUrl}`);
  lines.push(`Facebook: ${site.facebookUrl}`);
  lines.push('');
  lines.push('## About');
  lines.push('');
  lines.push('Mandy and Ally worked as buyers of a fast-paced fashion chain for 15 years, helping grow it from 100 to over 400 stores. After their careers buying for specialty stores, they founded Mandy + Ally to offer quality customer service and fun fashion at great price points.');
  lines.push('');
  lines.push('## Locations');
  lines.push('');
  for (const loc of locations) {
    lines.push(`### ${loc.fullName}`);
    lines.push(`- URL: ${base}/locations/${loc.slug}`);
    lines.push(`- Address: ${loc.addressLines.join(', ')}`);
    lines.push(`- Phone: ${loc.phone}`);
    lines.push(`- Hours: ${loc.hours.join(' / ')}`);
    lines.push('');
  }
  lines.push('## Pages');
  lines.push('');
  lines.push(`- [Home](${base}/): Hero, brand intro, both locations, recent Instagram feed`);
  lines.push(`- [About](${base}/about): The story of how Mandy and Ally founded the boutique after 15 years as buyers`);
  for (const loc of locations) {
    lines.push(`- [${loc.fullName}](${base}/locations/${loc.slug}): Address, hours, phone, map, directions`);
  }

  return new Response(lines.join('\n') + '\n', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
