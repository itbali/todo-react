(google)[https://www.google.com]

const a = fs.readFileSync('readme3.md', 'utf8');
let b = a.match(/\[.*?]/g);