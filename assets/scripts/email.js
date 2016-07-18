let closeButtons = Array.prototype.slice.call(document.querySelectorAll('.close'));
console.log(closeButtons);
closeButtons.forEach(function(close) {
	close.addEventListener('click', function(e) {
		e.preventDefault();
		close.parentElement.style.display='none';
		document.body.classList.remove('email');
		localStorage.setItem('close/'+close.dataset.key, true);
	});

	if(!localStorage.getItem('close/'+close.dataset.key)) {
		close.parentElement.style.display='block';
		document.body.classList.add('email');
	}
});