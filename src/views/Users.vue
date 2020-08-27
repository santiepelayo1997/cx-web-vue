<template>
    <div>
        <Navigation/>
        <div class="container-fluid">
            <div class="row">
            
                 <FormBuilder
                    api-model="users"
                    card-title="Create New User"
                    :card-button="cardButton"
                    success-message="User Succesfully Added!"
                    v-if="this.$store.state.showModal"  
                    card-size="modal-dialog modal-dialog-centered modal-lg"
                    :card-input="form"
                    :form-select="formSelect"
                    @selectBranch="selectedBranch"
                    :btn-close="btnClose"
                    @closeModal="closeModal"
                    :card-upload="uploadTextBox"
                    :loading="this.$store.state.loading"
                 />

                 <FormBuilder
                    api-model="users"
                    card-title="Change Password"
                    :card-button="changePassBtn"
                    :card-input="formChangePass"
                    success-message="Password Succesfully Updated!"
                    v-if="this.$store.state.showModalChangePass"  
                    card-size="modal-dialog modal-dialog-centered modal-lg"
                    :btn-close="btnClose"
                    @closeModal="closeModal"
                    :loading="this.$store.state.loading"
                 />

                 <FormBuilder
                    api-model="users" 
                    card-title="Update User"
                    :card-button="cardButtonUpdate"
                    card-size="modal-dialog modal-dialog-centered modal-lg"
                    :card-input="formUpdate"
                    v-if="this.$store.state.showModalUpdate"  
                    @closeModal="closeModal"
                    :btn-close="btnClose"
                    :card-upload="uploadTextBox"
                    :loading="this.$store.state.loading"
                 />


                  <div class="col-12">
                        <template v-if="syncing == true">
                            <Loader api-model="users" @doneLoading="stopSync" :indexed-filter="indexedFilter" />
                        </template>
                        <template v-else>
                        <TableList 
                            api-model="users" 
                            :card-upload="uploadTextBox"
                            :card-input="formUpdate"
                            :table-name="tableName"
                            :show-fields="showFields" 
                            :indexed-filter="indexedFilter" 
                            :filter-object="filterObject"
                            :filter-value="filterObjectValue" 
                            :icon-buttons="iconButtons"
                            :icon-color="iconColor"
                            :btn-add="btnAdd"
                            @openChangePassModal="openChangePassModal"
                            :btn-back="btnBack"
                            @btnBack="linkToParent"
                            @btnAddModal="openModal"
                        />
                        </template>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>

import Navigation from '@/components/Navigation.vue'
import Sidebar from '@/components/Sidebar.vue'
import Loader from '@/components/Loader.vue'
import TableList from '@/components/TableList.vue'
import FormBuilder from '@/components/FormBuilder.vue'
import axios from 'axios';
export default {
  name: 'Users',
  mounted () {
     let tableName = this.$store.state.userGroupName;
     this.$store.dispatch('getBranches');
  },
  data:
    function() {
        return{
            showModal: false,
            showModalChangePass: false,
            showModalUpdate: false,
            syncing: true,
            photoUrl: '',
            file: '',
            tableName: this.$store.state.userGroupName,
            showFields: {
                "orderBy": "email",
                "orientation": "asc",
                "list": ['name','code','mobileNo','email'],
            },
             iconButtons: [
                {
                  name: "use",
                  uiName: "fas fa-pen",
                  callName: "retrieveData",
                  accepting: ["hashId"]
                },
                {
                  name: "deleteUser",
                  uiName: "fas fa-times",
                  callName: "delete",
                  accepting: ["hashId"]
                },
                {
                  name: "blockData",
                  uiName: "fas fa-ban",
                  callName: "block",
                  accepting: ["hashId"]
                },
                {
                  name: "block",
                  uiName: "fas fa-user-edit",
                  callName: "openChangePassModal",
                  accepting: ["hashId"]
                },
              ],
              btnAdd:[{
                name:"btnAdd",
                callName: "btnAddModal"
              }],
              btnBack: [
                {
                  tableName: "Roles",
                  callName: "btnBack"
                }
              ],
              btnClose: [
                {
                  name: "btnClose",
                  uiName: "Cancel",
                  callName: "closeModal",
                }
              ],
             cardButtonUpdate: [
                {
                  name: "use",
                  uiName: "Save",
                  callName: "putData",
                  className: "btn btn-primary"
                }
              ],
              formChangePass: [
                {
                  name: "password",
                  inputId: "password",
                  labelName: "New Password:",
                  cardInputCol: "col-md-6",
                  errorName: "Please input New Password",
                  type: "password",
                  inputType: "password",
                  ifRequired: true,
                  max: 200
                },
                {
                  name: "confirmPassword",
                  inputId: "confirmPassword",
                  labelName: "Confirm Password:",
                  cardInputCol: "col-md-6",
                  errorName: "Password did not match..",
                  type: "password",
                  inputType: "password",
                  ifRequired: true,
                  max: 200
                }
              ],
              form: [
                {
                  name: "name",
                  inputId: "name",
                  labelName: "Name:",
                  cardInputCol: "col-md-6",
                  errorName: "Please input Name",
                  inputType: "varchar",
                  max: 120,
                  ifRequired: true
                },
                {
                  name: "code",
                  inputId: "code",
                  labelName: "Code:",
                  errorName: "Please input Code",
                  cardInputCol: "col-md-6",
                  inputType: "varchar",
                  max: 50
                },
                {
                  name: "userName",
                  inputId: "userName",
                  errorName: "Please input Username",
                  labelName: "Username:",
                  cardInputCol: "col-md-6",
                  inputType: "varchar",
                  max: 120  
                },
                {
                  name: "mobileNo",
                  inputId: "mobileNo",
                  errorName: "Please input Mobile Number",
                  labelName: "Mobile No.:",
                  cardInputCol: "col-md-6",
                  inputType: "number",
                  max: 12  
                },
                {
                  name: "password",
                  inputId: "password",
                  errorName: "Please input password",
                  labelName: "Password:",
                  cardInputCol: "col-md-6",
                  inputType: "password",
                  type: "password",
                  ifRequired: true
                },
                 {
                  name: "confirmPassword",
                  inputId: "confirmPassword",
                  labelName: "Confirm Password:",
                  errorName: "Password did not match",
                  cardInputCol: "col-md-6",
                  type: "password",
                  ifRequired: true
                },
                 {
                  name: "email",
                  errorName: "Please input a valid email",
                  inputId: "email",
                  labelName: "Email:",
                  cardInputCol: "col-md-6",
                  inputType: "email",
                  max: 200
                },
                {
                  name: "userGroupHashId",
                  inputId: "userGroupHashId",
                  inputType: "hidden",
                  type: "hidden"
                }
              ],
              formUpdate: [
                {
                  name: "name",
                  inputId: "name",
                  labelName: "Name:",
                  cardInputCol: "col-md-6",
                  errorName: "Please input Name",
                  inputType: "varchar",
                  max: 120,
                  ifRequired: true
                },
                {
                  name: "code",
                  inputId: "code",
                  labelName: "Code:",
                  errorName: "Please input Code",
                  cardInputCol: "col-md-6",
                  inputType: "varchar",
                  max: 50
                },
                {
                  name: "userName",
                  inputId: "userName",
                  errorName: "Please input Username",
                  labelName: "Username:",
                  cardInputCol: "col-md-6",
                  inputType: "varchar",
                  max: 120  
                },
                 {
                  name: "mobileNo",
                  inputId: "mobileNo",
                  errorName: "Please input Mobile Number",
                  labelName: "Mobile No.:",
                  cardInputCol: "col-md-6",
                  inputType: "number",
                  max: 12  
                },
                 {
                  name: "email",
                  inputId: "email",
                  errorName: "Please input a valid email",
                  labelName: "Email:",
                  cardInputCol: "col-md-6",
                  inputType: "email",
                  max: 200
                },
              ],
               formSelect: [{
                  labelName: "Branches:",
                  name: "homeBranchHashId",
                  formSelectCol: "col-md-6",
                  inputType: "select",
                  callName: "selectBranch",
                  errorName: "Please select Branch",
                  options: JSON.parse(localStorage.getItem('listOfBranches')),
                  defaultPlaceholder: "Branches",
                  selectId: "homeBranchHashId",
                  className: "select form-control",
                  ifRequired: true
                }],
               uploadTextBox: [{
                  name: "photoUrl",
                  inputType: "file",
                  labelName: "Upload Photo:",
                  cardInputCol: "col-12",
                  acceptUpload: "image/x-png,image/jpeg"
              }],
               cardButton: [
                {
                  name: "use",
                  uiName: "Create",
                  callName: "postData",
                  className: "btn btn-primary"
                }
              ],
             changePassBtn: [
                {
                  name: "use",
                  uiName: "Save",
                  callName: "changePassword",
                  className: "btn btn-primary"
                }
              ],
              iconColor: [
                 {
                     color: '#CBCBCB'
                 }
              ],
              indexedFilter: {
                status : "A"
              },
              filterObjectValue: this.$store.state.userGroupHashId,
              filterObject: {
                value: "userGroup",
                property: "hashId"
              },
            
        }
    },
  components: {
      Navigation,
      Sidebar,
      Loader,
      TableList,
      FormBuilder
  },
  methods: {
      stopSync: function () {
          this.syncing = false
      },
      closeModal: function(){
        this.$store.state.showModal = false
        this.$store.state.showModalUpdate = false
        this.$store.state.showModalChangePass = false
        this.$store.state.loading = false
        this.showModalUpdate = false
      },
      openModal: function (){
        this.$store.state.showModal = true
      },
      openChangePassModal: function(hashId){
        this.$store.state.selectedUserHash = hashId
   
      //  localStorage.setItem('selectedUserHash', hashId)
        this.$store.state.showModalChangePass = true
      },
      getBranches () {
          this.$store.dispatch('getBranches')
      },
      // async openModalUpdate (hashId){
      //       this.showModalUpdate = true

      //       let token = await localStorage.getItem("apiToken");
      //       let apiDomain = await localStorage.getItem("apiDomain");
      //       localStorage.setItem('userHashUpdate', hashId)

      //       let axiosConfig = {
      //           headers: {
      //               "Authorization": "Bearer "+ token
      //           }
      //       };
      //       let res = await axios.get(apiDomain + 'users/' + hashId, axiosConfig)
      //      .then((res) => {
      //             document.getElementById("name").value = res.data.name
      //             document.getElementById("code").value = res.data.code
      //             document.getElementById("mobileNo").value = res.data.mobileNo
      //             document.getElementById("userName").value= res.data.userName
      //             document.getElementById("email").value = res.data.email
      //              if(res.data.photoUrl == ""){
      //             document.getElementById("imgPreview").src = "https://blog.stylingandroid.com/wp-content/themes/lontano-pro/images/no-image-slide.png"
      //             }
      //             else if(res.data.photoUrl == null){
      //             document.getElementById("imgPreview").src = "https://blog.stylingandroid.com/wp-content/themes/lontano-pro/images/no-image-slide.png"
      //             }else{
      //             document.getElementById("imgPreview").src = res.data.photoUrl
      //            }
      //       })
      //      .catch((err) => {
      //         console.log("AXIOS ERROR: ", err);
      //      })
      // },
      // async updateData(){
      //           let hashId = await localStorage.getItem("userHashUpdate");
      //           let token = await localStorage.getItem("apiToken");
      //           let apiDomain = await localStorage.getItem("apiDomain");
      //           let modelName = await localStorage.getItem("currentModelPage")
      //           let domain = await localStorage.getItem("domain");
      //           let photoUrl;
      //           let formData = new FormData();
      //           if(this.file != null && this.file != ""){
      //                  formData.append('file', this.file, this.file.name);
                      
      //                  let response = await axios.post(apiDomain + 'uploads/' + modelName,
      //                   formData,
      //                   {
      //                   headers: {
      //                       'Content-Type': 'multipart/form-data',
      //                         "Authorization": "Bearer "+ token
      //                     }
      //                   })
      //                   .then((response) => {
      //                         photoUrl = "http://" + domain + response.data[0].photoUrl
      //                         console.log(photoUrl);
      //                   })
      //                   .catch((err) => {
      //                       console.log("AXIOS ERROR: ", err);
      //                 })
      //           }else{
      //              photoUrl =  this.photoUrl
      //           }
                 
      //           let res = await axios({
      //               method: 'put',
      //               url: apiDomain + 'users/' + hashId ,
      //               data: {
                      
      //                   name:  document.getElementById("name").value,
      //                   code:  document.getElementById("code").value,
      //                   mobileNo:  document.getElementById("mobileNo").value,
      //                   userName:  document.getElementById("userName").value,
      //                   email:  document.getElementById("email").value,
      //                   photoUrl:  photoUrl
      //               },
      //               headers: {
      //                   Authorization: 'Bearer ' + token
      //               }
      //           })
      //           .then((res) => {
      //               this.showModalUpdate = false;
      //               alert("Succesfully Updated!");
      //                location.reload();
      //           })
      //           .catch((err) => {
      //               console.log("AXIOS ERROR: ", err);
      //           })
      // },
      // async blockUser (hashId) {
      //           let token = await localStorage.getItem("apiToken");
      //           let apiDomain = await localStorage.getItem("apiDomain");
      //           let res = await axios({
      //               method: 'put',
      //               url: apiDomain + 'users/' + hashId + '/block',
      //               data: {status: "B"},
      //               headers: {
      //                   Authorization: 'Bearer ' + token
      //               }
      //           })
      //           .then((res) => {
      //               alert("Succesfully Blocked!");
      //                location.reload();

      //           })
      //           .catch((err) => {
      //               console.log("AXIOS ERROR: ", err);
      //           })
      //  },
       linkToParent: function(){
          this.$router.push({ name: 'UserGroups' })
       },
   
      // async changePassword () {

      //           let token = await localStorage.getItem("apiToken");
      //           let userHash = await localStorage.getItem("selectedUserHash");
      //           let apiDomain = await localStorage.getItem("apiDomain");
      //           let res = await axios({
      //               method: 'post',
      //               url: apiDomain + 'users/' + userHash + '/changepass',
      //              data: {
	    //                 newPassword: document.getElementById("newPassword").value
      //              },
      //              headers: {
      //                 Authorization: 'Bearer ' + token
      //             }
      //           })
      //           .then((res) => {
      //               alert("Succesfully Changed!");
      //               this.showModalChangePass = false;
      //                location.reload();
      //           })
      //           .catch((err) => {
      //               console.log("AXIOS ERROR: ", err);
      //           })
      //  },
       async selectedBranch () {
              var e = document.getElementById("homeBranchHashId");
              var item = e.options[e.selectedIndex].value;
              localStorage.setItem("homeBranchHashId",item)

              if ( document.getElementById('homeBranchHashId').value !== ""){
                 document.getElementById("homeBranchHashId").classList.remove('is-invalid');
             }
       },
      //  validation: function(e){

      //     let password =  document.getElementById("password").value;
      //     let confirmPassword =  document.getElementById("confirmPassword").value;
      //     let email =  document.getElementById("email").value;
      //     let re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

      //     const form = document.querySelector('form');
      //     var txt = "";
      //     for (var i = 0; i < form.length; i++) {
      //         if(form.elements[i].value ==""){
      //             form.elements[i].classList.add('is-invalid')
      //         }
      //     }

      //     if(password == "" && confirmPassword == ""){
      //           document.getElementById("password").classList.add('is-invalid');
      //            document.getElementById("confirmPassword").classList.add('is-invalid');
      //     }else{
      //           document.getElementById("password").classList.remove('is-invalid');
      //           document.getElementById("confirmPassword").classList.remove('is-invalid');

      //           if(document.getElementById("password").value!=document.getElementById("confirmPassword").value){
      //                   document.getElementById("confirmPassword").classList.add('is-invalid');
      //           }else{
      //                   document.getElementById("confirmPassword").classList.remove('is-invalid');
      //           }
      //     }

      //     if (email == '' || !re.test(email))
      //     {
      //         document.getElementById("email").classList.add('is-invalid');
      //         return false;
      //     }
       
      //     this.saveNewData();

      //  },
      //   async saveNewData (){
      //       let token = await localStorage.getItem("apiToken");
      //       let apiDomain = await localStorage.getItem("apiDomain");
      //       let modelName = await localStorage.getItem("currentModelPage")
      //       let domain = await localStorage.getItem("domain");
      //       let formData = new FormData();
      //       let photoUrl;
      //       if(this.file != null && this.file != ""){
      //               formData.append('file', this.file, this.file.name);
                  
      //               let response = await axios.post(apiDomain + 'uploads/' + modelName,
      //               formData,
      //               {
      //               headers: {
      //                   'Content-Type': 'multipart/form-data',
      //                     "Authorization": "Bearer "+ token
      //                 }
      //               })
      //               .then((response) => {
      //                     photoUrl = "http://" + domain + response.data[0].photoUrl
      //               })
      //               .catch((err) => {
      //                   console.log("AXIOS ERROR: ", err);
      //             })

      //       }else{
      //           photoUrl = this.photoUrl
      //       }

      //       let  postData = {
      //             name:  document.getElementById("name").value,
      //             code:  document.getElementById("code").value,
      //             mobileNo:  document.getElementById("mobileNo").value,
      //             userName:  document.getElementById("userName").value,
      //             email:  document.getElementById("email").value,
      //             password:  document.getElementById("password").value,
      //             homeBranchHashId: localStorage.getItem("homeBranchHashId"),
      //             userGroupHashId: localStorage.getItem("userGroupHashId"),
      //             photoUrl: photoUrl
      //       }

      //       let axiosConfig = {
      //           headers: {
      //               "Authorization": "Bearer "+ token
      //           }
      //         };

      //       let res = await axios.post(apiDomain + 'users', postData, axiosConfig)
      //         .then((res) => {
      //            console.log("RESPONSE RECEIVED: ", res);
      //            document.getElementById("name").value = "";
      //            document.getElementById("code").value = "";
      //            document.getElementById("mobileNo").value = "";
      //            document.getElementById("userName").value = "";
      //            document.getElementById("email").value = "";
      //            document.getElementById("password").value = "";
      //            alert("Succesfully Added!");
      //            this.showModal = false;
      //             location.reload();
      //       })
      //         .catch((err) => {
      //         console.log("AXIOS ERROR: ", err);
      //      })
      
         
      // }
  },
  watch:{
  },
  computed: {
  }

}
</script>


<style scoped>
#listOfBranches {
   border-color: #7808F7;
   height: 41px;
}
.is-invalid {
   border-color:red !important;
   height: 41px;
}
.card-subtitle{
    text-align: left;
    font-size:14px;
    margin-top: -25px;
    margin-bottom: 30px;
    letter-spacing: 0;
    color:red !important;
}
.no-gutters{
    padding-left: 0px;
    padding-right: 0px;
}

</style>