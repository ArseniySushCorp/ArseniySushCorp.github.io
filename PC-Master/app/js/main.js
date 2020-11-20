const header = document.querySelector('.header')
const aboutSection = document.querySelector('.about')
const headerNav = document.querySelector('.header__nav')
const benefitsSection = document.querySelector('.benefits')
const benefitsItem = document.querySelectorAll('.benefits__item')

document.addEventListener('scroll', () => {
	if (window.scrollY >= aboutSection.clientHeight/2) {
		header.style.backgroundColor = '#250E48'
		headerNav.style.paddingTop = '35px'
	}
	else {
		header.style.backgroundColor = 'transparent'
		headerNav.style.paddingTop = '75px'
	}

	if (window.scrollY >= benefitsSection.clientHeight ){
		benefitsItem.forEach((item, i) => {
			if (i % 2 === 0) {
				item.classList.add('benefits-animation')
			} else {
				item.classList.add('benefits-animation-right')
			}
		})
	}
})