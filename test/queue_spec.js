import { expect } from 'chai';

import * as q from '../src/queue';

import { TreeNode } from '../src/trees';
import * as trees from '../src/trees';

import sinon from 'sinon';

const smallTree_1 = new TreeNode(1);
const smallTree_2 = new TreeNode(2);
const smallTree_3 = new TreeNode(3);

smallTree_1.left = smallTree_2;
smallTree_1.right = smallTree_3;

const largeTree_1 = new TreeNode(1);
const largeTree_6 = new TreeNode(6);
const largeTree_3 = new TreeNode(3);

largeTree_1.left = largeTree_6;
largeTree_1.right = largeTree_3;

const largeTree_2 = new TreeNode(2);
const largeTree_4 = new TreeNode(4);

largeTree_6.left = largeTree_2;
largeTree_6.right = largeTree_4;

const largeTree_9 = new TreeNode(9);

largeTree_3.right = largeTree_9;

const largeTree_5 = new TreeNode(5);
const largeTree_0 = new TreeNode(0);

largeTree_4.left = largeTree_5;
largeTree_9.right = largeTree_0;

const crookedTree = {};
for(const v of [9, 10, 18, 11, 28, 13]) {
    crookedTree[v] = new TreeNode(v);
}

crookedTree[9].right = crookedTree[10];
crookedTree[10].right = crookedTree[18];
crookedTree[18].left = crookedTree[11];
crookedTree[11].right = crookedTree[13];
crookedTree[18].right = crookedTree[28];

describe('queue specs', () => {
    if(q.Queue) {
        describe('Queue class', () => {
            it('implements push, shift, and peek', () => {
                const qu = new q.Queue();
                qu.push(1);
                expect(qu.peek()).to.eq(1);
                qu.push(2);
                expect(qu.peek()).to.eq(1);
                expect(qu.shift()).to.eq(1);
                expect(qu.peek()).to.eq(2);
                expect(qu.shift()).to.eq(2);
                expect(qu.peek()).to.eq(undefined);
                expect(qu.shift()).to.eq(undefined);
            });
        });
    }
    
    if(q.levelOrder) {
        describe('levelOrder()', () => {
            let cl;
            
            beforeEach(() => {
                cl = sinon.spy(console, 'log');
            });
            
            afterEach(() => {
                console.log.restore();
            });
            
            it('prints largeTree traversal', () => {
                q.levelOrder(largeTree_1);
                
                // this is the level-order traversal:
                const spies = [1,6,3,2,4,9,5,0].map((el) => {
                    return cl.withArgs(el);
                });
                
                sinon.assert.callOrder(...spies);
            });
            
            it('prints crookedTree traversal', () => {
                q.levelOrder(crookedTree[9]);
                
                // this is the level-order traversal:
                const spies = [9,10,18,11,28,13].map((el) => {
                    return cl.withArgs(el);
                });
                
                sinon.assert.callOrder(...spies);
            });
        });
    }
    
    if(q.breadthFirstSearch) {
        describe('breadthFirstSearch()', () => {
            it('finds root', () => {
                expect(q.breadthFirstSearch(largeTree_1, 1)).to
                    .eq(largeTree_1);
            });
            
            it('finds left leaf', () => {
                expect(q.breadthFirstSearch(largeTree_1, 5)).to
                    .eq(largeTree_5);
            });
            
            it('finds right node', () => {
                expect(q.breadthFirstSearch(largeTree_1, 9)).to
                    .eq(largeTree_9);
            });
            
            it('is not recursive', () => {
                const bfs = sinon.spy(q, 'breadthFirstSearch');
                q.breadthFirstSearch(largeTree_1, 1);
                expect(bfs.calledOnce).to.eq(true);
            });
        });
    }
})