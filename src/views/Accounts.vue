<template>
  <div>
    <Navigation/>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-9 col-lg-10">
          <template v-if="syncing == true">
            <Loader api-model="accounts" @doneLoading="stopSync" :indexed-filter="indexedFilter" />
          </template>
          <template v-else>
            <TableList
              api-model="accounts"
              :show-fields="showFields"
              :indexed-filter="indexedFilter"
              :action-buttons="actionButtons"
              @useAccount="useThisAccount"
            />
          </template>
          <FormBuilder/>
        </div>
      </div>
    </div>   
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Sidebar from "@/components/Sidebar.vue";
import Loader from "@/components/Loader.vue";
import TableList from "@/components/TableList.vue";
import FormBuilder from "@/components/FormBuilder.vue";


export default {
  name: "accounts",
  mounted() {},
  data: function() {
    return {
      syncing: true,
      showFields: {
        orderBy: "updatedAt",
        orientation: "desc",
        list: ["name", "companyName", "email", "mobileNo"]
      },
      actionButtons: [
        {
          name: "use",
          uiName: "Use this test account",
          callName: "useAccount",
          accepting: ["hashId"]
        },
        
      ],
      indexedFilter: {
          status: "B"
      }
    };
  },
  components: {
    Navigation,
    Sidebar,
    Loader,
    TableList,
    FormBuilder
  },
  methods: {
    stopSync: function() {
      this.syncing = false;
    },
    useThisAccount: async function(hashId) {
      //delete other accounts' records?
      let acc = await this.$store.state.db.accounts.get({ hashId: hashId });
      localStorage.setItem("currentAccount", acc.hashId);
      //download remove objectUpdated at for these tables
      this.$router.push("/main");
    }
  },
  watch: {},
  computed: {}
};
</script>


<style>
.no-gutters {
  padding-left: 0px;
  padding-right: 0px;
}
</style>