<template>
    <div>
            <div class="row section-view">
                <div class="col-md-12">
                    <span  v-for="bb in btnBack" v-bind:key="bb.name"  @click="emitActionToParent(bb.callName)">
                        <span id="iconButton"  class="linkBacktoParent ml-3"><i class="fas fa-chevron-left"></i>{{ " " + bb.tableName}}</span>
                    </span>
                </div>
            </div>
           <div class="row section-header">
             <!-- ALERTS -->
             <span v-if="this.$store.state.ifStatusSucess == true">
                <div class="alert alert-success">
                    <div class="alert-container">
                    <div class="alert-icon">
                       <i class="fas fa-check"></i>
                    </div>
                    <button type="button" class="close-icon" data-dismiss="alert" aria-label="Close">
                        <span>clear</span>
                    </button>
                          <label>&nbsp;&nbsp; {{this.$store.state.successMessage}}</label>
                    </div>
                </div>
             </span>
                  
             <span v-if="this.$store.state.ifDeleted == true">
                <div class="alert alert-success">
                    <div class="alert-container">
                    <div class="alert-icon">
                       <i class="fas fa-check"></i>
                    </div>
                    <button type="button" class="close-icon" data-dismiss="alert" aria-label="Close">
                        <span>clear</span>
                    </button>
                        <span v-if="this.$store.state.successMessage != ''">
                             <label>{{ this.$store.state.successMessage }}</label>
                        </span>
                        <span v-else>
                             <label>{{ this.deleteMessage }}</label>
                        </span>
                    </div>
                </div>
             </span>
            <div class="col-sm-8 ">
                <h2 class="ml-3 float-left section-title">
                {{this.tableName}}
                <span v-for="ba in btnAdd" v-bind:key="ba.name" >
                    <span id="btnAdd" @click="emitActionToParent(ba.callName)"><i class="add fas fa-plus-circle justify-content-center" ></i> </span>
                </span>
                </h2>
                <br>
            </div>
            <div class="col-lg-4">
                <div class="d-flex justify-content-end">
                    <div class="load-status pt-3 pr-2">
                         Showing {{loadeditemsCount}} of {{objectCount}} 
                    </div>
                     <div v-if="this.isAdmin == 'true'">
                        <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span v-if="currentAccountSelected">Account: {{accountName}}</span>
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <button class="dropdown-item" type="button">Action</button>
                            <button class="dropdown-item" type="button">Another action</button>
                            <button class="dropdown-item" type="button">Something else here</button>
                        </div>
                     </div>
                 </div>
            </div>
        </div>
       
        <div class="row">
              <p v-if="objectLastUpdate != null" class="section-status pl-4 ml-5">UPDATED AS OF: {{objectLastUpdate | moment("MM/DD/YYYY LTS")}}</p>
        </div>
        <div >
        <div class="row lazyload">
            <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12" v-for="item in objectList" v-bind:key="item.hashId" >
                 <div class="card" :style="[ item.settings ? {'background': item.settings['card-color'], color: cardStyle } : {'background': '#FFF'}]" >
                     <!-- ADDED CARD CLICK -->
                   <div class="card-body" @click="emitActionToParent('',item.hashId,item.name)" id="cardItems">
                     <div v-if="item.hasOwnProperty('photoUrl') == true"  >
                        <div v-if="item.photoUrl == ''">
                            <img src="../images/noimage.png"  class="noImg img img-fluid float-left"/>
                        </div>
                        <div v-else-if="item.photoUrl == null">
                             <img src="../images/noimage.png"  class="noImg img img-fluid float-left"/>
                        </div>
                        <div v-else >
                            <img v-bind:src="item.photoUrl" width="90" id="tableBanner" height="90" class="img img-fluid float-left"/>
                        </div> 
                    </div>
                    <div class="actionIcon h-100">
                        <span  v-for="ib in iconButtons" v-bind:key="ib.name" >
                           <a  :style="iconColor" @click.stop="emitActionToParent(ib.callName,item.hashId,item.name)"> <i id="iconHover" :class="ib.uiName" ></i></a><br>
                        </span>
                    </div> 
                    <!-- ADDED FOR TERMINAL ID CARD TITLE -->
                    <span v-if="item.hasOwnProperty('terminalId') == true">
                        <div class="card-title">
                                <label  :style="cardStyle">TERMINAL NO: {{item.terminalId}} </label>
                        </div>
                    </span>
                    <div title v-if="hasName"  class="card-title">
                            <label  :style="cardStyle"> {{item.name}} </label>
                            <p> {{item.stockNo}} </p>  
                    </div> 
                    <div v-if="hasCode" class="card-subtitle" :style="cardStyle">
                        <p>{{item.code}}</p>
                    </div>
                    <div class="card-fields">
                        <div  :style="cardStyle" v-for="field in fieldListLess" v-bind:key="field">
                             {{humanReadable(field)}} : {{item[field]}}<br>
                            <!-- {{item[field]}} -->
                        </div>
                    </div>
                    <div v-for="ab in actionButtons" v-bind:key="ab.name">
                        <a class="card-link" @click="emitActionToParent(ab.callName,item.hashId)">{{ab.uiName}}</a>
                    </div>
                    <div class="price">
                         <span v-if="item.hasOwnProperty('cost') == true">
                            Php{{ addZeroes(item.cost) }}
                         </span> 
                         <span  v-for="vb in viewButtons" v-bind:key="vb.name">
                              <button type="button" id="btnView" @click="emitActionToParent(vb.callName,item.hashId)" class="btn btn-sm btn-outline-primary">{{vb.uiName}}</button>
                        </span>
                    </div>
                    <div v-if="item.description == null">
                    </div>
                    <div v-else>
                        <div class="description">
                            {{ item.description }}
                        </div>
                    </div>
                  </div>
                </div>
                
            </div>   
                <div class="col-md-12 text-center">
                   <button v-if="loadeditemsCount < objectCount" class="btnLoadMore btn btn-primary" @click="loadNextPage()">Show more</button>
                </div>
            </div>
        </div>
        </div>
</template>

<script>

export default {
    name: 'TableList',
    mounted() {
    
        this.isAdmin = localStorage.getItem("isAdmin");
        this.applyDefaultFilters()
        this.loadDefaults()
        this.loadOnlyPage(this.page)
        this.currentAccountName()
        if(this.$store.state.ifDeleted == true){
             
               setTimeout(() => {
               this.$store.state.ifDeleted = false
              
              },1000)
        }

    },
    data: function() {
        return {
            objectCount: 0,
            showModal: false,
            objectLastUpdate: null,
            showingCount: 0, //50 per page
            page: 1,
            callName: null,
            totalpages: 0,
            objectList: [],
            objectChecking: [],
            perPage: 20,
            appliedFilters: null,
            accountName: null,
            isAdmin:false
        }
    },
    props: {
        cardInput: Array,
        checkBox: Array,
        textArea: Array,
        formSelect: Array,
        colorPicker: Array,
        cardUpload: Array,
        apiModel: String,
        targetModal: String,
        tableName: String,
        cardCall: Function,
        deleteMessage: String,
        successMessage: String,
        filters: Object,
        showFields: Object,
        indexedFilter: Object,
        filterValue: String,
        btnBack: Array,
        showAlert: Boolean,
        btnAdd: Array,
        actionButtons: Array,
        iconButtons: Array,
        alertCustom: Array,
        viewButtons: Array,
        classTable: String,
        cardStyle: Array,
        iconColor: Array,
        filterObject: Object,
        cardSelected: Function
    },
    methods: {
        openModal() {
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        appliedFiltersFunction: function(value) {
            //equals
            let retain = false
            for(var i = 0; i < Object.keys(this.appliedFilters).length; i++){
                if(this.appliedFilters[Object.keys(this.appliedFilters)[i]] == value[Object.keys(this.appliedFilters)[i]])
                    retain = true
            }
            return retain
        },
        imageUrlAlt(event) {
            event.target.src = "../images/noimage.png"
        },
        addZeroes(num) {
            var value = Number(num);      
            var res = num.split(".");     
            if(res.length == 1 || res[1].length < 3) { 
                value = value.toFixed(2);
            }
           return value;
        },
        applyDefaultFilters: function(){
            if(localStorage.getItem('currentAccount') != null && localStorage.getItem('currentAccount') != undefined && this.apiModel != "accounts"){
                this.appliedFilters = {"accountHashId": localStorage.getItem('currentAccount'), ...this.indexedFilter}
            }
        },
        clickParent: function(action,hashId){
             this.$emit(action, hashId)
        },
        emitActionIcon: function(action, hashId, name){
                
              
        },
        emitActionToParent: function(action, hashId, name){
            let arrayItems = [];
            let form = [];
            this.$emit(action, hashId, name)
            if(action == ''){
                this.$emit('cardclick', hashId ,name)
            }
         
            if(action == "delete"){
                 this.$store.dispatch('deleteData', [hashId,this.apiModel]) 
            }else if(action == "retrieveData"){
                 form = arrayItems.concat(this.cardInput||[],this.textArea||[],this.cardUpload||[],this.colorPicker||[],this.checkBox||[])  
                 this.$store.dispatch('retrieveData', [hashId, form, this.apiModel])
            }else if(action == "deactivateData"){
                 this.$store.dispatch('deactivateData', [hashId, this.apiModel])
            }else if(action == "block"){
                 this.$store.dispatch('blockData', [hashId, this.apiModel ,"Successfully Blocked"])
            }
            
         },
        countItems: async function(){
            let items
            if(this.indexedFilter != undefined && this.indexedFilter != null){
                items = await this.$store.state.db[this.apiModel].where(this.indexedFilter)
            }else{
                items = await this.$store.state.db[this.apiModel]
            }

            if(this.appliedFilters != null && this.appliedFilters != undefined)
            items = await items.filter(this.appliedFiltersFunction)
 
            if(this.filterObject != undefined && this.filterObject != null) {
                let arrayvalues = await items.toArray();
                let filterValue = this.filterValue
                let filterItems = [];
               
                arrayvalues.forEach(function(element) {
                    filterItems.push(element)
                });
                let filterObjectKey = this.filterObject
                items = await filterItems.filter(function (arrayItems) {
                    return arrayItems[filterObjectKey.value][filterObjectKey.property] === filterValue
                });
                  this.objectCount = await items.length;
                }else{
                  this.objectCount = await items.count();
            }
        },
        loadDefaults: async function(){
            //we need this to load async values
            this.countItems()
            this.objectLastUpdate = await this.$store.getters.lastUpdatedAtUtc(this.apiModel)
        },
        currentAccountName: async function(){
            let acc = await this.$store.getters.currentAccount()
            this.accountName = acc.name    
        },
        loadPage: async function(pageNo){
            let items
        
            if(this.indexedFilter != undefined && this.indexedFilter != null){
                //sorting will not work on indexed filter
                items = await this.$store.state.db[this.apiModel].where(this.indexedFilter)
              
            }else{
                items = await this.$store.state.db[this.apiModel].orderBy(this.showFields.orderBy)
                
                if(this.desc)
                    items = await items.reverse()
            }
            if(this.desc)
                    items = await items.reverse()
            items = await items.offset(((pageNo-1)*this.perPage)).limit(this.perPage)

            if(this.appliedFilters != null && this.appliedFilters != undefined)
                items = await items.filter(this.appliedFiltersFunction)

            items = await items.toArray()//convert to array
          //  console.log(items);
      
           if(this.filterObject != undefined && this.filterObject != null) {
                
                let filterValue = this.filterValue
                let filterItems = [];
           
                items.forEach(function(element) {
                    filterItems.push(element)
                });
                let filterObjectKey = this.filterObject
                items = await filterItems.filter(function (arrayItems) {
                    return arrayItems[filterObjectKey.value][filterObjectKey.property] === filterValue
                });
           }

        //    items.forEach(element => {
        //        this.toDataUrl(element.photoUrl, function(myBase64) {
        //             localStorage.setItem("imgData", myBase64);
        //        });
        //    });
          
            return await items
        },
        toDataUrl(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function() {
                var reader = new FileReader();
                reader.onloadend = function() {
                    callback(reader.result);
                }
                reader.readAsDataURL(xhr.response);
            };
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.send();
        },
        loadNextPage: async function(){
            this.page++;
            let pageContent = await this.loadPage(this.page)
            this.objectList = this.objectList.concat(pageContent)
        },
        loadOnlyPage: async function(pageNo){
            this.objectList = await this.loadPage(pageNo)
        },
        humanReadable(text){
            return text.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase();})
        }
    },
    watch:{
        
    },
    computed: {
        hasName(){
            try{
                return this.showFields.list.includes('name')
            }catch(e){
                return false
            }
        },
        hasCode(){
            try{
                return this.showFields.list.includes('code')
            }catch(e){
                return false
            }
        },
        desc(){
            return this.showFields.orientation == "desc"
        },
        loadeditemsCount(){
            return this.objectList.length
        },
        filterTable: function(){
            return this.objectList.filter((filter)=>{
                return filter.name.toLowerCase().includes(this.$store.state.search);
            });
        },
        fieldListLess(){
            return this.showFields.list.filter(function(field){
                return field !== 'name' && field !== 'code'
            })
        },
        currentAccountSelected(){
            return (localStorage.getItem('isAdmin') && localStorage.getItem('currentAccount') != null && localStorage.getItem('currentAccount') != undefined)
        }
    }
}
</script>

<style scoped>
.container-row{
    width: 100%;
} 
#iconHover:hover{
    color: #AA65F9;
}
.card-body{
    height: 155px;
}
#cardItems {
    cursor:pointer;
}
/* width */
::-webkit-scrollbar {
   width: 14px;
   background-color:#D0D0D04B;
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: 20px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background:#D3D3DD; 
  border-radius: 20px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #D3D3DD; 
}
.btnLoadMore {
    border-radius: 10px;
}
#btnView{
  border-radius: 10px;
  color: #AA65F9;
  border-color: #AA65F9;
}
#btnView:hover{
  border-radius: 10px;
  color:white;
  background-color: #AA65F9;
}
.section-header{
    min-height: 50px;
    padding-left:42px;
    padding-right:42px;
}
.section-view{
    min-height: 50px;
    padding-top: 62px;
    padding-left:42px;
    padding-right:42px;
}
.section-title{
    font-family: "Work Sans";
    font-weight: 550;
    font-size:30px;
    color: #43425D;
    text-transform: capitalize;
}
.section-status{
    font-size: 12px;
    color: #D0D0D0;
    margin-top:-8px;
    text-align: right
}   
#iconButton{
    color:#707070;
    cursor: pointer;
}
#iconButton:hover{
    color:#AA65F9;
}
#btnAdd{
    cursor: pointer;
}
.lazyload{
    max-height: 80vh;
    overflow-y: auto;
    position:static;
    padding-left:42px;
    padding-right:42px;
    padding-bottom: 60px;
}
.lazyload:hover{
    position: static;
    max-height: 80vh;
    overflow-y: auto;
    padding-bottom: 60px;
}
.card{
     margin-bottom: 39px;
}
.card-fields{
    font-size: 13px;
}
.load-status{
    font-size:12px;
    white-space: nowrap;
    color: #707070;
}
 .card-title > label {
    font-size: 16px;
    width: 150px;
    color: #0B055B;
    word-wrap: break-word;
    font-weight: 600;
    font-family: "Work Sans";
    line-height: 1.0;
    height:25px;
    margin-bottom: 3px;
} 
.card-title > p {
    text-align: left;
    margin-top:-4px;
    font-size:14px;
    font-weight: normal;
    color: #0B055B;
}
.card-subtitle{
    text-align: left;
     font-size:13px;
    margin-top: -23px;
    letter-spacing: 0;
    color: rgb(7, 7, 7);
}
.img{
    margin-top:10px;
    width: 90px;
    height: 90px;
    margin-right:30px;
}
.noImg{
    width: 90px;
    height: 90px;
    padding-top:10px;
    padding-bottom:10px;
    margin-right:30px;
}
.description {
    line-height: 1.1;
    color: #4b4545;
    opacity: 0.5;
    font-size:13px;
    margin-top:28px;
    width:180px;
    word-wrap:break-word;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    height:30px;
}
.actionIcon {
    text-align: center;
    color: #CBCBCB;
    right:0;
    font-weight: 200;
    font-size:18px;
    padding:15px;
    padding-right:15px;
    padding-bottom:10px;
    margin-left:2px;
    top:0;
    position:absolute;
    min-height: auto;
    float:right;
    cursor:pointer;
    /* border: 3px solid blue;  */
}
.price {
      color: #43425D;
      font-weight: 600;
      right:0;
      bottom:0;
      position: absolute;
      padding:10px;
}
.add {
    color: #7808F7;
    width: 22px;
    height: 22px;
    margin-bottom: 5px;
}
</style>
