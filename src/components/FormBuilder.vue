<template>
  <transition name="modal">
      <div class="modal modal-mask" id="addModal"  tabindex="-1" role="dialog" aria-labelledby="addModal" aria-hidden="true">
        <div :class="cardSize" role="document">
          <div class="modal-content" @click.stop>
            <div class="modal-header d-flex justify-content-center">
              <h5 class="modal-title " id="exampleModalScrollableTitle">{{ this.cardTitle }}</h5>
            </div>

            <div class="modal-body">
               <!-- START FORM -->
                <form
                  name="form" 
                  @submit="checkForm"
                  method="post"
                >
        
                <!-- <div class="alert alert-success"> -->
              <span v-if="this.$store.state.errorMessage != '' || this.$store.state.errorMessage == null">
                <div class="alert alert-danger" id="customAlert" >
                    <div class="alert-container">
                    <div class="alert-icon">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <button type="button" @click="closeAlert" class="close-icon" data-dismiss="alert" aria-label="Close">
                        <span>clear</span>
                    </button>
                      <label id="labelAlert">{{this.$store.state.errorMessage}}</label>
                    </div>
                </div>
              </span>
        
                
              <div class="row">
                    <div v-for="cU in cardUpload" v-bind:key="cU.name" :class="cU.cardInputCol">
                      <div class="d-flex justify-content-center">   
                        <div class="avatar-preview">
                            <div id="divImagePreview" class="text-center">
                          
                                    <div class="d-flex justify-content-center" >
                                        <span 
                                          id="loadingScreen"
                                          class="spinner-border spinner-border-sm mt-5" 
                                          role="status" 
                                          aria-hidden="true" >
                                        </span>
                                    </div>   
                                  <img id="photoUrl" src="../images/noimage.png" class="rounded img-fluid">
                            </div>
                            <div class=" row" id="photoButtons">
                              <div class="wrapper">
                                    <div class=" upload-btn-wrapper">
                                        <button type="button"  class="btn btnEditPhoto" 
                                        data-toggle="tooltip" 
                                        data-placement="bottom" 
                                        title="Tooltip on bottom">
                                        <i class="fas fa-pen"></i>
                                        </button>
                                        <!-- <input type="file" id="file"  :class="cU.cardInputCol" :v-model="cU.modelName" ref="file" :accept="cU.acceptUpload" @change="cU.callName"> -->
                                        <input type="file" id="file"  :class="cU.cardInputCol"  :v-model="cU.inputType" ref="file" :accept="cU.acceptUpload" @change="handleFileUpload()">
                                    </div>
                                   <div class="tooltip">
                                      <ul>
                                        <li>File must be at least 5mb</li>
                                        <li>PNG and JPG file format only</li>
                                      </ul>
                                  </div>
                              </div>
                            
                              <div>
                                <button class="btn btnDeletePhoto" @click="removePhoto"><i class="fas fa-trash-alt"></i></button>
                              </div>
                            </div>
                        </div></div>
                    </div>
              </div>
              <div class="row">
                  <div v-for="cI in cardInput" v-bind:key="cI.name" :class="cI.cardInputCol">
                      <label for="name" class="col-form-label">{{cI.labelName}}
                          <span v-if="cI.ifRequired == true">
                              <span class="ifRequired"> * </span>
                          </span>
                      </label>
                      <input 
                      :type="cI.type" 
                      :id="cI.inputId" 
                      :name="cI.name" 
                      class="inputTextBox mr-2 form-control" 
                      :v-model="cI.name"
                      :minlength="cI.min" 
                      :maxlength="cI.max" 
                      :placeholder="cI.placeholder"
                      @keyup="validateInputTextBox(cI.name,cI.inputType,cI.ifRequired)"
                      :pattern="cI.pattern"
                      :required="cI.required">
                      <div class="invalid-feedback" id="invalid">{{cI.errorName}}</div>
                  </div> 

                  <div class="form-group" v-for="fS in formSelect" v-bind:key="fS.name" :class="fS.formSelectCol">
                    <label for="name" class="col-form-label">{{fS.labelName}}
                        <span v-if="fS.ifRequired == true">
                             <span class="ifRequired"> * </span>
                        </span>
                    </label>
                    <select :class="fS.className" v-model="selected" :name="fS.name" :id="fS.selectId" @change="emitSelect(fS.callName,selected)">
                        <option value="" disabled>Choose {{fS.defaultPlaceholder}}</option>
                        <option v-for="option in fS.options" v-bind:value="option.hashId" v-bind:key="option.hashId">
                            {{ option.name }}
                        </option>
                    </select>
                    <div class="invalid-feedback" >{{fS.errorName}}</div>
                  </div> 

                   <div class="form-group" v-for="cb in checkBox" v-bind:key="cb.name" :class="cb.checkBoxCol">
                     <div class="d-flex align-items-center">    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" :id="cb.checkBoxId">
                        <label class="custom-control-label pl-2" :for="cb.labelCheckBox">{{cb.placeholder}}</label>
                      </div>  </div>
                  </div>
                
                  <div class="form-group" v-for="cp in colorPicker" v-bind:key="cp.name" :class="cp.colorPickerCol">
                      <br>
                      <ColorPicker/>
                  </div>

                  <div class="form-group" v-for="ta in textArea" v-bind:key="ta.name" :class="ta.formSelectCol">
                      <label for="name" class="col-form-label">{{ta.labelName}}
                          <span v-if="ta.ifRequired == true">
                              <span class="ifRequired"> * </span>
                          </span>
                      </label>
                      <textarea class="form-control"   @keyup="validateInputTextBox(ta.name,ta.inputType,ta.ifRequired)" :maxlength="ta.max"  aria-describedby="inputGroupPrepend" :id="ta.id" :rows="ta.rows" ></textarea>
                      <div class="invalid-feedback" >{{ta.errorName}}</div>
                  </div> 
             </div> 
              <br>
              <div class="row pb-3" >
                <div class="col-12">
                      <div style="float:left">  
                          <span class="float-left" style="color:#78909c;"><b style="color:red;">*</b> - Required Field</span>
                      </div>
                      <div style="float:right">
                          <span v-for="cb in cardButton" v-bind:key="cb.name">
                                <button type="submit" class="btn btnSave btn-primary mr-2" @click="emitActionToParent(cb.callName);">{{cb.uiName}}
                                    <span v-if="loading == true">
                                          <span class="spinner-border spinner-border-sm" id="spinnerButton" role="status" aria-hidden="true" ></span>
                                    </span>
                                </button>
                          </span>
                          <span  v-for="bc in btnClose" v-bind:key="bc.name">
                              <button type="button" class="btn btnClose btn-secondary"  @click="emitActionToParent(bc.callName)">{{bc.uiName}}</button>
                          </span>
                      </div>
                  </div>
               </div>
             </form>
             <!-- END FORM -->
          </div>
        </div>
      </div>
      </div>
  </transition>
</template>

<script>
import axios from 'axios';
import ColorPicker from '@/components/ColorPicker.vue'

export default {
    name: 'FormBuilder',
    components: {
    ColorPicker
    },
    mounted() {
   
      if(document.body.contains(document.querySelector('select')) == true){
         const select = document.querySelector('select');
         select.selectedIndex = 0;
      }
      if(document.body.contains(document.querySelector('#file')) == true){
          document.getElementById("photoUrl").style.display = "";
          document.getElementById("loadingScreen").style.display = "none";
          document.getElementById("file").onchange = function(){
              var reader = new FileReader();
              var elements = document.getElementsByClassName("btn");
               for (var i = 0; i < elements.length; i++) {
                  elements[i].disabled =true;
               }
                document.getElementById("file").disabled =true;
                document.getElementById("loadingScreen").style.display = "";
                document.getElementById("photoUrl").style.display = "none";
                reader.onload = function()
                {
                  var elements = document.getElementsByClassName("btn");
                  for (var i = 0; i < elements.length; i++) {
                    elements[i].disabled = false;
                  }
                  document.getElementById("file").disabled =false;
                  document.getElementById("loadingScreen").style.display = "none";
                  document.getElementById("photoUrl").style.display = "";
                  var output = document.getElementById('photoUrl');
                  output.src = reader.result;
                }
                reader.readAsDataURL(event.target.files[0]);
           };
      }
    

    },
    data: function() {
        return {
            selected: "Default",
            showModal:  false,
            selectedFile: null,
            errorMessage: false,
            checkFormIfValid: true,
            file: ''
        }
    },
    props: {
        apiModel: String,
        cardName:String,
        cardTitle: String,
        colClass: String,
        colorPicker: Array,
        checkBox: Array,
        successMessage: String,
        cardButton: Array,
        btnClose: Array,
        fieldDefinition: Object,
        loading: Boolean,
        apiTypeRequest: String,
        cardSize: String,
        alertCustom: Array,
        cardInput: Array,
        textArea: Array,
        formSelect: Array,
        cardUpload: Array
    },
    methods: {

        emitActionToParent: function(action,hashId){
        
           this.$emit(action,hashId)
           let forms = [];
           //If Posting Data 
           if(action == "postData"){
                //Validate Form
                let arrayItems = [];
                let form = arrayItems.concat(this.cardInput||[],this.textArea||[],this.cardUpload||[],this.formSelect||[])
                for (let i = 0; i < form.length; i++) {
                  let text = form[i];
                   this.validateInputTextBox(text.name,text.inputType,text.ifRequired)
                }  
                if(this.checkFormIfValid != false){
                    //Start of saving of data
                    this.$store.state.loading = true
                    this.$store.dispatch('saveData', [forms.concat(this.cardInput||[],this.textArea||[],this.cardUpload||[],this.formSelect||[],this.colorPicker||[],this.checkBox||[]), this.apiModel , this.file, this.successMessage])
                }
              
           //If Updating Data
           }else if(action == "putData"){
              
                let arrayItems = [];
                let validateInputTextBox;
                let validToSave;
                

                let form = arrayItems.concat(this.cardInput||[],this.textArea||[],this.cardUpload||[],this.formSelect||[])
                for (let i = 0; i < form.length; i++) {
                   let text = form[i];
                    validateInputTextBox =  this.validateInputTextBox(text.name,text.inputType,text.ifRequired)
                    if(validateInputTextBox == false){
                       validToSave = false
                    }
                }  
           
                if(validToSave != false){
                    this.$store.state.loading = true
                    this.$store.dispatch('updateData', [forms.concat(this.cardInput||[],this.textArea||[],this.cardUpload||[],this.colorPicker||[],this.checkBox||[]), this.apiModel , this.file, this.successMessage])
                }
           //If Changing Password
           }else if(action == "changePassword"){
       
                let arrayItems = [];
                let validateInputTextBox;
                let validToSave;
                

                let form = arrayItems.concat(this.cardInput||[],this.textArea||[],this.cardUpload||[],this.formSelect||[])
                for (let i = 0; i < form.length; i++) {
                   let text = form[i];
       
                     validateInputTextBox =  this.validateInputTextBox(text.name,text.inputType,text.ifRequired)
                    
                    if(validateInputTextBox == false){
                       validToSave = false
                    }
                }  
           
                if(validToSave != false){
                      this.$store.state.loading = true
                      this.$store.dispatch('changePassword', [this.$store.state.selectedUserHash, this.apiModel, this.cardInput,this.successMessage] )
                }
               
           } 
        },
        testValidation: function(){
               this.$store.state.checkFormIfValid = false
        },
        handleFileUpload: function(){
           let formData = new FormData();
           formData.append('file', event.target.files[0], event.target.files[0].name);
           this.file = formData
        },
        closeAlert: function(){
           this.$store.state.ifStatusSucess = null
        },
        removePhoto:function(){
          let image = document.getElementById("photoUrl")
          image.src = 'https://www.exclusivehomedesign.it/wp-content/uploads/2018/07/noPhoto.png'
          document.getElementById("file").value = "";
          this.$store.state.photoUrl = "";
        },
        checkForm: function (e) {
            e.preventDefault();
        },
        emitSelect  : function(action,selected){
           this.$emit(action,selected)
        },
        close: function () {
            this.$emit('close');
        },
       setInputFilter(textbox, inputFilter) {
          ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
            textbox.addEventListener(event, function() {
              if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
              } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
              } else {
                this.value = "";
              }
            });
          });
        },
        validateInputTextBox:function(name,inputType,ifRequired){
            //Check if required field
            if(ifRequired == true){

                  if(inputType == "varchar"){
                      let varchar = document.getElementById(name).value
                      if(varchar != "")
                      {
                          document.getElementById(name).classList.remove('is-invalid');
                          this.checkFormIfValid = true
                      }else{
                          document.getElementById(name).classList.add('is-invalid');
                          this.checkFormIfValid = false 
                      }
                  }else if(inputType == "number"){
                          let number = document.getElementById(name).value
                           if(number == ""){
                              document.getElementById(name).classList.add('is-invalid');
                              this.checkFormIfValid = false 
                          }else{
                              document.getElementById(name).classList.remove('is-invalid');
                              this.setInputFilter(document.getElementById(name), function(value) {
                               return /^-?\d*$/.test(value);
                              });
                          }
                 
                  }else if(inputType == "email"){

                      let email = document.getElementById(name).value
                      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                      if (email == '' || !re.test(email))
                      { 
                           document.getElementById(name).classList.add('is-invalid');
                            this.checkFormIfValid = false 
                      }else{
                          document.getElementById(name).classList.remove('is-invalid');
                          this.checkFormIfValid = true
                      }
                  }else if(inputType == "textarea"){
                      let textarea = document.getElementById(name).value
                      if(textarea != "")
                      {
                          document.getElementById(name).classList.remove('is-invalid');
                          this.checkFormIfValid = true
                      }else{
                          document.getElementById(name).classList.add('is-invalid');
                           this.checkFormIfValid = false 
                      }
                  }else if(inputType == "text"){
                      let text = document.getElementById(name)
                      text.onkeydown = function(e){
                        if (e.shiftKey || e.ctrlKey || e.altKey) {
                            e.preventDefault();
                        } else {
                            var key = e.keyCode;
                            if (!((key == 8) || (key == 32) || (key == 46) || (key >= 35 && key <= 40) || (key >= 65 && key <= 90))) {
                              e.preventDefault();
                            }
                        }
                     };
                  }else if(inputType == "password"){

                      let value = document.getElementById(name).value
                      let checkIfNotEmpty;

                      if(value == "" || value == null){
                         document.getElementById(name).classList.add('is-invalid');
                         checkIfNotEmpty = false
                          this.checkFormIfValid = false 
                      }else{
                         document.getElementById(name).classList.remove('is-invalid');
                         checkIfNotEmpty = true
                      }

                      if(checkIfNotEmpty == true){
                            let password = document.getElementById("password").value
                            let confirmPassword = document.getElementById("confirmPassword").value
                            if(password!=confirmPassword){
                                document.getElementById("confirmPassword").classList.add('is-invalid');
                                 this.checkFormIfValid = false 
                            }else{
                                 document.getElementById("password").classList.remove('is-invalid');
                                 document.getElementById("confirmPassword").classList.remove('is-invalid');
                                 this.checkFormIfValid = true 
                            }
                      }
                       
                  }else if(inputType == "select"){
                        let val = document.getElementById(name).value
                        if(val == "" || val == null){
                           document.getElementById(name).classList.add('is-invalid');
                           this.checkFormIfValid = false 
                        }else{
                          document.getElementById(name).classList.remove('is-invalid');
                          this.checkFormIfValid = true
                        }
                  }

                  return  this.checkFormIfValid
            //If not required field
            }else{
        
                  if(inputType == "varchar"){
                      document.getElementById(name).classList.remove('is-invalid');
                  }else if(inputType == "number"){
                      this.setInputFilter(document.getElementById(name), function(value) {
                      return /^-?\d*$/.test(value); });
                  }else if(inputType == "text"){
                        let text = document.getElementById(name).value
                        text.onkeydown = function(e){
                          if (e.shiftKey || e.ctrlKey || e.altKey) {
                              e.preventDefault();
                          } else {
                              var key = e.keyCode;
                              if (!((key == 8) || (key == 32) || (key == 46) || (key >= 35 && key <= 40) || (key >= 65 && key <= 90))) {
                                e.preventDefault();
                              }
                          }
                      };
                  }
            }
        }
    },
    computed: {
        
    },
    watch: {
    
    }
}
</script>

<style scoped>
.custom-control-label::before, 
.custom-control-label::after {
    width: 1.25rem;
    height: 1.25rem;
}
.custom-control-label{
  margin-top:20px;
  color:#7808F7;
  padding-top:2px;
}
#colorPicker {
  background: #7808F7;
  border-color:#7808F7;
}
.wrapper {
  text-transform: uppercase;
  cursor: help;
  position: relative;
  text-align: center;
  -webkit-font-smoothing: antialiased; /* webkit text rendering fix */
}
.wrapper .tooltip {
  background: #7808F7;
  bottom: 100%;
  color: #fff;
  display: block;
  left: -68px;
  margin-bottom: 15px;
  opacity: 0;
  padding: 20px;
  pointer-events: none;
  position: absolute;
  width: 200px;
  -webkit-transform: translateY(10px);
    -moz-transform: translateY(10px);
    -ms-transform: translateY(10px);
    -o-transform: translateY(10px);
      transform: translateY(10px);
  -webkit-transition: all .25s ease-out;
    -moz-transition: all .25s ease-out;
    -ms-transition: all .25s ease-out;
    -o-transition: all .25s ease-out;
      transition: all .25s ease-out;
  -webkit-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);
    -moz-box-shadow: 2px 2px 6px rgb   a(0, 0, 0, 0.28);
    -ms-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);
    -o-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);
      box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);
}

/* This bridges the gap so you can mouse into the tooltip without it disappearing */
.wrapper .tooltip:before {
bottom: -20px;
content: " ";
display: block;
height: 20px;
left: 0;
position: absolute;
width: 100%;
}

/* CSS Triangles - see Trevor's post */
.wrapper .tooltip:after {
border-left: solid transparent 10px;
border-right: solid transparent 10px;
border-top: solid #7808F7 10px;
bottom: -10px;
content: " ";
height: 0;
left: 50%;
margin-left: -13px;
position: absolute;
width: 0;
}

.wrapper:hover .tooltip {
opacity: 1;
pointer-events: auto;
-webkit-transform: translateY(0px);
  -moz-transform: translateY(0px);
  -ms-transform: translateY(0px);
   -o-transform: translateY(0px);
    transform: translateY(0px);
}

/* IE can just show/hide with no transition */
.lte8 .wrapper .tooltip {
display: none;
}

.lte8 .wrapper:hover .tooltip {
display: block;
}
#spinnerButton{
    width: 19px; 
    height: 19.5px;
}
#loadingScreen{
     width: 120px;
     height: 119.5px;
     position:absolute; 
     color:#7808F7;
}
.avatar-preview{
    position: relative;
    padding-bottom: 20px;
}
#divImagePreview{
    max-height:220px;
    min-height: 220px;
    min-width: 220px;
    max-width: 220px;
    outline: 0;
    display: block;
    transition: box-shadow .3s,  margin-top .3s, padding .3s;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 2px rgba(0, 0, 0, 0.12);
}
.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}
#photoButtons{
  padding-left:5px;
}
.btnEditPhoto {
  color:white;
  margin:3px;
  background-color:#7808F7;
  height:50px;
  width:50px;
  border-radius: 100%;
  border-color:white;
  border:1px solid white;
  font-size: 20px;
  font-weight: bold;
}
.btnDeletePhoto{
  border: 2px solid white;
  color:white;
  margin:3px;
  background-color:#FF2F5E;
  height:50px;
  width:52px;
  border-radius: 100%;
  font-size: 20px;
  font-weight: bold;
}
.upload-btn-wrapper input[type=file] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
.custom-file-label::after {
    top: 0;
    right: 0;
    bottom: 0;
    display: block;
    height: calc(1.5em + .75rem);
    padding: .375rem .75rem;
    line-height: 1.5;
    color: white;
    content: "Browse";
    background-color:#7808F7;
    border-left: inherit;
    border-color: #7808F7;
    border-radius: 0 .25rem .25rem 0;
    height: 40px;
}
.custom-file-label {
  border-color: #7808F7;
  height: 41px;
  border-radius: 5px;
}
textarea{
    border-color: #7808F7;
  border-radius: 5px;
}
.ifRequired{
  color:red;
}
.modal-mask {
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-content,
.modal-leave-active .modal-content {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.modal-header {
    border-bottom: 1px solid white !important;
}
.modal-footer {
    margin-top:20px;
    margin-bottom:10px;
    border-top: 1px solid white !important;
    padding:0px !important;
}
.modal-content {
  border-radius: 20px;
  padding-left:42px;
  padding-right: 39px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}
.col-form-label {
   color:#7808F7;
   text-align: left;
   font-size:13px;
   letter-spacing: 0;
}
.uploadTitle{
    color:#7808F7;
   text-align: left;
   font-size:13px;
   letter-spacing: 0;
}
.uploadPhoto{
  color:#7808F7;
  font-size:13px;
  text-align: left;
}
input {
  border-radius: 5px;
  height: 41px;
  border-color: #7808F7;
}
select{
  border-radius: 5px;
  height: 41px;
  border-color: #7808F7;
}
.modal-title{
  color:#7808F7;
}
.btnSave{
  background: #7808F7 ;
  border-color: #7808F7 ;
  height:47px;
  width:124px;
  border-radius: 10px;
}
.btnClose{
  background: #FF2F5E;
  border-color: #FF2F5E;
  height:47px;
  width:124px;
  border-radius: 10px;
}
.cardTextBoxes {
  padding:10px;
}
.plus_button{
    position: fixed;
    bottom: 20px;
    right: 20px;
    color: #FA7921;
    border: none;
    outline: none;
}
.material-icons.md-48 { 
    font-size: 48px; 
    cursor: pointer;
    border: none;
    outline: none;
    text-shadow: 0 2px 5px rgba(0,0,0,0.3);
}

</style>