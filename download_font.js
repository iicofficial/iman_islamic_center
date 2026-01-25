import fs from 'fs';
import https from 'https';

const url = 'https://raw.githubusercontent.com/google/fonts/main/ofl/amiri/Amiri-Regular.ttf';
const file = fs.createWriteStream("Amiri-Regular.ttf");

https.get(url, function (response) {
    if (response.statusCode !== 200) {
        console.error(`Failed to download: ${response.statusCode}`);
        return;
    }
    response.pipe(file);
    file.on('finish', () => {
        file.close();
        console.log("Downloaded successfully");
        const data = fs.readFileSync("Amiri-Regular.ttf");
        const base64 = data.toString('base64');
        fs.writeFileSync("Amiri-Regular.base64.txt", base64);
        console.log("Base64 saved to Amiri-Regular.base64.txt");
    });
}).on('error', (err) => {
    console.error("Error: " + err.message);
});
