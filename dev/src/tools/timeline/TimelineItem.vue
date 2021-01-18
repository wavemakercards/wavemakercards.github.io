<template>
<v-main>
  <v-container>
     <!-- needs to make sure its loaded -->
  <div v-if="!$root.shadowDB.Timeline[$route.params.id]">
    loading ...
  </div>
  <div v-else>
    <v-row no-gutters align="center" justify="center">
      <v-col cols="12" sm="12" md="6">
        <v-text-field
          label="Title"
          v-model="$root.shadowDB.Timeline[$route.params.id].title"
          solo
          @change="SaveChange()"
        ></v-text-field>
      </v-col>
    </v-row>

    <section id="cd-timeline" class="cd-container">
      <draggable v-model="$root.shadowDB.Timeline[$route.params.id].content" handle=".cd-location"  @change="SaveChange()">
        <transition-group type="transition" :name="'flip-list'">
          <div class="cd-timeline-block" v-for="(card, index)  in $root.shadowDB.Timeline[$route.params.id].content" :key="index">
            <div class="cd-timeline-img cd-location">
              <svg id="logo" version="1.1" viewBox="0 0 24 24" height="24" width="24">
          <path d="M0 0h24v24H0V0z" fill="none" />
          <g transform="matrix(0.046875,0,0,0.04604639,-1.951887,-3.0598516)" >
            <g id="_921457168">
              <path
                class="logo-top"
                d="M 464.632,212.901 337.566,83.292 c -22.014,-22.454 -57.758,-22.454 -79.771,0 l -126.63,129.386 c -7.411,7.559 -7.411,19.563 0,27.122 l 38.359,39.127 25.5,24.232 c 7.628,7.114 19.18,7.114 26.808,0 l 51.219,-48.242 c 14.167,-13.338 35.744,-13.338 49.693,0 l 51.219,48.242 c 7.629,7.114 19.18,7.114 26.809,0 l 25.501,-24.232 38.359,-38.904 c 7.193,-7.337 7.193,-19.563 0,-27.122 z"
              />
              <path
                class="logo-bottom"
                d="m 58.804,367.853 198.991,202.973 c 22.013,22.452 57.757,22.452 79.771,0 L 536.557,367.853 c 34.437,-35.125 10.244,-45.574 -15.039,-70.029 L 490.35,267.59 c -7.409,-7.336 -19.18,-7.113 -26.808,0 l -51.218,48.242 c -14.169,13.339 -35.744,13.339 -49.694,0 L 311.411,267.59 c -7.575,-7.113 -19.233,-7.113 -26.809,0 l -51.219,48.242 c -14.167,13.339 -35.744,13.339 -49.693,0 L 132.471,267.59 c -7.576,-7.113 -19.233,-7.113 -26.809,0 l -28.77,27.123 c -26.37,24.899 -54.05,36.236 -18.088,73.14 z"
              />
            </g>
          </g>
        </svg>
            </div>
            <div class="cd-timeline-content">

<v-card class="ma-2" max-width="100%" outlined>
  
<div style="padding:10px;">
     <v-btn
              fab
              color="error"
              dark
              x-small
                absolute
                right
                @click="removeMe(index)"
                alt="delete this card"
                title="delete this card"
              ><v-icon>delete</v-icon></v-btn>
</div>
<v-card-text>
          <CardEditor :uuid="card.uuid"  editmode="inline" :edit-on="true" :popmenu="false" />
    </v-card-text>

        </v-card>
             
            </div>
          </div>
        </transition-group>
      </draggable>
    
    <v-btn fab 
     absolute
  bottom
  :style="{left: '50%', transform:'translateX(-50%)'}"
    dark color="success" @click="AddTimelineNode()"><v-icon>add</v-icon></v-btn>
    </section>

  </div>

  </v-container>
</v-main>
</template>

<script>
import draggable from "vuedraggable";
import CardEditor from "@/tools/generic/CardEditor.vue";
export default {
  components:{
    CardEditor,
    draggable
  },
  methods: {
    AddTimelineNode(){    
      this.$root.shadowDB.Timeline[this.$route.params.id].content.push({uuid : this.$root.uuid.v4()})
      this.SaveChange()
    },
    removeMe(index) {
      if(confirm("you sure?")){
      this.$root.shadowDB.Timeline[this.$route.params.id].content.splice(index, 1);
      this.SaveChange()
      }
    },
        SaveChange() {
      this.$root.UpdateRecord(
        "Timeline",
        this.$route.params.id,
        this.$root.shadowDB.Timeline[this.$route.params.id]
      );
    },
  }
};
</script>

<style scoped>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;

}

/* -------------------------------- 

Modules - reusable parts of our design

-------------------------------- */
.cd-container {
  /* this class is used to give a max-width to the element it is applied to, and center it horizontally when it reaches that max-width */
  width: 90%;
  max-width: 1170px;
  margin: 0 auto;
}
.cd-container::after {
  /* clearfix */
  content: "";
  display: table;
  clear: both;
}

/* -------------------------------- 

Main components 

-------------------------------- */

#cd-timeline {
  position: relative;
  padding: 2em 0;
  margin-top: 2em;
  margin-bottom: 2em;
}
#cd-timeline::before {
  /* this is the vertical line */
  content: "";
  position: absolute;
  top: 0;
  left: 18px;
  height: 100%;
  width: 4px;
  background: var(--c4);
}

@media only screen and (min-width: 700px) {
  #cd-timeline {
    margin-top: 3em;
    margin-bottom: 3em;
  }
  #cd-timeline::before {
    left: 50%;
    margin-left: -2px;
  }
}

.cd-timeline-block {
  position: relative;
  margin: 2em 0;
}
.cd-timeline-block::after {
  clear: both;
  content: "";
  display: table;
}
.cd-timeline-block:first-child {
  margin-top: 0;
}
.cd-timeline-block:last-child {
  margin-bottom: 0;
}

@media only screen and (min-width: 700px) {
  .cd-timeline-block {
    margin: 4em 0;
  }
  .cd-timeline-block:first-child {
    margin-top: 0;
  }
  .cd-timeline-block:last-child {
    margin-bottom: 0;
  }
}
.cd-timeline-img {
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 0 0 4px var(--c4), inset 0 2px 0 rgba(0, 0, 0, 0.08),
    0 3px 0 4px rgba(0, 0, 0, 0.05);
}
.cd-timeline-img svg {
  display: block;
  width: 24px;
  height: 24px;
  position: relative;
  left: 50%;
  top: 50%;
  margin-left: -12px;
  margin-top: -12px;
}

@media only screen and (min-width: 700px) {
  .cd-timeline-img {
    width: 40px;
    height: 40px;
    left: 50%;
    margin-left: -20px;
    margin-top: 10px;
  }

}




.cd-timeline-content {
  position: relative;
  margin-left: 60px;
  padding: 0;

}

.no-touch .cd-timeline-content .cd-read-more:hover {
  background-color:var(--c4);
}
.cd-timeline-content .cd-date {
  float: left;
  padding: 0.8em 0;
  opacity: 0.7;
}
.cd-timeline-content::before {
  content: "";
  position: absolute;
  top: 16px;
  right: 100%;
  height: 0;
  width: 0;
  border: 7px solid transparent;
  border-right: 7px solid var(--c4);
}

@media only screen and (min-width: 700px) {
  .cd-timeline-content {
    margin-left: 0;
    padding:0;
    width: 45%;
  }
  .cd-timeline-content::before {
    top: 24px;
    left: 100%;
    border-color: transparent;
    border-left-color: var(--c4);
  }


  .cd-timeline-block:nth-child(even) .cd-timeline-content {
    float: right;
  }
  .cd-timeline-block:nth-child(even) .cd-timeline-content::before {
    top: 24px;
    left: auto;
    right: 100%;
    border-color: transparent;
    border-right-color:var(--c4);
  }
  .cd-timeline-block:nth-child(even) .cd-timeline-content .cd-read-more {
    float: right;
  }
  .cd-timeline-block:nth-child(even) .cd-timeline-content .cd-date {
    left: auto;
    right: 122%;
    text-align: right;
  }
}
</style>


