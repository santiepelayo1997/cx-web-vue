<template>
  <div class="login full-height container-fluid">
      <div class="row full-height">
          <div class="col-md-8 full-height d-none d-md-block">
              
          </div>
          <div class="d-flex col-md-4 full-height col-sm-12 login-tab align-items-center">
              <div class="text-center col-md-12">
                <h1>Barter CX+</h1>
                <div class="d-block floating-message-box">{{ loginMessage }}</div>
                <div class="d-block floating-message-box"><span v-if="loginWaitingTime > 0">Please wait for {{loginWaitingTimeStr}} </span></div>
                <form v-on:submit.prevent="attemptLogin()">
                  <div class="form-group">
                    <input type="text" class="form-control" placeholder="Account" v-model="accountName">
                  </div>
                  <div class="form-group">
                    <input type="email" class="form-control" placeholder="Email" v-model="email">
                  </div>
                  <div class="form-group">
                    <input type="password" class="form-control" placeholder="Password" v-model="password">
                  </div>
                  <button type="submit" ref="loginButton" class="btn btn-primary" @click="attemptLogin()">Authenticate</button>
                  <br>
                  <br>
                  <div class="d-flex align-items-center col-md-12 justify-content-center" v-if="loggingIn">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading..</span>
                    </div> {{ loginProcessMsg }}
                  </div>
                </form>
              </div>
          </div>
      </div>
  </div>
</template>

<script>

import axios from 'axios';
import { setInterval } from 'timers';
const localStorage = window.localStorage;

export default {
  name: 'login',
  mounted () {
      localStorage.removeItem("isAdmin");
      this.loginAttemptCounter = localStorage.getItem("loginAttemptCounter") || 0
      this.loginWaitingTime = localStorage.getItem("loginWaitingTime") || 0
      if(this.loginWaitingTime > 0){
          this.$refs.loginButton.disabled = true
          this.loginInterval = setInterval(() => {this.loginWaitingTime--;},1000)
      }
       this.$store.dispatch('getApiDomain');
  },
  data:
    function() {
        return{
            accountName: '',
            email: '',
            password: '',
            loginAttemptCounter: 0,
            loginMessage: '',
            userHashId: '',
            loginWaitingTime: 0,
            loginInterval: null,
            loginProcessMsg: '',
            loggingIn: false
        }
    },
  methods: {
    //   getUserHash:function(){
    //         this.loggingIn = true
    //         this.loginMsg = ''
    //         this.loginAttemptCounter++;

    //          if(this.loginAttemptCounter < 5)
    //          {
    //                 this.loginProcessMsg = "Authenticating..."
                   
    //                 axios.post(this.$store.getters.apiDomain +'tokens', {
    //                     "email": this.email,
    //                     "password": this.password,
    //                     "account": this.accountName
    //                 })
    //                 .then(async (response) => {
    //                     this.userHashId = response.data.userHashId
    //                     localStorage.setItem('currentUser',response.data.userHashId)
    //                     this.$store.state.db.tokens.add(response.data)
    //                     this.loginProcessMsg = "Getting user profile"
    //                     this.loginValidation(response.data.userHashId, response.data.token);
    //                 })
    //                 .catch((err) => {
    //                     console.log(err)
    //                     if(err.response === undefined){
    //                         this.loginMessage = "Login failed. Unable to contact server"
    //                         this.loginAttemptCounter--; //failed auth
    //                     }else if(err.response.status == 403){
    //                         this.loginMessage = "Login failed. Invalid credentials"
    //                     }else{
    //                         this.loginMessage = "Login failed. Response code: "+err.response.status
    //                         this.loginAttemptCounter--; //failed auth, revert attempt
    //                     }
    //                     this.loggingIn = false
    //                 })
    //          }
    //          else
    //          {
    //                 this.loggingIn = false
    //                 if(this.loginWaitingTime == 0){
    //                     this.$refs.loginButton.disabled = true
    //                     this.loginInterval = setInterval(() => {this.loginWaitingTime--;},1000)
    //                 }
    //                 this.loginWaitingTime += 60
    //          }
    //   },
    //   async loginValidation(userHashId,token){
    //            await axios.get(this.$store.getters.apiDomain+"users/"+userHashId, {
    //                 headers:{
    //                     Authorization:'Bearer '+ token
    //                 },
    //             })
    //             .then(async (res) =>{
    //                 this.loginProcessMsg = "Building user profile"
    //                 await this.$store.state.db.users.put(res.data)
    //                 await this.$store.dispatch('isSuperAdmin')
    //                 //current account
    //                 localStorage.setItem('currentAccount',res.data.accountHashId)
    //                 //redirect
    //                 this.$router.push('/Products')
    //             })
    //             .catch((autherr) => {
    //                 if(autherr.response === undefined){
    //                     this.loginMessage = "Fetch failed. Unable to contact server"
    //                 }else if(autherr.response.status == 403){
    //                     this.loginMessage = "Fetch failed. User does not exist"
    //                 }else{
    //                     this.loginMessage = "Fetch failed. Response code: "+autherr.response.status
    //                 }
    //                 this.loggingIn = false
    //             })
    //   },
    getBase64Image(img) {
          var canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;

          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);

          var dataURL = canvas.toDataURL("image/png");

          return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
      },
      attemptLogin(){
          this.loggingIn = true
          this.loginMsg = ''
          this.loginAttemptCounter++;
          if(this.loginAttemptCounter < 5){
            this.loginProcessMsg = "Authenticating..."
       
            axios.post(this.$store.getters.apiDomain +'tokens', {
                "email": this.email,
                "password": this.password,
                "account": this.accountName
            })
            .then(async (response) => {
                console.log(response)
              if(response.status == 200){
                this.loginAttemptCounter = 0
                this.loginProcessMsg = "Authenticated"
                localStorage.setItem("apiToken",response.data.token);
               // console.log(response.data.userHashId)
                //store token
                localStorage.setItem('currentUser',response.data.userHashId)
                this.$store.state.db.tokens.add(response.data)
                this.loginProcessMsg = "Getting user profile"
              
                await axios.get(this.$store.getters.apiDomain+"users/"+response.data.userHashId, {
                    headers:{
                        Authorization:'Bearer '+response.data.token
                    },
                })
                .then(async (res) =>{
                    this.loginProcessMsg = "Building user profile"
                    // imgData = getBase64Image(res.data.photoUrl);
                    // localStorage.setItem("imgData", imgData);
                    await this.$store.state.db.users.put(res.data)
                    this.$store.dispatch('getUserDetails', res.data.hashId)
                    localStorage.setItem('userHashId', res.data.hashId)
                    await this.$store.dispatch('isSuperAdmin')
                    //current account
                    localStorage.setItem('currentAccount',res.data.accountHashId)
                    //redirect
                    this.$router.push('/main')
                })
                .catch((autherr) => {
                    if(autherr.response === undefined){
                        this.loginMessage = "Fetch failed. Unable to contact server"
                    }else if(autherr.response.status == 403){
                        this.loginMessage = "Fetch failed. User does not exist"
                    }else{
                        this.loginMessage = "Fetch failed. Response code: "+autherr.response.status
                    }
                    this.loggingIn = false
                })
              }else{
                this.loginMessage = "Login failed. Response code: "+response.status
              }
              this.loggingIn = false
            })
            .catch((err) => {
                console.log(err)
                if(err.response === undefined){
                    this.loginMessage = "Login failed. Unable to contact server"
                    this.loginAttemptCounter--; //failed auth
                }else if(err.response.status == 403){
                    this.loginMessage = "Login failed. Invalid credentials"
                }else{
                    this.loginMessage = "Login failed. Response code: "+err.response.status
                    this.loginAttemptCounter--; //failed auth, revert attempt
                }
                this.loggingIn = false
            })
          }else{
              this.loggingIn = false
              if(this.loginWaitingTime == 0){
                  this.$refs.loginButton.disabled = true
                  this.loginInterval = setInterval(() => {this.loginWaitingTime--;},1000)
              }
              this.loginWaitingTime += 60
          }
      },
  },
  watch:{
    loginAttemptCounter(){
        localStorage.setItem("loginAttemptCounter",this.loginAttemptCounter)
        if(this.loginAttemptCounter >= 5){
            this.loginMessage = 'Too many failed login attempts.'
        }
    },
    loginWaitingTime(){
        localStorage.setItem("loginWaitingTime",this.loginWaitingTime)
        if(this.loginWaitingTime <= 0){
            localStorage.setItem("loginWaitingTime",0)
            this.loginAttemptCounter = 0
            this.loginMessage = 'Enter your account, email, and password'
            clearInterval(this.loginInterval)
            this.$refs.loginButton.disabled = false
        }
    }
  },
  computed: {
      loginWaitingTimeStr(){
        var str = ''
        if(this.loginWaitingTime/60 >= 1){
            str = parseInt(this.loginWaitingTime/60)+' minute(s) and '
        }
        str += (this.loginWaitingTime%60)+' seconds'
        return str
      }
  }

}
</script>


<style scoped>
.full-height{
    height: 100vh;
}


.floating-message-box{
    min-height: 20px;
    font-size: 15px;
}

</style>