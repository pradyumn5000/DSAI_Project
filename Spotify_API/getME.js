const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQAlLzzQ5jan4rQU0PErpM9xiGSa9_UK6cdH-rT22U-zUPYleIJrrfsT2i_JvCyuSvNBjUzvdrSh1ZE5g-L1ZsnN8MK5ngL6eKP1oxxji5aWJdDIDCCXHigTv17j4IXyW3U7e1s-b6BUeBObP3O5jO0i1kEnN39Cty_NRl-YcTxFxE2c2TT3ZoJEvlAS7NubR8i6KcOaSGQB2mCiAVsdOI8_6te85aOOS3462zCvA_RHold_9QNax54gln7PWh5RwF2RVJXrGAE6CXmeEKgfO0A7bk26BbRWC2c";

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

//GET MY PROFILE DATA
function getMyData() {
  (async () => {
    const me = await spotifyApi.getMe();
    // console.log(me.body);
    getUserPlaylists(me.body.id);
  })().catch(e => {
    console.error(e);
  });
}

const delay = ms => new Promise(res => setTimeout(res, ms));

//GET SONGS FROM PLAYLIST
function driver(playlistId) {(async () => {
  final = [];
  for (let i = 0; i < 9901; i = i+100) {
    let track = await getPlaylistTracks(playlistId,i);
    final.push(track);
    await delay(15000);
  }
  console.log("---------------+++++++++++++++++++++++++")
  const tracksJSON = { final }
    let data1 = JSON.stringify(tracksJSON);
    fs.writeFileSync(playlistId+'.json', data1);
  })().catch(e => {
  console.error(e);
  });
}


async function getPlaylistTracks(playlistId, x) {
  const data = await spotifyApi.getPlaylistTracks(playlistId, {
    offset: x,
    limit: 100,
    fields: 'items'
  })

  // console.log('The playlist contains these tracks', data.body);
  // console.log('The playlist contains these tracks: ', data.body.items[0].track);
  // console.log("'" + playlistName + "'" + ' contains these tracks:');
  let tracks = [];

  for (let track_obj of data.body.items) {
    const track = track_obj.track;
    let track_data = await getTrack(track.id);
    // console.log(track_data);
    console.log(track.name)
    const final = Object.assign(track,track_data.body);
    tracks.push(final);
  }
  return tracks;
}

async function getTrack(songid) {
  const data = await spotifyApi.getAudioFeaturesForTrack(songid);
  return data;
}

driver('5S8SJdl1BDc0ugpkEvFsIL');