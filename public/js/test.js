var observer = new IntersectionObserver(function(entries) {
	if(entries[0].isIntersecting === true)
		console.log('Element has just become visible in screen');
}, { threshold: [.9] });

observer.observe(document.querySelector("#container"));