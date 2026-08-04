
var swiper = new Swiper(".swiper-banner", {
	loop: true,
	speed: 1000,
	autoplay: {
		delay: 4000,
		disableOnInteraction: false,
	},
	// 新增這兩個設定，能增加穩定性
	observer: true, 
	observeParents: true,

	navigation: {
		nextEl: ".banner-next",
		prevEl: ".banner-prev",
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true, // 增加分頁點的可點擊性
	},
});
