<template>
  <div class='columns'>
    <div class='column' v-if='user'>
      <h1 class='title'>{{user.username}}</h1>
      <hr>
      <p class='title is-5'>El. pašto adresas</p>
      <p class='subtitle is-7 is-spaced'>{{user.email}}</p>
      <p class='title is-5'>Rolė</p>
      <p class='subtitle is-7 is-spaced is-primary'>{{user.role}}</p>
      <p class='title is-5'>Registracijos data</p>
      <p class='subtitle is-7 is-spaced'>{{createdAt}}</p>
      <p class='title is-5'>Paskutinis prisijungimas</p>
      <p class='subtitle is-7'>{{lastLoginAt}}</p>
    </div>
    <div class='column is-4'>
      <figure class='image is-square'>
        <img src='https://bulma.io/images/placeholders/480x480.png'>
      </figure>
      <br>
      <button class='button is-primary is-fullwidth is-outlined'>Pasirinkti nuotrauką</button>
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
      createdAt: new Date(),
      lastLoginAt: new Date()
    }
  },
  created() {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }
    this.createdAt = new Date(this.user.createdAt).toLocaleDateString(
      'lt',
      options
    )
    this.lastLoginAt = new Date(this.user.lastLoginAt).toLocaleDateString(
      'lt',
      options
    )
  }
}
</script>
