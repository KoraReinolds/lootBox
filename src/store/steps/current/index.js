import generateModule from '@/store/moduleGenerator';
import { defaultAction } from '@/store/actions/current';

const defaultStep = {
  active: true,
  finished: false,
  chance: '0',
  actions: [],
};

export default generateModule({
  namespaced: true,

  state: { ...defaultStep },

  actions: {

    addNewAction({ commit, state }) {
      commit('actions', [...state.actions, { ...defaultAction }]);
      commit('actions/actionIndex', state.actions.length - 1, { root: true });
    },

  },

});

export { defaultStep };
