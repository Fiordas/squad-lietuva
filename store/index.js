export const state = () => ({})

export const actions = {
  async nuxtServerInit({ commit }) {
    const refreshToken = this.$cookies.get('refreshToken')
    const tokenExpiration = this.$cookies.get('tokenExpiration')
    if (tokenExpiration && new Date().getTime() > +tokenExpiration) {
      if (refreshToken) {
        const result = await this.$axios.$post('https://securetoken.googleapis.com/v1/token?key=' + process.env.API_KEY, {
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        })
        commit('auth/setToken', result.id_token)
        this.$cookies.set('token', result.id_token)
        this.$cookies.set('tokenExpiration', new Date().getTime() + Number.parseInt(result.expires_in) * 1000)
      } else {
        this.$cookies.removeAll()
      }
    }
  }
}
