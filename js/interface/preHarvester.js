console.log('loaded');




document.addEventListener('DOMContentLoaded', function(){
	console.log('ready');

	let method;
	function clearIt(){
		console.log('clearing');
		localStorage.clear();
	}
	function emulationClick(element) {
		const emulateEvent = document.createEvent("MouseEvents");
		emulateEvent.initMouseEvent("click", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, element);
		element.dispatchEvent(emulateEvent);
	}

	// chrome.extension.onMessage.addListener(function(request, sender, callback){
	// 	console.log(request, sender, callback);
	// 	callback('12w3');
	// });


	//chrome.extension.sendMessage({ method: "hundreds" }); - ответ в бекграунд
	//console.log('loaded');
	chrome.extension.onRequest.addListener(function(request, sender, callback){
		const dataStorage = localStorage;
		console.log(request);
		if (dataStorage.length !== 0) {
			clearIt();
		}

		parseDirtyData(request.data);
	});

	function checkDaProgress() {
		console.log('checkDaProgress now');
		const progress = localStorage.getItem('progress');

		if (method === 'hundred') {
			console.log('hundred now');
			if (progress === 'start') {
				console.log('start');
				addressChecking();
			}
			if (progress === 'locationChecked') {
				console.log('locationChecked');
				countIteration();
			}
			if (progress === 'counted') {
				console.log('counted');
				startFinding();
			}
			if (progress === 'searched') {
				console.log('searched');
				findFromFound();
			}
			if (progress === 'openCard') {
				console.log('openCard');
				if (window.location.pathname === '/product_edit.aspx') {
					openCard();
				} else {
					//forWaiting()
				}

			}
			if (progress === 'openDescription') {
				if (window.location.pathname === '/Scripts/tinymce/themes/advanced/source_editor.htm') {
					changingDescription();
				} else {
					waitingCloseDescription();
				}
			}
		}
	}

	function parseDirtyData(data) {
		localStorage.setItem('progress', 'start');
		localStorage.setItem('method', data.method);
		localStorage.setItem('link', data.link);
		localStorage.setItem('completedCards', []);
		if (parseDataToPretty(data.data)) {
			setTimeout(function(){
				checkDaProgress();
			}, 100);
		}
	}


	function parseDataToPretty(data){
		method = localStorage.getItem('method');
		for (let key in data) {
			localStorage.setItem(key, data[key]);
		}
		return true;
	}




	function addressChecking() {
		const link = localStorage.getItem('link');

		if (window.location.pathname !== link) {
			window.location.pathname = link;
		} else {
			localStorage.setItem('progress', 'locationChecked');
			checkDaProgress();
		}
	}

	function countIteration(){
		let count = localStorage.getItem('cards').split(',');
		console.log(count.length);
		if (count.length > 0 && count[0] !== '') {
			localStorage.setItem('activeCard', count.shift());
			localStorage.setItem('cards', count);
			localStorage.setItem('progress', 'counted');
			checkDaProgress();
		} else {
			//window.location.pathname = localStorage.getItem('link');
			chrome.extension.sendMessage({ method: "hundred", message: 'ended', undefinedCards: localStorage.getItem('undefinedCards') });
			clearIt();

			//chrome.extension.sendMessage({ method: "hundred", message: 'ended', undefinedCards: localStorage.getItem('undefinedCards') });
			console.log('нету');

		}

		console.log(count);
	}

	function startFinding() {
		if (method === 'hundred') {
			setSearchingParameters('FSC');
		}
	}

	function setSearchingParameters(parameter){
		const selectInput = document.getElementById('ProductSearchResults1_ddlFilter');
		selectInput.querySelector('option[value="'+parameter+'"]').selected = true;

		const searchInput = document.getElementById('ProductSearchResults1_txtFilter');
		const profile = localStorage.getItem('activeCard');
		searchInput.value = profile;

		const searchButton = document.getElementById('ProductSearchResults1_ImgBtnSearch');
		setTimeout(function(){
			localStorage.setItem('progress', 'searched');
			emulationClick(searchButton);
		}, 100);
	}

	function findFromFound() {
		const resultsTable = document.getElementById('ProductSearchResults1_dgDemo');
		const resultsTableTr = resultsTable.getElementsByTagName('tr');

		function toEdit(editElement) {
			const editEl = document.getElementById(editElement);
			localStorage.setItem('progress', 'openCard');
			setTimeout(function(){
				emulationClick(editEl);
			}, 100);
		}

		if (resultsTableTr.length > 3) {
			for (let row = 2; row < resultsTableTr.length - 1; row++) {
				const num = (row+1 < 10 ? '0'+(row+1) : row+1);
				console.log(num);
				const idIsActive = 'ProductSearchResults1_dgDemo_ctl' + num + '_chkActive';
				const isActive = document.getElementById(idIsActive);
				console.log(idIsActive, isActive.checked);
				if (isActive.checked) {
					console.log('true');
					toEdit('ProductSearchResults1_dgDemo_ctl' + num + '_ImgEditProduct');
					break;
				}

				if (!isActive.checked && row === resultsTableTr.length - 1) {
					// Не найден активный
					//const undefinedCards = localStorage

					if (!localStorage.getItem('undefinedCards')) {
						localStorage.setItem('undefinedCards', localStorage.getItem('activeCard'));
					}
					const undefinedCards = localStorage.getItem('undefinedCards');
					localStorage.setItem('undefinedCards', undefinedCards + ',' + localStorage.getItem('activeCard'));
				}

			}
			console.log('yess');
		}
		console.log(resultsTableTr, resultsTableTr.length);
	}

	function openCard() {
		if (method === 'hundred') {
			if (changeFieldNameFromCard()) {
				if (changePriority('1')) {
					openDescription();
				}
			}
		}
	}

	function changeFieldNameFromCard() {
		const nameField = document.getElementById('ProductEdit1_txtBoxName');
		const addTitle = localStorage.getItem('title');
		if (nameField.value.indexOf(addTitle) < 0) {
			nameField.value = addTitle + ' ' + nameField.value;
		}
		console.log(nameField);

		return setTimeout(function(){
			return true
		}, 50);
	}

	function changePriority(number) {
		const priority = document.getElementById('ProductEdit1_ddlPriority');
		priority.getElementsByTagName('option')[number-1].selected = true;

		return setTimeout(function(){
			return true
		}, 50);
	}

	function openDescription() {
		let htmlButton;
		const htmlButtonInterval = setInterval(function(){
			if (document.getElementById('ProductEdit1_txtBoxDesc_code')) {
				clearInterval(htmlButtonInterval);
				htmlButton = document.getElementById('ProductEdit1_txtBoxDesc_code');
				localStorage.setItem('progress', 'openDescription');
				emulationClick(htmlButton);
				checkDaProgress();
			}
		}, 100);
	}

	function changingDescription() {

		let htmlSource;
		const advanceDescription = localStorage.getItem('description');
		const advanceNote = localStorage.getItem('note');
		function workWithForm() {
			const updateButton = document.getElementById('insert');
			console.log('workWithForm', htmlSource.value);
			if (htmlSource.value.indexOf(advanceDescription) < 0) {
				htmlSource.value = advanceDescription + htmlSource.value;
			}

			if (htmlSource.value.indexOf(advanceNote) < 0) {
				htmlSource.value = htmlSource.value + advanceNote;
			}

			setTimeout(function(){
				localStorage.setItem('progress', 'savedDescription');
				emulationClick(updateButton);
			}, 150);
			console.log('workWithForm', htmlSource.value);
		}

		const htmlSourceInterval = setInterval(function(){
			if (document.getElementById('htmlSource')) {
				htmlSource = document.getElementById('htmlSource');
				clearInterval(htmlSourceInterval);
				workWithForm();
			}
		}, 150);
	}
	function waitingCloseDescription(){
		const saveCardButton = document.getElementById('ProductEdit1_btnSave');

		const savedDescriptionInterval = setInterval(function(){
			if (localStorage.getItem('progress') === 'savedDescription') {
				const actived = localStorage.getItem('activeCard');
				let completed = localStorage.getItem('completedCards').split(',');
				if (completed[0] === '') {
					completed[completed.length] = actived;
				}
				localStorage.setItem('completedCards', completed.join(','));


				console.log(completed, completed.length);


				clearInterval(savedDescriptionInterval);
				setTimeout(function(){
					chrome.extension.sendMessage({ method: "hundred", message: 'cardSaved', count: completed.length - 1});
					localStorage.setItem('progress', 'start');
					emulationClick(saveCardButton);
				}, 1000);

			}
		}, 200);
		console.log('waitingCloseDescription');
	}





	console.log('Работай, падла');



	if (localStorage.length !== 0) {
		method = localStorage.getItem('method');
		console.log('suukaaa');
		checkDaProgress();
	}


});