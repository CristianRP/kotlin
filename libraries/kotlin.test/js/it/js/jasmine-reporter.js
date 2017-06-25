var Tester = require('./expectedTests');
var tester = new Tester({
    'SimpleTest testFoo': 'fail',
    'SimpleTest testBar': 'pass',
    'SimpleTest testFooWrong': 'pending',
    'TestTest emptyTest': 'pending'
});


process.on('exit', function() {
    tester.end();
});


jasmine.getEnv().addReporter({
    specDone: function(result) {
        var status = result.status;
        if (status === 'passed') {
            tester.passed(result.fullName);
        }
        else if (status === 'failed') {
            tester.failed(result.fullName);
        }
        else {
            tester.pending(result.fullName);
        }
    }
});