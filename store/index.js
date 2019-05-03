export const state = () => ({})

export const actions = {
  async nuxtServerInit({ commit, dispatch }) {
    const token = this.$cookies.get('token')
    const refreshToken = this.$cookies.get('refreshToken')
    const tokenExpiration = this.$cookies.get('tokenExpiration')
    const userId = this.$cookies.get('userId')

    if (tokenExpiration && new Date().getTime() > +tokenExpiration) {
      if (refreshToken && userId) {
        await dispatch('auth/refreshToken', refreshToken)
        await dispatch('users/getUserData', userId)
      } else {
        this.$cookies.removeAll()
      }
    } else if (token && userId) {
      commit('auth/setToken', token)
      await dispatch('users/getUserData', userId)
    }
  }
}
