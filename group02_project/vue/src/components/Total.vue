<template>
  <div class="Total">
    <div class="ui center container">
      <div class="ui inverted segment">
        <h1 class="ui yellow dividing header">
          <i class="money icon"></i>Confirm Order
        </h1>

        <div class="ui center container" style="text-align: center">
          <div class="ui ordered steps">
            <div class="completed step">
              <div class="content">
                <div class="title">Showtime</div>
                <div class="description">Select Showtime</div>
              </div>
            </div>
            <div class="completed step">
              <div class="content">
                <div class="title">Booking</div>
                <div class="description">Select Seats</div>
              </div>
            </div>
            <div class="step">
              <div class="content">
                <div class="title">Confirm Order</div>
                <div class="description">Verify order details</div>
              </div>
            </div>
          </div>
        </div>

        <div class="ui segment">
          <div class="ui grid">
            <div class="four wide column">
              <img class="ui rounded image" :src="form.imageUrl" width="250px" height="350px">
            </div>
            <div class="seven wide column">
              <h3 class="ui yellow inverted top attached header">Order Confirmation</h3>
              <div class="ui attached segment" style="text-align: left">
                <h1 class="ui dividing header">
                  {{form.movieName}}
                  <div class="sub header">
                    {{form.movieNameThai}} |
                    <i class="clock icon" width="60px" height="60px"></i>
                    Length: {{form.length}} minutes
                  </div>
                </h1>
                <img
                  class="ui rounded image"
                  src="../assets/chair_red.png"
                  width="60px"
                  height="60px"
                >
                <h3 class="ui header">Seat : {{this.$route.params.seat}}</h3>
                <h4 class="ui header">Theater : {{form.theatre}}</h4>
                <div class="description">Date: {{getdate(startTime)}}</div>
                <div class="description">Time: {{gettime(startTime)}}</div>
                <h1 class="ui red right aligned header">Price: {{form.price}}</h1>
              </div>
            </div>
            <div class="five wide column">
              <h3 class="ui yellow inverted top attached header">Time remander</h3>
              <div class="ui attached segment" style="text-align: center">
                <h1>
                  <i class="clock icon"></i>
                </h1>
                <h1 id="time" v-html="time" style="text-align: center"></h1>
                <div class="ui fluid inverted red button" @click="pause">Cancel</div>
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
  name: "Total",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      state: "started",
      startTime: Date.now(),
      currentTime: Date.now(),
      interval: null,
      destinationTime: Date.now() + 1800000,
      form: {},
      colorredCheck: [],
      sessName: "",
      row: "",
      col: 0
    };
  },
  methods: {
    gettime(time) {
      return new Date(time).getHours() + ":" + new Date(time).getMinutes();
    },
    getdate(time) {
      return new Date(time).toDateString();
    },
    reset: function() {
      this.form.state = "started";
      this.form.startTime = Date.now();
      this.form.currentTime = Date.now();
      this.form.destinationTime = Date.now() + 1799000;
    },
    //เมื่อกดปุ่ม cancel จะยกเลิกการจองและกลับมาสู่หน้าหลัก
    pause: function() {
      this.form.state = "paused";
      let newData = {
        showTime: this.form.showTime,
        seat: this.form.seat,
        booked: this.form.booked,
        confirm: this.form.confirm,
        theatre: this.form.theatre,
        movieName: this.form.movieName,
        movieNameThai: this.form.movieNameThai,
        round: this.$route.params.round
      };

      for (let i = 0; i < this.col * this.row.length; i++) {
        if (this.getround(this.$route.params.round)[i] == i) {
          if (this.getsessround(this.$route.params.round)[i] == this.sessName) {
            this.getsessround(this.$route.params.round)[i] = "";
            this.getround(this.$route.params.round)[i] = "";

            axios
              .post(
                "http://localhost:3001/Theatre/theatreupdate/" +
                  this.form.id_theatre,
                newData
              )
              .then(response => {
                console.log(response);
              })
              .catch(error => {});
          }
        }
      }
      alert("cancel order");
      this.$router.replace("/movie");
    },
    resume: function() {
      this.form.state = "started";
    },
    updateCurrentTime: function() {
      if (this.form.state == "started") {
        this.currentTime = Date.now();
      }
    },
    getround(round) {
      let newData = {
        showTime: this.form.showTime,
        seat: this.form.seat,
        booked: this.form.booked,
        confirm: this.form.confirm,
        theatre: this.form.theatre,
        movieName: this.form.movieName,
        movieNameThai: this.form.movieNameThai
      };
      if (round == 1) {
        return newData.seat[0].round1;
      } else if (round == 2) {
        return newData.seat[0].round2;
      } else if (round == 3) {
        return newData.seat[0].round3;
      } else if (round == 4) {
        return newData.seat[0].round4;
      } else if (round == 5) {
        return newData.seat[0].round5;
      }
    },
    getsessround(round) {
      let newData = {
        showTime: this.form.showTime,
        seat: this.form.seat,
        booked: this.form.booked,
        confirm: this.form.confirm,
        theatre: this.form.theatre,
        movieName: this.form.movieName,
        movieNameThai: this.form.movieNameThai
      };
      if (round == 1) {
        return newData.seat[0].sessSeat1;
      } else if (round == 2) {
        return newData.seat[0].sessSeat2;
      } else if (round == 3) {
        return newData.seat[0].sessSeat3;
      } else if (round == 4) {
        return newData.seat[0].sessSeat4;
      } else if (round == 5) {
        return newData.seat[0].sessSeat5;
      }
    }
  },
  destroyed: function() {
    clearInterval(this.interval);
  },
  computed: {
    time: function() {
      return this.hours + ":" + this.minutes + ":" + this.seconds;
    },
    milliseconds: function() {
      return this.destinationTime - this.currentTime;
    },
    hours: function() {
      var lapsed = this.milliseconds;
      var hrs = Math.floor(lapsed / 1000 / 60 / 60);
      return hrs >= 10 ? hrs : "0" + hrs;
    },
    minutes: function() {
      var lapsed = this.milliseconds;
      var min = Math.floor((lapsed / 1000 / 60) % 60);
      return min >= 10 ? min : "0" + min;
    },
    seconds: function() {
      var lapsed = this.milliseconds;
      var sec = Math.ceil((lapsed / 1000) % 60);
      return sec >= 10 ? sec : "0" + sec;
    },
    status() {
      return store.state.status;
    },
    username() {
      return store.state.Username;
    },
    permission() {
      return store.state.permission;
    }
  },
  beforeMount() {
    if (!this.status) {
      alert("Please Login");
      this.$router.push("/signin");
    }
  },
  mounted() {
    if (this.status) {
      this.sessName = this.username;
      this.resume();
      this.interval = setInterval(this.updateCurrentTime, 1000);
      this.form.seat = this.$route.params.seat;
      this.form.price = this.$route.params.price;
      console.log(this.$route.params);
      axios
        .get("http://localhost:3001/getMovies/details/" + this.$route.params.id)
        .then(response => {
          this.form.movieNameThai = response.data.movieNameThai;
          this.form.movieName = response.data.movieName;
          this.form.length = response.data.length;
          this.form.imageUrl = response.data.imageUrl;
          this.form.theatre = response.data.theatre;
          axios
            .get("http://localhost:3001/Theatre/" + this.form.theatre)
            .then(response => {
              this.form.id_theatre = response.data[0]._id;
              this.row = response.data[0].seat[0].row;
              this.col = response.data[0].seat[0].col;
              (this.form.showTime = response.data[0].showTime),
                (this.form.time = this.form.showTime[this.$route.params.round]);
              console.log(this.$route.params.round)(
                (this.form.seat = response.data[0].seat)
              ),
                (this.form.booked = response.data[0].booked),
                (this.form.confirm = response.data[0].confirm);
              this.getround(this.$route.params.round);
              this.getsessround(this.$route.params.round);

              for (var i = 0; i < this.col * this.row.length; i++) {
                if (this.getround(this.$route.params.round).length > 0) {
                  for (var j = 0; j < this.col * this.row.length; j++) {
                    if (
                      String(i) == this.getround(this.$route.params.round)[j]
                    ) {
                      this.colorredCheck[i] = "green";
                      break;
                    } else {
                      this.colorredCheck[i] = "red";
                    }
                  }
                } else {
                  this.colorredCheck[i] = "red";
                }

                if (this.form.booked[0].sessBooked.length > 0) {
                  this.sessBooked = this.form.booked[0].sessBooked;
                } else {
                  this.sessBooked[i] = "";
                }
              }
            })
            .catch(error => {});
        })
        .catch(error => {});
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
