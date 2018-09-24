let results = require('./final.json');
let request = require('request-promise');
let fs = require('fs');

let attrs = {};

(async function() {

  console.log(results.length);

  let c = 0;
  for(let res of results) {
    c++;
    let url = res.html_url;
    if (!url) continue;

    url = `https://raw.githubusercontent.com/${res.full_name}/master/.gitattributes`;
    console.log(c / results.length);
    let response = await request({
      url,
      simple: false,
      resolveWithFullResponse: true
    });

    if (response.statusCode == 404) {
      attrs[res.full_name] = null;
    } else {
      attrs[res.full_name] = response.body;
    }
  }


  fs.writeFileSync('attrs.json', JSON.stringify(attrs, null, 4));

})().then(console.log, console.log);
