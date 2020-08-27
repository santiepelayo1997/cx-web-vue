<template>
  <div>
      <Navigation/>
      <div class="container-fluid">
            <div class="row"> 
                 <FormBuilder
                    api-model="user_groups" 
                    card-title="Create New Role"
                    :card-button="cardButton"
                    :btn-close="btnClose"
                    v-if="this.$store.state.showModal" 
                    card-size="modal-dialog modal-dialog-centered modal-lg"
                    :card-input="form"
                    success-message="Role Succesfully Added!"
                    @closeModal="closeModal"
                    :card-upload="uploadTextBox"
                    :loading="this.$store.state.loading"
                 />

                 <FormBuilder
                    api-model="user_groups" 
                    card-title="Update Role"
                    :card-button="cardButtonUpdate"
                    card-size="modal-dialog modal-dialog-centered modal-lg"
                    :card-input="form"
                    success-message="Role Succesfully Updated!"
                    v-if="this.$store.state.showModalUpdate" 
                    @closeModal="closeModal"
                    :btn-close="btnClose"
                    :card-upload="uploadTextBox"
                     :loading="this.$store.state.loading"
                 />

                 <!-- <FormBuilder
                    card-title="Copy Role"
                    :card-button="cardButtonUpdate"
                    card-size="modal-dialog modal-dialog-centered modal-lg"
                    :card-input="form"
                    v-if="showModalCopy" 
                    @closeModal="closeModal"
                    :btn-close="btnClose"
                    :card-upload="uploadTextBox"
                 /> -->

                 <div class="col-12">
                    <template v-if="syncing == true">
                        <Loader api-model="user_groups" @doneLoading="stopSync" :indexed-filter="indexedFilter"/>
                    </template>
                    <template v-else>
                    <TableList
                        api-model="user_groups"
                        :show-fields="showFields"
                        table-name="Roles"
                        :card-input="form"
                        :card-upload="uploadTextBox"
                        :card-style="cardStyle"
                        :btn-add="btnAdd"
                        :indexed-filter="indexedFilter"
                        :icon-buttons="iconButtons"
                        @viewUsersIcon="linkToUsers"
                        :icon-color="iconColor"
                        @btnAddModal="openModal"
                        @cardclick="linkToUsers"
                    
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
  name: 'UserGroups',
  mounted () {
     this.$store.dispatch('getBranches');
  },
  data:
    function() {
        return{
            syncing: true,
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
                  name: "use2",
                  uiName: "fas fa-times",
                  callName: "delete",
                  accepting: ["hashId"]
                },
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
              btnClose: [
                {
                  name: "btnClose",
                  uiName: "Cancel",
                  callName: "closeModal",
                }
              ],
              viewButtons: [
                {
                  name: "viewUsers",
                  uiName: "View Users",
                  callName: "useAccount",
                  accepting: ["hashId"]
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
                  name: "code",
                  inputId: "code",
                  labelName: "Code:",
                  cardInputCol: "col-md-6",
                  ifRequired: true,
                  inputType: "varchar",
                  errorName: "Please input Code",
                }
              ],
              uploadTextBox: [{
                  name: "photoUrl",
                  labelName: "Upload Photo:",
                  cardInputCol: "col-12",
                  inputType: "file",
                  fileId: "file",
                  acceptUpload: "image/x-png,image/jpeg",
              }],
               cardButtonUpdate: [
                {
                  name: "use",
                  uiName: "Save",
                  callName: "putData",
                  className: "btn btn-primary"
                }
              ],
               cardStyle: [
                   {
                    color: '#0B055B'
                   }
                 ],
                 iconColor: [
                 {
                     color: '#CBCBCB'
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
      Sidebar,
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
      // async copyUserGroup (hashId){
      //       this.showModalCopy = true

      //       let token = await localStorage.getItem("apiToken");
      //       let apiDomain = await localStorage.getItem("apiDomain");

      //       let axiosConfig = {
      //           headers: {
      //               "Authorization": "Bearer "+ token
      //           }
      //       };
      //       let res = await axios.get(apiDomain + 'user_groups/' + hashId, axiosConfig)
      //      .then((res) => {
      //           document.getElementById("name").value = res.data.name
      //           document.getElementById("code").value = res.data.code
      //           location.reload();
      //       })
      //      .catch((err) => {
      //         console.log("AXIOS ERROR: ", err);
      //      })
      // },
      async linkToUsers(hashId,name){
           this.$router.push({ name: 'Users' })
           this.$store.state.userGroupHashId = hashId
           this.$store.state.userGroupName = name
      }
      
  },
  watch:{
  },
  computed: {
  }

}
</script>

<style scoped>
.add {
  color: #7808F7;
  font-size:25px;
}
</style>