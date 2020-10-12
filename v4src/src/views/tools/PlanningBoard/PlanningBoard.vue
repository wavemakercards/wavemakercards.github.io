<template>
  <div class="minPad" :class="{'addPadd' : drawer }">
    <SideMenu hilight="planningboard" />
    <v-navigation-drawer v-model="NotesPanel" app right>side</v-navigation-drawer>

    <v-app-bar app dense clipped-left flat>
      <v-spacer></v-spacer>
      <img src="@/assets/wavemaker.svg" width="25" />
      <v-app-bar-nav-icon @click.stop="NotesPanel = !NotesPanel"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-main>
        <div class="columnholder">
      <div :style="{width : GetWidth }">
        <div class="pb_col" v-for="(col,i) in ColumnFiles" :key="i">
          <Column :obj="col" />
        </div>
      </div>
        </div>
    </v-main>
  </div>
</template>
<script>
import SideMenu from "./../../tools/$$Shared/SideMenu";
import Column from "./column";
export default {
  components: {
    SideMenu,
    Column,
  },
  computed: {
    GetWidth() {
      var w = 320 * this.ColumnFiles.length;
      return  w + "px";
    },
  },
  data: () => ({
    drawer: null,
    NotesPanel: null,
    ColumnFiles: [],
  }),
  methods: {
    GetFilesFromManuscript: function (parentObj) {
      let arrtosearch = parentObj.FileList;
      arrtosearch.some((element) => {
        if (element.icon === "file") {
          this.ColumnFiles.push(element);
        } else {
          if (element.FileList) {
            this.GetFilesFromManuscript(element);
          }
        }
      });
      console.log(this.ColumnFiles);
    },
  },
  beforeMount() {
    this.$root.db.ManuscriptData.get({
      id: 1,
    })
      .then((result) => {
        return result;
      })
      .then((data) => {
        if (data) {
          this.$root.system.writer = JSON.parse(data.state);
          this.GetFilesFromManuscript(this.$root.system.writer);
        } else {
          this.$root.system.writer = {
            SelectedCard: { uuid: null },
            FileList: [],
          };
        }
      });
  },
};
</script>

<style scoped>
.columnholder{
    position: fixed;
    top:48px;
    right:0px;
    left:56px;
    bottom:0px;
    background-color: #ffffff55;
     overflow-x:scroll;
}
.pb_col {
    padding: 10px;
    margin:5px;
  width: 310px;
  min-height: 400px;
  float: left;
  height: 100%;
}
.slideDraw {
  margin-left: 57px;
}
.addPadd {
  padding-left: 68px;
}
.minPad {
  margin-left: 48px;
}
</style>