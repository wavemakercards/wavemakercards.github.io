<template>
  <div class="notecol">
    <div class="colheader" v-if="$root.shadowDB.ManuscriptCards[mynode.uuid] && $root.shadowDB.ManuscriptCards[mynode.uuid].title">{{$root.shadowDB.ManuscriptCards[mynode.uuid].title}}</div>
    <div class="colheader" v-else><em style="opacity:50%">New Card</em></div>
 <draggable
                  v-model="mynode.notes"
                  handle=".boxhandle"
                  group="boxes"
                  @change="BoxDrag"
                >
                  <transition-group
                    type="transition"
                    name="flip-list"
                    class=""
                    tag="div"
                  >


          <v-card
                      class="ma-4 pa-2"
                      v-for="(card, cardIndex) in mynode.notes"
                      :key="cardIndex"
                    >
                  
                        <div class="boxhandle">
                          <v-icon>drag_handle</v-icon>
                        </div>
                        <CardEditor :uuid="card.uuid" />
                   
                    </v-card>
        </transition-group>
                </draggable>
                   <div class="button-holder">
          <v-btn @click="addNote(mynode)" color="primary" x-small fab right >
      <v-icon>add</v-icon>
    </v-btn>
      </div>
    <AddCardWidget v-if="showModal" @close-modal="closeModal" />
  </div>
</template>

<script>
import draggable from "vuedraggable";
import CardEditor from "@/tools/generic/CardEditor.vue";
import AddCardWidget from "@/tools/generic/AddCardWidget.vue";
export default {
      components: {
    CardEditor,
    draggable,
    AddCardWidget
  },
  data(){
    return{
      selectedColumn : null,
      showModal : false,
    }
  },
  props: {
    mynode: Object,
  },
  methods: {
    addNote(o) {
      this.$root.addcard.currentnode = o;
      console.log(o);
      this.showModal =  true
    },
    closeModal(){
      this.showModal =  false
      console.log("closed")
    },

      BoxDrag() {
      //should work with simple save change
      this.SaveData();
    },
    SaveData() {
      this.$root.UpdateRecord(
        "Writer",
      this.$route.params.id,
        this.$root.shadowDB.Writer[
       this.$route.params.id
        ]
      );
    },
  },
};
</script>

<style scoped>
.colheader{
  text-align: center;
}
.notecol {
  width: 360px;
  padding: 0px;
  display: inline-block;
  margin: 5px;
  height: 100%;
  position: relative;
  vertical-align: top;
}
.button-holder{
 text-align: right;
 margin-bottom: 5px;
 position: sticky;
 top:0px;
}
.boxhandle {
  text-align: right;
  cursor: move;
}

.handle {
  cursor: move;
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
</style>