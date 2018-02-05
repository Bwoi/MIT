'use strict';

document.addEventListener('DOMContentLoaded', function () {
	//chrome.extension.sendMessage({ method: "hundreds" });
	// chrome.extension.onRequest.addListener(function(req){ //обработчик запроса из background
	// 	console.log('3. Принято из фона:', req.msg); //выведется переданное сообщение
	// });
	if (localStorage.length > 0) {
		parseProgress();
	}
	// if (localStorage.getItem('fsc') === '' && window.location.pathname === '/productMultiEdit.aspx') {
	// 	localStorage.clear();
	// }
	console.log(localStorage);
	//parseProgress();
	//chrome.extension.sendMessage({ method: "hundreds" });
	chrome.extension.onRequest.addListener(function (request) {
		//обработчик запроса из background
		console.log(request);
		if (request.progress === 'start') {
			if (request.method === 'hundred') {
				parseDateForStartHundred(request.data);
			}
		}
		//console.log('3. Принято из фона:', req.msg); //выведется переданное сообщение

		// if (request.method === 'hundred') {
		// 	setSettings({searchId: 'ProductSearchResults1_ddlFilter', searchQuerySelector: 'option[value=FSC]'});
		// }
	});

	function parseDateForStartHundred(data) {
		console.log(data);
		localStorage.setItem('fsc', data.fsc);
		localStorage.setItem('title', data.title);
		localStorage.setItem('description', data.description);
		localStorage.setItem('note', data.note);
		localStorage.setItem('progress', 'start');
		localStorage.setItem('method', 'hundred');
		parseProgress();
	}

	function Hundred() {
		console.log(localStorage);
		if (localStorage.getItem('status') === 'toStartPage') {
			localStorage.setItem('status', 'startPage');
			window.location.href = window.location.origin + '/productMultiEdit.aspx';
		}

		if (localStorage.getItem('status') === 'startPage') {
			var searchParameter = document.getElementById('ProductSearchResults1_ddlFilter');
			searchParameter.querySelector('option[value=FSC]').selected = true;

			var fsc = localStorage.getItem('fsc').split(',');
			if (fsc.length === 0 && window.location.pathname === '/productMultiEdit.aspx') {
				localStorage.clear();
			}
			if (fsc.length > 0) {
				localStorage.setItem('status', 'searching');

				var searchField = document.getElementById('ProductSearchResults1_txtFilter');
				searchField.value = fsc[0];

				var searchButton = document.getElementById('ProductSearchResults1_ImgBtnSearch');
				var emulateEvent = document.createEvent("MouseEvents");
				emulateEvent.initMouseEvent("click", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, searchButton);
				searchButton.dispatchEvent(emulateEvent);

				console.log(fsc);
			}
		}
		if (localStorage.getItem('status') === 'searching') {
			localStorage.setItem('status', 'inCard');
			var esitProduct = document.getElementById('ProductSearchResults1_dgDemo_ctl03_ImgEditProduct');
			var _emulateEvent = document.createEvent("MouseEvents");
			_emulateEvent.initMouseEvent("click", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, esitProduct);
			esitProduct.dispatchEvent(_emulateEvent);
		}
		if (localStorage.getItem('status') === 'inCard') {
			//ProductEdit1_txtBoxName
			if (window.location.pathname !== "/Scripts/tinymce/themes/advanced/source_editor.htm") {
				var priority = document.getElementById('ProductEdit1_ddlPriority');
				priority.getElementsByTagName('option')[0].selected = true;
				// let priorityInt = setInterval(function(){
				// 	if (document.getElementById('ProductEdit1_ddlPriority') !== null) {
				// 		if () {
				//
				// 		}
				// 	}
				// }, 100);
			}
			if (localStorage.getItem('title') !== "false" && window.location.pathname !== "/Scripts/tinymce/themes/advanced/source_editor.htm") {
				var subject = document.getElementById('ProductEdit1_txtBoxName');
				console.log(subject, subject.value, localStorage.getItem('title'));

				if (subject.value.indexOf(localStorage.getItem('title')) === -1) {
					subject.value = localStorage.getItem('title') + ' ' + subject.value;
				}
			}
			if (localStorage.getItem('description') !== "false" && window.location.pathname !== "/Scripts/tinymce/themes/advanced/source_editor.htm") {
				var openDescription = function openDescription() {
					var emulateEvent = document.createEvent("MouseEvents");
					emulateEvent.initMouseEvent("click", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, desc);
					desc.dispatchEvent(emulateEvent);
				};

				//console.log(name, name.value, localStorage.getItem('description'));
				//name.value = localStorage.getItem('description') + ' ' + name.value;


				var desc = null;
				if (document.getElementById('ProductEdit1_txtBoxDesc_code') === null) {
					var int = setInterval(function () {
						if (document.getElementById('ProductEdit1_txtBoxDesc_code') !== null) {
							desc = document.getElementById('ProductEdit1_txtBoxDesc_code');
							clearInterval(int);
							console.log(desc);
							openDescription();
						}
					}, 100);
				} else {
					desc = document.getElementById('ProductEdit1_txtBoxDesc_code');
					console.log(desc);
					openDescription();
				}
			}
			var htmlSource = null;
			if (localStorage.getItem('description') !== "false" && window.location.pathname === "/Scripts/tinymce/themes/advanced/source_editor.htm") {
				var changeDescriptionS = function changeDescriptionS() {
					htmlSource = document.getElementById('htmlSource');
					var descInt = setInterval(function () {
						//htmlSource = document.getElementById('htmlSource');
						if (htmlSource.value !== '') {
							console.log(htmlSource.value);
							clearInterval(descInt);
							//htmlSource.value = localStorage.getItem('description') + htmlSource.value + (localStorage.getItem('note') !== 'null' ? localStorage.getItem('note') : '');
							localStorage.setItem('descriptionClosed', 'yes');
							if (htmlSource.value.indexOf(localStorage.getItem('description')) === -1) {
								htmlSource.value = localStorage.getItem('description') + htmlSource.value;
							}
							if (htmlSource.value.indexOf(localStorage.getItem('note')) === -1) {
								htmlSource.value = htmlSource.value + (localStorage.getItem('note') !== 'null' ? localStorage.getItem('note') : '');
							}
							var updateHundred = document.getElementById('insert');
							var _emulateEvent2 = document.createEvent("MouseEvents");
							_emulateEvent2.initMouseEvent("click", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, updateHundred);
							updateHundred.dispatchEvent(_emulateEvent2);
						}
					}, 200);
					// console.log(htmlSource);
					// htmlSource.value = localStorage.getItem('description') + htmlSource.value + (localStorage.getItem('note') !== 'null' ? localStorage.getItem('note') : '');
					// console.log(htmlSource.value );
				};
				// if (document.getElementById('htmlSource') === null) {
				//
				// } else {
				// 	htmlSource = document.getElementById('htmlSource');
				// 	console.log(htmlSource);
				// 	changeDescriptionS();
				// }


				var _int = setInterval(function () {
					if (document.getElementById('htmlSource') !== null) {
						//htmlSource = document.getElementById('htmlSource');
						clearInterval(_int);
						console.log(htmlSource);
						changeDescriptionS();
					}
				}, 100);
			}
			if (window.location.pathname !== "/Scripts/tinymce/themes/advanced/source_editor.htm" && localStorage.getItem('descriptionClosed') === null) {
				var saveInt = setInterval(function () {
					if (localStorage.getItem('descriptionClosed') !== null) {

						localStorage.setItem('status', 'closePage');
						var saveCard = document.getElementById('ProductEdit1_btnSave');
						var _emulateEvent3 = document.createEvent("MouseEvents");
						_emulateEvent3.initMouseEvent("click", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, saveCard);
						saveCard.dispatchEvent(_emulateEvent3);

						var _fsc = localStorage.getItem('fsc').split(',');
						_fsc.shift();
						localStorage.setItem('fsc', _fsc.join(','));
						clearInterval(saveInt);
					}
				}, 100);
				// const saveCard = document.getElementById('ProductEdit1_btnSave');
				// const emulateEvent = document.createEvent("MouseEvents");
				// emulateEvent.initMouseEvent("click", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, saveCard);
				// saveCard.dispatchEvent(emulateEvent);
			}
		}
		if (window.location.pathname === "/productMultiEdit.aspx" && localStorage.getItem('status') === 'closePage') {
			localStorage.removeItem('descriptionClosed');
			localStorage.setItem('status', 'startPage');
			if (localStorage.getItem('fsc').split(',').length === 0) {
				localStorage.clear();
			} else {
				Hundred();
			}
		}
	}

	function parseProgress() {
		if (localStorage.getItem('progress') === 'start') {
			if (localStorage.getItem('method') === 'hundred') {
				localStorage.setItem('progress', 'inProgress');
				localStorage.setItem('status', 'toStartPage');

				console.log(localStorage);
			}
		}
		if (localStorage.getItem('progress') === 'inProgress') {
			if (localStorage.getItem('method') === 'hundred') {
				Hundred();
			}
		}
	}
});

// function setSettings(params){
// 	var searchParameter = document.getElementById(params.searchId);
// 	searchParameter.querySelector(params.searchQuerySelector).selected = true;
// }
// setSettings({searchId: 'ProductSearchResults1_ddlFilter', searchQuerySelector: 'option[value=FSC]'});

// setInterval(function(){
// 	console.log(document.getElementById('htmlSource').value);
// }, 500);
//"use strict";