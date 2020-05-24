<template>
  <form @submit.prevent="onSubmit">
    <div class="modal-card">
      <section class="modal-card-body">
        <div class="columns">
          <div class="column">
            <h1 class="subtitle has-text-centered">{{ $t('AUTH.CREATE_NEW_USER') }}</h1>
            <b-field :label="$t('AUTH.USERNAME')" custom-class="is-small">
              <b-input type="text" v-model="username" size="is-small" required autofocus></b-input>
            </b-field>
            <b-field :label="$t('AUTH.EMAIL')" custom-class="is-small">
              <b-input type="email" v-model="email" size="is-small" required></b-input>
            </b-field>
            <b-field :label="$t('AUTH.PASSWORD')" custom-class="is-small">
              <b-input type="password" v-model="password" size="is-small" password-reveal required></b-input>
            </b-field>
            <b-field :label="$t('AUTH.REPEAT_PASSWORD')" custom-class="is-small">
              <b-input type="password" size="is-small" password-reveal required></b-input>
            </b-field>
            <br />
            <button class="button is-primary is-fullwidth is-rounded">{{ $t('AUTH.REGISTER') }}</button>
          </div>
          <div class="is-divider-vertical" :data-content="$t('GENERAL.OR').toUpperCase()"></div>
          <div class="column has-vertically-aligned-content has-text-centered">
            <h1 class="subtitle">{{ $t('AUTH.LOGIN_THROUGH_STEAM') }}</h1>
            <a href="https://steamcommunity.com/dev">
              <img src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_02.png" />
            </a>
          </div>
        </div>
      </section>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch('auth/authenticateUser', {
          type: 'sign-up',
          rememberUser: false,
          username: this.username,
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$parent.close()
        })
    }
  }
}
</script>

<style scoped>
.column.has-vertically-aligned-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.is-divider-vertical::after {
  background: #4a4a4a;
  color: #dbdbdb;
}
</style>
