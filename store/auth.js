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
  authenticateUser(vuexContext, authData) {
    let authUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='
    if (authData.isSignUp) authUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key='
    return this.$axios
      .$post(authUrl + process.env.API_KEY, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then(result => {
        vuexContext.commit('setToken', result.idToken)
        this.$cookies.set('token', result.idToken)
        this.$cookies.set('tokenExpiration', new Date().getTime() + Number.parseInt(result.expiresIn) * 1000)
        if (authData.rememberUser) this.$cookies.set('refreshToken', result.refreshToken)
      })
      .catch(error => console.log(error))
  },
  initAuth(vuexContext) {
    const token = this.$cookies.get('token')
    const tokenExpiration = this.$cookies.get('tokenExpiration')
    const refreshToken = this.$cookies.get('refreshToken')

    if (!token || !tokenExpiration) return

    if (new Date().getTime() > +tokenExpiration) {
      if (process.server) return
      if (refreshToken) {
        this.$axios
          .$post('https://securetoken.googleapis.com/v1/token?key=' + process.env.API_KEY, {
            grant_type: 'refresh_token',
            refresh_token: refreshToken
          })
          .then(result => {
            vuexContext.commit('setToken', result.id_token)
            this.$cookies.set('token', result.id_token)
            this.$cookies.set('tokenExpiration', new Date().getTime() + Number.parseInt(result.expires_in) * 1000)
          })
          .catch(error => console.log(error))
        return
      }
      vuexContext.dispatch('logout')
      return
    }
    vuexContext.commit('setToken', token)
  },
  logout(vuexContext) {
    vuexContext.commit('clearToken')
    this.$cookies.removeAll()
  }
}

export const getters = {
  isAuthenticated(state) {
    return state.token != null
  }
}
