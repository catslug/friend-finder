var express = require('express')
var bodyParser = require('body-parser')
var router = express.Router()
var path = require('path')
var data = require('../app/data/friends')

//-----------------------API routes--------------------//
router.get('/api/friends', function(req, res) {
	console.log('in the api page')
	res.json({ data: data })
})

router.post('/api/friends', function(req, res) {
	console.log('in the api page')
	var newSurvey = req.body
	data.push(newSurvey)
	res.send(findFriend(newSurvey))
})

const findFriend = (obj) => {
	var optimalFriend = ''
	var friendVal
	var index

	for (var i = 0; i < data.length - 1; i++) {
		var baseVal = 0

		for (var j = 0; j < data[i].answers.length; j++) {
			var possNewVal = Math.abs(+obj.answers[j] - +data[i].answers[j])
			baseVal += possNewVal
		}

		if (baseVal <= friendVal || friendVal === undefined) {
			friendVal = baseVal
			optimalFriend = data[i].name
			index = i
			console.log('friendVal', friendVal, 'optimalFriend', optimalFriend) 
		}
	}

	console.log('final optimalFriend', optimalFriend)
	return { 
		name: optimalFriend,
		photo: data[index].photo
	}
}

module.exports = router