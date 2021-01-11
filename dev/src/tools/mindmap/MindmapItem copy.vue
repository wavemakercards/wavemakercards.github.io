
<template>
  <v-main>
    <v-container>
      <!-- needs to make sure its loaded -->

      <v-row no-gutters align="center" justify="center">
        <v-col cols="12" sm="12" md="6">
          <v-text-field
            label="Title"
            v-model="$root.shadowDB.Mindmap[$route.params.id].title"
            @change="SaveChange()"
          ></v-text-field>
  
        </v-col>
      </v-row>
 
      <div id="scroller">

     
        <div class="link">
          <div class="drawline"
          
          
          ></div>
        </div>



<div v-for="(item, itemindex) in Object.entries($root.shadowDB.Mindmap[$route.params.id].content.items)" :key="itemindex">
        <vue-draggable-resizable
          :w="item[1].width"
 :h="item[1].height"
          :parent="false"
           @activated="onActivated(item)" @deactivated="onDeactivated(item[0])"
          @dragging="onDrag"
          @resizing="onResize"
          class="card"
          :x="item[1].x"
          :y="item[1].y"
          drag-handle=".drag"
            :class="(currentitem[0] === item[0])?'tophover': ''"
          
        >
            
          <v-card 
            :width="item[1].width"
          :height="item[1].height"
           style="overflow:hidden; overflow-y:scroll;"
           >     <div class="drag" >
              <v-btn small icon ><v-icon>drag_handle</v-icon></v-btn>    
              </div>
           
            <v-card-text >
              <p>
            X  {{item}}
              </p>
                 <p>
            Y  {{item.y}}
              </p>

                     <p>
      {{item.width}}  x    {{item.height}}
              </p>
            </v-card-text>
          <v-btn small absolute bottom right icon color="secondary" @click="createLink(item)" ><v-icon>link</v-icon></v-btn>    
          </v-card>
        </vue-draggable-resizable>
</div>
      </div>
              <v-btn icon absolute bottom right @click="addNode()"><v-icon>add</v-icon></v-btn>
    </v-container>
  </v-main>
</template>

<script>
import VueDraggableResizable from "vue-draggable-resizable";
// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
export default {
  components: {
    VueDraggableResizable,
  },
  data() {
    return {
      createlink: {
        start : null,
        end : null
      },
      currentitem : [],
    };
  },
  methods: {
    createLink(item){
        if(this.createlink.start === null) {
          this.createlink.start = item[0]
        }else{
          this.createlink.start  = {x: -100, y: -100}
        }
    },
      onActivated(i){
          this.currentitem=i
          console.log("selected",i)
          },
          onDeactivated(){
  console.log("Deactivated Node")
              this.$root.shadowDB.Mindmap[this.$route.params.id].content.items[this.currentitem[0]] = this.currentitem[1]
              this.SaveChange()
              this.currentitem=[]          
          },

    onResize: function (x, y, width, height) {
      this.currentitem[1].x = x;
      this.currentitem[1].y = y;
      this.currentitem[1].width = width;
      this.currentitem[1].height = height;
     this.$root.shadowDB.Mindmap[this.$route.params.id].content.items[this.currentitem[0]] = this.currentitem[1]
        
    },
    onDrag: function (x, y) {
      if(x<10 || y<10){return false} // prevent them dropping a card off the top or left

         this.currentitem[1].y = y;
     this.currentitem[1].x = x;
    this.$root.shadowDB.Mindmap[this.$route.params.id].content.items[this.currentitem[0]] = this.currentitem[1]
      
    },
    addNode(x, y){
        let startx=x
        let starty=y
        if (!startx){
            startx=10
        }
          if (!starty){
            starty=10
        }
let  uuid = this.$root.uuid.v4();
   let n = {
        x : startx ,
        y : starty,
        width:  200,
        height: 200,
      };
      console.log(uuid , n)
         
   this.$set(this.$root.shadowDB.Mindmap[this.$route.params.id].content.items, uuid, n) 
         this.SaveChange()
    },
    SaveChange() {
    
      this.$root.UpdateRecord(
        "Mindmap",
        this.$route.params.id,
        this.$root.shadowDB.Mindmap[this.$route.params.id]
      );
    },
    AddLink() {},
  },
};
</script>

<style scoped >
#scroller {
  position: absolute;
  top: 80px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  overflow: scroll;

}

.tophover{
    z-index: 999999 !important;
}
.drag{
    text-align: right;
    cursor: pointer;
}
</style>