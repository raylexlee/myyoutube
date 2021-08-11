#!/usr/bin/env node
const fs = require('fs');
const {google} = require('googleapis');
const videoId = process.argv[2];
const auth = require('./getOauth2Client.js');
const service = google.youtube('v3');
const videoItem = {
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
            "videoId": videoId
          }
        }
      }
  };

service.playlistItems.insert(videoItem , function(err, response) {
  if (err) {
    console.log('The API returned an error: ' + err);
  } else {
      console.log(response.data.snippet.title);
    }
});
