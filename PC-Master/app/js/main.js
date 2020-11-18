const header = document.querySelector('.header')
const aboutSection = document.querySelector('.about')
const headerNav = document.querySelector('.header__nav')

document.addEventListener('scroll', () => {
	if (window.scrollY >= aboutSection.clientHeight/2) {
		header.style.backgroundColor = '#250E48'
		headerNav.style.paddingTop = '35px'
	}
	else {
		header.style.backgroundColor = 'transparent'
		headerNav.style.paddingTop = '75px'
	}
})