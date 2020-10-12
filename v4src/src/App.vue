<template>
  <v-app id="app">
   <router-view/>

   <!--
     /*
     Footer option if needed for wahtever reason
      */
    <v-footer app>
   <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    -->
  </v-app>
</template>

<script>
export default {
  beforeMount(){
    if(!this.$root.system.project){
      this.$router.push("/").catch(()=>{});
    }
  }
}
</script>
<style>
#app{
  overflow: auto;
  overflow-x: hidden ;
  /*
  background: url("https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80");
  background-size: cover;
  */

}
html {
  overflow-y: hidden !important;
  overflow-x: hidden;
}
body {
  overflow-y: hidden;
  overflow-x: auto;
}

::-webkit-scrollbar-track {
  min-width: 1px;
}

::-webkit-scrollbar {
  width: 10px;
  background-color: #868686;
}

::-webkit-scrollbar-thumb {
  background-color: #646464;
}
</style>