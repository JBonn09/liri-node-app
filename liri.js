require("dotenv").config();

var request = require("request")
var keys = require("./keys.js");
var SpotifyApi = require('node-spotify-api');
var fs = require("fs");

var spotify = new SpotifyApi(keys.spotify);



var command = process.argv[2];

var query = process.argv[3];

function runLiri (command) {
  switch(command) {
    case "spotify-this-song" :
      spotifyFunction()
      break;
  
      case "concert-this" :
      concertFunction()
      break;
  
      case "movie-this" :
      movieFunction()
      break;
  
      case "do-what-it-says" :
      doFunction()
      break;
  };
}

function spotifyFunction() {

  spotify.search({ type: 'track', query: query }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);


    }
   
    var album = data.tracks.items[0].album.name

    var artist = data.tracks.items[0].artists[0].name

    var previewUrl = data.tracks.items[0].preview_url

    var name = data.tracks.items[0].name

  console.log("Title: " + name + "\n Artits: " + artist + "\n Album" + album + "\n Preview: " + previewUrl); 
  });

};

function concertFunction () {

  request("https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp" , function(error, response, body) {
    if(error) console.log(error);
  var data = JSON.parse(body)
  // name of venue, location and date

  var venue = data[0].venue

  var date = data[0].datetime

  console.log("Place: " + venue.name + "\n State: " + venue.city + "\n Date: " + date)

});  

};

function movieFunction() { 

  request("http://www.omdbapi.com/?apikey=trilogy&t=" + query, function(error, response, body) {
    if(error) console.log(error);
  var data = JSON.parse(body)

  var title = data["Title"]
  var year = data["Year"]
  var rated = data["Rated"]
  var release = data["Released"]
  var lang = data["Language"]
  var act = data["Actors"]
  var rotten = data["Ratings"][1].Value
  var imdb = data["Ratings"][0].Value
  var plot = data["Plot"]

   console.log("Title: " + title + "\n Year: " + year + "\n Rated: " + rated + "\n Language: " + lang + "\n Actors: " + act + "\n Rotten Tomatoes: " + rotten + "\n IMDB: " + imdb + "\n Plot: " + plot);
  })

};

function doFunction() {
  // use fs.readFile() to read random.txt
  fs.readFile("random.txt", "utf-8", function (err, data) {
    if (err) {
      console.log(err) 
      return false
    }

    const dataArray = data.split(",");

    query = dataArray[1];

    runLiri(dataArray[0])

  }) 
};


runLiri(command);