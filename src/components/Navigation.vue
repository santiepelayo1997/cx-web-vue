<template>
<div>
  <Sidebar/>
     <div class="NavbarBG">
             <div class="d-flex justify-content-between">
        
               <div class="nav-searchbar">
                   <i class="searchNav fas fa-search "></i>
                   <input type="text" v-model="search"   id="inputSearch" placeholder="Search">
               </div>
                <div class="nav-profile d-flex align-items-center">
                    <span><i class="fas fa-comments"></i></span>
                    <span><i class="fas fa-bell"></i></span>
                    <div class="divider"></div> 
                      <p 
                          data-toggle="dropdown" 
                          aria-haspopup="true" 
                          aria-expanded="false" 
                          class="nameOfUser">
                          {{this.name.charAt(0).toUpperCase() + this.name.substring(1)}}
                      </p> 
                      <span data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="dropdownUser"><i class="fas fa-angle-down"></i></span>
                     <div class="dropdown-menu dropdown-menu-right">
                        <button class="dropdown-item" type="button">Settings</button>
                        <button class="dropdown-item" @click="goToChangePassword" type="button">Change Password</button>
                        <button class="dropdown-item" @click="gotoLogout" type="button">Logout</button>
                      </div>
                    <img v-bind:src="this.photoUrl" class="rounded-circle" alt="photo">
                </div>
            </div>
    </div> 
    <!-- <nav class="navbar navbar-expand-md navbar-dark bg-primary">
      <a class="navbar-brand" href="#">CX+</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <!-- <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li> 
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li> -->
          <!-- <li class="pull-right nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              op
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" @click="logout">Sign Out</a>
            </div>
          </li>
        </ul> -->
        <!-- <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form> -->
      <!-- </div>
    </nav> -->
  </div>
</template>

<script>

import Sidebar from "@/components/Sidebar.vue";
import axios from 'axios';

export default {
    name: 'Navigation',
    data: function () {
        return {
            name: '',
            photoUrl: '',
            search: ''
        }
    },
    mounted(){
           this.getUserDetails();
    },
    methods: {
        logout: function() {
            this.$store.dispatch('logout')
        },
        async getUserDetails() {
            let apiToken = localStorage.getItem('apiToken');
            let hashId = localStorage.getItem('userHashId');
             let apiDomain = localStorage.getItem('apiDomain');
            await axios({
                method: 'get',
                url: apiDomain + 'users/' + hashId,
                headers: {
                    Authorization: 'Bearer ' + apiToken
                }
            })
            .then((res) => {
               this.photoUrl = res.data.photoUrl;
               this.name = res.data.name;
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
        },
         humanReadable(text){
            return text.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase();})
        },
        goToChangePassword: function(){
             this.$router.push({ path: './ChangePassword' })
        },
        gotoLogout: function(){
            this.$router.push({ path: './Login' })
        }
    },
    components:{
        Sidebar,
    }
}
</script>

<style scoped>
.searchNav{
  width: 20px;
  height:20px;
}
#inputSearch{
  padding:20px;
  height: 70px;
  width:74.0740vh;
  border: none;
  outline: none;
  background: none;
  color: #4D4F5C;
}
 .NavbarBG {
    height: 70px;
    top:0;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);
    background-color: #ffffff;
  } 
 .divider {
   border-left: 1px solid rgb(241, 241, 243);
   height:38px;
   padding-right: 30px;
 }  
  .rounded-circle {
     width:38px;
     height:38px;
  }
  .nav-profile {
     padding-right: 20px;
  }
  .nav-searchbar{
    padding-left: 20px;
    font-family: "Work Sans";
    font-size: 13px;
    font-weight: normal;
    font-style: normal; 
    font-stretch: normal;
    line-height: 1.54;
    letter-spacing: normal;
    color: #BCBCCB;
  }
  .nav-profile > p.nameOfUser{
    color: #4D4F5C;
    font-family: "Work Sans";
    font-size: 13px;
    padding-top:10px;
    padding-right:5px;
    font-weight: normal;
    font-style: normal;
    letter-spacing: normal;
    font-stretch: normal;
    cursor: pointer;
  }
  .nav-profile > span.dropdownUser{
    margin-right:-20px;
  }
  .nav-profile > span{
    color: #BCBCCB;
    padding-right:30px;
    white-space: nowrap;
  }
  .nav-searchicon {
    color: #BCBCCB;
    font-size: 17px;
    padding-left: 20px;
  }
</style>
