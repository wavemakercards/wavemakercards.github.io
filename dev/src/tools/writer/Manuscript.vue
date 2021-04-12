<template>
  <div>
    <v-app-bar dense class="sticky" color="c9"
         elevation="0">
      <v-btn class="addbtn" elevation="0" tile @click="addFolder" icon v-if="$root.writer.activenode.type!=='file'"
        ><v-icon>create_new_folder</v-icon></v-btn
      >
      <v-btn class="addbtn" elevation="0" tile @click="addText" icon v-if="$root.writer.activenode.type!=='file'"><v-icon>playlist_add</v-icon></v-btn
      >
    </v-app-bar>
    <v-list dense>


 <v-list-item link  :class="{ accent : (!$root.writer.activenode.uuid )}"  @click="selectHome()">
      <v-list-item-action >
          <v-icon >home</v-icon> 
        </v-list-item-action>

        <v-list-item-content  >
          <v-list-item-title v-if="$root.shadowDB.Writer[$route.params.id].title" >{{$root.shadowDB.Writer[$route.params.id].title }}</v-list-item-title>
            <v-list-item-title v-else ><em style="opacity:30%">Manuscript Title</em></v-list-item-title>
        </v-list-item-content>

      </v-list-item>


      <ManuscriptItem
        :list="
          $root.shadowDB.Writer[$route.params.id]
        "
      />
    </v-list>
  </div>
</template>

<script>
import ManuscriptItem from "./ManuscriptItem";
export default {
  components: {
    ManuscriptItem,
  },
  data: () => ({
    drawer: true,
  }),
  methods: {
    selectHome(){
      this.$root.writer.activenode ={}
    },
    addFolder() {
      let obj = {
        type: "folder",
        name: "",
        uuid: this.$root.uuid.v4(),
        files: [],
        open: true,
        active: false,
      };
      if (this.$root.writer.activenode.uuid) {
        this.$root.writer.activenode.open = true
        this.$root.writer.activenode.files.push(obj);
      } else {
        console.log(this.$route.params.id)
        this.$root.shadowDB.Writer[this.$route.params.id].files.push(obj);
      }
      this.SaveData();
    },

    addText() {
      let obj = {
        type: "file",
        uuid: this.$root.uuid.v4(),
        notes : [],
        active: false,
      };

      if (this.$root.writer.activenode) {
        if (this.$root.writer.activenode.type === "folder") {
          // push into the folders list
         this.$root.writer.activenode.open = true
          this.$root.writer.activenode.files.push(obj);
          this.SaveData();
        }
      } else {
        this.$root.shadowDB.Writer[this.$route.params.id].files.push(obj);
        this.SaveData();
      }
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
.sticky {
  position: sticky;
  top: 0px;
  z-index: 999;
}
.addbtn {
  width: 50%;
  display: inline-block;
}
</style>