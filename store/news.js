export const state = () => ({
  posts: [],
  nextPageToken: null,
  previousPageToken: []
})

export const mutations = {
  setPosts(state, postsData) {
    state.posts = postsData
  },
  addPost(state, postData) {
    state.posts.push(postData)
  },
  setNextPageToken(state, pageToken) {
    state.nextPageToken = pageToken
  },
  clearNextPageToken(state) {
    state.nextPageToken = null
  },
  addPreviousPageToken(state, pageToken) {
    state.previousPageToken.push(pageToken)
  },
  removePreviousPageToken(state) {
    state.previousPageToken.pop()
  }
}

export const actions = {
  createNewsPost({ commit }, postData) {
    return this.$axios
      .$post(`https://firestore.googleapis.com/v1/projects/${process.env.PROJECT_ID}/databases/(default)/documents/news`, {
        fields: this.$firestoreMap(postData)
      })
      .then(response => {
        postData.id = response.name.split('/').pop()
        postData.createTime = response.createTime
        commit('addPost', postData)
        return this.$axios
          .$patch(`https://firestore.googleapis.com/v1/projects/${process.env.PROJECT_ID}/databases/(default)/documents/news/${postData.id}?updateMask.fieldPaths=createTime`, {
            fields: { createTime: { timestampValue: postData.createTime } }
          })
          .catch(error => console.log(error.response))
      })
      .catch(error => console.log(error.response))
  },
  getNewsPosts({ commit, state }, options) {
    let query = '?mask.fieldPaths=title&mask.fieldPaths=summary&mask.fieldPaths=authorName&mask.fieldPaths=authorId&mask.fieldPaths=createTime'
    if (options && options.orderBy) query += '&orderBy=' + options.orderBy
    else query += '&orderBy=createTime+desc'
    if (options && options.pageSize) query += '&pageSize=' + options.pageSize
    else query += '&pageSize=3'
    if (options && options.pageToken) query += '&pageToken=' + options.pageToken

    if (options && options.moveToPrevious) commit('removePreviousPageToken')
    else if (options && options.pageToken) commit('addPreviousPageToken', options.pageToken)

    return this.$axios
      .$get(`https://firestore.googleapis.com/v1/projects/${process.env.PROJECT_ID}/databases/(default)/documents/news` + query)
      .then(result => {
        let postsData = []
        result.documents.forEach(data => {
          let post = this.$firestoreParse(data.fields)
          post.id = data.name.split('/').pop()
          postsData.push(post)
        })
        commit('setPosts', postsData)
        if (result.nextPageToken) {
          commit('setNextPageToken', result.nextPageToken)
        } else {
          if (state.nextPageToken) commit('clearNextPageToken')
        }
        return postsData
      })
      .catch(error => console.log(error.response))
  }
}
