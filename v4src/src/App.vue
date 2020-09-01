<style >
@import url("https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&display=swap");
html {
  overflow-y: scroll !important;
  overflow-x: none;
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

/*
Manuscript css class this will be user editable eventually
*/

 .manuscriptCSS img {
    max-width: 100%;
    margin: 0 auto;
    display: block;
  }

  .manuscriptCSS code {
    display: block;
    padding: 20px;
    width: 100%;
  }
</style>

<template>
<!--
add this to v-app to get the background to change
:style="{background: $vuetify.theme.themes[theme].background}"
 -->
  <v-app >
   <Loading v-if="ShowSection ==='Loading' || !this.$store.state.AppLoaded"/>
   <ProjectManagement v-if="ShowSection ==='Create'"/>
   <WaveMaker v-if="ShowSection ==='Project'"/>


  <div class="text-center">
     <v-snackbar
      v-model="alertMsg"
      :timeout="5000"
    >
      {{ this.$root.alertMsgText }}
      <v-btn
        color="blue"
        text
        @click="alertMsg=false"
        >
        x
      </v-btn>
    </v-snackbar>
  </div>

  </v-app>

</template>

<script>
import Loading from "./components/Loading";
import WaveMaker from "./components/WaveMaker";
import ProjectManagement from "./components/ProjectManagement";

export default {
  components: {
    Loading,
    WaveMaker,
    ProjectManagement
  },
  computed :{
      theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    },
    alertMsg:{
    get:function(){return this.$root.alertMsg},
    set:function(){ this.$root.alertMsg = false}
    },
    ShowSection(){
      let action = "Loading"
      if(this.$root.ProjectState.ProjectInfo){
        if(this.$root.ProjectState.ProjectInfo.id){
          action = "Project"
        }else{
          action = "Create"
        }
      }
      return action
    }
  },
  methods:{
  },
  mounted(){
    this.$vuetify.theme.dark = this.$store.state.Interface.darkmode;
  }
};

</script>
