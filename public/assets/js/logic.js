var playerAnswers = []

$(document).ready(function() {
	$('#submit').on('click', function() {
		event.preventDefault()
		
		for (var i = 1; i < 14; i++) {
			saveToArray($('input[name="feelingsQ' + i + '"]:checked').val())
		}

		var newPlayerStats = {
			name: $('#playerName').val(),
			photo: $('#playerPhoto').val(),
			answers: playerAnswers
		}

		console.log(newPlayerStats)
	})
})

const saveToArray = (val) => {
	playerAnswers.push(val)
}