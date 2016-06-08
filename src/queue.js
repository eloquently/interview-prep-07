export class Queue {
    constructor() {
        this.arr = [];
    }
    
    push(newValue) {
        this.arr.push(newValue);
    }
    
    shift() {
        return this.arr.shift();
    }
    
    peek() {
        return this.arr[0];
    }
}

export const levelOrder = (root) => {
    const q = new Queue();
    
    q.push(root);
    
    while(q.peek() !== undefined) {
        const next = q.shift();
        console.log(next.data);
        if(next.left !== undefined) q.push(next.left);
        if(next.right !== undefined) q.push(next.right);
    }
};

export const breadthFirstSearch = (root, needle) => {
    const q = new Queue();
    
    q.push(root);
    
    let next = q.shift();
    while(next.data != needle) {
        if(next.left !== undefined) q.push(next.left);
        if(next.right !== undefined) q.push(next.right);
        next = q.shift();
    }
    
    return next;
};