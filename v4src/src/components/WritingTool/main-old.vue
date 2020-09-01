<template>
<div>
 
    <v-navigation-drawer v-model="drawer"  style="position: fixed; top:64px; left:51px;bottom:0px " class="purple lighten-4 font-weight-bold"   >
       <v-btn fab small text @click="drawer = !drawer"><v-icon>menu</v-icon></v-btn>
      <v-list dense>
       <ManuscriptTree />
      </v-list>
    </v-navigation-drawer>

  <v-btn fab small text  @click="drawer = !drawer"><v-icon>menu</v-icon></v-btn>
 <div class="mainc" :class="{ inset: drawer }">
    <div v-if="this.$root.ProjectState.SelectedCard"> 
        <v-text-field v-model="MyNodeElementName" label="File Name" ></v-text-field>
            <!-- the prop means it can be used all over the place, the KEY makes it rerender when the element changes --> 
       <TextSettings v-if="this.$root.ProjectState.SelectedCard.icon === 'file'"/>
        <FolderSettings v-if="this.$root.ProjectState.SelectedCard.icon === 'folder'" />

       </div>     
        <div v-else>
          Empty Manuscript - may well have a bunch o settings here
        </div>
 </div>

</div>
</template>

<script>
import ManuscriptTree from "../MenuTools/ManuscriptTree"
import FolderSettings from "./FolderSettings"
import TextSettings from "./TextSettings"
export default {
  components: {
    FolderSettings,
    TextSettings,
    ManuscriptTree
  },
  data: () => ({
    drawer: null,
    dialog : false
  }),
     methods:{
      DeleteItem() {
      this.dialog = false;
      this.$root.DeleteManuscriptItem();
    }
     }
};
</script>
<style scoped>
.consoleFeedback {
  font-family: "Courier New", Courier, monospace;
  font-size: 0.7rem;
  letter-spacing: 0.1rem;
}
.mainc{
  position: absolute;
  top:0px;
  left:50px;
right:0px;
}
.inset{
   top:0px;
  left:260px;
right:0px;
}

</style>