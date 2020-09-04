<template>
  <div class="editor">
   
    <div class="page">


  

 
      <v-card class="mx-auto"  light tile flat min-height="500px" style="margin-bottom:50px">
        <v-card-text>            
    <v-text-field
      placeholder="Title"
      v-model="$root.system.writer.SelectedCard.title"
      style="font-size:1.2rem"
      :blur="$root.SaveManuscriptData()"
    ></v-text-field>
            <div class="pa-5">
         <v-textarea
          value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
          auto-grow
          filled
      
          solo
        ></v-textarea>
            </div>

        </v-card-text>    
      </v-card>
    </div>
  </div>
</template>
<style scoped>
.editor {
  position: relative;
  display: block;
  color: #222;
}

.page {
  position: relative;
  max-width: 680px;
  margin: 0 auto;
  margin-top: 4%;
}

.titlebox{
    position: sticky;
    top:80px;
    background-color: #636363;
}
</style>
<script>
export default {
  props: {
    myId: String,
  },
  methods : {



  },
  beforeMount() {
    /*
        This is passed an ID, this ID pulls from the CARDS database (each element is a CARD specified by the UUID)
Look for a matching UUId in the cards database
if there isn't one, create one.
*/

  window.wlog("Database :", "Check for Project");
      this.$root.db.Carddatabase.get({
        uuid: this.myId,
      })
        .then((result) => {
          return result;
        })
        .then((data) => {
          if (data) {
            window.wlog("Database :", "Project Found");
            window.wlog("result :", data);
            this.ProjectInfo = JSON.parse(data.state);
            this.LastUpdated = Date(data.lastupdated).toLocaleString()
            this.viewsection = 2;
          } else {
            this.ProjectInfo = {};
            window.wlog("Database :", "No Project Found");
            this.viewsection = 3;
          }
        });
  
  
  },
};
</script>