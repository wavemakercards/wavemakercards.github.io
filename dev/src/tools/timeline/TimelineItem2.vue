<template>

  <v-container>
     <!-- needs to make sure its loaded -->
  <div v-if="!$root.shadowDB.Timeline[$route.params.id]">
    loading ...
  </div>
  <div v-else>
    <v-row no-gutters align="center" justify="center">
      <v-col cols="12" sm="12" md="6">
        <v-text-field
          label="Title"
          v-model="$root.shadowDB.Timeline[$route.params.id].title"
          solo
          @change="SaveChange()"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row no-gutters align="center" justify="center" v-for="(row,rowindex) in $root.shadowDB.Timeline[$route.params.id].content" :key="rowindex">
 
      <v-col cols="12" sm="6">
        <v-card class="ma-2" max-width="100%" outlined>
      
<v-card-title>{{row.uuid}}</v-card-title>
<v-card-text>
          <TextEditor :uuid="row.uuid" />
    </v-card-text>

          <v-card-actions>
            <v-btn outlined rounded text > kyti card </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  
  </div>
  </v-container>
</template>

<script>
import TextEditor from "@/tools/generic/TextEditor.vue";
export default {
  components:{
    TextEditor
  },
  methods: {
    SaveChange() {
      this.$root.UpdateRecord(
        "Timeline",
        this.$route.params.id,
        this.$root.shadowDB.Timeline[this.$route.params.id]
      );
    },
  }
};
</script>