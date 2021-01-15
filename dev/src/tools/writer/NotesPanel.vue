<template>
  <div>
    <v-app-bar dense class="sticky" color="c9" elevation="0">
      <v-spacer></v-spacer>
      <v-btn icon @click="addNote($root.writer.activenode)">
        <v-icon>add_comment</v-icon>
      </v-btn>
    </v-app-bar>

    <draggable
      v-model="$root.writer.activenode.notes"
      handle=".boxhandle"
      group="boxes"
      @change="SaveChange"
    >
      <transition-group type="transition" name="flip-list" class="" tag="div">
        <v-card
          class="ma-4 pa-2"
          v-for="(card, cardIndex) in $root.writer.activenode.notes"
          :key="cardIndex"
        >
          <div class="boxhandle">
            <v-icon>drag_handle</v-icon>
          </div>
          <CardEditor :uuid="card.uuid" />
        </v-card>
      </transition-group>
    </draggable>
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
      this.SaveChange();
    },
    SaveChange() {
      this.$root.UpdateRecord(
        "Writer",
        this.$route.params.id,
        this.$root.shadowDB.Writer[this.$route.params.id]
      );
    },
  },
};
</script>


<style scoped>
.sticky {
  position: sticky;
  top: 0px;
  z-index: 2;
}

.boxhandle {
  text-align: right;
  cursor: move;
}

.handle {
  cursor: move;
}
.flip-list-move {
  transition: all 0.5s;
}
.no-move {
  transition: all 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
  width: 200px;
}
</style>