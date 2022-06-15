import generateModule from '@/store/moduleGenerator';

const sceneConfig = {
  textHeight: 40,
};

export default generateModule({
  namespaced: true,

  state: { ...sceneConfig },

});

export { sceneConfig };
