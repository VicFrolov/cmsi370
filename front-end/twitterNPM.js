var express = require('express')
var app = express()

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});


var Twit = require('twit')
 
var T = new Twit({
    consumer_key:         'CO0QIryPxSTsxM5f94kzr8rby'
  , consumer_secret:      'nMuFLNd460HcJzM7xgolu3MldodNb9CmpxUr55N7ubBEAcCOQg'
  , access_token:         '35929248-6VzSZMtmRokPJqmwJ3QIWSLyzxAjJCJeHVOoyShH9'
  , access_token_secret:  'oVfSUB613mtSgsfNdrg5KbLLtlHIXwSMDnmaXiKwfSh8R'
})

//get based on search term, count, location, etc
app.get('/tw', function (req, res) {
	T.get('search/tweets', { q: 'beverly hills playhouse', count: 100}, function(err, data, response) {
    res.json(data)
  })
})



// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });





// Stream from a location
// var sanFrancisco = [ '-122.75', '36.8', '-121.75', '37.8' ]
 
// var stream = T.stream('statuses/filter', { locations: sanFrancisco })
 
// stream.on('tweet', function (tweet) {
//   console.log(tweet)
// })