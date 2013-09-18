var assert = chai.assert;

describe('Ticker', function () {
    it('emit tick', function (done) {
        var clock = 20;

        var ticker = new Ticker({
            clock: clock
        });

        ticker.on('tick', function (e) {
            assert(clock <= e.time);
            assert(e.time < clock * 2);

            ticker.stop();
            done();
        });

        ticker.start();
    });

    it('emit period', function (done) {
        var clock = 10;
        var periodDuration = 50;

        var ticker = new Ticker({
            clock: clock
        });

        var counter = 0;

        ticker.addPeriod('hoge', periodDuration);

        ticker.on('tick', function (e) {
            var value = e.periods['hoge'].value;

            assert(counter * clock / periodDuration <= value);
            assert(value < (counter + 1) * clock / periodDuration);

            counter++;
        });

        ticker.on('period:hoge', function () {
            ticker.stop();
            done();
        });

        ticker.start();
    });


    it('emit period (indivisible)', function (done) {
        var clock = 11;
        var periodDuration = 50;

        var ticker = new Ticker({
            clock: clock
        });

        var counter = 0;

        ticker.addPeriod('hoge', periodDuration);

        ticker.on('tick', function (e) {
            var value = e.periods['hoge'].value;

            assert(counter * clock / periodDuration <= value);
            assert(value < (counter + 1) * clock / periodDuration);

            counter++;
        });

        ticker.on('period:hoge', function () {
            ticker.stop();
            done();
        });

        ticker.start();
    });
});
