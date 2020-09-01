<template>
<div>


     <v-navigation-drawer v-model="drawer" class="ManuscriptBar"   >
       <div v-if="loadCount!=targetCount">
 <v-progress-linear
      indeterminate
      color="yellow darken-2"
    ></v-progress-linear>
</div>
      <v-list dense>
       <ManuscriptTree  />
      </v-list>
    </v-navigation-drawer>

  <v-btn fab color="accent"  x-small  @click="drawer = !drawer"  class="folderButton"><v-icon>folder_special</v-icon></v-btn>


 <div class="mainc" :class="{ inset: drawer }">
    <div v-if="this.$root.ProjectState.SelectedCard"> 
      <CardEditor  @NodeTitleChanged="NodeTitleChanged"  :CardId="this.$root.ProjectState.SelectedCard.uuid" :key="this.$root.ProjectState.SelectedCard.uuid"  v-if="this.$root.ProjectState.SelectedCard.icon==='file'" />
      <FolderEditor @NodeTitleChanged="NodeTitleChanged" :FolderNode="this.$root.ProjectState.SelectedCard" :key="this.$root.ProjectState.SelectedCard.uuid"  v-if="this.$root.ProjectState.SelectedCard.icon==='folder'" />
       </div>     
        <div v-else>
          No particular element has been chosen, so do something else
        </div>
 </div>
  </div>


</template>

<script>
import ManuscriptTree from "./ManuscriptTree"
import CardEditor from "../Editors/CardEditor"
import FolderEditor from "../Editors/FolderEditor"
export default {

   components :{
       ManuscriptTree,
       CardEditor,
       FolderEditor
   },
   data: () => ({
    drawer: null,
    dialog : false,
    loadCount: 0,
    targetCount : 0,
    loadingDone:false
  }),
     methods:{
      DeleteItem() {
      this.dialog = false;
      this.$root.DeleteManuscriptItem();
    },
    NodeTitleChanged(payload){
      /* This tweaks the title in the node to match the card editor */
      this.$root.ProjectState.SelectedCard.title=payload
     this.$root.SaveProjectData();
    },
    UpdateNameFromDb(a){
       a.forEach(element => {
      this.targetCount = this.targetCount+1;
      let srch = {}
        srch.uuid =  element.uuid
         this.$root.db.FileCards.get(srch)
      .then(result => {
        return result;
      })
      .then(data => {
        if (data) {
          if(element.title != data.title){
          console.log("Setting Title : ", data.title)
            element.title = data.title;
          }
        }
        if(element.elements){
              this.UpdateNameFromDb(element.elements);
        }  
        this.loadCount=this.loadCount+1  
      });   
    });     

      
    }
     },
     beforeMount(){
      // ok seems the only way to do this is to update the names in the manuscript object manually here
  this.UpdateNameFromDb(this.$root.ProjectState.Manuscript.elements)    

  
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
  right:50px;
}
.inset{
   top:0px;
  left:270px;
right:50px;
}

.ManuscriptBar{
    position:fixed;
     top:0px; 
     left:0px;
     bottom:0px;
     padding-top:47px;
}

.folderButton{
    margin:10px;
    margin-top:15px;
}
@media only screen and (min-width: 1264px) {
.ManuscriptBar{
      left:50px;
      padding-top:61px;
  }
}
</style>