<template>
  <div class='box has-background-dark'>
    <div class='columns'>
      <div class='column'>
        <h1 class='title'>Naujienų valdymas</h1>
        <div class='tabs is-small is-toggle is-fullwidth'>
          <ul>
            <nuxt-link to='/valdymas/naujienos' tag='li' exact>
              <a>
                <span>Visos</span>
              </a>
            </nuxt-link>
            <nuxt-link to='/valdymas/naujienos/prideti' tag='li' exact>
              <a>
                <span>Pridėti naują</span>
              </a>
            </nuxt-link>
          </ul>
        </div>
      </div>
    </div>
    <nuxt-child></nuxt-child>
  </div>
</template>
