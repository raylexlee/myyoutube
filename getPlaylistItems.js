#!/usr/bin/env node
const songsPlaylistId = "PLJrt_9xl0rNH_RNH8xsNPcj1Yyj3ZACkP";
const songs_blistPlaylistId = "PLJrt_9xl0rNHsohKnkTWwB9sGTQRhILxB";
const fs = require('fs');
const {google} = require('googleapis');
const authorize = require('./authorize.js');
const PageToken = process.argv[2];
function getPlaylistItems(auth) {
  const itemObj =  {
      "auth": auth,
      "part": [
        "contentDetails"
      ],
      "maxResults": 50,
      "playlistId": songs_blistPlaylistId
  };
  if (PageToken != 'RaylexLee') itemObj['pageToken'] = PageToken;
  const service = google.youtube('v3');
  service.playlistItems.list(itemObj).then(
     response => { console.log(response.data.items.map( e => `'${e.contentDetails.videoId}':'${e.id}',`).join('\n'));
                   const PageToken = response.data.nextPageToken;
                   if (PageToken) console.log('PageToken=' + PageToken); }
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
