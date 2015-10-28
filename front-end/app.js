var express = require('express')
var app = express()
var Twit = require('twit')

app.use(express.static(__dirname + '/public'));

var T = new Twit({
    consumer_key:         'CO0QIryPxSTsxM5f94kzr8rby'
  , consumer_secret:      'nMuFLNd460HcJzM7xgolu3MldodNb9CmpxUr55N7ubBEAcCOQg'
  , access_token:         '35929248-6VzSZMtmRokPJqmwJ3QIWSLyzxAjJCJeHVOoyShH9'
  , access_token_secret:  'oVfSUB613mtSgsfNdrg5KbLLtlHIXwSMDnmaXiKwfSh8R'
})


var LMULat = '33.9704170';
var LMULon = '-118.4174050';
var NYCLat = '40.712784';
var NYCLon = '-74.005941';


// get based on search term, count, location, etc
app.get('/tw', function (req, res) {
    T.get('search/tweets', { q: req.query.geoSearchWord, count: 100, geocode: [ req.query.geoSearchWordLat, req.query.geoSearchWordLon , req.query.geoSearchWordRad ]}, function(err, data, response) {
        res.send(data);
    });
});


//
//  filter the twitter public stream by the word 'mango'.
//
app.get('/tw2', function (req, res) {
    var stream = T.stream('statuses/filter', { track: 'mango' });
    currentStream = [];
    stream.on('tweet', function (tweet) {
        currentStream.push(tweet);
    });
});

app.get('/currentStream', function (req,res) {
    res.send(currentStream);
})

var currentStream = [];


//
// get `specific` twitter users
//
app.get('/funnytw', function (req, res) {
    T.get('users/suggestions/:slug', { slug: req.query.slug }, function (err, data, response) {
        res.send(data);
    });
});


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at http://%s:%s', host, port);
});