import { Watcher } from './watcher';
import { hasProperty } from './utils';

// Compile 解析器
// 用来解析指令初始化模板，一个是用来添加添加订阅者，绑定更新函数
// /\{\{((?:.|\r?\n)+?)\}\}/g;
const reg = /\{\{(.+?)\}\}/;
export function Compile(vm) {
  this.vm = vm;
  this.el = vm.$el;
  this.fragment = null;
  this.init();
}

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
    // 解析 dom 节点，如文本节点则用正则表达式匹配并解析模板字符串中 data 的变量
    const { childNodes } = fragment;
    [...childNodes].forEach((node) => {
      const text = node.textContent;
      if (this.isElementNode(node)) {
        this.compile(node); // 渲染指令模板
      } else if (this.isTextNode(node) && reg.test(text)) {
        const prop = text.match(reg)[1];
        this.compileText(node, prop); // 渲染 {{}} 模板
      }

      // 递归编译子节点
      if (node.childNodes && node.childNodes.length) {
        this.compileNode(node);
      }
    });
  },
  compile(node) {
    // 解析元素，用元素属性中提取 v-model
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
    // 如果元素带 v-model，则绑定对应输入事件（如onInput）和 订阅者（watcher），
    console.log('compileModel', node, prop);
    const val = this.vm[prop];
    this.updateModel(node, val);
    new Watcher(this.vm, prop, (value) => {
      this.updateModel(node, value);
    });
    // 将输入值赋予 data 中
    node.addEventListener('input', (e) => {
      const newValue = e.target.value;
      this.vm[prop] = newValue;
    });
  },
  compileText(node, prop) {
    // 绑定订阅者（watcher）
    let text = '';
    // if (hasProperty(this.vm.$data, prop)) {
    //   text = this.vm[prop];
    // } else if (hasProperty(this.vm.$computed, prop)) {
    //   text = this.vm[prop];
    // }
    text = this.vm[prop];
    this.updateView(node, text);
    new Watcher(this.vm, prop, (value) => {
      console.log(prop, value);
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
