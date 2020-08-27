<template>
    <div>
        <Navigation/>
        <div class="container-fluid">
            <div class="row">
                <Sidebar/>
                <div class="col-md-9 col-lg-10">
                    <template v-if="syncing == true">
                    <Loader api-model="licenses" @doneLoading="stopSync" :indexed-filter="indexedFilter"/>
                    </template>
                    <template v-else>
                    <TableList api-model="licenses" :show-fields="showFields" :indexed-filter="indexedFilter"/>
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

export default {
  name: 'licenses',
  mounted () {
  },
  data:
    function() {
        return{
            syncing: true,
            showFields: {
                "orderBy": "orderedAt",
                "orientation": "asc",
                "list": ['key','expiredAt','orderedAt'],
            },
            indexedFilter: null
        }
    },
  components: {
      Navigation,
      Sidebar,
      Loader,
      TableList
  },
  methods: {
      stopSync: function () {
          this.syncing = false
      }
  },
  watch:{
  },
  computed: {
  }

}
</script>


<style>

.no-gutters{
    padding-left: 0px;
    padding-right: 0px;
}

</style>