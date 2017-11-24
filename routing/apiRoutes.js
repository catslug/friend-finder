var express = require('express')
var bodyParser = require('body-parser')
var api = express.Router()
var friends = require('../app/data/friends')
var path = require('path')

api.get('/api/friends', function(req, res) {
	console.log('hi')

	return res.json({ name: 'hi' })
})

// apiRouter.post('/api/friends', function(req, res) {
// 	res.send('hi this handles compatibility logic and receives info')
// })

module.exports = api