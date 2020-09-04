<template>
  <div style="padding-left:68px;">
    <SideMenu hilight="writer" />
    <v-navigation-drawer v-model="drawer" mobile-breakpoint="xs" clipped app class="slideDraw">
      <ManuscriptTree />
    </v-navigation-drawer>

    <v-app-bar app dense clipped-left>
      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon v-if="drawer">mdi-folder</v-icon>
        <v-icon v-if="!drawer">mdi-folder-move</v-icon>
      </v-btn>
      <v-toolbar-title>{{$root.system.project.title}} - {{$root.system.project.author}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <img src="@/assets/wavemaker.svg" width="25" />
    </v-app-bar>

    <v-main>
      <TextEditor
        :myId="$root.system.writer.SelectedCard.uuid"
        v-if="$root.system.writer.SelectedCard.uuid"
      />
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