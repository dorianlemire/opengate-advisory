import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
const folder=fileURLToPath(new URL('../public/assets/work/',import.meta.url));
const names=['nocturne-restaurant','nail-saloon','district-barbers','trim-street-dubai'];
for(const name of names) {
  for(const width of [400,800,1200]) {
    await sharp(folder+name+'.jpg').resize({width}).webp({quality:85,effort:5}).toFile(folder+name+'-'+width+'.webp');
  }
}
console.log('Optimized four real portfolio previews at 400, 800 and 1200 pixels.');
