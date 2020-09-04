<template>
     <v-app-bar app dense clipped-left flat>
    <v-spacer></v-spacer>
              <img src="@/assets/wavemaker.svg" width="25"  />    
      <v-btn icon @click="$router.push('/').catch(()=>{});">
        <v-icon>mdi-close</v-icon>
      </v-btn>
        <img src="@/assets/wavemaker.svg" width="25"  />    
    </v-app-bar>      
</template>