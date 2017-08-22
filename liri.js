//Request Keys
var request = require('request');
var spotify = require('node-spotify-api');
var twitter = require ('twitter');
var keys = require('./keys.js');
var client = new twitter(keys.consumerKey);

//Holds Argument's array
var fs = require('fs');
var args = process.argv;
var command = process.argv[2];

//Movie/Song
var topic = "";

for (var i = 2; i < args.length; i++){
	if (i > 2 && i < args.length){
		topic = topic + "+" + args[i];
	}
	else{
		topic = topic + args[i];
	}
};


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
			searchSpotify("Born to Make You Happy");
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
	var params = {screen_name: 'maknowsthat'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (!error) {
  			for (var i = 0; i < tweets.length; i++){
  				var latest = tweets[i].created_at;
  				console.log("@MaKnowsThat:" + tweet[i].text + "Created At: " + date.substring(0, 19));
  				console.log('---------------');

  		// Log The Results
		  		fs.appendFile('log.txt',"@MaKnowsThat:" + tweet[i].text + "Created At: " + date.substring(0, 19));
		  		fs.appendFile('log.txt','---------------');
  			}
  		}	
		else{
		  	console.log('Error');
  		}
	});
}

function searchSpotify(){
	spotify.search({ type: 'track', query: song }, function(error, data) {
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
		  		fs.appendFile('log.txt',ssongInfo.preview_url);
		  		fs.appendFile('log.txt',songInfo.album.name);
		  		fs.appendFile('log.txt','---------------');
	}
    		
  		}
  		else{
  			console.log('Error');
  		}		
});

}

function omdbInfo(movie){
  var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true';

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
    if(movie === "Mr. Nobody"){
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