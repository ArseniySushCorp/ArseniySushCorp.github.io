$(function(){
    $('.slider').slick({
        nextArrow: '<button class="slick-arrow slick-next"><img src="img/next.svg" alt="next arrow"></button>',
        prevArrow: '<button class="slick-arrow slick-prev"><img src="img/prev.svg" alt="prev arrow"></button>',
        responsive: [
            {
              breakpoint: 500,
              settings: {
                arrows:false
              }
            }]
    });
});