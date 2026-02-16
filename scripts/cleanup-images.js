
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

function cleanupImages(dir) {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            cleanupImages(filePath);
        } else if (/\.(png|jpg|jpeg)$/i.test(file)) {
            const webpPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

            // Only delete if the WebP version exists!
            if (fs.existsSync(webpPath)) {
                console.log(`Deleting ${file} (WebP version exists)...`);
                fs.unlinkSync(filePath);
            } else {
                console.log(`Keeping ${file} (No WebP version found).`);
            }
        }
    }
}

console.log('Starting image cleanup...');
for (const dir of assetsDirs) {
    console.log(`Scanning cleanup directory: ${dir}`);
    cleanupImages(dir);
}
console.log('Image cleanup complete.');
