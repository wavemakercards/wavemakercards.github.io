<template>
  <div>
      
    <div v-for="el in folder.files" :key="el.uuid">
      <div v-if="el.type!='folder'">
      <v-card elevation="2" tile>

<div v-if="$root.shadowDB.Cards[el.uuid]">

        <v-card-subtitle>
         <v-icon class="pr-4">notes</v-icon> {{ $root.shadowDB.Cards[el.uuid].title }}
          <v-btn
        
        @click="$root.writer.activenode=el"
        absolute 
        x-small
             color="accent"
             dark
             fab
             right
      >
       <v-icon>edit</v-icon> 
      </v-btn>
        </v-card-subtitle>
        <v-card-text>
          {{ $root.shadowDB.Cards[el.uuid].content }}
        </v-card-text>

        </div>
        <div v-else>
 <v-card-subtitle>
         <v-icon class="pr-4">notes</v-icon> ...................
          <v-btn
        
        @click="$root.writer.activenode=el"
        absolute 
        x-small
             color="accent"
             dark
             fab
             right
      >
       <v-icon>edit</v-icon> 
      </v-btn>
        </v-card-subtitle>
        </div>

      </v-card>
        </div>
        <div v-else >
            <h4 class="pa-3"><v-icon  class="pr-4">folder</v-icon>  {{ el.title }}</h4>
             <div >
             <text-viewer :folder="el" />
             </div>
        </div>
    </div>
  </div>
</template>
<script>
import TextViewer from "../generic/TextViewer.vue";
export default {
  name: "TextViewer",
  props: {
    folder: Object,
  }, 
   components: {
    TextViewer
  },
};
</script>

