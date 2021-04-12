<template>
  <div>
    <v-dialog v-model="showModal1" width="500" persistent>
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon @click="closeModal()">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-title> Add New Card </v-card-title>

        <v-card-text>
          You can create a new card, or link to an existing one
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn text @click="showModal2 = true">
            <v-icon class="mr-3">link</v-icon> Link to a card
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn text @click="addUUidtolist()">
            <v-icon class="mr-3">queue</v-icon> Add a new card
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showModal2" fullscreen>
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon @click="showModal2 = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-title> Choose a card to link to </v-card-title>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
              v-for="(linkcard, linkindex) in $root.shadowDB.Cards"
              :key="linkindex"
            >
              <v-card>
                <h3>{{ linkcard.title }}</h3>
                <div
                  v-html="linkcard.content"
                  style="height: 200px; overflow-y: auto"
                ></div>
              </v-card>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="addUUidtolist(linkcard.uuid)">
                  <v-icon class="mr-3">link</v-icon> link this card
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-container>

        <v-card-text>
          You can create a new card, or link to an existing one
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="showModal2 = true">
            <v-icon class="mr-3">link</v-icon> Link to a card
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
export default {
  methods: {
    addCard() {
      console.log(this.$root.addcard.currentnode);
    },
    closeModal() {
      console.log("close emit");
      this.showModal1 = true;
      this.showModal2 = false;
      this.$emit("close-modal");
    },
    addUUidtolist(uuid) {
      let obj = {
        state: {},
      };
      if (!uuid) {
        obj.uuid = this.$root.uuid.v4();
      } else {
        obj.uuid = uuid;
      }
      console.log("Adding to ", this.$root.addcard.currentnode);
      if (!this.$root.addcard.currentnode.notes) {
        this.$root.addcard.currentnode.notes = [];
      }
      this.$root.addcard.currentnode.notes.push(obj);
      this.showModal1 = true;
      this.showModal2 = false;
      this.$set(
        this.$root.addcard.currentnode,
        "notes",
        this.$root.addcard.currentnode.notes
      );
      this.$root.addcard.currentnode = null;
      this.SaveData();
      this.$emit("close-modal");
    },
    SaveData() {
      this.$root.UpdateRecord(
        "Writer",
        this.$route.params.id,
        this.$root.shadowDB.Writer[this.$route.params.id]
      );
    },
  },
  data() {
    return {
      showModal1: true,
      showModal2: false,
    };
  },
  mounted() {
    this.showModal1 = true;
  },
};
</script>