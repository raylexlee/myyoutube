#!/usr/bin/env node
const fs = require('fs');
const Songs = require('./songs_id.js');
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
const vids = Object.keys(Video).filter(id => (Video[id].category === "song") || (Video[id].category === "album"))
        .filter( id => !Songs.includes(id) && !id.startsWith('PL') && !id.startsWith("OL") ).join('\n');
console.log(vids);
