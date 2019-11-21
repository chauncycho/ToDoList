<template>
  <div id="my-header">
    <div id="my-logo">TodoList</div>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    data(){
      return {

      }
    }
  }
</script>

<style scoped>
  #my-header{
    width: 100%;
    height: 80px;
    text-align: left;
    padding-left: 100px;
    background-color: #d6fefe;
  }

  #my-logo{
    line-height: 80px;
    font-size: 24px;
    font-weight: 800;
  }
</style>
