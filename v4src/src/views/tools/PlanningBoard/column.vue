<template>
<div>
 <v-row class="sticky pa-0">
      <v-col align="right" class="pa-0 ma-1">
        <v-btn fab small dark elevation="0" class="mr-3" @click="dialog=!dialog">
          <v-icon>mdi-plus-circle-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>



    {{obj.title}}

  <draggable class="list-group ma-4" :list="list1" group="people" @change="log" v-if="list1.length ===0">
        <div
          class="list-group-item"
          v-for="(element, index) in list1"
          :key="element.name"
        >
          {{ element.name }} {{ index }}
        </div>
      </draggable>




    <div class="pa-4" >

      <draggable
      v-if="list1.length !=0"
        class="list-group"
        tag="div"
        v-model="list1"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
        group="people" @change="log"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <v-card
            class="mx-auto mb-3"
            max-width="344"
            flat
            outlined
            filled
            v-for="(element,index) in list1"
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
       props: {
        obj : Object
    },
name: "two-lists",
  display: "Two Lists",
  order: 1,
  components: {
    draggable
  },
  data() {
    return {
        dialog: false,
          drag: false,
      list1: [
        { name: "John", id: 1 },
        { name: "Joao", id: 2 },
        { name: "Jean", id: 3 },
        { name: "Gerard", id: 4 }
      ],
      list2: [
        { name: "Juan", id: 5 },
        { name: "Edgard", id: 6 },
        { name: "Johnson", id: 7 }
      ]
    };
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
  methods: {
        addNoteCard() {
      this.list.push({ name: "Chapter " + this.list1.length });
      this.dialog = false;
    },
    add: function() {
      this.list.push({ name: "Juan" });
    },
    replace: function() {
      this.list = [{ name: "Edgard" }];
    },
    clone: function(el) {
      return {
        name: el.name + " cloned"
      };
    },
    log: function(evt) {
      window.console.log(evt);
    }
  }
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
    border:1px solid #222;
    min-height: 100px;
  background-color: purple;
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