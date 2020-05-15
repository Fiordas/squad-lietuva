export const state = () => ({
  posts: [],
  pageSize: 3,
  nextPageToken: null,
  previousPageToken: []
})

export const mutations = {
  setPosts(state, postsData) {
    state.posts = postsData
  },
  setPageSize(state, pageSize) {
    state.pageSize = pageSize
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
  },
  clearPreviousPageTokens(state) {
    state.previousPageToken = []
  }
}

export const actions = {
  getNewsPosts({ commit, state }, options) {
    let query = '?mask.fieldPaths=title&mask.fieldPaths=summary&mask.fieldPaths=authorName&mask.fieldPaths=authorId&mask.fieldPaths=createTime&mask.fieldPaths=editable&mask.fieldPaths=published'
    if (options && options.orderBy) query += '&orderBy=' + options.orderBy
    else query += '&orderBy=createTime+desc'
    if (options && options.pageSize) commit('setPageSize', options.pageSize)
    query += '&pageSize=' + state.pageSize
    if (options && options.pageToken) query += '&pageToken=' + options.pageToken

    if (options && options.moveToPrevious) commit('removePreviousPageToken')
    else if (options && options.pageToken) commit('addPreviousPageToken', options.pageToken)
    else commit('clearPreviousPageTokens')

    return this.$axios
      .$get(`https://firestore.googleapis.com/v1/projects/${process.env.PROJECT_ID}/databases/(default)/documents/news` + query)
      .then(result => {
        const postsData = result.documents.map(document =>
          ({ ...this.$firestoreParse(document.fields), id: document.name.split('/').pop(), updateTime: document.updateTime })
        )
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
