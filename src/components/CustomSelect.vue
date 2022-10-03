<template lang="pug">
a-select(
    v-model:value="chosenOption"
    :placeholder="placeholder"
    allowClear
    class="select"
    @change="selectChangeHandler"
)
    a-select-option(v-for="option in options" :value="option" :key="option") {{ option }}
</template>

<script>
export default {
    name: 'CustomSelect',
    props: {
        selectName: {
            type: String,
            requred: true
        },
        options: {
            type: Array,
            requred: true
        },
        placeholder: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            chosenOption: null
        }
    },
    methods: {
        selectChangeHandler() {
            this.$emit('chosenOptionChanged', {
                valueKey: this.selectName,
                value: this.chosenOption
            });
        }
    }
}
</script>

<style lang="scss" scoped>
	.select {
		width: 100%;
	}
</style>