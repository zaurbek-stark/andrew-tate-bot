const Data = require('./data.json');
const fs = require('fs');

const tweets = Object.keys(Data.post).map(key => {
  return Data.post[key].txt;
});

const file = fs.createWriteStream('./andrewtate-tweets.txt');
file.on('error', function (err) { /* error handling */ });
tweets.forEach(tweet => file.write(tweet + '\n|'));
file.end();