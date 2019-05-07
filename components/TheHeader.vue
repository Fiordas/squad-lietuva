<template>
  <nav class='navbar is-dark' role='navigation' aria-label='main navigation'>
    <div class='container'>
      <div class='navbar-brand'>
        <nuxt-link to='/' class='navbar-item' active-class>
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
          <nuxt-link to='/' class='navbar-item' exact>Pagrindinis</nuxt-link>
          <nuxt-link to='turnyrai' class='navbar-item'>Turnyrai</nuxt-link>
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
                      <small class='has-text-light'>Naujas vartotojas?</small>
                    </b-field>
                    <b-field>
                      <button class='button is-primary is-inverted is-fullwidth is-rounded' @click='isSignUpModalActive = true'>Registruotis</button>
                    </b-field>
                  </section>
                </div>
              </b-dropdown-item>
            </b-dropdown>
          </div>
          <div class='navbar-item' v-if='isAuth && user.admin'>
            <button class='button is-danger is-outlined is-small'>
              <span>Valdymas</span>
              <b-icon icon='settings' size='is-small'></b-icon>
            </button>
          </div>
          <b-dropdown position='is-bottom-left' aria-role='menu' v-if='isAuth'>
            <a class='navbar-item' slot='trigger' role='button'>
              <figure class='image is-24x24'>
                <img class='is-rounded' src='https://bulma.io/images/placeholders/24x24.png'>
              </figure>
              <span>{{user.username}}</span>
              <b-icon icon='menu-down' size='is-small'>></b-icon>
            </a>
            <b-dropdown-item has-link aria-role='menuitem'>
              <nuxt-link to='/profilis'>
                <b-icon icon='home'></b-icon>Profilis
              </nuxt-link>
            </b-dropdown-item>
            <b-dropdown-item has-link aria-role='menuitem'>
              <nuxt-link to='/nustatymai'>
                <b-icon icon='settings'></b-icon>Nustatymai
              </nuxt-link>
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
      if (
        this.$store.getters['auth/isAuthenticated'] &&
        this.$store.getters['users/user']
      )
        return true
      else return false
    },
    user() {
      return this.$store.getters['users/user']
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
hr {
  margin-top: 15px;
}
.image {
  margin-right: 10px;
}
</style>

