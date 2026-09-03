
// 處理 FAB 展開選單
const fabContainer = document.getElementById('fabContainer');
const fabMainBtn = document.getElementById('fabMainBtn');

if (fabMainBtn) {
	fabMainBtn.addEventListener('click', function() {
		fabContainer.classList.toggle('active');
	});
}

document.addEventListener('click', function(event) {
	if (fabContainer && !fabContainer.contains(event.target) && fabContainer.classList.contains('active')) {
		fabContainer.classList.remove('active');
	}
});


/*---------------------------------------------------------------------------------------------*/
// 移動端：開啟選單側邊欄
const menuToggles = document.querySelectorAll('.menu_switchon');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');
const closeBtn = document.getElementById('sidebar-close');

function lockBodyScroll() {
	const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
	document.body.style.overflow = 'hidden';
	if (scrollbarWidth > 0) {
		document.body.style.paddingRight = scrollbarWidth + 'px';
		document.querySelectorAll('.header_fixed').forEach(function(el) {
			el.style.paddingRight = scrollbarWidth + 'px';
		});
	}
}

function unlockBodyScroll() {
	document.body.style.overflow = '';
	document.body.style.paddingRight = '';
	document.querySelectorAll('.header_fixed').forEach(function(el) {
		el.style.paddingRight = '';
	});
}

function openSidebar(e) {
	if (e) e.preventDefault();
	if (sidebar) sidebar.classList.add('is-open');
	if (overlay) overlay.classList.add('is-active');
	lockBodyScroll();
}

function closeSidebar(e) {
	if (e) e.preventDefault();
	if (sidebar) sidebar.classList.remove('is-open');
	if (overlay) overlay.classList.remove('is-active');
	unlockBodyScroll();
}

menuToggles.forEach(function(btn) {
	btn.addEventListener('click', openSidebar);
});

if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
if (overlay) overlay.addEventListener('click', closeSidebar);


/*---------------------------------------------------------------------------------------------*/
// Dropbox
const dropBoxes = document.querySelectorAll('.dropbox');

dropBoxes.forEach(function(sinDropBox) {
	const DropTrigger = sinDropBox.querySelector('.dropbox-trigger');
	const DropContent = sinDropBox.querySelector('.dropbox-main');
	if (DropTrigger && DropContent) {
		DropTrigger.addEventListener('click', function(event) {
			event.preventDefault();
			DropTrigger.classList.toggle('is-open');
			DropContent.classList.toggle('is-open');
		});
	}
});

document.addEventListener('click', function(event) {
	dropBoxes.forEach(function(sinDropBox) {
		if (!sinDropBox.contains(event.target)) {
			const DropTrigger = sinDropBox.querySelector('.dropbox-trigger');
			const DropContent = sinDropBox.querySelector('.dropbox-main');
			if (DropTrigger) DropTrigger.classList.remove('is-open');
			if (DropContent) DropContent.classList.remove('is-open');
		}
	});
});


/*---------------------------------------------------------------------------------------------*/
// All jQuery-dependent code — deferred until jQuery is confirmed ready
function initJQuery($) {

	// 回頂端
	$('.scrolltop').click(function() {
		$('html,body').animate({ scrollTop: 0 }, 700);
		return false;
	});

	// Header scroll state
	$(window).scroll(function() {
		var scrollTop = $(window).scrollTop();
		if (scrollTop >= 300) {
			$('.fablink_top').addClass('is-show');
			$('.header_fixed').addClass('is-scroll');
		} else {
			$('.fablink_top').removeClass('is-show');
			$('.header_fixed').removeClass('is-scroll');
		}
	});

	// Scroll-reveal animation
	$('.js-scroll').each(function() {
		var $target = $(this).offset().top;
		var $windowHeight = $(window).height();
		if ($windowHeight > $target) {
			$(this).addClass('is-active');
		}
	});

	$(window).on('scroll', function() {
		scrollToggleClass();
	});

	function scrollToggleClass() {
		$('.js-scroll').each(function() {
			var $target = $(this).offset().top;
			var $scroll = $(window).scrollTop();
			var $windowHeight = $(window).height();
			if ($scroll > $target - $windowHeight + 200) {
				$(this).addClass('is-active');
			} else {
				$(this).removeClass('is-active');
			}
		});
	}

	// Mobile sidebar multi-level menu
	$('.sidebar_menu li:has(ul) > a').append('<div class="menu-subbtn"></div>');

	$('.sidebar_menu li:has(ul) > a').click(function(e) {
		e.preventDefault();
		var menu_down = $(this).next('ul');
		var menu_trigger = $(this).find('.menu-subbtn');

		if (menu_trigger.hasClass('is-open')) {
			menu_trigger.removeClass('is-open');
			menu_down.removeClass('is-visible');
			$(this).removeClass('is-current');
		} else {
			$(this).parent('li').siblings().find('.menu-subbtn').removeClass('is-open');
			$(this).parent('li').siblings().find('a').next(menu_down).removeClass('is-visible');
			$(this).parent('li').siblings().find('a').removeClass('is-current');

			menu_trigger.addClass('is-open');
			menu_down.addClass('is-visible');
			$(this).addClass('is-current');

			var meunOffest = $(this).parent('li').offset().top;
			var webTop = $(document).scrollTop();
			var offsideTop = $('.sidebar-body').scrollTop();
			var offsideHeader = $('.sidebar-header').outerHeight();
			var totalOffest = meunOffest - webTop + offsideTop - offsideHeader - 20;
			$('.sidebar-body').animate({ scrollTop: totalOffest }, 500);
		}
	});
}

// Poll until window.jQuery is available, then run
function waitForJQuery() {
	if (typeof window.jQuery !== 'undefined') {
		initJQuery(window.jQuery);
	} else {
		setTimeout(waitForJQuery, 20);
	}
}

waitForJQuery();
