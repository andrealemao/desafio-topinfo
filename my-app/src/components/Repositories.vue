<template>
	<div class="container">
		<h2>{{language}}</h2>

		<table class="table table-bordered">
			<thead>
				<tr>
					<th>Photo</th>
					<th>Name</th>
					<th>Stars</th>
					<th>Number of Forks</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in repositories" :key="item.id">
					<td><img :src="item.owner.avatar_url" width="50px" /></td>
					<td>{{ item.name }}</td>
					<td>{{ item.stargazers_count }}</td>
					<td>{{ item.forks }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	export default {
		name: "Repositories",
		props: ["repositories", "language"]
	}
</script>