/* ------ Deque ------ */
class Deque {
  constructor() {
    this.arr = [];
  }

  pushBack(target) {
    this.arr[this.arr.length] = target;
  }

  pushFront(target) {
    this.arr.unshift(target);
  }

  popBack() {
    const lastIndex = this.arr.length - 1;
    return this.arr.splice(lastIndex, 1)[0];
  }

  popFront() {
    return this.arr.shift();
  }
}

const deque = new Deque();

deque.pushFront(1);
deque.pushBack(2);
deque.pushFront(3);
deque.pushBack(4);

console.log(deque.popFront()); // 3
console.log(deque.popBack()); // 4


/* ------ Priority Queue ------ */

class PQ {
  constructor() {
    this.arr = [];
  }

  isEmpty() {
    return !this.arr.length;
  }

  push(key, target) {
    this.arr[this.arr.length] = { key, target };
    this.arr.sort((a, b) => a.key - b.key);
  }

  popMax() {
    if (this.isEmpty()) return false;
    const lastIndex = this.arr.length - 1;
    return this.arr.splice(lastIndex, 1)[0].target;
  }

  popMin() {
    if (this.isEmpty()) return false;
    return this.arr.shift().target;
  }
}

const pq = new PQ();

pq.push(3, 'a');
pq.push(2, 'b');
pq.push(6, 'c');
pq.push(1, 'd');
console.log(pq.popMax()); // c
console.log(pq.popMin()); // d
