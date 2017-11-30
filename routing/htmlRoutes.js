var express = require('express')
var bodyParser = require('body-parser')
var router = express.Router()
var path = require('path')
var data = require('../app/data/friends')

router.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '../public/home.html'))
})

router.get('/survey', function(req, res) {
	res.sendFile(path.join(__dirname, '../public/survey.html'))
})

router.get('/home', function(req, res) {
	res.redirect('/')
})

module.exports = router