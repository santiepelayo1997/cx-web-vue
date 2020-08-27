<template>
  <div>
     <Navigation/>
     <div class="container-fluid">
             <div class="row">
                  <FormBuilder
                    api-model="discounts"
                    card-title="Create New Discount "
                    :card-button="cardButton"
                    success-message="Discount Succesfully Added!"
                    card-size="modal-dialog modal-dialog-centered modal-lg"
                    :card-input="form"
                    v-if="this.$store.state.showModal" 
                    @closeModal="closeModal"
                    :btn-close="btnClose"
                    :loading="this.$store.state.loading"
                    :check-box="checkBox"
                 />

                <FormBuilder
                    api-model="discounts"
                    card-title="Update Discount "
                    :card-button="cardButtonUpdate"
                    success-message="Discount Succesfully Updated!"
                    card-size="modal-dialog modal-dialog-centered modal-lg"
                    :card-input="form"
                    v-if="this.$store.state.showModalUpdate" 
                    @closeModal="closeModal"
                    :btn-close="btnClose"
                    :loading="this.$store.state.loading"
                    :check-box="checkBox"
                 />
                   <div class="col-md-12">
                    <!-- START OF TABLE LIST  -->
                        <template v-if="syncing == true">
                              <Loader 
                              api-model="discounts" 
                              @doneLoading="stopSync" 
                              :indexed-filter="indexedFilter"
                              />
                        </template>
                        <template v-else>
                              <TableList
                              :card-input="form"
                              :check-box="checkBox"
                              api-model="discounts"
                              table-name="Discount Types"
                              :show-fields="showFields"
                              delete-message="Discount Succesfully Deleted!"
                              :indexed-filter="indexedFilter"
                              :icon-buttons="iconButtons"
                              :btn-add="btnAdd"
                              :icon-color="iconColor"
                              :show-alert= "true"
                              @btnAddModal="openModal"
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
  name: 'discounts',
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
              tableName: "discounts",
              photoUrl: '',
              file: '',
              showFields: {
                  "orderBy": "updatedAt",
                  "orientation": "desc",
                  "list": ['name','code','remarks','rate','amount']
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
                  inputType: "varchar",
                  ifRequired: true,
                  errorName: "Please input Name"
                },
                 {
                  name: "code",
                  labelName: "Code:",
                  inputId: "code",
                  cardInputCol: "col-md-6",
                  max: 30,
                  inputType: "varchar",
                  ifRequired: true,
                  errorName: "Please input Code"
                },
                {
                  name: "rate",
                  labelName: "Rate:",
                  inputId: "rate",
                  cardInputCol: "col-md-6",
                  inputType: "number",
                  max: 30,
                  ifRequired: true,
                  errorName: "Please input Rate"
                },
                {
                  name: "amount",
                  labelName: "Amount:",
                  inputId: "amount",
                  inputType: "number",
                  cardInputCol: "col-md-6",
                  max: 30,
                  ifRequired: true,
                  errorName: "Please input amount"
                }
              ],
              checkBox: [
                {
                  name: "allowOpenDiscount",
                  inputType: "checkbox",
                  checkBoxCol:  "col-md-4",
                  placeholder: "Allow Open Discount?",
                  checkBoxId: "allowOpenDiscount",
                  labelCheckBox: "allowOpenDiscount"
                },
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
        },
        openModal: function (){
           this.$store.state.showModal = true
        },
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