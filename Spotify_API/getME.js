const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQCI3ggEePDpfJdsFVeMPSvYJ5CjMI58b24iBIfOUojCqz21CTFDqaY41NMRlXzI64VHsYvAwqt2MnjcqTme8fl3nu5Bi6XLgzAD24wrE4Ps0eYCj5LFfqufRpQtk_DIBBZV6aoI0hA8jW9xHQHb2HOG5ihxxEy2WHbDWdyM4fwDKwx694aYIB6-9wIxE1TIM7zN6Pf4zvUu_DSvGi5t1ohyZEj6WE4bS1rSDnikcE6ZH1332cQ1iKSIcJk4bQpGhIbRXgSEEDwTJVOC5YNybC_7K8Z_rNgNaew";

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);




//GET SONGS FROM PLAYLIST
async function getPlaylistTracks(playlistId) {

  const data = await spotifyApi.getPlaylistTracks(playlistId, {
    offset: 1,
    limit: 100,
    fields: 'items'
  })

  // console.log('The playlist contains these tracks', data.body);
  // console.log('The playlist contains these tracks: ', data.body.items[0].track);
  // console.log("'" + playlistName + "'" + ' contains these tracks:');
  let tracks = [];

  for (let track_obj of data.body.items) {
    const track = track_obj.track
    tracks.push(track);
    // console.log(track.name + " : " + track.artists[0].name)
  }
  
  console.log("---------------+++++++++++++++++++++++++")
  const tracksJSON = { tracks }
  let data = JSON.stringify(tracksJSON);
  fs.writeFileSync(playlistId+'.json', data);
}

getPlaylistTracks('7eWew4DoxwxMfIH8mZVej4');
