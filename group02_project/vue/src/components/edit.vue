<template>
  <div class="ui center container">
    <div class="ui inverted segment">
      <h1 class="ui yellow dividing header">Edit</h1>
      <div class="ui segment">
        <div class="ui segment">
          <form class="ui form">
            <div class="required field">
              <label>Movie name (ENG)</label>
            
              <input
                type="text"
                name="mname"
                v-model="Movie.movieName"
                placeholder="Movie name (ENG)"
              >
            </div>
            <div class="required field">
              <label>Movie name (TH)</label>
              <input
                type="text"
                name="mname"
                v-model="Movie.movieNameThai"
                placeholder="Movie name (TH)"
              >
            </div>
            <div class="required field">
              <label>length</label>
              <input type="text" name="length" v-model="Movie.length" placeholder="length">
            </div>
            <div class="required field">
              <label>Image Url</label>
              <input type="text" name="Image Url" v-model="Movie.imageUrl" placeholder="Image Url">
            </div>

            <div class="required field">
              <label>Trailer Url</label>
              <input
                type="text"
                name="Trailer Url"
                v-model="Movie.trailer"
                placeholder="Trailer Url"
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
              <textarea v-model="Movie.details" placeholder="Synopsis"></textarea>
            </div>

            <div class="ui checked toggle checkbox">
              <input type="checkbox" v-model="Movie.status">
              <label>Showing</label>
            </div>
          </form>
          <div class="button" style="text-align: center; margin-top:3%">
            <button class="ui inverted blue button" @click="updateToAPI">
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
import store from "../vuex/store.js";
import Vuex from "vuex";
global.vuex = Vuex;

import axios from "axios";
export default {
  name: "edit",
  data() {
    return {
      title: "edit movie",
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
  beforeMount(){
    if(!this.permission){
      this.$router.push("/");
    }
  },
  mounted() {
    if(this.permission)
    {
      axios
        .get("http://localhost:3001/editmovie/" + this.$route.params.movieId)
        .then(response => {
          // console.log(response.data);
          // console.log(response.data.status);
          this.Movie = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed:{
    status(){
      return store.state.status;
    },
    username(){
      return store.state.Username;
    },
    permission(){
      return store.state.permission;
    },
  },
  methods: {
    //Update รายละเอียดที่แก้ไข
    updateToAPI() {
      console.log(this.$route.params.movieId);
      let newMovie = {
        movieName: this.Movie.movieName,
        movieNameThai: this.Movie.movieNameThai,
        details: this.Movie.details,
        imageUrl: this.Movie.imageUrl,
        length: this.Movie.length,
        trailer: this.Movie.trailer,
        price: this.Movie.price,
        showTime: this.Movie.showTime,
        status: this.Movie.status,
        theatre: this.Movie.theatre
      };
      // console.log(status);
      if (this.Movie.status == true) {
        // console.log(status);
        axios
          .post(
            "http://localhost:3001/editmovie/update/" +
              this.$route.params.movieId,
            newMovie
          )
          .then(response => {
            // console.log(response);
            this.$router.replace("/movieadmin");
          })
          .catch(error => {
            console.log(error);
          });
      } else if (this.Movie.status == false) {
        // console.log(newMovie);
        axios
          .post(
            "http://localhost:3001/editmovie/update/" +
              this.$route.params.movieId,
            newMovie
          )
          .then(response => {
            console.log(response);
            this.$router.replace("/addmovie/" + this.$route.params.movieId);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
