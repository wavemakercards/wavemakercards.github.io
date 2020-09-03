<template>
  <div>


    <v-navigation-drawer v-model="drawer" app  clipped style="margin-left:50px;" >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <router-link to="/">Home</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <router-link to="/writer">About</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
<SideMenu hilight="timeline" />
    <v-app-bar app dense clipped-left >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main >
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <div>
            <h1>This is the Writer Tool page</h1>
            <p>On loading the system up this needs to do some stuff</p>
          </div>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>
<script>
import SideMenu from './../../tools/$$Shared/SideMenu'
export default {
  components:{
    SideMenu
  },
  data: () => ({
    drawer: null,
  }),
};
</script>