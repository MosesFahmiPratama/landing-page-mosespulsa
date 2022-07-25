// ===== button effect 1 ======

const buttons = document.querySelectorAll('.button-ripple');

buttons.forEach(btn => {
	btn.addEventListener('click', function(e){
		let x = e.clientX - e.target.offsetLeft;
		let y = e.clientY - e.target.offsetTop;

		let ripples = document.createElement('span');
		ripples.setAttribute('class','effect-ripple');
		ripples.style.left = x + 'px';
		ripples.style.top = y + 'px';

		this.appendChild(ripples);

		setTimeout(() => {
			ripples.remove()
		},1000);
	})
})