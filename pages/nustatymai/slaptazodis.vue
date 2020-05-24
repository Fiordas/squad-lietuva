<template>
  <div>
    <h1 class="title">{{ $t('SETTINGS.CHANGE_PASSWORD') }}</h1>
    <hr />
    <div class="columns">
      <div class="column is-5">
        <div class="field">
          <label class="label">{{ $t('SETTINGS.CURRENT_PASSWORD') }}</label>
          <div class="control">
            <input class="input" type="password" v-model="password" :disabled="isLoading" />
          </div>
        </div>
        <div class="field">
          <label class="label">{{ $t('SETTINGS.NEW_PASSWORD') }}</label>
          <div class="control">
            <input class="input" type="password" v-model="newPassword" :disabled="isLoading" />
          </div>
        </div>
        <div class="field">
          <label class="label">{{ $t('SETTINGS.REPEAT_PASSWORD') }}</label>
          <div class="control">
            <input class="input" type="password" :disabled="isLoading" />
          </div>
        </div>
        <br />
        <button class="button is-primary" @click="changePassword" :class="{ 'is-loading': isLoading }">
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
      lt: '/nustatymai/slaptazodis',
      en: '/settings/password'
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
      password: '',
      newPassword: '',
      isLoading: false,
      error: false,
      message: ''
    }
  },
  methods: {
    changePassword() {
      this.isLoading = true
      this.$store
        .dispatch('auth/changeUserInfo', {
          type: 'password-change',
          email: this.user.email,
          password: this.password,
          newPassword: this.newPassword
        })
        .then(() => {
          this.isLoading = false
          this.error = false
          this.password = ''
          this.newPassword = ''
          this.message = this.$t('SETTINGS.PASSWORD_UPDATED')
        })
        .catch(error => {
          this.isLoading = false
          this.error = true
          if (error.message == 'INVALID_PASSWORD') this.message = this.$t('ERROR.INVALID_PASSWORD')
          else this.message = this.$t('ERROR.TRY_AGAIN')
        })
    }
  }
}
</script>
