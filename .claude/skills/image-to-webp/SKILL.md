---
name: image-to-webp
description: Download images from URLs, resize them, and convert to WebP format
version: 1.0.0
author: Claude
tags: [images, optimization, webp, download]
user-invocable: true
---

# Image to WebP Converter

This skill downloads images from URLs (such as Pexels), resizes them appropriately, converts them to WebP format, and stores them locally in the `public/images/` directory for improved performance and caching.

## Usage

### Basic Usage
```bash
/image-to-webp
```
This will process all images from `public/data/imageMap.json` in batch mode.

### Single Image Mode
```bash
/image-to-webp --url "https://example.com/image.jpg" --output "hero.webp" --width 1920 --height 1080
```

### Custom Batch Processing
```bash
/image-to-webp --input "path/to/custom-image-map.json"
```

## Features

- **Batch Processing**: Process all images from imageMap.json automatically
- **Smart Resizing**: Automatically determines optimal sizes based on image type:
  - Hero images: 1920x1080 (landscape)
  - Menu items: 800x800 (square)
  - Events: 1200x900 (landscape)
  - About/Chef photos: 600x600 (square)
  - Cultural images: 1200x900 (landscape)
- **WebP Conversion**: Converts images to modern WebP format with quality optimization
- **Organized Storage**: Maintains directory structure in `public/images/`
- **Map Update**: Automatically updates imageMap.json to point to local files
- **Error Handling**: Graceful handling of failed downloads with fallback support

## How It Works

1. **Read Image Map**: Loads the image URL mapping from `public/data/imageMap.json`
2. **Download Images**: Fetches images from remote URLs (e.g., Pexels CDN)
3. **Resize**: Resizes images based on their category and intended use
4. **Convert to WebP**: Converts images to WebP format with 85% quality
5. **Save Locally**: Stores images in `public/images/` with organized subdirectories
6. **Update Map**: Updates imageMap.json to reference local `/images/*.webp` paths
7. **Report**: Provides a summary of processed, failed, and skipped images

## Directory Structure

After running, your `public/images/` will be organized as:
```
public/images/
├── hero.webp
├── menuItems/
│   ├── paneer-tikka.webp
│   ├── butter-chicken.webp
│   └── ...
├── events/
│   ├── live-music.webp
│   ├── diwali.webp
│   └── ...
└── about/
    ├── founder.webp
    ├── chef-1.webp
    ├── chef-2.webp
    ├── chef-3.webp
    └── culture-1.webp
```

## Requirements

- Node.js dependencies: `sharp` (for image processing)
- Internet connection (for downloading remote images)
- Write permissions to `public/images/` and `public/data/imageMap.json`

## Configuration

The skill automatically detects image dimensions based on the image path:
- `hero` → 1920x1080
- `menuItems.*` → 800x800
- `events.*` → 1200x900
- `about.founder` → 600x600
- `about.chef-*` → 600x600
- `about.culture-*` → 1200x900

## Examples

**Process all images:**
```bash
/image-to-webp
```

**Process with custom quality:**
```bash
/image-to-webp --quality 90
```

**Dry run (preview without downloading):**
```bash
/image-to-webp --dry-run
```

## Notes

- The skill preserves the original imageMap.json structure
- Failed downloads don't stop the batch process
- Existing local files are skipped by default (use `--force` to overwrite)
- WebP format provides 25-35% smaller file sizes compared to JPEG/PNG
- Next.js Image component automatically serves WebP to supported browsers
