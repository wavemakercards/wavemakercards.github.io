<template>

  <v-container>
     <!-- needs to make sure its loaded -->
  <div v-if="!$root.shadowDB.Planningboard[$route.params.id]">
    loading ...
  </div>
  <div v-else>
    <v-row no-gutters align="center" justify="center">
      <v-col cols="12" sm="12" md="6">
        <v-text-field
          label="Title"
          v-model="$root.shadowDB.Planningboard[$route.params.id].title"
          solo
          @change="SaveChange()"
        ></v-text-field>
      </v-col>
    </v-row>


<v-row>
<!-- header row -->
  <draggable v-model="$root.shadowDB.Planningboard[$route.params.id].content.headers">
    <transition-group type="transition" name="flip-list" tag="div" class="headingRow">
        <div
          class="heady"
          v-for="header in $root.shadowDB.Planningboard[$route.params.id].content.headers"
          :key="header"
          scope="col"
        >{{ header }}</div>
      </transition-group>
    </draggable>

</v-row>
<v-row>
  <draggable v-model="$root.shadowDB.Planningboard[$route.params.id].content.list" handle=".handle">
      <transition-group type="transition" name="flip-list">
        <div class="row" v-for="(item, index) in $root.shadowDB.Planningboard[$route.params.id].content.list" :key="index">
          <div class="handle">
            <div class="rotate90">{{$root.shadowDB.Planningboard[$route.params.id].content.rowtitle[index]}}</div>
          </div>
          <div class="cardy" v-for="(header, colindex) in $root.shadowDB.Planningboard[$route.params.id].content.headers" :key="header">
              {{item.uuid}} - {{colindex}}
           <!--

                <TextEditor
              :uuid="item.uuid"
              :listIndex="index"
              :colIndex="colindex"
              @UpdateCardList="UpdateCardList"
            />
            -->
          </div>
        </div>
      </transition-group>
    </draggable>






</v-row>




  </div>

  </v-container>
</template>

<script>
import draggable from "vuedraggable";
//import TextEditor from "@/tools/generic/TextEditor.vue";
export default {
  components:{
  //  TextEditor,
    draggable
  },
  methods: {
    AddPlanningboardNode(){    
      this.$root.shadowDB.Planningboard[this.$route.params.id].content.push({uuid : this.$root.uuid.v4()})
      this.SaveChange()
    },
    removeMe(index) {
      if(confirm("you sure?")){
      this.$root.shadowDB.Planningboard[this.$route.params.id].content.splice(index, 1);
      this.SaveChange()
      }
    },
        SaveChange() {
      this.$root.UpdateRecord(
        "Planningboard",
        this.$route.params.id,
        this.$root.shadowDB.Planningboard[this.$route.params.id]
      );
    },
  }
};
</script>

<style scoped>
.rotate90 {
  margin: 20px;
  transform: rotate(-90deg);
  /* Legacy vendor prefixes that you probably don't need... */
  /* Safari */
  -webkit-transform: rotate(-90deg);
  /* Firefox */
  -moz-transform: rotate(-90deg);
  /* IE */
  -ms-transform: rotate(-90deg);
  /* Opera */
  -o-transform: rotate(-90deg);
  /* Internet Explorer */
  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=9);
}

.buttons {
  margin-top: 35px;
}
.heady {
  width: 300px;
  text-align: center;
  color: #fff;
  background-color: #424242;
  padding: 10px;
  cursor: move;
}
.headingRow {
  padding-left: 70px;
}
.cardy {
  width: 300px;
  min-height: 150px;
  padding: 10px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
  width: 200px;
}
.scrollingWindow {
  width: 1500px;
}
.handle {
  width: 70px;
  background-color: #424242;
  color: #fff;
  cursor: move;
}
</style>


