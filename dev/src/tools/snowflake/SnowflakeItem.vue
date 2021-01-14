<template>
  <v-main>
    <v-container>
      <!-- needs to make sure its loaded -->
      <div v-if="!$root.shadowDB.Snowflake[$route.params.id]">loading ...</div>
      <div v-else>



        <v-row no-gutters align="center" justify="center">
          <v-col cols="12" sm="12" md="6">
            <v-text-field
              label="Title"
              v-model="$root.shadowDB.Snowflake[$route.params.id].title"
              solo
              @change="SaveChange()"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row
          no-gutters
          align="center"
          justify="center"
          v-for="(row, rowindex) in $root.shadowDB.Snowflake[$route.params.id]
            .content"
          :key="rowindex"
        >
          <v-col cols="12" sm="6">
            <v-card class="mb-10 mr-5" max-width="100%" outlined>
              <v-btn
                rounded
                fab
                absolute
                top
                right
                x-small
                color="primary"
                @click="openRow(row)"
                ><v-icon style="transform: rotate(90deg)"
                  >call_split</v-icon
                ></v-btn
              >
              <v-card-text>
                <CardEditor :uuid="row.uuid" editmode="inline" />
              </v-card-text>
            </v-card>
          </v-col>

          <v-fade-transition>
            <v-col cols="12" sm="6" v-if="row.isopen">
              <v-card
                color="c8"
                class="ms-5 mb-10"
                max-width="100%"
                outlined
                v-for="(subcard, subindex) in row.children"
                :key="subindex"
              >
                <v-card-text>
                  <CardEditor :uuid="subcard.uuid" editmode="inline" />
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    fab
                    color="error"
                    x-small
                    absolute
                    bottom
                    left
                    @click="deleteSub(row, rowindex)"
                    ><v-icon>delete</v-icon></v-btn
                  >
                </v-card-actions>
              </v-card>
              <div class="ma-4 mb-10" align="center">
                <v-btn
                  @click="replaceMe(row, rowindex)"
                  fab
                  x-small
                  color="success"
                >
                  <v-icon>check</v-icon>
                </v-btn>

                <v-btn @click="extraCard(row)" fab x-small color="accent">
                  <v-icon>add</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-fade-transition>
        </v-row>
      </div>
    </v-container>
  </v-main>
</template>

<script>
import CardEditor from "@/tools/generic/CardEditor.vue";
export default {
  components: {
    CardEditor,
  },
  methods: {
    openRow(r) {
      if (r.children.length === 0) {
        r.children.push({
          uuid: this.$root.uuid.v4(),
          parent: this.$route.params.id,
          children: [],
          isopen: false,
        });
        r.children.push({
          uuid: this.$root.uuid.v4(),
          parent: this.$route.params.id,
          children: [],
          isopen: false,
        });
        r.children.push({
          uuid: this.$root.uuid.v4(),
          parent: this.$route.params.id,
          children: [],
          isopen: false,
        });
      }
      r.isopen = !r.isopen;
      this.SaveChange();
    },
    extraCard(r) {
      r.children.push({
        uuid: this.$root.uuid.v4(),
        parent: this.$route.params.id,
        children: [],
        isopen: false,
      });
      this.SaveChange();
    },
    deleteSub(r, index) {
      if (confirm("you sure?")) {
        r.children.splice(index, 1);
        this.SaveChange();
      }
    },
    replaceMe(row, rowindex) {
      if (confirm("you sure?")) {
        this.$root.shadowDB.Snowflake[this.$route.params.id].content.splice(
          rowindex,
          1,
          ...row.children
        );
        this.SaveChange();
      }
    },
    SaveChange() {
      this.$root.UpdateRecord(
        "Snowflake",
        this.$route.params.id,
        this.$root.shadowDB.Snowflake[this.$route.params.id]
      );
    },
  },
};
</script>