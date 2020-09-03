import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
//Vue.config.productionTip = false
import db from "./DexieDB";
import {
    uuid
} from 'vue-uuid';
import { TiptapVuetifyPlugin } from "tiptap-vuetify";
// don't forget to import styles
import "tiptap-vuetify/dist/main.css";
import router from './router'

Vue.use(TiptapVuetifyPlugin, {
    vuetify
});
window.App = new Vue({
    vuetify,
    router,
    data: () => ({
        system: {},
        db,
        uuid
    }),

    created() {
        this.$vuetify.theme.dark = true
    },
    render: h => h(App)
}).$mount('#app')