<template>
  <div style="padding-left:68px;">
    <SideMenu hilight="writer" />
    <v-navigation-drawer v-model="drawer" mobile-breakpoint="xs" app class="slideDraw">
      <ManuscriptTree />
    </v-navigation-drawer>

    <v-navigation-drawer v-model="NotesPanel" app right>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-email</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
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

      <h1
        v-if="$root.system.writer.SelectedCard.uuid && $root.system.writer.SelectedCard.icon != 'file' "
      >This is a Folder</h1>
    </v-main>
  </div>
</template>
<script>
import SideMenu from "./../../tools/$$Shared/SideMenu";
import ManuscriptTree from "./../$$Shared/ManuscriptTree";
import TextEditor from "./../$$Shared/TextEditor";

export default {
  components: {
    ManuscriptTree,
    TextEditor,
    SideMenu,
  },
  data: () => ({
    drawer: null,
    NotesPanel: null,
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
@media only screen and (min-width: 600px) {
  .slideDraw {
    margin-left: 57px;
  }
}
</style>