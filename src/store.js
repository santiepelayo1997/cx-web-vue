import Vue from 'vue'
import Vuex from 'vuex'
import Dexie from 'dexie'

let idb = new Dexie('cx+')
import router from './router'

// idb.version(1).stores({
//   tokens: "++id, userHashId, token, refreshToken, serverTime",
//   users: "&hashId, accountHashId,code, email, status, userName",
//   accounts: "&hashId, createdAt, updatedAt, name, companyName, status, country, mobileNo",
//   items: "&hashId, createdAt, updatedAt, name, barcodes, photoUrl, productType, status",
//   branches: "&hashId, accountHashId,name, code , updatedAt, createdAt, status",
//   licenses: "&hashId, accountHashId,key, updatedAt, createdAt, status, expiredAt, orderedAt",
//   objectUpdates: "&[accountHashId+tableName]"
// })
idb.version(1).stores({
  tokens: "++id, userHashId, token, refreshToken, serverTime",
  users: "&hashId, accountHashId,code, email, status, name, userName,homeBranchHashId,photoUrl,settings,extras,updatedAt,createdAt",
  accounts: "&hashId, createdAt, updatedAt, name, companyName, status, country, mobileNo",
  items: "&hashId, createdAt, updatedAt, name, stockNo, retailPrice, cost, barcodes, photoUrl, productType, status, extra, meta, accountHashId",
  branches: "&hashId, accountHashId,name, code , updatedAt, createdAt, status",
  extraChargeTypes:  "&hashId,name,code,remarks,rate,amount,status,allowOpenCharge,taxInclusive,extra,policy,accountHashId",
  discounts: "&hashId,name,code,remarks,rate,amount,status,allowOpenDiscount,extra,policy,accountHashId",
  pos_terminals: "&hashId,currentVersion,terminalId,serialNo,permitNo,machineIdentificationNo,accreditationNo,tin,settings,status,accountHashId,branchHashId,license",
  taxes: "&hashId, accountHashId,name, code , remarks ,rate,amount,status,allowOpenTax,isExemption,extra,policy, updatedAt, createdAt",
  paymentchannels: "&hashId, accountHashId,name, code , updatedAt, createdAt, status",
  user_groups: "&hashId,createdAt,updatedAt, code, name ,status ,isDefault,policy,accountHashId",
  licenses: "&hashId, accountHashId,key, updatedAt, createdAt, status, expiredAt, orderedAt",
  objectUpdates: "&[accountHashId+tableName]"
})

idb.open()

Vue.use(Vuex)
import axios from 'axios';


export default new Vuex.Store({
  state: {
    apiDetails: {
      domain: '54.169.119.158',
      channel: 'http',
      version: '1',
    },
    db: idb,
    errorMessage: '',
    search:'',
    checkedColor: ["#9c27b0"],
    ifStatusSucess: null,
    currentAccount: null,
    userGroupName: '',
    cardSelectedHash: "action",
    selectedUserHash: '',
    loading: false,
    photoUrl: '',
    checkIfValidToSave: null,
    selectedHashId: null,
    ifDeleted: null,
    showModal: false,
    userGroupHashId: null,
    showModalUpdate: false,
    showModalChangePass: false,
    successMessage: '',
    isAdmin: false,
    nameOfUser: '',
    navPhotoUrl: ''
  },
  mutations: {
    // assignCurrentAccount(state, payload){
    //   state.currentAccount = payload
    // },
    // assignAdminPrivilege(state,isAdmin){
    //   state.isAdmin = isAdmin
    // }
  },
  actions: {
    async retrieveData({getters,state},[hashId, form, modelName]){
    
      state.selectedHashId = hashId
      state.showModalUpdate = true
      let apiToken = await getters.apiToken()
      let axiosConfig = {
            headers: {
                "Authorization": "Bearer "+ apiToken.token
            }
        };
      await axios.get(getters.apiDomain + modelName + '/' + hashId, axiosConfig)
      .then((res) => {
            form.forEach(function(element){
                if(element.inputType == "file"){
                    if(res.data[element.name] == "" || (res.data.photoUrl == null)){
                        document.getElementById(element.name).src = 'https://www.exclusivehomedesign.it/wp-content/uploads/2018/07/noPhoto.png'
                    }else{
                        document.getElementById(element.name).src =  res.data[element.name]
                        state.photoUrl =  res.data[element.name]
                    }
                }else if(element.name == "settings"){
                    if(element.inputType == "colorPicker"){
                        state.checkedColor = res.data[element.name]["card-color"] 
                    }
                }else if(element.name== "licenseKey"){
                    document.getElementById(element.name).value = res.data.license.key
                }else if(element.inputType=="checkbox"){
                    document.getElementById(element.name).checked =  res.data[element.name]
                }else{
                    document.getElementById(element.name).value = res.data[element.name]
                }
            });
        })
      .catch((err) => {
          console.log("AXIOS ERROR: ", err);
      })
    },
    async getUserDetails({getters,state}, hashId){
       let apiToken = await getters.apiToken()
       await axios({
           method: 'get',
           url: getters.apiDomain + 'users/' + hashId,
           headers: {
               Authorization: 'Bearer ' + apiToken.token
           }
       })
       .then((res) => {
           state.navPhotoUrl = res.data.photoUrl
           state.nameOfUser = res.data.name
       })
       .catch((err) => {
           console.log("AXIOS ERROR: ", err);
       })
   },
    async deleteData({getters,state}, [hashId, modelName]){
       let apiToken = await getters.apiToken()
        await axios({
            method: 'delete',
            url: getters.apiDomain + modelName + '/' + hashId,
            headers: {
                Authorization: 'Bearer ' + apiToken.token
            }
        })
        .then((res) => {
            state.ifDeleted = true
            setTimeout(() => {
              state.ifDeleted = false
            },1500)
        })
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
        })
    },
    async deactivateData({getters,state}, [hashId, modelName]){

      let apiToken = await getters.apiToken()
       await axios({
           method: 'put',
           url: getters.apiDomain + modelName + '/' + hashId + '/deactivate',
           data: {status: "I"},
           headers: {
               Authorization: 'Bearer ' + apiToken.token
           }
       })
       .then((res) => {
           console.log(res);
           state.ifDeleted = true
           setTimeout(() => {
            state.ifDeleted = false
           },1500)
       })
       .catch((err) => {
           console.log("AXIOS ERROR: ", err);
           state.errorMessage = err.response.data.error
           setTimeout(() => {
             state.errorMessage = ""
             state.ifDeleted = null
           },2500)
       })
    },
    async blockData({getters,state}, [hashId, modelName , successMessage]){

      let apiToken = await getters.apiToken()
       await axios({
           method: 'put',
           url: getters.apiDomain + modelName + '/' + hashId + '/block',
           data: {status: "B"},
           headers: {
               Authorization: 'Bearer ' + apiToken.token
           }
       })
       .then((res) => {
           console.log(res);
           state.successMessage =  successMessage
           state.ifDeleted = true
           setTimeout(() => {
            state.ifDeleted = false
           },1500)
       })
       .catch((err) => {
           console.log("AXIOS ERROR: ", err);
           state.errorMessage = err.response.data.error
           setTimeout(() => {
             state.errorMessage = ""
             state.ifDeleted = null
           },2500)
       })
    },
    async changePassword({getters,state}, [hashId, modelName, form , successMessage]){

      let newPassword = [];
      form.forEach(function(element){
        newPassword =  document.getElementById(element.name).value 
      });
    
      let apiToken = await getters.apiToken()
       await axios({
           method: 'post',
           url: getters.apiDomain + modelName + '/' + hashId + '/changepass',
           data: {newPassword:newPassword},
           headers: {
               Authorization: 'Bearer ' + apiToken.token
           }
       })
       .then((res) => {
           state.showModalChangePass = false
           state.successMessage =  successMessage
           state.ifStatusSucess = true
           setTimeout(() => {
            state.ifStatusSucess = false
            state.loading = false
          },1500)
         
       })
       .catch((err) => {
            console.log("AXIOS ERROR: ", err);
            state.loading = false
            state.errorMessage = err.response.data.error
            setTimeout(() => {
              state.errorMessage = ""
              state.ifStatusSucess = null
            },2500)
          
       })
    },
    async updateData({getters,state},[array, modelName, file, successMessage]){
     
      var arrayElements = {}; 
      let apiToken = await getters.apiToken()  
      
      //Checking if have photo
      if(file != null && file != ""){
   
        let apiTokenPhoto = await getters.apiToken()  
        await axios.post(getters.apiDomain + 'uploads',
        file,
        {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": "Bearer "+ apiTokenPhoto.token
          },
        }).then((response) => {
                 state.checkIfValidToSave = true
                 state.photoUrl = "http://" + state.apiDetails.domain + response.data[0].photoUrl  + '?width=300&height=300&percentage=100'
        })
        .catch((err) => {
            state.checkIfValidToSave = false
            state.loading = false
            state.errorMessage = err.response.data.error
            state.ifStatusSucess = false
            setTimeout(() => {
              state.ifStatusSucess = null
              state.errorMessage = ""
            },2000)
            console.log("AXIOS ERROR: ", err.response.data.error);
            return state.errorMessage
        })
      }else{
          state.checkIfValidToSave = true
      }
      //Check if photo is valid 
      if(state.checkIfValidToSave == true){

         array.forEach(function(element){
            
                  if(element.inputType == "number"){
                      let number = document.getElementById(element.name).value
                      if(number == "" || number == null ){
                        arrayElements[element.name] = 0
                      }else{
                        arrayElements[element.name] = document.getElementById(element.name).value
                      }
                  }else if(element.inputType == "file"){
                      arrayElements[element.name] = state.photoUrl
                  }else if(element.name == "settings"){
                    if(element.inputType == "colorPicker"){
                 
                        let colorPicker = {
                          "card-color": state.checkedColor
                        }
                        arrayElements[element.name] = colorPicker
                    }
                 }else if(element.inputType == "checkbox"){
                      arrayElements[element.name] = document.getElementById(element.name).checked
                 }else{
                      arrayElements[element.name] = document.getElementById(element.name).value
                 }
          });
      
          let axiosConfig = {
              headers: {
                  "Authorization": "Bearer "+ apiToken.token
              }
          };
           await axios.put(getters.apiDomain + modelName + '/' + state.selectedHashId , arrayElements , axiosConfig)
          .then((res) => {
              state.successMessage = successMessage
              state.ifStatusSucess = true
              setTimeout(() => {
                state.ifStatusSucess = false
              },1500)
              state.reload = true
              state.showModalUpdate = false
              state.loading = false

            
          })
          .catch((err) => {
              state.loading = false
              state.errorMessage = err.response.data.error
              setTimeout(() => {
                state.errorMessage = ""
                state.ifStatusSucess = null
              },2500)
              console.log("AXIOS ERROR: ", err.response.data.error);
          })
          return state.ifStatusSucess
        
      }
   
    },
    async saveData({getters,state},[array, modelName, file, successMessage]){
    
       var arrayElements = {}; 
      let apiToken = await getters.apiToken()  
      
      //Checking if have photo
      if(file != null && file != ""){

        let apiTokenPhoto = await getters.apiToken()  
        await axios.post(getters.apiDomain + 'uploads',
        file,
        {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": "Bearer "+ apiTokenPhoto.token
          }
        })
        .then((response) => {
                 state.checkIfValidToSave = true
                 state.photoUrl = "http://" + state.apiDetails.domain + response.data[0].photoUrl  + '?width=300&height=300&percentage=100'
        })
        .catch((err) => {
            state.checkIfValidToSave = false
            state.loading = false
            state.errorMessage = err.response.data.error
            state.ifStatusSucess = false
            setTimeout(() => {
              state.errorMessage = ""
              state.ifStatusSucess = null
            },2500)
            console.log("AXIOS ERROR: ", err.response.data.error);
            return state.errorMessage
        })

      }else{
          state.checkIfValidToSave = true
          state.photoUrl = ""
      }
      //Check if photo is valid 
      if(state.checkIfValidToSave == true){


         array.forEach(function(element){
         
                if(element.inputType == "number"){
                    let number = document.getElementById(element.name).value
                    if(number == "" || number == null ){
                      arrayElements[element.name] = 0
                    }else{
                      arrayElements[element.name] = document.getElementById(element.name).value
                    }
                }else if(element.inputType == "file"){
                    arrayElements[element.name] = state.photoUrl
                }else if(element.name == "settings"){
                    if(element.inputType == "colorPicker"){
                      let colorPicker = {
                        "card-color": state.checkedColor
                      }
                      arrayElements[element.name] = colorPicker
                    }
                }else if(element.inputType == "checkbox"){
                      arrayElements[element.name] = document.getElementById(element.name).checked
                }else if(element.inputType == "hidden"){
                      arrayElements[element.name] = state.userGroupHashId
                }else{
                    arrayElements[element.name] = document.getElementById(element.name).value
                }
          });

          console.log(arrayElements)
      
          let axiosConfig = {
              headers: {
                  "Authorization": "Bearer "+ apiToken.token
              }
          };
           await axios.post(getters.apiDomain + modelName , arrayElements , axiosConfig)
          .then((res) => {
              state.successMessage = successMessage
              state.ifStatusSucess = true
              setTimeout(() => {
                state.ifStatusSucess = false
              },1500)
              state.showModal = false
              state.loading = false
          })
          .catch((err) => {
              state.loading = false
              state.errorMessage = err.response.data.error
              state.ifStatusSucess = false
              setTimeout(() => {
                state.errorMessage = ""
                state.ifStatusSucess = false
              },2500)
              console.log("AXIOS ERROR: ", err.response.data.error);
          })
          
          return state.ifStatusSucess
      }
   
     
       
    },
    async getRequest({dispatch,getters}, options){
      let apiToken = await getters.apiToken()
      localStorage.setItem("apiToken",apiToken.token);
      localStorage.setItem("apiDomain",getters.apiDomain);
      localStorage.setItem("domain",getters.apiIpAddress)
      if(apiToken == undefined)
           dispatch('logout')
      let getResponse = await axios.get(getters.apiDomain + options.endpoint, {
        params:{
          ...options.urlParams
        },
        "headers": {
          "Authorization": "Bearer "+apiToken.token
        }
      }).then((res) => {
        // console.log(res);
        return res
      }).catch((err) => {
        return err.response
      })
      //perform filtering here?
      if(getResponse.status == 403){//Forbidden.. Get new token
        await axios.get(getters.apiDomain+"tokens", {
          params: {
            "ref": apiToken.refreshToken
          }
        }).then((res) => {
          //process new token
        //  console.log(res.data)
        }).catch((error) => {
          console.log(error)
          dispatch('logout')
        })
      }
      // console.log(getResponse)
      return getResponse
    },
    async cloudLastUpdatedAt ({dispatch},options) {
      let cluaRes = await dispatch('getRequest',{"endpoint": options.endpoint, "urlParams":{...options.urlParams,"q": "lastUpdatedAt"}})
      if(cluaRes.status == 200){
        return cluaRes.data.lastUpdatedAt
      }else{
        return '2010-01-01T00:00:00.000Z'
      }
    },
    async getUpdateCount({dispatch},options){
      let cucRes = await dispatch('getRequest',{"endpoint": options.endpoint, "urlParams":{...options.urlParams,"q": "count"}})
      if(cucRes.status == 200){
        return cucRes.data.count
      }else{
        return -1
      }
    },
    async logout({state}){
      try{
        await state.db.tokens.clear()
        window.localStorage.removeItem('currentUser')
        router.push('/login')
      }catch(err){
        console.log("error")
      }
    },
    async getBranches({getters}){
      try{
        let branches = await getters.getBranches()
        return branches
      }catch(err){
        console.log(err)
      }
    },
    async getApiDomain({getters}){
      try{
        let apiDomain = await getters.apiDomainLink()
        localStorage.setItem("apiDomain",apiDomain)
        return apiDomain
      }catch(err){
        console.log(err)
      }
    },
    async isSuperAdmin({getters}){
      let u = await getters.currentUser()
      //console.log(u.userGroup)
      if(u.userGroup.name == 'Super Admin')//check if has the same hashID
        {
          localStorage.setItem('isAdmin',true)
        }
    },
  },
  getters:{
    apiIpAddress: function(state){
      return state.apiDetails.domain
    },
    apiDomainLink: (state) => async () => {
      return state.apiDetails.channel+'://'+state.apiDetails.domain+'/api/v'+state.apiDetails.version+'/'
    },
    apiDomain: function (state){
      return state.apiDetails.channel+'://'+state.apiDetails.domain+'/api/v'+state.apiDetails.version+'/'
    },
    apiToken: (state) => async () => {
      var resToken = await state.db.tokens.orderBy(':id').last()
      return resToken
    },
    currentUser: (state) => async() => {
      var user = await state.db.users.get({"hashId": localStorage.getItem('currentUser')})
      return user
    },
    getAccessibleBranches: (state) => async() => {
      let users = await state.db.users.get({"hashId": localStorage.getItem('currentUser')})
      return users
    },
    getBranches: (state) => async() => {
      let user = await state.db.users.get({"hashId": localStorage.getItem('currentUser')})
      let branchList = user.userGroup.policy.branches.list;
      let arrayItems = []
      branchList.forEach(function(element) {
          state.db.branches.where({hashId: element }).each(function (branchList) {
            arrayItems.push(branchList);
            localStorage.setItem('listOfBranches', JSON.stringify(arrayItems));
         }).catch(function (error) {
            console.error(error);
        });
      });
      return arrayItems
   },
    currentAccount: (state) => async() => {
      var account = await state.db.accounts.get({"hashId": localStorage.getItem('currentAccount')})
      if(account == null){
        account = {"name": "admin", "hashId": localStorage.getItem('currentAccount')}
      }
      return account
    },
    hasAccess: (state) =>  async (page, userAction, hashObject) => {
      //fetch the user
      var user = await state.db.users.get({"hashId": localStorage.getItem('currentUser')})
      var ug = user.userGroup
     
      //check the user groups
      var hasAccess = false
      if(ug.policy[page] != undefined){
       if(ug.policy[page][userAction] !=  undefined){
         if(ug.policy[page][userAction] == '*' || ug.policy[page][userAction].includes(hashObject))
         console.log
           hasAccess = true
       }else{
         console.log("Action not defined")
       }
      }else{
        console.log("Policy not defined")
      }
      return hasAccess
    },
    lastUpdatedAtUtc: (state) =>  async (objectName) => {
      try{
        var ou = await state.db.objectUpdates.get({"accountHashId": localStorage.getItem('currentAccount'), "tableName": objectName})
        if(ou != undefined){
          return ou.lastUpdatedAtUtc
        }else{
          return '2010-01-01T00:00:00.000Z'
        }
      }catch(e){
        console.log(e)
        return '2010-01-01T00:00:00.000Z' //table does not exist
      }
    },
    updateLocalTimestamp: (state) => async (objectName, newDate) => {
      const accountHashId = localStorage.getItem('currentAccount')
      state.db.objectUpdates.put({"accountHashId": accountHashId, "tableName": objectName, lastUpdatedAtUtc: newDate})
    }
  }
})
