const fs = require('fs');
const path = require('path');

const tempDir = path.join(__dirname, '../src/temp_figma');
const files = fs.readdirSync(tempDir);

for (const file of files) {
  if (!file.endsWith('.xml')) continue;
  console.log(`\n=================== ${file} ===================`);
  const content = fs.readFileSync(path.join(tempDir, file), 'utf-8');
  // Extract text and frames
  const textMatches = content.match(/<text[^>]*name="([^"]*)"[^>]*\/>|<frame[^>]*name="([^"]*)"/g);
  if (textMatches) {
    console.log(textMatches.slice(0, 30).join('\n'));
  }
}
