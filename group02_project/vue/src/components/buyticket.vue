<template>
<!-- หน้าแสดงรอบฉาย -->
  <div class="ui center container">
    <div class="ui inverted segment">
      <h1 class="ui yellow dividing header">
        <i class="ticket icon"></i>Buy ticket
      </h1>
      <div class="ui segment">
        <div class="ui center container" style="text-align: center">
          <div class="ui ordered steps">
            <div class="step">
              <div class="content">
                <div class="title">Showtime</div>
                <div class="description">Select Showtime</div>
              </div>
            </div>
            <div class="disabled step">
              <div class="content">
                <div class="title">Booking</div>
                <div class="description">Select Seats</div>
              </div>
            </div>
            <div class="disabled step">
              <div class="content">
                <div class="title">Confirm Order</div>
                <div class="description">Verify order details</div>
              </div>
            </div>
          </div>
        </div>

        <h3 class="ui yellow inverted top attached header">
          <i class="map marker alternate icon"></i>SM cinema
        </h3>
        <div class="ui attached segment">
          <div class="ui internally celled grid">
            <div class="row">
              <div class="four wide column" style="text-align: right">
                <h1 class="ui brown header">
                  <i class="film icon"></i>Theatre
                </h1>
                <h5 class="ui brown header">
                  <font size="36">{{Movie.theatre}}</font>
                </h5>
              </div>
              <div class="ten wide column">
                <h3 class="head">{{Movie.movieName}}</h3>
                <p>{{Movie.movieNameThai}}</p>

                <div class="ui meta">
                  {{Movie.length}} minutes |
                  <i class="volume up icon"></i>TH
                </div>

                <a v-if="this.can[0]==0">
                  <button class="ui disabled button">{{Movie.showTime[0]}}</button>
                </a>

                <a v-else>
                  <router-link
                    :to="{ path: 'buyticket/selectPosition/' + this.Movie._id+ '/'+ '1'}"
                  >
                    <button class="ui inverted brown button">{{Movie.showTime[0]}}</button>
                  </router-link>
                </a>

                <a v-if="this.can[2]==0">
                  <button
                    class="ui disabled button"
                    style="margin:0px 0px 0px 30px"
                  >{{Movie.showTime[2]}}</button>
                </a>
                <a v-else>
                  <router-link
                    :to="{ path: 'buyticket/selectPosition/' + this.Movie._id+ '/'+ '3'}"
                  >
                    <button
                      class="ui inverted brown button"
                      style="margin:0px 0px 0px 30px"
                    >{{Movie.showTime[2]}}</button>
                  </router-link>
                </a>

                <a v-if="this.can[4]==0">
                  <button
                    class="ui disabled button"
                    style="margin:25px 0px 0px 30px"
                  >{{Movie.showTime[4]}}</button>
                </a>
                <a v-else>
                  <router-link
                    :to="{ path: 'buyticket/selectPosition/' + this.Movie._id+ '/'+ '5'}"
                  >
                    <button
                      class="ui inverted brown button"
                      style="margin:25px 0px 0px 30px"
                    >{{Movie.showTime[4]}}</button>
                  </router-link>
                </a>
              </div>
            </div>
            <div class="row">
              <div class="four wide column" style="text-align: right">
                <h1 class="ui brown header">
                  <i class="film icon"></i>Theatre
                </h1>
                <h5 class="ui brown header">
                  <font size="36">{{Movie.theatre}}</font>
                </h5>
              </div>
              <div class="ten wide column">
                <h3 class="head">{{Movie.movieName}}</h3>
                <p>{{Movie.movieNameThai}}</p>
                <div class="ui meta">
                  {{Movie.length}} minutes |
                  <i class="volume up icon"></i>EN / TH
                </div>

                <a v-if="this.can[1]==0">
                  <button
                    class="ui disabled button"
                    style="margin:20px 0px 0px"
                  >{{Movie.showTime[1]}}</button>
                </a>
                <a v-else>
                  <router-link
                    :to="{ path: 'buyticket/selectPosition/' + this.Movie._id+ '/'+ '2'}"
                  >
                    <button
                      class="ui inverted brown button"
                      style="margin:20px 0px 0px"
                    >{{Movie.showTime[1]}}</button>
                  </router-link>
                </a>

                <a v-if="this.can[3]==0">
                  <button
                    class="ui disabled button"
                    style="margin:25px 0px 0px 30px"
                  >{{Movie.showTime[3]}}</button>
                </a>
                <a v-else>
                  <router-link
                    :to="{ path: 'buyticket/selectPosition/' + this.Movie._id+ '/'+ '4'}"
                  >
                    <button
                      class="ui inverted brown button"
                      style="margin:25px 0px 0px 30px"
                    >{{Movie.showTime[3]}}</button>
                  </router-link>
                </a>
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
  data() {
    return {
      title: "moviedetails",
      Movie: {
        movieName: "",
        movieNameThai: "",
        details: "",
        imageUrl: "",
        length: "",
        trailer: "",
        price: "",
        theatre: "",
        showTime: [],
        status: ""
      },
      can: []
    };
  },
  beforeMount(){
    if(!this.status){
      alert("Please Login")
      this.$router.push("/signin");
    }
  },
  mounted() {
    if(this.status){
      //get รายละเอียดหนังจาก Databasse โดย ID
      axios 
      .get("http://localhost:3001/getShowtime/" + this.$route.params.movieId)
      .then(response => {
        this.Movie = response.data;        
        var now = new Date();
        for (var i = 0; i < this.Movie.showTime.length; i++) {
          if (
            now.getHours() + now.getMinutes() / 100 <=
            parseFloat(this.Movie.showTime[i])
          ) {
            this.book = 1;
            this.can[i] = 1;
          } else {
            this.book = 0;
            this.can[i] = 0;
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
    }
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

<style scoped>
</style>
