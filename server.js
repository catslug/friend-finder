var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var htmlRoutes = require ('./routing/htmlRoutes')
var apiRoutes = require('./routing/apiRoutes')
var path = require('path')
var PORT = 3000; // process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true })) // might need to set this to true
app.use(bodyParser.json())

app.use('/', htmlRoutes)
app.use('/survey', htmlRoutes)
app.use('/api/friends', apiRoutes)

app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, function() {
	console.log(`App listening on port ${PORT}`)
})