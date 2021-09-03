#!/usr/bin/env node
const fs = require('fs');
const {google} = require('googleapis');
const authorize = require('./authorize.js');
const playlist_item_id = require('./playlist_item_id.js');
const videoId = process.argv[2];
function deletePlaylistItem(auth) {
  const service = google.youtube('v3');
  service.playlistItems.delete({
               "auth": auth,
               "id": playlist_item_id[videoId]
             }).then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
}
// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the YouTube API.
  // authorize(JSON.parse(content), insertPlaylistItems);
  authorize(JSON.parse(content), deletePlaylistItem);
});
