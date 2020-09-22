window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    document.querySelector('.navbar.fixed-top').style.backgroundColor = "rgba(0,0,0,0.8)";
  } else {
    document.querySelector('.navbar.fixed-top').style.backgroundColor = "rgba(100,100,100,0.3)";
  }
}