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

<style>
#app{
  overflow: auto;
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