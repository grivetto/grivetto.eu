import fs from 'fs';

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

const required = ['@fontsource/inter'];
const missing = required.filter(dep => !deps[dep]);

if (missing.length > 0) {
    console.error(`Missing dependencies: ${missing.join(', ')}`);
    process.exit(1);
}
console.log("All dependencies present.");
