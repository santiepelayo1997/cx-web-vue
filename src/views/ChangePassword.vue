<template>
  <div>
     <Navigation/>
     <div class="container-fluid">
      
             <div class="row">
                   
                   <div class="col-md-12">
                    
                        <form class="needs-validation" novalidate>
                            <h2 class="section-title">Change Password </h2>
                            <br>
                            <div class="form-group">
                                <label for="email">Old Password:</label>
                                <input type="password" class="form-control" v-model="oldPassword" id="oldPassword">
                                <div class="invalid-feedback">Please fill out this field.</div>
                            </div>
                            <div class="form-group">
                                <label for="pwd">New Password:</label>
                                <input type="password" class="form-control" v-model="newPassword" id="newPassword">
                                <div class="invalid-feedback">Please fill out this field.</div>
                            </div>
                            <div class="form-group">
                                <label for="pwd">Retype Password:</label>
                                <input type="password"  :oninput="checkPasscode" class="form-control" v-model="retypePassword" id="retypePassword">
                                <div class="invalid-feedback">Password did not match</div>   
                            </div>
                            <button type="submit" @click="changePassword" class="btn btn-primary">Submit</button>
                        </form>
                   </div>
                 </div>
           </div>
  </div>
</template>

<script>

import Navigation from '@/components/Navigation.vue'
import Sidebar from '@/components/Sidebar.vue'
import axios from 'axios';

export default {
  name: 'ChangePassword',
  mounted () {
     

  },
  data:
    function() {
        return{
            oldPassword: '',
            newPassword: '',
            retypePassword: ''
        }
    },
  components: {
      Navigation,
      Sidebar
  },
  methods: {
         async changePassword () {

         let token = await localStorage.getItem("apiToken");
         let apiDomain = await localStorage.getItem("apiDomain");
         let currentUser = await localStorage.getItem("currentUser");

          let newPassword =  document.getElementById("newPassword").value;
          let oldPassword =  document.getElementById("oldPassword").value;
          let retypePassword =  document.getElementById("retypePassword").value;
        
          if(oldPassword == ""){
                document.getElementById("oldPassword").classList.add('is-invalid');
          }else{
                document.getElementById("oldPassword").classList.remove('is-invalid');
          }
          if(newPassword == "" && retypePassword == ""){
                document.getElementById("newPassword").classList.add('is-invalid');
                 document.getElementById("retypePassword").classList.add('is-invalid');
          }else{
                document.getElementById("newPassword").classList.remove('is-invalid');
                document.getElementById("retypePassword").classList.remove('is-invalid');

                if(newPassword!=retypePassword){
                        document.getElementById("retypePassword").classList.add('is-invalid');
                        return false;
                }else{
                        document.getElementById("retypePassword").classList.remove('is-invalid');
                }
          }

            let res = await axios({
               method: 'post',
                 url: apiDomain + 'users/' + currentUser + '/changepass',
                 data: {
                     oldPassword: this.oldPassword,
	                   newPassword: this.newPassword
                 },
                headers: {
                    Authorization: 'Bearer ' + token
                }
             })
             .then((res) => {
                  alert("Succesfully Changed!");
                    this.$router.push({ name: 'login' })

             })
             .catch((err) => {
                console.log("AXIOS ERROR: ", err);
             })
       }
  },
  watch:{
  },
  computed: {
  }

}
</script>

<style scoped>
body{
  overflow: hidden !important;
}
form {
    padding-top: 72px;
    padding-left: 52px;
    padding-right: 52px;
}
.section-title{
    font-family: "Work Sans";
    font-weight: 550;
    font-size:30px;
    color: #43425D;
    text-transform: capitalize;
}
</style>