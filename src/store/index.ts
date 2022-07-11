import { createStore } from "vuex";

export default createStore({
    state: {
        token: ""
    },
    mutations: {//commit
        "updateToken": (state, data) => {
            state.token = data;
        },
    },
    actions: {//异步 // dispatch
        update: async (ctx) => {

        }
    },
    getters: {
        getToken: (state) => {
            return state.token;
        },
    },
    modules: {//子store

    }
})