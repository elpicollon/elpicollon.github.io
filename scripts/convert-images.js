
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const assetsDirs = [
    path.join(rootDir, 'public', 'assets'),
    path.join(rootDir, 'src', 'assets')
];

async function convertImages(dir) {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            await convertImages(filePath);
        } else if (/\.(png|jpg|jpeg)$/i.test(file)) {
            const webpPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

            // Skip if webp already exists and is newer
            if (fs.existsSync(webpPath)) {
                const webpStat = fs.statSync(webpPath);
                if (webpStat.mtime > stat.mtime) {
                    console.log(`Skipping ${file}, WebP already up to date.`);
                    continue;
                }
            }

            console.log(`Converting ${file} to WebP...`);
            try {
                await sharp(filePath)
                    .webp({ quality: 80 })
                    .toFile(webpPath);
                console.log(`Converted: ${file} -> ${path.basename(webpPath)}`);
            } catch (err) {
                console.error(`Error converting ${file}:`, err);
            }
        }
    }
}

async function main() {
    console.log('Starting image conversion...');
    for (const dir of assetsDirs) {
        console.log(`Scanning directory: ${dir}`);
        await convertImages(dir);
    }
    console.log('Image conversion complete.');
}

main();
