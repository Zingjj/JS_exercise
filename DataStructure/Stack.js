class Stack {
    constructor() {
        this.stack = [];
    }
    getCount() {
        return this.stack.length;
    }
    isEmpty() {
        return this.getCount === 0;
    }
    push(item) {
        this.stack.push(item);
    }
    /**
     * 返回并删除栈顶元素
     */
    pop() {
        return this.stack.pop();
    }
    /**
     * 返回栈顶元素但不会删除栈顶元素
     */
    peek() {
        return this.stack[this.getCount() - 1];
    }
}
// test
let stack = new Stack();
stack.push(1);
stack.push(2);
console.log(stack.pop());
console.log(stack.peek());