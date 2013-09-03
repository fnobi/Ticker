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
});
