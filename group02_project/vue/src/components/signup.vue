<template>
<!-- หน้าสมัครสมาชิก -->
  <div class="signup">
    <div class="ui middle aligned center aligned grid">
      <div class="column">
        <div class="ui segment" style="margin-top:15%">
          <h3 class="ui yellow dividing header" align="left" >
            Sign Up
          </h3>
          <div class="ui form error">
            <div class="required field">
              <label>Username</label>
              <input type="text" v-model="Account.Username" placeholder="Username">
            </div>
            <div class="required field">
              <label>Password</label>
              <input type="password" v-model="Account.Password" placeholder="Password">
            </div>
            <div class="required field">
              <label>Confirm Password</label>
              <input type="password"  v-model="checkpassword" placeholder="Confirm Password">
            </div>

            <div v-if="Account.Password!=checkpassword">              
              <div class="ui error message">
                <p>Those passwords didn't match. Try again.</p>
              </div>             
            </div>
            
            <div class="required field">
              <label>First Name</label>
              <input type="text" v-model="Account.FirstName" placeholder="First Name">
            </div>
            <div class="required field">
              <label>Last Name</label>
              <input type="text" v-model="Account.LastName" placeholder="Last Name">
            </div>

            <div class="ui fluid large yellow submit button" @click="SignUp">Sign Up</div>
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

import axios from 'axios'
export default {
  name: 'signup',
  beforeMount(){
    if(this.status){
      console.log("Earth")
      this.$router.push("/");
    }
  },
  data () {
    return {
      title: 'Add User',
      Account:{
          UserName:'',
          Password:'',
          FirstName:'',
          LastName:'',
          isAdmin:false,
          confirm:false
      },
      checkpassword:''
    }
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
    CheckSignUp(){
      if(this.Account.Username==''||this.Account.Password==''||this.Account.FirstName==''||this.Account.LastName==''||this.Account.MobileNo==''||this.Account.Password!=this.checkpassword)
      {
        alert("Please fill out the following form completely")
      }
      else{return true}
    },    
    SignUp(){
      if(this.CheckSignUp()){
        let newAccount={
            Username: this.Account.Username,
            Password: this.Account.Password,
            FirstName: this.Account.FirstName,
            LastName: this.Account.LastName,
            isAdmin:this.Account.isAdmin
        }
        axios.post('http://localhost:3001/signup',newAccount)
        .then((response)=>{
          console.log(response.data)
            if(response.data.confirm){
              this.$router.replace("/signin")
            }
            else{
              alert(response.data.error)
            }
        })
        .catch((error)=>{
            console.log(error)
        })
      }
    },
  },
}
</script>


<style scoped>
h1, h2 {
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
.column{
  max-width: 500px;
}
label{
  text-align: left;
}
.ui dividing header
{
  text-align: left;
}
</style>