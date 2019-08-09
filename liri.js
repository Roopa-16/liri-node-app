require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require('moment');
var spotify = new Spotify(keys.spotify);
var command = process.argv[2]
var songName = process.argv[3]
var artist = process.argv[3];
var movie = process.argv[3];
var appendNote = function (data) {
    fs.appendFile('log.txt', data + '\n', function (err) {
      if (err) throw err;
    });
   }

switch (command) {
    case "concert-this":
        if(artist == null) {
            console.log("I'm sorry nobody is playing in your neighborhood, please try your search again...");
            appendNote("\nI'm sorry nobody is playing in your neighborhood, please try your search again...");
        } 
        else {
        axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function(response){ 
               console.log("Name of the venue: " + response.data[0].venue.name + "\nLocation: " + response.data[0].venue.city + "\nDate of event: " + moment(response.data[0].datetime).format("MM/DD/YYYY"))
               appendNote("Name of the venue: " + response.data[0].venue.name + "\nLocation: " + response.data[0].venue.city + "\nDate of event: " + moment(response.data[0].datetime).format("MM/DD/YYYY"))
            },
                function (error) {
                    if (error.response) {                      
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        console.log(error.request);
                    } 
                    else {
                        console.log('Error', error.message);
                    }
                console.log(error.config);
            })
        }
    break;
    
    case "spotify-this-song" :
        if (songName == null) {
            if (command) {
                spotify.request('https://api.spotify.com/v1/tracks/3DYVWvPh3kGwPasp7yjahc')
                    .then(function (data) {
                        var artists = data.artists[0].name;
                        var songTitle = data.name;
                        var songUrl = data.preview_url;
                        var songAlbum = data.album.name;
                        console.log("Artist(s): " + artists + "\nThe Song's Name: " + songTitle + "\nSpotify Preview Link: " + songUrl + "\nAlbum: " + songAlbum)
                        appendNote("Artist(s): " + artists + "\nThe Song's Name: " + songTitle + "\nSpotify Preview Link: " + songUrl + "\nAlbum: " + songAlbum);
                    })
                    .catch(function (err) {
                        console.error('Error occurred: ' + err);
                   });
            }
        } 
        else {
            if (command) {
                spotify.search({
                    type: "track",
                    query: songName,
                    limit: 10
                },
                function (err, data) {
                    if (err) {
                        console.log('Error occurred: ' + err);
                        return;  
                    } 
                    else {
                        var songInfo = data.tracks.items[0];
                        var artists = songInfo.artists[0].name;
                        var songTitle = songInfo.name;
                        var songUrl = songInfo.preview_url;
                        var songAlbum = songInfo.album.name;
                        console.log("Artist(s): " + artists);
                        console.log("The Song's Name: " + songInfo.name);
                        console.log("Spotify Preview Link: " + songInfo.preview_url);
                        console.log("Album: " + songInfo.album.name);
                        appendNote(" \n ")
                    };
                })
            };
        }
        break;

    case "movie-this" :
        if (movie == null) {
            axios.get("https://omdbapi.com/?t=mr.nobody&apikey=trilogy")
                .then(function (resp) {
                    console.log("Movie Title: " + resp.data.Title + "\nYear Released: " + resp.data.Year + "\nIMDB Rating: " + resp.data.imdbRating + "\nRotten Tomatoes Rating: " + resp.data.Ratings[1].Value + "\nCountry Produced: " + resp.data.Country + "\nLanguage of the Movie: " + resp.data.Language + "\nMovie Plot: " + resp.data.Plot)
                    console.log("If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947")
                    console.log("It is on Netflix!")
                    appendNote("Movie Title: " + resp.data.Title + "\nYear Released: " + resp.data.Year + "\nIMDB Rating: " + resp.data.imdbRating + "\nRotten Tomatoes Rating: " + resp.data.Ratings[1].Value + "\nCountry Produced: " + resp.data.Country + "\nLanguage of the Movie: " + resp.data.Language + "\nMovie Plot: " + resp.data.Plot);
                }, function (error) {
                    if (error.resp) {                       
                        console.log(error.resp.data);
                        console.log(error.resp.status);
                        console.log(error.resp.headers);
                    } else if (error.request) {                       
                        console.log(error.request);
                    } else {                       
                        console.log('Error', error.message);
                    }
                        console.log(error.config);
                })
        } 
        else {
            axios.get("https://omdbapi.com/?t=" + movie  + "&apikey=trilogy")           
            .then(function(resp) {            
                console.log("Movie Title: " + resp.data.Title);
                console.log("Year Released: " + resp.data.Year);
                console.log("IMDB Rating: " + resp.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + resp.data.Ratings[1].Value);
                console.log("Country Produced: " + resp.data.Country);
                console.log("Language of the Movie: " + resp.data.Language);
                console.log("Movie Plot: " + resp.data.Plot);
                console.log("Movie Actors: " + resp.data.Actors);
                appendNote( " " );
            }, function(error) {
                if (error.resp) {                    
                    console.log(error.resp.data);
                    console.log(error.resp.status);
                    console.log(error.resp.headers);
                } 
                else if (error.request) {               
                    console.log(error.request);
                } 
                else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
           })
        }
    break;
    case "do-what-it-says" :
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }
            else {
                console.log("\n");
            }
            var dataArr = data.split(",");
            var song = dataArr[1];
            spotify.search({
                type: "track",
                query: song,
                limit: 1            
            },
            function (err, data) {
                if (err) {
                    console.log('Error occurred: ' + err);
                    return;
                } 
                else {
                    var songInfo = data.tracks.items[0];
                    var artists = songInfo.artists[0].name;
                    var songTitle = songInfo.name;
                    var songUrl = songInfo.preview_url;
                    var songAlbum = songInfo.album.name;
                    console.log("The Song's Name: " + songTitle + "\nSpotify Preview Link: " + songUrl + "\nAlbum: " + songAlbum + "\n")
                    appendNote("The Song's Name: " + songTitle + "\nSpotify Preview Link: " + songUrl + "\nAlbum: " + songAlbum + "\n");

                };
            })           
        });       
    break;
    default : 
        console.log("I'm sorry, I have no results for your search");    
} 