<template>
<v-main>
  <v-container>
     <!-- needs to make sure its loaded -->
  <div v-if="!$root.shadowDB.Snowflake[$route.params.id]">
    loading ...
  </div>
  <div v-else>
    <v-row no-gutters align="center" justify="center">
      <v-col cols="12" sm="12" md="6">
        <v-text-field
          label="Title"
          v-model="$root.shadowDB.Snowflake[$route.params.id].title"
          solo
          @change="SaveChange()"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row no-gutters align="center" justify="center" v-for="(row,rowindex) in $root.shadowDB.Snowflake[$route.params.id].content" :key="rowindex">
 
      <v-col cols="12" sm="6">
        <v-card class="ma-2" max-width="100%" outlined>
      

<v-card-text>
          <TextEditor :uuid="row.uuid" />
    </v-card-text> 
          <v-card-actions>
            <v-btn outlined rounded text @click="openRow(row)"> Open card </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

<v-fade-transition>

      <v-col cols="12" sm="6" v-if="row.isopen">
        <v-card class="ma-2" max-width="100%" outlined v-for="(subcard,subindex) in row.children" :key="subindex" >

<v-card-text>
          <TextEditor :uuid="subcard.uuid" />
    </v-card-text>
          <v-card-actions>
                <v-btn outlined rounded text @click="deleteSub(row, rowindex)"> delete card </v-btn>
          </v-card-actions>
        </v-card>

     <v-btn @click="extraCard(row)">
       Extra card please
     </v-btn>

        <v-btn @click="replaceMe(row, rowindex)">
        Replace the original card
     </v-btn>
      </v-col>
        </v-fade-transition>  
    </v-row>
  
  </div>
  </v-container>
</v-main>
</template>

<script>
import TextEditor from "@/tools/generic/TextEditor.vue";
export default {
  components:{
    TextEditor
  },
  methods: {
    openRow(r){
    if(r.children.length===0){
     r.children.push({uuid : this.$root.uuid.v4(), parent : this.$route.params.id , children : [], isopen: false })
     r.children.push({uuid : this.$root.uuid.v4() , parent : this.$route.params.id ,children : [], isopen: false })
     r.children.push({uuid : this.$root.uuid.v4() , parent : this.$route.params.id ,children : [], isopen: false })
    }
      r.isopen= !r.isopen
      this.SaveChange()
    },
    extraCard(r){
      r.children.push({uuid : this.$root.uuid.v4() , parent : this.$route.params.id,children : [], isopen: false })
      this.SaveChange()
    },
    deleteSub(r, index){
      if(confirm("you sure?")){
      r.children.splice(index, 1);
      this.SaveChange()
      }
    },
    replaceMe(row, rowindex){
      if(confirm("you sure?")){
           this.$root.shadowDB.Snowflake[this.$route.params.id].content.splice(rowindex, 1, ...row.children)
           this.SaveChange()
      }
    },
    SaveChange() {
      this.$root.UpdateRecord(
        "Snowflake",
        this.$route.params.id,
        this.$root.shadowDB.Snowflake[this.$route.params.id]
      );
    },
  }
};
</script>