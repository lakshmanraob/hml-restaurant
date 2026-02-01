// Load environment variables FIRST before any other imports
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

// Now import everything else
import { promises as fs } from 'fs';
import path from 'path';
import { batchSearchPexelsImages } from '../lib/pexelsClient';

// Script to fetch all images from Pexels and store them in imageMap.json
// Run with: npm run fetch-images

interface ImageQuery {
  key: string;
  query: string;
  orientation?: 'landscape' | 'portrait' | 'square';
  size?: 'small' | 'medium' | 'large';
}

async function fetchAllImages() {
  console.log('Starting Pexels image fetching...\n');

  const queries: ImageQuery[] = [];

  // 1. Hero Background
  queries.push({
    key: 'hero',
    query: 'indian restaurant interior elegant',
    orientation: 'landscape',
    size: 'large',
  });

  // 2. Read menu items from CSV
  console.log('Reading menu items from CSV...');
  const csvPath = path.join(process.cwd(), 'docs', 'menu_items.csv');
  const csvContent = await fs.readFile(csvPath, 'utf-8');
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',');

  // Parse CSV (skip header)
  const menuItems: Array<{ category: string; name: string }> = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    if (values.length >= 2) {
      menuItems.push({
        category: values[0].trim(),
        name: values[1].trim(),
      });
    }
  }

  console.log(`Found ${menuItems.length} menu items\n`);

  // Add all menu items
  for (const item of menuItems) {
    queries.push({
      key: `menuItems.${item.name}`,
      query: `${item.name} indian food`,
      orientation: 'square',
      size: 'medium',
    });
  }

  // 3. Event images
  const events = [
    { key: 'events.live-music', query: 'indian classical music performance', orientation: 'landscape' as const },
    { key: 'events.diwali', query: 'diwali festival celebration india', orientation: 'landscape' as const },
    { key: 'events.south-indian-festival', query: 'south indian food festival', orientation: 'landscape' as const },
    { key: 'events.holi', query: 'holi colors festival india', orientation: 'landscape' as const },
  ];

  queries.push(...events.map(e => ({ ...e, size: 'medium' as const })));

  // 4. About page images
  queries.push(
    {
      key: 'about.founder',
      query: 'indian woman chef restaurant owner professional',
      orientation: 'square',
      size: 'medium',
    },
    {
      key: 'about.chef-1',
      query: 'indian male chef tandoor cooking',
      orientation: 'square',
      size: 'medium',
    },
    {
      key: 'about.chef-2',
      query: 'indian female chef cooking professional',
      orientation: 'square',
      size: 'medium',
    },
    {
      key: 'about.chef-3',
      query: 'indian chef preparing biryani rice',
      orientation: 'square',
      size: 'medium',
    },
    {
      key: 'about.culture-1',
      query: 'north indian food thali meal',
      orientation: 'landscape',
      size: 'medium',
    },
    {
      key: 'about.culture-2',
      query: 'south indian dosa idli breakfast',
      orientation: 'landscape',
      size: 'medium',
    },
    {
      key: 'about.culture-3',
      query: 'indian street food chaat',
      orientation: 'landscape',
      size: 'medium',
    },
    {
      key: 'about.culture-4',
      query: 'indian festival food sweets dessert',
      orientation: 'landscape',
      size: 'medium',
    }
  );

  console.log(`Total images to fetch: ${queries.length}`);
  console.log('This may take a while due to rate limiting...\n');

  // Fetch images with rate limiting
  const imageMap = await batchSearchPexelsImages(queries, 500);

  // Convert flat keys to nested object
  const nestedMap: any = {};
  for (const [key, url] of Object.entries(imageMap)) {
    const parts = key.split('.');
    let current = nestedMap;

    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) {
        current[parts[i]] = {};
      }
      current = current[parts[i]];
    }

    current[parts[parts.length - 1]] = url;
  }

  // Save to public/data/imageMap.json
  const outputPath = path.join(process.cwd(), 'public', 'data', 'imageMap.json');
  await fs.writeFile(outputPath, JSON.stringify(nestedMap, null, 2));

  console.log(`\n✅ Image map saved to ${outputPath}`);
  console.log(`Total images fetched: ${Object.keys(imageMap).length} / ${queries.length}`);

  // Show which images failed
  const failed = queries.filter(q => !imageMap[q.key]);
  if (failed.length > 0) {
    console.log(`\n⚠️  Failed to fetch ${failed.length} images:`);
    failed.slice(0, 10).forEach(f => console.log(`   - ${f.key} (${f.query})`));
    if (failed.length > 10) {
      console.log(`   ... and ${failed.length - 10} more`);
    }
  }
}

// Run the script
fetchAllImages().catch(error => {
  console.error('Error fetching images:', error);
  process.exit(1);
});
