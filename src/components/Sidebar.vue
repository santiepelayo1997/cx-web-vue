<template>
   <div :class="sidebarClass">
        <div class="sidebar-item d-flex justify-content-center align-items-center" @click="toggleSidebar()">
            <!-- <i class="material-icons nav-icon md-30">menu</i>
            <span v-if="!collapse" class="sidebarALtName">Menu</span> -->
        </div>
        <div class="row" id="body-row">
            <div id="sidebar-container" class="sidebar-expanded">
                <ul class="list-group">
                      <a data-toggle="collapse" @click="toggleSidebar()" aria-expanded="false" :class="sidebarMenu">
                        <div class=" d-flex w-100 justify-content-start align-items-center" >
                            <span :class="iconMenu"><i class="fas fa-file-alt mr-3"></i></span>
                            <span :class="titleMenu">Products</span>
                            <span class="submenu-icon ml-auto"></span>
                        </div>
                      </a>
                <div :class="sidebarItems">
                    <a class="childItem list-group-item list-group-item-action ">
                        <span class="menu-collapsed" @click="goToMasterList">Master List</span>
                    </a>
                    <a class="childItem list-group-item list-group-item-action ">
                        <span class="menu-collapsed" >Price List</span>
                    </a>
                     <a class="childItem list-group-item list-group-item-action ">
                        <span class="menu-collapsed"  @click="goToItemOverrides">Item Overrides</span>
                    </a>
                </div>
                <a  data-toggle="colapse" @click="toggleSales()" aria-expanded="false" :class="sidebarMenu">
                    <div class="d-flex w-100 justify-content-start align-items-center">
                         <span :class="iconMenu"><i class="fas fa-tag mr-3"></i></span>
                         <span :class="titleMenu">Sales</span>
                         <span class="submenu-icon ml-auto"></span>
                    </div>
                </a> 
                 <div :class="sidebarItemsSales">
                    <a  class="childItem list-group-item list-group-item-action">
                        <span class="menu-collapsed" @click="goToPaymentChannels">Payment Channels</span>
                    </a>
                    <a  class="childItem list-group-item list-group-item-action ">
                        <span class="menu-collapsed"  @click="goToTaxRates">Tax Rates</span>
                    </a>
                    <a  class="childItem list-group-item list-group-item-action ">
                        <span class="menu-collapsed" @click="goToExtraChargeType">Charge Types</span>
                    </a>
                    <a  class="childItem list-group-item list-group-item-action ">
                        <span class="menu-collapsed"  @click="goToDiscountTypes">Discount Types</span>
                    </a>
                    <a  class="childItem list-group-item list-group-item-action ">
                        <span class="menu-collapsed"  @click="goToDiscountAccess">Discount Access</span>
                    </a>
                </div>
                   <a  data-toggle="colapse" @click="toggleOperation()" aria-expanded="false" :class="sidebarMenu">
                    <div class="d-flex w-100 justify-content-start align-items-center">
                        <span :class="iconMenu"><i class="fas fa-clock mr-3"></i></span>
                        <span id="collapse-text" :class="titleMenu">Operations</span>
                    </div>
                </a> 
                 <div :class="sidebarItemsOperation">
                    <a  class="childItem list-group-item list-group-item-action">
                        <span class="menu-collapsed">Schedules</span>
                    </a>
                    <a  class="childItem list-group-item list-group-item-action ">
                        <span class="menu-collapsed">Cash Movements</span>
                    </a>
                    <a  class="childItem list-group-item list-group-item-action ">
                        <span class="menu-collapsed"  @click="goToTerminals">Terminal</span>
                    </a>
                </div>
                  <a  data-toggle="colapse" @click="toggleAccount()" aria-expanded="false" :class="sidebarMenu">
                    <div class="d-flex w-100 justify-content-start align-items-center">
                       <span :class="iconMenu"><i class="fas fa-user mr-3"></i></span>
                        <span id="collapse-text" :class="titleMenu">Account</span>
                    </div>
                </a> 
                 <div :class="sidebarItemsAccount">
                    <a  class="childItem list-group-item list-group-item-action">
                        <span class="menu-collapsed" @click="goToBranches">Branches</span>
                    </a>
                    <a  class="childItem list-group-item list-group-item-action ">
                        <span class="menu-collapsed"  @click="goToRoles">Roles</span>
                    </a>
                </div>
                <div class="bottomItems">
                    <a  data-toggle="sidebar-colapse"  :class="sidebarMenuBottom">
                        <div class="d-flex w-100 justify-content-start align-items-center">
                        <span :class="iconMenu"><i class="fas fa-box mr-3"></i></span>
                            <span id="collapse-text" :class="titleMenu">Account</span>
                        </div>
                    </a> 
                    <a  data-toggle="sidebar-colapse"  :class="sidebarMenuBottom">
                        <div class="d-flex w-100 justify-content-start align-items-center">
                        <span :class="iconMenu"><i class="fas fa-images mr-3"></i></span>
                            <span id="collapse-text" :class="titleMenu">Plugin A</span>
                        </div>
                    </a> 
                    <a  data-toggle="sidebar-colapse"  :class="sidebarMenuBottom">
                        <div class="d-flex w-100 justify-content-start align-items-center">
                        <span :class="iconMenu"><i class="fas fa-images mr-3"></i></span>
                            <span id="collapse-text" :class="titleMenu">Plugin B</span>
                        </div>
                    </a> 
                    <a  data-toggle="sidebar-colapse"  :class="sidebarMenuBottom">
                        <div class="d-flex w-100 justify-content-start align-items-center">
                        <span :class="iconMenu"><i class="fas fa-images mr-3"></i></span>
                            <span id="collapse-text" :class="titleMenu">Plugin C</span>
                        </div>
                    </a> 
                </div>
              
                </ul>
                 <div class="d-flex justify-content-center"> <span class="uploadBtn shadow "><i class="fas fa-download mr-3"></i></span></div>
                   
                </div>
        </div>
    </div>
  </div>

</template>

<script>

export default {
    name: 'sidebar',
    data: function () {
        return {
            collapse: true,
            collapseSales: true,
            collapseOperation: true,
            collapseAccount: true,
            sidebarClass: "full-height sidebar d-sm-block d-none sidebar-collapsed",
            sidebarMenu:  "collapsed parentItem list-group-item list-group-item-action flex-column align-items-start ",
            sidebarMenuBottom: "collapsed parentItemBotom list-group-item list-group-item-action flex-column align-items-start ",
            sidebarItems: "sidebar-submenu collapse",
            sidebarItemsSales: "sidebar-submenu collapse",
            sidebarItemsOperation: "sidebar-submenu collapse",
            sidebarItemsAccount: "sidebar-submenu collapse",
            titleMenu: "menu-collapsed d-none",
            iconMenu: "icon-expanded"
         
        }
    },
    computed: {
        hasCurrentAccount(){
            return (!localStorage.getItem('isAdmin')) || (localStorage.getItem('isAdmin') && localStorage.currentAccount != null && localStorage.currentAccount != undefined)
        },
        isAdmin(){
            return localStorage.getItem('isAdmin')
        }
    },
    methods:{
        toggleSidebar: function() {
            this.collapse = !this.collapse
            if(this.collapse){
                this.sidebarClass = "full-height sidebar d-sm-block d-none sidebar-collapsed"
                this.sidebarMenu = "collapsed parentItem list-group-item list-group-item-action flex-column align-items-start "
                this.sidebarItems = "sidebar-submenu collapse"
                this.sidebarItemsSales = "sidebar-submenu collapse"
                this.sidebarItemsOperation = "sidebar-submenu collapse"
                this.sidebarItemsAccount = "sidebar-submenu collapse"
                this.sidebarMenuBottom = "collapsed parentItemBotom list-group-item list-group-item-action flex-column align-items-start "
                this.titleMenu = "menu-collapsed d-none"
                this.iconMenu = "icon-expanded"
            }else{
                this.sidebarClass = "full-height sidebar d-sm-block d-none sidebar-expanded"
                this.sidebarMenu = "expanded parentItem list-group-item list-group-item-action flex-column align-items-start collapsed"
                this.sidebarItems = "sidebar-submenu collapse show"
                this.sidebarMenuBottom = "expanded parentItemBotom list-group-item list-group-item-action flex-column align-items-start "
                this.titleMenu = "menu-collapsed"
                this.iconMenu = "icon-collapsed"
            }
        },
       toggleSales: function() {
            this.collapseSales = !this.collapseSales
             if(this.collapseSales){
                this.sidebarClass = "full-height sidebar d-sm-block d-none sidebar-collapsed"
                this.sidebarMenu = "collapsed parentItem list-group-item list-group-item-action flex-column align-items-start "
                this.sidebarItems = "sidebar-submenu collapse"
                this.sidebarItemsSales = "sidebar-submenu collapse"
                this.sidebarItemsOperation = "sidebar-submenu collapse"
                this.sidebarItemsAccount = "sidebar-submenu collapse"
                this.sidebarMenuBottom = "collapsed parentItemBotom list-group-item list-group-item-action flex-column align-items-start "
                this.titleMenu = "menu-collapsed d-none"
                this.iconMenu = "icon-expanded"
            }else{
                this.sidebarClass = "full-height sidebar d-sm-block d-none sidebar-expanded"
                this.sidebarMenu = "expanded parentItem list-group-item list-group-item-action flex-column align-items-start collapsed"
                this.sidebarItemsSales = "sidebar-submenu collapse show"
                this.sidebarMenuBottom = "expanded parentItemBotom list-group-item list-group-item-action flex-column align-items-start "
                this.titleMenu = "menu-collapsed"
                this.iconMenu = "icon-collapsed"
            }
        },
        toggleOperation: function() {
            this.collapseOperation = !this.collapseOperation
             if(this.collapseOperation){
                this.sidebarClass = "full-height sidebar d-sm-block d-none sidebar-collapsed"
                this.sidebarMenu = "collapsed parentItem list-group-item list-group-item-action flex-column align-items-start "
                this.sidebarItems = "sidebar-submenu collapse"
                this.sidebarItemsSales = "sidebar-submenu collapse"
                this.sidebarItemsOperation = "sidebar-submenu collapse"
                this.sidebarItemsAccount = "sidebar-submenu collapse"
                this.sidebarMenuBottom = "collapsed parentItemBotom list-group-item list-group-item-action flex-column align-items-start "
                this.titleMenu = "menu-collapsed d-none"
                this.iconMenu = "icon-expanded"
            }else{
                this.sidebarClass = "full-height sidebar d-sm-block d-none sidebar-expanded"
                this.sidebarMenu = "expanded parentItem list-group-item list-group-item-action flex-column align-items-start collapsed"
                this.sidebarItemsOperation = "sidebar-submenu collapse show"
                this.sidebarMenuBottom = "expanded parentItemBotom list-group-item list-group-item-action flex-column align-items-start "
                this.titleMenu = "menu-collapsed"
                this.iconMenu = "icon-collapsed"
            }
        },
       toggleAccount: function() {
            this.collapseAccount = !this.collapseAccount
             if(this.collapseAccount){
                this.sidebarClass = "full-height sidebar d-sm-block d-none sidebar-collapsed"
                this.sidebarMenu = "collapsed parentItem list-group-item list-group-item-action flex-column align-items-start "
                this.sidebarItems = "sidebar-submenu collapse"
                this.sidebarItemsSales = "sidebar-submenu collapse"
                this.sidebarItemsOperation = "sidebar-submenu collapse"
                this.sidebarItemsAccount = "sidebar-submenu collapse"
                this.sidebarMenuBottom = "collapsed parentItemBotom list-group-item list-group-item-action flex-column align-items-start "
                this.titleMenu = "menu-collapsed d-none"
                this.iconMenu = "icon-expanded"
            }else{
                this.sidebarClass = "full-height sidebar d-sm-block d-none sidebar-expanded"
                this.sidebarMenu = "expanded parentItem list-group-item list-group-item-action flex-column align-items-start collapsed"
                this.sidebarItemsAccount = "sidebar-submenu collapse show"
                this.sidebarMenuBottom = "expanded parentItemBotom list-group-item list-group-item-action flex-column align-items-start "
                this.titleMenu = "menu-collapsed"
                this.iconMenu = "icon-collapsed"
            }
        },
        goToBranches: function(){
                this.$router.push({ path: './Branches' })
        },
        goToRoles: function(){
                this.$router.push({ path: './UserGroups' })
        },
        goToMasterList: function(){
                this.$router.push({ path: './Products' })
        },
        goToPaymentChannels: function(){
                this.$router.push({ path: './PaymentChannels' })
        },
        goToTaxRates: function(){
                this.$router.push({ path: './Taxes' })
        },
        goToTerminals: function(){
                this.$router.push({ path: './Terminals' })
        },
        goToDiscountTypes: function(){
                this.$router.push({ path: './Discounts' })
        },
        goToExtraChargeType: function(){
                this.$router.push({ path: './ExtraChargeType' })
        },
        goToDiscountAccess: function(){
                this.$router.push({ path: './DiscountAccess' })
        },
        goToItemOverrides: function(){
                this.$router.push({ path: './ItemOverrides' })
        },
    }
}
</script>

<style scoped>
#body-row {
    margin-left:0;
    margin-right:0;
 
}
/* Menu item*/
#sidebar-container .list-group a.collapsed{
    height: 65px;
    color:white;
    text-align: center;
    cursor: pointer;
     transition:all 0.5s ease;
  
}
#sidebar-container .list-group a.expanded {
    height: 39px;
    color: white;
    padding-top: 6px;
    text-align: center;
    cursor: pointer;
     transition:all 0.4s ease;

}
.bottomItems{
    margin-top:230px;
}
.menu-collapsed{
    cursor: pointer;
}
.uploadBtn{
  margin-top: 14px;
  background: #7808F7 0% 0% no-repeat padding-box;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 25px;
  padding-top:10px;
  padding-left:15px;
  height:55px;
  width: 55px;
  border-radius: 50%;
}

.list-group-item {
    position: relative;
    display: block;
    margin-bottom: 1px;
    padding:0;
    border: 1px solid#0b055b !important ;
}
.icon-expanded{
    font-size: 25px;
    cursor: pointer;
}
.icon-collapsed{
    font-size: 15px;
    cursor: pointer;
}
/* Submenu item*/
#sidebar-container .list-group .sidebar-submenu .childItem {
     text-align: center;
     height:29px;
     cursor: pointer;
    
}
.sidebar-submenu {
    font-size: 0.9rem;
        transition: all 0.25s;
}
/* Separators */
.sidebar-separator-title {
    background-color: #333;
    height: 35px;
}
.sidebar-separator {        
    background-color: #333;
    height: 25px;
}
.childItem{
    background-color:#1F1A6F;
    font-size: 12.5px;
    border:0;
    padding-top:5px;
    height:35px;
}
.sidebar{
    z-index:1;
    margin: 0;
    padding: 0;
    position: initial;
    float: left;  
    width: 200px;
    color: #FFFFFF;
    height: 100%;
    background-color: #0b055b;
}
.iconItem{
    padding-right:5px;
}
.parentItem{
     background-color: #0b055b;
     width: 100%;
     height: 39px;
     font-size: 16px;
     font-family: "Work Sans";
     padding-left: 21px;
     text-align: center;
  
}
.parentItemBotom{
     background-color:#1F1A6F;
     width: 100%;
     height: 39px;
     font-size: 16px;
     padding-top:13px;
     font-family: "Work Sans";
     padding-left: 21px;
     text-align: center;
}
.sidebar-collapsed{
    width: 70px;
    transition:all 0.5s ease;    
}
.sidebar-expanded{
    width: 163px;
    transition: 0.5 ease;
}
.sidebar-item{
    height: 65px;
    width: 100%;
    transition:all 0.3s ease;
}
.sidebar-item > .material-icons.md-30 { 
    font-size: 30px; 
    /* adjust font a bit to center */
    padding-bottom: 10px;
}
/* .sidebar-item:hover{
    background-color: #c58140;
} */
.full-height{
    min-height: 100vh;
    margin-bottom: 0px;
}
.nav-icon{
    position: relative;
    top: 5px;
}

.sidebarALtName{
    padding-left: 10px;
}

</style>