
const swiperBoxes = document.querySelectorAll('.itemslide-container');

swiperBoxes.forEach((box) => {

	const container = box.querySelector('.swiper-itemslide');
	const nextBtn = box.querySelector('.itemslide-next');
	const prevBtn = box.querySelector('.itemslide-prev');

	new Swiper(container, {
		watchOverflow: true,
		slidesPerView: 1,
		spaceBetween: 0,
		speed: 1000,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		observer: true, 
		observeParents: true,

		navigation: {
			nextEl: nextBtn,
			prevEl: prevBtn,
		},

		breakpoints: {
			576: { slidesPerView: 1 },
			768: { slidesPerView: 2, spaceBetween: 32 },
			992: { slidesPerView: 3, spaceBetween: 32 },
			1400: { slidesPerView: 4, spaceBetween: 32 },
		},
  
	});
});
