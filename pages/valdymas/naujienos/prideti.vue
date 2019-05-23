<template>
  <div class='columns'>
    <div class='column'>
      <h1 class='subtitle'>Prideti naujieną</h1>
      <div class='field'>
        <label class='label'>Pavadinimas</label>
        <div class='control'>
          <input class='input' type='text' v-model='title'>
        </div>
      </div>
      <div class='field'>
        <label class='label'>Tekstas</label>
        <div class='control'>
          <textarea class='textarea' v-model='content'></textarea>
        </div>
      </div>
      <br>
      <button @click='createNewsPost' class='button is-primary'>Išsaugoti</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters['users/user']
    }
  },
  data() {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    createNewsPost() {
      this.$store.dispatch('news/createNewsPost', {
        title: this.title,
        content: this.content,
        summary: this.content.substr(0, 200) + '...',
        authorName: this.user.username,
        authorId: this.user.userId
      })
    }
  }
}
</script>

