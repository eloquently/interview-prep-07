export class TreeNode {
    constructor(data, left, right) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

export const preorder = (root) => {
    if(root === undefined) return;
    
    console.log(root.data);
    preorder(root.left);
    preorder(root.right);
};

export const inorder = (root) => {
    if(root === undefined) return;
    
    inorder(root.left);
    console.log(root.data);
    inorder(root.right);
};

export const postorder = (root) => {
    if(root === undefined) return;
    
    postorder(root.left);
    postorder(root.right);
    console.log(root.data);
};

export const basicSearch = (root, needle) => {
    if(root === undefined) return;
    
    if(root.data == needle) return root;
    
    const leftSearch = basicSearch(root.left, needle);
    if(leftSearch !== undefined)
        return leftSearch;

    const rightSearch = basicSearch(root.right, needle);
    if(rightSearch !== undefined)
        return rightSearch;
};

export const searchBST = (root, needle) => {
    if(root === undefined) return;
    if(root.data === needle) return root;
    
    if(needle < root.data) return searchBST(root.left, needle);
    if(needle > root.data) return searchBST(root.right, needle);
}

export const insert = (root, newValue) => {
    const left = newValue < root.data;
    
    if(left && root.left !== undefined)
        insert(root.left, newValue);
    else if(left && root.left === undefined)
        root.left = new TreeNode(newValue);
    else if(!left && root.right !== undefined)
        insert(root.right, newValue);
    else
        root.right = new TreeNode(newValue);
    
};

