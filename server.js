var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var path = require('path')
var apiRoutes = require('./routing/apiRoutes')
var htmlRoutes = require ('./routing/htmlRoutes')
var validateRoutes = require('./routing/validateRoutes')
var PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true })) // might need to set this to true
app.use(bodyParser.json())

app.use('/api/friends', apiRoutes) // works in htmlRoutes but not apiRoutes ???? 
app.use('/', htmlRoutes)
app.use('/survey', htmlRoutes)
app.use('/api/validate', htmlRoutes)

app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, function() {
	console.log(`App listening on port ${PORT}`)
})