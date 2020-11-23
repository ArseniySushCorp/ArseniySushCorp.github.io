const header = document.querySelector('.header')
const aboutSection = document.querySelector('.about')
const headerNav = document.querySelector('.header__nav')
const benefitsSection = document.querySelector('.benefits')
const benefitsItem = document.querySelectorAll('.benefits__item')
const sidenav = document.querySelector('.sidenav')


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
	let elem = document.querySelector('.sidenav')
	let instances = M.Sidenav.init(elem)
	let instance = M.Sidenav.getInstance(elem)
	sidenav.addEventListener('click', (event) => {
		if (event.target.classList.contains('nav__link')) {
			instance.close()
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
		const links = document.querySelectorAll('.nav__link')
		links.forEach(each => {
			each.addEventListener('click', function () {
				const currentTarget = this.getAttribute('href')
				smoothScroll(currentTarget, 1000)
			})
		})
	}
	scrollTo()
}())

let selector = document.querySelectorAll('input[type="tel"]')
let im = new Inputmask('+7(999)999-99-99')
im.mask(selector)

