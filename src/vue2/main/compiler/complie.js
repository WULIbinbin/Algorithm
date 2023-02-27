import { Watcher } from '../observer/watcher';
import { callHook } from '../instance/lifecycle';
import { parsePath, _set } from '../utils/index';

// Compile 解析器
// 用来解析指令初始化模板，模拟vue2添加订阅者，绑定更新函数
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
    this.el.innerHtml = '';
    callHook(this.vm, 'beforeMount');
    this.compileNode(this.fragment);
    this.el.appendChild(this.fragment);
    callHook(this.vm, 'mounted');
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
      const { name, value } = attr;
      if (this.isDirective(name)) {
        if (name === 'v-model') {
          this.compileModel(node, value);
        }
      }
      if (this.isHandler(name)) {
        this.compileHandler(node, name, value);
      }
      node.removeAttribute(name);
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
  isHandler(handler) {
    return handler.startsWith('@');
  },
  compileHandler(node, eventType, eventName) {
    if (eventType === '@click') {
      node.addEventListener('click', this.vm[eventName], false);
    }
  },
  compileModel(node, prop) {
    // 如果元素带 v-model，则绑定对应输入事件（如onInput）和 订阅者（watcher），
    // console.log('compileModel', node, prop);
    // parsePath处理对象属性路径
    const val = parsePath(prop)(this.vm);
    this.updateModel(node, val);
    new Watcher(this.vm, prop, (value) => {
      console.log(prop, value);
      this.updateModel(node, value);
    });
    // 将输入值赋予 data 中
    node.addEventListener('input', (e) => {
      const newValue = e.target.value;
      // 根据对象属性路径设置值
      _set(this.vm, prop, newValue);
    });
  },
  compileText(node, prop) {
    // 绑定订阅者（watcher）
    let text = parsePath(prop)(this.vm);
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
