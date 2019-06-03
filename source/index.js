$(document).ready(function ($) {
	$.noConflict();
	let $cardsStack = jQuery('.container');
	let cardsObject = [];


	class Node {
		constructor(data) {
			this.val = data;
			this.next = null;
			this.previous = null;
		}
	}

	class LinkedList {
		constructor() {
			this.state = null;
		}

		insert(data) {
			let newNode = new Node(data);
			if (this.state === null) {
				this.state = newNode;
			} else {
				this.state.next = newNode;
				newNode.previous = this.state;
				this.state = newNode;
			}
		}

		back() {
			if (this.state.previous !== null) {
				this.state = this.state.previous;
			}
			return this.state.val;
		}

		forward() {
			if (this.state.next !== null) {
				this.state = this.state.next;
			}
			return this.state.val;
		}

		printBackwards() {
			var current = this.state;
			while (current) {
				console.log(current.val);
				current = current.previous;
			}
		}
	}

	let hist = new LinkedList();

	jQuery('#files').change(fileSelect);
	jQuery('#back').click(back);
	jQuery('#forward').click(forward);
	window.onpopstate = function () {
		back();
	};

	function fileSelect(event) {
		console.log("Select");
		let files = event.target.files;
		let file = files[0];
		let reader = new FileReader();

		reader.onload = function (event) {
			let output = jQuery("#fileOutput");
			let data = event.target.result;
			output.textContent = data;
			cardsObject = loadCardsStack(data);
			render(cardsObject);
		};
		reader.readAsText(file);
	}

	function loadCardsStack(data) {
		console.log("Load");
		let script = document.createElement('script');
		script.innerText = data;
		jQuery('head')[0].appendChild(script);
		return cards.slice();
	}

	function manageCards(event) {
		console.log("Manage");
		history.pushState("","");
		hist.insert(cardsObject);
		if (event.shiftKey && event.altKey) {
			cardsObject.push({type: 'wide'});
		} else if (event.shiftKey) {
			cardsObject.push({type: 'narrow'});
		} else {
			cardsObject.splice(-1, 1)
		}
		render(cardsObject);
	}

	function render(c) {
		console.log("Render");
		cardsObject = c.slice();
		$cardsStack.empty();

		cardsObject.forEach(function (e, index) {
			let context = {
				index: index + 1,
				type: e.type
			};
			let template = Handlebars.compile(jQuery('#card').html());
			$cardsStack.append(template(context));
		});
		jQuery('.card:last').click(e => manageCards(e));
	}

	function back() {
		console.log("Back");
		let c = hist.back();
		render(c);
	}

	function forward() {
		console.log("Forward");
		let c = hist.forward();
		render(c);
	}
});

