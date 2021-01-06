const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) => {
    fs.writeFile(`./test/testData/${id}.txt`, text, () => {
      callback(null, { id, text });
    });
  });
};

exports.readAll = (callback) => {
  fs.readdir(`./test/testData`, (err, array) => {
    var output = [];
    array.forEach((item) => {
      var obj = {};
      var splitName = item.split('.txt')[0];
      obj.id = splitName;
      obj.text = splitName;
      output.push(obj);
    });
    callback(null, output);
  });
};

exports.readOne = (id, callback) => {
  fs.readFile(`./test/testData/${id}.txt`, 'utf8', (err, todo) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      callback(null, { id, text: todo });
    }
  });
};

exports.update = (id, text, callback) => {
  fs.readFile(`./test/testData/${id}.txt`, 'utf8', (err, todo) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      fs.writeFile(`./test/testData/${id}.txt`, text, () => {
        callback(null, { id, text });
      });
    }
  });
};

exports.delete = (id, callback) => {
  fs.unlink(`./test/testData/${id}.txt`, (err) => {
    callback(err);
  });
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
