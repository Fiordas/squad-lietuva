<template>
  <form @submit.prevent='onSubmit'>
    <b-field label='El. paštas' custom-class='is-small'>
      <b-input type='email' v-model='email' size='is-small' required autofocus></b-input>
    </b-field>
    <b-field label='Slaptažodis' custom-class='is-small'>
      <b-input type='password' v-model='password' size='is-small' password-reveal required></b-input>
    </b-field>
    <b-field>
      <b-checkbox size='is-small'>Prisiminti mane</b-checkbox>
    </b-field>
    <b-field>
      <button class='button is-primary is-fullwidth is-rounded'>Prisijungti</button>
    </b-field>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch('auth/authenticateUser', {
          isSignUp: false,
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
