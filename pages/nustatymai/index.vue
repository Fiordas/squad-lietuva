<template>
  <div class="columns" v-if="user">
    <div class="column">
      <h1 class="title">{{ user.username }}</h1>
      <hr />
      <p class="title is-5">{{ $t('AUTH.EMAIL') }}</p>
      <p class="subtitle is-7 is-spaced">{{ user.email }}</p>
      <p class="title is-5">{{ $t('SETTINGS.ROLE') }}</p>
      <p class="subtitle is-7 is-spaced is-primary">{{ user.role }}</p>
      <p class="title is-5">{{ $t('SETTINGS.DATE_REGISTERED') }}</p>
      <p class="subtitle is-7 is-spaced">{{ createdAt }}</p>
      <p class="title is-5">{{ $t('SETTINGS.LAST_LOGIN') }}</p>
      <p class="subtitle is-7">{{ lastLoginAt }}</p>
    </div>
    <div class="column is-4">
      <figure class="image is-4by3">
        <b-loading :active="true" :is-full-page="false"></b-loading>
        <img
          v-if="!user.photoDownloadToken"
          src="https://firebasestorage.googleapis.com/v0/b/squad-lietuva.appspot.com/o/profilePhotos%2Fplaceholder.png?alt=media&token=0f38b42f-7271-4fba-a73f-60c4ca214612"
        />
        <img
          v-else
          :src="
            `https://firebasestorage.googleapis.com/v0/b/squad-lietuva.appspot.com/o/profilePhotos%2F${user.userId}%2FprofilePhoto?alt=media&token=${user.photoDownloadToken}`
          "
        />
      </figure>
      <br />
      <b-upload
        v-model="photoFile"
        class="button is-primary is-fullwidth is-outlined"
        :class="{ 'is-loading': isLoading }"
      >
        <b-icon icon="upload"></b-icon>
        <span>{{ $t('SETTINGS.SELECT_PHOTO') }}</span>
      </b-upload>
    </div>
  </div>
</template>

<script>
import Compressor from 'compressorjs'

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
    this.createdAt = new Date(this.user.createdAt).toLocaleDateString('lt', options)
    this.lastLoginAt = new Date(this.user.lastLoginAt).toLocaleDateString('lt', options)
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
      if (!this.photoFile) return
      this.uploadPhoto()
    }
  },
  methods: {
    async uploadPhoto() {
      const vm = this
      this.isLoading = true
      new Compressor(this.photoFile, {
        quality: 0.8,
        success(result) {
          const formData = new FormData()
          formData.append('file', result, result.name)
          return vm.$axios
            .$post(
              process.env.STORAGE_URL +
                process.env.BUCKET_NAME +
                '/o?name=profilePhotos/' +
                vm.user.userId +
                '/profilePhoto',
              formData
            )
            .then(result => {
              vm.$store
                .dispatch('users/updateUserData', {
                  photoDownloadToken: result.downloadTokens
                })
                .then(() => {
                  vm.uploadThumbnail()
                })
                .catch(error => console.log(error.response.data))
            })
            .catch(error => console.log(error.response.data))
        },
        error(err) {
          console.log(err.message)
        }
      })
    },
    async uploadThumbnail() {
      const vm = this
      new Compressor(this.photoFile, {
        height: 128,
        success(result) {
          const formData = new FormData()
          formData.append('file', result, result.name)
          return vm.$axios
            .$post(
              process.env.STORAGE_URL +
                process.env.BUCKET_NAME +
                '/o?name=profilePhotos/' +
                vm.user.userId +
                '/thumbnail',
              formData
            )
            .then(result => {
              vm.$store
                .dispatch('users/updateUserData', {
                  thumbnailDownloadToken: result.downloadTokens
                })
                .then(() => {
                  vm.photoFile = null
                  vm.isLoading = false
                })
                .catch(error => console.log(error.response.data))
            })
            .catch(error => console.log(error.response.data))
        }
      })
    }
  }
}
</script>

<style scoped>
img {
  object-fit: cover;
}
</style>
