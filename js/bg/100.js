document.addEventListener('DOMContentLoaded', function() {
	chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
		console.log(request, sender, sendResponse);
	});
});