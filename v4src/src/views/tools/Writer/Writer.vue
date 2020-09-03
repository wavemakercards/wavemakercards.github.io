<template>
  <div style="padding-left:80px;">


    <v-navigation-drawer v-model="drawer" mobile-breakpoint="xs" clipped app class="slideDraw"  >
     
          <ManuscriptTree  />
  
    </v-navigation-drawer>


<SideMenu hilight="writer" />

    <v-app-bar app dense clipped-left >
          <v-btn icon @click.stop="drawer = !drawer" >
            <v-icon  v-if="drawer" >mdi-folder</v-icon>
        <v-icon v-if="!drawer">mdi-folder-move</v-icon>
      </v-btn>

  

      <v-toolbar-title>files & Folders</v-toolbar-title>
          <v-spacer></v-spacer>
              <img src="@/assets/wavemaker.svg" width="25"  />    
    </v-app-bar>

    <v-main>
      <v-container class="fill-height" fluid  style="max-width:800px;">
        <v-row align="center" justify="center">
          <div>    

 <v-card
    class="mx-auto"
    max-width="800"
    light
    v-if="$root.writer.SelectedCard"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">{{$root.writer.SelectedCard.uuid}}</div>
        <v-list-item-title class="headline mb-1">
<v-text-field
              label="Item title"
              placeholder="Title here"
              v-model="$root.writer.SelectedCard.title"
              style="font-size:1.2rem"
              :blur="$root.SaveManuscriptData()"
            ></v-text-field>

        </v-list-item-title>
        <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      ></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn text>Button</v-btn>
      <v-btn text>Button</v-btn>
    </v-card-actions>
  </v-card>

           
            
 


          </div>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>
<script>
import SideMenu from './../../tools/$$Shared/SideMenu'
import ManuscriptTree from "./../$$Shared/ManuscriptTree"

export default {
  components:{
    ManuscriptTree,
    SideMenu
  },
  data: () => ({
    drawer: null
  }),
  mounted(){
    this.$root.db.ManuscriptData.get({
            id: 1
        }).then((result) => {
            return result;
        }).then(data => {
            if (data) {
                this.$root.writer = JSON.parse(data.state)
            } else {
                this.$root.writer =  {
            SelectedCard : {uuid : null},
            FileList : []
        }
            }
        });
  }
};
</script>

<style scoped>

@media only screen and (min-width: 600px) {
  .slideDraw{
  margin-left:57px;
}

}


</style>