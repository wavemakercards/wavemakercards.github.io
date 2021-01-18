<template>
<div>
 <v-btn fab absolute bottom right x-small @click="editme=!editme"><v-icon>edit</v-icon></v-btn>
 <div v-if="!editme">
 <div v-if="$root.shadowDB.Cards[uuid]">
   <h3 v-if="$root.shadowDB.Cards[uuid].title">
{{$root.shadowDB.Cards[uuid].title}}</h3>
<h3 v-else><em>Card Title</em></h3>
<v-sheet class="ma-2 pa-4 card_display" v-if="$root.shadowDB.Cards[uuid].content" v-html="$root.shadowDB.Cards[uuid].content" elevation="2" ></v-sheet>
<div v-else><em>Write here....</em></div>
 </div>
   
    <div v-else>
      Boooo
    </div>
     </div>
 <div v-if="editme">
   <div v-if="editmode==='inline'" class="cardeditor_inline">
   <v-text-field
          label="Title"
          v-model="$root.shadowDB.Cards[uuid].title"
          @change="SaveChange()"
        ></v-text-field>
              <tiptap-vuetify
                 v-if="!showSrc"
      v-model="$root.shadowDB.Cards[uuid].content"
      :extensions="extensions"
      :toolbar-attributes="toolbarAttrs"
         @blur="SaveChange()"
    /> 
    </div>   
  
    <div v-else>

<div>
    <v-dialog
    v-model="editme"
      transition="dialog-bottom-transition"
            persistent
            fullscreen
    >
        <v-card  >
           <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
           icon
           absolute top right
            @click="editme = false"
          >
          <v-icon>cancel</v-icon>
          </v-btn>
        </v-card-actions>
        <div class="cardeditor_fullscreen">
        <v-card-title >
       <v-text-field
          label="Title"
          v-model="$root.shadowDB.Cards[uuid].title"
          @change="SaveChange()"
        ></v-text-field>
        </v-card-title>

        <v-card-text >
    
              <tiptap-vuetify
                 v-if="!showSrc"
      v-model="$root.shadowDB.Cards[uuid].content"
      :extensions="extensions"
      :toolbar-attributes="toolbarAttrs"
         @blur="SaveChange()"
    />   </v-card-text>
        </div>
        <v-divider></v-divider>

     
      </v-card>
    </v-dialog>
  </div>
    </div>
  </div>

</div >

</template>
<script>
import {
  // component
  TiptapVuetify,
  // extensions
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  CodeBlock,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
  Image
} from "tiptap-vuetify";
 
export default {
    computed: {
    toolbarAttrs() {
      return this.$vuetify.theme.isDark
        ? { color: "dark", dark: true }
        : { color: "light", dark: false };
    }
  },
    components: { TiptapVuetify },
  data(){
    return{
      editme : false,
       showSrc : false,
    // declare extensions you want to use
    oldextensions: [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem, // if you need to use a list (BulletList, OrderedList)
        BulletList,
        OrderedList,
        Image,
        [
          Heading,
          {
            // Options that fall into the tiptap's extension
            options: {
              levels: [1, 2, 3]
            }
          }
        ],
        Bold,
        Link,
        Code,
        CodeBlock,
        HorizontalRule,
        Paragraph,
        HardBreak // line break on Shift + Ctrl + Enter
      ],

      // Custom order of extensions to change the order of the buttons
      extensions: [
        [Link,{renderIn: 'bubbleMenu'}],
      [
        Underline,
        {
          renderIn: 'bubbleMenu'
        }
      ],
      [
        Strike,
        {
          renderIn: 'bubbleMenu'
        }
      ],
      [
        Heading,
        {
          renderIn: 'bubbleMenu',
          // extension's options
          options: {
            levels: [1, 2, 3]
          }
        }
      ],
      // Render in the toolbar
      [
        Blockquote,
        {
          renderIn: 'bubbleMenu'
        }
      ],


        Bold,
        Italic,
        Paragraph,
        [
          Heading,
          {
            options: {
              levels: [1, 2]
            }
          }
        ],
        Image
      ],
    }
  },
    props:{
        uuid : String,
        editmode : String,
        parent:Object
    },
    methods:{
      SaveChange() {
      this.$root.UpdateRecord(
        "Cards",
        this.uuid,
        this.$root.shadowDB.Cards[this.uuid]
      );
      
    },
    nl2br (str, is_xhtml) {
    if (typeof str === 'undefined' || str === null) {
        return '';
    }
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}
    },
    created(){
      // NO dont do this - and Update will create a new card as needed - too many blank cards in database
      
        if(!this.$root.shadowDB.Cards[this.uuid]){
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