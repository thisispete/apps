module.exports.read = function(zip, callback){
    zip = zip || 94110;

    var feedparser = require('feedparser');
    feedparser.parseUrl('http://weather.yahooapis.com/forecastrss?p='+zip).on('article', function(a){
      callback(String(lookup(parseInt(a['yweather:condition']['@'].code, 10))));
    });

    var lookup = function(input){
      switch(input){
        case 0 :
          //tornado
        case 1 :
          //tropical storm
        case 2 :
          //hurricane
          return "d";
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
        case 9 :
          //drizzle
        case 11 :
          //showers
        case 12 :
          //showers
        case 40 :
          //scattered showers
          return 8;
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
        case 15 :
          //blowing snow
        case 23 :
          //blustery
        case 24 :
          //windy
          return "b";
        case 19 :
          //dust
        case 20 :
          //foggy
        case 21 :
          //haze
        case 22 :
          //smoky
          return 3;
        case 25 :
          //cold
          return 1;
        case 26 :
          //cloudy
        case 27 :
          //mostly cloudy (night)
        case 28 :
          //mostly cloudy (day)
          return 4;
        case 29 :
          //partly cloudy (night)
        case 30 :
          //partly cloudy (day)
        case 44 :
          //partly cloudy
          return 5;
        case 31 :
          //clear (night)
        case 33 :
          //fair (night)
          return 7;
        case 32 :
          //sunny
        case 34 :
          //fair (day)
          return 6;
        case 36 :
          //hot
          return 2;
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
        default :
          return 0;
      }
    };
};