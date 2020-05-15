<template>
  <div class="box has-background-dark">
    <div class="columns">
      <div class="column">
        <h1 class="title">Naujienų valdymas</h1>
        <hr />
        <div class="columns">
          <div class="column">
            <h1 class="subtitle">Visos naujienos</h1>
          </div>
          <div class="column">
            <button @click="createNewsPost" :class="{'is-loading': isLoading}" class="button is-primary is-outlined is-pulled-right">
              <span>Pridėti naujieną</span>
              <b-icon icon="plus-circle" size="is-small"></b-icon>
            </button>
          </div>
        </div>

        <b-table detailed :data="newsPosts" default-sort="createTime" default-sort-direction="desc" :loading="isLoading">
          <template slot-scope="props">
            <b-table-column field="title" label="Pavadinimas" sortable>{{ props.row.title }}</b-table-column>

            <b-table-column field="authorName" label="Autorius" sortable>{{ props.row.authorName }}</b-table-column>

            <b-table-column
              field="createTime"
              label="Sukurta"
              sortable
              centered
            >{{ new Date(props.row.createTime).toLocaleDateString('lt', {hour: 'numeric', minute: 'numeric'}) }}</b-table-column>

            <b-table-column field="actions" label="Veiksmai">
              <button
                @click="$router.push(`/valdymas/naujienos/${props.row.id}`)"
                class="button is-primary is-small"
                :class="{'is-loading': isLoading}"
                :disabled="!props.row.editable && props.row.updateTime > new Date(Date.now() - 1000 * 60).toISOString()"
              >
                <b-icon icon="pencil" size="is-small"></b-icon>
              </button>
              <button @click="confirmDeletePost(props.row)" class="button is-danger is-small" :class="{'is-loading': isLoading}">
                <b-icon icon="close-circle" size="is-small"></b-icon>
              </button>
            </b-table-column>
          </template>
          <template slot="detail" slot-scope="props">
            <article class="media">
              <figure class="media-left">
                <p class="image is-64x64">
                  <img src="https://bulma.io/images/placeholders/24x24.png" />
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>{{props.row.title}}</strong>
                    <br />
                    {{ props.row.summary }}
                  </p>
                </div>
              </div>
            </article>
          </template>
        </b-table>
        <br />
        <div class="buttons">
          <button @click="previousPage" :disabled="isFirstPage" class="button is-primary">
            <b-icon icon="chevron-left"></b-icon>
          </button>
          <button @click="nextPage" :disabled="!isLastPage" class="button is-primary">
            <b-icon icon="chevron-right"></b-icon>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async created() {
    this.isLoading = true
    const data = await this.$store.dispatch('news/getNewsPosts', {
      pageSize: 3
    })
    this.newsPosts = data
    this.isLoading = false
  },
  computed: {
    isLastPage() {
      return this.$store.state.news.nextPageToken != null
    },
    isFirstPage() {
      return this.$store.state.news.previousPageToken.length < 1
    }
  },
  data() {
    return {
      newsPosts: [],
      isLoading: false
    }
  },
  methods: {
    async createNewsPost() {
      this.isLoading = true
      const postData = {
        title: 'Naujas įrašas',
        content: '',
        summary: '',
        authorName: this.$store.state.users.user.username,
        authorId: this.$store.state.users.user.userId,
        editable: false,
        published: false
      }
      return this.$axios
        .$post(
          `https://firestore.googleapis.com/v1/projects/${process.env.PROJECT_ID}/databases/(default)/documents/news`,
          {
            fields: this.$firestoreMap(postData)
          }
        )
        .then(response => {
          postData.id = response.name.split('/').pop()
          postData.createTime = response.createTime
          return this.$axios
            .$patch(
              `https://firestore.googleapis.com/v1/projects/${process.env.PROJECT_ID}/databases/(default)/documents/news/${postData.id}?updateMask.fieldPaths=createTime`,
              {
                fields: { createTime: { timestampValue: postData.createTime } }
              }
            )
            .then(() => {
              this.$router.push(`/valdymas/naujienos/${postData.id}`)
              this.isLoading = false
            })
            .catch(error => console.log(error.response))
        })
        .catch(error => console.log(error.response))
    },
    async nextPage() {
      this.isLoading = true
      const data = await this.$store.dispatch('news/getNewsPosts', {
        pageToken: this.$store.state.news.nextPageToken
      })
      this.newsPosts = data
      this.isLoading = false
    },
    async previousPage() {
      this.isLoading = true
      let options = {
        moveToPrevious: true
      }

      if (this.$store.state.news.previousPageToken.length > 1) {
        options.pageToken = Array.from(
          this.$store.state.news.previousPageToken
        ).slice(-2)[0]
      }

      const data = await this.$store.dispatch('news/getNewsPosts', options)
      this.newsPosts = data
      this.isLoading = false
    },
    confirmDeletePost(post) {
      this.$dialog.confirm({
        title: 'Ištrinti naujieną',
        message: `Ar tikrai nori <b>ištrinti</b> naujieną "${post.title}"?`,
        confirmText: 'Ištrinti',
        cancelText: 'Atšaukti',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.deletePost(post.id)
      })
    },
    async deletePost(postId) {
      this.isLoading = true
      try {
        await this.$axios.$delete(
          `https://firestore.googleapis.com/v1/projects/${process.env.PROJECT_ID}/databases/(default)/documents/news/${postId}`
        )
        this.newsPosts = await this.$store.dispatch('news/getNewsPosts', {
          pageSize: 3
        })
      } catch (error) {
        console.log(error)
      }
      this.isLoading = false
    }
  }
}
</script>

