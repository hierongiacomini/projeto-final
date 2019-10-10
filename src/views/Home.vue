<template lang="pug">
    div(class="home")
        router-link(to="/entrar") Login
</template>

<script>

export default {
  name: 'Home',
  created(){
      this.$router.push('/entrar')
  }
}
</script>
