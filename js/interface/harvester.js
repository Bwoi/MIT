// chrome.extension.onRequest.addListener(function(request){ //обработчик запроса из background
// 	console.log(request);
// });
// document.addEventListener('DOMContentLoaded', function() {
//
// 	console.log(123);
// });


function stopIt(){
	localStorage.clear();
}
function emulationClick(element) {
	const emulateEvent = document.createEvent("MouseEvents");
	emulateEvent.initMouseEvent("click", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, element);
	element.dispatchEvent(emulateEvent);
}
console.log('ready');
//localStorage.clear();
document.addEventListener('DOMContentLoaded', function() {
	let method;

	function parseModified() {
		method = localStorage.getItem('method');
		const progress = localStorage.getItem('progress');

		if (method === 'hundred') {
			if (progress === 'modified') {
				console.log('modified');
				modifiedHundred();
			}
			if (progress === 'searching') {
				console.log('searching');
				findSearched();
			}
			if (progress === 'searched') {
				console.log('searched');
				actWithSearched();
			}
			if (progress === 'found') {
				console.log('found');
				actWithFound();
			}
			if (progress === 'opening') {
				console.log('opening');
				openingCard();
			}
			if (progress === 'opened') {
				console.log('opened');
				openedCard();
			}
			if (progress === 'openingDescription') {
				console.log('openingDescription');
				openedCardDescription();
			}
			if (progress === 'savingCard') {
				localStorage.setItem('progress', 'modified');
				modifiedHundred();
			}
		}
	}

	function workWithOpenedCardDescription(textarea) {
		const newDescription = localStorage.getItem('description');
		const newDescriptionNote = localStorage.getItem('note');
		if (textarea.value.indexOf(newDescription) < 0) {
			textarea.value = newDescription + textarea.value;
		}
		if (textarea.value.indexOf(newDescriptionNote) < 0) {
			textarea.value = textarea.value + newDescriptionNote;
		}

		const updateButton = document.getElementById('insert');
		emulationClick(updateButton);
		localStorage.setItem('progress', 'closingEditCardDescription');
	}

	function saveCardProduct(){
		const saveButton = document.getElementById('ProductEdit1_btnSave');
		emulationClick(saveButton);
		localStorage.setItem('progress', 'savingCard');
	}

	function openedCardDescription() {
		console.log('openedCardDescription');
		let openedCardDescriptionInt = setInterval(function(){
			console.log('openedCardDescriptionInt');
			const location = window.location.pathname;
			if (location === '/Scripts/tinymce/themes/advanced/source_editor.htm') {
				console.log(location);
				if (document.getElementById('htmlSource')) {
					console.log(document.getElementById('htmlSource'));
					clearInterval(openedCardDescriptionInt);
					workWithOpenedCardDescription(document.getElementById('htmlSource'));

				}
			} else {
				if (localStorage.getItem('progress') === 'closingEditCardDescription') {
					console.log('closed');
					saveCardProduct();
					clearInterval(openedCardDescriptionInt);


				}
			}
		}, 200);
	}

	function openedCard() {
		if (method === 'hundred') {
			console.log('HuNdReD');

			if (workWithNameFieldInCard()) {
				if (workWithPriorityFieldInCard(1)) {
					if (tryToOpenCardDescriptionOnHtml()) {
						localStorage.setItem('progress', 'openingDescription');
						openedCardDescription();
					}
				}
			}
		}
	}

	function tryToOpenCardDescriptionOnHtml(){
		const htmlButton = document.getElementById('ProductEdit1_txtBoxDesc_code');
		emulationClick(htmlButton);

		return true;
	}

	function workWithPriorityFieldInCard(index) {
		const priorityOption = document.getElementById('ProductEdit1_ddlPriority');
		const priorityOptions = priorityOption.getElementsByTagName('option');
		priorityOptions[index-1].selected = true;

		return true
	}

	function workWithNameFieldInCard() {
		const nameField = document.getElementById('ProductEdit1_txtBoxName');
		const text = nameField.value;

		const needAdd = localStorage.getItem('title');
		if (text.indexOf(needAdd) < 0) {
			nameField.value = needAdd + ' ' + text;
		}
		if (text.indexOf(needAdd) <= 0) {
			return true
		}
	}

	function modifiedHundred() {
		searchField('FSC');
	}

	function findSearched() {
		const progress = localStorage.getItem('progress');
		if (progress === 'searching') {
			// ? Если все зависло
		}
		if (progress === 'searched') {
			actWithSearched();
		}
		console.log(localStorage);
	}

	function actWithSearched() {
		const resultTable = document.getElementById('ProductSearchResults1_dgDemo');
		const rowsFound = resultTable.getElementsByTagName('tr');
		console.log(rowsFound, rowsFound.length);

		if (rowsFound.length > 3) {
			console.log('resa', rowsFound.length);
			for (let row = 3; row < rowsFound.length; row++) {
				console.log('ProductSearchResults1_dgDemo_ctl' + (row < 10 ? '0'+row : row) + '_chkActive');
				const active = document.getElementById('ProductSearchResults1_dgDemo_ctl' + (row < 10 ? '0'+row : row) + '_chkActive');
				const isActive = active.checked;

				if (isActive) {
					console.log('found');
					localStorage.setItem('progress', 'found');
					actWithFound(row < 10 ? '0'+row : row);
					break;
				}
				console.log(isActive);
			}

		} else {
			// Нихуя не найдено
		}
		//console.log(resultTable.getElementsByTagName('tr'));
	}

	function actWithFound(found) {
		const editFound = document.getElementById('ProductSearchResults1_dgDemo_ctl'+found+'_ImgEditProduct');
		localStorage.setItem('progress', 'opening');
		emulationClick(editFound);

	}

	function openingCard(){
		const location = window.location.pathname;

		if (location === '/product_edit.aspx') {
			console.log('opened');
			localStorage.setItem('progress', 'opened');
			openedCard();
		}
	}

	function searchField(parameter) {
		const searchOption = document.getElementById('ProductSearchResults1_ddlFilter');
		searchOption.querySelector('option[value='+parameter+']').selected = true;

		const product = separatedProduct();
		if (product) {
			const searchInput = document.getElementById('ProductSearchResults1_txtFilter');
			searchInput.value = product;

			localStorage.setItem('progress', 'searching');
			startSearching();
		} else {
			stopIt();
		}
	}

	function startSearching() {
		const searchButton = document.getElementById('ProductSearchResults1_ImgBtnSearch');
		setTimeout(function(){
			emulationClick(searchButton);
		}, 100);
		localStorage.setItem('progress', 'searched');
		console.log(searchButton, localStorage.getItem('progress'));

	}

	function separatedProduct() {
		if (!localStorage.getItem('fsc')) {
			localStorage.setItem('fsc', '');
		}

		let FSCs = localStorage.getItem('fsc').split(',');

		if (FSCs.length > 0) {
			const product = FSCs.shift();
			localStorage.setItem('product', product);
			console.log(localStorage);
			localStorage.setItem('fsc', FSCs.join(','));
			return product;
		} else {
			return false
		}
		//console.log(FSCs);
	}

	function parseLocalStorage() {
		if (localStorage.getItem('dirty')) {
			parseToPretty();
		}
	}

	function parseToPretty() {
		const dirtyData = JSON.parse(localStorage.getItem('dirty'));
		localStorage.removeItem('dirty');

		function parseKeys(jsonArr) {
			for (const key in jsonArr) {
				localStorage.setItem(key, jsonArr[key]);

				if (typeof jsonArr[key] === "object" && key !== 'fsc') {
					parseKeys(jsonArr[key]);
				}
			}
		}
		parseKeys(dirtyData);
		localStorage.removeItem('data');
		localStorage.setItem('progress', 'modified');

		setTimeout(function(){
			parseModified();
		}, 500)
	}

	chrome.extension.onRequest.addListener(function(request){ //обработчик запроса из background
		let toString = JSON.stringify(request);
		let toJSON = JSON.parse(toString);
		console.log(toString, toJSON, typeof toString, typeof toJSON); //выведется переданное сообщение


		localStorage.setItem('dirty', JSON.stringify(request));
		parseLocalStorage();


		// if (localStorage.length === 0) {
		// 	localStorage.setItem('dirty', JSON.stringify(request));
		// 	parseLocalStorage();
		//
		// 	console.log('false');
		// } else {
		// 	parseModified();
		// 	console.log('true');
		// }



	});
	if (localStorage.length > 0) {
		parseModified();
	}
});