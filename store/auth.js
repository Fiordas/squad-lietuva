import Cookies from 'js-cookie'

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
        Cookies.set('token', result.idToken)
        Cookies.set('tokenExpiration', new Date().getTime() + Number.parseInt(result.expiresIn) * 1000)
      })
      .catch(error => console.log(error))
  },
  initAuth(vuexContext, req) {
    let token
    let tokenExpiration

    if (req) {
      // server-side
      if (!req.headers.cookie) {
        return
      }
      token = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith('token='))
        .split('=')[1]
      tokenExpiration = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith('tokenExpiration='))
        .split('=')[1]
    } else {
      // client-side
      token = Cookies.get('token')
      tokenExpiration = Cookies.get('tokenExpiration')
    }

    if (!token) {
      return
    }

    if (new Date().getTime() > +tokenExpiration) {
      vuexContext.dispatch('logout')
      return
    }
    vuexContext.commit('setToken', token)
  },
  logout(vuexContext) {
    vuexContext.commit('clearToken')
    Cookies.remove('token')
    Cookies.remove('tokenExpiration')
  }
}

export const getters = {
  isAuthenticated(state) {
    return state.token != null
  }
}
