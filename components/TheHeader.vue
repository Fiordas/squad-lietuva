<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link :to="localePath('/')" class="navbar-item" active-class>
          <img src="https://images.joinsquad.com/Logos/squadlogo_white_hires.png" width="62" height="28" />
        </nuxt-link>
        <a class="navbar-burger burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu">
        <div class="navbar-start has-text-weight-semibold">
          <nuxt-link :to="localePath('/')" class="navbar-item" exact>{{ $t('HEADER.HOME') }}</nuxt-link>
          <nuxt-link :to="localePath('turnyrai')" class="navbar-item">{{ $t('HEADER.EVENTS') }}</nuxt-link>
        </div>
        <div class="navbar-end">
          <b-dropdown hoverable>
            <a class="navbar-item" slot="trigger" role="button">
              <span :class="`flag-icon flag-icon-${this.selectedLocale.iso}`"></span>
            </a>
            <b-dropdown-item v-for="locale in this.$i18n.locales" :key="locale.code" has-link>
              <nuxt-link :to="switchLocalePath(locale.code)" exact>
                <span :class="`flag-icon flag-icon-${locale.iso}`"></span>
                <span>{{ locale.name }}</span>
              </nuxt-link>
            </b-dropdown-item>
          </b-dropdown>
          <div class="navbar-item" v-if="!isAuth">
            <button class="button is-light is-outlined is-small" @click="isSignUpModalActive = true">
              <span>{{ $t('AUTH.REGISTER') }}</span>
              <b-icon icon="account-plus" size="is-small"></b-icon>
            </button>
          </div>
          <div class="navbar-item" v-if="!isAuth">
            <b-dropdown ref="dropdown" position="is-bottom-left" aria-role="menu">
              <button class="button is-primary is-outlined is-small" slot="trigger">
                <span>{{ $t('AUTH.LOGIN') }}</span>
                <b-icon icon="menu-down"></b-icon>
              </button>

              <b-dropdown-item aria-role="menu-item" custom paddingless>
                <div class="modal-card" style="width:300px;">
                  <section class="modal-card-body">
                    <SignIn @close-dropdown="closeDropdown" />
                    <hr class="dropdown-divider" />
                    <b-field>
                      <small class="has-text-light">{{ $t('AUTH.NEW_USER') }}</small>
                    </b-field>
                    <b-field>
                      <button
                        class="button is-primary is-inverted is-fullwidth is-rounded"
                        @click="isSignUpModalActive = true"
                      >
                        {{ $t('AUTH.REGISTER') }}
                      </button>
                    </b-field>
                  </section>
                </div>
              </b-dropdown-item>
            </b-dropdown>
          </div>
          <b-dropdown position="is-bottom-left" aria-role="menu" v-if="isAuth">
            <a class="navbar-item" slot="trigger" role="button">
              <figure class="image is-24x24">
                <img
                  v-if="!user.thumbnailDownloadToken"
                  class="is-rounded thumbnail"
                  src="https://firebasestorage.googleapis.com/v0/b/squad-lietuva.appspot.com/o/profilePhotos%2Fplaceholder.png?alt=media&token=0f38b42f-7271-4fba-a73f-60c4ca214612"
                />
                <img
                  v-else
                  class="is-rounded thumbnail"
                  :src="
                    `https://firebasestorage.googleapis.com/v0/b/squad-lietuva.appspot.com/o/profilePhotos%2F${user.userId}%2Fthumbnail?alt=media&token=${user.thumbnailDownloadToken}`
                  "
                />
              </figure>
              <span>{{ user.username }}</span>
              <b-icon icon="menu-down"></b-icon>
            </a>
            <b-dropdown-item has-link aria-role="menuitem">
              <nuxt-link :to="localePath('profilis')">
                <b-icon icon="home"></b-icon>
                <span>{{ $t('AUTH.USER_PROFILE') }}</span>
              </nuxt-link>
            </b-dropdown-item>
            <b-dropdown-item has-link aria-role="menuitem">
              <nuxt-link :to="localePath('nustatymai')">
                <b-icon icon="settings"></b-icon>
                <span>{{ $t('SETTINGS.TITLE') }}</span>
              </nuxt-link>
            </b-dropdown-item>
            <b-dropdown-item has-link aria-role="menuitem" v-if="isAuth && user.admin">
              <nuxt-link :to="localePath('valdymas')">
                <b-icon icon="shield"></b-icon>
                <span>{{ $t('MANAGE.TITLE') }}</span>
              </nuxt-link>
            </b-dropdown-item>
            <b-dropdown-item @click="onLogout" aria-role="menuitem">
              <b-icon icon="logout"></b-icon>
              <span>{{ $t('AUTH.LOGOUT') }}</span>
            </b-dropdown-item>
          </b-dropdown>
          <b-modal :active.sync="isSignUpModalActive" has-modal-card>
            <SignUp />
          </b-modal>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import SignUp from '@/components/auth/SignUp'
import SignIn from '@/components/auth/SignIn'
import 'flag-icon-css/css/flag-icon.css'

export default {
  computed: {
    isAuth() {
      if (this.$store.getters['auth/isAuthenticated'] && this.$store.getters['users/user']) return true
      else return false
    },
    user() {
      return this.$store.getters['users/user']
    },
    selectedLocale() {
      return this.$i18n.locales.find(locale => locale.code === this.$i18n.locale)
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
      this.$router.push(this.localePath('/'))
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
.thumbnail {
  object-fit: cover;
  width: 24px;
  height: 24px;
}
</style>
