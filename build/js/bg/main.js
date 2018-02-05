"use strict";

var portRoyal = null;

chrome.extension.onConnect.addListener(function (port) {
	console.log("Connected .....");
	//portRoyal = port;
	//connected();

	star.getPort(port);
});

var star = {
	getPort: function getPort(p) {
		this.port = p;
		this.connection();
	},
	connection: function connection() {
		var port = this.port;
		port.postMessage("Hi Popup.js");
		port.onMessage.addListener(function (data) {
			setTimeout(function () {
				chrome.tabs.getSelected(null, function (tab) {
					console.log(chrome);
					chrome.tabs.sendRequest(tab.id, { data: data });
				});
			}, 300);
		});
		console.log(this.port);
	},
	sendMessage: function sendMessage(message) {
		console.log(message);
		var port = this.port;
		port.postMessage(message);
	}
};
function connected() {
	portRoyal.onMessage.addListener(function (data) {
		setTimeout(function () {
			chrome.tabs.getSelected(null, function (tab) {
				chrome.tabs.sendRequest(tab.id, { data: data });
			});
		}, 100);
	});

	portRoyal.postMessage("Hi Popup.js");
}

function sendMessage() {
	console.log(portRoyal);
}
// dialog with content
chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
	chrome.tabs.onUpdated.addListener(function (tabId, info) {
		chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
			console.log(request, sender, sendResponse);

			if (request.method === 'hundred') {
				if (request.message === 'ended') {
					star.sendMessage({ message: 'ended', undefinedCards: request.undefinedCards, method: 'hundred' });
				}
				if (request.message === 'cardSaved') {
					console.log('cardSaved');
					star.sendMessage({ message: 'cardSaved', method: 'hundred', count: request.count });
				}
			}

			//sendMessage();
		});
	});
});

console.log(star.port);

// function sendMessage(data) {
// 	chrome.tabs.getSelected(null, function(tab){ //выбирается ид открытого таба, выполняется коллбек с ним
// 		//localStorage.setItem('ключ', 'значение');
// 		console.log(data);
// 		chrome.tabs.sendRequest(tab.id,{progress: 'start', method: 'hundred', data: data}); //запрос  на сообщение
// 	});
// }
//
//
// // dialog with plugin
// chrome.extension.onConnect.addListener(function(port) {
// 	console.log("Connected .....");
// 	port.onMessage.addListener(function(data) {
// 		console.log('send', data);
// 		if (data.method === 'hundred') {
// 			console.log('send');
// 			sendMessage(data.data);
// 		}
// 		port.postMessage("Hi Popup.js");
// 	});
// });
//
// dialog with content
// chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
// 	chrome.tabs.onUpdated.addListener(function (tabId, info) {
// 		chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
// 			console.log(request, sender, sendResponse);
//
// 			sendMessage();
//
// 		});
// 	});
// });
//
// // chrome.tabs.getSelected(null, function(tab){ //выбирается ид открытого таба, выполняется коллбек с ним
// // 	console.log(tab);
// // 	chrome.tabs.sendRequest(tab.id,{
// // 		progress: 'start',
// // 		method: 'hundred',
// // 		data: {
// // 			fsc: [63379, 60215],
// // 			title: 'СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ!',
// // 			description: '<span style="color: #ed008c; font-size: small; font-weight: bold;">Компактная пудра "Люкс" всего за 329 руб. при покупке любых* товаров на сайте на сумму 299 руб.</span>',
// // 			note: '*Предложение распространяется на ограниченный список товаров. Подробности уточняйте у Представителя Avon при заказе.'
// // 		}
// // 	}); //запрос  на сообщение
// // });
// // console.log(4324324);
// // chrome.extension.onConnect.addListener(function(port) {
// // 	console.log(port);
// // 	port.onMessage.addListener(function(data) {
// // 	console.log("Connected .....", data);
// //
// // 	});
// // });
//
//
//
//
//
//
//
// // const arr = {
// // 	progress: 'start',
// // 	method: 'hundred',
// // 	data: {
// // 		fsc: [63379, 60215],
// // 		title: 'СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ!',
// // 		description: '<span style="color: #ed008c; font-size: small; font-weight: bold;">Компактная пудра "Люкс" всего за 329 руб. при покупке любых* товаров на сайте на сумму 299 руб.</span>',
// // 		note: '*Предложение распространяется на ограниченный список товаров. Подробности уточняйте у Представителя Avon при заказе.'
// // 	}};
// // console.log(arr);
// // chrome.tabs.onUpdated.addListener(function (taboo) {
// // 	chrome.tabs.getSelected(null, function(tab){ //выбирается ид открытого таба, выполняется коллбек с ним
// // 		chrome.tabs.sendRequest(tab.id, arr);
// // 	});
// // });
//
//
//
//
//
//
//
// // setInterval(()=>{
// // 	chrome.tabs.getSelected(null, function(tab){ //выбирается ид открытого таба, выполняется коллбек с ним
// // 		chrome.tabs.sendRequest(tab.id,{msg:"msg01"}); //запрос  на сообщение
// // 	});
// // }, 500);