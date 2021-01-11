<template>
 <v-main>
    <v-container>
          <h1>Database</h1>
    <v-row >
         <v-col cols="12" sm="6" md="4" lg="3" v-for="(databaseItem, index) in $root.shadowDB.Cards"
        :key="index">
      <v-card
        class="mx-auto mb-2"
        outlined
       >
      <v-card-title>
          {{ databaseItem.title }}
      </v-card-title>
      <v-card-text>
          {{ databaseItem.content }}
      </v-card-text>
        <v-card-actions>
   
        </v-card-actions>
      </v-card>
      </v-col>

    </v-row>
          <v-btn large > <v-icon> add </v-icon> Add New </v-btn>
  </v-container>
   </v-main>
</template>

<script>
export default {
 
};
</script>