<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-one-fifth">
          <aside class="menu">
            <p class="menu-label">{{ $t('SETTINGS.TITLE') }}</p>
            <ul class="menu-list">
              <li>
                <nuxt-link :to="localePath('settings')" exact>{{ $t('SETTINGS.OVERVIEW') }}</nuxt-link>
              </li>
              <li>
                <nuxt-link :to="localePath('settings-information')">{{ $t('SETTINGS.ADDITIONAL_INFO') }}</nuxt-link>
              </li>
              <li>
                <nuxt-link :to="localePath('settings-email')">{{ $t('AUTH.EMAIL') }}</nuxt-link>
              </li>
              <li>
                <nuxt-link :to="localePath('settings-password')">{{ $t('AUTH.PASSWORD') }}</nuxt-link>
              </li>
            </ul>
          </aside>
        </div>
        <div class="column">
          <div class="box has-background-dark">
            <nuxt-child></nuxt-child>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  nuxtI18n: {
    paths: {
      lt: '/nustatymai',
      en: '/settings'
    }
  },
  middleware: 'auth'
}
</script>
