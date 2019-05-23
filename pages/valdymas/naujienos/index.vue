<template>
  <div class='columns'>
    <div class='column'>
      <h1 class='subtitle'>Visos naujienos</h1>
      <b-table detailed :data='newsPosts' default-sort='createTime' default-sort-direction='desc'>
        <template slot-scope='props'>
          <b-table-column field='title' label='Pavadinimas' sortable>{{ props.row.title }}</b-table-column>

          <b-table-column field='authorName' label='Autorius' sortable>{{ props.row.authorName }}</b-table-column>

          <b-table-column field='createTime' label='Sukurta' sortable centered>{{ new Date(props.row.createTime).toLocaleDateString('lt', {hour: 'numeric', minute: 'numeric'}) }}</b-table-column>
        </template>
        <template slot='detail' slot-scope='props'>
          <article class='media'>
            <figure class='media-left'>
              <p class='image is-64x64'>
                <img src='https://bulma.io/images/placeholders/24x24.png'>
              </p>
            </figure>
            <div class='media-content'>
              <div class='content'>
                <p>
                  <strong>{{props.row.title}}</strong>
                  <br>
                  {{ props.row.summary }}
                </p>
              </div>
            </div>
          </article>
        </template>
      </b-table>
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
  data() {
    return {
      newsPosts: []
    }
  }
}
</script>

