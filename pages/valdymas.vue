<template>
  <section class='section'>
    <div class='container'>
      <div class='columns'>
        <div class='column is-one-fifth'>
          <aside class='menu'>
            <p class='menu-label'>Puslapio valdymas</p>
            <ul class='menu-list'>
              <li>
                <nuxt-link to='/valdymas' exact>Apžvalga</nuxt-link>
              </li>
              <li>
                <nuxt-link to='/valdymas/naujienos'>Naujienos</nuxt-link>
              </li>
            </ul>
          </aside>
        </div>
        <div class='column'>
          <nuxt-child></nuxt-child>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'auth'
}
</script>
