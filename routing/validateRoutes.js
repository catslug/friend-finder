var express = require('express')
var bodyParser = require('body-parser')
var router = express.Router()
var path = require('path')
var validate = require('valid-url')

router.post('/api/validate', function(req, res) {
	var url = req.body
	console.log('in the validate routing page')

	if (validate.isURI(url)) {
		console.log('valid url')
		res.send(true) 
	} else {
		console.log('invalid url')
		res.send(false)
	}
})

module.exports = router