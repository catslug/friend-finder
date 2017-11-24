var express = require('express')
var bodyParser = require('body-parser')
var router = express.Router()

router.get('/', function(req, res) {
	res.send('hi this is the home page')
})

router.get('/survey', function(req, res) {
	res.send('hi this is the survey page')
})

module.exports = router