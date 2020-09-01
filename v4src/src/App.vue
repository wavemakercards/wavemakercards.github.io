<template>
  <v-app id="app">
   <router-view/>
    <v-footer app>

    <v-row no-gutters>
      <v-col
        cols="4"
      >
  <a href="/#/"> <img src="@/assets/wavemaker.svg" width="20" /></a>
      </v-col>
            <v-col
        cols="4"
          style="text-align:center"
      >
  wavemaker
      </v-col>

            <v-col
        cols="4"
        style="text-align:right"
      >
 <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-col>
      
    </v-row>

     
 
     
    </v-footer>
  </v-app>
</template>

