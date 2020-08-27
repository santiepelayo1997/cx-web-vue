<template>
<div>   
<div class="row section-header">    
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

<div class="lazyload">
<div class="card row-table ">
  <div class="card-body">
   <div class="form-group has-search">
            <span><i  id="filterIcon" class="fas fa-filter form-control-feedback mt-2 ml-2"></i></span>
            <input type="text" class="form-control" v-model="search" id="inputSearch" placeholder="Filter">
   </div>
   <table class="table">
    <thead class="thead">
        <tr>
            <th scope="col" v-for="header in headerField" v-bind:key="header">
                {{header}} 
            </th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="item in filterTable" v-bind:key="item.hashId">
            <td v-for="field in fieldListLess" v-bind:key="field">
                {{item[field]}} 
            </td>
        </tr>
    </tbody>
    </table>

   <div class="col-md-12 text-center">
          <button v-if="loadeditemsCount < objectCount" class="btnLoadMore btn btn-primary" @click="loadNextPage()">Show more</button>
   </div>
  </div>
</div>
</div>
</div>
</template>
<script>
export default {
    name: 'TableView',
    mounted() {
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
            search: "",
            objectCount: 0,
            objectLastUpdate: null,
            showingCount: 0, //50 per page
            page: 1,
            callName: null,
            totalpages: 0,
            objectList: [],
            objectChecking: [],
            perPage: 10,
            appliedFilters: null,
            accountName: null,
            isAdmin:false
        }
    },
    props: {
        tableName: String,
        btnAdd: Array,
        apiModel: String,
        filters: Object,
        showFields: Object,
        indexedFilter: Object,
        filterValue: String,
        filterObject: Object,
    },
    methods: {
        appliedFiltersFunction: function(value) {
            //equals
            let retain = false
            for(var i = 0; i < Object.keys(this.appliedFilters).length; i++){
                if(this.appliedFilters[Object.keys(this.appliedFilters)[i]] == value[Object.keys(this.appliedFilters)[i]])
                    retain = true
            }
            return retain
        },
        applyDefaultFilters: function(){
            if(localStorage.getItem('currentAccount') != null && localStorage.getItem('currentAccount') != undefined && this.apiModel != "accounts"){
                this.appliedFilters = {"accountHashId": localStorage.getItem('currentAccount'), ...this.indexedFilter}
            }
        },
        emitActionToParent: function(action, hashId, name){
            this.$emit(action, hashId, name)
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
          
            return await items
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
    computed: {
        filterTable: function(){
            return this.objectList.filter((filter)=>{
                return filter.name.toLowerCase().includes(this.search.toLowerCase());
            });
        },
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
        headerField(){
            return this.showFields.tableHeader.filter(function(header){
                return header 
            })
        },
        fieldListLess(){
            return this.showFields.tableData.filter(function(field){
                return field 
            })
        },
        currentAccountSelected(){
            return (localStorage.getItem('isAdmin') && localStorage.getItem('currentAccount') != null && localStorage.getItem('currentAccount') != undefined)
        }
    }
}
</script>
<style scoped>
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
.lazyload{
    overflow-y: auto;
    max-height: 65.7407vh;
}
.lazyload:hover{
    max-height:65.7407vh;
    overflow-y: auto;
}
.btnLoadMore {
    border-radius: 10px;
}
.section-status{
    font-size: 12px;
    color: #D0D0D0;
    margin-top:-8px;
    text-align: right
}  
.section-header{
    min-height: 50px;
    padding-left:42px;
    padding-right:42px;
}
.row-table{
    min-height: 50px;
    overflow-y: auto;
    margin-left:42px;
    margin-right:42px;
}
.thead{
    background-color:#F0F0F7 !important;
}
.table thead th {
    vertical-align: bottom;
    border-bottom: 2px solid #F0F0F7 !important;
}
.table th, .table td {
    padding: .75rem;
    vertical-align: top;
    color:#707070;
    border-top: 1px solid #F0F0F7 !important;
}
.has-search .form-control {
    padding-left: 2.375rem;
}

.has-search .form-control-feedback {
    position: absolute;
    display: block;
    width: 2.375rem;
    height: 2.375rem;
    line-height: 2.375rem;
    text-align: center;
    pointer-events: none;
    color: #aaa;
}
#filterIcon{
    color:#7808F7;
    width:18px;
    height:18px;
}
#inputSearch{
    background: #FCFCFC 0% 0% no-repeat padding-box;
    border: 2px solid #7808F7;
    border-radius: 10px;
    opacity: 1;
    width: 210px;
    height: 35px;
    margin-top:21px;
}
.section-title{
    font-family: "Work Sans";
    font-weight: 550;
    font-size:30px;
    color: #43425D;
    text-transform: capitalize;
}
.section-view{
    min-height: 50px;
    padding-top: 62px;
    padding-left:42px;
    padding-right:42px;
}
.add {
    color: #7808F7;
    width: 22px;
    height: 22px;
    margin-bottom: 5px;
}
.load-status{
    font-size:12px;
    white-space: nowrap;
    color: #707070;
}
</style>