
<!-- Template -->

<template>
  <div class="content">
    <div class="container-fluid">
 
      <br/>
      <div class="row">
        <div class="col-12">
          <va-card :title="$t('Appointments')">
              <br />
              <vue-form-generator :model="model" :schema="thirdTabSchema" :options="formOptions" ref="firstTabForm" @model-updated="onModelUpdated" >
              </vue-form-generator>  
          </va-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vudal from 'vudal'
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg-core.css'
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import TreeViewVue from '../ui/tree-view/TreeView.vue'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueFormGenerator)
Vue.component(Vudal)
// register globally
export default {
  components: {
    Vudal,
  },
  mounted () {
    // this.$refs.wizard.maxStep = 5
    // this.$refs.wizard.navigateToTab(5)
  },
  props: {
    value: File,
  },
  data () {
    return {
      show: false,
      show_second: false,
      show_third: false,
      modalClass: 'modal-90per',
      
      //shafi try
      teamsOpt1: [
        {
            name: 'Consultation',
            id: '1',
        },
        {
            name: 'Supported Employement',
            id: '2',
        },
        {
            name: 'Community Pshycriatric Services',
            id: '3',
        },
      ],

      teamsOpt2: [
        {
            name: 'Consultation',
            id: '1',
        },
        {
            name: 'Supported Employement',
            id: '2',
        },
        {
            name: 'Employment Transition Program',
            id: '3',
        },
        {
            name: 'Job Club',
            id: '4',
        },
      ],
      
      appointments: [
        {
            name: 'Outpatient',
            id: '1',
        },
        {
          name: 'Daycare',
          id: '2',
        },
      ],
      time: [
        {
          name: '08:00',
          id: '1',
        },
        {
          name: '09:00',
          id: '2',
        },
        {
          name: '10:00',
          id: '3',
        },
         {
          name: '11:00',
          id: '4',
        },
         {
          name: '14:00',
          id: '5',
        },
      ],
        
      showView: false,
      visibleApt1: false,
      visibleApt2: false,
      
   

      model: {
        show1: true,
        nric: '',
        time: '',
        date: '',

      },
      formOptions: {
        // validationErrorClass: "has-error",
        // validationSuccessClass: "has-`success`",
        validateAfterChanged: true,
      },
      thirdTabSchema: {
          groups: [
            {
                styleClasses: 'row col',
                legend: '',
                fields: [
                    {
                        type: 'input',
                        inputType: 'text',
                        label: 'NRIC',
                        model: 'nric',
                        placeholder: 'Enter NRIC',
                        required: true,
                        validator: 'Text',
                        styleClasses: 'col-md-9',
                    },
                    {
                        type: 'input',
                        inputType: 'date',
                        label: 'Date  ',
                        model: 'incorporationDate',
                        placeholder: 'Enter date',
                        required: true,
                        styleClasses: 'col-md-4',
                    },
                    {
                        type: 'select',
                        model: 'time',
                        label: 'Time',
                        placeholder: 'Select time',
                        hint: 'Select time',
                        required: true,
                        validator: 'required',
                        styleClasses: 'col-md-4',
                        selectOptions: {
                        multiple: false,
                        key: 'name',
                        label: 'name',
                        searchable: true,
                        },
                        values: () => {
                            return this.time
                        }
                    },
                    {
                        type: 'select',
                        model: 'apt',
                        label: 'Type of Appointment',
                        hint: 'Select Team',
                        required: true,
                        validator: 'required',
                        styleClasses: 'col-md-5',
                        selectOptions: {
                            multiple: false,
                            key: 'name',
                            label: 'name',
                            searchable: true,
                            noneSelectedText: 'Type of Appointment'
                        },        
                        values: () => {
                            return this.appointments
                        }, 
                    },                   
                    {
                        type: 'select',
                        model: 'team',
                        label: 'Assigned Team',
                        hint: 'Select the examining Team',
                        required: true,
                        validator: 'required',
                        styleClasses: 'col-md-5',
                        selectOptions: {
                            multiple: false,
                            key: 'name',
                            label: 'name',
                            searchable: true,
                            noneSelectedText: 'Select the examining Team'
                        },        
                        values: () => {
                          return this.teamsOpt1
                        },
                        visible: (model, field, form) => {
                          return this.visibleApt1            
                        },
                                                          
                    },
                    {
                        type: 'select',
                        model: 'team',
                        label: 'Assigned Team',
                        hint: 'Select the examining Team',
                        required: true,
                        validator: 'required',
                        styleClasses: 'col-md-5',
                        selectOptions: {
                            multiple: false,
                            key: 'name',
                            label: 'name',
                            searchable: true,
                            noneSelectedText: 'Select the examining Team'
                        },        
                        values: () => {
                        return this.teamsOpt2
                        },   
                        visible: (model, field, form) => {
                          return this.visibleApt2            
                        },                               
                    },                             
          
                ],
            },


          ]
      },
      

    }
  },
  methods: {
    showmodal () {
      this.$modals.simpleModal.$show()
    },

    handleFileChange (e) {
      this.$emit('input', e.target.files[0])
      this.fileName1 = e.target.files[0].name
      console.log(e.target.files[0].name)

    },
    onComplete () {
      alert(JSON.stringify(this.model))
      // this.$router.push("/admin/director-details");
    },
    onModelUpdated (newVal, schema) {
      console.log(newVal)
      //test
      if (schema === 'apt') {
          if (newVal === '1'){
            this.visibleApt1 = true
            this.visibleApt2 = false
          }else {
            this.visibleApt2 = true
            this.visibleApt1 = false
          }
      }
    },

  },
}
</script>
<!-- New step!
     Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
  .app-layout__main {
    background: #e8e8e8;
  }
</style>

