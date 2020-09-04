<template>
  <draggable
    v-bind="dragOptions"
    tag="div"
    :list="FileList"
    :delay="200"
    :delayOnTouchOnly="true"
    @change="emitter"
  >
    <div :key="el.uuid" v-for="(el, index) in FileList">
      <v-list-item  class="listitem" :class="{purple: (el.uuid === $root.system.writer.SelectedCard.uuid)}">
        <v-list-item-action class="mr-2"   v-if="el.icon==='folder' && !el.open" @click="el.open= !el.open">
          <v-icon>folder</v-icon>
        </v-list-item-action>

        <v-list-item-action class="mr-2" v-if="el.icon==='folder' && el.open" @click="el.open= !el.open">
          <v-icon >folder_open</v-icon>
        </v-list-item-action>

        <v-list-item-action class="mr-2"  v-if="el.icon==='file'">
          <v-icon>notes</v-icon>
        </v-list-item-action>

        <v-list-item-content @click="itemclick(el, index)">
          <v-list-item-title v-if="el.title">{{el.title}}</v-list-item-title>
          <v-list-item-title v-if="el.title ===''">
            <span class="gray">_____________</span>
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action v-if="el.hidden">
          <v-icon>check_box</v-icon>
        </v-list-item-action>
      </v-list-item>

      <div v-if="el.open">
       <ManuscriptTreeItem :FileList="el.FileList" @input="emitter" class="subfolder"/>
      </div>
    </div>
  </draggable>
</template>

<style scoped>
.subfolder {
  padding-left: 10px;
}
.subfolder:empty {
  padding: 5px;
  text-align: left;
  font-size: 0.5rem;
  margin-left: 20px;
}
.subfolder:empty::after {
  padding-left: 10%;
  content: "empty .... ";
}
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}
.listitem{
  margin-left:5px;
  border-radius: 10px 0px 0px 10px ;
  cursor: pointer;
}
.ghost {
  opacity: 0.5;
}
</style>

<script>
import draggable from "vuedraggable";
export default {
  name: "ManuscriptTreeItem",
  methods: {
    emitter(value) {
      console.log("emit")
      this.$emit("input", value);
    },
    itemclick(el, index) {
      el.index = index;
      // set it in the root variable - not using vuex I think!
      this.$root.system.writer.SelectedCard = el;
      this.$root.SaveManuscriptData();
    }
  },
  components: {
    draggable
  },
  data() {
    return {
      drag: null,
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  props: {
       FileList: {
      required: true,
      type: Array
    }
  }
};
</script>