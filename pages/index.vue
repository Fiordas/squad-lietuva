<template>
  <div>
    <TheBanner />
    <section class='section'>
      <div class='container'>
        <h1 class='title'>Naujienos</h1>
        <div class='columns'>
          <div class='column'>
            <NewsBox v-for='post in newsPosts' :key='post.id' :postData='post' />
          </div>
          <div class='column is-5-tablet is-4-desktop is-3-widescreen'>
            <iframe src='https://discordapp.com/widget?id=246075715714416641&theme=dark' width='350' height='500' allowtransparency='true' frameborder='0'></iframe>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TheBanner from '@/components/TheBanner'
import NewsBox from '@/components/NewsBox'

export default {
  components: {
    TheBanner,
    NewsBox
  },
  data() {
    return {
      newsPosts: []
    }
  },
  async asyncData({ store }) {
    if (store.state.news.posts && store.state.news.posts.length) {
      return { newsPosts: store.state.news.posts }
    } else {
      const data = await store.dispatch('news/getNewsPosts')
      return { newsPosts: data }
    }
  }
}
</script>

<style scoped>
iframe {
  min-height: 500px;
}
</style>

