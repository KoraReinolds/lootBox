import generateModule from '@/store/moduleGenerator';
import current from './current';

export default generateModule({
  namespaced: true,

  state: {
    actionIndex: undefined,
  },

  modules: {
    current,
  },

});
