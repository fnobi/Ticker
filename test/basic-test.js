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

        var prevValue = 0;

        ticker.addPeriod('hoge', 20);

        ticker.on('tick', function (e) {
            var value = e.periods['hoge'].value;

            assert(0 <= value);
            assert(prevValue <= value);

            prevValue = value;
        });

        ticker.on('period:hoge', function () {
            ticker.stop();
            done();
        });

        ticker.start();
    });


    it('emit period (indivisible)', function (done) {
        var ticker = new Ticker({
            clock: 11
        });

        var prevValue = 0;

        ticker.addPeriod('hoge', 20);

        ticker.on('tick', function (e) {
            var value = e.periods['hoge'].value;

            assert(0 <= value);
            assert(prevValue <= value);

            prevValue = value;
        });

        ticker.on('period:hoge', function () {
            ticker.stop();
            done();
        });

        ticker.start();
    });
});











