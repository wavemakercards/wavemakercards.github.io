<template>
<div>

 <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="6"
            lg="4"
          >
         
            <v-card class="elevation-12">
<div style=" display:block; margin:0 auto; padding:20px;  text-align:center">
 <svg id="svg6" version="1.1" viewBox="0 0 24 24" width="100" height="100" >
          <defs id="defs10" />
          <path id="path2" d="M0 0h24v24H0V0z" fill="none" />
          <g transform="matrix(0.046875,0,0,0.04604639,-1.951887,-3.0598516)" id="Layer_x0020_1">
            <g id="_921457168">
              <path
                style="fill:#e0e0e0"
                id="path2-8"
                d="M 464.632,212.901 337.566,83.292 c -22.014,-22.454 -57.758,-22.454 -79.771,0 l -126.63,129.386 c -7.411,7.559 -7.411,19.563 0,27.122 l 38.359,39.127 25.5,24.232 c 7.628,7.114 19.18,7.114 26.808,0 l 51.219,-48.242 c 14.167,-13.338 35.744,-13.338 49.693,0 l 51.219,48.242 c 7.629,7.114 19.18,7.114 26.809,0 l 25.501,-24.232 38.359,-38.904 c 7.193,-7.337 7.193,-19.563 0,-27.122 z"
              />
              <path
                style="fill:#616161"
                id="path4"
                d="m 58.804,367.853 198.991,202.973 c 22.013,22.452 57.757,22.452 79.771,0 L 536.557,367.853 c 34.437,-35.125 10.244,-45.574 -15.039,-70.029 L 490.35,267.59 c -7.409,-7.336 -19.18,-7.113 -26.808,0 l -51.218,48.242 c -14.169,13.339 -35.744,13.339 -49.694,0 L 311.411,267.59 c -7.575,-7.113 -19.233,-7.113 -26.809,0 l -51.219,48.242 c -14.167,13.339 -35.744,13.339 -49.693,0 L 132.471,267.59 c -7.576,-7.113 -19.233,-7.113 -26.809,0 l -28.77,27.123 c -26.37,24.899 -54.05,36.236 -18.088,73.14 z"
              />
            </g>
          </g>
        </svg>
        <p>
        Wavemaker
        </p>
</div>
              <v-toolbar flat >       
                <v-toolbar-title  >Load a project</v-toolbar-title>
                <v-spacer />
                
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                      large
                      target="_blank"
                      v-on="on"
                      @click="LoadProject"
                    >
                      <v-icon>cloud_download</v-icon>
                    </v-btn>
                  </template>
                  <span>Download a Project</span>
                </v-tooltip>

              </v-toolbar>
              <v-card-text>
               <p>or create a new project</p>
                  <v-text-field
                     label="New Project Name"
            v-model="MyTitle"
                    prepend-icon="import_contacts"
                    type="text"
                  />
  
            
              </v-card-text>
              <v-card-actions>
                <v-spacer />

     <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                      large
                      target="_blank"
                      class="primary"
                      v-on="on"
                      @click="NewProj"
                    >
                      <v-icon>add</v-icon>
                    </v-btn>
                  </template>
                  <span>Create a New Project</span>
                </v-tooltip>



              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>


 </div>
</template>

<script>
export default {
    data(){
        return{
            MyTitle : ''
        }
    },
    methods:{
        LoadProject(){
            alert('not done yet')
        },
        NewProj(){
            if(this.MyTitle !="") {
            let n={}
         n = {}
         n.id = 1
         n.uuid = this.$root.uuid.v1()
         n.title = this.MyTitle
         n.lastupdated = Date.now()
         this.$root.ProjectState.ProjectInfo = n
         this.$root.SaveProjectData()
            }else{
                alert("You must enter a project name")
            }
        }
    }
}
</script>

<style scoped >

</style>