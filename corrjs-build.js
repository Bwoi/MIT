document.addEventListener('DOMContentLoaded', function() {
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
	chrome.extension.onRequest.addListener(function(request){ //обработчик запроса из background
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

	function parseDateForStartHundred(data){
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
			const searchParameter = document.getElementById('ProductSearchResults1_ddlFilter');
			searchParameter.querySelector('option[value=FSC]').selected = true;

			let fsc = localStorage.getItem('fsc').split(',');
			if (fsc.length === 0 && window.location.pathname === '/productMultiEdit.aspx') {
				localStorage.clear();
			}
			if (fsc.length > 0) {
				localStorage.setItem('status', 'searching');

				const searchField = document.getElementById('ProductSearchResults1_txtFilter');
				searchField.value = fsc[0];


				const searchButton = document.getElementById('ProductSearchResults1_ImgBtnSearch');
				const emulateEvent = document.createEvent("MouseEvents");
				emulateEvent.initMouseEvent("click", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, searchButton);
				searchButton.dispatchEvent(emulateEvent);

				console.log(fsc);
			}
		}
		if (localStorage.getItem('status') === 'searching') {
			localStorage.setItem('status', 'inCard');
			const esitProduct = document.getElementById('ProductSearchResults1_dgDemo_ctl03_ImgEditProduct');
			const emulateEvent = document.createEvent("MouseEvents");
			emulateEvent.initMouseEvent("click", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, esitProduct);
			esitProduct.dispatchEvent(emulateEvent);
		}
		if (localStorage.getItem('status') === 'inCard') {
			//ProductEdit1_txtBoxName
			if (window.location.pathname !== "/Scripts/tinymce/themes/advanced/source_editor.htm") {
				const priority = document.getElementById('ProductEdit1_ddlPriority');
				priority.getElementsByTagName('option')[0].selected = true
				// let priorityInt = setInterval(function(){
				// 	if (document.getElementById('ProductEdit1_ddlPriority') !== null) {
				// 		if () {
				//
				// 		}
				// 	}
				// }, 100);
			}
			if (localStorage.getItem('title') !== "false" && window.location.pathname !== "/Scripts/tinymce/themes/advanced/source_editor.htm") {
				const subject = document.getElementById('ProductEdit1_txtBoxName');
				console.log(subject, subject.value, localStorage.getItem('title'));


				if (subject.value.indexOf(localStorage.getItem('title')) === -1) {
					subject.value = localStorage.getItem('title') + ' ' + subject.value;
				}

			}
			if (localStorage.getItem('description') !== "false" && window.location.pathname !== "/Scripts/tinymce/themes/advanced/source_editor.htm") {
				let desc = null;
				if (document.getElementById('ProductEdit1_txtBoxDesc_code') === null) {
					let int = setInterval(function(){
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

				function openDescription() {
					const emulateEvent = document.createEvent("MouseEvents");
					emulateEvent.initMouseEvent("click", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, desc);
					desc.dispatchEvent(emulateEvent);


				}


				//console.log(name, name.value, localStorage.getItem('description'));
				//name.value = localStorage.getItem('description') + ' ' + name.value;
			}
			let htmlSource = null;
			if (localStorage.getItem('description') !== "false" && window.location.pathname === "/Scripts/tinymce/themes/advanced/source_editor.htm") {
					function changeDescriptionS() {
						htmlSource = document.getElementById('htmlSource');
						let descInt = setInterval(function(){
							//htmlSource = document.getElementById('htmlSource');
							if (htmlSource.value !== '') {
								console.log(htmlSource.value)
								clearInterval(descInt);
								//htmlSource.value = localStorage.getItem('description') + htmlSource.value + (localStorage.getItem('note') !== 'null' ? localStorage.getItem('note') : '');
								localStorage.setItem('descriptionClosed', 'yes');
								if (htmlSource.value.indexOf(localStorage.getItem('description')) === -1) {
									htmlSource.value = localStorage.getItem('description') + htmlSource.value;
								}
								if (htmlSource.value.indexOf(localStorage.getItem('note')) === -1) {
									htmlSource.value = htmlSource.value + (localStorage.getItem('note') !== 'null' ? localStorage.getItem('note') : '');
								}
								const updateHundred = document.getElementById('insert');
								const emulateEvent = document.createEvent("MouseEvents");
								emulateEvent.initMouseEvent("click", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, updateHundred);
								updateHundred.dispatchEvent(emulateEvent);
							}
						}, 200);
						// console.log(htmlSource);
						// htmlSource.value = localStorage.getItem('description') + htmlSource.value + (localStorage.getItem('note') !== 'null' ? localStorage.getItem('note') : '');
						// console.log(htmlSource.value );
					}
					// if (document.getElementById('htmlSource') === null) {
					//
					// } else {
					// 	htmlSource = document.getElementById('htmlSource');
					// 	console.log(htmlSource);
					// 	changeDescriptionS();
					// }
					let int = setInterval(function () {
						if (document.getElementById('htmlSource') !== null) {
							//htmlSource = document.getElementById('htmlSource');
							clearInterval(int);
							console.log(htmlSource);
							changeDescriptionS();
						}
					}, 100);
			}
			if (window.location.pathname !== "/Scripts/tinymce/themes/advanced/source_editor.htm" && localStorage.getItem('descriptionClosed') === null) {
				let saveInt = setInterval(function(){
					if (localStorage.getItem('descriptionClosed') !== null) {


						localStorage.setItem('status', 'closePage');
						const saveCard = document.getElementById('ProductEdit1_btnSave');
						const emulateEvent = document.createEvent("MouseEvents");
						emulateEvent.initMouseEvent("click", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, saveCard);
						saveCard.dispatchEvent(emulateEvent);

						let fsc = localStorage.getItem('fsc').split(',');
						fsc.shift();
						localStorage.setItem('fsc', fsc);
						clearInterval(saveInt);

					}
				}, 100);
				// const saveCard = document.getElementById('ProductEdit1_btnSave');
				// const emulateEvent = document.createEvent("MouseEvents");
				// emulateEvent.initMouseEvent("click", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, saveCard);
				// saveCard.dispatchEvent(emulateEvent);
			}


		}
		if (window.location.pathname === "/productMultiEdit.aspx" && localStorage.getItem('status') === 'closePage' && localStorage.getItem('fsc') !== '') {
			localStorage.removeItem('descriptionClosed');
			localStorage.setItem('status', 'startPage');

			Hundred();
		} else {
			localStorage.clear();
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