var express = require('express')
var bodyParser = require('body-parser')
var router = express.Router()
var path = require('path')
var data = require('../app/data/friends')

// router.get('/api/friends', function(req, res) {
// 	console.log('hi get')
// 	res.json({ data: data })
// })

// router.post('/api/friends', function(req, res) {
// 	console.log('hi post')
// 	res.send('hi this handles compatibility logic and receives info')
// })

module.exports = router