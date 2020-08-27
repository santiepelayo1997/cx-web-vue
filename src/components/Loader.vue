<template >
    <div class="row loader"  >
        <div class="col-md-12">
            <div class="loading-screen text-center"  >
                <div>
                  <div v-if="showRetry">
                    <button @click="retrySync" class="btn btn-sm btn-secondary btn-text-adj">Retry <i class="material-icons btn-adj">refresh</i></button> &nbsp;
                    <button @click="skipSync" class="btn btn-sm btn-warning btn-text-adj">Skip updating records <i class="material-icons btn-adj">report_problem</i></button>
                  </div>
                  <div v-else class="spinner-border" style="width:100px;height:100px" role="status">
                    <span class="sr-only" >Loading...</span>
                  </div>
                </div>
                <br>
                {{ loadingMessage }}<br>
                <span v-if="totalPages >= 1">
                    {{ currentPage}} of {{ totalPages }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { setInterval, clearInterval } from 'timers';
import {mapActions} from 'vuex'
//const localStorage = window.localStorage;

export default {
    name: 'Loader',
    mounted() {
            try
            {
                clearInterval(this.retryInteval)
            }
            catch(e)
            {
                console.log("No interval to clear")
            }
            if(this.$store.getters.hasAccess(this.apiModel,'list','*'))
            this.apiSync();
    },
    data: function() {
        return {
            currentPage: 0,
            totalPages: 0,
            loadingMessage: 'Loading',
            showRetry: false,
            retryCountdown: null,
            retryInterval: null,
        }
    },
    props: {
        apiModel: String,
        indexedFilter: Object
    },
    methods: {
        skipSync: function(){
            this.$emit("doneLoading")
        },
        retrySync: function (){
            if(this.retryCountdown >= 0){
                try{
                    clearInterval(this.retryInterval)
                }catch(e){
                    console.log("Problem clearing interval")
                }
                this.retryCountdown = 3
                this.loadingMessage = 'Retrying in '+this.retryCountdown+" seconds"
                this.retryInterval = setInterval(() => {
                    this.retryCountdown--;
                    this.loadingMessage = 'Retrying in '+this.retryCountdown+" seconds"
                },1000)
            }
        },
        ...mapActions(
            [
                'cloudLastUpdatedAt',
                'getUpdateCount',
                'getRequest'
            ]
        ),
        apiSync: async function() {

            //check last updated at
            this.showRetry = false
            this.loadingMessage = 'Loading'
            this.currentPage = 0
            try{
         
                let clua = await this.cloudLastUpdatedAt({"endpoint": this.apiModel,"urlParams": this.filters})
                let lua = await this.$store.getters.lastUpdatedAtUtc(this.apiModel)
            
                let dclua = Date.parse(clua)
                let dlua = Date.parse(lua)
                let dnow = Date.now()
                
                if(dclua > dlua){
                    //there's an update
                    let dnow = Date.now()
                    let icount = await this.getUpdateCount({"endpoint": this.apiModel,"urlParams": {...this.filters,"after": new Date(dlua).toISOString(), "to": new Date(dnow).toISOString()}})
                    if(icount == -1){
                        this.loadingMessage = "An error occurred while downloading list of accounts."
                    }
                    this.totalPages = Math.ceil(icount / 50)
                    let successFlag = true
                
                    syncloop: for(var i = 1; i <= this.totalPages; i++){
                        this.currentPage = i
                        let objArr = await this.getRequest({"endpoint": this.apiModel,"urlParams":{...this.filters,"page":i,"after": new Date(dlua).toISOString(), "to": new Date(dnow).toISOString()}})
                        if(objArr.status != 200){
                            successFlag = false;
                        }else{
                            console.log(objArr.data)
                            await this.$store.state.db[this.apiModel].bulkPut(objArr.data).then(() => {
                                console.log("updated page "+this.currentPage)
                            }).catch((err) => {
                                console.log("error:"+err)
                            })
                        }
                        if(!successFlag){
                            break syncloop;
                        }
                    }
                    if(successFlag){
                        this.$store.getters.updateLocalTimestamp(this.apiModel,new Date(dnow).toISOString())
                        this.$emit("doneLoading")
                    }else{
                        this.showRetry = true
                    }

                }else{
                 
                    this.$store.getters.updateLocalTimestamp(this.apiModel,new Date(dnow).toISOString())
                    this.$emit("doneLoading")
                }
            }catch(e){
                this.showRetry = true;
            }

            
        },
    },
    watch:{
        showRetry(){
            if(this.showRetry)
                this.loadingMessage = "Error encountered while downloading "+this.apiModel
        },
        retryCountdown(){
            if(this.retryCountdown <= 0){
                clearInterval(this.retryInterval)
                this.apiSync()
            }
        }
    },
    computed: {
        filters(){
            if(localStorage.getItem('currentAccount') != null && localStorage.getItem('currentAccount') != undefined && this.apiModel != "accounts"){
                return {"accountHashId": localStorage.getItem('currentAccount'), ...this.indexedFilter}
            }else{
                return this.indexedFilter
            }
        }
    }
}
</script>

<style scoped>
.loading-screen{
    position: absolute;
    padding-top: 200px;
    height: 500px;
    width: 100%;
}
.btn-adj{
    position: relative;
    top: 5px;
}

.btn-text-adj{
    font-size: 20px;
}

</style>