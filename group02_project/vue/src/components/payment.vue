<template>
  <!-- หน้ายืนยันการจ่ายเงินสำหรับผู้ดูแลระบบ -->
  <div class="Total">
    <div class="ui center container">
      <div class="ui inverted segment">
        <h1 class="ui yellow dividing header">
          <i class="dollar sign icon"></i>Payment
        </h1>

        <div class="ui center container">
          <div class="ui grid">
            <div class="six wide column">
              <div class="ui segment">
                <form class="ui form">
                  <div class="field">
                    <label>Username</label>
                    <input type="text" v-model="Payment.Username" placeholder="username">
                  </div>
                  <div class="field">
                    <label>Theatre</label>
                    <input type="text" v-model="Payment.Theatre" placeholder="theatre">
                  </div>
                  <div class="field">
                    <label>Round</label>
                    <input type="text" v-model="Payment.Round" placeholder="00.00">
                  </div>
                </form>
                <div class="button" style="text-align: center; margin-top:5%">
                  <button class="ui inverted violet button" @click="Payments">
                    <i class="save icon"></i>
                    submit
                  </button>
                </div>
              </div>
            </div>

            <div class="ten wide column">
              <div class="ui segment">
                <div class="content">
                  <h3 class="ui header">
                    <i class="user icon"></i>
                    Username : {{this.Payment.Username}}
                  </h3>
                  <h4 class="ui header">
                    <i class="video icon"></i>
                    Movie name : {{this.bill.Movietitle}}
                  </h4>
                  <h4 class="ui header">
                    <i class="film icon"></i>
                    Theatre : {{this.bill.Theatre}}
                  </h4>
                  <h4 class="ui header">
                    <i class="clock icon"></i>
                    Show time : {{this.Payment.Round}}
                  </h4>
                  <h5 class="ui header">
                    <i class="tag icon"></i>Seat :
                    <!-- นำข้อมูลที่่เป็น String มาแสดงเป็นเลขที่นั่ง -->
                    <div v-for="aseat in this.bill.seat" v-bind:key="aseat.id">
                      <div v-if="aseat!==''">
                        <div v-if="Math.floor(parseInt(aseat)/15)==0">
                          <h1>A{{parseInt(aseat)%15+1}}</h1>
                        </div>
                        <div v-if="Math.floor(parseInt(aseat)/15)==1">
                          <h1>B{{parseInt(aseat)%15+1}}</h1>
                        </div>
                        <div v-if="Math.floor(parseInt(aseat)/15)==2">
                          <h1>C{{parseInt(aseat)%15+1}}</h1>
                        </div>
                        <div v-if="Math.floor(parseInt(aseat)/15)==3">
                          <h1>D{{parseInt(aseat)%15+1}}</h1>
                        </div>
                        <div v-if="Math.floor(parseInt(aseat)/15)==4">
                          <h1>E{{parseInt(aseat)%15+1}}</h1>
                        </div>
                        <div v-if="Math.floor(parseInt(aseat)/15)==5">
                          <h1>F{{parseInt(aseat)%15+1}}</h1>
                        </div>
                      </div>
                    </div>
                  </h5>

                  <button class="ui fluid inverted green button" @click="Paid">
                    <i class="money outline icon"></i>Paid
                  </button>
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
import axios from "axios";
import Axios from "axios";
global.vuex = Vuex;

export default {
  name: "user",
  beforeMount() {
    if (!this.permission) this.$router.push("/");
  },
  data() {
    return {
      Payment: {
        Username: "",
        Theatre: "",
        Round: ""
      },
      bill: [],
      sseat: ""
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
    Payments() {
      axios
        //ค้นหาการจองของ User
        .post(
          "http://localhost:3001/payment/" +
            this.Payment.Theatre +
            "/" +
            this.Payment.Round +
            "/" +
            this.Payment.Username
        )
        .then(response => {
          if (response.data.confirm) {
            this.bill = response.data;
            //console.log(this.bill);
          } else {
            alert("Something incorrect");
          }
        })
        .catch(response => {});
    },
    //ยินยันการจอง
    Paid() {
      axios
        .post(
          "http://localhost:3001/book/" +
            this.bill.Theatre +
            "/" +
            this.bill.Round,
          { Seat: this.bill.seat, book: this.bill.book }
        )
        .then(response => {
          alert("confirm order");
          window.location.reload();
        })
        .catch(response => {});
    }
  }
};
</script>

