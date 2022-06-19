import generateModule from '@/store/moduleGenerator';

const defaultAction = {
  value: 'some default value here',
};

export default generateModule({
  namespaced: true,

  state: { ...defaultAction },

  stateLink: 'actions/current_',

});

export { defaultAction };
