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

	for (var i = 0; i < data.length; i++) {
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

	console.log('optimalFriend', optimalFriend)
	return optimalFriend // fix the fact that it's returning the same user name, because it pushes the new user to array
}
//-----------------------------------------------------------------------------------------------------//

module.exports = router