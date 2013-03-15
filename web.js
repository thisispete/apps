var express = require('express');

var zip = 94110;
var feedparser = require('feedparser')
var findID = function(input){
  switch(input){
    case 0 :
      //tornado
    case 1 :
      //tropical storm
    case 2 :
      //hurricane
      return "d";
      break;
    case 5 :
      //mixed rain and snow
    case 6 :
      //mixed rain and sleet
    case 7 :
      //mixed snow and sleet
    case 8 :
      //freezing drizzle
    case 10 :
      //freezing rain
    case 17 :
      //hail
    case 18 :
      //sleet
    case 35 :
      //mixed rain and hail
      return 9;
      break;
    case 9 :
      //drizzle
    case 11 :
      //showers
    case 12 :
      //showers
    case 40 :
      //scattered showers
      return 8;
      break;
    case 13 :
      //snow flurries
    case 14 :
      //light snow showers
    case 16 :
      //snow
    case 41 :
      //heavy snow
    case 42 :
      //scattered snow showers
    case 43 :
      //heavy snow
    case 46 :
      //snow showers
      return "a";
      break;
    case 15 :
      //blowing snow
    case 23 :
      //blustery
    case 24 :
      //windy
      return "b";
      break;
    case 19 :
      //dust
    case 20 :
      //foggy
    case 21 :
      //haze
    case 22 :
      //smoky
      return 3;
      break;
    case 25 :
      //cold
      return 1;
      break;
    case 26 :
      //cloudy
    case 27 :
      //mostly cloudy (night)
    case 28 :
      //mostly cloudy (day)
      return 4;
      break;
    case 29 :
      //partly cloudy (night)
    case 30 :
      //partly cloudy (day)
    case 44 :
      //partly cloudy
      return 5;
      break;
    case 31 :
      //clear (night)
    case 33 :
      //fair (night)
      return 7;
      break;
    case 32 :
      //sunny
    case 34 :
      //fair (day)
      return 6;
      break;
    case 36 :
      //hot
      return 2;
      break;
    case 3 :
      //severe thunderstorms
    case 4 :
      //thunderstorms
    case 37 :
      //isolated thunderstorms
    case 38 :
      //scattered thunderstorms
    case 39 :
      //scattered thunderstorms
    case 45 :
      //thundershowers
    case 47 :
      //isolated thundershowers
      return "c";
      break;
    default :
      return 0;
      break;
  }
}

var app = express();
app.configure(function(){
	app.get('/', function(request, response) {
	  feedparser.parseUrl('http://weather.yahooapis.com/forecastrss?p='+zip).on('article', function(a){
      response.send(String(findID(parseInt(a['yweather:condition']['@'].code, 10))));
	  });

	});

});


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});