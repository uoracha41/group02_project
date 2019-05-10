<template>
<!-- หน้าเข้าสู่ระบบ -->
  <div class="login">
    <div class="ui middle aligned center aligned grid">
      <div class="column">
        <div class="ui segment yellow" style="margin-top:40%">
          <h3 class="ui yellow dividing header" align="left">Sign In</h3>
          <form class="ui form">
            <div class="ui stacked segment">
              <div class="field">
                <div class="ui left icon input">
                  <i class="user icon"></i>
                  <input type="text" v-model="Account.Username" placeholder="Username">
                </div>
              </div>
              <div class="field">
                <div class="ui left icon input">
                  <i class="lock icon"></i>
                  <input type="password" v-model="Account.Password" placeholder="Password">
                </div>
              </div>
              <div class="ui fluid large yellow submit button" @click="LogIn">Login</div>
            </div>
          </form>
          <div class="ui message">
            New to us?
            <a href="/#/signup">Sign Up</a>      
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
  name: "login",
  data() {
    return {
      Account:{
        Username:'',
        Password:'',
        Status:false,
        Admin:false,
      },
    };
  },
  beforeMount(){
    if(this.status){
      this.$router.push("/");
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
  methods:{
    LogIn(){    
      // axios.defaults.withCredentials = true;
      axios.post('http://localhost:3001/login/'+this.Account.Username+'/'+this.Account.Password)
      // axios('http://localhost:3001/login/'+this.Account.Username+'/'+this.Account.Password,
      // {
      //   method: 'POST',
      //   withCredentials: true,
      // })
      .then((response)=>{
        if(response.data.confirm){
          this.Account.Username = response.data.Username
          this.Account.Status = response.data.confirm
          this.Account.Admin = response.data.isAdmin

          this.addUsername(this.Account.Username)
          this.addStatus(this.Account.Status)
          this.addPermission(this.Account.Admin)
          this.$router.push("/")
        }
        else{
          alert(response.data.err)
        }
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
  },
};
</script>


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
  color: orange;
}
.column {
  max-width: 450px;
}
label {
  text-align: left;
}
.ui button {
  float: left;
}
.contact {
  color: orange;
}
.ui[class*="center aligned"].grid {
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
</style>
