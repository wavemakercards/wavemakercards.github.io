<style scoped>
.tl-card:nth-child(even){
justify-content: flex-end
}
.drawline{
  background: linear-gradient(#ccc, #ccc) no-repeat center/2px 100%;
}
.dateDisplay{
  font-size: 0.8rem;
}
</style>
<template>
  <div>
    <div v-if="!SelectedPlanningBoard">
      <v-container>
        <v-row v-if="tooldata.length >0">
          <v-col cols="12" lg="6" v-for="(item, index) in tooldata" :key="index">
            <v-card height="100%">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title >
                    <span v-if="item.title===''">No Title</span>
                    {{item.title}}
                    <div class="dateDisplay">
                    {{niceDate(item.lastupdated)}}
                    </div>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-card-actions>
                <v-btn
                color="accent"
                x-small
                absolute
                top
                right
                icon
                 @click="ChoosePlanningBoard(item)"><v-icon>label_important</v-icon></v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-btn fixed fab bottom right class="accent" @click.native="AddNewTool">
          <v-icon>add</v-icon>
        </v-btn>
      </v-container>
    </div>
    <div v-if="SelectedPlanningBoard">
      <v-container>
        <v-btn color="error" @click="ClearSelectedPlanningBoard()" fab fixed right  bottom dark >
          <v-icon>cancel</v-icon>
        </v-btn>
<v-row v-if="planningBoardEvents.length===0">
<v-col>
          <v-btn @click="AddCard(-1)">Add New Card</v-btn>
</v-col>
</v-row>
<div v-else > 
  <v-row >
    <v-col  > 
<v-text-field @keyup="SaveTitleChange"  v-model="SelectedPlanningBoard.title" dense label="PlanningBoard Title" placeholder=""></v-text-field>
    </v-col>
  </v-row>

  <draggable
  :list="planningBoardEvents"
    v-bind="dragOptions"
    tag="div"
    :move="updateList"
    :delay="200"
    :delayOnTouchOnly="true"
    class="drawline"
  >
<v-row v-for="(item, index) in planningBoardEvents" :key="index"  class="tl-card">
<v-col lg="6" > 
        <v-card>
               <CardEditor  :CardId="item.uuid" :key="item.uuid" />
                <v-btn
                color="primary"
                dark
                small
                absolute
                bottom
                left
                fab
                @click="AddCard((index+1))"
              >
                <v-icon>system_update_alt</v-icon>
              </v-btn>

               <v-btn
                x-small
                absolute
                top
                right
                icon
                @click="DeleteCard(index)"
              >
                <v-icon>close</v-icon>
              </v-btn>

        </v-card>
</v-col>
</v-row>
  </draggable>
</div>
      </v-container>
    </div>
  </div>
</template>
<script>
import CardEditor from "../Editors/CardEditor"
import draggable from "vuedraggable";
export default {
  components:{
    CardEditor,
    draggable
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  data() {
    return {
      tooldata: [],
      SelectedPlanningBoard: null,
      planningBoardEvents: []
    };
  },
  methods: {
    niceDate(d){
      let newdate= new Date(d)
      return newdate.toLocaleDateString () +" : "+newdate.toLocaleTimeString ()
    },
    AddNewTool() {
      let id = this.$root.uuid.v1();
      let newObj = {};
      newObj.uuid = id;
      newObj.title = "Title Here";
      newObj.lastupdated = Date.now();
      this.tooldata.push(newObj);
      this.SaveToolData(newObj);
    },
    SaveTitleChange(){
     this.SelectedPlanningBoard.lastupdated = Date.now();
      this.SaveToolData(this.SelectedPlanningBoard);
      this.$root.SaveProjectData();
    },
    SaveToolData(newObj) {
      this.$root.db.PlanningBoards.put(newObj).then(function(updated) {
        if (updated) {
          //Cool updated!");
        } else {
          // Failed Save");
        }
      });
    },
    ClearSelectedPlanningBoard() {
      this.SelectedPlanningBoard = null;
      this.$root.ProjectState.tools.planningBoard.selectedplanningBoard = null;
      this.$root.SaveProjectData();
      this.init();
    },
    ChoosePlanningBoard(ChosenRecord) {
      // get the data from the DB
      console.log(ChosenRecord);
      this.$root.ProjectState.tools.planningBoard.selectedplanningBoard = ChosenRecord;
      this.SelectedPlanningBoard = ChosenRecord;
      if (!this.SelectedPlanningBoard.data) {
        this.planningBoardEvents = [];
      } else {
        this.planningBoardEvents = JSON.parse(this.SelectedPlanningBoard.data);
      }
      this.$root.SaveProjectData();
      this.init();
    },
    DeleteCard(i){
      if(confirm("Remove this card?")){
        this.planningBoardEvents.splice(i,1)
      }
    },
    AddCard(i) {
      console.log(i);
      // if i is passed as -1 then it bottome  else the index to splice
      let newObj = {};
      newObj.uuid = this.$root.uuid.v1();
      if (i < 0) {
        this.planningBoardEvents.push(newObj);
      } else {
        this.planningBoardEvents.splice(i, 0, newObj);
      }
      this.SelectedPlanningBoard.data = JSON.stringify(this.planningBoardEvents);
      // ok save the data to the database
      this.SelectedPlanningBoard.lastupdated = Date.now();
      this.SaveToolData(this.SelectedPlanningBoard);
      this.$root.SaveProjectData();
    },
    updateList(){
      console.log("Saving after move", this.planningBoardEvents)
      this.SelectedPlanningBoard.data = JSON.stringify(this.planningBoardEvents);
      this.SaveToolData(this.SelectedPlanningBoard);
      this.$root.SaveProjectData();
    },
    init() {
      if (this.$root.ProjectState.tools.planningBoard.selectedplanningBoard) {
        this.SelectedPlanningBoard = this.$root.ProjectState.tools.planningBoard.selectedplanningBoard;
        if (this.SelectedPlanningBoard.data) {
          this.planningBoardEvents = JSON.parse(this.SelectedPlanningBoard.data);
        } else {
          this.planningBoardEvents = [];
        }
      } else {
        // no selected planningBoard
        let p = this.$root.db.PlanningBoards.toArray();
        p.then(d => {
          this.tooldata = d;
        });
      }
    }
  },
  beforeMount() {
    this.init();
  }
};
</script>