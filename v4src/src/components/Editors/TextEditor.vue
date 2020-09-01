<template>
  <div class="editorFrame">
    <v-container>
      <v-btn color="primary" @click="showPrefs=!showPrefs" fab fixed right dark small>
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
            <tiptap-vuetify
              v-model="content"
              :extensions="extensions2"
              :toolbar-attributes="toolbarAttrs"
              placeholder="Write something …"
              @change="SaveMyText"
            />
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import stopword from "stopword";
// converts the html to plain text (html cleanup)
import html2text from "html-to-text";
// stop word clean up (multi Language)
// natural language support
//import nlp from 'compromise'

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
  computed: {
    toolbarAttrs() {
      return this.$vuetify.theme.isDark
        ? { color: "purple", dark: true }
        : { color: "primary", dark: true };
    }
  },
  props: ["myEl"],
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
      content: "",
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
  watch: {
    // Watch the content variable for changes
    //      content: function (n, o) { will get n=new and o=old values
    content: function() {
      this.SaveMyText();
    }
  },
  mounted() {
    // editor is initialized
    let searchObj = {};
    searchObj.uuid = this.myEl.uuid;
    this.$root.db.FileCards.get(searchObj)
      .then(result => {
        return result;
      })
      .then(data => {
        if (data) {
          this.content = data.body;
        } else {
          //Selected Item not in DB shoule be a No No?");
        }
      });
  },
  methods: {
    showImagePrompt(command) {
      const src = prompt("Enter the url of your image here");
      if (src !== null) {
        command({ src });
      }
    },
    nlp() {
      let cleantext = html2text.fromString(this.content);

      // remove all punctuation
      cleantext = cleantext.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");

      let arr = stopword.removeStopwords(cleantext.split(" "));
      let x = {};
      arr.forEach(element => {
        let count = 1;
        if (x[element]) {
          x[element] = x[element] + 1;
        } else {
          x[element] = count;
        }
      });
    },

    SaveMyText() {
      let data = {};
      data.uuid = this.myEl.uuid;
      data.title = this.myEl.name;
      data.hashtags = "LATER";
      data.meta = "LATER";
      data.body = this.content;
      data.lastupdated = Date.now();

      this.$root.db.FileCards.put(data).then(function(updated) {
        if (updated) {
          //Cool updated!");
        } else {
          //Failed Save");
        }
      });
    },
  
  }
};
</script>

<style >
.tiptap-vuetify-editor__toolbar {
  position: sticky;
  left: 0px;
  right: 0px;
  text-align: center;
  top: 60px;
  z-index: 1;
}
.tiptap-vuetify-editor__content {
  min-height: 700px;
}

.tiptap-vuetify-editor__content pre {
  width: 100%;
  margin: 0 auto;
}

.editorFrame {

  margin-left: 2%;
}
</style>