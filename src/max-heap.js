const Node = require('./node');

class MaxHeap {
	constructor() {
        this.root = null;
        // массив свободных для добавления родителей
        this.parentNodes = [];
	}

	push(data, priority) {
        const node = new Node(data, priority);
        this.insertNode(node);
        this.shiftNodeUp(node);
	}

	pop() {
        if (!this.isEmpty()) {
            const detached = this.detachRoot();
            this.restoreRootFromLastInsertedNode(detached);
            this.shiftNodeDown(this.root);
            return detached.data;
        }
	}

	detachRoot() {
        const root = this.root;
        if (~this.parentNodes.indexOf(root)) {
            this.parentNodes.shift()
        }
        this.root = null;
        return root;
	}

	restoreRootFromLastInsertedNode(detached) {
        if (!this.isEmpty() || this.parentNodes.length != 0) {
            const last = this.parentNodes.pop();
            if (!last.parent) {
                return this.root = last;
            }
            if (last.parent.right === last && last.parent !== detached) {
                this.parentNodes.unshift(last.parent);
            }
            last.remove();
            if (detached !== last.parent) {
                if (detached.left) {
                    last.appendChild(detached.left);
                }
                if (detached.right) {
                    last.appendChild(detached.right);
                }
            }
            if (!last.right) {
                this.parentNodes.unshift(last);
            }
            this.root = last;
        }
	}

	size() {
	    function count(node) {
	        if (node) {
                return count(node.left) + count(node.right)+1;
            } else {
	            return 0;
            }
        }
        return count(this.root);
	}

	isEmpty() {
        return this.root == null;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
        if (this.isEmpty()) {
            this.root = node;
            this.parentNodes.push(node);
        } else {
            this.parentNodes.push(node);
            this.parentNodes[0].appendChild(node);
        }
        // удаляем узел c двумя детьми
        if (this.parentNodes[0].left && this.parentNodes[0].right) {
            this.parentNodes.shift();
        }
	}

	shiftNodeUp(node) {
        if (node.parent) {
            if (node.priority > node.parent.priority) {
				// делаем нужные изменения в parentNodes
				const ni = this.parentNodes.indexOf(node);
				const pi = this.parentNodes.indexOf(node.parent);
                if (~ni) {
                    if (~pi) {
                        const x = this.parentNodes[ni];
                        this.parentNodes[ni] = this.parentNodes[pi];
						this.parentNodes[pi] = x
					} else {
                        this.parentNodes[ni] = node.parent;
					}
                }
                node.swapWithParent();
                this.shiftNodeUp(node);
            }
        }
        else {
        	this.root = node;
        }
	}

	shiftNodeDown(node) {

        if (node && node.left) {

            let up;
            if (node.right) {
                if (node.left.priority > node.right.priority) {
                    up = node.left;
                } else {
                    up = node.right;
                }
            } else {
                up = node.left;
            }

            if (node.priority < up.priority) {
                const ni = this.parentNodes.indexOf(node);
                const nc = this.parentNodes.indexOf(up);
                if (node === this.root) this.root = up;
                if (~nc) {
                    if (~ni) {
                        const x = this.parentNodes[nc];
                        this.parentNodes[nc] = this.parentNodes[ni];
                        this.parentNodes[ni] = x;
                    } else {
                        this.parentNodes[nc] = node;
                    }
                }
                up.swapWithParent();
                this.shiftNodeDown(node);
            }
        }
	}
}

module.exports = MaxHeap;
