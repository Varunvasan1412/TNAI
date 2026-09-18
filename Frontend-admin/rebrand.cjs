const fs = require('fs');
const path = require('path');

const replacements = [
  { regex: /\bRSI CRM\b/g, replacement: 'Ahattrickz CRM' },
  { regex: /\bRSI Store\b/g, replacement: 'Ahattrickz Info Tech' },
  { regex: /\bRSI STORE\b/g, replacement: 'AHATTRICKZ INFO TECH' },
  { regex: /\bRSI research platform\b/g, replacement: 'Ahattrickz enterprise platform' },
  { regex: /\bRSI's advanced HYDROGEN ENERGY TESTING solutions\b/g, replacement: "Ahattrickz's advanced IT & CLOUD SOFTWARE solutions" },
  { regex: /\bHYDROGEN ENERGY\b/g, replacement: 'IT & CLOUD' },
  { regex: /\bTESTING solutions\b/g, replacement: 'SOFTWARE solutions' },
  { regex: /\bRSI Laboratory\b/g, replacement: 'Ahattrickz Tech Hub' },
  { regex: /\bRSI India\b/g, replacement: 'Ahattrickz India' },
  { regex: /rsindia\.net/g, replacement: 'ahattrickz.com' },
  { regex: /\brsistore\.in\b/g, replacement: 'ahattrickz.com' },
  { regex: /\bRSI research projects\b/g, replacement: 'Ahattrickz tech projects' },
  { regex: /\bRSI electrode stacks\b/g, replacement: 'Ahattrickz cloud deployments' },
  { regex: /\belectrode testing module\b/g, replacement: 'software analytics module' },
  { regex: /\bhydrogen energy space\b/g, replacement: 'IT services space' },
  { regex: /\bhigh-performance membranes\b/g, replacement: 'enterprise software solutions' },
  { regex: /\bnew analytics dashboards, batch export tools, and enhanced electrode data APIs\b/g, replacement: 'new analytics dashboards, robust API gateways, and enhanced microservices architectures' },
  { regex: /\bRSI\b/g, replacement: 'Ahattrickz' },
];

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(fullPath));
    } else {
      if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

const files = walkDir(path.join(__dirname, 'src'));

let filesModified = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;
  
  replacements.forEach(rule => {
    newContent = newContent.replace(rule.regex, rule.replacement);
  });
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    filesModified++;
    console.log('Modified:', file);
  }
});

console.log(`Finished processing. Modified ${filesModified} files.`);
