const fs = require('fs');

const target = './filter-data';
const files = fs.readdirSync('./filter-data');

console.log(files);
const json = files.map(file => require(`${target}/${file}`));

const final = json.reduce((fin, cur) => fin.concat(cur), []);

fs.writeFileSync('final.json', JSON.stringify(final));
