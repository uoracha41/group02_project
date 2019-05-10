<template>
  <!-- หน้าเพิ่มหนัง -->
  <div class="ui center container">
    <div class="ui inverted segment">
      <h1 class="ui yellow dividing header">Add Movie</h1>
      <div class="ui segment">
        <div class="ui segment">
          <form class="ui form">
            <div class="required field">
              <label>Movie name (ENG)</label>
              <input
                type="text"
                name="mname"
                v-model="Movie.movieName"
                placeholder="movie name (ENG)"
              >
            </div>
            <div class="required field">
              <label>Movie name (TH)</label>
              <input
                type="text"
                name="mname"
                v-model="Movie.movieNameThai"
                placeholder="movie name (TH)"
              >
            </div>
            <div class="required field">
              <label>length</label>
              <input type="text" name="length" v-model="Movie.length" placeholder="length">
            </div>
            <div class="required field">
              <label>Image Url</label>
              <input type="text" name="Image Url" v-model="Movie.imageUrl" placeholder="image Url">
            </div>

            <div class="required field">
              <label>Trailer Url</label>
              <input
                type="text"
                name="Trailer Url"
                v-model="Movie.trailer"
                placeholder="trailer Url"
              >
            </div>
            <div class="required field">
              <label>price</label>
              <input type="text" name="price" v-model="Movie.price" placeholder="price">
            </div>

            <div class="ui disabled field">
              <label>Theatre</label>
              <input type="text" v-model="Movie.theatre">
            </div>

            <div class="required field">
              <label>Show time (TH)</label>
            </div>
            <div class="ui required input">
              <input type="text" v-model="Movie.showTime[0]" placeholder="round 1">
            </div>
            <div class="ui input">
              <input type="text" v-model="Movie.showTime[2]" placeholder="round 2">
            </div>
            <div class="ui input">
              <input type="text" v-model="Movie.showTime[4]" placeholder="round 3">
            </div>
            <br>
            <br>
            <div class="required field">
              <label>Show time (EN/TH)</label>
            </div>
            <div class="ui input">
              <input type="text" v-model="Movie.showTime[1]" placeholder="round 1">
            </div>
            <div class="ui input">
              <input type="text" v-model="Movie.showTime[3]" placeholder="round 2">
            </div>
            <br>
            <br>

            <div class="required field">
              <label>Synopsis</label>
              <textarea v-model="Movie.details" placeholder="synopsis"></textarea>
            </div>
          </form>
          <div class="button" style="text-align: center; margin-top:3%">
            <!-- <button class="ui blue basic button" @click="updateToAPI"> -->
            <button class="ui inverted blue button" @click="addToAPI">
              <i class="save icon"></i>
              Save
            </button>
            <button class="ui inverted red button" onclick="window.location.href = '#/movieadmin';">
              <i class="close icon"></i>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "addmovie",
  data() {
    return {
      Movie: {
        movieName: "",
        movieNameThai: "",
        details: "",
        imageUrl: "",
        length: "",
        trailer: "",
        price: "",
        showTime: [],
        status: "",
        theatre: ""
      }
    };
  },

  mounted() {
    axios
      .get("http://localhost:3001/editmovie/add/" + this.$route.params.movieId)
      .then(response => {
        this.Movie.theatre = response.data.theatre;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    //เพิ่มหนังใหม่เข้าไปใน Database
    addToAPI() {
      let newMovie = {
        movieName: this.Movie.movieName,
        movieNameThai: this.Movie.movieName,
        details: this.Movie.details,
        imageUrl: this.Movie.imageUrl,
        length: this.Movie.length,
        trailer: this.Movie.trailer,
        price: this.Movie.price,
        showTime: this.Movie.showTime,
        status: true,
        theatre: this.Movie.theatre
      };
      axios
        .post(
          "http://localhost:3001/editmovie/add/" + this.$route.params.movieId,
          newMovie
        )
        .then(response => {
          alert("success!!");
          this.$router.replace("/movieadmin");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
