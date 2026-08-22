const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace ../ with @/ for known directories
  content = content.replace(/\.\.\/data\//g, '@/data/');
  content = content.replace(/\.\.\/components\//g, '@/components/');
  content = content.replace(/\.\.\/assets/g, '@/assets');
  content = content.replace(/\.\.\/utils\//g, '@/utils/');
  content = content.replace(/\.\/data\//g, '@/data/');
  content = content.replace(/\.\/components\//g, '@/components/');
  content = content.replace(/\.\/assets/g, '@/assets');
  content = content.replace(/\.\/utils\//g, '@/utils/');

  // For BookConsultation and Contact add "use client" if not present and if they use state
  if (content.includes('useState') || content.includes('useEffect')) {
    if (!content.includes('"use client"')) {
      content = `"use client";\n` + content;
    }
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
  }
}
console.log("Paths fixed!");
