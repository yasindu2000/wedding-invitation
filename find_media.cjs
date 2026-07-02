const fs = require('fs');

const data = fs.readFileSync('C:\\Users\\user\\.gemini\\antigravity\\brain\\ec990470-ee63-432f-a9d4-b1cf6ef5ec04\\.system_generated\\steps\\108\\content.md', 'utf8');

const regex = /.{0,30}(?:mp4|mp3|webm|ogg|jpg|png|webp|lottie).{0,30}/gi;

const matches = new Set();
let match;
while ((match = regex.exec(data)) !== null) {
  matches.add(match[0]);
}

console.log('--- FOUND MEDIA ---');
for (const m of matches) {
  console.log(m);
}
console.log('-------------------');
