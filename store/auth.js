export const state = () => ({
  token: null
})

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  clearToken(state) {
    state.token = null
  }
}

export const actions = {
  authenticateUser({ commit, dispatch }, authData) {
    let authUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='
    if (authData.type == 'sign-up') authUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key='
    return this.$axios
      .$post(authUrl + process.env.API_KEY, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then(result => {
        commit('setToken', result.idToken)
        if (authData.type == 'sign-in') dispatch('users/getUserData', result.localId, { root: true })
        else if (authData.type == 'sign-up') dispatch('users/setUserData', { authData, userId: result.localId }, { root: true })
        this.$cookies.set('token', result.idToken)
        this.$cookies.set('tokenExpiration', new Date().getTime() + Number.parseInt(result.expiresIn) * 1000)
        this.$cookies.set('userId', result.localId)
        if (authData.rememberUser) this.$cookies.set('refreshToken', result.refreshToken)
        else if (this.$cookies.get('refreshToken')) this.$cookies.set('refreshToken', result.refreshToken)
      })
      .catch(error => {
        return Promise.reject(error.response.data.error)
      })
  },
  initAuth({ dispatch }) {
    const token = this.$cookies.get('token')
    const tokenExpiration = this.$cookies.get('tokenExpiration')
    const refreshToken = this.$cookies.get('refreshToken')

    if (!token || !tokenExpiration) return

    if (new Date().getTime() > +tokenExpiration) {
      if (process.server) return
      if (refreshToken) {
        dispatch('refreshToken', refreshToken)
        return
      }
      dispatch('logout') // TODO: warn user about session expiration
      return
    }
  },
  refreshToken({ commit }, refreshToken) {
    return this.$axios
      .$post('https://securetoken.googleapis.com/v1/token?key=' + process.env.API_KEY, {
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      })
      .then(result => {
        commit('setToken', result.id_token)
        this.$cookies.set('token', result.id_token)
        this.$cookies.set('tokenExpiration', new Date().getTime() + Number.parseInt(result.expires_in) * 1000)
      })
  },
  changeUserInfo({ dispatch, state }, newData) {
    return new Promise((resolve, reject) => {
      return dispatch('authenticateUser', newData)
        .then(() => {
          let payload = {
            idToken: state.token,
            returnSecureToken: false
          }
          if (newData.type == 'password-change') payload.password = newData.newPassword
          else if (newData.type == 'email-change') payload.email = newData.newEmail
          return this.$axios
            .$post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/setAccountInfo?key=' + process.env.API_KEY, payload)
            .then(result => {
              if (newData.type == 'email-change') {
                dispatch('users/updateUserData', { email: result.email }, { root: true })
              }
              resolve()
            })
            .catch(error => reject(error.response.data.error))
        })
        .catch(error => reject(error))
    })
  },
  logout({ commit }) {
    commit('clearToken')
    commit('users/clearUser', null, { root: true })
    this.$cookies.removeAll()
  }
}

export const getters = {
  isAuthenticated(state) {
    return state.token != null
  }
}
