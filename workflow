#!/usr/bin/env bash
vim getPlaylistItems.js 
echo module.exports = { > playlist_item_id.js
./getPlaylistItems >> playlist_item_id.js
echo } >> playlist_item_id.js
chmod +x playlist_item_id.js
./check 
./removeErroridFromPlaylist 
