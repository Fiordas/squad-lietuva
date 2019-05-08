export const state = () => ({
  user: null
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  updateUser(state, data) {
    Object.keys(data).forEach(key => {
      state.user[key] = data[key]
    })
  },
  clearUser(state) {
    state.user = null
  }
}

export const actions = {
  setUserData({ commit }, { authData, userId }) {
    const userData = {
      username: authData.username,
      email: authData.email,
      admin: false
    }
    return this.$axios
      .$post(`https://firestore.googleapis.com/v1/projects/${process.env.PROJECT_ID}/databases/(default)/documents/users?documentId=${userId}`, {
        fields: this.$firestoreMap(userData)
      })
      .then(() => {
        commit('setUser', userData)
      })
      .catch(error => console.log(error))
  },
  getUserData({ commit }, userId) {
    return this.$axios
      .$get(`https://firestore.googleapis.com/v1/projects/${process.env.PROJECT_ID}/databases/(default)/documents/users/${userId}`)
      .then(userData => {
        if (userData) {
          commit('setUser', this.$firestoreParse(userData.fields))
        } else {
          console.log('No user found.')
        }
      })
      .catch(error => console.log(error))
  },
  updateUserData({ commit }, { updateData, userId }) {
    let updateMask = ''
    Object.keys(updateData).forEach(value => {
      updateMask += '&updateMask.fieldPaths=' + value
    })
    updateMask = updateMask.substring(1)
    return this.$axios
      .$patch(`https://firestore.googleapis.com/v1/projects/${process.env.PROJECT_ID}/databases/(default)/documents/users/${userId}?${updateMask}`, {
        fields: this.$firestoreMap(updateData)
      })
      .then(() => {
        commit('updateUser', updateData)
      })
      .catch(error => console.log(error))
  }
}

export const getters = {
  user(state) {
    return state.user
  }
}
