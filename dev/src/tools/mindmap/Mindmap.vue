<template>
 <v-main>
    <v-container>
    <v-row no-gutters  justify="center">
      <h1>Your Mindmaps</h1>
    </v-row>

  <v-row no-gutters align="center" justify="center">

   <v-col
        v-for="(mindmap, index) in $root.shadowDB.Mindmap"
        :key="index"
        cols="12" 
      >
      <v-card
           class="ma-2"
        outlined
      >
     
      <v-card-title>{{ mindmap.title }}</v-card-title>
        <v-card-actions>
     
<v-btn  color="success" class="ma-2" @click="$router.push('/mindmap/' + mindmap.uuid)"
          >Edit <v-icon>edit</v-icon> </v-btn>


          <v-btn
            @click="DeleteMe(mindmap.uuid)"
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
    </v-row>
    <v-row>
        <v-btn fab :style="{left: '50%', transform:'translateX(-50%)'}" large @click="NewItem()"> <v-icon> add </v-icon></v-btn>
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
      n.title = "";
      // horizontal and vertical arrays labels
   n.uuid =uuid
      n.content = {};
      this.$root.AddRecord("Mindmap", n);
      this.$router.push('/mindmap/'+ uuid)
    },
    DeleteMe(myKey) {
      if (confirm("sure?")) {
        this.$root.DeleteRecord("Mindmap", myKey);
      }
    },
  },
};
</script>