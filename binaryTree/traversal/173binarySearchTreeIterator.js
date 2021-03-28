// Implement the BSTIterator class that represents an iterator over the in-order traversal of a binary search tree (BST):

// BSTIterator(TreeNode root) Initializes an object of the BSTIterator class. The root of the BST is given as part of the constructor. The pointer should be initialized to a non-existent number smaller than any element in the BST.
// boolean hasNext() Returns true if there exists a number in the traversal to the right of the pointer, otherwise returns false.
// int next() Moves the pointer to the right, then returns the number at the pointer.
// Notice that by initializing the pointer to a non-existent smallest number, the first call to next() will return the smallest element in the BST.

// You may assume that next() calls will always be valid. That is, there will be at least a next number in the in-order traversal when next() is called.

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 */
var BSTIteratorMy = function(root) {
    this.root = root;
    this.record = [];
    this.launch = false;
};

/**
 * @return {number}
 */
BSTIterator.prototype.next = function() {
    this.launch = true;
    const record = this.record;
    if (record.length == 0) {
        let target = this.root;
        inorder(target);
        return record[record.length - 1].val;
    } else {
        const target = record.pop();
        inorder(target.right);
        return record[record.length - 1].val;
    }
    function inorder(root) {
        if (!root) {
            return;
        }
        while (root) {
            record.push(root);
            root = root.left;
        }
        return;
    }
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function() {
    const record = this.record;
    if (this.root == null) {
        return false;
    }
    if (!this.launch) {
        return true;
    }
    if (record.length > 1 || record[0].right) {
        return true;
    }
    return false;
};

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */

// Standard Ans
var BSTIterator = function(root) {
    this.cur = root;
    this.stack = [];
};

BSTIterator.prototype.next = function() {
    while (this.cur) {
        this.stack.push(this.cur);
        this.cur = this.cur.left;
    }
    this.cur = this.stack.pop();
    const ret = this.cur.val;
    this.cur = this.cur.right;
    return ret;
};

BSTIterator.prototype.hasNext = function() {
    return this.cur !== null || this.stack.length;
};