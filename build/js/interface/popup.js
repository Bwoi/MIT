'use strict';

var port = chrome.extension.connect({ name: "Sample Communication" });
//port.postMessage("Hi BackGround");
port.onMessage.addListener(function (answer) {
	if (answer.method === 'hundred') {
		if (answer.message === 'ended') {
			var el = document.getElementById('result');
			el.innerHTML = 'Завершено';

			var undefinedEl = document.getElementById('undefined');
			undefinedEl.innerHTML = answer.undefinedCards;
		}
		if (answer.message === 'cardSaved') {
			console.log('cardSaved');
			var _el = document.getElementById('completed');
			_el.innerHTML = answer.count;
		}
	}
	//console.log("message recieved" + msg);
});

document.addEventListener('DOMContentLoaded', function () {

	var allCodes = document.getElementById('codes');
	var subject = document.getElementById('forName');
	var description = document.getElementById('forDescription');
	var descriptionStyle = document.getElementById('stylesForDescription');
	var note = document.getElementById('forNotes');
	var startProcess = document.getElementById('startProcess');

	startProcess.addEventListener('click', function () {

		var completedCards = document.getElementById('completed');
		completedCards.innerHTML = 0;

		var splited = allCodes.value.split(', ');
		var el = document.getElementById('amount');
		console.log(el);
		el.innerHTML = splited[0] !== '' ? splited.length : 0;
		var descript = descriptionStyle.value !== '' ? '<span style="' + descriptionStyle.value + '">' + description.value + '</span>' : description.value;
		setTimeout(function () {
			port.postMessage({
				method: 'hundred',
				link: '/productMultiEdit.aspx',
				data: {
					cards: allCodes.value.split(', '),
					title: subject.value,
					description: descript,
					note: note.value
				}
			});
			console.log(allCodes.value.split(', '));
			console.log(subject.value);
			console.log(descript);
			console.log(note.value);
		}, 100);
	});

	console.log(12312312);
});

// 'use strict'
// document.addEventListener('DOMContentLoaded', function() {
// 	// var hundred = document.getElementById('hundred');
// 	// hundred.addEventListener('click', function(){
// 	// 	//chrome.extension.sendMessage({ background: "redirect", address: "/productMultiEdit.aspx" });
// 	// });
//
// 	//chrome.runtime.sendMessage({ background: "redirect", address: "/productMultiEdit.aspx" });
//
//
//
//
// 	const port = chrome.extension.connect({
// 		name: "Sample Communication 2"
// 	});
// 	// port.postMessage("Hi BackGround");
// 	// port.onMessage.addListener(function(msg) {
// 	// 	console.log("message recieved" + msg);
// 	// });
//
//
// 	// const allCodes = document.getElementById('codes');
// 	// const subject = document.getElementById('forName');
// 	// const description = document.getElementById('forDescription');
// 	// const descriptionStyle = document.getElementById('stylesForDescription');
// 	// const note = document.getElementById('forNotes');
// 	const startProcess = document.getElementById('startProcess');
// 	startProcess.addEventListener('click', function() {
// 		console.log('click');
//
// 		port.postMessage({
// 			method: 'hundred',
// 			data: {
// 				fsc: [63379, 60215],
// 				title: 'СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ!',
// 				description: '<span style="color: #ed008c; font-size: small; font-weight: bold;">Компактная пудра "Люкс" всего за 329 руб. при покупке любых* товаров на сайте на сумму 299 руб.</span>',
// 				note: '*Предложение распространяется на ограниченный список товаров. Подробности уточняйте у Представителя Avon при заказе.'
// 			}
// 		});
// 	});
// });
//
//
//
//
//
//
//
//
//
// 		//makeFSCArray(allCodes.value);
// 		//console.log(makeFSCArray(allCodes.value));
// 		//console.log(allCodes.value);
//
// 	// 	let subject = null, desc = null, note = null;
// 	// 	const fscArr = makeFSCArray(allCodes.value);
// 	// 	if (fscArr !== false) {
// 	// 		console.log(fscArr);
// 	// 		subject = getSubject();
// 	// 	}
// 	// 	if (subject !== null) {
// 	// 		desc = getDesc();
// 	// 	}
// 	// 	if (desc !== null) {
// 	// 		if (getDescStyles()) {
// 	// 			desc = '<span style="' + getDescStyles() + '">' + desc + '</span>';
// 	// 		}
// 	// 		if (getNote()) {
// 	// 			note = getNote()
// 	// 		}
// 	// 	}
// 	//
// 	//
// 	//
// 	// 	if (fscArr.length > 0) {
// 	// 		port.postMessage({
// 	// 			method: "hundred",
// 	// 			data: {
// 	// 				title: subject,
// 	// 				description: desc,
// 	// 				note: note,
// 	// 				fsc: fscArr
// 	// 			}
// 	// 		});
// 	// 	}
// 	//
// 	// 	//console.log(subject, desc, note, fscArr);
// 	// 	//console.log(subject, desc, fscArr);
// 	// 	// if (subject !== false) {
// 	// 	//
// 	// 	// }
// 	// });
// 	//
// 	// function getNote() {
// 	// 	if (note.value !== '') {
// 	// 		return note.value
// 	// 	} else {
// 	// 		return false
// 	// 	}
// 	// }
// 	//
// 	// function getDescStyles() {
// 	// 	let styles = descriptionStyle.value;
// 	// 	if (styles.split('; ').length > 0) {
// 	// 		return styles
// 	// 	} else {
// 	// 		return false
// 	// 	}
// 	// }
// 	//
// 	// function getDesc() {
// 	// 	if (description.value !== '') {
// 	// 		return description.value
// 	// 	} else {
// 	// 		return false
// 	// 	}
// 	// }
// 	//
// 	// function getSubject() {
// 	// 	if (subject.value !== '') {
// 	// 		return subject.value
// 	// 	} else {
// 	// 		return false
// 	// 	}
// 	// }
// 	//
// 	// function makeFSCArray(arr) {
// 	// 	let newArr = arr.split(',').filter((v) => {
// 	// 		if (!isNaN(+v)) {
// 	// 			return v
// 	// 		}
// 	// 	});
// 	// 	//console.log(newArr);
// 	// 	newArr = newArr.map((v) => {
// 	// 		return +v
// 	// 	});
// 	// 	//console.log(newArr);
// 	// 	if (newArr.length > 0) {
// 	// 		return newArr
// 	// 	} else {
// 	// 		return false
// 	// 	}
// 	// }
// //});