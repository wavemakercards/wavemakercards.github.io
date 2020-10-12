<template>
  <div class="minPad" :class="{'addPadd' : drawer }" >
    
    <SideMenu hilight="writer" />
    <v-navigation-drawer v-model="drawer" mobile-breakpoint="xs" app class="slideDraw">
      <ManuscriptTree />
    </v-navigation-drawer>

    <v-navigation-drawer v-model="NotesPanel" app right>
    
    <NoteCards  :myId="$root.system.writer.SelectedCard.uuid"  :key="'Note'+$root.system.writer.SelectedCard.uuid" />
       
    </v-navigation-drawer>

    <v-app-bar app dense clipped-left flat>
      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon v-if="drawer">mdi-folder</v-icon>
        <v-icon v-if="!drawer">mdi-folder-move</v-icon>
      </v-btn>

      <v-spacer></v-spacer>
      <img src="@/assets/wavemaker.svg" width="25" />
      <v-app-bar-nav-icon @click.stop="NotesPanel = !NotesPanel"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-main>
      <TextEditor
        :myId="$root.system.writer.SelectedCard.uuid"
        v-if="$root.system.writer.SelectedCard.uuid && $root.system.writer.SelectedCard.icon === 'file' "
        :key="$root.system.writer.SelectedCard.uuid"
      />
   <FolderEditor
        :myId="$root.system.writer.SelectedCard.uuid"
        v-if="$root.system.writer.SelectedCard.uuid && $root.system.writer.SelectedCard.icon === 'folder' "
        :key="$root.system.writer.SelectedCard.uuid"
      />

    </v-main>
  </div>
</template>
<script>
import SideMenu from "./../../tools/$$Shared/SideMenu";
import TextEditor from "./../$$Shared/TextEditor";
import NoteCards from "./NoteCards";
import FolderEditor from "./FolderEditor";
import ManuscriptTree from "./ManuscriptTree";

export default {

 components: {
    ManuscriptTree,
    TextEditor,
    FolderEditor,
    SideMenu,
    NoteCards
  },
  data: () => ({
    drawer: null,
    NotesPanel: null
  }),
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
  .slideDraw {
    margin-left: 57px;
  }
  .addPadd{
   padding-left:68px;
   }
.minPad{
  margin-left:48px;
}
</style>