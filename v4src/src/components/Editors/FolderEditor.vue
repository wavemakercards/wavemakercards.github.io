<template>
  <div>
    <v-container>
        <v-row>
          <v-col cols="12">
                     <v-text-field
                     v-model="FolderTitle"
                     dense
            label="Regular"
            placeholder="Placeholder"
          ></v-text-field>
          </v-col>
        </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
    props :{
        FolderNode : Object
    },
    data(){
        return {
         FolderTitle : null  
        }
    },
   watch: {
    // Watch the content variable for changes
    //      content: function (n, o) { will get n=new and o=old values
    FolderTitle: function() {
       // console.log("save folder name by emitting a save event")
        this.$emit('NodeTitleChanged', this.FolderTitle)
    }
  },
  beforeMount(){
      this.FolderTitle = this.FolderNode.title
  }
};
</script>
