<template>
  <div class='parallax'>
    <parallax :speedFactor='0.3'>
      <img src='https://image.redbull.com/rbcom/010/2016-01-26/1331773091674_4/0100/0/1/forthcoming-pc-military-sim-game-squad-which-will-feature-up-to-100-live-players-at-a-time.jpg'>
    </parallax>
  </div>
</template>

<script>
import Parallax from 'vue-parallaxy'

export default {
  components: {
    Parallax
  }
}
</script>

<style scoped>
.parallax {
  height: 40vh;
}

img {
  transform: translateY(-25%);
}
</style>

