
/*---------------------------------------------------------------------------------------------*/
//右側固定社群與top列
$(document).ready(function() {
	$('.fab-trigger').on('click', function(event) {
		event.preventDefault();
		
		let $trigger = $(this);
		let $content = $trigger.siblings('.fab-menu');

		$trigger.toggleClass('active');
		$content.toggleClass('active');
	});

	// 點擊畫面其他地方時關閉語系選單
	$(document).on('click', function(event) {
		$('.fabbox').each(function() {
			if (!this.contains(event.target)) {
				$(this).find('.fab-trigger').removeClass('active');
				$(this).find('.fab-menu').removeClass('active');
			}
		});
	});
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
		$(".header_fixed").addClass('is-scroll');
		$(".fablink_top").addClass('is-show');
	} else {
		$(".header_fixed").removeClass('is-scroll');
		$(".fablink_top").removeClass('is-show');
	}
	
});



/*---------------------------------------------------------------------------------------------*/
//dropbox
$(document).ready(function() {
	$('.dropbox-trigger').on('click', function(event) {
		event.preventDefault();
		
		let $trigger = $(this);
		let $content = $trigger.siblings('.dropbox-main');

		$trigger.toggleClass('is-open');
		$content.toggleClass('is-open');
	});

	// 點擊畫面其他地方時關閉語系選單
	$(document).on('click', function(event) {
		$('.dropbox').each(function() {
			if (!this.contains(event.target)) {
				$(this).find('.dropbox-trigger').removeClass('is-open');
				$(this).find('.dropbox-main').removeClass('is-open');
			}
		});
	});
});



/*---------------------------------------------------------------------------------------------*/
//移動端：開啟選單側邊欄
$(document).ready(function () {

	function openSidebar(e) {
		if (e) e.preventDefault();
		
		$('#sidebar').addClass('is-open');
		$('#sidebar-overlay').addClass('is-active');
		$('body').addClass('is-sidebar-open');
	}

	function closeSidebar(e) {
		if (e) e.preventDefault();
		
		$('#sidebar').removeClass('is-open');
		$('#sidebar-overlay').removeClass('is-active');
		$('body').removeClass('is-sidebar-open');
	}

	// 綁定點擊事件
	$('.menu_switchon').on('click', openSidebar);
	
	// 可以將關閉按鈕與遮罩的點擊事件合併綁定
	$('#sidebar-close, #sidebar-overlay').on('click', closeSidebar);
});



/*---------------------------------------------------------------------------------------------*/
//多層次選單
$(document).ready(function () {

	$('.jsmtree li:has(ul) > a').append('<div class="jsmtree-subbtn"></div>');
	
	/* ==========================================================================
	   新增：初始化時尋找 active 項目，向上追溯並展開所有父層
	   ========================================================================== */
	$('.jsmtree li.active').each(function() {
		$(this).children('a').addClass('is-current');
		
		$(this).parents('ul').each(function() {
			// 如果追溯到了最外層的 .jsmtree 容器則跳過
			if ($(this).hasClass('jsmtree')) return; 
			
			// 展開該層級的 ul
			$(this).addClass('is-visible');
			
			$(this).prev('a').addClass('is-current');
			$(this).prev('a').find('.jsmtree-subbtn').addClass('is-open');
		});
	});
	

	$(".jsmtree li:has(ul) > a").click(function(e) {
		e.preventDefault();
		
		var menu_down = $(this).next('ul');
		var menu_trigger = $(this).find('.jsmtree-subbtn');

		if(menu_trigger.hasClass('is-open')){
			//該項目有 is-open 之class,代表現在點按同一項目，則收起該項目
			menu_trigger.removeClass('is-open');
			menu_down.removeClass("is-visible");
			$(this).removeClass("is-current");

		}else{
			//如果該項目沒有 is-open 之class,代表現在點按是不同項目，則開啟該新項目
			
			$(this).parent('li').siblings().find('.jsmtree-subbtn').removeClass('is-open');
			$(this).parent('li').siblings().find('a').next('ul').removeClass("is-visible");
			$(this).parent('li').siblings().find('a').removeClass("is-current");

			menu_trigger.addClass('is-open');
			menu_down.addClass("is-visible");
			$(this).addClass("is-current");


			// 尋找被點選的項目是否在 .jsmtree-scroll 容器內
			var $scrollContainer = $(this).closest('.jsmtree-scroll');

			if ($scrollContainer.length > 0) {
				var $listItem = $(this).parent('li');
				var meunOffest = $listItem.offset().top;
				var webTop = $(document).scrollTop();
				var offsideTop = $scrollContainer.scrollTop();
				
				var $header = $(".jsmtree-scroll-header");
				var offsideHeader = $header.length > 0 ? $header.outerHeight() : 0;
				
				var totalOffest = meunOffest - webTop + offsideTop - offsideHeader - 20;
				
				$scrollContainer.animate({
					scrollTop: totalOffest
				}, 500); 
			}


			
		}
	});	
	
});



/*---------------------------------------------------------------------------------------------*/
//卷軸帶動畫
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




// --- login 密碼顯示/隱藏
const togglePwdButtons = document.querySelectorAll('.pwd-toggle-btn');

togglePwdButtons.forEach(button => {
	button.addEventListener('click', function() {
		// 透過 data-target 屬性找到對應的輸入框
		const targetId = this.getAttribute('data-target');
		const inputField = document.getElementById(targetId);
		
		if (!inputField) return;

		// 切換 type 屬性 (password <-> text)
		const isPassword = inputField.getAttribute('type') === 'password';
		inputField.setAttribute('type', isPassword ? 'text' : 'password');

		// 切換按鈕本身的 class 以更改 svg 顯示狀態
		this.classList.toggle('is-showing');
		

		// 切換後讓輸入框重新獲得焦點，提升使用者體驗
		setTimeout(() => {
			inputField.focus();
			// 將游標移到文字最後面 (如果瀏覽器支援)
			if (inputField.setSelectionRange) {
				const len = inputField.value.length;
				inputField.setSelectionRange(len, len);
			}
		}, 0);

	});
});

