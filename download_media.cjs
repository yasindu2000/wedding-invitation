const https = require('https');
const fs = require('fs');

const videoUrl = "https://udara-and-vinod-weddinginvitation.vercel.app/Bride_and_groom_walking_garden_202606021456.mp4";
const audioUrl = "https://udara-and-vinod-weddinginvitation.vercel.app/assets/Yali-Muweten-Ashen-Sheenadi-Wedding-Song.mp3"; // The bundler path might be different, let's try root first.
const audioUrlRoot = "https://udara-and-vinod-weddinginvitation.vercel.app/Yali-Muweten-Ashen-Sheenadi-Wedding-Song.mp3";

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } }, (response) => {
      if (response.statusCode === 200 || response.statusCode === 301 || response.statusCode === 302) {
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      } else {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function main() {
  try {
    console.log("Downloading audio from root...");
    await downloadFile(audioUrlRoot, 'f:\\wedding\\public\\bg-audio.mp3');
    console.log("Audio downloaded from root.");
  } catch (err) {
    console.error("Failed from root, trying assets folder...");
    try {
      await downloadFile(audioUrl, 'f:\\wedding\\public\\bg-audio.mp3');
      console.log("Audio downloaded from assets.");
    } catch (err2) {
      console.error(err2);
    }
  }
}
main();
