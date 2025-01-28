function start () {
  // (PART A) GET SPLASH SCREEN 
  let splash = document.getElementById("splash");

  // (PART B) PLAY BGM & REMOVE SPLASH SCREEN AFTER FADE IN
  splash.addEventListener("transitionend", () => {
    document.getElementById("bgm").play();
    splash.remove();
  });

  // (PART C) GO!
  splash.classList.add("hide");
}
document.addEventListener('keydown', function() {
  if (event.keyCode == 123) {
      alert("This function has been disabled!");
    return false;
  } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
      alert("This function has been disabled!");
    return false;
  } else if (event.ctrlKey && event.keyCode == 85) {
      alert("This function has been disabled!");
    return false;
  }
}, false);

if (document.addEventListener) {
  document.addEventListener('contextmenu', function(e) {
    alert("This function has been disabled!");
    e.preventDefault();
  }, false);
} else {
  document.attachEvent('oncontextmenu', function() {
    alert("This function has been disabled!");
    window.event.returnValue = false;
  });
}