<template>
	<div class="hello">
		<Header />
		<div class="container mrgnbtm">
			<div id='app'>
				<b-alert variant="danger" :show="error" fade dismissible> {{ errorMessage }} </b-alert>
			</div>
			<div class="row">
				<div class="col-md-8">
					<GetRepositories @getRepositories="getRepositories($event)" :error="error" :errorMessage="errorMessage" />
				</div>
				<div class="col-md-4">
					<DisplayBoard :numberOfUsers="numberOfUsers" @getRepositories="getRepositories()" />
				</div>
			</div>
		</div>
		<div class="row mrgnbtm">
			<Repositories v-if="repositories.length > 0" :repositories="repositories" :language="language" />
		</div>
	</div>
</template>

<script>
import Header from './Header.vue'
import GetRepositories from './GetRepositories'
import DisplayBoard from './DisplayBoard.vue'
import Repositories from './Repositories'
import { getRepositories, } from '../services/RepositoryService'

export default {
	name: 'Dashboard',
	components: {
		Header,
		GetRepositories,
		DisplayBoard,
		Repositories
	},
	data() {
		return {
			repositories: [],
			numberOfUsers: 0,
			language: '',
			error: false,
			errorMessage: ''
		}
	},
	methods: {
		getRepositories(data) {
			getRepositories(data)
				.then((response) => {
					console.log(response)
					if (response.status != 442) {
						this.error = false
						this.repositories = response
						this.numberOfUsers = this.repositories.length
						if (response.length > 0) {
							this.language = response[0].language
						}
					}else {
						this.error = true
						this.errorMessage = response.message
						this.repositories = []
						this.numberOfUsers = 0
					}
				})
		}
	}
}
</script>