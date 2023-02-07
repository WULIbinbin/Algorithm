import { initMixin } from './init';

function MyVue(options) {
  this._init(options);
}

initMixin(MyVue)

export default MyVue
