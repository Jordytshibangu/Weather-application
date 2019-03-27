const path = require('path')
const express = require('express')
const hbs = require('hbs')

 const geocode = require('./utils/geocode.js')
 const forecast = require('./utils/forecast.js')

 const app = express()
 const port = process.env.PORT || 3000

//  Define patrhs for Express config


const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')



// Setup handlebars engine and viewa location

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve

app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index',{
        title : "Weather app",
        name : "Jordy"
    })
})

app.get('/about',(req, res) =>{
    res.render('about',{
        title : "About page",
        name : "jordy"
    })
})

app.get('/help',(req, res) =>{
    res.render('help',{
        titlee : "help him out",
        name : "Jordy"
    })
})
app.get('/products',(req, res)=>{
    if(!req.query.search){
        return res.send({
            error : 'You must provide a search term'
        })
    }
     console.log(req.query.search)
    res.send({
        product : []
    })
})

//======dealing with the weather request

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error : 'Please provide an address!'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{

    if(error){
         return res.send({error})
    }

  forecast(latitude, longitude, (error, forecastdata) => {

    if(error){
        return res.send({error})
    }
       res.send({
        forecast  : forecastdata,
        location : location,
        address : req.query.address
    })
  
  })

}) 

    //console.log(req.query.address)
    // res.send({
    //     forecast  : 'It is showering',
    //     location : 'Cape Town',
    //     address : req.query.address
    // })
})
//====In case someone is looking for something in the help section 

app.get('/help/*',(req, res) =>{
res.send('404',{
    title : '404',
    name : 'Jordy',
    errorMessage : 'Page article not found'
})
})

//======Will handle the links that have not been created

app.get('*',(req, res)=>{
    res.render('404',{
        title : '404',
        name : 'Jordy',
        errorMessage : 'Page not found'
    })
})

app.listen(port, ()=>{
    console.log('The server is Up on port '+port)
})



//routes=====
//app.com
//app.com/help
//app.com/about

//================== This is for the static content ====================================== 
// app.get('',(req,res)=>{

//     res.send('<h1>Hello express</h1>') //html page

// })

// app.get('/help',(req,res)=>{
//     res.send([{
//         name : 'jordy',
//         age : 21
//     },{
//         name : 'evodie',
//         age : 19
//     }])
// })
// app.get('/about',(req,res)=>{

//========================================================================================