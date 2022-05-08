import generateModule from '@/store/moduleGenerator';
import current from './current';

export default generateModule({
  namespaced: true,

  state: {
    lootBoxIndex: undefined,
  },

  modules: {
    current,
  },

});
