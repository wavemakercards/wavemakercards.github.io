<template>
 <v-main>
  <v-container>

        <v-row no-gutters  justify="center">
      <h1>Your Timelines</h1>
    </v-row>


   <v-col

        v-for="(timeline, index) in $root.shadowDB.Timeline"
        :key="index"
        cols="12" 
      >
      <v-card
           class="ma-2"
        outlined
      >
     
      <v-card-title>{{ timeline.title }}</v-card-title>
        <v-card-actions>
     
<v-btn  color="success" class="ma-2" @click="$router.push('/timeline/' + timeline.uuid)"
          >Edit <v-icon>edit</v-icon> </v-btn>


          <v-btn
            @click="DeleteMe(timeline.uuid)"
            icon
            absolute
            right
            top
            class="error"
          >
            <v-icon>delete</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>

   </v-col>
            <v-row>
        <v-btn fab   :style="{left: '50%', transform:'translateX(-50%)'}" large @click="NewItem()"> <v-icon> add </v-icon></v-btn>
    </v-row>
  </v-container>
   </v-main>
</template>

<script>
export default {
  methods: {
    NewItem() {
    let uuid=this.$root.uuid.v4();
      let n = {};
         n.uuid =uuid
      n.title = "";
      n.content = [];
      this.$root.AddRecord("Timeline", n);
       this.$router.push('/timeline/'+ uuid)
    },
    DeleteMe(myKey) {
      if (confirm("sure?")) {
        this.$root.DeleteRecord("Timeline", myKey);
      }
    },
  },
};
</script>