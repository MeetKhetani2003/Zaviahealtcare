const fs = require('fs');
const path = require('path');

// 1. Rename directory
const oldDir = path.join(__dirname, 'src/app/book-consultation');
const newDir = path.join(__dirname, 'src/app/free-assessment');
if (fs.existsSync(oldDir)) {
  fs.renameSync(oldDir, newDir);
}

// 2. Replace text in all files
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

  // URL replacements
  content = content.replace(/\/book-consultation/g, '/free-assessment');
  
  // Text replacements
  content = content.replace(/Book Consultation/g, 'Take Free Assessment');
  content = content.replace(/Book consultation/g, 'Take free assessment');
  content = content.replace(/book consultation/g, 'take free assessment');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
  }
}
console.log("Renaming complete!");
