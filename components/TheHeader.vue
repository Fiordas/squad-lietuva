<template>
  <nav class='navbar is-dark' role='navigation' aria-label='main navigation'>
    <div class='container'>
      <div class='navbar-brand'>
        <nuxt-link to='/' class='navbar-item'>
          <img src='https://images.joinsquad.com/Logos/squadlogo_white_hires.png' width='62' height='28'>
        </nuxt-link>
        <a class='navbar-burger burger' aria-label='menu' aria-expanded='false'>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </a>
      </div>

      <div class='navbar-menu'>
        <div class='navbar-start has-text-weight-semibold'>
          <nuxt-link to='/' class='navbar-item'>Pagrindinis</nuxt-link>
          <nuxt-link to='turnyrai' class='navbar-item'>Turnyrai</nuxt-link>
          <nuxt-link to='/' class='navbar-item'>Forumas</nuxt-link>
        </div>
        <div class='navbar-end'>
          <div class='navbar-item' v-if='!isAuth'>
            <button class='button is-light is-outlined is-small' @click='isSignUpModalActive = true'>
              <span>Registruotis</span>
              <b-icon icon='account-plus' size='is-small'></b-icon>
            </button>
          </div>
          <div class='navbar-item' v-if='!isAuth'>
            <b-dropdown ref='dropdown' position='is-bottom-left' aria-role='menu'>
              <button class='button is-primary is-outlined is-small' slot='trigger'>
                <span>Prisijungti</span>
                <b-icon icon='menu-down'></b-icon>
              </button>

              <b-dropdown-item aria-role='menu-item' custom paddingless>
                <div class='modal-card' style='width:300px;'>
                  <section class='modal-card-body'>
                    <SignIn @close-dropdown='closeDropdown'/>
                    <hr class='dropdown-divider'>
                    <b-field>
                      <small>Naujas vartotojas?</small>
                    </b-field>
                    <b-field>
                      <button class='button is-primary is-inverted is-outlined is-fullwidth is-rounded' @click='isSignUpModalActive = true'>Registruotis</button>
                    </b-field>
                  </section>
                </div>
              </b-dropdown-item>
            </b-dropdown>
          </div>
          <b-dropdown position='is-bottom-left' aria-role='menu' v-if='isAuth'>
            <a class='navbar-item' slot='trigger' role='button'>
              <figure class='image is-24x24'>
                <img class='is-rounded' src='https://bulma.io/images/placeholders/24x24.png'>
              </figure>
              <span>Fiordas</span>
              <b-icon icon='menu-down' size='is-small'>></b-icon>
            </a>

            <b-dropdown-item aria-role='menuitem'>
              <b-icon icon='home'></b-icon>Profilis
            </b-dropdown-item>
            <b-dropdown-item @click='onLogout' aria-role='menuitem'>
              <b-icon icon='logout'></b-icon>Atsijungti
            </b-dropdown-item>
          </b-dropdown>
          <b-modal :active.sync='isSignUpModalActive' has-modal-card>
            <SignUp/>
          </b-modal>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import SignUp from '@/components/auth/SignUp'
import SignIn from '@/components/auth/SignIn'

export default {
  computed: {
    isAuth() {
      return this.$store.getters['auth/isAuthenticated']
    }
  },
  components: {
    SignUp,
    SignIn
  },
  data() {
    return {
      isSignUpModalActive: false
    }
  },
  methods: {
    closeDropdown() {
      this.$refs.dropdown.toggle()
    },
    onLogout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.image {
  margin-right: 10px;
}
</style>

