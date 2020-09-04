<template>
<div>
 
      <TopBar/>
    <SideMenu hilight="project" />
 
  <v-main  v-if="loaded">
  
    <v-container >
      <div v-if="!editProject">
        <v-row align="center">
          <v-col cols="12" >
            <h2>{{$root.system.project.title}}  <v-btn dark icon x-small  @click="editProject=true">
               <v-icon>mdi-pencil</v-icon>
              </v-btn></h2>
          </v-col>
          <v-col cols="12" md="4">
            <v-btn href="/#/writer/">Writer</v-btn>
          </v-col>
        </v-row>
      </div>

      <div v-if="editProject">
        <v-row align="center">
             <v-col cols="12" >
              <v-btn dark icon x-small @click="editProject=false">
                <v-icon>mdi-cancel</v-icon>
              </v-btn>
          </v-col>
          <v-col cols="12" >
            <v-text-field
              label="Project title"
              placeholder="Project title here"
              v-model="$root.system.project.title"
              style="font-size:1.2rem"
              :blur="$root.SaveProjectData()"
            ></v-text-field>

            <v-text-field
              label="Author(s) name title"
              placeholder="A. N. Author"
              v-model="$root.system.project.author"
              style="font-size:1.2rem"
                :blur="$root.SaveProjectData()"
            ></v-text-field>

            <v-btn fixed right  dark fab x-small  elevation="0" @click="editProject=false">
                 <v-icon>mdi-cancel</v-icon>
              </v-btn>
          </v-col>

          <v-col cols="12" md="6" lg="4"></v-col>
        </v-row>
      </div>
    </v-container>
  </v-main>
</div>
</template>

<style scoped>
#content h1 {
  text-align: center;
}
</style>

<script>
import TopBar from './tools/$$Shared/TopBar'
import SideMenu from './tools/$$Shared/SideMenu'
export default {
  components:{
    TopBar,
    SideMenu
  },
  data() {
    return {
      editProject: false,
      loaded: false,
    };
  },
  methods: {
    init() {
      this.loaded = true;
    }
  },
  beforeMount() {
    // get the project info as we are doing this for the  whole system
    // database calls are made rather than storing in live memory
    this.$root.db.ProjectInfo.get({
      id: 1,
    })
      .then((result) => {
        return result;
      })
      .then((data) => {
        if (data) {
          window.wlog("Database :", "Project Found");
          window.wlog("result :", data.state);
          this.$root.system.project = JSON.parse(data.state);
          this.init();
        } else {
          window.wlog("Database :", "No Project Found");
        }
      });
  },
};
</script>