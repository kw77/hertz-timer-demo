document.addEventListener('DOMContentLoaded', init, false);

var chart, chartbox, chartUpdate, infobox;

function init(){
    chartbox = document.getElementById("chartbox");
    infobox  = document.getElementById("infobox");

    var chartOptions = {
        width: 325,
        endColor: "transparent",
        startColor: "blue",
        minValue: 0
    }
    
    chart = new Sparkline(chartbox,chartOptions);
    chartUpdate = setInterval(getData,500);
}

function getData(){
    window.superagent.get('/').end(updateChart);
}

function updateChart(err, res){
    infobox.innerText = res.body.hertzCounter.data.labels[0];
    chart.options.maxValue = res.body.maxHertz;
    chart.draw(res.body.hertzCounter.data.values.slice(1)); // ignore 1st value; in flux
    
    //Dynamically update form data - TO DO (HERE){
}

function post(path){
    window.superagent.post('/'+path).end();
}

function sendOptions(){
    formData = new FormData(document.getElementById('optionsForm'));
    var data = {};
    for(var pair of formData.entries()) {
        data[pair[0]] = pair[1]; 
    }
    
    window.superagent.post('/config').send(data).end(function(err, res){
        if(err) alert(err);
    });
}