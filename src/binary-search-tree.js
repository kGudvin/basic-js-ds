const { NotImplementedError } = require('../extensions/index.js')

const { ListNode } = require('../extensions/list-node.js')

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class Node {
	constructor(data) {
		this.data = data
		this.left = null
		this.right = null
	}
}

class BinarySearchTree {
	constructor() {
		this.head = null
	}

	root() {
		return this.head
	}

	add(data) {
		const newNode = new Node(data)

		if (this.head === null) {
			this.head = newNode
		} else {
			this._insertNode(this.head, newNode)
		}
	}

	_insertNode(node, newNode) {
		if (newNode.data < node.data) {
			if (node.left === null) {
				node.left = newNode
			} else {
				this._insertNode(node.left, newNode)
			}
		} else {
			if (node.right === null) {
				node.right = newNode
			} else {
				this._insertNode(node.right, newNode)
			}
		}
	}

	has(data) {
		return this._searchNode(this.head, data) !== null
	}

	find(data) {
		return this._searchNode(this.head, data)
	}

	_searchNode(node, data) {
		if (node === null) {
			return null
		}

		if (data < node.data) {
			return this._searchNode(node.left, data)
		} else if (data > node.data) {
			return this._searchNode(node.right, data)
		} else {
			return node
		}
	}

	remove(data) {
		this.head = this._removeNode(this.head, data)
	}

	_removeNode(node, data) {
		if (node === null) {
			return null
		}

		if (data < node.data) {
			node.left = this._removeNode(node.left, data)
			return node
		} else if (data > node.data) {
			node.right = this._removeNode(node.right, data)
			return node
		} else {
			// Node with no children
			if (node.left === null && node.right === null) {
				return null
			}

			// Node with one child
			if (node.left === null) {
				return node.right
			} else if (node.right === null) {
				return node.left
			}

			// Node with two children
			const minRight = this._findMinNode(node.right)
			node.data = minRight.data
			node.right = this._removeNode(node.right, minRight.data)
			return node
		}
	}

	min() {
		if (this.head === null) {
			return null
		}
		return this._findMinNode(this.head).data
	}

	_findMinNode(node) {
		while (node.left !== null) {
			node = node.left
		}
		return node
	}

	max() {
		if (this.head === null) {
			return null
		}
		let node = this.head
		while (node.right !== null) {
			node = node.right
		}
		return node.data
	}
}

module.exports = {
	BinarySearchTree,
}
