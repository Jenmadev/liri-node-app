//Request Keys
var request = require('request');
var spotify = require('node-spotify-api');
var twitter = require ('twitter');
var keys = require('./keys.js');
var client = new twitter({
	consumer_key: keys.twitterKeys.consumerKey,
	consumer_secret:keys.twitterKeys.consumerSecret,
	access_token_key:keys.twitterKeys.tokenKey,
	access_token_secret:keys.twitterKeys.tokenSecret
});
// console.log(keys.twitterKeys.consumerKey);
// console.log(keys.twitterKeys.consumerSecret);
// console.log(keys.twitterKeys.tokenKey);
// console.log(keys.twitterKeys.tokenSecret);
var spotify = new spotify({
	id: keys.spotifyKeys.id,
 	secret: keys.spotifyKeys.secret
});

// console.log(keys.spotifyKeys.id);
// console.log(keys.spotifyKeys.secret);


// var omdb = new omdb({
// 	id: keys.omdbKeys.id
// });
//Holds Argument's array
var fs = require('fs');
var args = process.argv;
var command = process.argv[2];
var song = process.argv[3];

//Movie/Song
var topic = "";

for (var i = 3; i < args.length; i++){
	if (i > 3 && i < args.length){
		topic = topic + "+" + args[i];
	}
	else{
		topic = topic + args[i];
	}
};
// console.log("SONG: "+ topic);

//switch case
switch(command){
	case"my-tweets":
	myTweets();
	break;

	case "spotify-this-song":
		if(topic){
			searchSpotify(topic);
		}
		else {
			searchSpotify("The Sign");
		}
	break;

	case "movie-this":
		if(topic){
			omdbInfo(topic);
		}
		else {
			omdbInfo("Mr. Nobody");
		}
	break;

	case "do-what-it-says":
		doIt();
	break;

	default:
		console.log("{Enter one of the following commands: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
}


function myTweets(){
	//Show latest tweets limit 20 
	var params = {screen_name: 'MaKnowsThat'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		console.log(response);
  		console.log(tweets);
  		if (!error) {
  			for (var i = 0; i < tweets.length; i++){
  				var latest = tweets[i].created_at;
  				console.log("@MaKnowsThat: " + tweets[i].text + "Created At: " + latest.substring(0, 19));
  				console.log('---------------');

  		// Log The Results
		  		fs.appendFile('log.txt',"@MaKnowsThat:" + tweets[i].text + "Created At: " + latest.substring(0, 19));
		  		fs.appendFile('log.txt','---------------');
  			}
  		}	
		else{
		  	console.log('Error from Twitter' + error);
  		}
	});
}

function searchSpotify(topic){
	
	spotify.search({ type: 'track', query: topic}, function(error, data) {
  		if (!error) {
  			for (var i = 0;  i < data.tracks.items.length; i++){
  				var songInfo = data.tracks.items[i];
  			//Artists
  				console.log("Artist(s): " + songInfo.artists[0].name);
  			//Song Name
  				console.log("Song: " + songInfo.name);
  			//Preview Lin
  				console.log("Preview Link: " + songInfo.preview_url);
  			//Album Name
  				console.log("Album Name: " + songInfo.album.name);
  				console.log('---------------');

  		// Log The Results
		  		fs.appendFile('log.txt',songInfo.artists[0].name);
		  		fs.appendFile('log.txt',songInfo.name);
		  		fs.appendFile('log.txt',songInfo.preview_url);
		  		fs.appendFile('log.txt',songInfo.album.name);
		  		fs.appendFile('log.txt','---------------');
	}
    		
  		}
  		else{
  			console.log('Error From Spotify');
  		}		
});

}

function omdbInfo(topic){
  var omdbURL = 'http://www.omdbapi.com/?apikey='+ keys.omdbKeys.id +'&t=' + topic + '&plot=short&tomatoes=true';

  request(omdbURL, function (error, response, body){
    if(!error && response.statusCode == 200){
      var body = JSON.parse(body);

      console.log("Title: " + body.Title);
      console.log("Release Year: " + body.Year);
      console.log("IMdB Rating: " + body.imdbRating);
      console.log("Country: " + body.Country);
      console.log("Language: " + body.Language);
      console.log("Plot: " + body.Plot);
      console.log("Actors: " + body.Actors);
      console.log("Rotten Tomatoes: " + body.tomatoRating);
      console.log("Rotten Tomatoes URL: " + body.tomatoURL);

      // Log The Results
      fs.appendFile('log.txt', "Title: " + body.Title);
      fs.appendFile('log.txt', "Release Year: " + body.Year);
      fs.appendFile('log.txt', "IMdB Rating: " + body.imdbRating);
      fs.appendFile('log.txt', "Country: " + body.Country);
      fs.appendFile('log.txt', "Language: " + body.Language);
      fs.appendFile('log.txt', "Plot: " + body.Plot);
      fs.appendFile('log.txt', "Actors: " + body.Actors);
      fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + body.tomatoRating);
      fs.appendFile('log.txt', "Rotten Tomatoes URL: " + body.tomatoURL);

    } else{
      console.log('Error occurred.')
    }
    if(topic === "Mr. Nobody"){
      console.log("-----------------------");
      console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      console.log("It's on Netflix!");

      // Log The Results
      fs.appendFile('log.txt', "-----------------------");
      fs.appendFile('log.txt', "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      fs.appendFile('log.txt', "It's on Netflix!");
    }
  });

}

function doIt(){
  fs.readFile('random.txt', "utf8", function(error, data){
    var text = data.split(',');

    searchSpotify(text[1]);
  });
}