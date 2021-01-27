<template>
 <v-main>
    <v-container fluid>
    <v-row no-gutters align="center" justify="center">
      <v-col  align="center" justify="center">
      <h1>Your Manuscripts</h1>
      </v-col>
    </v-row>
    <v-row no-gutters  >

   <v-col
        v-for="(writer, index) in $root.shadowDB.Writer"
        :key="index"
        cols="12" sm="6"  md="4" 
      >
      <v-card
           class="ma-2"
        outlined
      >
                <v-card-actions>
          <v-btn
            @click="DeleteMe(writer.uuid)"
            
          small
            class="error"
          
          >
            <v-icon>delete</v-icon>
          </v-btn>
        </v-card-actions>
      <v-card-title>{{ writer.title }}</v-card-title>
      <v-card-text> {{ writer.author }}</v-card-text>
        <v-card-actions>
     
<v-btn  color="success" class="ma-2" @click="$router.push('/writer/' + writer.uuid)"
          >Edit <v-icon>edit</v-icon> </v-btn>


<v-btn  color="info" class="ma-2" @click="$router.push('/planningboard/' + writer.uuid)"
          >Notes <v-icon>comment</v-icon> </v-btn>

       </v-card-actions>
   
      </v-card>

   </v-col>
    </v-row>
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
      n.author = "";
      n.files = [
        {
          type: "folder",
          name: "Welcome",
          uuid: this.$root.uuid.v4(),
          files: [],
          open: true,
          active: false,
        },
      ];
      this.$root.AddRecord("Writer", n);
         this.$router.push('/writer/'+ uuid)
    },
    DeleteMe(myKey) {
      if (confirm("sure?")) {
        this.$root.DeleteRecord("Writer", myKey);
      }
    },
  },
};
</script>
