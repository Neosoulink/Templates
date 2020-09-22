(function () {
	var links = document.querySelectorAll('.navbar-nav>li');
	for(var i = 0; i<links.length; i++){
		if(document.querySelector('title').innerHTML == links[i].firstChild.innerHTML){
			links[i].className = 'active-nav-link';
		}
	}
})();

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    document.querySelector('.fixed-top').style.backgroundColor = "rgba(0,0,0,0.8)";
  } else {
    document.querySelector('.fixed-top').style.backgroundColor = "rgba(100,100,100,0)";
  }
}

(function () {
	var btn_up = document.querySelector("#btn_up");

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

	btn_up.addEventListener('click', function(e){
		topFunction();
	}, false);
})();

