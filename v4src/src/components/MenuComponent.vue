<template>
    <div>

   <v-list-item link @click="SetSection('')"  v-bind:class="{ accent: MySection ==='' }" >
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider />

        <v-list-item link @click="SetSection('manuscript')" v-bind:class="{ accent: MySection ==='manuscript' }">
          <v-list-item-action>
            <v-icon>import_contacts</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Manuscript</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider />
      <!--  SEARCH BOX EXAMLES
        <v-row>
          <v-col>
            <v-text-field
              solo-inverted
              flat
              hide-details
              label="Search"
              prepend-inner-icon="search"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field flat hide-details label="Search" prepend-inner-icon="search" />
          </v-col>
        </v-row>

 <v-expand-transition>
<div v-if="MySection==='manuscript'" >
<ManuscriptTree />
   <v-divider />
</div>
 </v-expand-transition>
   -->
  

        <v-list-item link @click="SetSection('timeline')" v-bind:class="{ accent: MySection ==='timeline' }">
          <v-list-item-action>
            <v-icon>access_time</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Timeline</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />

                <v-list-item link @click="SetSection('snowflake')" v-bind:class="{ accent: MySection ==='snowflake' }">
          <v-list-item-action>
            <v-icon>ac_unit</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Snowflake</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />

                <v-list-item link @click="SetSection('database')" v-bind:class="{ accent: MySection ==='database' }">
          <v-list-item-action>
            <v-icon>layers</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Database</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />

                <v-list-item link @click="SetSection('mindmap')" v-bind:class="{ accent: MySection ==='mindmap' }">
          <v-list-item-action>
            <v-icon>account_tree</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Mind Map</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />

        
                <v-list-item link @click="SetSection('planningboard')" v-bind:class="{ accent: MySection ==='planningboard' }">
          <v-list-item-action>
            <v-icon>view_comfy</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Planning Board</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />


      <v-list-item link @click="SetSection('export')" v-bind:class="{ accent: MySection ==='export' }">
          <v-list-item-action>
            <v-icon>launch</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Export Options</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />













        <v-list-item link @click="SetSection('settings')" v-bind:class="{ accent: MySection ==='settings' }">
          <v-list-item-action>
            <v-icon>settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider />
   <v-expand-transition>
<div v-if="MySection==='settings'" color=primary >   
        <v-list-item link>
          <v-list-item-action>
            <v-icon>build</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Tool Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>backup</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Cloud Sync Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

   <v-divider />
</div>
 </v-expand-transition>
  
    </div>
</template>

<script>
//import ManuscriptTree from "./MenuTools/ManuscriptTree";

export default {
  components: {
   // ManuscriptTree
  },
    computed : {
        MySection(){
          return this.$root.ProjectState.Section
        }
    },
    methods : {
        SetSection(Sec){
          // clear the selected item
          this.$root.ProjectState.SelectedCard = null
            if (this.$root.ProjectState.Section===Sec){
              // meh behaviour= //
              this.$root.ProjectState.Section=  ''
            }else{
                this.$root.ProjectState.Section=  Sec;
            }
            this.$root.SaveProjectData()
        }
    }
}
</script>