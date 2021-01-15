<template>
  <div class="notecol">
    <div class="colheader" v-if="$root.shadowDB.Cards[mynode.uuid] && $root.shadowDB.Cards[mynode.uuid].title">{{$root.shadowDB.Cards[mynode.uuid].title}}</div>
    <div class="colheader" v-else><em style="opacity:50%">New Card</em></div>
 <draggable
                  v-model="mynode.notes"
                  handle=".boxhandle"
                  group="boxes"
                  @change="BoxDrag"
                >
                  <transition-group
                    type="transition"
                    name="flip-list"
                    class=""
                    tag="div"
                  >


          <v-card
                      class="ma-4 pa-2"
                      v-for="(card, cardIndex) in mynode.notes"
                      :key="cardIndex"
                    >
                  
                        <div class="boxhandle">
                          <v-icon>drag_handle</v-icon>
                        </div>
                        <CardEditor :uuid="card.uuid" />
                   
                    </v-card>
        </transition-group>
                </draggable>
                   <div class="button-holder">
          <v-btn @click="addNote(mynode)" color="primary" x-small fab right >
      <v-icon>add</v-icon>
    </v-btn>
      </div>

  <v-dialog
      v-model="showModal1"
      width="500"
    >
 <v-card>
     <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            icon
            @click="showModal1 = false"
          >
            <v-icon>close</v-icon> 
          </v-btn>
        </v-card-actions>
        <v-card-title >
         Add New Card
        </v-card-title>

        <v-card-text>
          You can create a new card, or link to an existing one 
     </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
            <v-btn
            text
            @click="showModal2 = true; showModal1= false"
          >
            <v-icon class="mr-3">link</v-icon> Link to a card
          </v-btn>
          <v-spacer></v-spacer>
               <v-btn
            text
            @click="addUUidtolist()"
          >
            <v-icon class="mr-3">queue</v-icon> Add a new card
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="showModal2"
      fullscreen
    >
 <v-card>
     <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            icon
            @click="showModal2 = false"
          >
            <v-icon>close</v-icon> 
          </v-btn>
        </v-card-actions>
        <v-card-title >
        Choose a card to link to
        </v-card-title>
       <v-container> 
<v-row>
<v-col cols="12" sm="6" md="4" v-for="(linkcard, linkindex) in $root.shadowDB.Cards" :key="linkindex">
  <v-card>
  <h3>{{linkcard.title}}</h3>
<div v-html="linkcard.content"  style="height:200px; overflow-y:auto;"></div>
  </v-card>
</v-col>
</v-row>
       </v-container>

        <v-card-text>
          You can create a new card, or link to an existing one 
     </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
      
          <v-spacer></v-spacer>
              <v-btn
            text
            @click="showModal2 = true; showModal1= false"
          >
            <v-icon class="mr-3">link</v-icon> Link to a card
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import CardEditor from "@/tools/generic/CardEditor.vue";
export default {
      components: {
    CardEditor,
    draggable,
  },
  data(){
    return{
      selectedColumn : null,
      showModal1 : false,
      showModal2 : false,

    }
  },
  props: {
    mynode: Object,
  },
  methods: {
    addNote(o) {
      this.selectedColumn = o;
      console.log(o);
      this.showModal1= true
     //this.addUUidtolist()
    },
    addUUidtolist(uuid) {
       let obj = {
        state: {},
      };

      if(!uuid){
        obj.uuid = this.$root.uuid.v4()
      }else{
        obj.uuid = uuid
      }

      if (!this.selectedColumn.notes) {
        this.selectedColumn.notes = [];
      }
      this.selectedColumn.notes.push(obj);
      this.selectedColumn = null
      this.showModal1= false
      this.showModal2= false
      this.$set(this.selectedColumn, "notes", this.selectedColumn.notes);
      this.SaveData();
    },

      BoxDrag() {
      //should work with simple save change
      this.SaveData();
    },
    SaveData() {
      this.$root.UpdateRecord(
        "Writer",
      this.$route.params.id,
        this.$root.shadowDB.Writer[
       this.$route.params.id
        ]
      );
    },
  },
};
</script>

<style scoped>
.colheader{
  text-align: center;
}
.notecol {
  width: 360px;
  padding: 0px;
  display: inline-block;
  margin: 5px;
  height: 100%;
  position: relative;
  vertical-align: top;
}
.button-holder{
 text-align: right;
 margin-bottom: 5px;
 position: sticky;
 top:0px;
}
.boxhandle {
  text-align: right;
  cursor: move;
}

.handle {
  cursor: move;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
  width: 200px;
}
</style>