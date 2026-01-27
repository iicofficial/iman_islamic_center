import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '../src/assets');
const MAX_WIDTH = 1920;
// Web friendly max width. 
// Images larger than this are usually overkill for web unless specific use case.

async function optimizeImages() {
    console.log(`Scanning for large images in: ${ASSETS_DIR}`);

    if (!fs.existsSync(ASSETS_DIR)) {
        console.error('Assets directory not found!');
        return;
    }

    const files = fs.readdirSync(ASSETS_DIR);
    let optimizedCount = 0;

    for (const file of files) {
        const ext = path.extname(file);
        const validExts = ['.png', '.jpg', '.jpeg', '.JPG', '.PNG'];

        if (!validExts.includes(ext)) continue;

        const filePath = path.join(ASSETS_DIR, file);

        try {
            const stats = fs.statSync(filePath);
            const sizeMB = stats.size / (1024 * 1024);

            // Optimize if larger than 1MB
            if (sizeMB > 1.0) {
                console.log(`\nFound large image: ${file} (${sizeMB.toFixed(2)} MB)`);

                const tempPath = filePath + '.tmp' + ext;

                const pipeline = sharp(filePath);
                const metadata = await pipeline.metadata();

                // Resize if width is massive
                if (metadata.width > MAX_WIDTH) {
                    console.log(`  Resizing from ${metadata.width}px to ${MAX_WIDTH}px width...`);
                    pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
                }

                // High compression settings
                if (['.jpg', '.jpeg', '.JPG'].includes(ext)) {
                    pipeline.jpeg({ quality: 80, mozjpeg: true });
                } else if (['.png', '.PNG'].includes(ext)) {
                    // For PNG, we can use png quantity/compressionLevel
                    // Often converting large PNG photos to JPEG is better, but let's stick to format preservation
                    // with high compression.
                    pipeline.png({ quality: 80, compressionLevel: 8 });
                    // Note: 'quality' in png requires libvips compiled with quantization support (usually standard in sharp)
                }

                await pipeline.toFile(tempPath);

                const newStats = fs.statSync(tempPath);
                const newSizeMB = newStats.size / (1024 * 1024);

                console.log(`  Optimization complete: ${newSizeMB.toFixed(2)} MB`);

                if (newSizeMB < sizeMB) {
                    // Replace original
                    fs.unlinkSync(filePath);
                    fs.renameSync(tempPath, filePath);
                    console.log(`  Saved ${(sizeMB - newSizeMB).toFixed(2)} MB!`);
                    optimizedCount++;
                } else {
                    console.log('  Optimization did not reduce size (already optimized?), keeping original.');
                    fs.unlinkSync(tempPath);
                }
            }
        } catch (err) {
            console.error(`  Failed to process ${file}:`, err.message);
        }
    }

    if (optimizedCount === 0) {
        console.log('\nNo images needed optimization. Great job!');
    } else {
        console.log(`\nSuccessfully optimized ${optimizedCount} images.`);
    }
}

optimizeImages();
