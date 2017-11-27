var playerAnswers = []

$(document).ready(function() {
	$('#submit').on('click', function() {
		event.preventDefault()
		const url = $('#playerPhoto').val()
		const name = $('#playerName').val()

		validateName(name, url)
	})	

	$('.modals').on('click', closeModal)
	$('.close').on('click', closeModal)
}) 

$(document).ready(function() {
	$('.variable-width').slick({
		dots: true,
		infinite: true,
		speed: 1000,
		slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: true,
		variableWidth: true,
		autoplay: true,
		autoplaySpeed: 2000,
		easing: 'linear'
	})
})

const saveToArray = (val) => {
	playerAnswers.push(val)
}

const validateName = (name, url) => {
	console.log('url inside validateName', url)
	if (name === '') {
		$('.modal-name-warning').css('display', 'block')
		return false
	} else {
		validateUrl(name, url)
		return true
	}
}

const validateUrl = (name, url) => ($.post('/api/validate', { url: url })
		.done(function(data) {
			if (!data) {
				$('.modal-url-warning').css('display', 'block')
				return false
			} else if (data) {
				postPlayer(name, url)
				return true
			} 
		}))

const postPlayer = (name, url) => {
	for (var i = 1; i < 14; i++) {
		saveToArray($('input[name="feelingsQ' + i + '"]:checked').val())
	}

	var newPlayerStats = {
		name: name,
		photo: url,
		answers: playerAnswers
	}

	$.post('/api/friends', newPlayerStats)
		.done(function(data) {
			console.log('done function inside postPlayer', data)
			$('#perfect-match').text(data.name)
			$('#perfect-photo').attr('src', data.photo)
			$('.modal-response').css('display', 'block')
		})
}

const closeModal = () => {
	$('.modal-url-warning').css('display', 'none')
	$('.modal-name-warning').css('display', 'none')
	$('.modal-response').css('display', 'none')
}