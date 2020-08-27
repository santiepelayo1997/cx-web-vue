<template>
  <div>
     <Navigation/>
     <div class="container-fluid">
             <div class="row">
                  <FormBuilder
                  api-model="items"
                  card-title="Create New Item"
                  :card-button="cardButton"
                  card-size="modal-dialog modal-dialog-centered modal-lg"
                  :card-input="form"
                  success-message="Product Succesfully Added!"
                  v-if="this.$store.state.showModal" 
                  @closeModal="closeModal"
                  :btn-close="btnClose"
                  :text-area="textArea"
                  :card-upload="uploadTextBox"
                  :loading="this.$store.state.loading"
                 />

                <FormBuilder
                  api-model="items"
                  card-title="Update Item"
                  :card-button="cardButtonUpdate"
                  card-size="modal-dialog modal-dialog-centered modal-lg"
                  :card-input="form"
                  success-message="Product Succesfully Updated!"
                  v-if="this.$store.state.showModalUpdate" 
                  @closeModal="closeModal"
                  :btn-close="btnClose"
                  :card-upload="uploadTextBox"
                  :text-area="textArea"
                  :loading="this.$store.state.loading"
                 />
                   <div class="col-md-12">
                    <!-- START OF TABLE LIST  -->
                        <template v-if="syncing == true">
                              <Loader 
                              api-model="items" 
                              @doneLoading="stopSync" 
                              :indexed-filter="indexedFilter"
                              />
                        </template>
                        <template v-else>
                     
                              <TableList
                              :card-input="form"
                              :text-area="textArea"
                              :card-upload="uploadTextBox"
                              api-model="items"
                              table-name="Products Overview"
                              :show-fields="showFields"
                              delete-message="Succesfully Deleted!"
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
  name: 'items',
  mounted () {
   
  
  },
  data:
    function() {
        return{
              syncing: true,
              file: '',
              showFields: {
                  "orderBy": "updatedAt",
                  "orientation": "desc",
                  "list": ['name']
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
                  errorName: "Please input Name",
                  inputType: "varchar"
                },
                 {
                  name: "shortName",
                  labelName: "Short Name:",
                  inputId: "shortName",
                  cardInputCol: "col-md-6",
                  max: 30,
                  errorName: "Please input Short Name",
                  inputType: "varchar"  
                },
                {
                  name: "retailPrice",
                  labelName: "Retail Price:",
                  inputId: "retailPrice",
                  cardInputCol: "col-md-6",
                  max: 30,
                  errorName: "Please input Retail Price",
                  inputType: "number"
                },
                 {
                  name: "cost",
                  labelName: "Cost:",
                  inputId: "cost",
                  cardInputCol: "col-md-6",
                  defaultValue: 0,
                  max: 30,
                  errorName: "Please input Cost",
                  inputType: "number"
                },
                {
                  name: "stockNo",
                  labelName: "Stock No.:",
                  inputId: "stockNo",
                  cardInputCol: "col-md-6",
                  max: 30,
                  errorName: "Please input Stock No",
                  ifRequired: true,
                  inputType: "varchar"
                }
              ],
              uploadTextBox: [{
                  name: "photoUrl",
                  labelName: "Upload Photo:",
                  cardInputCol: "col-12",
                  acceptUpload: "image/x-png,image/jpeg",
                  inputType: "file",
                  errorName: "Please upload Photo",
                  fileId: "file"
              }],
              textArea:[{
                  labelName: "Description:",
                  name: "description",
                  rows: 3,
                  id: "description",
                  max: 30,
                  formSelectCol: "col-6",
                  errorName: "Please input description of product",
                  inputType: "textarea",
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
          this.showModalUpdate = false
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