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

// this needs to be in the apiRoutes file ?? ?? ??? ?? ugh
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
	var currentUserAnswers = obj.answers
	var searchedAllUsers = false
	var mostCompatibleUser
	var bestCompatibleVal = 0

	do {
		for (i = 0; i < data.length; i++) {
			var prevUser = data[i]
			var prevUserAnswers = data[i].answers
			var diffsArr = []

			for (i = 0; i < obj.currentUserAnswers.length; i++) {
				var diff = Math.abs(+prevUserAnswers[i] - +currentUserAnswers[i])
				diffsArr.push(diff)
			}

			for (i = 0; i < diffsArr.length; i++) {
				var total = 0
				var totalPlus = +total + +diffsArr[i]
				if (total < bestCompatibleVal) {
					bestCompatibleVal = total
					mostCompatibleUser = prevUser.name
				} else {
					bestCompatibleVal = bestCompatibleVal
				}
			}
		}
		searchedAllUsers = true
	} while (!searchedAllUsers)

}

module.exports = router