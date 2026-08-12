

// 處理 FAB 展開選單
const fabContainer = document.getElementById('fabContainer');
const fabMainBtn = document.getElementById('fabMainBtn');

// 點擊主按鈕切換展開/收合狀態
fabMainBtn.addEventListener('click', function() {
	fabContainer.classList.toggle('active');
});

// 點擊頁面其他地方時，收合選單
document.addEventListener('click', function(event) {
	// 如果點擊的不是 fabContainer 內部的元素，且 fabContainer 目前是展開狀態
	if (!fabContainer.contains(event.target) && fabContainer.classList.contains('active')) {
		fabContainer.classList.remove('active');
	}
});



//回頂端
$(function(){	
	$(".scrolltop").click(function(){
		$("html,body").animate({ 
		  scrollTop:0
		},700);
		return false;
	});
});

$(window).scroll(function() {
	var scrollTop = $(window).scrollTop();
    
	if (scrollTop >= 300) {
        $(".fablink_top").addClass('is-show');
		$(".header_fixed").addClass('is-scroll');
	} else {
        $(".fablink_top").removeClass('is-show');
		$(".header_fixed").removeClass('is-scroll');
	}
	
});


$(function () {
	$('.js-scroll').each(function () {
		var $target = $(this).offset().top;
		var $windowHeight = $(window).height();
		
		if ($windowHeight > $target) {
			$(this).addClass('is-active');
		}
	});
	
	
    $(window).on('scroll', function () {
        scrollToggleClass();
    });

    function scrollToggleClass() {
        $('.js-scroll').each(function () {
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
});






/*---------------------------------------------------------------------------------------------*/
//移動端：開啟選單側邊欄
const menuToggles = document.querySelectorAll('.menu_switchon');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');
const closeBtn = document.getElementById('sidebar-close');

function lockBodyScroll() {
	const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

	document.body.style.overflow = 'hidden';

	if (scrollbarWidth > 0) {
		document.body.style.paddingRight = scrollbarWidth + 'px';
		document.querySelectorAll('.header_fixed').forEach(function (el) {
			el.style.paddingRight = scrollbarWidth + 'px';
		});
	}
}

function unlockBodyScroll() {
	document.body.style.overflow = '';
	document.body.style.paddingRight = '';
	document.querySelectorAll('.header_fixed').forEach(function (el) {
		el.style.paddingRight = '';
	});
}

function openSidebar(e) {
	if (e) e.preventDefault();
	
	sidebar.classList.add('is-open');
	overlay.classList.add('is-active');
	lockBodyScroll();
}

function closeSidebar(e) {
	if (e) e.preventDefault();
	
	sidebar.classList.remove('is-open');
	overlay.classList.remove('is-active');
	unlockBodyScroll();
}

// 對每一個開啟按鈕綁定點擊事件
menuToggles.forEach(btn => {
	btn.addEventListener('click', openSidebar);
});

closeBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);




/*---------------------------------------------------------------------------------------------*/
//mobile時menu按鈕
$(document).ready(function () {

	/*側邊隱藏區塊-多層menu設定*/
	$('.sidebar_menu li:has(ul) > a').append('<div class="menu-subbtn"></div>');
	
	$(".sidebar_menu li:has(ul) > a").click(function(e) {
		e.preventDefault();
		
        var menu_down = $(this).next('ul');
		var menu_trigger = $(this).find('.menu-subbtn');

		
        if(menu_trigger.hasClass('is-open')){
            //該項目有 is-open 之class,代表現在點按同一項目，則收起該項目
			
			menu_trigger.removeClass('is-open');
			menu_down.removeClass("is-visible");
			$(this).removeClass("is-current");

        }else{
            //如果該項目沒有 is-open 之class,代表現在點按是不同項目，則開啟該新項目
			
			//排除該項目之外，其他項目皆移除 is-open 之clas
			$(this).parent('li').siblings().find('.menu-subbtn').removeClass('is-open');
			$(this).parent('li').siblings().find('a').next(menu_down).removeClass("is-visible");
			$(this).parent('li').siblings().find('a').removeClass("is-current");

			menu_trigger.addClass('is-open');
			menu_down.addClass("is-visible");
			$(this).addClass("is-current");


			//點到項目 滑到最上方
			 var meunOffest = $(this).parent('li').offset().top;
			var webTop = $(document).scrollTop();
			var offsideTop = $(".sidebar-body").scrollTop();
			var offsideHeader = $(".sidebar-header").outerHeight()
			var totalOffest = meunOffest - webTop + offsideTop - offsideHeader -20;
			
			$(".sidebar-body").animate({
				scrollTop: totalOffest
			}, 500); 
		
        }
		
	})	
	
});	





/*---------------------------------------------------------------------------------------------*/
//dropbox

const dropBoxes = document.querySelectorAll('.dropbox');

dropBoxes.forEach(function(sinDropBox) {
	const DropTrigger = sinDropBox.querySelector('.dropbox-trigger');
	const DropContent = sinDropBox.querySelector('.dropbox-main');

	// 點擊語系按鈕時切換開關狀態
	if (DropTrigger && DropContent) {
		DropTrigger.addEventListener('click', function(event) {
			event.preventDefault();
			DropTrigger.classList.toggle('is-open');
			DropContent.classList.toggle('is-open');
		});
	}
});

// 3. 點擊畫面其他地方時關閉語系選單
document.addEventListener('click', function(event) {
	dropBoxes.forEach(function(sinDropBox) {
		// 檢查點擊目標是否在當前的 dropbox 之外
		if (!sinDropBox.contains(event.target)) {
			const DropTrigger = sinDropBox.querySelector('.dropbox-trigger');
			const DropContent = sinDropBox.querySelector('.dropbox-main');
			
			// 移除 is-open class，將選單收起
			if (DropTrigger) DropTrigger.classList.remove('is-open');
			if (DropContent) DropContent.classList.remove('is-open');
		}
	});
});

