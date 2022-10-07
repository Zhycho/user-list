<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { StarFilled }  from '@ant-design/icons-vue';

const store = useStore()

const usersOnly = computed(() => store.getters.usersOnly);
const filterValues = computed(() => store.state.filterValues);
const filteredUsers = computed(() => {
    let filteredUsers = usersOnly.value;
    if (filterValues.value.country) filteredUsers = filteredUsers.filter((item) => item.country === filterValues.value.country);
    if (filterValues.value.score) filteredUsers = filteredUsers.filter((item) => filterByScore(item.score));
    return filteredUsers;
});

function filterByScore(scoreValue) {
    const pureFilterValue = filterValues.value.score.match(/\d+/)[0];
    if (/>/.test(filterValues.value.score)) {
        return scoreValue > pureFilterValue;
    } else if (/</.test(filterValues.value.score)) {
        return scoreValue < pureFilterValue;
    }
    return +scoreValue === +pureFilterValue;
}

function isShowItemBottom(item) {
    return item.score && item.country;
}

const setDataUsers = () => store.dispatch('setDataUsers');
onMounted(() => {
    // setDataUsers(); // т.к. изначально есть TEST_DATA
});
</script>

<template lang="pug">
a-list(:data-source="filteredUsers" bordered item-layout="horizontal" class="list")
    template(#renderItem="{ item }")
        a-list-item
            a-list-item-meta
                template(#avatar)
                    a-tooltip(v-if="item.address" :title="item.address" trigger="click")
                        a-avatar(:src="item.avatar" class="clickable")
                    a-avatar(v-else :src="item.avatar")
                template(#title)
                    span(v-html="item.title")
                template(#description)
                    span(v-if="item.subtitle" v-html="item.subtitle")
                    .list-item-bottom(v-if="isShowItemBottom(item)")
                        span(v-if="item.country") From: {{ item.country }}
                        span.score-value(v-if="item.score") {{ item.score }}
                            star-filled(class="star-icon")
</template>

<style lang="scss" scoped>
    .clickable {
        cursor: pointer;
    }

	.star-icon {
		color: gold;
	}

    .list {
        max-height: calc(100vh - 2rem);
        overflow: auto;

        @media (max-width: 767px) {
            max-height: calc(100vh - 6rem);
        }

        @media (max-width: 575px) {
            max-height: calc(100vh - 9rem);
        }

        .ant-list-item {
            padding-left: 1rem;
            padding-right: 1rem;
        }
    }

    .list-item-bottom {
        color: rgba(0, 0, 0, 0.85);
        display: flex;
        gap: 1rem;
        margin-top: .75rem;
    }

    .score-value {
        align-items: center;
        display: flex;
        font-weight: 500;
        gap: 0.25rem;
    }
</style>