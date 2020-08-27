<template>
  <div>
     <Navigation/>
     <div class="container-fluid">
             <div class="row">
                  <FormBuilder
                   api-model="pos_terminals"
                  card-title="Create New POS Terminal"
                  :card-button="cardButton"
                  success-message="POS Terminal Succesfully Added!"
                  card-size="modal-dialog modal-dialog-centered modal-lg"
                  :card-input="form"
                  v-if="this.$store.state.showModal"  
                  @closeModal="closeModal"
                   :form-select="formSelect"
                  :btn-close="btnClose"
                  :loading="this.$store.state.loading"
                 />

                <FormBuilder
                  api-model="pos_terminals"
                  card-title="Update POS Terminal"
                  :card-button="cardButtonUpdate"
                   success-message="POS Terminal Succesfully Updated!"
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
                              api-model="licenses" 
                              @doneLoading="stopSync" 
                              :indexed-filter="indexedFilter"
                              />
                        </template>
                        <template v-else>
                              <TableList
                              api-model="licenses"
                              table-name="POS Terminals"
                              :show-fields="showFields"
                              :card-input="form"
                              delete-message="POS Terminals Succesfully Deleted!"
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
  name: 'terminals',
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
              tableName: "terminals",
              photoUrl: '',
              file: '',
              showFields: {
                  "orderBy": "updatedAt",
                  "orientation": "desc",
                  "list": ['key','status','orderedAt']
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
                  name: "currentVersion",
                  labelName: "Current Version:",
                  inputId: "currentVersion",
                  cardInputCol: "col-md-6",
                  max: 31,
                  ifRequired: true,
                  inputType: "number",
                  errorName: "Please input Current Version"
                },
                  {
                  name: "terminalId",
                  labelName: "Terminal ID.:",
                  inputId: "terminalId",
                  cardInputCol: "col-md-6",
                  max: 31,
                  ifRequired: true,
                  inputType: "number",
                  errorName: "Please input Terminal ID."
                },
                {
                  name: "serialNo",
                  labelName: "Serial No.:",
                  inputId: "serialNo",
                  cardInputCol: "col-md-6",
                  max: 31,
                  ifRequired: true,
                  inputType: "number",
                  errorName: "Please input Serial No."
                },
                 {
                  name: "tin",
                  labelName: "Tin No.:",
                  inputId: "tin",
                  cardInputCol: "col-md-6",
                  max: 30,
                  ifRequired: true,
                  inputType: "number",
                  errorName: "Please input TIN No."
                },
                {
                  name: "licenseKey",
                  labelName: "License Key:",
                  inputId: "licenseKey",
                  cardInputCol: "col-md-6",
                  max: 30,
                  ifRequired: true,
                  inputType: "varchar",
                  errorName: "Please input License Key"
                },
                 {
                  name: "permitNo",
                  labelName: "Permit No.:",
                  inputId: "permitNo",
                  cardInputCol: "col-md-6",
                  max: 30,
                  ifRequired: true,
                  inputType: "varchar",
                  errorName: "Please input Permit No."
                },
                 {
                  name: "machineIdentificationNo",
                  labelName: "Machine ID No.:",
                  inputId: "machineIdentificationNo",
                  cardInputCol: "col-md-6",
                  max: 30,
                  ifRequired: true,
                  inputType: "varchar",
                  errorName: "Please input Machine ID No."
                },
                 {
                  name: "accreditationNo",
                  labelName: "Accrediation No.:",
                  inputId: "accreditationNo",
                  cardInputCol: "col-md-6",
                  max: 30,
                  ifRequired: true,
                  inputType: "varchar",
                  errorName: "Please input Accrediation No."
                }
              ],
          
               formSelect: [{
                  labelName: "Branches:",
                  name: "branchHashId",
                  formSelectCol: "col-md-6",
                  inputType: "select",
                  callName: "selectBranch",
                  errorName: "Please select Branch",
                  options: JSON.parse(localStorage.getItem('listOfBranches')),
                  defaultPlaceholder: "Branches",
                  selectId: "branchHashId",
                  className: "select form-control",
                  ifRequired: true
               }],
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
        },
        openModal: function (){
            this.$store.state.showModal = true
        },
        openModalUpdate: function(){
             this.$store.state.showModalUpdate = true
        }
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