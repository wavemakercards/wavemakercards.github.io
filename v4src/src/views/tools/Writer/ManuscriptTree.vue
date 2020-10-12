<style scoped>
.sticky {
  position: sticky;
  top: 0px;
  z-index: 1;
  height:48px;
  padding:0px;
}
</style>
<template>
  <div >
    <v-row class="sticky pa-0"  >
      <v-col align="right" class="pa-0 ma-1">
        <v-btn fab  elevation="0"  dark color="purple" class="mr-3 pa-0" small  @click="AddManuscriptTreeItem('folder')">
          <v-icon>create_new_folder</v-icon>
        </v-btn>
        <v-btn fab small  dark elevation="0"  color="purple" class="mr-3"  @click="AddManuscriptTreeItem('file')">
          <v-icon>note_add</v-icon>
        </v-btn>
      </v-col>
    </v-row>
 <v-list dense>
    <ManuscriptTreeItem
      :FileList="$root.system.writer.FileList"
      @input="ChangeDetected"
    />
 </v-list>
  </div>
</template>

<script>
import ManuscriptTreeItem from "./ManuscriptTreeItem";

export default {
  components: {
    ManuscriptTreeItem
  },
  methods: {
    ChangeDetected() {
    this.$root.SaveManuscriptData()
    },
    FindNodeByID: function(uuid, parentObj) {
            let el = false
            let arrtosearch = parentObj.FileList
            arrtosearch.some((element, index) => {
                if (element.uuid === uuid) {
                    el = {}
                    el.parentObj = parentObj
                    el.index = index
                    return true
                } else {
                    if (element.FileList && !el) {
                        el = this.FindNodeByID(uuid, element)
                    }
                }
            });
            return el
        },
    AddManuscriptTreeItem(payload) {
      let uuid = this.$root.uuid.v1();
      let newObj = {
        uuid: uuid,
        icon: payload,
        title : ''
      };
      if (payload === "folder") {
        newObj.open = true;
        newObj.FileList = [];
      }

      if (this.$root.system.writer.SelectedCard.uuid) {
        if (this.$root.system.writer.SelectedCard.icon === "folder") {
          this.$root.system.writer.SelectedCard.open = true;
          this.$root.system.writer.SelectedCard.FileList.push(newObj);
        } else {
          let pos = this.FindNodeByID(
            this.$root.system.writer.SelectedCard.uuid,
            this.$root.system.writer
          );
         pos.parentObj.FileList.splice(pos.index + 1, 0, newObj);
        }
      } else {
        this.$root.system.writer.FileList.push(newObj);
      }
      // item Added so SAVE the project Info
  this.$root.SaveManuscriptData();
    }
  }
};
</script>

