import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    current: "en"
  },
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
  rtl: false,
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        c0: "#fafafa",
        c1: "#f5f5f5",
        c2: "#eeeeee",
        c3: "#e0e0e0",
        c4: "#bdbdbd",
        c5: "#9e9e9e",
        c6: "#757575",
        c7: "#616161",
        c8: "#424242",
        c9: "#212121"
      },
      light: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        c0: "#212121",
        c1: "#424242",
        c2: "#616161",
        c3: "#757575",
        c4: "#9e9e9e",
        c5: "#bdbdbd",
        c6: "#e0e0e0",
        c7: "#eeeeee",
        c8: "#f5f5f5",
        c9: "#fafafa"
      }
    }
  }
});
