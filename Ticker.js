var Ticker = function (opts) {
    this.clock = opts.clock || 20;
    this.initLoop();
};
inherits(Ticker, EventEmitter);

Ticker.prototype.initLoop = function () {
    this.loop = null;
};

Ticker.prototype.start = function () {
    var self = this;

    this.loop = setInterval(function () {
        self.emit('tick');
    }, this.clock);
};

Ticker.prototype.stop = function () {
    if (!this.loop) {
        return;
    }
    clearInterval(this.loop);
    this.initLoop();
};
