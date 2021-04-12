<template>
 <v-app-bar
        app
        clipped-left
        clipped-right
        elevation="0"
      >
<v-menu
            top
            left
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                icon
                v-bind="attrs"
                v-on="on"
              >
                   <svg id="logo" version="1.1" viewBox="0 0 24 24" height="24" width="24">
          <path d="M0 0h24v24H0V0z" fill="none" />
          <g transform="matrix(0.046875,0,0,0.04604639,-1.951887,-3.0598516)" >
            <g id="_921457168">
              <path
                class="logo-top"
                d="M 464.632,212.901 337.566,83.292 c -22.014,-22.454 -57.758,-22.454 -79.771,0 l -126.63,129.386 c -7.411,7.559 -7.411,19.563 0,27.122 l 38.359,39.127 25.5,24.232 c 7.628,7.114 19.18,7.114 26.808,0 l 51.219,-48.242 c 14.167,-13.338 35.744,-13.338 49.693,0 l 51.219,48.242 c 7.629,7.114 19.18,7.114 26.809,0 l 25.501,-24.232 38.359,-38.904 c 7.193,-7.337 7.193,-19.563 0,-27.122 z"
              />
              <path
                class="logo-bottom"
                d="m 58.804,367.853 198.991,202.973 c 22.013,22.452 57.757,22.452 79.771,0 L 536.557,367.853 c 34.437,-35.125 10.244,-45.574 -15.039,-70.029 L 490.35,267.59 c -7.409,-7.336 -19.18,-7.113 -26.808,0 l -51.218,48.242 c -14.169,13.339 -35.744,13.339 -49.694,0 L 311.411,267.59 c -7.575,-7.113 -19.233,-7.113 -26.809,0 l -51.219,48.242 c -14.167,13.339 -35.744,13.339 -49.693,0 L 132.471,267.59 c -7.576,-7.113 -19.233,-7.113 -26.809,0 l -28.77,27.123 c -26.37,24.899 -54.05,36.236 -18.088,73.14 z"
              />
            </g>
          </g>
        </svg>
              </v-btn>
            </template>
   <v-list>
  <v-tooltip right v-for="(item,index) in menuitems" :key="index" >
      <template v-slot:activator="{ on, attrs }">
         <v-list-item link  @click="$router.push('/'+item.text).catch(()=>{});"   v-bind="attrs"  v-on="on">
                <v-list-item-title><v-icon>{{item.icon}}</v-icon></v-list-item-title>
              </v-list-item>
                </template>
 <span>{{item.tooltip}}</span>
    </v-tooltip>


    <v-tooltip right>
      <template v-slot:activator="{ on, attrs }">
       <v-list-item link @click="$vuetify.theme.dark=!$vuetify.theme.dark"    v-bind="attrs"
          v-on="on">
                <v-list-item-title><v-icon>flare</v-icon></v-list-item-title>
              </v-list-item>
      </template>
      <span>Dark / Light mode</span>
    </v-tooltip>



            </v-list>
          </v-menu>
           <v-toolbar-title>Wavemaker <span class="logo-text-4">4</span></v-toolbar-title>

<!--
      <v-btn icon link  @click="$router.push('/')" >   
    <svg id="logo" version="1.1" viewBox="0 0 24 24" height="24" width="24">
          <path d="M0 0h24v24H0V0z" fill="none" />
          <g transform="matrix(0.046875,0,0,0.04604639,-1.951887,-3.0598516)" >
            <g id="_921457168">
              <path
                class="logo-top"
                d="M 464.632,212.901 337.566,83.292 c -22.014,-22.454 -57.758,-22.454 -79.771,0 l -126.63,129.386 c -7.411,7.559 -7.411,19.563 0,27.122 l 38.359,39.127 25.5,24.232 c 7.628,7.114 19.18,7.114 26.808,0 l 51.219,-48.242 c 14.167,-13.338 35.744,-13.338 49.693,0 l 51.219,48.242 c 7.629,7.114 19.18,7.114 26.809,0 l 25.501,-24.232 38.359,-38.904 c 7.193,-7.337 7.193,-19.563 0,-27.122 z"
              />
              <path
                class="logo-bottom"
                d="m 58.804,367.853 198.991,202.973 c 22.013,22.452 57.757,22.452 79.771,0 L 536.557,367.853 c 34.437,-35.125 10.244,-45.574 -15.039,-70.029 L 490.35,267.59 c -7.409,-7.336 -19.18,-7.113 -26.808,0 l -51.218,48.242 c -14.169,13.339 -35.744,13.339 -49.694,0 L 311.411,267.59 c -7.575,-7.113 -19.233,-7.113 -26.809,0 l -51.219,48.242 c -14.167,13.339 -35.744,13.339 -49.693,0 L 132.471,267.59 c -7.576,-7.113 -19.233,-7.113 -26.809,0 l -28.77,27.123 c -26.37,24.899 -54.05,36.236 -18.088,73.14 z"
              />
            </g>
          </g>
        </svg>
        

      </v-btn>

    <v-btn icon v-for="(item,index) in menuitems" :key="index"  @click="$router.push('/'+item.text).catch(()=>{});" >
            <v-icon>{{item.icon}}</v-icon>
        </v-btn >


 <v-btn icon @click="$vuetify.theme.dark=!$vuetify.theme.dark" >
            <v-icon>flare</v-icon>
        </v-btn >
-->

 <v-spacer></v-spacer>

 <v-btn icon  @click="$router.go(-1)"  v-if="this.$route.params.id"  >
            <v-icon>cancel</v-icon>
        </v-btn >

      </v-app-bar>



<!--


       <v-navigation-drawer
      mini-variant
      permanent
      app
    >

          <v-list dense>
      <v-list-item link  @click="$router.push('/')" >

   
    <svg id="logo" version="1.1" viewBox="0 0 24 24" height="24" width="24">
          <path d="M0 0h24v24H0V0z" fill="none" />
          <g transform="matrix(0.046875,0,0,0.04604639,-1.951887,-3.0598516)" >
            <g id="_921457168">
              <path
                class="logo-top"
                d="M 464.632,212.901 337.566,83.292 c -22.014,-22.454 -57.758,-22.454 -79.771,0 l -126.63,129.386 c -7.411,7.559 -7.411,19.563 0,27.122 l 38.359,39.127 25.5,24.232 c 7.628,7.114 19.18,7.114 26.808,0 l 51.219,-48.242 c 14.167,-13.338 35.744,-13.338 49.693,0 l 51.219,48.242 c 7.629,7.114 19.18,7.114 26.809,0 l 25.501,-24.232 38.359,-38.904 c 7.193,-7.337 7.193,-19.563 0,-27.122 z"
              />
              <path
                class="logo-bottom"
                d="m 58.804,367.853 198.991,202.973 c 22.013,22.452 57.757,22.452 79.771,0 L 536.557,367.853 c 34.437,-35.125 10.244,-45.574 -15.039,-70.029 L 490.35,267.59 c -7.409,-7.336 -19.18,-7.113 -26.808,0 l -51.218,48.242 c -14.169,13.339 -35.744,13.339 -49.694,0 L 311.411,267.59 c -7.575,-7.113 -19.233,-7.113 -26.809,0 l -51.219,48.242 c -14.167,13.339 -35.744,13.339 -49.693,0 L 132.471,267.59 c -7.576,-7.113 -19.233,-7.113 -26.809,0 l -28.77,27.123 c -26.37,24.899 -54.05,36.236 -18.088,73.14 z"
              />
            </g>
          </g>
        </svg>
         

      </v-list-item>


    <v-list-item v-for="(item,index) in menuitems" :key="index"  @click="$router.push('/'+item.text).catch(()=>{});" >
            <v-icon>{{item.icon}}</v-icon>
        </v-list-item>


 <v-list-item @click="$vuetify.theme.dark=!$vuetify.theme.dark" >
            <v-icon>flare</v-icon>
        </v-list-item>




          </v-list>

    </v-navigation-drawer>
    -->
</template>

<script>
export default {
  data(){
      return{
          menuitems : [
              { text :'', icon : "whatshot", tooltip : "Welcome"},
              { text :'project', icon : "home" , tooltip : "Project Home"},
              { text :'writer', icon : "import_contacts" , tooltip : "Writing Tool"},
              { text :'timeline', icon : "access_time" , tooltip : "Timeline Tool"},
              { text :'snowflake', icon : "ac_unit" , tooltip : "Snowflake Tool"},

              {
                 text :'gridplanner', icon : "view_comfy" , tooltip : "Grid Planner Tool"},
                 { text :'mindmap', icon : "schema" , tooltip : "Mindmap Tool"},
              { text :'exportoptions', icon : "launch" , tooltip : "Export Options"},
                            { text :'database', icon : "layers" , tooltip : "Cards Database"},
              { text :'settings', icon : "settings" , tooltip : "Settings"},
           //   { text :'cloud', icon : "backup" , tooltip : ""},
          ]
      }
  }  
}
</script>