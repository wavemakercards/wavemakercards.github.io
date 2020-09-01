<template>
  <div>
    <v-container>
<div  v-if="!loadingComplete">
 Loading  ....
</div>
<div v-else>
      <div v-if="!CardNode">
        <v-row>
          <v-col cols="12" class>
            <v-progress-linear indeterminate color="yellow darken-2"></v-progress-linear>
         
            <h1>New Card</h1>
            <v-alert type="success" >
                 <h3>Add a New Unique Card here</h3>
              <v-btn @click="AddNewCard" class="primary">
                <v-icon>add</v-icon>Add New
              </v-btn>
            </v-alert>

              <v-alert type="info" >
                 <h3>Link to an existing card</h3>

                 <PickACard />

              <v-btn @click="AddNewCard" class="warning">
                <v-icon>add</v-icon>Add New
              </v-btn>
               <v-btn @click="AddNewCard" class="error">
                <v-icon>add</v-icon>Add New
              </v-btn>
            </v-alert>

          </v-col>
        </v-row>
      </div>
      <div v-else>
        <v-btn color="primary" @click="showPrefs=!showPrefs" icon  right  x-small>
          <v-icon>settings</v-icon>
        </v-btn>
        <div v-if="showPrefs">
          <v-row>
            <v-col cols="12" class>
              <h1>Settings</h1>
              <p>Plans here are for a couple of options such as</p>
              <ol>
                <li>Hide from 'render'</li>
                <li>Apply specific styles (css inline for this block?)</li>
                <li>Delete the node</li>
              </ol>
            </v-col>
          </v-row>
        </div>

        <div v-if="!showPrefs">
          <v-row>
            <v-col cols="12" class="manuscriptCSS">
              <v-text-field v-model="CardTitle" dense label="Title" placeholder=""></v-text-field>
              <tiptap-vuetify
                v-model="CardBody"
                :extensions="extensions2"
                :toolbar-attributes="toolbarAttrs"
                placeholder="Write something …"
                @change="SaveMyText"
              />
            </v-col>
          </v-row>
        </div>
      </div>
       </div>
    </v-container>
  </div>
 
</template>

<script>
import PickACard from "./PickACard"
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
  components: { TiptapVuetify, PickACard },
  computed: {
    toolbarAttrs() {
      return this.$vuetify.theme.isDark
        ? { color: "", dark: true }
        : { color: "", dark: false };
    }
  },
  props: {
    CardId: String
  },
  data() {
    return {
      dialog: false,
      showPrefs: false,
      CardNode: false,
      loadingComplete : false,
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
      CardTitle: null,
      CardBody: "",
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
      ]
    };
  },
  methods: {
    loadCardData(){
        let searchObj = {};
    searchObj.uuid = this.CardId;
    this.$root.db.FileCards.get(searchObj)
      .then(result => {
        return result;
      })
      .then(data => {
        if (data) {
          this.CardNode = data;
          this.CardTitle = data.title;
          this.CardBody = data.body;
          
        } else {
          //Selected Item not in DB shoule be a No No?");
        }
        // tell it loading is done
        this.loadingComplete = true
      });
    },
    AddNewCard(){
       let data = {};
      data.uuid = this.CardId;
      data.title = "";
      data.hashtags = "";
      data.meta = "";
      data.body = "";
      data.lastupdated = Date.now();
      this.$root.db.FileCards.put(data).then(updated => {
        if (updated) {
          this.loadCardData()
        } else {
          //Failed Save");
        }
      });

    },
    SaveMyText() {
      let data = {};
      data.uuid = this.CardId;
      data.title = this.CardTitle;
      data.hashtags = "LATER";
      data.meta = "LATER";
      data.body = this.CardBody;
      data.lastupdated = Date.now();
      this.$root.db.FileCards.put(data).then(updated => {
        if (updated) {
          //(updated)
        } else {
          //Failed Save");
        }
      });
    }
  },
  watch: {
    // Watch the content variable for changes
    //      content: function (n, o) { will get n=new and o=old values
    CardTitle: function() {
      this.$emit("NodeTitleChanged", this.CardTitle);
      this.SaveMyText();
    },
    CardBody: function() {
      this.SaveMyText();
    }
  },
  beforeMount() {
    this.loadCardData()
  }
};
</script>

<style >
.tiptap-vuetify-editor__toolbar {
  position: sticky;
  left: 0px;
  right: 0px;
  text-align: center;
  top: 54px;
  z-index: 1;

}
.tiptap-vuetify-editor__content {
  min-height: 100px;
}

.tiptap-vuetify-editor__content pre {
  width: 100%;
  margin: 0 auto;
}


@media only screen and (min-width: 1264px) {
.tiptap-vuetify-editor__toolbar {
  top: 62px;

}
.tiptap-vuetify-editor__content {
  min-height: 200px;
}

}

</style>