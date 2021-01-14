<template>
  <div class="notecol">
    <div class="colheader" v-if="$root.shadowDB.Cards[mynode.uuid] && $root.shadowDB.Cards[mynode.uuid].title">{{$root.shadowDB.Cards[mynode.uuid].title}}</div>
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

  </div>
</template>

<script>
import draggable from "vuedraggable";
import CardEditor from "@/tools/generic/CardEditor.vue";
export default {
      components: {
    CardEditor,
    draggable,
  },
  props: {
    mynode: Object,
  },
  methods: {
    addNote(o) {
      console.log(o);
      let obj = {
        uuid: this.$root.uuid.v4(),
        state: {},
      };
      if (!o.notes) {
        o.notes = [];
      }
      o.notes.push(obj);

      this.$set(o, "notes", o.notes);
      this.SaveData();
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