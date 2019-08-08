class Stack {
  constructor() {
    this.arr = [];
  }

  push(target) {
    this.arr[this.arr.length] = target;
  }

  pop() {
    const lastIndex = this.arr.length - 1;
    return this.arr.splice(lastIndex, 1)[0];
  }
}

class Queue extends Stack {
  pop() {
    return this.arr.shift();
  }
}

console.log('----- Stack -----');
const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.arr); // [1, 2, 3]
console.log(stack.pop()); // 3;
console.log(stack.arr); // [1, 2]


console.log('----- Queue -----');
const queue = new Queue();
queue.push(1);
queue.push(2);
queue.push(3);
console.log(queue.arr); // [1, 2, 3]
console.log(queue.pop()); // 1
console.log(queue.arr); // [2, 3]
