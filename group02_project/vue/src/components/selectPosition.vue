<template>
  <!-- หน้าเลือกที่นั่ง -->
  <div class="selectPosition">
    <div class="ui center container">
      <h1 class="ui yellow dividing header">
        <i class="hand point down outline icon"></i>Select Position
      </h1>
      <div class="ui center container" style="text-align: center">
        <div class="ui ordered steps">
          <div class="completed step">
            <div class="content">
              <div class="title">Showtime</div>
              <div class="description">Select Showtime</div>
            </div>
          </div>
          <div class="step">
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
      <div class="ui segment">
        <div class="ui grid">
          <div class="row">
            <div class="twelve wide column">
              <div class="row">
                <div class="twelve wide column">
                  <div class="ui middle aligned center aligned grid">
                    <img class="ui image" src="../assets/screen.png">
                  </div>
                </div>
                <br>
                <p></p>
                <div class="row">
                  <div class="twelve wide column">
                    <div class="ui middle aligned center aligned grid">
                      <div class="ui segment">
                        <table class="table">
                          <thead>
                            <th></th>
                            <td v-for="headcol in col" v-bind:key="headcol">
                              <strong class="ui equal width center aligned padded grid">{{headcol}}</strong>
                            </td>
                          </thead>
                          <tbody>
                            <tr v-for="chairrow in row" v-bind:key="chairrow">
                              <th>{{chairrow}}</th>

                              <td v-for="chaircol in col" v-bind:key="chaircol">
                                <div
                                  class="field"
                                  v-if="colorredCheck[(15*(chairrow.charCodeAt(0)-65))+chaircol-1] == 'red'"
                                  @click="markgreen(chaircol,chairrow)"
                                >
                                  <img
                                    class="ui image"
                                    src="../assets/chair_red.png"
                                    width="50px"
                                    height="50px"
                                  >
                                  <span></span>
                                </div>
                                <div
                                  class="field"
                                  v-else-if="colorredCheck[(15*(chairrow.charCodeAt(0)-65))+chaircol-1] == 'green'"
                                  @click="markred(chaircol,chairrow)"
                                >
                                  <img
                                    class="ui image"
                                    src="../assets/chair_green.png"
                                    width="50px"
                                    height="50px"
                                  >
                                  <span></span>
                                </div>
                                <div class="field" v-else>
                                  <img
                                    class="ui image"
                                    src="../assets/chair_gray.png"
                                    width="50px"
                                    height="50px"
                                  >
                                  <span></span>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="four wide column">
              <h3 class="ui orange dividing header">
                <i class="clipboard icon"></i>Information
              </h3>
              <div class="ui cards">
                <div class="card">
                  <div class="content">
                    <img
                      class="top floated ui image"
                      :src="form.imageUrl"
                      width="280px"
                      height="350px"
                    >
                    <div class="header">{{form.titleen}} {{form.titleth}}</div>
                    <div class="description">{{form.date}}</div>
                    <div class="description">
                      <i class="clock icon"></i>
                      {{form.length}} Minutes
                    </div>
                    <div class="description">
                      <i class="film icon"></i>
                      Theater {{form.theatre}}
                    </div>
                    <div class="description">
                      <div class="ui divider"></div>
                      <div class="inline field">
                        <div class="ui right pointing label">Seat:</div>
                        <div class="ui label">{{getSeat()}}</div>
                      </div>
                    </div>
                    <div class="description">
                      <div class="ui divider"></div>
                      <div class="inline field">
                        <div class="ui right pointing label">Price:</div>
                        <div class="ui label">{{calculate()}}</div>
                      </div>
                    </div>
                  </div>
                  <div class="extra content">
                    <router-link
                      :to="{ path:'/Total/' + this.form.id +'/'+ this.$route.params.round +'/' + gettime() + '/' + calculate() + '/' + getSeat()}"
                    >
                      <div class="ui two buttons">
                        <div class="ui inverted green button" @click="buyTicket()">Buy Ticket</div>
                      </div>
                    </router-link>
                  </div>
                </div>
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
  name: "selectPosition",
  data() {
    return {
      textcol: ["A", "B", "C", "D", "E", "F"],
      row: "",
      col: 0,
      time: 0,
      sessName: "",
      sessSeat: [],
      sessBooked: [],
      colorredCheck: [],
      form: {},
      week: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      month: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ]
    };
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
  },
  methods: {
    //function สำหรับการซื้อตั๋ว
    buyTicket() { 
      let count = 0;
      for (let i = 0; i < this.row.length * this.col; i++) {
        if (
          this.getround(this.$route.params.round)[i] != "" &&
          this.getsessround(this.$route.params.round)[i] == this.sessName
        ) {
          count++;
        }
      }
      if (count == 0) {
        alert("Please Select Seat");
        window.location.reload();
      }
    },
    //ใช้สำหรับการหาเวลาปัจจุบัน
    gettime() {
      var now = new Date().getTime();
      return now;
    },
    //การทำให้เก้าอี้ที่ถูกเลือกจากสีแดงเป็นสีเขียว
    markgreen(col, row) {
      let newData = {
        showTime: this.form.showTime,
        seat: this.form.seat,
        booked: this.form.booked,
        confirm: this.form.confirm,
        theatre: this.form.theatre,
        movieName: this.form.movieName,
        movieNameThai: this.form.movieNameThai
      };
      this.getsessround(this.$route.params.round)[
        15 * (row.charCodeAt(0) - 65) + col - 1
      ] = this.sessName;

      this.getround(this.$route.params.round)[
        15 * (row.charCodeAt(0) - 65) + col - 1
      ] = String(15 * (row.charCodeAt(0) - 65) + col - 1);
      axios
        .post(
          "http://localhost:3001/Theatre/theatreupdate/" + this.form.id_theatre,
          newData
        )
        .then(response => {
          console.log(response);
        })
        .catch(error => {});
      window.location.reload();
    },
    //เป็นการทำให้เก้าอี้เสีเขียวกลายเป็นสีแดง
    markred(col, row) {
      let newData = {
        showTime: this.form.showTime,
        seat: this.form.seat,
        booked: this.form.booked,
        confirm: this.form.confirm,
        theatre: this.form.theatre,
        movieName: this.form.movieName,
        movieNameThai: this.form.movieNameThai
      };
      console.log(this.getsessround(this.$route.params.round));
      for (let i = 0; i < this.col * this.row.length; i++) {
        if (
          this.getround(this.$route.params.round)[i] ==
          String(15 * (row.charCodeAt(0) - 65) + col - 1)
        ) {
          if (this.getsessround(this.$route.params.round)[i] == this.sessName) {
            console.log(15 * (row.charCodeAt(0) - 65) + col - 1);
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
            window.location.reload();
          }
        } else {
        }
      }
    },
    // book() {
    //   let newData = {
    //     showTime: this.form.showTime,
    //     seat: this.form.seat,
    //     booked: this.form.booked,
    //     confirm: this.form.confirm,
    //     theatre: this.form.theatre,
    //     movieName: this.form.movieName,
    //     movieNameThai: this.form.movieNameThai
    //   };
    // },

    //คำนวณราคาทั้งหมดของ User
    calculate() {
      let totalprice = 0;
      for (var i = 0; i < this.col * this.row.length; i++) {
        if (
          this.getsessround(this.$route.params.round)[i] == this.sessName &&
          this.getround(this.$route.params.round)[i]
        ) {
          totalprice = parseInt(this.form.price) + totalprice;
        }
      }

      return totalprice;
    },
    //แสดงที่นั่งที่ถูกเลือกทั้งหมดของ User
    getSeat() {
      let Seat = [];

      for (var j = 0; j < this.col * this.row.length; j++) {
        if (
          this.getsessround(this.$route.params.round)[j] == this.sessName &&
          this.getround(this.$route.params.round)[j]
        ) {
          Seat.push(
            this.textcol[parseInt(parseInt(j) / 15)] +
              String(parseInt(j) + 1 - parseInt(parseInt(j) / 15) * 15)
          );
        }
      }

      return Seat;
    },
    //หารอบของเก้าอี้ที่ถูกจอง
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
    //เป็น Function ที่หาที่นั่งที่ถูกยืนยันการจ่ายเงินไปแล้ว
    getbook(round) {
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
        return newData.booked[0].round1;
      } else if (round == 2) {
        return newData.booked[0].round2;
      } else if (round == 3) {
        return newData.booked[0].round3;
      } else if (round == 4) {
        return newData.booked[0].round4;
      } else if (round == 5) {
        return newData.booked[0].round5;
      }
    },
    //ใช้หาว่าที่นั่งที่ไม่ว่างเป็นของใคร
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
  //ถ้ายังไม่ได้ signin จะไปหน้า signin
  beforeMount() {
    if (!this.status) {
      alert("Please Login");
      this.$router.push("/signin");
    }
  },
  mounted() {
    if (this.status) {
      var now = new Date().getTime();
      (this.sessName = this.username), (this.time = now);

      this.form.id = this.$route.params.movieId;
      //ค้นหาข้อมูลของหนังด้วย ID
      axios
        .get("http://localhost:3001/getMovies/details/" + this.form.id)
        .then(response => {
          this.form.titleth = response.data.movieNameThai;
          this.form.titleen = response.data.movieName;
          this.form.length = response.data.length;
          this.form.imageUrl = response.data.imageUrl;
          (this.form.showTime = response.data.showTime),
            (this.form.time = this.form.showTime[this.$route.params.round - 1]);
          this.form.theatre = response.data.theatre;
          this.form.price = response.data.price;
          this.form.date =
            this.form.time +
            " " +
            this.week[new Date().getDay()] +
            " " +
            new Date().getDate() +
            " " +
            this.month[new Date().getMonth() + 1] +
            " " +
            new Date().getFullYear();
          //ค้นหาข้อมูลของโรงหนังด้วยเลขโรงหนัง
          axios
            .get("http://localhost:3001/Theatre/" + this.form.theatre)
            .then(response => {
              this.form.id_theatre = response.data[0]._id;
              this.row = response.data[0].seat[0].row;
              this.col = response.data[0].seat[0].col;
              (this.form.showTime = response.data[0].showTime),
                (this.form.seat = response.data[0].seat),
                (this.form.booked = response.data[0].booked),
                (this.form.confirm = response.data[0].confirm);
              this.getround(this.$route.params.round);
              this.getsessround(this.$route.params.round);
              //วน loop เก็บค่า username ของคนที่จอง
              for (var i = 0; i < this.col * this.row.length; i++) {
                if (this.getround(this.$route.params.round).length > 0) {
                  //เป็นการเช็คสถานะของเก้าอี้
                  for (var j = 0; j < this.col * this.row.length; j++) {
                    if (
                      String(i) === this.getbook(this.$route.params.round)[j]
                    ) {
                      this.colorredCheck[i] = "gray";
                      break;
                    } else if (
                      String(i) === this.getround(this.$route.params.round)[j]
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
