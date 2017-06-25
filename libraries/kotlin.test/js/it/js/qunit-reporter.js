var Tester = require('./expectedTests');

var tester = new Tester({
                            'SimpleTest testFoo': 'fail',
                            'SimpleTest testBar': 'pass',
                            'SimpleTest testFooWrong': 'pending',
                            'TestTest emptyTest': 'pending'
                        });

QUnit.testDone(function (details) {
    var testName = details.module + ' ' + details.name;
    if (details.skipped) {
        tester.pending(testName);
    }
    else if (!details.failed) {
        tester.passed(testName);
    }
    else {
        tester.failed(testName);
    }
});

QUnit.done(function (details) {
    details.failed = tester._total - tester._passed;
});

