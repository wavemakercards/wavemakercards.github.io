
<template>
       <v-navigation-drawer permanent mini-variant app clipped  style="z-index:5">
      <v-list dense>
    <v-list-item v-for="(item,index) in menuitems" :key="index"  @click="$router.push('/'+item.text).catch(()=>{});" v-bind:class="{ purple: hilight ===item.text }">
            <v-icon>{{item.icon}}</v-icon>
        </v-list-item>

        
      </v-list>
    </v-navigation-drawer>
</template>
<script>
export default {
      props: {
     hilight: String
  },
  data(){
      return{
          menuitems : [
              { text :'project', icon : "home"},
              { text :'writer', icon : "import_contacts"},
              { text :'timeline', icon : "access_time"},
              { text :'snowflake', icon : "ac_unit"},
              { text :'database', icon : "layers"},
              { text :'planningboard', icon : "view_comfy"},
              { text :'export', icon : "launch"},
              { text :'settings', icon : "settings"},
              { text :'cloud', icon : "backup"},
          ]
      }
  },
mounted(){
    window.wlog("action", "mounted Sidemenu");
}    
}
</script>
<style scoped>

</style>