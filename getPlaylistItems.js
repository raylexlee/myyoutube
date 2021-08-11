#!/usr/bin/env node
const fs = require('fs');
const {google} = require('googleapis');
const authorize = require('./authorize.js');
const videoId = process.argv[2];
function getPlaylistItems(auth) {
  const service = google.youtube('v3');
  service.playlistItems.list({
      "auth": auth,
      "part": [
        "contentDetails"
      ],
      "maxResults": 320,
      "playlistId": "PLJrt_9xl0rNH_RNH8xsNPcj1Yyj3ZACkP"
    }).then( response => { console.log(response.data.items.map( e => e.contentDetails.videoId));
                           console.log('nextPageToken=' + response.data.nextPageToken); }
                , err => { console.log('The API returned an error: ' + err); });
}
// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the YouTube API.
  // authorize(JSON.parse(content), insertPlaylistItems);
  authorize(JSON.parse(content), getPlaylistItems);
});
