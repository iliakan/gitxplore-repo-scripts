let fs = require('fs');
let _ = require('lodash');
let attrs = require('./attrs.json');

let results = {
  'no-gitattributes': 0,
  'no-star': 0
};

for(let name in attrs) {
  let text = attrs[name];
  if (!text) {
    results['no-gitattributes']++;
    continue;
  }

  let line = text.match(/^\*\s.*/im);
  if (!line) {
    results['no-star']++;
    continue;
  }


  text = line[0].replace(/\s+/gim, ' ').trim();

  if (!results[text]) results[text] = 0;
  results[text]++;
}

let sortable = [];
for (let key in results) {
  if (results[key] < 2) continue;
  sortable.push([key, results[key]]);
}

sortable.sort(function(a, b) {
    return b[1] - a[1];
});

console.log(sortable);
