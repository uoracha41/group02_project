<template>
<!-- หน้าแสดงรายการหนัง -->
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
              <div class="ui column">
                <router-link :to="{ path: 'details/' + i._id}">
                  <div class="ui link card" style="margin:10% 0% 5% 25%">
                    <div class="image">
                      <img v-bind:src="i.imageUrl">
                    </div>

                    <div class="content" style="text-align: left">
                      <a class="header">{{i.movieName}}</a>
                      <a class="meta">{{i.movieNameThai}}</a>
                    </div>
                  </div>
                </router-link>
                <router-link :to="{ path: 'buyticket/' + i._id}">
                  <div
                    class="fluid yellow ui button"
                    style="margin:10px 0px 10px 25%"
                    onclick="window.location.href ='#/buyticket'"
                  >
                    <i class="ticket icon"></i>Buy now
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
import axios from "axios";
export default {
  name: "Movie",
  data() {
    return {
      Movie: []
    };
  },
  mounted() {
    //ดึงข้อมูลหนังจาก Database
    axios
      .get("http://localhost:3001/getMovies")
      .then(response => {
        console.log(response.data);
        this.Movie = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
