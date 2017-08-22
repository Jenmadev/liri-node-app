exports.twitterKeys = new Twitter({
	consumerKey:process.env.TWITTER_CONSUMER_KEY,
	consumerSecret:process.env.TWITTER_CONSUMER_SECRET,
	tokenKey:process.env.TWITTER_ACCESS_TOKEN_KEY,
	tokenSecret:process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

exports.spotifyKeys = new Spotify({
 	id: process.env.SPOTIFY_ID,
 	secret: process.env.SPOTIFY_SECRET
});

exports.omdbKeys = new Omdb({
	id: process.env.OMDB_API_KEY
});