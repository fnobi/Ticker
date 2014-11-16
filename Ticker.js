var Ticker = function (opts) {
    this.clock = opts.clock || 20;

    this.startTime = null;

    this.periods = {};

    this.initLoop();
};
Ticker = EventTrigger.extend(Ticker);

Ticker.prototype.initLoop = function () {
    this.loop = null;
};

Ticker.prototype.start = function () {
    var instance = this;
    
    this.startTime = +(new Date());

    this.loop = setInterval(function () {
        instance.processTick();
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
    var currentTime = +(new Date());

    var e = {
        time: currentTime - this.startTime,
        periods: periods
    };

    if (!isNaN(this.prevTime)) {
        e.delta = currentTime - this.prevTime;
    }

    this.emit('tick', e);

    var value, name, duration;
    for (name in periods) {
        duration = periods[name].duration;
        value = (currentTime - periods[name].startTime) / duration;
        periods[name].value = value;
    }

    for (name in periods) {
        if (periods[name].value >= 1) {
            this.emit('period:' + name);
            periods[name].value -= 1;
        }
    }

    this.prevTime = currentTime;
};

Ticker.prototype.addPeriod = function (name, duration) {
    this.periods[name] = {
        duration: duration
    };

    this.initPeriod(name);
};

Ticker.prototype.initPeriod = function (name) {
    if (!this.periods[name]) {
        return;
    }

    this.periods[name].startTime = +(new Date());
    this.periods[name].value = 0;
};

Ticker.prototype.emit = function (type) {
    EventTrigger.prototype.emit.apply(this, arguments);
};
