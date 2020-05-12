const path = require ('path')
const geocode = require ('./utils/geocode')
const forcast = require ('./utils/forcast')
const express = require('express')
const hbs = require ('hbs')
const request = require ('request')

const app = express()
const port = process.env.PORT || 3000

//setting up path
const viewsPath = path.join(__dirname, '../templates/views')
const publicPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

//setting up handlebars engine and views
app.set('view engine', 'hbs')
app.set('views',viewsPath)
app.use(express.static(publicPath))
hbs.registerPartials(partialsPath)


app.get('',(req, res) =>{
    res.render('index', {
        title: 'Wearher App',
        name: 'Ziyaf Mohammed Sadiri'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help Me',
        name: 'Ziyaf Mohammed Sadiri'
    })
})

app.get('/about', (req, res) =>{
    res.render('about',{
        title: ' About Us',
        name: 'Ziyaf Mohammed Sadiri'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'No address Entered'
        })
     }else{
            geocode(req.query.address, (error, {latitude, longitude, location}={} )=> {
                if(error){
                    res.send({error})
                }else{
                    forcast({latitude, longitude}, (error, {temp, expectedTemp, weather}) =>{
                        if(error){
                            return res.send({error})
                        }else{
                            res.send({
                            location,
                            temp,
                            expectedTemp,
                            weather
                            }) 
                        }       
                    })
                }
            })
            
    }
})

app.get('/help/*', (req, res) =>{
    res.render('error', {
        message: 'Help Article not found'
    })
})

app.get('*', (req, res) =>{
    res.render('error', {
        message: ' Page not found'
    })
})


app.listen(port,()=>{
    console.log('server up on port '+ port)
})