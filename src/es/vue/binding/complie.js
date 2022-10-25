// Compile 解析器
// 用来解析指令初始化模板，一个是用来添加添加订阅者，绑定更新函数
export function Compile(vm) {
  this.vm = vm;
  this.el = vm.$el;
  this.fragment = null;
  this.init();
}

Compile.prototype = {
  init() {
    this.fragment = this.nodeFragment(this.el);
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
};

Compile.prototype = {
  compileNode(fragment) {
    let childNodes = fragment.childNodes;
    [...childNodes].forEach((node) => {
      let reg = /\{\{(.*)\}\}/;
      let text = node.textContent;
      if (this.isElementNode(node)) {
        this.compile(node); // 渲染指令模板
      } else if (this.isTextNode(node) && reg.test(text)) {
        let prop = RegExp.$1;
        this.compileText(node, prop); // 渲染{{}} 模板
      }

      // 递归编译子节点
      if (node.childNodes && node.childNodes.length) {
        this.compileNode(node);
      }
    });
  },
  compile(node) {
    let nodeAttrs = node.attributes;
    [...nodeAttrs].forEach((attr) => {
      let name = attr.name;
      if (this.isDirective(name)) {
        let value = attr.value;
        if (name === 'v-model') {
          this.compileModel(node, value);
        }
        node.removeAttribute(name);
      }
    });
  },
  // 省略。。。
};
