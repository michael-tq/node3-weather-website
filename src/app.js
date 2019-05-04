const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
//express is actually a function

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Michael'
  })
})

app.get('/about', (req, res) => {
    res.render('about', {
      title: 'about me',
      name: 'Michael'
    })
})

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'This is some helpful text.',
    title: 'Help',
    name: 'Michael'
  })
})

app.get('/weather', (req, res) => {
if (!req.query.address){
  return res.send({
    error: 'You must provide an address'
  })
}
geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
  if (error) {
    return res.send({ error })
  }

  forecast(latitude, longitude, (error, forecastData) => {
    if (error) {
      return res.send({ error })
    }
    res.send({
      forecast: forecastData,
      location,
      address: req.query.address
    })
  })
})
})

app.get('/products', (req, res) => {
  if (!req.query.search){
    return res.send({
      error: 'You must provide a search term.'
    })
  }

  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Michael',
    errorMessage: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Michael',
    errorMessage: 'Page not found'
  })
})

app.listen(port, ()=>{
  console.log('Server is up on port ' + port)
})

//dont understand what line 8 is doing, and
//why is app.use and app.set used to set the path, why not just use on the them
//what is destructuring, .hbs, partials, lines 15-18, line 21

//when you use git install, the package-lock.json and package.json files will
//be used to come up witg tge node_module folder, so dont track the node_modules
//folder, use .gitignore folder
