const path=require('path')
const express= require('express')
const hbs=require('hbs')
const geocode=require('./Utils/Geocode')
const forecast=require('./Utils/Forecast')
const app=express()
//define paths for Express Config
const port=process.env.PORT ||3000
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
//console.log(viewsPath)
app.set('view engine', 'hbs')
app.set('views',viewsPath)
app.use(express.static(path.join(__dirname, '../public')))
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index', {
        title:'Weather',
        name:'Blaise Mahoro'
    })
})
app.get('/about',(req,res)=>{
    res.render('about', {
        title:'About',
        name:'Blaise Mahoro'
    })
})
app.get('/help',(req,res)=>{
    res.render('help', {
        title:'Help',
        HelpText:'help',
        name:'Blaise Mahoro'
    })
})
app.get('/weather',(req,res)=>{ 
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode.geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
               error
            })
        }
       
        forecast.forecast(longitude, latitude,(error, forecastData)=>{
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast:forecastData,
                    location,
                    address:req.query.address,
                    
                })

            })
        
    })

  
})
app.get('/products', (req,res)=>{
   if(!req.query.search){
       return res.send({
           error:'You must provide a search term'
       })

   }
   
  
    res.send({
        products:[]
    })

})

//404 Not Found
app.get('/help/*',(req,res)=>{
    res.render('404', {
        title:'404',
        name:'Blaise Mahoro',
        errorMessage:'Help article not found'
    })
})
app.get('*', (req,res)=>{
    res.render('404', {
        title:'404',
        name:'Blaise Mahoro',
        errorMessage:'Page not found'
    })
})
app.listen(port, ()=>{
    console.log('server is up on port '+ port)
})