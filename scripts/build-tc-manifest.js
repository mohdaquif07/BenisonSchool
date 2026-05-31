/**
 * Regenerate tc-pdfs/manifest.json after adding or removing TC PDFs.
 * Run: node scripts/build-tc-manifest.js
 */

const fs = require('fs');
const path = require('path');

const tcDir = path.join(__dirname, '..', 'tc-pdfs');
const outFile = path.join(tcDir, 'manifest.json');
const pattern = /^(\d+)_(.+)\.pdf$/i;

function normalizeName(value) {
    return value.replace(/[_\-\s]+/g, '').toLowerCase();
}

const manifest = fs
    .readdirSync(tcDir)
    .filter((file) => pattern.test(file))
    .map((file) => {
        const [, admissionNo, namePart] = file.match(pattern);
        return {
            admissionNo,
            name: normalizeName(namePart),
            file,
        };
    })
    .sort((a, b) => Number(a.admissionNo) - Number(b.admissionNo));

fs.writeFileSync(outFile, JSON.stringify(manifest));
console.log(`Wrote ${manifest.length} entries to ${outFile}`);
