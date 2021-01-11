// TODO : Add the text node
// TODO : Add the Image node
// TODO : Needs to be looked at for speed

<template>
  <v-main>
    <v-row no-gutters align="center" justify="center" class="sticky" color="c9">
      <v-col cols="12">
        <v-text-field
          label="Title"
          solo
          height="50px"
          elevation="0"
          v-model="$root.shadowDB.Mindmap[$route.params.id].title"
          @change="SaveChange()"
        ></v-text-field>
      </v-col>
    </v-row>
    <div id="scroller" @mousemove="DrawingLine()">

    <div
          class="lineDrawing"
          :style="DrawLineStyle"
        ></div>

      <template
        v-for="links in Object.entries(
          $root.shadowDB.Mindmap[$route.params.id].content
        )"
      >
       <div
          v-for="(lineitem, index) in Object.entries(links[1].linksOut)"
          :key="index + links[0]"
          class="lineDraw"
          @click="DeleteLink(links[0],lineitem[0])"
          :style="lineStyle(links[0],lineitem[0])"
        ></div>
      </template>
      <template
        v-for="item in Object.entries(
          $root.shadowDB.Mindmap[$route.params.id].content
        )"
      >
        <vue-draggable-resizable
        :key="item[0]"
          :parent="false"
          :w="item[1].width"
          :h="item[1].height"
          @activated="onActivated(item)"
          @deactivated="onDeactivated(item[0])"
          @dragging="onDrag"
          @resizing="onResize"
          class="card"
          :x="item[1].x"
          :y="item[1].y"
          drag-handle=".drag"
          :class="currentitem[0] === item[0] ? 'tophover' : ''"
        >
          <v-card
            :width="item[1].width"
            :height="item[1].height"
            style="overflow: hidden; overflow-y: scroll"
          >
            <div class="drag">
              <v-btn small icon><v-icon>drag_handle</v-icon></v-btn>
            </div>

            <v-card-text>
              <div
                style="text-align: left; width: 100%; background-color: purple"
              >
                X:{{ item[1].x }} Y:{{ item[1].y }} <br />
                {{ item[1].width }} x {{ item[1].height }}
              </div>
            </v-card-text>
          <v-card-actions>
             <v-btn
              x-small
              icon
              
              
         
              @click="createLink(item)"   
              ><v-icon>link</v-icon></v-btn>

               <v-btn
              x-small 
             
              
             
           icon
              @click="DeleteNode(item)"   
              ><v-icon>delete</v-icon></v-btn>
          </v-card-actions>
          </v-card>
         
        </vue-draggable-resizable>
      </template>
    </div>
    <v-btn icon absolute bottom right @click="AddNode()"
      ><v-icon>add</v-icon></v-btn
    >
  </v-main>
</template>

<script>
import VueDraggableResizable from "vue-draggable-resizable";
// optionally import default styles
//import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
export default {
  components: {
    VueDraggableResizable,
  },
  data() {
    return {
      createlink: null,
      currentitem: [],
      DrawLineStyle : { "top" : "-10000px"}
    };
  },
  methods: {
    createLink(item) {
      if (this.createlink === null) {
        this.createlink = item;
      } else {
        if (this.createlink != item) {
          let start = this.createlink;
          let end = item;
          this.$set(this.$root.shadowDB.Mindmap[this.$route.params.id].content[start[0]].linksOut, end[0] ,1)
  this.$set(this.$root.shadowDB.Mindmap[this.$route.params.id].content[end[0]].linksIn, start[0] ,1);
         console.log("create", start, end )
          this.createlink = null;        




          this.SaveChange();
        }else{
           this.createlink = null;     
        }
        // else - its the same link
      }
    },

DeleteLink(src,target){
this.$delete (this.$root.shadowDB.Mindmap[this.$route.params.id].content[src].linksOut, target)
this.$delete (this.$root.shadowDB.Mindmap[this.$route.params.id].content[target].linksIn, src)
  this.SaveChange();
},

DrawingLine(){

if(this.createlink){ 
  var off1 = this.createlink[1]

var rect = document.getElementById("scroller").getBoundingClientRect();

  
      // center of first point
      var dx1 = off1.x + off1.width / 2;
      var dy1 = off1.y + off1.height / 2;
      // center of second point
      var dx2 = event.clientX - rect.left 
      var dy2 = event.clientY - rect.top
      // distance
      var length = Math.sqrt(
        (dx2 - dx1) * (dx2 - dx1) + (dy2 - dy1) * (dy2 - dy1)
      );
      // center
      var cx = (dx1 + dx2) / 2 - length / 2;
      var cy = (dy1 + dy2) / 2 - 2 / 2;
      // angle
      var angle = Math.atan2(dy1 - dy2, dx1 - dx2) * (180 / Math.PI);
      // draw line

      var o = {
        top: cy + "px",
        left: cx + "px",
        width: length + "px",
        transform: "rotate(" + angle + "deg)",
      };
    
      this.DrawLineStyle =  o;

}else{
  this.DrawLineStyle = { "top" : "-10000px"}
}

}
,

    lineStyle(src, target) {
      var off1 = this.$root.shadowDB.Mindmap[this.$route.params.id].content[
        src
      ];
      var off2 = this.$root.shadowDB.Mindmap[this.$route.params.id].content[
        target
      ];
      // center of first point
      var dx1 = off1.x + off1.width / 2;
      var dy1 = off1.y + off1.height / 2;
      // center of second point
      var dx2 = off2.x + off2.width / 2;
      var dy2 = off2.y + off2.height / 2;
      // distance
      var length = Math.sqrt(
        (dx2 - dx1) * (dx2 - dx1) + (dy2 - dy1) * (dy2 - dy1)
      );
      // center
      var cx = (dx1 + dx2) / 2 - length / 2;
      var cy = (dy1 + dy2) / 2 - 2 / 2;
      // angle
      var angle = Math.atan2(dy1 - dy2, dx1 - dx2) * (180 / Math.PI);
      // draw line

      var o = {
        top: cy + "px",
        left: cx + "px",
        width: length + "px",
        transform: "rotate(" + angle + "deg)",
      };
    
      return o;
    },

    onActivated(i) {
      this.currentitem = i;
    //  console.log("selected", i);
    },
    onDeactivated() {
  //    console.log("Deactivated Node");
      this.$set(
        this.$root.shadowDB.Mindmap[this.$route.params.id].content,
        this.currentitem[0],
        this.currentitem[1]
      );
      this.SaveChange();
      this.currentitem = [];
    },
    onResize: function (x, y, width, height) {
      this.currentitem[1].x = x;
      this.currentitem[1].y = y;
      this.currentitem[1].width = width;
      this.currentitem[1].height = height;
      this.$set(
        this.$root.shadowDB.Mindmap[this.$route.params.id].content,
        this.currentitem[0],
        this.currentitem[1]
      );
    },
    onDrag: function (x, y) {
      if (x < 10 || y < 10) {
        return false;
      } // prevent them dropping a card off the top or left

      this.currentitem[1].y = y;
      this.currentitem[1].x = x;
      this.$set(
        this.$root.shadowDB.Mindmap[this.$route.params.id].content,
        this.currentitem[0],
        this.currentitem[1]
      );
    },
    DeleteNode(item){
      // we need to delete the linksOut to this node from any other nodes
      let deleteUid = item[0]
      Object.entries(this.$root.shadowDB.Mindmap[this.$route.params.id].content).forEach(element => {
      this.$delete(element[1].linksOut,deleteUid)
      });
      this.$delete(this.$root.shadowDB.Mindmap[this.$route.params.id].content,deleteUid)
     this.SaveChange();
    },
    AddNode(x, y) {
      let startx = x;
      let starty = y;
      if (!startx) {
        startx = 10;
      }
      if (!starty) {
        starty = 10;
      }
      let uuid = this.$root.uuid.v4();
      let n = {
        x: startx,
        y: starty,
        width: 200,
        height: 200,
        linksIn : {},
        linksOut : {},
      };
     // console.log(uuid, n);

      this.$set(
        this.$root.shadowDB.Mindmap[this.$route.params.id].content,
        uuid,
        n
      );
      this.SaveChange();
    },
    SaveChange() {
      this.$root.UpdateRecord(
        "Mindmap",
        this.$route.params.id,
        this.$root.shadowDB.Mindmap[this.$route.params.id]
      );
    },
  },
};
</script>

<style scoped >
  .fab-container {
    position: fixed;
    bottom: 0;
    right: 0;
    width:100%
  }
.lineDraw {
  position: absolute;
    background-color: var(--c6);
  height: 5px;
  cursor : pointer
}

.lineDrawing {
  position: absolute;
  background-color: var(--c6);
  height: 2px;
}

#scroller {
  position: absolute;
  top: 50px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  overflow: scroll;
}
.card {
  position: absolute;
}
.tophover {
  z-index: 999999 !important;
}
.drag {
  text-align: right;
  cursor: pointer;
}
</style>