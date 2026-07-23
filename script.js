
const fs = require('fs');
const path = require('path');
const dir = path.join('d:', 'TapCash', 'src', 'screens');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  content = content.replace(/(container:\s*\{[^}]*?backgroundColor:\s*)'#(?:fff|FFFFFF)'/ig, '\\'#F3F3F3\'');
  content = content.replace(/(safeArea:\s*\{[^}]*?backgroundColor:\s*)'#(?:fff|FFFFFF)'/ig, '\\'#F3F3F3\'');
  
  fs.writeFileSync(filePath, content, 'utf8');
});
console.log('Replaced container and safeArea backgrounds');

