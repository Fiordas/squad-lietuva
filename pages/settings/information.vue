<template>
  <div>
    <h1 class="title">{{ $t('SETTINGS.ADDITIONAL_INFO') }}</h1>
    <hr />
    <div class="columns">
      <div class="column is-5">
        <div class="field">
          <label class="label">{{ $t('SETTINGS.NAME') }}</label>
          <div class="control">
            <input class="input" type="text" v-model="name" :disabled="isLoading" />
          </div>
        </div>
        <div class="field">
          <label class="label">{{ $t('SETTINGS.AGE') }}</label>
          <div class="control">
            <input class="input" type="number" min="10" max="100" v-model="age" :disabled="isLoading" />
          </div>
        </div>
        <div class="field">
          <label class="label">{{ $t('SETTINGS.CITY') }}</label>
          <div class="control">
            <input class="input" type="text" v-model="city" :disabled="isLoading" />
          </div>
        </div>
        <div class="field">
          <label class="label">{{ $t('SETTINGS.INTERESTS') }}</label>
          <div class="control">
            <textarea class="textarea" v-model="interests" :disabled="isLoading"></textarea>
          </div>
        </div>
        <br />
        <button class="button is-primary" @click="updateInfo" :class="{ 'is-loading': isLoading }">
          {{ $t('GENERAL.SAVE') }}
        </button>
        <p class="help" :class="helpText">{{ this.message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  nuxtI18n: {
    paths: {
      lt: '/nustatymai/informacija',
      en: '/settings/information'
    }
  },
  computed: {
    user() {
      return this.$store.getters['users/user']
    },
    helpText() {
      return {
        'has-text-light': this.message && !this.error,
        'is-danger': this.message && this.error
      }
    }
  },
  data() {
    return {
      name: '',
      age: '',
      city: '',
      interests: '',
      isLoading: false,
      error: '',
      message: ''
    }
  },
  created() {
    this.name = this.user.name
    this.age = this.user.age
    this.city = this.user.city
    this.interests = this.user.interests
  },
  methods: {
    updateInfo() {
      this.isLoading = true
      this.$store
        .dispatch('users/updateUserData', {
          name: this.name,
          age: this.age,
          city: this.city,
          interests: this.interests
        })
        .then(() => {
          this.isLoading = false
          this.error = false
          this.message = this.$t('SETTINGS.INFORMATION_UPDATED')
        })
        .catch(() => {
          this.isLoading = false
          this.error = true
          this.message = this.$t('ERROR.TRY_AGAIN')
        })
    }
  }
}
</script>
