class Node {
	constructor(val) {
		this.val = val;
		this.next = null;
		this.previous = null;
	}
}

class LinkedList {
	constructor() {
		this.head = null;
		this.size = 0;
	}

	insert(data) {
		this.size++;
		let newNode = new Node(data);
		if (this.head === null) {
			this.head = newNode;
		} else {
			this.head.next = newNode;
			newNode.previous = this.head;
			this.head = newNode;
		}
	}

	back() {
		if (this.head.previous === null) {
			return null;
		}
		this.head = this.head.previous;
		return this.head.val;
	}

	forward() {
		if (this.head.next === null) {
			return null;
		}
		this.head = this.head.next;
		return this.head.val;
	}
}