import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
Vue.config.productionTip = false
import db from "./DexieDB";
import {
    uuid
} from 'vue-uuid';

import { TiptapVuetifyPlugin } from "tiptap-vuetify";
// don't forget to import styles
import "tiptap-vuetify/dist/main.css";

Vue.use(TiptapVuetifyPlugin, {
    vuetify
});

window.App = new Vue({
    store,
    vuetify,
    data: () => ({
        alertMsg: false,
        alertMsgText: "Loading",
        db,
        uuid,
        ProjectState: {
            ProjectInfo: null, // global Project Info
            Manuscript: {
                elements: []
            },
            SelectedCard: '', // allows the editor to know what card is selected
            Section: '',
            tools: {
                timeline: {
                    selectedtimeline: null
                },
                planningBoard: {
                    selectedplanningBoard: null
                }
            }

        }
    }),
    methods: {
        FindNodeByID: function(uuid, parentObj) {
            let el = false
            let arrtosearch = parentObj.elements
            arrtosearch.some((element, index) => {
                if (element.uuid === uuid) {
                    el = {}
                    el.parentObj = parentObj
                    el.index = index
                    return true
                } else {
                    if (element.elements && !el) {
                        el = this.$root.FindNodeByID(uuid, element)
                    }
                }
            });
            return el
        },
        DeleteManuscriptItem() {
            // need to get the New_Index and New_Parent of the parent
            let pos = this.$root.FindNodeByID(this.$root.ProjectState.SelectedCard.uuid, this.$root.ProjectState.Manuscript)
            if (pos.parentObj === this.$root.ProjectState.Manuscript) {
                this.$root.ProjectState.SelectedCard = null
                pos.parentObj.splice(pos.index, 1);
            } else {
                this.$root.ProjectState.SelectedCard = pos.parentObj;
                pos.parentObj.elements.splice(pos.index, 1);
            }
            this.$root.SaveProjectData()
        },
        SaveProjectData() {
            let MYstate = { id: 1, state: JSON.stringify(this.$root.ProjectState), lastupdated: Date.now() }
            this.$root.db.ProjectState.put(MYstate).then(function(updated) {
                if (updated) {
                    //Project Save done");
                } else {
                    //Project Failed Save");
                }
            });
        }
    },
    beforeMount() {
        this.$store.commit('initialiseStore'); //loading state from localstorage
        this.$root.db.ProjectState.get({
            id: 1
        }).then((result) => {
            return result;
        }).then(data => {
            if (data) {
                this.$root.ProjectState = JSON.parse(data.state)
            } else {
                this.$root.ProjectState.ProjectInfo = {};
            }
        });
    },
    render: h => h(App)
}).$mount('#app')