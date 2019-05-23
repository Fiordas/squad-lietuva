export const state = () => ({
  posts: []
})

export const mutations = {
  setPosts(state, postsData) {
    state.posts = postsData
  },
  addPost(state, postData) {
    state.posts.push(postData)
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
  getNewsPosts({ commit }, date) {
    let structuredQuery = {
      from: [{ collectionId: 'news' }],
      orderBy: [{ field: { fieldPath: 'createTime' }, direction: 'DESCENDING' }],
      select: { fields: [{ fieldPath: 'title' }, { fieldPath: 'summary' }, { fieldPath: 'authorName' }, { fieldPath: 'authorId' }, { fieldPath: 'createTime' }] }
    }
    if (date) structuredQuery.startAt = { values: [{ timestampValue: date }], before: false }

    return this.$axios
      .$post(`https://firestore.googleapis.com/v1/projects/${process.env.PROJECT_ID}/databases/(default)/documents:runQuery`, {
        structuredQuery
      })
      .then(result => {
        let postsData = []
        result.forEach(data => {
          let post = this.$firestoreParse(data.document.fields)
          post.id = data.document.name.split('/').pop()
          postsData.push(post)
        })
        commit('setPosts', postsData)
        console.log(result)
        return postsData
      })
      .catch(error => console.log(error.response))
  }
}
