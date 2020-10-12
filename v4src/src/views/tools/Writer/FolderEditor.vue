<template>
  <div class="TextEditorPageHolder">
   
    <div class="TextEditorPage" >

      <v-card class="mx-auto"   tile text   >
 <v-card-text class="pt-2">
   <h5>Folder Settings</h5>
    <v-text-field
    label="Title"
      placeholder="Title"
      v-model="$root.system.writer.SelectedCard.title"
      style="font-size:1.2rem"
      class="pr-5 pl-5"
 :blur="$root.SaveProjectData()"
    ></v-text-field>
 </v-card-text> 
      </v-card>
           

    </div>
  </div>
</template>
<style scoped>
.TextEditorPageHolder {
  position: relative;
  display: block;
    margin-top: 10px;
  max-width: 800px;
    margin: 0 auto;
}

.TextEditorPage {
  position: absolute;
  top:0px;
  bottom:0px;
  margin: 0 auto;
  right:0px;
  left:0px;
}
</style>


<script>

export default {

  props: {
    myId: String,
  },
};
</script>