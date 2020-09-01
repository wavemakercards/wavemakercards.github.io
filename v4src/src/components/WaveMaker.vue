<template>
  <div>

    <v-app-bar app clipped-left >
      



            
                    <v-btn
                      icon
                     target="_blank"
              
                      @click="drawer = !drawer" class="hidden-lg-and-up"
                    >
                                 <v-app-bar-nav-icon >
        <svg id="svg6" version="1.1" viewBox="0 0 24 24" height="24" width="24">
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
      </v-app-bar-nav-icon>

                    </v-btn>

                          <v-app-bar-nav-icon class="hidden-md-and-down">
        <svg id="svg6" version="1.1" viewBox="0 0 24 24" height="24" width="24">
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
      </v-app-bar-nav-icon>
             
     


<!--
      <span class="title ml-3 mr-5">
       <span class="font-weight-light">wave</span>maker 
      </span>
-->
 <v-spacer />
                
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                     target="_blank"
                      v-on="on"
                      @click="ProjectUpload"
                    >
                      <v-icon>cloud_upload</v-icon>
                    </v-btn>
                  </template>
                  <span>Upload Project</span>
                </v-tooltip>

                      <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                        @click="ProjectClose"
                      target="_blank"
                      v-on="on"
             
                    >
                      <v-icon>cancel</v-icon>
                    </v-btn>
                  </template>
                  <span>Close Project</span>
                </v-tooltip>

    </v-app-bar>
    <!-- mini-variant.sync="mini" -->
    <v-navigation-drawer v-model="drawer" app clipped
      :mini-variant="true"
      mini-variant-width="50"
    >
      <v-list dense>
        <MenuComponent />
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <MainComponent />
    </v-content>
  </div>
</template>

<script>
import MenuComponent from "@/components/MenuComponent.vue";
import MainComponent from "@/components/MainComponent.vue";
export default {
  components: {
    MenuComponent,
    MainComponent
  },
  data: () => ({
    drawer: null,
    mini: true
  }),
  methods:{
    ProjectClose(){
        console.warn("Closing the project warning needed")
    },
    ProjectUpload(){

     console.log('%c Not yet you will need to clear the local database  in the f12 applications tab', 'color: pink;font-size:2rem;')
    }
  }
};
</script>
