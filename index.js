// Define the callback to run 100-200 times per second
var tick = 0;
function demo(){
    tick++;
    if(tick%100 == 0) process.stdout.write('.');
}

var hertzTimer = require('hertz-timer'); 
var hertzCounter = new hertzTimer.counter(10);
var config = {
    hertzCounter: hertzCounter,
    callback: demo,
    stopTime: 300000,
    active:   true,
    minHertz: 1,
    maxHertz: 50,
    stopCount: null,
    wakeCycle: 1000,
    variationEvery: 1000,
    hertzVariation: 50
};
var generator = new hertzTimer.generator(config);

generator.on('complete',function(){ console.log('Cycles complete\n' ); });
generator.on('started', function(){ console.log('New cycles started'); });
generator.on('stopped', function(){ console.log('Cycles stopped');     });

// ExpressJS Setup

var express = require('express');
var app = express();
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');


app.use( bodyParser.json() );
app.use('/static', serveStatic(__dirname + '/static') );

app.get('/', function (req, res) {
    res.json(generator);
});

app.post('/stop', function (req, res) {
    generator.active = false;
    res.json(generator);
});

app.post('/start', function (req, res) {
    generator.active = true;
    res.json('ok');
});

app.post('/config', function (req, res) {
    // console.log(req.body);
    
    for(var prop in req.body) {
        if(generator[prop] && parseInt(req.body[prop])){
            generator[prop] = parseInt(req.body[prop]);
        } 
        //console.log(prop + ' --> ' + req.body[prop]);
    }
    
    res.json('ok');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
