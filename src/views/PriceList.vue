<template>
  <div>
    <Navigation/>
        <div class="container-fluid">
             <div class="row mt-5">
                  <div class="col-12">
                      <template v-if="syncing == true">
                                <Loader 
                                  api-model="licenses" 
                                  @doneLoading="stopSync" 
                                  :indexed-filter="indexedFilter"
                                />
                      </template>
                      <template v-else>
                            <TableView
                                table-name="Price List"
                                :btn-add="btnAdd"
                                api-model="licenses"
                                :show-fields="showFields"
                                :indexed-filter="indexedFilter"
                            />
                      </template>
                   </div>
             </div>
        </div>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Sidebar from "@/components/Sidebar.vue";
import Loader from "@/components/Loader.vue";
import TableView from "@/components/TableView.vue";
import FormBuilder from "@/components/FormBuilder.vue";


export default {
  name: "pricelist",
  mounted() {},
  data: function() {
    return {
          syncing: true,
          btnAdd:[{
            name:"btnAdd",  
            callName: "btnAddModal"
          }],
          indexedFilter:  null,
           showFields: {
            "orderBy": "updatedAt",
            "orientation": "desc",
            "tableData": ['status'],
            "tableHeader": ["NAME","CODE","STREET","CITY"]
          },
    };
  },
  components: {
    Navigation,
    Loader,
    TableView,
  },
  methods: {
        stopSync: function () {
            this.syncing = false
        },
  },
  watch: {},
  computed: {}
};
</script>


<style>

</style>