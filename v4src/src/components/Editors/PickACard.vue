<template>
  <div>
      <h1>Pick A Card</h1>
   <v-row>
          <v-col>
            <v-text-field flat hide-details label="Search" prepend-inner-icon="search" />
          </v-col>
        </v-row>


<v-row v-if="database.length >0">
        <v-col class="col-12 col-sm-6 col-md-4 col-xl-3 " v-for="(item, index) in database" :key="index">
              {{item.title}}
        </v-col>
      </v-row>

  </div>
</template>

<script>
export default {
  data() {
    return {
      database: [],
      ItemList  : [],
      uuids : []
    };
  },
  methods: {
  },
  beforeMount() {
    let p = this.$root.db.FileCards.toArray();
    p.then((d)=>{
             this.database = d
    })
  }
};
</script>

<style>

</style>