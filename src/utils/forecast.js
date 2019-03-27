

const request = require('request')


const forecast = (latitude, longitude, callback) =>{

    const url = 'https://api.darksky.net/forecast/a5f78795c75d7bc5c409bfceefe4a73f/' + latitude + ',' + longitude
  
  
  
    request({url, json : true},(error,{body}) =>{
  
      if(error)
  
      {
  
        callback("Please check if your connexion is okay",undefined)
  
      } else if(body.error){
  
        callback("Please look for the correct location", undefined)
  
      }else{
  
        callback(undefined, body.daily.data[0].summary +"It is currently " +body.currently.temperature +" degrees out. There is a " +body.currently.precipProbability +" chance of rain")
  
      }
  
    })
  
  }

  module.exports = forecast