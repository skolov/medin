export default {
  state: {
    message: 'Привет, я STORE(VUEX)',
  },
  mutations: {
    newTextStore(state, payload) {
      state.message = payload
    },
  },
  actions: {
    newTextStore({ commit }, payload) {
      commit('newTextStore', payload)
    },
  },
  getters: {
    getMessage(state) {
      return state.message
    },
  },
}
