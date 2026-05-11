const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directory = './images';

fs.readdirSync(directory).forEach(file => {
    if (file.match(/\.(jpg|jpeg|png|JPG|JPEG)$/)) {
        const filePath = path.join(directory, file);
        const outputFilename = file.split('.').slice(0, -1).join('.') + '.webp';
        const outputPath = path.join(directory, outputFilename);

        sharp(filePath)
            .rotate() // Automatically rotate based on EXIF metadata
            .webp({ quality: 80 })
            .toFile(outputPath)
            .then(() => console.log(`Converted ${file} to WebP`))
            .catch(err => console.error(`Error converting ${file}:`, err));
    }
});
