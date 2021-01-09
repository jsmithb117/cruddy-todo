const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  return new Promise(function(resolve, reject) {
    fs.readFile(exports.counterFile, (err, fileData) => {
      if (err) {
        reject(callback(err));
      } else {
        resolve(Number(fileData));
      }
    });
  });

  // return new Promise(function(resolve, reject) {
  //   fs.readFile(filePath, 'utf8', (err, data) => {
  //     if (err) {
  //       reject(err);
  //     } else {
  //       resolve(data.split('\n')[0]);
  //     }
  //   });
  // });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = (callback) => {
  readCounter((err, data) => {
    var count = data + 1;
    writeCounter(count, callback);
  });
};



// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
