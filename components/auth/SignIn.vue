<template>
  <form @submit.prevent="onSubmit">
    <b-field :label="$t('AUTH.EMAIL')" custom-class="is-small">
      <b-input type="email" v-model="email" size="is-small" required autofocus></b-input>
    </b-field>
    <b-field :label="$t('AUTH.PASSWORD')" custom-class="is-small">
      <b-input type="password" v-model="password" size="is-small" password-reveal required></b-input>
    </b-field>
    <b-field>
      <b-checkbox
        v-model="rememberUser"
        size="is-small"
        class="has-text-light"
      >{{$t('AUTH.REMEMBER_ME')}}</b-checkbox>
    </b-field>
    <b-field>
      <button class="button is-primary is-fullwidth is-rounded">{{$t('AUTH.LOGIN')}}</button>
    </b-field>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      rememberUser: false
    }
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch('auth/authenticateUser', {
          type: 'sign-in',
          rememberUser: this.rememberUser,
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$emit('close-dropdown')
        })
    }
  }
}
</script>
