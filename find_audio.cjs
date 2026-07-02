const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\user\\.gemini\\antigravity\\brain\\ec990470-ee63-432f-a9d4-b1cf6ef5ec04\\.system_generated\\steps\\108\\content.md', 'utf8');

const regex = /.{0,50}Yali-Muweten.{0,100}/g;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log(match[0]);
}
