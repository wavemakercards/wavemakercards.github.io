import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import db from "@/DexieDB";
export const store = new Vuex.Store({
    state: {
        lastUpdate: null,
        AppLoaded: false,
        Interface: {
            darkmode: true,
        }
    },
    mutations: {
        initialiseStore(state) {
            // gets the AppState from the database and replaces the state - allowing persistence


            db.AppState.get({ id: 1 }).then((result) => {
                return result;
            }).then(data => {
                if (data) {
                    this.replaceState(
                        Object.assign(state, JSON.parse(data.state))
                    )
                }
                state.AppLoaded = true
            });
        },
        StateChanger: (state, payload) => {
            // this is just an idea, payload has path and value
            // path is array of path from root state 
            // value is value .... duh
            if (payload.path.length < 1) {
                return false
            }
            let stateTarget = state
            let path = payload.path
            path.forEach((element, index) => {
                if (index === (path.length - 1)) {
                    stateTarget[element] = payload.value
                } else {
                    stateTarget = stateTarget[element]
                }
            });

        },
    },
    actions: {
        initialiseStore: ({
            commit
        }) => {
            commit("initialiseStore");
        },
        StateChanger: ({
            commit
        }, payload) => {
            commit("StateChanger", payload);
        },
    }
})

store.subscribe((mutation, state) => {
    if (state.AppLoaded) {
        // Store the state object in the Database AppState Table
        // but only if the LOAD has been done
        db.AppState
            .put({ id: 1, state: JSON.stringify(state) })
            .then(function(updated) {
                if (updated) {
                    //Cool updated!");
                } else {
                    //Tits Up");
                }
            });
    }
    // Store the state object as a JSON string in localstorage (alternative)
    //  localStorage.setItem('WaveMakerStore', JSON.stringify(state));
});

export default store;