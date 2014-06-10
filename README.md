ScrobbleAlong Scrobbler
=======================

This is a set of scripts that figures out what's playing on a number of internet and wireless radio stations and scrobbles that information to some [last.fm](http://last.fm/) accounts. There is another repository [here](https://github.com/bonnici/scrobble-along-website) that holds a website which allows users to see the station details and scrobble along with the them. The site should be up and running [here](http://scrobblealong.com).

This requires a few environment variables:
* SA_STATION_CRYPTO_KEY: A random string used to encrypt the sessions of the radio station last.fm accounts
* SA_USER_CRYPTO_KEY: A random string used to encrypt the sessions of the radio station last.fm accounts
* SA_MONGO_URI: The URI of the MongoDB database that contains the user and station data
* SA_LASTFM_API_KEY: The Last.fm API key used for scrobbling
* SA_LASTFM_SECRET: The Last.fm API secret used for scrobbling
* SA_SHOULD_SCROBBLE: "true" if the script should actually post scrobbles, anything else if not