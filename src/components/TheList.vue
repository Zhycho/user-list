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

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { StarFilled }  from '@ant-design/icons-vue';

export default {
    name: 'TheList',
    components: {
        StarFilled
    },
    computed: {
        ...mapState(['filterValues']),
        ...mapGetters(['usersOnly']),
        filteredUsers() {
            let filteredUsers = this.usersOnly;
            if (this.filterValues.country) filteredUsers = filteredUsers.filter((item) => item.country === this.filterValues.country)
            if (this.filterValues.score) filteredUsers = filteredUsers.filter((item) => this.filterByScore(item.score));
            return filteredUsers;
        }
    },
    mounted() {
        // this.setDataUsers(); // т.к. изначально есть TEST_DATA
    },
    methods: {
        ...mapActions(['setDataUsers']),
        filterByScore(scoreValue) {
            const pureFilterValue = this.filterValues.score.match(/\d+/)[0];
            if (/>/.test(this.filterValues.score)) {
                return scoreValue > pureFilterValue;
            } else if (/</.test(this.filterValues.score)) {
                return scoreValue < pureFilterValue;
            }
            return +scoreValue === +pureFilterValue;
        },
        isShowItemBottom(item) {
            return item.score && item.country;
        }
    }
}
</script>

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