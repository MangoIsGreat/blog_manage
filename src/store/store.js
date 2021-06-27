import vue from "vue";
import Vuex from "vuex";

vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userInfo: {},
  },
  mutations: {
    changeUserInfo(state, newUserInfo) {
      state.userInfo = newUserInfo;
    },
  },
});

export default store;
