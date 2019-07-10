const request = require('request')
//Geocoding
const geocode=(address, callback)=>{
    //address=address.replace(" ","%20%")
   const url ="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiYmxhaXNlMTQ0IiwiYSI6ImNqeDB6MWFhYTA0Y3U0NW83ZGt1MTlldmcifQ.jcOIC5CM0RnwO24iI3aWjQ"
   request({url, json:true}, (error,response)=>{
    if(error){
            callback("Unable to get data!", undefined)
    }else if(response.body.features.length===0) {
            callback('Unable to find location!', undefined)
    }else {
                callback(undefined, {
                    longitude:response.body.features[0].center[0], 
                    latitude:response.body.features[0].center[1],
                    location: response.body.features[0].place_name

                })
    }
})
}

module.exports= {
    geocode:geocode
}