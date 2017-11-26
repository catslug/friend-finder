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

//-----------------------this needs to be in the apiRoutes file ?? ?? ??? ?? ugh --------------------//
router.get('/api/friends', function(req, res) {
	res.json({ data: data })
})

router.post('/api/friends', function(req, res) {
	var newSurvey = req.body
	data.push(newSurvey)
	findFriend(newSurvey)
	res.json(newSurvey)
})

const findFriend = (obj) => {
	var optimalFriend = ''
	var friendVal

	for (var i = 0; i < data.length - 1; i++) {
		var baseVal = 0

		for (var j = 0; j < data[i].answers.length; j++) {
			var possNewVal = Math.abs(+obj.answers[j] - +data[i].answers[j])
			baseVal += possNewVal
		}

		if (baseVal <= friendVal || friendVal === undefined) {
			friendVal = baseVal
			optimalFriend = data[i].name
			console.log('friendVal', friendVal, 'optimalFriend', optimalFriend) 
		}
	}

	console.log('final optimalFriend', optimalFriend)
	return optimalFriend
}
//-----------------------------------------------------------------------------------------------------//

//----------------------------------validation api-------------------------------------------------//
var validUrl = require('valid-url')

router.post('/api/validate', function(req, res) {
	var url = req.body.url

	if (validUrl.isWebUri(url)) {
		res.send(true) 
	} else {
		res.send(false)
	}
})

module.exports = router