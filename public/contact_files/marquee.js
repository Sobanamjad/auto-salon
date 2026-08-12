document.addEventListener('DOMContentLoaded', () => {
	const marqueeList = document.getElementById('marqueeList');
	const items = marqueeList.querySelectorAll('.marquee-item');
	const totalItems = items.length;
	
	// 如果訊息數量太少，就不需要輪播
	if (totalItems <= 1) return;

	// 無縫輪播的關鍵：把第一則訊息複製一份，放到清單的最尾端
	const firstItemClone = items[0].cloneNode(true);
	marqueeList.appendChild(firstItemClone);
	
	// 更新總數量 (包含了複製出來的那一個)
	const newTotalItems = totalItems + 1;

	let currentIndex = 0;
	// 取得每個項目的高度，這用來計算每次要往上推多少距離
	const itemHeight = items[0].offsetHeight; 
	const intervalTime = 4000; // 停留時間：4秒

	function scrollMarquee() {
		currentIndex++;
		// 計算 Y 軸位移量 (負值代表往上移)
		const translateY = -(currentIndex * itemHeight);
		
		// 開啟 CSS 過渡動畫，讓移動平滑
		marqueeList.style.transition = 'transform 0.5s ease-in-out';
		marqueeList.style.transform = `translateY(${translateY}px)`;

		// 檢查是否已經捲動到我們複製的「假的第一則」(即清單最後一項)
		if (currentIndex === newTotalItems - 1) {
			// 等待過渡動畫 (0.5秒) 完成後
			setTimeout(() => {
				// 瞬間關閉動畫效果
				marqueeList.style.transition = 'none';
				// 把位置瞬間拉回真正第一則的位置
				currentIndex = 0;
				marqueeList.style.transform = `translateY(0px)`;
				// 因為關閉了動畫，所以這個瞬間跳轉使用者是用肉眼看不出來的
			}, 500); 
		}
	}

	// 設定定時器，每隔指定時間執行一次上翻動作
	setInterval(scrollMarquee, intervalTime);
});