const axios = require("axios");

module.exports.read = function(callback){
    const url = 'http://api.wunderground.com/api/8d6397422bb399b2/conditions_v11/q/94609.json';

    axios.get(url)
      .then(response => {
        var data = response.data;

        var icon = data.current_observation.icon;
        var output = 0;
        var isNight = false;
        if (icon.substring(0,3) == 'nt_'){
          isNight = true;
          icon = icon.substring(3);
        }

        switch(icon){
          case 'flurries':
          case 'chanceflurries':
          case 'snow':
          case 'chancesnow':
            //snow
            output = "a";
            break;
          case 'chancerain':
          case 'rain':
            //showers
            output = 8;
            break;
          case 'chancesleet':
          case 'sleet':
            //mixed rain and snow
            //hail
            //sleet
            output = 9;
            break;
          case 'clear':
            //sunny
            output = 6;
            if (isNight) {
              //clear (night)
              output = 7;
            }
            break;
          case 'partlycloudy':
          case 'mostlycloudy':
          case 'partlysunny':
            //partly cloudy
            output = 5;
            break;
          case 'cloudy':
            //cloudy
            output = 4;
            break;
          case 'fog':
          case 'hazy':
            //foggy
            output = 3;
            break;
          case 'mostlysunny':
          case 'sunny':
            //sunny
            output = 6;
            break;
          case 'tstorms':
          case 'chancetstorms':
            //thunderstorms
            output = "c";
            break;
          case 'unknown':
          default:
            output = 0;
            break;
        }

        if(data.current_observation.feelslike_f > 95 ){
          //hot
          output = 2;
        }
        if(data.current_observation.feelslike_f < 30 ){
          //cold
          output = 1;
        }
        if (data.current_observation.wind_gust_kph > 40) {
          //windy
          output = "b";
        }
        if (data.current_observation.wind_gust_kph > 75) {
          //tornado
          //hurricane
          output = "d";
        }

        callback(output);
      })
      .catch(error => {
        console.log(error);
        callback(error);
      });


};
