<template>
	<div class="container">
		<div class="row">
			<div class="col-md-7 mrgnbtm">
			<h2>Search repositories</h2>
				<form>
					<div class="row">
						<div class="form-group col-md-6">
							<label htmlFor="exampleInputEmail1">Language</label>
							<input type="text" class="form-control" v-model="language" name="language" id="language" aria-describedby="emailHelp" placeholder="Ex: java" />
						</div>
					</div>
					<button v-bind:disabled="language == ''" type="button" @click='getRepositories()' class="btn btn-danger">Search</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'RepositorySave',
		props: ['error', 'errorMessage'],
		data() {
			return {
			language: '',
			}
		},
		methods: {
			getRepositories() {
				this.$emit('getRepositories', this.language)
				this.clearForm()
			},
			clearForm() {
				this.language = "";
			}
		}
	}
</script>