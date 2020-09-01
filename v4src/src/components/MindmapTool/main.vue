<template>
  <div>
    <h1>{{this.$root.ProjectState.Section}} Tool</h1>
    <v-container>
      <v-row v-if="tooldata.length >0">
        <v-col md-3 v-for="(item, index) in tooldata" :key="index">
          <v-card height="100%">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="headline">
                    <span v-if="item.title===''">No Title</span>
                    {{item.title}}
                    </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-btn  accent>Read</v-btn>
              <v-btn  accent>Bookmark</v-btn>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>favorite</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>face</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
         
      </v-row>
       <v-btn
              fixed
              fab
              bottom
              right
            class="accent"
            @click.native="AddNewTool"
            >
              <v-icon>add</v-icon>
            </v-btn>
    </v-container>
   
  </div>
</template>

<script>

export default {
  data() {
    return {
        tooldata: []
    };
  },
  methods: {
      AddNewTool(){
        let id = this.$root.uuid.v1()
        let newObj = {}
        newObj.uuid= id
        newObj.title = "Title Here"
         newObj.lastupdated =  Date.now();
         this.tooldata.push(newObj)
        this.SaveToolData(newObj)
      },
      SaveToolData(newObj){
        
      this.$root.db.Mindmaps.put(newObj).then(function(updated) {
        if (updated) {
       //Save done");
        } else {
         // Failed Save");
        }
      });
      }
  },
  beforeMount() {
    let p = this.$root.db.Mindmaps.toArray();
    p.then((d)=>{
         this.tooldata = d
    })
  
  }
};
</script>