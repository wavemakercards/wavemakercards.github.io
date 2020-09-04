<template>
  <div class="editor">
   
    <div class="page" style="max-width:800px">


 
      <v-card class="mx-auto"   tile flat   >
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
.editor {
  position: relative;
  display: block;
}

.page {
  position: relative;
  margin: 0 auto;
  margin-top: 10px;
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