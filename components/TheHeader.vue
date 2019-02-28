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
          <nuxt-link to='/' class='navbar-item'>Turnyrai</nuxt-link>
          <nuxt-link to='/' class='navbar-item'>Forumas</nuxt-link>
        </div>
        <div class='navbar-end'>
          <div class='navbar-item'>
            <a class='button is-light is-outlined is-small'>
              <span>Prisijungti</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
