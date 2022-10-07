<script setup>
import UserList from "./components/UserList";
import TheFilter from "./components/TheFilter";
</script>

<template lang="pug">
a-layout(class="layout")
	a-layout-content(class="content-container")
		a-row(
			:gutter="[24, 32]"
			align="top"
			justify="center"
		)
			a-col(:span="24" :md="8")
				TheFilter
			a-col(:span="24" :md="16")
				UserList
</template>

<style lang="scss" scoped>
	.layout {
		background-color: #f5f5f7;
		min-height: 100vh;
	}

	.content-container {
		margin: 0 auto;
		max-width: 56.25rem;
		padding: 1rem;
		width: 100%;
	}
</style>