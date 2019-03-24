class Node {
	constructor(data, priority) {
        this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
        if (!this.left) {
            this.left = node;
            node.parent = this;
        } else if (!this.right) {
            this.right = node;
            node.parent = this;
        }
	}

	removeChild(node) {
		if (this.left != node && this.right != node) {
            throw Error;
		}
        if (this.left == node) {
        	this.left = null;
        } else {
            this.right = null;
		}
        node.parent = null;
	}

	remove() {
        if (this.parent) {
            this.parent.removeChild(this);
        }
	}

	swapWithParent() {
        if (this.parent) {

        	// переписываем детей на родителя
            if (this.left) this.left.parent = this.parent;
            if (this.right) this.right.parent = this.parent;

            // если this левое
            if (this === this.parent.left) {
                if (this.parent.right) this.parent.right.parent = this;

                const r = this.parent.right;

                this.parent.left = this.left;
				this.parent.right = this.right;

				this.left = this.parent;
				this.right = r;
            }
			// если правое
            if (this === this.parent.right) {
                if (this.parent.left) this.parent.left.parent = this;

                const l = this.parent.left;

                this.parent.left = this.left;
				this.parent.right = this.right;

				this.left = l;
				this.right = this.parent;
            }

            // если есть "дедушка" - прописываем себя к нему
            if (this.parent.parent) {
                if (this.parent === this.parent.parent.left) {
                    this.parent.parent.left = this;
                }
                if (this.parent === this.parent.parent.right) {
                    this.parent.parent.right = this;
                }
            }

			// меняемся местами с родителем
            const	x = this.parent.parent;
            this.parent.parent = this;
            this.parent = x;
        }
    }

}

module.exports = Node;
