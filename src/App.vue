<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/common/Header'

export default {
  name: 'App',
  components: {Header}
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  html, body{
    margin: 0;
    padding: 0;
  }
  *{
    box-sizing: border-box;
  }
</style>
