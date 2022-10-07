<script setup>
import { ref } from 'vue';

const props = defineProps({
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
})

const emit = defineEmits({
    chosenOptionChanged({ valueKey, value }) {
        return valueKey && value;
    }
});
const chosenOption = ref(null);

function selectChangeHandler() {
    emit('chosenOptionChanged', {
        valueKey: props.selectName,
        value: chosenOption
    });
}
</script>

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

<style lang="scss" scoped>
	.select {
		width: 100%;
	}
</style>