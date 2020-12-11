<template>
	<div class="display-board">
		<h4>Number of Repositories</h4>
		<div class="number">
		{{numberOfUsers}}
		</div>
	</div>
</template>

<script>
	export default {
		name: 'DisplayBoard',
		props: ['numberOfUsers']
	}
</script>