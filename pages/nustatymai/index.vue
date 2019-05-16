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
      <figure class='image is-4by3'>
        <b-loading :active='true' :is-full-page='false'></b-loading>
        <img
          v-if='!user.photoDownloadToken'
          src='https://firebasestorage.googleapis.com/v0/b/squad-lietuva.appspot.com/o/profilePhotos%2Fplaceholder.png?alt=media&token=92d5c7ef-942a-4a7d-98d1-e380e5d2d46c'
        >
        <img v-else :src='`https://firebasestorage.googleapis.com/v0/b/squad-lietuva.appspot.com/o/profilePhotos%2F${user.userId}?alt=media&token=${user.photoDownloadToken}`'>
      </figure>
      <br>
      <b-upload v-model='photoFile'>
        <a class='button is-primary is-fullwidth is-outlined' :class='{"is-loading": isLoading}'>
          <b-icon icon='upload'></b-icon>
          <span>Pasirinkti nuotrauką</span>
        </a>
      </b-upload>
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
  },
  data() {
    return {
      createdAt: new Date(),
      lastLoginAt: new Date(),
      photoFile: null,
      isLoading: false
    }
  },
  watch: {
    photoFile() {
      this.uploadPhoto()
    }
  },
  methods: {
    async uploadPhoto() {
      this.isLoading = true
      return this.$axios
        .$post(
          process.env.STORAGE_URL +
            process.env.BUCKET_NAME +
            '/o?name=profilePhotos/' +
            this.user.userId,
          this.photoFile
        )
        .then(result => {
          this.$store
            .dispatch('users/updateUserData', {
              photoDownloadToken: result.downloadTokens
            })
            .then(() => {
              this.isLoading = false
            })
            .catch(error => console.log(error.response.data))
        })
        .catch(error => console.log(error.response.data))
    }
  }
}
</script>
