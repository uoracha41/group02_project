<template>
<!-- หน้าแสดงหนังในมุมมองของผู้ดูแลระบบ -->
  <div class="ui center container">
    <div class="ui inverted segment">
      <h1 class="ui yellow dividing header">
        <i class="film icon"></i>Movies
      </h1>
      <div class="ui segment">
        <!-- insert movie card -->
        <div class="ui three column grid">
          <div v-for="i in Movie" v-bind:key="i._id">
            <div v-if="i.status == true">
              <div class="column">
                <router-link :to="{ path: 'details/' + i._id}">
                  <div class="ui link card" style="margin:10% 0% 5% 25%">
                    <div class="image" data-position="right center">
                      <img v-bind:src="i.imageUrl">
                    </div>

                    <div class="content" style="text-align: left">
                      <a class="header">{{i.movieName}}</a>
                      <a class="meta">{{i.movieNameThai}}</a>
                    </div>
                  </div>
                </router-link>

                <router-link :to="{ path: 'edit/' + i._id}">
                  <div class="fluid red ui button" style="margin:10px 0px 10px 25%">
                    <i class="edit icon"></i>Edit
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../vuex/store.js";
import Vuex from "vuex";
global.vuex = Vuex;

import axios from "axios";
export default {
  name: "movieadmin",
  data() {
    return {
      Movie: []
    };
  },
  beforeMount() {
    if (!this.permission) {
      this.$router.push("/");
    }
  },
  mounted() {
    axios
      .get("http://localhost:3001/getMovies")
      .then(response => {
        // console.log(response.data);
        this.Movie = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  computed: {
    status() {
      return store.state.status;
    },
    username() {
      return store.state.Username;
    },
    permission() {
      return store.state.permission;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
