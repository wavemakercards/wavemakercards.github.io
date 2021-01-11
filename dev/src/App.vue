<template>
  <div>
    <v-app v-if="!$root.dbloaded">
      loading
    </v-app>
    <v-app v-if="$root.dbloaded">
      <MainNavigation v-if="$root.interface.MainNavigationToggle" />
    
        <router-view  ></router-view>

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
