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
            <nuxt-link to="/valdymas/naujienos/prideti" tag="button" class="button is-primary is-outlined is-pulled-right">
              <span>Pridėti</span>
              <b-icon icon="plus-circle" size="is-small"></b-icon>
            </nuxt-link>
          </div>
        </div>

        <b-table detailed :data="newsPosts" default-sort="createTime" default-sort-direction="desc">
          <template slot-scope="props">
            <b-table-column field="title" label="Pavadinimas" sortable>{{ props.row.title }}</b-table-column>

            <b-table-column field="authorName" label="Autorius" sortable>{{ props.row.authorName }}</b-table-column>

            <b-table-column field="createTime" label="Sukurta" sortable centered>{{ new Date(props.row.createTime).toLocaleDateString('lt', {hour: 'numeric', minute: 'numeric'}) }}</b-table-column>
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
  async asyncData({ store }) {
    if (!store.state.news.posts || !store.state.news.posts.length) {
      const data = await store.dispatch('news/getNewsPosts')
      return { newsPosts: data }
    }
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
      newsPosts: []
    }
  },
  methods: {
    async nextPage() {
      const data = await this.$store.dispatch('news/getNewsPosts', {
        pageToken: this.$store.state.news.nextPageToken
      })
      this.newsPosts = data
    },
    async previousPage() {
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
    }
  }
}
</script>

