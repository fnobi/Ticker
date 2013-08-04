var Ticker = function (opts) {
    this.clock = opts.clock || 20;
};
inherits(Ticker, EventEmitter);

Ticker.prototype.start = function () {
    var self = this;

    this.loop = setInterval(function () {
        self.emit('tick');
    }, this.clock);
};