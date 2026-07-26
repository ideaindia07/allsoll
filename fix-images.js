const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'components');

const basePathLine = "const basePath = process.env.NODE_ENV === 'production' ? '/allsoll' : '';";

function processDirectory(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      // Skip files that already use basePath
      if (content.includes('process.env.NODE_ENV') && content.includes('basePath')) {
         // They might still have raw strings, but they have basePath defined.
         // Let's replace any `src="/` with `src={\`${basePath}/`
         // Only if they aren't next/image components (which auto-handle it, wait, we don't have many of those).
         // Actually, let's just use regex to replace standard `<img src="/...`
         
         // Wait, Touchpoints and AnimatedStory already use src={`${basePath}...`}
         // Let's just manually fix the others.
      } else if (content.includes('<img ') || content.includes('<img\n') || content.match(/src=\{\s*["'`]\//)) {
         
         // Replace static src strings in img tags
         // e.g. src="/AllSoll_logo.webp" -> src={`${basePath}/AllSoll_logo.png`}
         const regexStr = /src=(["'])\/([^"']+)["']/g;
         if (regexStr.test(content)) {
            content = content.replace(regexStr, 'src={`\${basePath}/$2`}');
            changed = true;
         }
         
         // Replace dynamic src that might contain absolute paths
         // Actually, dynamic src is usually like src={project.image} where project.image is '/img.webp'
         // We should probably check the arrays instead!
      }

      if (changed) {
        // Insert basePath declaration after imports
        const lines = content.split('\n');
        const lastImportIndex = lines.reduce((acc, line, i) => line.startsWith('import ') ? i : acc, -1);
        if (lastImportIndex !== -1) {
          lines.splice(lastImportIndex + 1, 0, '\n' + basePathLine);
        } else {
          lines.unshift(basePathLine + '\n');
        }
        fs.writeFileSync(fullPath, lines.join('\n'), 'utf8');
        console.log('Fixed', fullPath);
      }
    }
  });
}

processDirectory(directoryPath);
