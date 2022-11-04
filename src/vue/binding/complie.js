import { Watcher } from './watcher';

// Compile 解析器
// 用来解析指令初始化模板，一个是用来添加添加订阅者，绑定更新函数
export function Compile(vm) {
  this.vm = vm;
  this.el = vm.$el;
  this.fragment = null;
  this.init();
}

const reg = /\{\{(.+?)\}\}/;
const reg2 = /\{\{(.*)\}\}/;

Compile.prototype = {
  init() {
    this.fragment = this.nodeFragment(this.el);
    this.compileNode(this.fragment);
    this.el.appendChild(this.fragment);
  },
  nodeFragment(el) {
    const fragment = document.createDocumentFragment();
    let child = el.firstChild;
    // 将子节点，全部移动文档片段里
    while (child) {
      fragment.appendChild(child);
      child = el.firstChild;
    }
    return fragment;
  },
  compileNode(fragment) {
    const { childNodes } = fragment;
    [...childNodes].forEach((node) => {
      const text = node.textContent;
      if (this.isElementNode(node)) {
        this.compile(node); // 渲染指令模板
      } else if (this.isTextNode(node) && reg.test(text)) {
        const prop = text.match(reg)[1];
        this.compileText(node, prop); // 渲染{{}} 模板
      }

      // 递归编译子节点
      if (node.childNodes && node.childNodes.length) {
        this.compileNode(node);
      }
    });
  },
  compile(node) {
    const nodeAttrs = node.attributes;
    [...nodeAttrs].forEach((attr) => {
      const { name } = attr;
      if (this.isDirective(name)) {
        const { value } = attr;
        if (name === 'v-model') {
          this.compileModel(node, value);
        }
        node.removeAttribute(name);
      }
    });
  },
  isElementNode(node) {
    return node && node.nodeType === 1;
  },
  isTextNode(node) {
    return node && (node.nodeType === 3 || node.nodeName === '#text');
  },
  isDirective(directive) {
    return directive.startsWith('v-');
  },
  compileModel(node, prop) {
    console.log('compileModel', node, prop);
    const val = this.vm.$data[prop];
    this.updateModel(node, val);
    new Watcher(this.vm, prop, (value) => {
      this.updateModel(node, value);
    });
    node.addEventListener('input', (e) => {
      const newValue = e.target.value;
      if (val === newValue) {
        return;
      }
      this.vm.$data[prop] = newValue;
    });
  },
  compileText(node, prop) {
    const text = this.vm.$data[prop];
    this.updateView(node, text);
    new Watcher(this.vm, prop, (value) => {
      this.updateView(node, value);
    });
  },
  updateView(node, value) {
    node.textContent = typeof value === 'undefined' ? '' : value;
  },
  updateModel(node, value) {
    node.value = typeof value === 'undefined' ? '' : value;
  },
};
