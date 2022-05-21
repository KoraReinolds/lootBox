const generateModule = (params) => {
  const module = {

    ...params,

    getters: {

      ...Object.keys({
        ...params.state,
      }).reduce((obj, key) => ({
        ...obj,
        [key]: (state, getters, rootState, rootGetters) => {
          const linkToState = params.stateLink
            ? rootGetters[state.stateLink]
            : state;

          if (!linkToState) console.warn(`${key} not found in the state`);

          return linkToState?.[key] || {};
        },
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
          const newData = payload.payload || payload;

          stateForSaving[key] = newData;
        },
      }), {}),

      ...params.mutations,

    },

    actions: {

      ...Object.keys(
        params.stateLink ? { ...params.state } : {},
      ).reduce((obj, key) => ({
        ...obj,
        [key]: ({ state, commit, rootGetters }, payload) => {
          commit(
            key,
            {
              state: rootGetters[state.stateLink],
              payload,
            },
          );
        },
      }), {}),

      ...params.actions,

    },
  };

  if (params.stateLink) module.state = { stateLink: params.stateLink };

  return module;
};

export default generateModule;
