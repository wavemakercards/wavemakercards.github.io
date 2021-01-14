<template>
  <v-main>
    <!-- needs to make sure its loaded -->
    <div v-if="!$root.shadowDB.Gridplanner[$route.params.id]">
      loading ...
    </div>
    <div v-else>
      <v-row no-gutters align="center" justify="center">
        <v-col cols="12" sm="12" md="6">
          <v-text-field
            label="Title"
            v-model="$root.shadowDB.Gridplanner[$route.params.id].title"
            solo
            @change="SaveChange()"
          ></v-text-field>
          <v-btn @click="AddColumn"> Add Column</v-btn>
          <v-btn @click="AddRow"> Add Row</v-btn>
        </v-col>
      </v-row>
      <div class="scroller">
        <!-- the header row -->
        <div
          :style="{
            width: TableWidth + 'px',
          }"
          class="headerRow"
        >
          <draggable
            v-model="
              $root.shadowDB.Gridplanner[$route.params.id].content.headers
            "
            handle=".handle"
            @change="HeaderRearrange"
          >
            <transition-group
              type="transition"
              name="flip-list"
              class=""
              tag="div"
            >
              <div
                class="tableBlock handle"
                v-for="(header, headerindex) in $root.shadowDB.Gridplanner[
                  $route.params.id
                ].content.headers"
                :key="headerindex"
                scope="headings"
              >
                <v-textarea
                  auto-grow
                  rows="1"
                  flat
                  solo
                  v-model="
                    $root.shadowDB.Gridplanner[$route.params.id].content
                      .headers[headerindex]
                  "
                  @change="SaveChange()"
                  class="centerText"
                ></v-textarea>
              </div>
            </transition-group>
          </draggable>
        </div>
        <!-- / the header row -->
        <hr />
        <!-- a row -->
        <draggable
          v-model="
            $root.shadowDB.Gridplanner[$route.params.id].content.rowtitle
          "
          handle=".rowhandle"
          @change="RowRearrange"
        >
          <transition-group
            type="transition"
            name="flip-list"
            class=""
            tag="div"
          >
            <div
              class="rowholder"
              :style="{
                width: TableWidth + 'px',
                'vertical-align': 'top',
              }"
              v-for="(row, rowindex) in $root.shadowDB.Gridplanner[
                $route.params.id
              ].content.rowtitle"
              :key="rowindex"
            >
              <div class="tableBlock rowhandle">
                <div>
                  <v-textarea
                    auto-grow
                    rows="1"
                    flat
                    solo
                    v-model="
                      $root.shadowDB.Gridplanner[$route.params.id].content
                        .rowtitle[rowindex]
                    "
                    @change="SaveChange()"
                    class="centerText"
                  ></v-textarea>
                </div>
              </div>
              <!-- a box -->
              <div
                class="tableBlock"
                v-for="(header, headerindex) in $root.shadowDB.Gridplanner[
                  $route.params.id
                ].content.headers"
                :key="headerindex"
              >
                <draggable
                  v-model="
                    $root.shadowDB.Gridplanner[$route.params.id].content.list[
                      rowindex
                    ][headerindex]
                  "
                  handle=".boxhandle"
                  group="boxes"
                  @change="BoxDrag"
                >
                  <transition-group
                    type="transition"
                    name="flip-list"
                    class=""
                    tag="div"
                  >
                    <v-card
                      class="ma-1"
                      v-for="(card, cardIndex) in $root.shadowDB.Gridplanner[
                        $route.params.id
                      ].content.list[rowindex][headerindex]"
                      :key="cardIndex"
                    >
                      <v-card-text>
                        <div class="boxhandle">
                          <v-icon>drag_handle</v-icon>
                        </div>
                        <CardEditor :uuid="card" />
                      </v-card-text>
                    </v-card>
                  </transition-group>
                </draggable>

                <v-btn
                  @click="AddCard(rowindex, headerindex)"
                  style="width: 340px; margin-left: 5px"
                  tile
                  ><v-icon>add</v-icon></v-btn
                >
              </div>
            </div>
          </transition-group>
          <!-- /a box -->
        </draggable>

        <!-- /a row -->
      </div>
    </div>
  </v-main>
</template>

<script>
import draggable from "vuedraggable";
import CardEditor from "@/tools/generic/CardEditor.vue";
export default {
  components: {
    CardEditor,
    draggable,
  },
  computed: {
    TableWidth() {
      return (
        (this.$root.shadowDB.Gridplanner[this.$route.params.id].content
          .headers.length +
          2) *
        350
      );
    },
  },
  methods: {
    AddColumn() {
      this.$root.shadowDB.Gridplanner[
        this.$route.params.id
      ].content.headers.push("New");

      let mylist = this.$root.shadowDB.Gridplanner[this.$route.params.id]
        .content.list;
      mylist.forEach((element) => {
        element.push([]);
      });
      this.SaveChange();
    },
    AddRow() {
      this.$root.shadowDB.Gridplanner[
        this.$route.params.id
      ].content.rowtitle.push("New");

      let newrow = [];
      let mylist = this.$root.shadowDB.Gridplanner[this.$route.params.id]
        .content.headers;
      mylist.forEach(() => {
        newrow.push([]);
      });
      this.$root.shadowDB.Gridplanner[
        this.$route.params.id
      ].content.list.push(newrow);
      this.SaveChange();
    },
    HeaderRearrange(e) {
      //for the header changes I need to reposition each element in the array of arrays
      let mylist = this.$root.shadowDB.Gridplanner[this.$route.params.id]
        .content.list;
      mylist.forEach((element) => {
        element.splice(
          e.moved.newIndex,
          0,
          element.splice(e.moved.oldIndex, 1)[0]
        );
      });
      this.SaveChange();
    },
    RowRearrange(e) {
      // we need to reposition the list of lists as well
      let mylist = this.$root.shadowDB.Gridplanner[this.$route.params.id]
        .content.list;
      mylist.splice(e.moved.newIndex, 0, mylist.splice(e.moved.oldIndex, 1)[0]);
      this.SaveChange();
    },
    BoxDrag() {
      //should work with simple save change
      this.SaveChange();
    },
    AddCard(rowindex, headerindex) {
      let uuid = this.$root.uuid.v4();
      this.$root.shadowDB.Gridplanner[this.$route.params.id].content.list[
        rowindex
      ][headerindex].push(uuid);
      this.SaveChange();
    },

    removeMe(index) {
      if (confirm("you sure?")) {
        this.$root.shadowDB.Gridplanner[this.$route.params.id].content.splice(
          index,
          1
        );
        this.SaveChange();
      }
    },
    SaveChange() {
      this.$root.UpdateRecord(
        "Gridplanner",
        this.$route.params.id,
        this.$root.shadowDB.Gridplanner[this.$route.params.id]
      );
    },
  },
};
</script>

<style scoped>
/* This provides a scrollable window around the elements */
.scroller {
  position: absolute;
  top: 150px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  overflow: scroll;
}
.centerText >>> textarea {
  text-align: center;
}
.handle {
  cursor: move;
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
  width: 200px;
}
.tableBlock {
  width: 350px;
  min-height: 20px;
  display: inline-block;
  vertical-align: middle;
}
.headerRow {
  padding-left: 350px;
}
.boxhandle {
  text-align: right;
  cursor: move;
}
.heady {
  width: 350px;
  text-align: center;
  color: #fff;
  background-color: #424242;
  cursor: move;
}
.rowhandle {
  width: 350px;
  cursor: move;
}
</style>