import { BinaryTree } from './index';
import { init } from './view';

const binaryTree = new BinaryTree();

binaryTree.init([
  18, 12, 5, 16, 8,
  // 14, 2, 1, 31, 21, 17, 27, 9, 6, 34, 4, 49, 32, 19,
]);

binaryTree.insert(20);
binaryTree.insert(3);

console.log(binaryTree.root);

console.log('先序遍历',binaryTree.preOrderTraverse());
console.log('中序遍历',binaryTree.inOrderTraverse());
console.log('后序遍历',binaryTree.postOrderTraverse());

console.log(binaryTree.getMin(), binaryTree.getMax());
console.log(binaryTree.search(11), binaryTree.search(21));

// console.log(binaryTree.remove(16));
// console.log(binaryTree.remove(4));

const { root } = binaryTree;
function run() {
  document.title = '二叉搜索树视图';
  init(root);
}

run();
