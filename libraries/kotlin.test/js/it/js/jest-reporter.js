var Tester = require('./expectedTests');

module.exports = function (results) {
    var tester = new Tester({
                                'SimpleTest testFoo': 'fail',
                                'SimpleTest testBar': 'pass',
                                'SimpleTest testFooWrong': 'pending',
                                'TestTest emptyTest': 'pending'
                            });
    var testResults = results.testResults[0].testResults;
    for (var i = 0; i < testResults.length; i++) {
        var tr = testResults[i];


        if (tr.status === 'passed') {
            tester.passed(tr.fullName);
        }
        else if (tr.status === 'failed') {
            tester.failed(tr.fullName);
        }
        else {
            tester.pending(tr.fullName);
        }
    }
    tester.end();
};