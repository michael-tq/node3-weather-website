const request = require('request');

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoib3RhdG9wcyIsImEiOiJjanRqZnZiZnYwMXJrM3lwNnE4ZmYyejIyIn0.SJcKbpypNFsDJrkvBw3f9w&limit=1';

  request({url, json: true}, (error, {body}) => {
    if (error){
      callback('Unable to connect to location services.', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location, try another search.',undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}
//const {length} = response.body.features.length
module.exports = geocode;
