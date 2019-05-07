<template>
  <div>
    <h1 class='title'>{{user.username}}</h1>
    <hr>
    <div class='columns'>
      <div class='column'>
        <p class='title is-5'>El. pašto adresas</p>
        <p class='subtitle is-7 is-spaced'>{{user.email}}</p>
        <p class='title is-5'>Rolė</p>
        <p class='subtitle is-7 is-spaced has-text-danger'>Administratorius</p>
        <p class='title is-5'>Registracijos data</p>
        <p class='subtitle is-7 is-spaced'>2018-05-22</p>
        <p class='title is-5'>Paskutinis prisijungimas</p>
        <p class='subtitle is-7'>2018-05-22</p>
      </div>
      <div class='column is-3'>
        <figure class='image is-square'>
          <img src='https://bulma.io/images/placeholders/480x480.png'>
        </figure>
      </div>
    </div>
    <hr>
    <h1 class='subtitle is-4'>Papildoma informacija</h1>
    <div class='columns'>
      <div class='column is-5'>
        <div class='field'>
          <label class='label'>Vardas</label>
          <div class='control'>
            <input class='input' type='text' :disabled='!isEditActive'>
          </div>
        </div>
        <div class='field'>
          <label class='label'>Amžius</label>
          <div class='control'>
            <input class='input' type='text' :disabled='!isEditActive'>
          </div>
        </div>
        <div class='field'>
          <label class='label'>Miestas</label>
          <div class='control'>
            <input class='input' type='text' :disabled='!isEditActive'>
          </div>
        </div>
        <div class='field'>
          <label class='label'>Pomėgiai</label>
          <div class='control'>
            <textarea class='textarea' :disabled='!isEditActive'></textarea>
          </div>
        </div>
        <br>
        <button v-show='!isEditActive' @click='isEditActive = !isEditActive' class='button is-primary'>Keisti</button>
        <button v-show='isEditActive' @click='isEditActive = !isEditActive' class='button is-primary is-pulled-right'>Išsaugoti</button>
        <button v-show='isEditActive' @click='isEditActive = !isEditActive' class='button is-primary is-outlined'>Atšaukti</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters['users/user']
    }
  },
  data() {
    return {
      isEditActive: false
    }
  }
}
</script>
