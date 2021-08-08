const fs = require('fs');
const {google} = require('googleapis');
const authorize = require('./authorize.js');
const Category = {
  "song": "Single Song",
  "album": "Album",
  "game": "Gaming Tutorial",
  "code": "Coding Tutorial",
  "radio": "Radio Drama",
  "drama": "Video Drama",
  "book": "Audio-book"
};
const videoJSONpath = '/home/raylex/gatherVideoIdFromYoutube/video.json';
const Video = JSON.parse(fs.readFileSync(videoJSONpath));
function insertPlaylistItems(auth) {
   const service = google.youtube('v3');
   const videoItem = videoId => {
      "auth": auth,
      "part": [
        "snippet"
      ],
      "resource": {
        "snippet": {
          "playlistId": "PLJrt_9xl0rNH_RNH8xsNPcj1Yyj3ZACkP",
          "position": 0,
          "resourceId": {
            "kind": "youtube#video",
            "videoId": videoId;
          }
        }
      }
  };
  const insertOneVideo = videoId => {
    service.playlistItems.insert(videoItem(videoId) , function(err, response) {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }
      console.log(response.data.snippet.title);
      });
  }
  Object.keys(Video).filter(id => (Video[id].category === "song") || (Video[id].category === "album"))
        .filter( id => !id.startsWith('PL') && !id.startsWith("OL") )
        .forEach(id => { insertOneVideo(id); } );
}
// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the YouTube API.
  // authorize(JSON.parse(content), getChannel);
  authorize(JSON.parse(content), insertPlaylistItems);
});
