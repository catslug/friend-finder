var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var htmlRoutes = require ('./app/routing/htmlRoutes')
var PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', htmlRoutes)

app.listen(PORT, function() {
	console.log(`App listening on port ${PORT}`)
})