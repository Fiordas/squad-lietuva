<template>
  <div>
    <h1 class="title">{{ $t('SETTINGS.CHANGE_EMAIL') }}</h1>
    <hr />
    <div class="columns">
      <div class="column is-5">
        <div class="field">
          <label class="label">{{ $t('SETTINGS.CURRENT_EMAIL') }}</label>
          <div class="control">
            <input class="input" type="text" :value="user.email" disabled />
          </div>
        </div>
        <div class="field">
          <label class="label">{{ $t('SETTINGS.NEW_EMAIL') }}</label>
          <div class="control">
            <input class="input" type="text" v-model="newEmail" :disabled="isLoading" />
          </div>
        </div>
        <div class="field">
          <label class="label">{{ $t('AUTH.PASSWORD') }}</label>
          <div class="control">
            <input class="input" type="password" v-model="password" :disabled="isLoading" />
          </div>
        </div>
        <br />
        <button class="button is-primary" @click="changeEmail" :class="{ 'is-loading': isLoading }">
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
      lt: '/nustatymai/pastas',
      en: '/settings/email'
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
      newEmail: '',
      isLoading: false,
      error: false,
      message: ''
    }
  },
  methods: {
    changeEmail() {
      this.isLoading = true
      this.$store
        .dispatch('auth/changeUserInfo', {
          type: 'email-change',
          email: this.user.email,
          password: this.password,
          newEmail: this.newEmail
        })
        .then(() => {
          this.isLoading = false
          this.error = false
          this.password = ''
          this.newPassword = ''
          this.message = this.$t('SETTINGS.EMAIL_UPDATED')
        })
        .catch(error => {
          this.isLoading = false
          this.error = true
          if (error.message == 'INVALID_PASSWORD') this.message = this.$t('ERROR.INVALID_PASSWORD')
          else if (error.message == 'EMAIL_EXISTS') this.message = this.$t('ERROR.EMAIL_EXISTS')
          else this.message = this.$t('ERROR.TRY_AGAIN')
        })
    }
  }
}
</script>
