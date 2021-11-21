 (function () {var btn_up = document.querySelector("#btn_up");

	window.onscroll = function() {scrollFunction()};

	function scrollFunction() {
		if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
	    	btn_up.style.display = "block";
		}else {
	    	btn_up.style.display = "none";
		}
	}

	function topFunction() {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	}

	btn_up.addEventListener('click', function(){
		topFunction();
	}, false);

})();