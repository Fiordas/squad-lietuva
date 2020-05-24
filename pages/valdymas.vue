<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-one-fifth">
          <aside class="menu">
            <p class="menu-label">{{ $t('MANAGE.WEBSITE_MANAGEMENT') }}</p>
            <ul class="menu-list">
              <li>
                <nuxt-link :to="localePath('valdymas')" exact>{{ $t('MANAGE.OVERVIEW') }}</nuxt-link>
              </li>
              <li>
                <nuxt-link :to="localePath('valdymas-naujienos')">{{ $t('MANAGE.NEWS') }}</nuxt-link>
              </li>
            </ul>
          </aside>
        </div>
        <div class="column">
          <nuxt-child></nuxt-child>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  nuxtI18n: {
    paths: {
      lt: '/valdymas',
      en: '/manage'
    }
  },
  middleware: 'auth'
}
</script>
