// const os = require('os');

// console.log('type : ' + os.type());


const fs = require('fs'),
const newModule = require('./myModule'),
const main = require('./main');

fs.readFile('./file.txt', 'utf-8', (err, data) => {
  if (err) { throw err; }
  console.log('data: ', data);
});

console.log(main);
console.log(newModule);
