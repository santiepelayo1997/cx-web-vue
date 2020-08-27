<template>
  <div>
     <Navigation/>
     <div class="container-fluid">
             <div class="row">
                  <FormBuilder
                   api-model="paymentchannels"
                  card-title="Create New Payment Channel"
                  :card-button="cardButton"
                  success-message="Payment Channel Succesfully Added!"
                  card-size="modal-dialog modal-dialog-centered modal-lg"
                  :card-input="form"
                  v-if="this.$store.state.showModal"  
                  @closeModal="closeModal"
                  :btn-close="btnClose"
                  :loading="this.$store.state.loading"
                 />

                <FormBuilder
                  api-model="paymentchannels"
                  card-title="Update Payment Channel"
                  :card-button="cardButtonUpdate"
                  success-message="Payment Channel Succesfully Updated!"
                  card-size="modal-dialog modal-dialog-centered modal-lg"
                  :card-input="form"
                  v-if="this.$store.state.showModalUpdate" 
                  @closeModal="closeModal"
                  :btn-close="btnClose"
                  :loading="this.$store.state.loading"
                 />
                   <div class="col-md-12">
                    <!-- START OF TABLE LIST  -->
                        <template v-if="syncing == true">
                              <Loader 
                                api-model="paymentchannels" 
                                @doneLoading="stopSync" 
                                :indexed-filter="indexedFilter"
                              />
                        </template>
                        <template v-else>
                              <TableList
                              api-model="paymentchannels"
                              table-name="Payment Channels"
                              :show-fields="showFields"
                              :card-input="form"
                              delete-message="Payment Channel Succesfully Deleted!"
                              :indexed-filter="indexedFilter"
                              :icon-buttons="iconButtons"
                              :btn-add="btnAdd"
                              :icon-color="iconColor"
                              :show-alert= "true"
                              @btnAddModal="openModal"
                              @openModalUpdate="openModalUpdate"
                             />
                        </template>


                   <!-- END OF TABLE LIST -->
                   </div>
                        <div class="col-md-4">
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
  name: 'paymentchannels',
  mounted () {
    
  },
  data:
    function() {
        return{
              syncing: true,
              showModal: false,
              showModalUpdate: false,
              loading: false,
              loadingSave: false,
              warningMessage: '',
              isValidPhoto: true,
              tableName: "paymentchannels",
              photoUrl: '',
              file: '',
              showFields: {
                  "orderBy": "updatedAt",
                  "orientation": "desc",
                  "list": ['name','code']
              },
              iconButtons: [
                {
                  name: "use",
                  uiName: "fas fa-pen",
                  callName: "retrieveData",
                  accepting: ["hashId"]
                },
                {  
                  name: "use3",
                  uiName: "fas fa-times",
                  callName: "delete",
                  accepting: ["hashId"]
                }
              ],
              btnClose: [
                {
                  name: "btnClose",
                  uiName: "Cancel",
                  callName: "closeModal",
                }
              ],
              btnAdd:[{
                name:"btnAdd",
                callName: "btnAddModal"
              }],
              
              cardButton: [
                {
                  name: "use",
                  uiName: "Create",
                  callName: "postData",
                  className: "btn btn-primary"
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
              form: [
                {
                  name: "name",
                  labelName: "Name:",
                  inputId: "name",
                  cardInputCol: "col-md-6",
                  max: 31,
                  ifRequired: true,
                  inputType: "varchar",
                  errorName: "Please input Name"
                  
                },
                {
                  name: "code",
                  labelName: "Code:",
                  inputId: "code",
                  cardInputCol: "col-md-6",
                  max: 30,
                  ifRequired: true,
                  inputType: "varchar",
                  errorName: "Please input Code"
                }
              ],
              iconColor: [
                 {
                     color: '#CBCBCB'
                 }
              ],
            indexedFilter:  {
              status: "A"
            }
        }
    },
  components: {
      Navigation,
      Loader,
      FormBuilder,
      Sidebar,
      TableList
  },
  methods: {
        stopSync: function () {
            this.syncing = false
        },
        closeModal: function(){
            this.$store.state.showModal = false
            this.$store.state.showModalUpdate = false
            this.$store.state.loading = false
            this.showModalUpdate = false
        },
        openModal: function (){
            this.$store.state.showModal = true
        },
        openModalUpdate: function(){
             this.$store.state.showModalUpdate = true
        }
      //   async openModalUpdate (hashId){
      //       this.showModalUpdate = true

      //       let token = await localStorage.getItem("apiToken");
      //       let apiDomain = await localStorage.getItem("apiDomain");
      //       localStorage.setItem('userHashUpdate', hashId)

      //       let axiosConfig = {
      //           headers: {
      //               "Authorization": "Bearer "+ token
      //           }
      //       };
      //       let res = await axios.get(apiDomain + 'paymentchannels/' + hashId, axiosConfig)
      //      .then((res) => {
      //             document.getElementById("name").value = res.data.name
      //             document.getElementById("code").value = res.data.code
                 
      //       })
      //      .catch((err) => {
      //         console.log("AXIOS ERROR: ", err);
      //      })
      // },
      //  validation: function(){
         
      //     const form = document.querySelector('form');
      //     var txt = "";
      //     for (var i = 0; i < form.length; i++) {
      //         if(form.elements[i].value ==""){
      //             form.elements[i].classList.add('is-invalid')
      //               this.loading = false
      //               this.loadingSave = false
      //         }
      //     }
      //       this.saveItems();
      //       this.loadingSave = true
        
      //  },
      // async updateItem(){
      //         this.loading = true
            
      //         let token = await localStorage.getItem("apiToken");
      //         let hashId = await localStorage.getItem("userHashUpdate");
      //         let photoUrl;
      //         let apiDomain = await localStorage.getItem("apiDomain");
      //         let formData = new FormData();


      //                 let res = await axios({
      //                   method: 'put',
      //                   url: apiDomain + 'paymentchannels/' + hashId ,
      //                   data: {
      //                     name:  document.getElementById("name").value,
      //                     code:  document.getElementById("code").value,
      //                   },
      //                   headers: {
      //                       Authorization: 'Bearer ' + token
      //                   }
      //               })
      //               .then((res) => {
      //                   document.getElementById("alertSuccess").style.display = "";
      //                   document.getElementById('labelSuccess').innerHTML = "Payment Channel has been succesfully updated!"
      //                   this.showModalUpdate = false;
      //                   this.loading = false
                     
      //               })
      //               .catch((err) => {
      //                   this.loading = false
      //                   document.getElementById("customAlert").hidden=false;;
      //                   document.getElementById("labelDanger2").innerHTML =  err.response.data.error;
      //                   console.log("AXIOS ERROR: ", err);
      //               })
         

             
      // },
      // async deleteItem(hashId){
      //       let token = await localStorage.getItem("apiToken");
      //       let apiDomain = await localStorage.getItem("apiDomain");
      //       let res = await axios({
      //           method: 'delete',
      //           url: apiDomain + 'paymentchannels/' + hashId,
      //           headers: {
      //               Authorization: 'Bearer ' + token
      //           }
      //       })
      //       .then((res) => {
      //           document.getElementById("alertSuccess").style.display = "";
      //           document.getElementById('labelSuccess').innerHTML = "Payment Channel has been Deleted!"
      //           location.reload();
      //       })
      //       .catch((err) => {
      //           console.log("AXIOS ERROR: ", err);
      //       })
      // },
      // async saveItems(){
            
      //       let token = await localStorage.getItem("apiToken");
      //       let apiDomain = await localStorage.getItem("apiDomain");
      //       let modelName = await localStorage.getItem("currentModelPage")
      //       let domain = await localStorage.getItem("domain");
       

      //       let  postData = {
      //             name:  document.getElementById("name").value,
      //             code:  document.getElementById("code").value,
      //       }

      //       let axiosConfig = {
      //           headers: {
      //               "Authorization": "Bearer "+ token
      //           }
      //       };

      //       let res = await axios.post(apiDomain + 'paymentchannels', postData, axiosConfig)
      //         .then((res) => {
      //           console.log(res)
      //             document.getElementById("alertSuccess").style.display = "";
      //             document.getElementById('labelSuccess').innerHTML = "Payment Channel has been successfully Saved!"
      //             this.showModal = false
      //             this.loadingSave = false
      //             location.reload();
      //             //this.reSync();
      //       })
      //       .catch((err) => {
      //         this.loadingSave = false
      //         document.getElementById("customAlert").hidden=false;
      //         document.getElementById('labelDanger').innerHTML =  err.response.data.error;
      //         console.log("AXIOS ERROR: ", err);
      //       })
          
      // },
      // refresh: async function() {
      //       this.$root.$emit('Loader')
      // }
  },
  watch:{
  },
  computed: {
  }

}
</script>

<style>
body{
  overflow: hidden !important;
}
.add {
  color: #7808F7;
  font-size:25px;
}
#notS{
  color: #0BBEBA;
}
#sku {
  color: #0BBEBA;
}
#btnProductPrice{
  color: #0BBEBA;
  border-color: #0BBEBA;
}
#btnProductPrice:hover{
  color:white;
  background-color: #0BBEBA;
}
</style>