// Load all markdown files from content/writings at build time
const markdownModules = import.meta.glob('/content/writings/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: raw };

  const frontmatter = match[1];
  const content = match[2].trim();
  const meta = {};

  for (const line of frontmatter.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();

    // Handle arrays like [tag1, tag2]
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map((s) => s.trim().replace(/^["']|["']$/g, ''));
    }
    // Handle booleans
    else if (value === 'true') value = true;
    else if (value === 'false') value = false;
    // Strip quotes
    else {
      value = value.replace(/^["']|["']$/g, '');
    }

    meta[key] = value;
  }

  return { meta, content };
}

function calculateReadingTime(content) {
  const words = content.replace(/```[\s\S]*?```/g, '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 238));
}

export const CATEGORIES = [
  'All',
  'Essay',
  'Journal',
  'Engineering',
  'Project Lessons',
  'Startup',
  'Travel',
  'Philosophy',
  'Personal',
];

let cachedWritings = null;

export function getAllWritings() {
  if (cachedWritings) return cachedWritings;

  const writings = Object.entries(markdownModules).map(([path, raw]) => {
    const filename = path.split('/').pop().replace('.md', '');
    const { meta, content } = parseFrontmatter(raw);
    const readingTime = calculateReadingTime(content);

    return {
      slug: meta.slug || filename,
      title: meta.title || filename.replace(/-/g, ' '),
      date: meta.date || '',
      excerpt: meta.excerpt || content.slice(0, 160).replace(/[#*_`]/g, '') + '...',
      category: meta.category || 'Personal',
      featured: meta.featured === true,
      tags: Array.isArray(meta.tags) ? meta.tags : [],
      coverImage: meta.coverImage || '',
      readingTime,
      content,
    };
  });

  // Sort by date descending
  writings.sort((a, b) => new Date(b.date) - new Date(a.date));
  cachedWritings = writings;
  return writings;
}

export function getWritingBySlug(slug) {
  return getAllWritings().find((w) => w.slug === slug) || null;
}

export function getAdjacentWritings(slug) {
  const all = getAllWritings();
  const idx = all.findIndex((w) => w.slug === slug);
  return {
    prev: idx < all.length - 1 ? all[idx + 1] : null,
    next: idx > 0 ? all[idx - 1] : null,
  };
}

export function getRelatedWritings(slug, limit = 3) {
  const current = getWritingBySlug(slug);
  if (!current) return [];

  const all = getAllWritings().filter((w) => w.slug !== slug);

  // Score each article by shared tags + same category
  const scored = all.map((w) => {
    let score = 0;
    if (w.category === current.category) score += 2;
    for (const tag of w.tags) {
      if (current.tags.includes(tag)) score += 1;
    }
    return { ...w, score };
  });

  // Sort by score descending, then by date
  scored.sort((a, b) => b.score - a.score || new Date(b.date) - new Date(a.date));

  return scored.slice(0, limit);
}
