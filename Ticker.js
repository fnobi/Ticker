var Ticker = function (opts) {
    this.clock = opts.clock || 20;

    this.periods = {};

    this.initLoop();
};
inherits(Ticker, EventEmitter);

Ticker.prototype.initLoop = function () {
    this.loop = null;
};

Ticker.prototype.start = function () {
    var self = this;
    
    this.counter = 0;

    this.loop = setInterval(function () {
        self.processTick();
    }, this.clock);
};

Ticker.prototype.stop = function () {
    if (!this.loop) {
        return;
    }
    clearInterval(this.loop);
    this.initLoop();
};

Ticker.prototype.processTick = function () {
    var clock = this.clock;
    var periods = this.periods;
    var counter = this.counter + clock;

    this.emit('tick', {
        counter: counter,
        periods: periods
    });

    var value, name, duration;
    for (name in periods) {
        duration = periods[name].duration;
        value = periods[name].value + clock / duration;
        periods[name].value = value;
    }

    for (name in periods) {
        if (periods[name].value >= 1) {
            this.emit('period:' + name);
            periods[name].value -= 1;
        }
    }

    this.counter = counter;
};

Ticker.prototype.addPeriod = function (name, duration) {
    this.periods[name] = {
        duration: duration,
        value: 0
    };
};

Ticker.prototype.emit = function (type) {
    EventEmitter.prototype.emit.apply(this, arguments);
};
