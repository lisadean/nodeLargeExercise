const http = require('http');
const port = process.argv[2] || 9999;

const cats =
[
  {
    name: 'Dash',
    sex: 'male',
    size: 'super large'
  },
  {
    name: 'Wiki',
    sex: 'male',
    size: 'large'
  },
  {
    name: 'UB',
    sex: 'female',
    size: 'tiny'
  }
]

const handler = (request, response) => {
  let url = decodeURIComponent(request.url.toLowerCase());
  let results = [];
  if (url != '/json' && url != '/json/version') {
    if (url === '/') {
      results = cats;
    } else {
      results = cats.filter(cat => {
        for (var key in cat) {
          let compare = '/' + cat[key].toLowerCase();
          console.log(compare + ' vs ' + url);
          if (compare === url) {
            return true;
          }
        }
      });
      // nameSearch = cats.filter(cat => '/' + cat.name.toLowerCase() === url.toLowerCase());
      // sexSearch = cats.filter(cat => '/' + cat.sex.toLowerCase() === url.toLowerCase());
      // sizeSearch = cats.filter(cat => '/' + cat.size.toLowerCase() === url.toLowerCase());
      // if (nameSearch.length > 0) {results = nameSearch;}
      // else if (sexSearch.length > 0) {results = sexSearch;}
      // else if (sizeSearch.length > 0) {results = sizeSearch;}
    }
    resultsString = JSON.stringify(results);
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.end(resultsString);
  }
};

const server = http.createServer(handler);

server.listen(port);
console.log('server loaded');