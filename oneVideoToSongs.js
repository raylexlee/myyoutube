#!/usr/bin/env node
const fs = require('fs');
const {google} = require('googleapis');
const authorize = require('./authorize.js');
const videoId = process.argv[2];
const videoItem = (auth, videoId) => { return {
      "auth": auth,
      "part": [
        "snippet"
      ],
      "resource": {
        "snippet": {
          "playlistId": "PLJrt_9xl0rNHsohKnkTWwB9sGTQRhILxB",
          "position": 0,
          "resourceId": {
            "kind": "youtube#video",
            "videoId": videoId
          }
        }
      }
      };
  }; 
function insertPlaylistItems(auth) {
  const service = google.youtube('v3');
  service.playlistItems.insert(videoItem(auth, videoId) , function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
    } else {
        console.log(response.data.snippet.title);
      }
  });
}
// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the YouTube API.
  // authorize(JSON.parse(content), insertPlaylistItems);
  authorize(JSON.parse(content), insertPlaylistItems);
});
