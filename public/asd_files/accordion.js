
// 核心邏輯：設定手風琴行為
function setupAccordion(containerSelector, buttonSelector, autoCloseOthers = false) {
	const container = document.querySelector(containerSelector);
	if (!container) return;

	const accordionButtons = container.querySelectorAll(buttonSelector);

	accordionButtons.forEach(button => {
		button.addEventListener('click', function() {
			const isActive = this.classList.contains('active');
			const content = this.nextElementSibling;
			
			// 如果啟用「自動收起其他項目」且目前點擊的項目原本是未開啟的
			if (autoCloseOthers && !isActive) {
				const activeButtons = container.querySelectorAll(`${buttonSelector}.active`);
				activeButtons.forEach(activeBtn => {
					if (activeBtn !== this) {
						activeBtn.classList.remove('active');
						const activeContent = activeBtn.nextElementSibling;
						activeContent.style.maxHeight = null;
					}
				});
			}

			// 切換目前點擊按鈕的 active 狀態
			this.classList.toggle('active');
			
			// 展開或收折動畫控制
			if (content.style.maxHeight) {
				content.style.maxHeight = null;
			} else {
				content.style.maxHeight = content.scrollHeight + "px";
			}
		});
	});
}

// 初始化區塊
setupAccordion('#accordion-faq', '.accordion-button', false);
setupAccordion('#accordion-member', '.accordion-button', true);


// 處理視窗縮放事件，重新計算展開區域的高度
window.addEventListener('resize', () => {
	const activeButtons = document.querySelectorAll('.accordion-button.active');
	activeButtons.forEach(button => {
		const content = button.nextElementSibling;
		if (content.style.maxHeight) {
			content.style.maxHeight = 'none';
			const newHeight = content.scrollHeight;
			content.style.maxHeight = newHeight + "px";
		}
	});
});

