var test = require('tape-catch');
var path = require('path');

var Tester = require('./expectedTests');
var tester = new Tester({
    'SimpleTest testFoo': 'fail',
    'SimpleTest testBar': 'pass'
    // Tape doesn't report pending tests.
    // See https://github.com/substack/tape/pull/197 and https://github.com/substack/tape/issues/90
});

process.on('exit', function() {
    tester.end();
});

var stream = test.createStream({ objectMode: true });

var nameStack = [];
var prevName;

stream.on('data', function (row) {
    if (row.type === 'test') {
        nameStack.push(row.name);
    }
    else if (row.type === 'end') {
        nameStack.pop();
    }
    else if (row.type === 'assert') {
         var name = nameStack.join(' ');
         // Tape reports all failed assertions within a test.
         if (name !== prevName) {
             if (row.ok) {
                 tester.passed(name);
             }
             else {
                 tester.failed(name);
             }
             prevName = name;
         }
    }
});

process.argv.slice(2).forEach(function (file) {
    require(path.resolve(file));
});
