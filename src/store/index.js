
import Vue from 'vue'
import Vuex from 'vuex'
// import routingu zeby po zalogowaniu było przekierowanie
import router from '../router'
// import funkcji hashujacej
//import { sha256 } from 'js-sha256';

//import axiosa
import axios from 'axios'

Vue.use(Vuex)
// tworzenie globalnego store
export default new Vuex.Store({
  state: {
    user: {
      isAuth: false,
      loginErr: false,
      token: '',
      expireTime: '',
      name: '',
    }
  },
  mutations: {
    authUser(state, payload) {
      state.user.isAuth = true;
      state.user.name = payload.name,
        state.user.token = payload.token,
        state.user.expireTime = payload.expireTime,

        console.log(`Loggin ${state.user.name} is success!`)
    },

    handleErr(state) {
      state.user.loginErr = true
    }
  },
  actions: {
    login({ commit }, payload) {
      axios.get(`https://api.github.com/users/${payload.name}`).then(
        (response) => {
          const res = response.data
          const userData = {
            name: res.name,
            token: JSON.stringify(res.id),
            expireTime: '3600s',
          }
          commit('authUser', userData);
          this._vm.$session.start()
          this._vm.$session.set('user', userData)
          this._vm.$cookie.set('token', userData.token, { expires: userData.expireTime })
          router.push('/dashboard')
        }, () => {
          console.log('mamy error')
          commit('handleErr')
        })
    }
  },
  getters: {
    isUserAuth: state => state.user.isAuth,
    loginWithErr: state => state.user.loginErr
  }
})
