chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create("window.html", {
    "bounds": {
        "width": screen.width,
        "height": screen.height
    },
    'resizable':true
    });
});
