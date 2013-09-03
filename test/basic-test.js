var assert = chai.assert;

describe('Ticker', function () {
    it('emit tick', function (done) {
        var ticker = new Ticker({
            clock: 20
        });

        ticker.on('tick', function () {
            ticker.stop();
            done();
        });

        ticker.start();
    });

    it('emit period', function (done) {
        var ticker = new Ticker({
            clock: 5
        });

        var emitPeriod = false;

        ticker.addPeriod('hoge', 20);

        ticker.on('period:hoge', function () {
            emitPeriod = true;
        });

        ticker.on('tick', function (e) {
            var value = e.periods['hoge'].value;

            if (value >= 1) {
                assert(emitPeriod);
                ticker.stop();
                done();
            }
        });

        ticker.start();
    });


    it('emit period (indivisible)', function (done) {
        var ticker = new Ticker({
            clock: 11
        });

        var emitPeriod = false;

        ticker.addPeriod('hoge', 20);

        ticker.on('period:hoge', function () {
            emitPeriod = true;
        });

        ticker.on('tick', function (e) {
            var value = e.periods['hoge'].value;

            if (value >= 1) {
                assert(emitPeriod);
                ticker.stop();
                done();
            }
        });

        ticker.start();
    });
});











