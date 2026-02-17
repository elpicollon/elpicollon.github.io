const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = path.join(process.cwd(), 'public/assets/logo-picolo.gif');
const outputPath = path.join(process.cwd(), 'public/assets/logo-picolo-opt.gif');

if (!fs.existsSync(inputPath)) {
    console.error('Input file not found:', inputPath);
    process.exit(1);
}

console.log(`Optimizing ${inputPath}...`);
console.log('Original size:', (fs.statSync(inputPath).size / 1024 / 1024).toFixed(2) + ' MB');

sharp(inputPath, { animated: true })
    .resize({ width: 128 }) // Resize to match display size
    .gif({
        colours: 32, // Aggressively reduce colors for loader
        loop: 0      // Loop forever
    })
    .toFile(outputPath)
    .then(info => {
        console.log('Optimization complete!');
        console.log('New size:', (info.size / 1024).toFixed(2) + ' KB');
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });
