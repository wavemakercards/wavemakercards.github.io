<template>
 <v-main>
  <div class="scroller" style="vertical-align:top">
        <!-- the header row -->
        <div
          :style="{
            width: TableWidth + 'px'
          }"
          style="vertical-align:top"
        >
<PlanningboardColumn v-for="(col,index) in NotesArray" :key="index" :mynode="col" />

   </div>
  </div>
   </v-main>
</template>

<script>
import PlanningboardColumn from "./PlanningboardColumn";
export default {
  components:{
    PlanningboardColumn
  },
  data(){
    return {
      NotesArray : []
    }
  },
    computed: {
    TableWidth() {
      return (
        (this.NotesArray.length + 1) *
        350
      );
    },
  },
  methods: {
      GetNotesObjects(mylist){
          mylist.forEach(element => {
            if(element.type ==="file"){
              this.NotesArray.push(element)
            }
            if(element.type ==="folder"){
               this.GetNotesObjects(element.files)
            }
          });
      },
  },
      mounted(){
        this.NotesArray=[]
        this.GetNotesObjects(this.$root.shadowDB.Writer[this.$route.params.id].files)
      }

}
</script>

<style scoped>
.scroller {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  overflow: scroll;
}
</style>