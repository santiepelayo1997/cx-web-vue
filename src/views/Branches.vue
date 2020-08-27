<template>
    <div>
        <Navigation/>
        <div class="container-fluid">
            <div class="row">
                 <FormBuilder
                    api-model="branches" 
                    card-title="Create New Branch"
                    :card-button="cardButton"
                    card-size="modal-dialog modal-dialog-centered modal-lg"
                    :card-input="form"
                    success-message="Branch Succesfully Added!"
                    :btn-close="btnClose"
                    v-if="this.$store.state.showModal" 
                    @closeModal="closeModal"
                    :loading="this.$store.state.loading"
                    :color-picker="colorPicker"
                 />

                 
                <FormBuilder
                   api-model="branches"
                  card-title="Update Branch"
                  :card-button="cardButtonUpdate"
                  card-size="modal-dialog modal-dialog-centered modal-lg"
                  :card-input="form"
                  v-if="this.$store.state.showModalUpdate" 
                  @closeModal="closeModal"
                  :btn-close="btnClose"
                  success-message="Branch Succesfully Updated!"
                  :loading="this.$store.state.loading"
                   :color-picker="colorPicker"
                 />

                <div class="col-12">
                    <template v-if="syncing == true">
                    <Loader api-model="branches" @doneLoading="stopSync" :indexed-filter="indexedFilter"/>
                    </template>
                    <template v-else>
                    <TableList 
                    api-model="branches" 
                    :card-input="form"
                    :color-picker="colorPicker"
                    table-name="Branches"
                    delete-message="Branch Succesfully Deactivated!"
                    :show-fields="showFields" 
                    :indexed-filter="indexedFilter"
                    :icon-buttons="iconButtons"
                    :card-style="cardStyle"
                    :icon-color="iconColor"
                    :btn-add="btnAdd"
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
import Loader from '@/components/Loader.vue'
import TableList from '@/components/TableList.vue'
import FormBuilder from '@/components/FormBuilder.vue'

import axios from 'axios';

export default {
  name: 'branches',
  mounted () {
  },
  data:
    function() {
        return{
                syncing: true,
                showModal: false,
                showModalUpdate: false,
                showFields: {
                    "orderBy": "updatedAt",
                    "orientation": "desc",
                    "list": ['name','code','street','city','telephone'],
                },
                colors: [
                    {
                        "blue": "#0ABCC1",
                        "penk": "#F38E9E"
                    }
                ],
                iconButtons: [
                    {
                      name: "use",
                      uiName: "fas fa-pen",
                      callName: "retrieveData",
                      accepting: ["hashId"]
                    },
                    {
                      name: "use2",
                      uiName: "fas fa-times",
                      callName: "deactivateData",
                      accepting: ["hashId"]
                    }
                ],
               btnAdd:[{
                name:"btnAdd",
                callName: "btnAddModal"
              }],
              btnClose: [
                {
                  name: "btnClose",
                  uiName: "Cancel",
                  callName: "closeModal",
                }
              ],
               cardButton: [
                  {
                    name: "use",
                    uiName: "Create",
                    callName: "postData",
                    className: "btn btn-primary"
                  }
                ],
                form: [
                {
                  name: "name",
                  inputId: "name",
                  labelName: "Name:",
                  cardInputCol: "col-md-6",
                  errorName: "Please input Name",
                  ifRequired: true,
                  inputType: "varchar"
                },
                {
                  name: "shortName",
                  inputId: "shortName",
                  labelName: "Short Name:",
                  cardInputCol: "col-md-6",
                  errorName: "Please input Short Name",
                  inputType: "varchar"
                },
                {
                  name: "code",
                  inputId: "code",
                  labelName: "Code:",
                  cardInputCol: "col-md-6",
                  errorName: "Please input Code",
                  ifRequired: true,
                  inputType: "varchar"
                },
                 {
                  name: "street",
                  inputId: "street",
                  labelName: "Street:",
                  cardInputCol: "col-md-6",
                  errorName: "Please input Street",
                  ifRequired: true,
                  inputType: "varchar"
                },
                {
                  name: "city",
                  inputId: "city",  
                  labelName: "City:",
                  cardInputCol: "col-md-6",
                  errorName: "Please input City",
                  inputType: "varchar"
                },
                  {
                  name: "zipcode",
                  inputId: "zipcode",
                  labelName: "ZipCode:",
                  cardInputCol: "col-md-6",
                  errorName: "Please input ZipCode",
                  ifRequired: true,
                  inputType: "varchar"
                },
                {
                  name: "country",
                  inputId: "country",
                  labelName: "Country:",
                  cardInputCol: "col-md-6",
                  errorName: "Please input Country",
                  ifRequired: true,
                  inputType: "varchar"  
                },
                {
                  name: "telephone",
                  inputId: "telephone",
                  labelName: "Telephone:",
                  cardInputCol: "col-md-6",
                  errorName: "Please input Telephone",
                  ifRequired: true,
                  inputType: "number"
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
              colorPicker: [
                {
                    name: "settings",
                    colorPickerCol: "col-md-12",
                    inputType: "colorPicker"
                }
              ],
             cardStyle: [
                   {
                    color: 'white'
                   }
             ],
             iconColor: [
                 {
                     color:'white'
                 }
             ],
            indexedFilter: {
              status: "A"
            }
        }
    },
  components: {
      Navigation,
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
          this.$store.state.loading = false
          this.showModalUpdate = false
        },
        openModal: function (){
          this.$store.state.showModal = true
        },
      //  validation: function(){
      //     const form = document.querySelector('form');
      //     var txt = "";
      //     for (var i = 0; i < form.length; i++) {
      //         if(form.elements[i].value ==""){
      //                 form.elements[i].classList.add('is-invalid')
      //         }
      //     }
      //     this.saveNewData();
      //  },   
      //  async openModalUpdate (hashId){
      //       this.showModalUpdate = true

      //       let token = await localStorage.getItem("apiToken");
      //       let apiDomain = await localStorage.getItem("apiDomain");
      //       localStorage.setItem('userHashUpdate', hashId)

      //       let axiosConfig = {
      //           headers: {
      //               "Authorization": "Bearer "+ token
      //           }
      //       };
      //       let res = await axios.get(apiDomain + 'branches/' + hashId, axiosConfig)
      //      .then((res) => {
      //           document.getElementById("name").value = res.data.name
      //           document.getElementById("code").value = res.data.code
      //           document.getElementById("street").value = res.data.street
      //           document.getElementById("city").value = res.data.city
      //           document.getElementById("zipcode").value = res.data.zipcode
      //           document.getElementById("country").value  = res.data.country
      //           document.getElementById("telephone").value  = res.data.telephone
      //           document.getElementById("shortName").value = res.data.shortName
      //       })
      //      .catch((err) => {
      //         console.log("AXIOS ERROR: ", err);
      //      })
      // },
   
      //   async updateItem(){
      //           let hashId = await localStorage.getItem("userHashUpdate");
      //           let token = await localStorage.getItem("apiToken");
      //           let apiDomain = await localStorage.getItem("apiDomain");
      //           let res = await axios({
      //               method: 'put',
      //               url: apiDomain + 'branches/' + hashId ,
      //               data: {
      //                   name:  document.getElementById("name").value,
      //                   code:  document.getElementById("code").value,
      //                   street:  document.getElementById("street").value,
      //                   city:  document.getElementById("city").value,
      //                   zipcode:  document.getElementById("zipcode").value,
      //                   country:  document.getElementById("country").value,
      //                   telephone:  document.getElementById("telephone").value,
      //                   shortName:  document.getElementById("shortName").value
      //               },
      //               headers: {
      //                   Authorization: 'Bearer ' + token
      //               }
      //           })
      //           .then((res) => {
      //               this.showModalUpdate = false;
      //               alert("Succesfully Updated!");
      //               this.refresh();
      //           }) 
      //           .catch((err) => {
      //               console.log("AXIOS ERROR: ", err);
      //           })
      // },
      // refresh:function(){
      //       setTimeout(function () { 
      //         location.reload();
      //       }, 300);
      // },
      //  async saveNewData (){

      //         let token = await localStorage.getItem("apiToken");
      //         let apiDomain = await localStorage.getItem("apiDomain");

      //         let  postData = {
      //               name:  document.getElementById("name").value,
      //               code:  document.getElementById("code").value,
      //               street:  document.getElementById("street").value,
      //               city:  document.getElementById("city").value,
      //               zipcode:  document.getElementById("zipcode").value,
      //               country:  document.getElementById("country").value,
      //               telephone:  document.getElementById("telephone").value,
      //               shortName:  document.getElementById("shortName").value
      //         }
              
      //         let axiosConfig = {
      //             headers: {
      //                 "Authorization": "Bearer "+ token
      //             }
      //         };

      //         let res = await axios.post(apiDomain + 'branches', postData, axiosConfig)
      //         .then((res) => {
               
      //            alert("Succesfully Added!");
      //             this.showModal = false
      //              this.refresh();

      //         })
      //         .catch((err) => {
      //           console.log("AXIOS ERROR: ", err);
      //         })
         
      //  },
      //  async deactivateBranch(hashId){

      //           let token = await localStorage.getItem("apiToken");
      //           let apiDomain = await localStorage.getItem("apiDomain");
      //           let res = await axios({
      //               method: 'put',
      //               url: apiDomain + 'branches/' + hashId + '/deactivate',
      //               data: {status: "I"},
      //               headers: {
      //                   Authorization: 'Bearer ' + token
      //               }
      //           })
      //           .then((res) => {
      //               alert("Succesfully Deactivated!");
      //                this.refresh();

      //           })
      //           .catch((err) => {
      //               console.log("AXIOS ERROR: ", err);
      //           })
      //  }
  },
  watch:{
  },
  computed: {
  }

}
</script>


<style scoped>
.card-body{
  height: 139px !important;
}
.no-gutters{
    padding-left: 0px;
    padding-right: 0px;
}
</style>