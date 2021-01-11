<template>
 <v-main>
  <v-container>

        <v-row no-gutters  justify="center">
          <h1>Your Snowflakes</h1>
    </v-row>


   <v-col

        v-for="(snowflake, index) in $root.shadowDB.Snowflake"
        :key="index"
        cols="12" 
      >
      <v-card
           class="ma-2"
        outlined
      >
     
      <v-card-title>{{ snowflake.title }}</v-card-title>
        <v-card-actions>
     
<v-btn  color="success" class="ma-2" @click="$router.push('/snowflake/' + snowflake.uuid)"
          >Edit <v-icon>edit</v-icon> </v-btn>


          <v-btn
            @click="DeleteMe(snowflake.uuid)"
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
      n.content = [
        {
          parent: null,
          uuid: this.$root.uuid.v4(),
          children: [],
          isopen: false,
        },
      ];
      this.$root.AddRecord("Snowflake", n);
        this.$router.push('/snowflake/'+ uuid)
    },
    DeleteMe(myKey) {
      if (confirm("sure?")) {
        this.$root.DeleteRecord("Snowflake", myKey);
      }
    },
  },
};
</script>