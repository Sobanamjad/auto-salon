
const boxes = document.querySelectorAll('.secwrap_idx .secbox');
boxes.forEach((box, i) => {
	const orderEl = box.querySelector('.secbox-order');
	if (orderEl) {
		const num = i + 1;
		orderEl.textContent = num > 9 ? num : "0" + num;
	}
});