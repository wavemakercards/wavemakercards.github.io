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
        WaveMaker :  {
            ProjectInfo : {},
            ManuscriptData: {},
            CardsDatabase : {}
        },
        system: {
            project: null,
            writer: {
                SelectedCard: { uuid: null },
                FileList: []
            }
        },
        db,
        uuid
    }),
    methods: {
        SaveManuscriptData() {
            var statedata = JSON.stringify(this.$root.system.writer)
            let MYstate = { id: 1, state: statedata, lastupdated: Date.now() }
            this.$root.db.ManuscriptData.put(MYstate).then(function (updated) {
                if (updated) {
                    window.wlog("database", "Manuscript Save done");
                } else {
                    window.wlog("database", "Manuscript Save Failed");
                }
            });
        },
        SaveProjectData() {
            var statedata = JSON.stringify(this.$root.system.project)
            let MYstate = { id: 1, state: statedata, lastupdated: Date.now() }
            this.$root.db.ProjectInfo.put(MYstate).then((updated) => {
                if (updated) {
                    window.wlog("database", "Project Save done");
                } else {
                    window.wlog("database", "Project Save Failed");
                }
            });
        },
        SaveCardData(data) {
            data.lastupdated = Date.now()
            console.log("PUTTING" ,data)
            this.$root.db.CardsDatabase.put(data).then(function (updated) {
                if (updated) {
                    window.wlog("database", "Card Updated");
                } else {
                    window.wlog("database", "Card FAILED");
                }
            });
        }

    },
    created() {
        this.$vuetify.theme.dark = true

        this.$root.db.on("changes", (changes)=>{
            changes.forEach((change)=> {
                console.log("EMIT" ,change)
              switch (change.type) {
                  case 1: // CREATED
                    console.log('An object was created: ' + JSON.stringify(change.obj));
                    break;
                  case 2: // UPDATED
                    console.log('An object with key ' + change.key + ' was updated with modifications: ' + JSON.stringify(change.mods));
                    break;
                  case 3: // DELETED
                    console.log('An object was deleted: ' + JSON.stringify(change.oldObj));
                    break;
                }
              
            })
        })


    },
    render: h => h(App)
}).$mount('#app')