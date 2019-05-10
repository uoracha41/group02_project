<template>
<div id="app">
  <div class="ui inverted segment">
    <div class="ui inverted secondary menu">
      <span class="item">
        <img class="ui image" src="./assets/sm.png" height="60px" width="60px" > 
      </span>
      <a href="#/" class="item">
        <i class="home icon"></i>
        Home
      </a>
      <a href="#/movie" class="item">
        <i class="film icon"></i>
        Movies
      </a>
      <a href="#/aboutus" class="item">
        <i class="address book outline icon"></i>
        About us
      </a>      
      
      <div class= "right menu"> 
        <div v-if="this.permission" class="right floated item">
          <i class="user outline icon"></i>
          Admin
        </div>
        <a v-if="this.permission" href="#/movieadmin" class="right floated item" data-tooltip="Edit / Add Movie" data-position="bottom center">
          <i class="edit icon"></i>
        </a>
        <a v-if="this.permission" href="#/payment" class="right floated item" data-tooltip="Payment" data-position="bottom center">
          <i class="dollar sign icon"></i>
        </a>
        <a v-if="this.permission" class="right floated item" @click="LogOut">
          <i class="sign-out icon"></i>
          sign out
        </a>
        
        <div v-else class="item">
          <div  v-if="this.status==true">
            <i class="user outline icon"></i>
            {{this.username}}
          </div>
          <a v-if="this.status==true" class="right floated item" @click="LogOut">
            <i class="sign-out icon"></i>
            sign out
          </a>
          <a v-else href="#/signin" class="right floated item">
            <i class="user outline icon"></i>
            login / register
          </a>
        </div>
      </div>
    </div>
  </div> 
 
<router-view/>
</div>
</template>

<script>

import axios from "axios";

import store from "./vuex/store.js";
import Vuex from "vuex";
global.vuex = Vuex;


export default {
  name: 'App',
  beforeMount(){
    console.log("App status: "+this.status)////////////
    console.log("App username: "+this.username)//////////
    console.log("App permission: "+this.permission)////////////
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
    }
  },
  methods:{
    LogOut(){
      //axios.defaults.withCredentials = true;
      // axios('http://localhost:3001/signout',
      // {
      //   method: 'POST',
      //   withCredentials: true,
      // })
      axios.post('http://localhost:3001/signout')
      .then((response)=>{
        console.log("FUUUUUUUUUUUUUUUUUU")//////////////////////////////
        this.addUsername("")
        this.addStatus(false)
        this.addPermission(false)
        this.$router.replace('/')
      })
      .catch((error)=>{
        console.log(error)
      })  
    },
    addUsername(value){
      store.commit("addUsername",value)
    },
    addStatus(value){
      store.commit("addStatus",value)
    },
    addPermission(value){
      store.commit("addPermission",value)
    }
  }
}
</script>

<style>
  body  {
        background-image: url("./assets/bg.jpg") !important;
        background-size: cover !important;
        }
</style>