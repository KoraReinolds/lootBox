const generateModule = (params) => {
  const module = {

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
        [key]: (state, payload) => {
          const stateForSaving = payload.state || state;
          const newData = payload.payload === undefined
            ? payload : payload.payload;
          stateForSaving[key] = newData;
        },
      }), {}),

      ...params.mutations,

    },

    actions: {

      ...Object.keys({
        ...params.state,
        ...params.modules,
      }).reduce((obj, key) => ({
        ...obj,
        [key]: ({ state, commit }, payload) => {
          commit(key, { state, payload });
        },
      }), {}),

      ...params.actions,

    },
  };

  if (params.stateLink) module.state = { stateLink: params.stateLink };

  if (Object.keys(module.getters).length) {
    module.getters = Object.entries(module.getters).reduce((sum, [key, f]) => ({
      ...sum,
      [key]: (state, getters, rootState, rootGetters) => f(
        state.stateLink ? rootGetters[state.stateLink] : state,
        getters, rootState, rootGetters,
      ),
    }), {});
  }

  if (Object.keys(module.actions).length) {
    module.actions = Object.entries(module.actions).reduce((sum, [key, f]) => ({
      ...sum,
      [key]: (context, payload) => {
        const { state, rootGetters } = context;

        return f(
          {
            ...context,
            state: state.stateLink
              ? rootGetters[state.stateLink]
              : state,
          },
          payload,
        );
      },
    }), {});
  }

  return module;
};

export default generateModule;
