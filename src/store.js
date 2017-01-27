import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const now = new Date();
const store = new Vuex.Store({
    state: {
        user: {
            name: 'Victor',
            img: 'dist/images/Orange.png'
        },
        sessions: [
            {
                id: 1,
                user: {
                    name: 'User 1',
                    img: 'dist/images/Green.png'
                },
                messages: []                 
            },
            {
                id: 2,
                user: {
                    name: 'User 2',
                    img: 'dist/images/Yellow.png'
                },
                messages: [
                    {
                        content: 'Salut',
                        date: now
                    }
                ]
            },
            {
                id: 3,
                user: {
                    name: 'User 3',
                    img: 'dist/images/Pink.png'
                },
                messages: []
            }
        ],
        currentSessionId: 1,
        filterKey: ''
    },
    mutations: {
        INIT_DATA (state) {
            let data = localStorage.getItem('vue-chat-session');
            if (data) {
                state.sessions = JSON.parse(data);
            }
        },
        // Send a message
        SEND_MESSAGE ({ sessions, currentSessionId }, content) {
            let session = sessions.find(item => item.id === currentSessionId);
            session.messages.push({
                content: content,
                date: new Date(),
                self: true
            });
            var randomstring = require("randomstring"); 
            var resp = randomstring.generate();
            setTimeout(function() {session.messages.push({
                content: resp,
                date: new Date(),
                self: false
            });}, 5000);
        },
        SELECT_SESSION (state, id) {
            state.currentSessionId = id;
        } 
    }
});

store.watch(
    (state) => state.sessions,
    (val) => {
        console.log('CHANGE: ', val);
        localStorage.setItem('vue-chat-session', JSON.stringify(val));
    },
    {
        deep: true
    }
);

export default store;
export const actions = {
    initData: ({ dispatch }) => dispatch('INIT_DATA'),
    sendMessage: ({ dispatch }, content) => dispatch('SEND_MESSAGE', content),
    selectSession: ({ dispatch }, id) => dispatch('SELECT_SESSION', id),
    search: ({ dispatch }, value) => dispatch('SET_FILTER_KEY', value)
};
