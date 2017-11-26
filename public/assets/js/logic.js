var playerAnswers = []

$(document).ready(function() {
	$('#submit').on('click', function() {
		event.preventDefault()

		// validating input
		if (validateName($('#playerName').val()) && validateUrl($('#playerPhoto').val())) {
			console.log('posting successful', validateUrl($('#playerPhoto').val()))
		
			for (var i = 1; i < 14; i++) {
				saveToArray($('input[name="feelingsQ' + i + '"]:checked').val())
			}

			var newPlayerStats = {
				name: $('#playerName').val(),
				photo: $('#playerPhoto').val(),
				answers: playerAnswers
			}

			console.log(newPlayerStats)

			$.post('/api/friends', newPlayerStats)
				.done(function(data) {
					console.log(data)
				})
		}
	})	

	$('.modals').on('click', closeModal)
	$('.close').on('click', closeModal)
})

const saveToArray = (val) => {
	playerAnswers.push(val)
}

const validateName = (val) => {
	if (val === '') {
		console.log('Please type in a name.')

		$('.modal-name-warning').css('display', 'block')

		return false
	} else {
		return true
	}
}

const validateUrl = (val) => {	
	const valid = (val) => ($.post('/api/validate', { url: val })
		.done(function (data) {
			if (!data) {
				console.log('Please enter a valid url')

				$('.modal-url-warning').css('display', 'block')

				return false
			} else if (data) {
				return true
			} 
		}))
	return valid(val)
}

const closeModal = () => {
	$('.modal-url-warning').css('display', 'none')
	$('.modal-name-warning').css('display', 'none')
	$('.modal-response').css('display', 'none')
}