var express = require('express')
var bodyParser = require('body-parser')
var router = express.Router()
var path = require('path')
var validUrl = require('valid-url')

router.post('/', function(req, res) {
	var url = req.body.url

	if (validUrl.isWebUri(url)) {
		res.send(true) 
	} else {
		res.send(false)
	}
})

module.exports = router