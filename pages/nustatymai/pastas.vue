<template>
  <div>
    <h1 class="title">Keisti el. pašto adresą</h1>
    <hr />
    <div class="columns">
      <div class="column is-5">
        <div class="field">
          <label class="label">Dabartinis el. pašto adresas</label>
          <div class="control">
            <input class="input" type="text" :value="user.email" disabled />
          </div>
        </div>
        <div class="field">
          <label class="label">Naujas el. pašto adresas</label>
          <div class="control">
            <input class="input" type="text" v-model="newEmail" :disabled="isLoading" />
          </div>
        </div>
        <div class="field">
          <label class="label">Slaptažodis</label>
          <div class="control">
            <input class="input" type="password" v-model="password" :disabled="isLoading" />
          </div>
        </div>
        <br />
        <button class="button is-primary" @click="changeEmail" :class="{'is-loading': isLoading}">Išsaugoti</button>
        <p class="help" :class="helpText">{{this.message}}</p>
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
          this.message = 'El. pašto adresas atnaujintas.'
        })
        .catch(error => {
          this.isLoading = false
          this.error = true
          if (error.message == 'INVALID_PASSWORD')
            this.message =
              'Operacija neįvygdyta. Nurodytas neteisingas dabartinis slaptažodis.'
          else if (error.message == 'EMAIL_EXISTS')
            this.message =
              'Operacija neįvygdyta. Toks el. pašto adresas jau egzistuoja.'
          else this.message = 'Operacija neįvygdyta. Bandykite dar kartą.'
        })
    }
  }
}
</script>
