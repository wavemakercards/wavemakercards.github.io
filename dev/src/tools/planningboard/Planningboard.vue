<template>
 <v-main>
    <v-container>
    <v-row no-gutters align="center" justify="center">
      <h1>Your Manuscripts (Planning Boards)</h1>
      <v-card
        class="mx-auto mb-2"
        outlined
        width="100%"
        v-for="(writer, index) in $root.shadowDB.Writer"
        :key="index"
      >
        <v-card-actions>
          <v-btn
            color="primary"
            text
            @click="$router.push('/planningboard/' + writer.uuid)"
          >
            <span v-if="writer.title">
              {{ writer.title }} by   {{ writer.author }}
            </span>
            <span v-else> ....... </span>
          </v-btn>

        
        </v-card-actions>
      </v-card>

    </v-row>
  </v-container>
   </v-main>
</template>

<script>
/*
This page should not really be used so I'm redirecting people to the writer tool instead in the router as it's effectively the same  page
*/
export default {
};
</script>