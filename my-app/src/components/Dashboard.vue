<template>
  <div class="hello">
    <Header />
    <div class="container mrgnbtm">
      <div id="app">
        <b-alert
          :show="dismissCountDown"
          dismissible
          fade
          variant="danger"
          @dismiss-count-down="countDownChanged"
        >
          {{ errorMessage }}
        </b-alert>
      </div>
      <div class="row">
        <div class="col-md-8">
          <GetRepositories @getRepositories="getRepositories($event)" />
        </div>
        <div class="col-md-4" @scroll="handleScroll">
          <DisplayBoard
            :numberOfUsers="numberOfUsers"
            @getRepositories="getRepositories()"
          />
        </div>
      </div>
    </div>
    <div class="row mrgnbtm">
      <Repositories
        v-if="repositories.length > 0"
        :repositories="repositories"
        :language="language"
      />
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue"
import GetRepositories from "./GetRepositories"
import DisplayBoard from "./DisplayBoard.vue"
import Repositories from "./Repositories"
import { getRepositories } from "../services/RepositoryService"

export default {
  name: "Dashboard",
  components: {
    Header,
    GetRepositories,
    DisplayBoard,
    Repositories,
  },
  data() {
    return {
      repositories: [],
      numberOfUsers: 0,
      language: "",
      errorMessage: "",
      dismissSecs: 5,
      dismissCountDown: 0,
      page: 1,
      hasScrolledToBottom: true,
    }
  },
  methods: {
    getRepositories(data) {
      getRepositories(data).then((response) => {
				console.log("primeira req", this.page)
        if (response.status != 442) {
          this.repositories = response
          this.numberOfUsers = this.repositories.length
          if (response.length > 0) {
            this.language = response[0].language
          }
        } else {
          this.errorMessage = response.message
          this.repositories = []
          this.numberOfUsers = 0
          this.showAlert()
        }
      })
    },

    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },

    showAlert() {
      this.dismissCountDown = this.dismissSecs
    },

    handleScroll() {
      let scrollTopHeight = Math.floor(document.documentElement.scrollHeight - document.documentElement.scrollTop)
      let bottomOfWindow = scrollTopHeight === Math.floor(document.documentElement.clientHeight)

      if (bottomOfWindow) {
				console.log("pagina antes",this.page)
        this.page++
				console.log("pagina depois",this.page)
        let payload = {
          language: this.language.toLocaleLowerCase(),
          page: this.page,
        }
        getRepositories(payload).then((response) => {
          if (response.status != 442) {
						this.repositories = [...this.repositories, ...response]
            this.numberOfUsers = this.repositories.length
          }
				})
      }
    },
  },

  created: function () {
    window.addEventListener("scroll", this.handleScroll)
  },

  destroyed: function () {
    window.removeEventListener("scroll", this.handleScroll)
  },
}
</script>