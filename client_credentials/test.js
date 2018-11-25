/**Copyright 2012-2016 Spotify AB

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/


var request = require('request'); // "Request" library

var client_id = 'd171b87bddde4f62b14525463e1bb3f1'; // Your client id
var client_secret = '956fbe6cddef4cfa80bfcd2d0f879712'; // Your secret

// Application requests authorization
var authOptions = {
  method: 'POST',
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true,
  resolveWithFullResponse: true
};


request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
  
      // use the access token to access the Spotify Web API
      var token = body.access_token;
      var options = {
        url: 'https://api.spotify.com/v1/albums/6akEvsycLGftJxYudPjmqK/tracks?limit=2',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {

        
        //From the new realeases of Belgium, get the ids of the albums
        //https://api.spotify.com/v1/browse/new-releases?country=BE
        // var new_albums = body.albums.items
        // var album_ids = []
        // for(let i=0; i < new_albums.length; i++){
        //     album_ids[i] = new_albums[i].id
        // }

        //From one id album, get the id of the single track
        track_id = body.items[0].id

        //Then from that track id, get the features


        console.log(body.items[0].id);
      });
    }
  });