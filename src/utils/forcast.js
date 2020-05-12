const request = require('request')

const forcast = (location, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=2ebd4ffa35a5741d4cee6c0ae78ad725&query='+location.latitude+','+location.longitude
    request({url, json: true}, (error, {body}) => {
        if(error){
           callback('failed to connect to the server, check the network', undefined)
        }else if(body.error){
            callback('Please check the co-ordinates',undefined)
        }else{
            callback(undefined, {
                temp: body.current.temperature,
                expectedTemp: body.current.feelslike,
                weather: body.current.weather_descriptions[0]+'. It is '+body.current.temperature+' outside and feels like '+body.current.feelslike
            })
        
        }
    })
}

module.exports = forcast