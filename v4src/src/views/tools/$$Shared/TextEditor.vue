<template>
  <div class="TextEditorPageHolder">
   
    <div class="TextEditorPage" >


 
      <v-card class="mx-auto"   tile text   >
 <v-card-text class="pt-2">
   <h5>Card Settings</h5>
    <v-text-field
    label="Title"
      placeholder="Title"
      v-model="$root.system.writer.SelectedCard.title"
      style="font-size:1.2rem"

      class="pr-5 pl-5"
    ></v-text-field>
 </v-card-text> 
      </v-card>
                <tiptap-vuetify
              v-model="CardItem.body"
              :extensions="extensions"
              :toolbar-attributes="toolbarAttrs"
              placeholder="Write something …"
              @blur="SaveMyText"
              v-if="CardItem"
            />

    </div>
  </div>
</template>
<style scoped>
.TextEditorPageHolder {
  position: relative;
  display: block;
    margin-top: 10px;
  max-width: 800px;
    margin: 0 auto;
}

.TextEditorPage {
  position: absolute;
  top:0px;
  bottom:0px;
  margin: 0 auto;
    right:0px;
  left:0px;
}
</style>

<style >

.tiptap-vuetify-editor__toolbar {
  position: sticky;
  left: 0px;
  right: 0px;
  text-align: center;
  top: 45px;
  z-index: 1;
}
.tiptap-vuetify-editor__content {
  min-height: 300px;
}

.tiptap-vuetify-editor__content pre {
  width: 100%;
  margin: 0 auto;
}
.tiptap-vuetify-editor__content img {
  max-width: 100%;
  display: block;
  margin: 0 auto;
}
</style>
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
    components: { TiptapVuetify },
  props: {
    myId: String,
  },
  computed: {
    dbchange: function() { 
      console.log("Change Detected", this.$root.dbchange )
      return this.$root.dbchange 
      },
    toolbarAttrs() {
      return this.$vuetify.theme.isDark
        ? { color: "dark", dark: true }
        : { color: "light", dark: false };
    }
  },
  data() {
    return {
      dialog: false,
      BodyText: "",
      showPrefs: false,
      extensions: [
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
      extensions2: [
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
      CardItem :  null
    };
  },
  methods : {
SaveMyText(){

  window.wlog("note", "Saving item")
 this.$root.SaveCardData(this.CardItem)
}


  },
  beforeMount() {
    /*
        This is passed an ID, this ID pulls from the CARDS database (each element is a CARD specified by the UUID)
Look for a matching UUId in the cards database
if there isn't one, create one.
*/

  window.wlog("Database :", "Check for Card");
      this.$root.db.CardsDatabase.get({
        uuid: this.myId,
      })
        .then((result) => {
          return result;
        })
        .then((data) => {
          console.log(data)
          if (data) {
            window.wlog("Database :", "Card Found");
            this.CardItem = data;
          } else {
             window.wlog("Database :", "No Card Found - creating");
            this.CardItem = {
                  uuid : this.myId,
                  hashtags : "later",
                  meta : "later",
                  body : '',
            };
              this.$root.SaveCardData(this.CardItem)
          }
        });
  
  
  },
};
</script>