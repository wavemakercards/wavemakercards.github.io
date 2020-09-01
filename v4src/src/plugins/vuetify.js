import Vue from 'vue';
import Vuetify from 'vuetify/lib';
//import colors from 'vuetify/lib/util/colors'
Vue.use(Vuetify);

export default new Vuetify({
    lang: {
        // If you change the language here, then it changes in the editor itself
        current: "en" // en | es | fr | pl | ru
    },
    /*
      theme: {
          themes: {
              light: {
                  primary: colors.primary
                      //     background: colors.grey.lighten2, // Not automatically applied
              },
              dark: {
                  primary: colors.primary
                      //   background: colors.grey.darken2, // If not using lighten/darken, use base to return hex
              },
          },
      },
      */
});