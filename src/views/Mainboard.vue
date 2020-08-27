<template>
    <div>
        <Navigation/>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-9 col-lg-10">
                </div>
            </div>
        </div>
    </div>
</template>

<script>

// import axios from 'axios';
// import { setInterval } from 'timers';
// const localStorage = window.localStorage;

import Navigation from '@/components/Navigation.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'mainboard',
  mounted () {
      
  },
  data:
    function() {
        return{
            
        }
    },
  components: {
      Navigation,
      Sidebar 
  },
  methods: {
      
  },
  watch:{
    // loginAttemptCounter(){
    //     localStorage.setItem("loginAttemptCounter",this.loginAttemptCounter)
    //     if(this.loginAttemptCounter >= 5){
    //         this.loginMessage = 'Too many failed login attempts.'
    //     }
    // },
    // loginWaitingTime(){
    //     localStorage.setItem("loginWaitingTime",this.loginWaitingTime)
    //     if(this.loginWaitingTime <= 0){
    //         localStorage.setItem("loginWaitingTime",0)
    //         this.loginAttemptCounter = 0
    //         this.loginMessage = 'Enter your account, email, and password'
    //         clearInterval(this.loginInterval)
    //         this.$refs.loginButton.disabled = false
    //     }
    // }
  },
  computed: {
    //   loginWaitingTimeStr(){
    //     var str = ''
    //     if(this.loginWaitingTime/60 >= 1){
    //         str = parseInt(this.loginWaitingTime/60)+' minute(s) and '
    //     }
    //     str += (this.loginWaitingTime%60)+' seconds'
    //     return str
    //   }
  }

}
</script>


<style scoped>
</style>