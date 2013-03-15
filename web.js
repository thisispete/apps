var express = require('express');

var zip = 94110;
var feedparser = require('feedparser')


var app = express.createServer(express.logger());
app.configure(function(){
	app.get('/', function(request, response) {
	  feedparser.parseUrl('http://weather.yahooapis.com/forecastrss?p='+zip).on('article', function(a){
      response.send(a.yweather:condition.@.code);
	  });

	});

});


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});