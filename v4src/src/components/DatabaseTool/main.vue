<template>
  <div> 
    <v-container>
      
        <v-row>
          <v-col>
            <v-text-field flat hide-details label="Search" prepend-inner-icon="search" />
          </v-col>
        </v-row>
      <v-row v-if="database.length >0">
        <v-col class="col-12 col-sm-6 col-md-4 col-xl-3 " v-for="(item, index) in database" :key="index">
          <v-card height="100%" class="manuscriptCSS">
            <v-list-item>
                <!--
              <v-list-item-avatar color="grey"></v-list-item-avatar>
              -->
              <v-list-item-content>
                <v-list-item-title class="headline">
                    <span v-if="item.title===''">No Title</span>
                    {{item.title}}
                    </v-list-item-title>
                <v-list-item-subtitle>{{item.meta}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
<div style="padding:10px">
            <v-card-text v-html="item.body" style="height:200px; overflow-y:scroll;"></v-card-text>
</div>
            <v-card-actions>
              <v-btn  accent>Read</v-btn>
              <v-btn  accent>Bookmark</v-btn>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      database: [],
      ItemList  : [],
      uuids : []
    };
  },
  methods: {
    makeBing(a){
     a.forEach(element => {
      this.goal = this.goal+1;
      let srch = {}
        srch.uuid =  element.uuid
         this.$root.db.FileCards.get(srch)
      .then(result => {
        return result;
      })
      .then(data => {
        if (data) {
            this.ItemList.push(data);
        }
        if(element.elements){
              this.makeBing(element.elements);
        }  
        this.items=this.items+1  
      });   
    });
    }
  },
  beforeMount() {
    
   // this.makeBing(this.$root.ProjectState.Manuscript.elements);
    let p = this.$root.db.FileCards.toArray();
    p.then((d)=>{
             this.database = d
    })
  
  }
};
</script>