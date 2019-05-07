<template>
  <div>
    <TheBanner/>
    <section class='section'>
      <div class='container'>
        <div class='columns'>
          <div class='column'>
            <h1 class='title'>Naujienos</h1>
          </div>
        </div>
        <div class='columns'>
          <div class='column'>
            <NewsBox/>
            <NewsBox/>
            <NewsBox/>
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
  }
}
</script>

<style scoped>
iframe {
  min-height: 500px;
}
</style>

