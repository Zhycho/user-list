<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import CustomSelect from './CustomSelect';

const store = useStore();

const countryParams = computed(() => store.getters.countryParams);
const scoreParams = computed(() => store.getters.scoreParams);

const setFilterValue = (payload) => store.dispatch('setFilterValue', payload);
</script>

<template lang="pug">
a-row(
    :gutter="[16, 16]"
    align="top"
    justify="center"
)
    a-col(:span="24" :sm="12" :md="24")
        custom-select(
            :options="countryParams"
            select-name="country"
            placeholder="Filter by country"
            @chosenOptionChanged="setFilterValue"
        )
    a-col(:span="24" :sm="12" :md="24")
        custom-select(
            :options="scoreParams"
            select-name="score"
            placeholder="Filter by score"
            @chosenOptionChanged="setFilterValue"
        )
</template>