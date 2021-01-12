<template>
<div>

<v-alert v-if="!$root.shadowDB.Cards[this.uuid]" class="" >
    <v-icon>warning</v-icon>  This card is not in the database
</v-alert>
<div
 v-if="$root.shadowDB.Cards[this.uuid]"  >
    
   <v-text-field
          label="Title"
          v-model="$root.shadowDB.Cards[uuid].title"
          @change="SaveChange()"
        ></v-text-field>
    <v-textarea
     auto-grow
     filled
     v-model="$root.shadowDB.Cards[uuid].content"
     @change="SaveChange()"
    ></v-textarea>
         
        

</div >
</div>
</template>
<script>
export default {
    props:{
        uuid : String
    },
    methods:{
      SaveChange() {
      this.$root.UpdateRecord(
        "Cards",
        this.uuid,
        this.$root.shadowDB.Cards[this.uuid]
      );
    },
    },
    created(){
        if(!this.$root.shadowDB.Cards[this.uuid]){
         // the card is not int database, meaning it's new! so
         console.log("Adding Record")
            let obj = {}
            obj.uuid=this.uuid
            obj.title =""
            obj.content=""
            this.$root.AddRecord("Cards", obj);
        }
        
    }
}
</script>