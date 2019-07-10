const request=require('request')
const forecast=(longitude, latitude, callback)=>{
    const url ="https://api.darksky.net/forecast/06bcd2858caef95411c303e10d1e7670/"+ latitude+","+ longitude+"/?units=si"
    request({url, json:true}, (error,response)=>{
        if(error){
            callback('Unable to connect to Forecast Server', undefined)
        } else if(response.body.error){
            callback('Unable to get the forecast', undefined)
        } else{
            callback(undefined, {
                Summary:response.body.daily.data[0].summary, 
                Temperature:response.body.currently.temperature,
                Precipitation:response.body.currently.precipProbability
            })
        }
    })
}

module.exports={
    forecast:forecast
}