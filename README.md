#NODE hertz-timer-demo - A demonstration of the hertz-timer library

This is a simple NodeJS / ExpressJS app to demonstrte the hertz-timer library.

It creates an instance of the hertz-timer.generator class with a hertz-timer.counter attached. These are then exposed via a (very basic) 
Express API and static pages. Install by cloning this repository and running 'npm install' to download all of the npm dependencies, run with 'node index.js' (or however) and then visit http://localhost:3000 to see the API output and http://localhost:3000/static to view the web interface.

From the web interface you can change the running configuration values exposed and see its current hertz history. Change the parameters in 
the index.js config object to set different defaults (e.g. to keep a longer counter history).

The web interface is intended for demonstration purposes only and uses a number of micro JS libraries (superagent for AJAX requests and 
sparklines (non-JQ version) for a simple graph.

##License
CC-BY-SA
