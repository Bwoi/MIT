// chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
// 	console.log(tabs);
//
// });
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
// 	console.log(123);
// });



// console.log('started');
// function changeToCorrectData() {
// 	var searchSelect = document.getElementById('ProductSearchResults1_ddlFilter');
// 	searchSelect.querySelector('option[value="FSC"]').selected = true;
// 	console.log(searchSelect);
// }
//
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
// 	console.log(request, sender, sendResponse);
// 	changeToCorrectData();
// 	chrome.runtime.sendMessage({ method: "уебанство" });
// 	//console.log(document.getElementsByTagName('html')[0]);
// });
// console.log('ended');

// function changeToCorrectData() {
// 	console.log('loaded?');
// 	var searchSelect = document.getElementById('ProductSearchResults1_ddlFilter');
// 	searchSelect.querySelector('option[value="FSC"]').selected = true;
// 	console.log(searchSelect);
// }
//
// chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
// 	console.log(tab);
// 	var domain = tab[0].url.slice(0, tab[0].url.indexOf('/', 7));
// 	chrome.tabs.update(tab[0].id, {url: domain + '/productMultiEdit.aspx'});
// 	chrome.tabs.onUpdated.addListener(function(tabId , info){
//
// 		console.log(chrome.contentSettings);
// 		//var searchSelect = document.getElementById('ProductSearchResults1_ddlFilter');
// 		//searchSelect.querySelector('option[value="FSC"]').selected = true;
// 		//console.log(searchSelect);
// 		console.log('loaded?');
// 	});
// });


// var searchSelect = document.getElementById('ProductSearchResults1_ddlFilter');
// searchSelect.querySelector('option[value="FSC"]').selected = true;
//console.log(window.document);



// document.addEventListener('DOMContentLoaded', function() {
// 	// var form1 = document.getElementById('Form1');
// 	// var searchSelect = document.getElementById('ProductSearchResults1_ddlFilter');
// 	// searchSelect.querySelector('option[value="FSC"]').selected = true;
// 	// console.log(form1, ProductSearchResults1_ddlFilter);
//
// 	chrome.extension.sendMessage({ method: "hundreds" });
//
// 	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
// 		console.log(request, sender, sendResponse);
// 		//changeToCorrectData();
// 		chrome.runtime.sendMessage({ method: "уебанство" });
// 		//console.log(document.getElementsByTagName('html')[0]);
// 	});
// });




// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
// 	console.log(request, sender, sendResponse);
// 	//changeToCorrectData();
// 	//chrome.runtime.sendMessage({ method: "уебанство" });
// 	//console.log(document.getElementsByTagName('html')[0]);
// });



// chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
// 	chrome.tabs.onUpdated.addListener(function (tabId, info) {
// 		console.log(123);
// 	});
// });

// chrome.extension.sendMessage({ method: "hundreds" });
// chrome.extension.onRequest.addListener(function(req){ //обработчик запроса из background
// 	console.log('3. Принято из фона:', req.msg); //выведется переданное сообщение
// });