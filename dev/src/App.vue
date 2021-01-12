<template>
  <div>
    <v-app v-if="!$root.dbloaded">

      <v-container>
  <v-row no-gutters class="mt-4" justify="center">
   <v-col
        cols="12"  sm="6" 
      >
  <v-card
    class="ma-2"
        outlined>
<v-card-title>Loading</v-card-title>
<v-card-text>Wavemaker is doing some behind the scenes stuff with a local database. <br /><br />
  You should not be seeing this unless there is a problem. <br />
  <br />You may need to do a clean reset then reload the app.</v-card-text>
<v-card-actions>
  <v-spacer></v-spacer>
  <v-btn @click="WavemakerReset()" class="error" >Clean Reset</v-btn>
</v-card-actions>
</v-card>

<pre>{{$root.shadowDB}}</pre>

   </v-col>
   </v-row>
      </v-container>
    </v-app>
    <v-app v-if="$root.dbloaded">
      <MainNavigation v-if="$root.interface.MainNavigationToggle" />
  
        <router-view></router-view>

    </v-app>
  </div>
</template>
<script>
import MainNavigation from "@/MainNavigation.vue";
//import TopMenu from "@/TopMenu.vue";
export default {
  components: {
    MainNavigation,
  },
  methods: {
    WavemakerReset(){
      console.log("Doing a database and cache clear")
      this.$root.db.delete()
      window.location.reload(true)
    },
    trigger(e) {
      if (e.shiftKey && e.key === "Enter") {
        console.log("ShadowDB : ", this.$root.shadowDB);
      }
    },
  },
  mounted() {
    window.addEventListener("keydown", this.trigger);
  },
  destroyed() {
    window.removeEventListener("keydown", this.trigger);
  },
};
</script>
<style>
@import "theme.css";


</style>
