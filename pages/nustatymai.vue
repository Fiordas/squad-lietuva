<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-one-fifth">
          <aside class="menu">
            <p class="menu-label">Nustatymai</p>
            <ul class="menu-list">
              <li>
                <nuxt-link to="/nustatymai" exact>Apžvalga</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/nustatymai/informacija" exact>Papildoma informacija</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/nustatymai/pastas">El. pašto adresas</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/nustatymai/slaptazodis">Slaptažodžis</nuxt-link>
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
  middleware: 'auth'
}
</script>
