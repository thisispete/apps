var express = require('express');
var app = express();
var http = require('http');

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.bodyParser());
});

app.get('/', function(request, response) {
  response.send('thisispete');
});

app.get('/weatherclock', function(request, response) {
  var weatherclock = require('./src/weatherclock');
  weatherclock.read((res) => {
    response.send(String(res));
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
