Ticker
======

animation keyframe with EventEmitter

## install

### from bower
```
bower install Ticker
```

### from github
```
git clone https://github.com/fnobi/Ticker.git
```

## usage
```
var seconds = 0;

var ticker = new Ticker({
  clock: 1000
});

ticker.on('tick', function () {
  seconds++;
  console.log(seconds);
});

ticker.start();
```

### use period
```
var ticker = new Ticker({
  clock: 20
});

ticker.addPeriod('hoge', 2000);

ticker.on('period:hoge', function () {
  // emmit per 2000ms!
});

ticker.on('tick', function (e) {
  var value = e.periods['hoge'].value;
  // value == (totalMS % 2000) / 2000
});

ticker.start();
```
