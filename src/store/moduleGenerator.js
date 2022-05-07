const generateModule = (params) => ({

  ...params,

  getters: {

    ...Object.keys({
      ...params.state,
    }).reduce((obj, key) => ({
      ...obj,
      [key]: (state) => state[key],
    }), {}),

    ...params.getters,

  },

  mutations: {

    ...Object.keys({
      ...params.state,
      ...params.modules,
    }).reduce((obj, key) => ({
      ...obj,
      [key]: (state, payload) => { state[key] = payload; },
    }), {}),

    ...params.mutations,

  },
});

export default generateModule;
