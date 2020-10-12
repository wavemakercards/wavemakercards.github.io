<template>
  <div>
    <v-row class="sticky pa-0">
      <v-col align="right" class="pa-0 ma-1">
        <v-btn fab small dark elevation="0" class="mr-3" @click="dialog=!dialog">
          <v-icon>mdi-plus-circle-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <div class="pa-4">
      <draggable
        class="list-group"
        tag="div"
        v-model="list"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <v-card
            class="mx-auto mb-3"
            max-width="344"
            flat
            outlined
            filled
            v-for="(element,index) in list"
            :key="index"
          >
            <v-card-text>
              <div>{{element.name}}</div>
              <p>adjective</p>
              <div class="text--primary">
                well meaning and kindly.
                <br />"a benevolent smile"
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="deep-purple accent-4">Learn More</v-btn>
            </v-card-actions>
          </v-card>
        </transition-group>
      </draggable>
    </div>

    <v-row justify="center">
      <v-dialog v-model="dialog" width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Add a Card</span>
          </v-card-title>
          <v-card-text>Lorem i</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>
            <v-btn color="green darken-1" text @click="addNoteCard()">Agree</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "transition-example-2",
  display: "Transitions",
  components: {
    draggable,
  },
  data() {
    return {
      dialog: false,
      list: [],
      drag: false,
    };
  },
  methods: {
    addNoteCard() {
      this.list.push({ name: "Chapter " + this.list.length });
      this.dialog = false;
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  beforeMount() {
    if (this.$root.system.writer.SelectedCard.ItemNotes) {
      this.list = this.$root.system.writer.SelectedCard.ItemNotes;
    } else {
      this.$root.system.writer.SelectedCard.ItemNotes = [];
      this.list = [];
    }
  },
};
</script>

<style>
.button {
  margin-top: 35px;
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
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
.sticky {
  position: sticky;
  top: 0px;
  z-index: 1;
  height: 48px;
  padding: 0px;
}
</style>