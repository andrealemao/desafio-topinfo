<template>
  <div class="container">
    <div class="row">
      <div class="col-md-7 mrgnbtm">
        <h2>Search repositories</h2>
        <form>
          <div class="row">
            <div class="form-group col-md-6">
              <label htmlFor="exampleInputEmail1">Language</label>
              <input
                type="text"
                class="form-control"
                v-model="language"
                name="language"
                id="language"
                aria-describedby="emailHelp"
                placeholder="Ex: java"
              />
            </div>
          </div>
          <button
            v-bind:disabled="language == ''"
            type="button"
            @click="getRepositories()"
            class="btn btn-danger"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RepositorySave",
  data() {
    return {
      language: "",
      page: 1,
    };
  },
  methods: {
    getRepositories() {
      const payload = {
        language: this.language,
        page: this.page,
      };
      this.$emit("getRepositories", payload);
      this.clearForm();
    },
    clearForm() {
      this.language = "";
    },
  },

  created: function () {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed: function () {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>