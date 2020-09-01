<template>
    <div>
        <h1>Settings Tool Selected </h1>
       
        <v-switch
      v-model="toggle"
      label="Dark Mode"
      @change="darktoggle()"
    ></v-switch>
      
    </div>
</template>

<script>
export default {
    data(){
        return{
            toggle : null
        }
    },
    methods : {
        darktoggle(){
            let val = !this.$store.state.Interface.darkmode
            let payload ={}
            payload.path = ["Interface","darkmode"]
            payload.value = val
           this.$store.dispatch("StateChanger", payload);
           // apply a change
          // this.toggle = val
           this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      }
    },
    beforeMount(){
        this.toggle = this.$store.state.Interface.darkmode
    }
}
</script>