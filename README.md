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
