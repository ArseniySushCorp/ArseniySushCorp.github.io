const header = document.querySelector('.header')
const aboutSection = document.querySelector('.about')
const headerNav = document.querySelector('.header__nav')
const benefitsSection = document.querySelector('.benefits')
const benefitsItem = document.querySelectorAll('.benefits__item')
const sidenav = document.querySelector('.sidenav')
const consultForm = document.querySelector('.consult__form')
const masterForm = document.querySelector('.master__form')
const thanksModal = document.querySelector('.thanks-modal')
const politicModal = document.querySelector('.politic-modal')

document.addEventListener('scroll', () => {
	if (window.scrollY >= aboutSection.clientHeight / 2) {
		header.style.backgroundColor = '#250E48'
		headerNav.style.paddingTop = '35px'
	} else {
		header.style.backgroundColor = 'transparent'
		headerNav.style.paddingTop = '75px'
	}

	if (window.scrollY >= benefitsSection.clientHeight) {
		benefitsItem.forEach((item, i) => {
			if (i % 2 === 0) {
				item.classList.add('benefits-animation')
			} else {
				item.classList.add('benefits-animation-right')
			}
		})
	}
})


document.addEventListener('DOMContentLoaded', function () {
	M.Modal.init(politicModal)
	M.Sidenav.init(sidenav)
	const sidenavInstance = M.Sidenav.getInstance(sidenav)
	sidenav.addEventListener('click', (event) => {
		if (event.target.classList.contains('nav__link')) {
			sidenavInstance.close()
		}
	})
});

(function () {
	const smoothScroll = function (targetEl, duration) {
		const headerElHeight = document.querySelector('.header').clientHeight
		let target = document.querySelector(targetEl)
		let targetPosition = target.getBoundingClientRect().top - headerElHeight
		let startPosition = window.pageYOffset
		let startTime = null

		const ease = function (t, b, c, d) {
			t /= d / 2
			if (t < 1) return c / 2 * t * t + b
			t--
			return -c / 2 * (t * (t - 2) - 1) + b
		}

		const animation = function (currentTime) {
			if (startTime === null) startTime = currentTime
			const timeElapsed = currentTime - startTime
			const run = ease(timeElapsed, startPosition, targetPosition, duration)
			window.scrollTo(0, run)
			if (timeElapsed < duration) requestAnimationFrame(animation)
		}
		requestAnimationFrame(animation)

	}

	const scrollTo = function () {
		const links = document.querySelectorAll('.link')
		links.forEach(each => {
			each.addEventListener('click', function () {
				const currentTarget = this.getAttribute('href')
				smoothScroll(currentTarget, 1000)
			})
		})
	}
	scrollTo()
}())

const selector = document.querySelectorAll('input[type="tel"]')
const im = new Inputmask('+7(999)999-99-99')
im.mask(selector)

consultForm.addEventListener('submit', (event) => {
	telegramSend(event, '.consult__input')
})

masterForm.addEventListener('submit', (event) => {
	telegramSend(event, '.master__input')
})

function telegramSend(event, inputClass) {
	event.preventDefault()
	M.Modal.init(thanksModal)
	const modalInstance = M.Modal.getInstance(thanksModal)
	const token = ''
	const chat_id = ''
	const inputs = document.querySelectorAll(inputClass)
	let txt = []
	inputs.forEach(element => {
		txt.push(element.value)
	})
	const str = txt.join(' ')
	const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&parse_mode=html&text=${str}`
	try {
		fetch(url)
		modalInstance.open()
	} catch (e) {
		console.log(e)
	}
}