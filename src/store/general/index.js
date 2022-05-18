import generateModule from '@/store/moduleGenerator';

const generalConfig = {
  name: '',
};

export default generateModule({
  namespaced: true,

  state: { ...generalConfig },

});

export { generalConfig };
