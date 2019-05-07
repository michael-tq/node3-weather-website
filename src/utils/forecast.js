const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/2d803b46e98026d54dabb854d0fbf174/' + encodeURIComponent(latitude) +
  ',' + encodeURIComponent(longitude);

  request({url, json: true}, (error, {body}) => {
    if (error){
      callback('Unable to connect to weather services.', undefined);
    } else if (body.error){
      callback('Unable to find location.', undefined);
    } else {
      console.log(body.daily.data[0])
      callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. The high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '. There is a ' +
      body.currently.precipProbability + '% chance of rain.')
    }
  })
}

module.exports = forecast;
//const {error} = repsonse.body.error
