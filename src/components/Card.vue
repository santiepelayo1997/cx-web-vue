<template>
<div id="card-template">
    <div class="card ml-5 mb-5">
        <div class="card-body ">
            <slot name="productImg">
                <img src="../images/lays.png" class="float-left"  id="productImg" />
            </slot>
            <span id="productTitle">
                <slot name="productTitle">
                    
                </slot>
            </span>
            <p id="skuNumber">     
                  <slot name="skuNumber">
                        <i class="material-icons float-right">
                                close
                        </i>  
                        SKU BC-1234567 <br> 01234567890   
                  </slot>
             </p>
            <span id="productDescription">
                  <slot name="productDescription">
                      Description of Product <br>is found here.
                  </slot>
            </span>
            <span id="productPrice" class="float-right">
                 <slot name="productPrice">
                     Php1000.00
                 </slot>
            </span>
        </div>
    </div>   
</div>
</template>

<script>

</script>

<style scoped>  
#productImg {
    width: 95px;
    height: 114px;
    margin-left:10px;
    margin-right:30px;
}
#productPrice {
    color: #43425D;
    font-weight: 600;
}
#productTitle {
    text-align: left;
    font-family: 'Work Sans','semi-bold';
    letter-spacing: 0;
    color: #0B055B;
    font-weight: 600;
}
#productDescription {
    color: #6e6565;
    opacity: 0.5;
    font-size:12px;
}
#skuNumber{
    text-align: left;
    font-size:12px;
    color: #0B055B;
}
.material-icons{
    color: #CBCBCB;
}
.card {
    width: 485px;
    height: 160px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 2px 6px #0000000A;
    opacity: 1;
}
</style>
