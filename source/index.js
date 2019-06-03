$(document).ready(function ($) {
	$.noConflict();
	var $cardsStack = jQuery('.container');
	var cardsObject = [];

	jQuery('#files').change(fileSelect);
	jQuery('#back').click(back);

	function fileSelect(event) {
		console.log("Select");
		var files = event.target.files;
		var file = files[0];
		var reader = new FileReader();

		reader.onload = function (event) {
			var output = jQuery("#fileOutput");
			var data = event.target.result;
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

	function manageCards(event) {
		console.log("Manage");

		if (event.shiftKey && event.altKey) {
			cardsObject.push({type: 'wide'});
		} else if (event.shiftKey) {
			cardsObject.push({type: 'narrow'});
		} else {
			cardsObject.splice(-1, 1)
		}
		render(cardsObject);
		console.log("Manage");
		var stateObject = {cardsObject: cardsObject};
		history.pushState(stateObject, "");
		console.log(history.state.cardsObject);
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
		});
		jQuery('.card:last').click(e => manageCards(e));
	}

	function back() {
		console.log("Back");
		history.go(-1);
		var c = history.state.cardsObject;
		console.log(c);
		render(c);
	}
});

