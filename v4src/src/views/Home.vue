<template>
  <v-main>
    <v-container class="fill-height animate__animated animate__slideInUp" v-if="viewsection===1">
      <v-row align="center" justify="center">
        <div id="content">
          <img src="@/assets/wavemaker.svg" width="30" style="display:block; margin:0 auto" />
          <h1>wavemaker cards</h1>
          <p>loading</p>
        </div>
      </v-row>
    </v-container>
    <!--  Project db already created in use so allow continue, warn of snc issues obviously-->
    <v-container class="fill-height animate__animated animate__fadeIn" v-if="viewsection===2">
      <v-row align="center" justify="center">
        <div id="content">
          <img src="@/assets/wavemaker.svg" width="30" style="display:block; margin:0 auto" />
          <h1>Project Found</h1>
          <p>We have found a project database in use, do you want to use this project?</p>

          <h2>{{ProjectInfo.title}}</h2>
          <p>Last Updated : {{LastUpdated}}</p>
    
          <p class="text-center">
            <v-btn color @click="$router.push('project')">Yes</v-btn>
&nbsp;
            <v-btn color @click="ClearDB()">No</v-btn>
          </p>
        </div>
      </v-row>
    </v-container>

    <!--  Project db not present so allow loading / creating -->
    <v-container class="fill-height animate__animated animate__fadeIn" v-if="viewsection===3">
      <v-row align="center" justify="center">
        <div id="content" style="width:320px;">
          <img src="@/assets/wavemaker.svg" width="30" style="display:block; margin:0 auto" />
          <h1>Wavemaker Cards</h1>

          <v-row>
            <v-col sm="12">
              <v-btn block color large @click="newproject=true">
                <v-icon>mdi-plus</v-icon>New Project
              </v-btn>
            </v-col>
            <v-col sm="6">
              <v-btn block color large>
                <v-icon>mdi-folder-move</v-icon>
              </v-btn>
            </v-col>
            <v-col sm="6">
              <v-btn block color large>
                <v-icon>mdi-google-drive</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-row>

      <v-row justify="center">
        <v-dialog v-model="newproject" width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Create a new project</span>
            </v-card-title>
            <v-card-text>
              <v-col cols="12">
                <v-text-field
                  label="Project Name"
                  placeholder="My New Project"
                  v-model="newProjTitle"
                ></v-text-field>
                <div v-if="newProjTitleError">*You must enter a name for this project</div>
              </v-col>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error darken-1" text @click="newproject = false">
                <v-icon>mdi-cancel</v-icon>
              </v-btn>
              <v-btn color="green darken-1" text @click="CreateProject()">
                <v-icon>mdi-check</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
  </v-main>
</template>

<style scoped>
#content h1 {
  text-align: center;
  /* font-family: "Raleway", sans-serif;
  font-weight: 200;
  */
}
</style>

<script>
export default {
  data() {
    return {
      ProjectInfo: {},
      LastUpdated : null,
      viewsection: 1,
      newproject: false,
      newProjTitle: null,
      newProjTitleError: false,
    };
  },
  methods: {
    ClearDB() {
      this.ProjectInfo= {};
      this.LastUpdated = null
      this.$root.db.delete().then(() => this.$root.db.open());
      window.wlog("Action :", "Cleared Database and remount Home.vue");
      this.viewsection = 3;
    },
    CreateProject() {
      if (!this.newProjTitle) {
        this.newProjTitleError = true;
      } else {
        this.newProjTitleError = false;
        this.ProjectInfo.title = this.newProjTitle;
        this.SaveProjectData();
      }
    },
    SaveProjectData() {
      let MYstate = {
        id: 1,
        state: JSON.stringify(this.ProjectInfo),
        lastupdated: Date.now(),
      };
      this.$root.db.ProjectInfo.put(MYstate).then((updated) => {
        if (updated) {
          window.wlog("database", "Project Save done");
          this.$router.push("project");
        } else {
          window.wlog("database", "Project Save Failed");
        }
      });
    },
    CheckForProject() {
      window.wlog("Database :", "Check for Project");
      this.$root.db.ProjectInfo.get({
        id: 1,
      })
        .then((result) => {
          return result;
        })
        .then((data) => {
          if (data) {
            window.wlog("Database :", "Project Found");
            window.wlog("result :", data);
            this.ProjectInfo = JSON.parse(data.state);
            this.LastUpdated = Date(data.lastupdated).toLocaleString()
            this.viewsection = 2;
          } else {
            this.ProjectInfo = {};
            window.wlog("Database :", "No Project Found");
            this.viewsection = 3;
          }
        });
    },
  },
  beforeMount() {
    window.wlog("Action :", "Mounted Home.vue");
    this.CheckForProject();
  },
};
</script>