import { promises as fs } from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import sharp from 'sharp';

// Types
interface ImageMapNode {
  [key: string]: string | ImageMapNode;
}

interface ImageDimensions {
  width: number;
  height: number;
}

interface ProcessingResult {
  processed: number;
  failed: number;
  skipped: number;
  errors: Array<{ path: string; error: string }>;
}

// Configuration
const IMAGE_QUALITY = 85;
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const IMAGE_MAP_PATH = path.join(PUBLIC_DIR, 'data', 'imageMap.json');

// Dimension mapping based on image type
function getDimensionsForPath(imagePath: string): ImageDimensions {
  if (imagePath === 'hero') {
    return { width: 1920, height: 1080 };
  }

  if (imagePath.startsWith('menuItems.')) {
    return { width: 800, height: 800 };
  }

  if (imagePath.startsWith('events.')) {
    return { width: 1200, height: 900 };
  }

  if (imagePath.startsWith('about.founder') || imagePath.startsWith('about.chef-')) {
    return { width: 600, height: 600 };
  }

  if (imagePath.startsWith('about.culture-')) {
    return { width: 1200, height: 900 };
  }

  // Default dimensions
  return { width: 800, height: 800 };
}

// Convert image path to filename
function pathToFilename(imagePath: string): string {
  // Convert paths like "menuItems.Paneer Tikka" to "menuItems/paneer-tikka.webp"
  const parts = imagePath.split('.');

  if (parts.length === 1) {
    // Simple path like "hero"
    return `${parts[0]}.webp`;
  }

  // Nested path
  const dir = parts[0];
  const filename = parts.slice(1).join('-')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return `${dir}/${filename}.webp`;
}

// Download image from URL
async function downloadImage(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      const chunks: Buffer[] = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', reject);
    }).on('error', reject);
  });
}

// Process a single image
async function processImage(
  url: string,
  outputPath: string,
  dimensions: ImageDimensions,
  force: boolean = false
): Promise<void> {
  const fullOutputPath = path.join(IMAGES_DIR, outputPath);

  // Skip if file exists and not forcing
  if (!force) {
    try {
      await fs.access(fullOutputPath);
      console.log(`  ⏭️  Skipped (already exists): ${outputPath}`);
      return;
    } catch {
      // File doesn't exist, continue
    }
  }

  // Ensure directory exists
  const dir = path.dirname(fullOutputPath);
  await fs.mkdir(dir, { recursive: true });

  // Download image
  console.log(`  ⬇️  Downloading: ${url}`);
  const imageBuffer = await downloadImage(url);

  // Convert to WebP with resize
  console.log(`  🔄 Converting to WebP (${dimensions.width}x${dimensions.height}): ${outputPath}`);
  await sharp(imageBuffer)
    .resize(dimensions.width, dimensions.height, {
      fit: 'cover',
      position: 'center',
    })
    .webp({ quality: IMAGE_QUALITY })
    .toFile(fullOutputPath);

  console.log(`  ✅ Saved: ${outputPath}`);
}

// Flatten nested object to array of [path, url] entries
function flattenImageMap(obj: ImageMapNode, prefix: string = ''): Array<[string, string]> {
  const entries: Array<[string, string]> = [];

  for (const [key, value] of Object.entries(obj)) {
    const currentPath = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      entries.push([currentPath, value]);
    } else {
      entries.push(...flattenImageMap(value, currentPath));
    }
  }

  return entries;
}

// Update image map to use local paths
function updateImageMapToLocal(imageMap: ImageMapNode): ImageMapNode {
  const updated: ImageMapNode = {};

  for (const [key, value] of Object.entries(imageMap)) {
    if (typeof value === 'string') {
      // This is a URL, replace with local path
      const imagePath = key;
      const filename = pathToFilename(imagePath);
      updated[key] = `/images/${filename}`;
    } else {
      // Recursively update nested object
      updated[key] = updateImageMapToLocal(value);
    }
  }

  return updated;
}

// Reconstruct nested image map from flat entries
function reconstructImageMap(entries: Array<[string, string]>): ImageMapNode {
  const map: ImageMapNode = {};

  for (const [imagePath, localPath] of entries) {
    const parts = imagePath.split('.');
    let current: any = map;

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part];
    }

    current[parts[parts.length - 1]] = localPath;
  }

  return map;
}

// Main processing function
async function processAllImages(options: {
  force?: boolean;
  dryRun?: boolean;
  quality?: number;
} = {}): Promise<ProcessingResult> {
  const { force = false, dryRun = false, quality = IMAGE_QUALITY } = options;

  console.log('🖼️  Image to WebP Converter\n');
  console.log('📂 Reading image map...');

  // Read image map
  const imageMapContent = await fs.readFile(IMAGE_MAP_PATH, 'utf-8');
  const imageMap: ImageMapNode = JSON.parse(imageMapContent);

  // Flatten to process
  const entries = flattenImageMap(imageMap);
  console.log(`📊 Found ${entries.length} images to process\n`);

  if (dryRun) {
    console.log('🔍 Dry run mode - preview only\n');
    for (const [imagePath, url] of entries) {
      const filename = pathToFilename(imagePath);
      const dimensions = getDimensionsForPath(imagePath);
      console.log(`  ${imagePath}`);
      console.log(`    URL: ${url}`);
      console.log(`    Output: ${filename}`);
      console.log(`    Size: ${dimensions.width}x${dimensions.height}`);
      console.log('');
    }
    return { processed: 0, failed: 0, skipped: 0, errors: [] };
  }

  // Ensure images directory exists
  await fs.mkdir(IMAGES_DIR, { recursive: true });

  // Process each image
  const result: ProcessingResult = {
    processed: 0,
    failed: 0,
    skipped: 0,
    errors: [],
  };

  const processedEntries: Array<[string, string]> = [];

  for (let i = 0; i < entries.length; i++) {
    const [imagePath, url] = entries[i];
    const filename = pathToFilename(imagePath);
    const dimensions = getDimensionsForPath(imagePath);

    console.log(`\n[${i + 1}/${entries.length}] Processing: ${imagePath}`);

    try {
      // Check if already exists
      const fullOutputPath = path.join(IMAGES_DIR, filename);
      let shouldSkip = false;

      if (!force) {
        try {
          await fs.access(fullOutputPath);
          shouldSkip = true;
        } catch {
          // File doesn't exist
        }
      }

      if (shouldSkip) {
        console.log(`  ⏭️  Skipped (already exists)`);
        result.skipped++;
        processedEntries.push([imagePath, `/images/${filename}`]);
      } else {
        await processImage(url, filename, dimensions, force);
        result.processed++;
        processedEntries.push([imagePath, `/images/${filename}`]);
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.log(`  ❌ Failed: ${errorMsg}`);
      result.failed++;
      result.errors.push({ path: imagePath, error: errorMsg });
      // Keep original URL on failure
      processedEntries.push([imagePath, url]);
    }
  }

  // Update image map
  if (result.processed > 0 || result.skipped > 0) {
    console.log('\n📝 Updating image map...');
    const updatedMap = reconstructImageMap(processedEntries);
    await fs.writeFile(
      IMAGE_MAP_PATH,
      JSON.stringify(updatedMap, null, 2),
      'utf-8'
    );
    console.log('✅ Image map updated');
  }

  return result;
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const options = {
    force: args.includes('--force'),
    dryRun: args.includes('--dry-run'),
    quality: parseInt(args.find(arg => arg.startsWith('--quality='))?.split('=')[1] || '85'),
  };

  try {
    const result = await processAllImages(options);

    console.log('\n' + '='.repeat(60));
    console.log('📊 Processing Summary');
    console.log('='.repeat(60));
    console.log(`✅ Processed: ${result.processed}`);
    console.log(`⏭️  Skipped: ${result.skipped}`);
    console.log(`❌ Failed: ${result.failed}`);

    if (result.errors.length > 0) {
      console.log('\n⚠️  Errors:');
      result.errors.forEach(({ path, error }) => {
        console.log(`  - ${path}: ${error}`);
      });
    }

    console.log('\n✨ Done!');
    process.exit(result.failed > 0 ? 1 : 0);
  } catch (error) {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export { processAllImages, processImage, getDimensionsForPath, pathToFilename };
