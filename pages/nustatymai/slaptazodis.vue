<template>
  <div>
    <h1 class="title">Keisti slaptažodį</h1>
    <hr />
    <div class="columns">
      <div class="column is-5">
        <div class="field">
          <label class="label">Dabartinis slaptažodis</label>
          <div class="control">
            <input class="input" type="password" v-model="password" :disabled="isLoading" />
          </div>
        </div>
        <div class="field">
          <label class="label">Naujas slaptažodis</label>
          <div class="control">
            <input class="input" type="password" v-model="newPassword" :disabled="isLoading" />
          </div>
        </div>
        <div class="field">
          <label class="label">Pakartoti naują slaptažodį</label>
          <div class="control">
            <input class="input" type="password" :disabled="isLoading" />
          </div>
        </div>
        <br />
        <button class="button is-primary" @click="changePassword" :class="{ 'is-loading': isLoading }">
          Išsaugoti
        </button>
        <p class="help" :class="helpText">{{ this.message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
          this.message = 'Slaptažodžis atnaujintas.'
        })
        .catch(error => {
          this.isLoading = false
          this.error = true
          if (error.message == 'INVALID_PASSWORD')
            this.message = 'Operacija neįvygdyta. Nurodytas neteisingas dabartinis slaptažodis.'
          else this.message = 'Operacija neįvygdyta. Bandykite dar kartą.'
        })
    }
  }
}
</script>
