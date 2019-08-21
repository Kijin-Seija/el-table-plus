import CommonTable from './CommonTable';

export default {
  install(Vue) {
    Vue.mixin({
      components: { CommonTable }
    });
  }
};
