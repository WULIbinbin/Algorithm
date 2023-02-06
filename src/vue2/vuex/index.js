export class Store {
  constructor(options, Vue) {
    this.options = options;
    install(Vue);
  }
}

function install(Vue) {
  const _Vue = Vue;
  if (this.$options.store) {
    _Vue.prototype.$store = this.$options.store;
  }
  console.log(_Vue);
}
