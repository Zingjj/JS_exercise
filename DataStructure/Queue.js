/**
 * 单链队列
 */
class Queue {
    constructor() {
        this.queue = [];
    }
    enQueue(item) {
        this.queue.push(item);
    }
    deQueue() {
        return this.queue.shift();
    }
    getHeader() {
        return this.queue[0];
    }
    getLength() {
        return this.queue.length;
    }
    isEmpty() {
        return this.getLength() === 0;
    }
}

// test
let queue = new Queue();
console.log(queue.isEmpty());
queue.enQueue(1);
queue.enQueue(2);
console.log(queue.deQueue());

/**
 * 循环队列
 */
class sqQueue {
    constructor() {

    }
}