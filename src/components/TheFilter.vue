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

<script>
import CustomSelect from './CustomSelect';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'TheFilter',
    components: {
        CustomSelect
    },
    computed: {
        ...mapGetters(['countryParams', 'scoreParams']),
    },
    methods: {
        ...mapActions(['setFilterValue']),
    }
}
</script>