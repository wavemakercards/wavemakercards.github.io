<template>
  <div style="padding-bottom:100px;">
    <v-container v-if="!toolinfo">
  <v-row v-if="tooldata.length === 0">
      <h1>NOTHING HERE CLICK THE PLUS!!</h1>
  </v-row>

      <v-row v-if="tooldata.length >0">
        <v-col class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
        v-for="(item, index) in tooldata" :key="index">
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
              <v-btn  accent @click="SetToolinfo(item)"  >Read</v-btn>
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
  
  
  
    <v-container v-if="toolinfo">

  <v-row >
     <v-col class="col-xs-12">
          <v-text-field
            v-model="toolinfo.title"
            dense
            label="Name"
            placeholder="Type here ..."
          ></v-text-field>
     </v-col>
      </v-row>
  
<div v-if="toolinfo.data.length">
<v-row v-for="(item,index) in toolinfo.data" :key="index" >

        <v-col class="col-6">

          <v-card height="100%">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="headline">
           title
                    </v-list-item-title>
                             {{item.uuid}}
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-btn  accent>Read</v-btn>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>ac_unit</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>


</div>






      <v-btn
              fixed
              fab
              small
              bottom
              right
            class="error"
            @click="toolinfo=null"
            >
              <v-icon>close</v-icon>
            </v-btn>
    </v-container>
   
  </div>
</template>

<script>


export default {
  data() {
    return {
        tooldata: [],
        toolinfo : null
    };
  },
  methods: {
    SetToolinfo(i){
          this.toolinfo=i
          if(!this.toolinfo.data.length){
              this.toolinfo.data=[{
                uuid : this.$root.uuid.v1()
              }]
          }
    },
      AddNewTool(){
        let id =this.$root.uuid.v1()
        let newObj = {}
        newObj.uuid= id
        newObj.title = "Title Here"
        newObj.data = []
         newObj.lastupdated =  Date.now();
         this.tooldata.push(newObj)
        this.SaveToolData(newObj)
      },
      SaveToolData(newObj){
      this.$root.db.Snowflakes.put(newObj).then(function(updated) {
        if (updated) {
          //Cool updated!");
        } else {
         // failed Save");
        }
      });
      }
  },
  beforeMount() {
    let p = this.$root.db.Snowflakes.toArray();
    p.then((d)=>{
         this.tooldata = d
    })
  
  }
};
</script>