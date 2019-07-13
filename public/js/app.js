console.log('front end javascript loaded')


const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne= document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    messageOne.textContent='Loading...'
    messageTwo.textContent=''
  
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){

            messageOne.textContent=data.error
        } else{
        console.log(data)
        messageOne.textContent="Location: " +data.location
        messageTwo.innerHTML="Forecast: " +data.forecast.daily.data[0].summary+ "<br><br>Temperature: "+data.forecast.Temperature+
        "°C.<br><br> "+"Min. Temperature: "+data.forecast.daily.data[0].temperatureMin+"°C.<br> <br>"+
        "Max. Temperature: "+data.forecast.daily.data[0].temperatureMax+"°C.<br> <br>"+
        "Precipitation: "+ data.forecast.Precipitation+". s"
        }
    })
    
})
    

})

