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
    uuid,
    data: () => ({
        writer : {
            SelectedCard : null,
            FileList : []
        },
        system: {},
        db,
        uuid
    }),
    methods : {
        SaveManuscriptData(){
            console.log("save triggered")
            let MYstate = { id: 1, state: JSON.stringify(this.$root.writer), lastupdated: Date.now() }
            this.$root.db.ManuscriptData.put(MYstate).then(function(updated) {
                if (updated) {
                    //Project Save done");
                } else {
                    //Project Failed Save");
                }
            });
        }
    },

    created() {
        this.$vuetify.theme.dark = true
    },
    render: h => h(App)
}).$mount('#app')