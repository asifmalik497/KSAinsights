const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/posts.ts');
let content = fs.readFileSync(filePath, 'utf8');

// The corrupted line starts with "  },ا الراقية"
// We want to remove everything from that corruption until the start of "neom-revolution"
const corruptionStart = content.indexOf('  },ا الراقية');
const neomStart = content.indexOf("id: 'neom-revolution'");

if (corruptionStart !== -1 && neomStart !== -1) {
    // Find the start of the object containing neom-revolution
    // It's usually a few lines before the id
    let searchIndex = neomStart;
    while (searchIndex > 0 && content[searchIndex] !== '{') {
        searchIndex--;
    }
    
    const newContent = content.substring(0, corruptionStart + 5) + '\n  ' + content.substring(searchIndex);
    fs.writeFileSync(filePath, newContent);
    console.log('File cleaned successfully');
} else {
    console.log('Could not find corruption or neom-revolution');
    console.log('corruptionStart:', corruptionStart);
    console.log('neomStart:', neomStart);
}
