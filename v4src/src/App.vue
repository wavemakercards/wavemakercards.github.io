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
}
html {
  overflow-y: none;
  overflow-x: auto;
}
body {
  overflow-y: auto;
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