<template>
  <div class='box has-background-dark'>
    <div class='content is-small has-text-light'>
      <h1 class='has-text-light'>{{postData.title}}</h1>
      <p>{{postData.summary}}</p>
      <small class='is-pulled-right'>{{new Date(postData.createTime).toLocaleDateString('lt')}}</small>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    postData: Object
  }
}
</script>

