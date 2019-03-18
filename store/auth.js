export const state = () => ({
  token: null
})

export const mutations = {
  setToken(state, token) {
    state.token = token
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
      })
      .catch(error => console.log(error))
  }
}

export const getters = {
  isAuthenticated(state) {
    return state.token != null
  }
}
