// index.js
// where your node app starts

// For .env file
require('dotenv').config();

var port = process.env.PORT || 3000;

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
const e = require('express');
app.use(cors({optionsSuccessStatus: 200})); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({greeting: 'hello API'});
});

/* Get time based on optional param */
app.get('/api/:date?', function (req, res) {
  var date_string = req.params.date;

  var timeFromStr = new Date(date_string);
  var timeFromNum = new Date(Number(date_string));
  console.log('UTC: ' + timeFromStr);
  console.log('Unix: ' + timeFromNum);

  if (date_string === undefined) {
    // When param is not present, Get current time
    var currentTime = new Date();

    res.send({unix: currentTime.getTime(), utc: currentTime.toUTCString()});
  } else if (timeFromNum.toString() !== 'Invalid Date') {
    // When param is UNIX timestamp
    res.send({unix: Number(date_string), utc: timeFromNum.toUTCString()});
  } else if (timeFromStr.toString() !== 'Invalid Date') {
    // When param is non-unix (e.g. 2015-12-25)

    // Get Unix from param
    var unixTime = timeFromStr.getTime();

    res.send({unix: unixTime, utc: timeFromStr.toUTCString()});
  } else {
    // When date input is in invalid format
    res.send({error: timeFromStr.toString()});
  }
});

// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
