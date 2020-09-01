<template>
  <div>

 <TextEditor :myEl="this.$root.ProjectState.SelectedCard" :key="this.$root.ProjectState.SelectedCard.uuid"/>

    <v-container>
      <v-row>
        <v-col cols="12" class="text-right">
         <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn color="error" small dark v-on="on"><v-icon left small dense >delete</v-icon> Delete</v-btn>
      </template>
      <v-card >
        <v-card-title class="headline" ><v-icon left error >warning</v-icon> Delete this </v-card-title>
        <v-card-text>Are you sure</v-card-text>
        <v-card-actions class="justify-space-between" >
          <v-btn color="success darken-1" text small @click="dialog = false">No Thanks</v-btn>
          <v-btn color="error darken-1" text small  @click="DeleteItem()">DELETE IT</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import TextEditor from "../Editors/TextEditor"
export default {
    components:{
        TextEditor
    },
  data (){
    return {
        dialog : false
    }
  },
  computed: {
    myEl() {
      return this.$root.ProjectState.SelectedCard;
    }
  },
  methods: {
    DeleteItem() {
      this.dialog = false
      this.$root.DeleteManuscriptItem()
    },
    trg() {
     this.$root.ProjectState.SelectedCard.name =this.myEl.name
     this.$root.SaveProjectData()
    }
  }
};
</script>