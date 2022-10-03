import { createStore } from 'vuex';
import axios from 'axios'

const TEST_DATA = {
    items: [
        'russia',
        'usa',
        '> 20',
        '< 10',
    ],
    variant: 'default',
    users: [
        { header: 'List' },
        {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            title: 'Brunch this weekend?',
            subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
            country: 'russia',
            score: 30,
            address: 'Stavropol, Botanicheskiy Per., bld. 4, appt. 28'
        },
        { divider: true, inset: true },
        {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
            subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
            country: 'russia',
            score: 25,
            address: 'Moskva, Azovskaya Ul., bld. 37/К. 3, appt. 33'
        },
        { divider: true, inset: true },
        {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            title: 'Oui oui',
            subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
            country: 'usa',
            score: 12,
            address: 'Texas, Lewisville, 1690 Charla Lane'
        },
        { divider: true, inset: true },
        {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
            title: 'Birthday gift',
            subtitle: '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
            country: 'russia',
            score: 27,
            address: 'Kostroma, Sovetskaya Ul., bld. 13/А, appt. 20'
        },
        { divider: true, inset: true },
        {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
            title: 'Recipe to try',
            subtitle: '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
            country: 'usa',
            score: 8,
            address: 'California, Fowler, 4686 Paradise Lane'
        },
    ],
}

const API = 'someapiurl'; // здесь может быть api для запроса юзеров

const store = createStore({
    state: {
        ...TEST_DATA,
        filterValues: {
            country: null,
            score: null
        }
    },
    getters: {
        usersOnly: (state) => state.users.filter((item) => item.title),
        countryParams: (state) => state.items.filter((param) => !/\d+/.test(param)),
        scoreParams: (state) => state.items.filter((param) => /\d+/.test(param))
    },
    mutations: {
        SET_DATA_USERS(state, payload) {
            state.users = payload;
        },
        SET_FILTER_VALUE(state, { valueKey, value }) {
            state.filterValues[valueKey] = value;
        }
    },
    actions: {
        async setDataUsers({ commit }) {
            try {
                const { data } = await axios.get(API);
                commit('SET_DATA_USERS', data);
            }
            catch (error) {
                console.error(error);
            }
        },
        setFilterValue({ commit }, payload) {
            commit('SET_FILTER_VALUE', payload);
        }
    }
});

export default store;