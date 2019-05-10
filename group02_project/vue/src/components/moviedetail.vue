<template>
  <!-- หน้าแสดงรายละเอียดหนัง -->
  <div class="ui center container">
    <div class="ui inverted segment">
      <h1 class="ui yellow dividing header"></h1>
      <div class="ui segment">
        <div class="ui center container">
          <h1 class="ui dividing header">
            {{Movie.movieName}}
            <h2 class="ui header">
              <div class="sub header">
                {{Movie.movieNameThai}}
                <br>
                <i class="clock icon"></i>
                Length: {{Movie.length}} minutes
              </div>
            </h2>
          </h1>
          <div class="ui grid">
            <div class="four wide column" style="text-align: left">
              <img v-bind:src="Movie.imageUrl" class="ui medium rounded image">
            </div>

            <div class="ten wide column" style="text-align: center">
              <iframe width="800" height="550" v-bind:src="Movie.trailer"></iframe>
            </div>
          </div>

          <h3 class="ui yellow inverted top attached header">
            <i class="book icon"></i>Synopsis
          </h3>
          <div class="ui attached segment">
            <p>{{Movie.details}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "movie detail",
  data() {
    return {
      title: "moviedetails",
      Movie: {
        movieName: "",
        movieNameThai: "",
        details: "",
        imageUrl: "",
        length: "",
        trailer: ""
      }
    };
  },

  mounted() {
    //ดึงข้อมูลหนังจาก Database ด้วย ID
    axios
      .get(
        "http://localhost:3001/getMovies/details/" + this.$route.params.movieId
      )
      .then(response => {
        console.log(response.data);
        this.Movie = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
