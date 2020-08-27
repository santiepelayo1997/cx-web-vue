<template>
 <div>
    <h6 class="titleOfColorPicker">Choose Color of Card : </h6>
    <span v-for="color in options" :key="color.name">
        <input type="radio" @change="check($event)" v-model="checkedColor" class="colorPicker" name="color" :id="color.name" :value="color.value"/>
        <label :for="color.name" class="colorPickerLabel"><span :class="color.name"></span></label> 
    </span>
</div>
</template>

<script>
export default {
    name: 'ColorPicker',
        data: function() {
        return {
            checkedColor: [],
            options: [
                { name: 'red', value: '#E93D49'},
                { name: 'orange', value: '#F2711C' },
                { name: 'yellow', value: '#FBBD08'},
                { name: 'olive', value: '#B5CC18'},
                { name: 'green', value: '#34AD6D' },
                { name: 'teal', value: '#0ABCC1'},
                { name: 'blue', value: '#2185D0'},
                { name: 'violet' , value: '#6435C9'},
                { name: 'purple', value: '#A333C8'},
                { name: 'pink', value: '#F38E9E'}
            ]
        }
    },
    mounted(){
     
    },
    methods: {
        check: function(e){
               this.$store.state.checkedColor = this.checkedColor
        }
   }
    
}
</script>

<style scoped>
.titleOfColorPicker{
    color:  #7808F7;
}
</style>