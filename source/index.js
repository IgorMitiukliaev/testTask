$(document).ready(function ($) {
	$.noConflict();
	var $cardsStack = jQuery('.container');
	var cardsObject = [];
	var historySteps = 0;

	jQuery('#files').change(fileSelect);
	jQuery('#back').click(back);

	function fileSelect(event) {
		console.log("Select");
		var files = event.target.files;
		var file = files[0];
		var reader = new FileReader();

		reader.onload = function (e) {
			var output = jQuery("#fileOutput");
			var data = e.target.result;
			output.textContent = data;
			cardsObject = loadCardsStack(data);
			render(cardsObject);
		};
		reader.readAsText(file);
	}

	function loadCardsStack(data) {
		console.log("Load");
		var script = document.createElement('script');
		script.innerText = data;
		jQuery('head')[0].appendChild(script);
		return cards.slice();
	}

	function manageCards(e) {
		console.log("Manage");
		var stateObject = {cardsObject: cardsObject, historySteps: historySteps};
		history.pushState(stateObject, "");
		++historySteps;
		if (e.shiftKey && e.altKey) {
			cardsObject.push({type: 'wide'});
		} else if (e.shiftKey) {
			cardsObject.push({type: 'narrow'});
		} else {
			cardsObject.splice(cards.length - 1, 1)
		}
		render(cardsObject);
		console.log(cardsObject);
		console.log(window.history.state.cardsObject);
	}

	function render(c) {
		cardsObject = c.slice();
		console.log("Render");
		console.log(cardsObject);
		$cardsStack.empty();

		cardsObject.forEach(function (e, index) {
			var context = {
				index: index + 1,
				type: e.type
			};
			var template = Handlebars.compile(jQuery('#card').html());
			$cardsStack.append(template(context));
			console.log(index + " " + e.type);
		});
		jQuery('.card:last').click(e => manageCards(e));
	}

	function back() {
		console.log("Back");
		history.back();
		var c = history.state.cardsObject;
		console.log(c);
		render(c);
	}
});

