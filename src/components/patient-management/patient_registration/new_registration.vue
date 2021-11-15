<template>
  <div class="content">
    <div class="container-fluid">

      <div class="row">
        <div class="col-12">
          <va-card>
            <form-wizard  @on-complete="onComplete" color="orange" error-color="#a94442" finish-button-text="Submit" ref="wizard">
              <h3 slot="title" ></h3>

              <!-- 1st tab: Demographic-->
              <tab-content icon="fa fa-user-circle-o" title="1. Demographic" :before-change="validateSecondTab">
                <vue-form-generator :model="model" :schema="tabASchema" :options="formOptions" ref="demographic" @model-updated="onModelUpdated">
                </vue-form-generator>
              </tab-content>

              <!-- 2nd tab: Socio Demographic-->
              <tab-content icon="fa fa-vcard" title="2. Socio Demographic" :before-change="validateThirdTab">
                <vue-form-generator :model="model" :schema="tabBSchema" :options="formOptions" ref="sosioDemographic" @model-updated="onModelUpdated" >
                </vue-form-generator>
              </tab-content>

              <!-- 3rd tab: Next of Kin-->
              <tab-content icon="fa fa-group" title="3. Next of Kin" :before-change="validateFourthTab">
                <vue-form-generator :model="model" :schema="tabCSchema" :options="formOptions" ref="nextOfKin" @model-updated="onModelUpdated" >
                </vue-form-generator>
                <div>
                  <multiselect v-model="value" :options="options"></multiselect>
                </div>
              </tab-content>

              <!-- 4th tab: Allergy-->
              <tab-content icon="fa fa-info" title="4. Allergy" :before-change="validateFourthTab">
                <vue-form-generator :model="model" :schema="tabDSchema" :options="formOptions" ref="allergy" @model-updated="onModelUpdated" >
                </vue-form-generator>
                <div>
                  <multiselect v-model="value" :options="options"></multiselect>
                </div>
              </tab-content>

              <!-- Button footer-->
              <template slot="footer" slot-scope="{
                activeTabIndex,
                isLastStep,
                nextTab,
                prevTab
              }">
                <div class="float-left">
                  <button v-if="activeTabIndex > 0" @click="prevTab" type="button" class="btn btn-primary btn-fill btn-md">
                    <i class="fa fa-step-backward" /> &nbsp; Previous
                  </button>
                </div>
                <div class="float-right">

                  <button @click="nextTab" type="button" class="btn btn-info btn-fill btn-md">
                    <i class="fa fa-edit" /> &nbsp;Save
                  </button>

                  <button v-if="isLastStep" @click="showmodal" type="button" class="ml-2 btn btn-warning btn-fill btn-md">
                    <i class="fa fa-play-circle" /> &nbsp;View
                  </button>
                  <button v-if="isLastStep" @click="nextTab" type="button" class="ml-2 btn btn-primary btn-fill btn-md">
                    Submit
                  </button>
                </div>
              </template>
            </form-wizard>
          </va-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg-core.css'
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import * as servicesModule1 from '../../../app/module1/services01'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-select/dist/vue-select.css'

import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
Vue.use(VueFormWizard)

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueFormGenerator)
Vue.component('multiselect', Multiselect)

// cleave.js
require('cleave.js')
require('cleave.js/dist/addons/cleave-phone.my')

// register globally
export default {
  components: {
  },
  data () {
    return {
      model: {
        // Demographic
        SALUTATION: '',
        DM_NAME: '',
        CITIZENSHIP: '',
        NRIC_TYPE: '',
        NRIC_NO: '',
        GENDER: '',
        BIRTH_DATE: '',
        AGE: '',
        DM_MOBILE_NO: '',
        DM_HOUSE_NO: '',
        SERVICE_TYPE: '',
        DM_ADDRESS_LINE_1: '',
        DM_ADDRESS_LINE_2: '',
        DM_ADDRESS_LINE_3: '',
        DM_POSTCODE: '',
        DM_CITY: '',
        DM_STATE: '',
        EXISTING_PATIENT: '',

        // Sosio Demographic

        // Next Of Kin

        // Allergy

      },
      // Demographic
      tabASchema: {
        fields: [
          {
            type: 'vueMultiSelect',
            placeholder: 'Please select',
            label: 'Salutation',
            model: 'SALUTATION',
            required: true,
            validator: 'required',
            selectOptions: {
              multiple: false,
              closeOnSelect: true,
              maxHeight: 100,
              showLabels: false,
              key: 'value',
              label: 'name',
            },
            styleClasses: ['col-12 col-md-4'],
            values: [
              { name: 'MR.', value: 1 },
              { name: 'MRS.', value: 2 },
            ],
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Name (as in NRIC)',
            model: 'DM_NAME',
            validator: 'string',
            required: true,
            styleClasses: ['col-12 col-md-8'],
          },
          {
            type: 'radios',
            label: 'Citizenship',
            model: 'CITIZENSHIP',
            values: [
              { value: 1, name: 'Malaysian' },
              { value: 2, name: 'Permanent Resident' },
              { value: 3, name: 'Foreigner' },
            ],
            validator: 'required',
            // styleClasses : "col-md-7",
          },
          {
            type: 'vueMultiSelect',
            placeholder: 'Please select',
            label: 'NRIC Type',
            model: 'NRIC_TYPE',
            required: true,
            validator: 'required',
            selectOptions: {
              multiple: false,
              closeOnSelect: true,
              maxHeight: 200,
              showLabels: false,
              key: 'value',
              label: 'name',
            },
            // styleClasses: ["col-12 col-md-6"],
            values: [
              { name: 'Old IC', value: 1 },
              { name: 'New IC', value: 2 },
              { name: 'Army', value: 3 },
              { name: 'Police', value: 4 },
              { name: "Mother's IC", value: 5 },
              { name: "Father's IC", value: 6 },
              { name: 'Work Permit', value: 7 },
              { name: 'Passport', value: 8 },
              { name: 'Birth Certificate', value: 9 },
              { name: 'Pension Card', value: 10 },
              { name: 'Others (Please Specify)', value: 11 },
            ],
          },
          {
            type: 'cleave',
            label: 'NRIC NO',
            model: 'NRIC_NO',
            cleaveOptions: {
              blocks: [6, 2, 4],
              delimiter: '-',
              numericOnly: true,
            },
            placeholder: 'XXXXXX-XX-XXXX',
          },
          {
            type: 'radios',
            label: 'Gender',
            model: 'GENDER',
            values: [
              { value: 1, name: 'Male' },
              { value: 2, name: 'Female' },
            ],
            validator: 'required',
            // styleClasses : "col-md-7",
          },
          {
            type: 'input',
            inputType: 'date',
            label: 'Date of Birth',
            model: 'BIRTH_DATE',
            placeholder: 'Enter Date',
            required: true,
            formatted: 'DD/MM/YYYY',
            // styleClasses: 'col-md-5',
          },
          {
            type: 'input',
            inputType: 'number',
            label: 'Age',
            model: 'AGE',
            validator: 'number',
            styleClasses: 'col-md-7',
            required: true,
          },
          {
            type: 'cleave',
            label: 'Mobile Phone Number',
            model: 'DM_MOBILE_NO',
            cleaveOptions: {
              phone: true,
              phoneRegionCode: 'MY',
            },
            required: true,
            validator: 'required',
            // styleClasses: "col-md-6"
          },
          {
            type: 'cleave',
            label: 'House Phone Number',
            model: 'DM_HOUSE_NO',
            cleaveOptions: {
              phone: true,
              phoneRegionCode: 'MY',
            },
            required: true,
            validator: 'required',
            // styleClasses: "col-md-6"
          },
          {
            type: 'vueMultiSelect',
            placeholder: 'Please select',
            label: 'Type of Services',
            model: 'SERVICE_TYPE',
            required: true,
            validator: 'required',
            selectOptions: {
              multiple: false,
              closeOnSelect: true,
              maxHeight: 200,
              showLabels: false,
              key: 'value',
              label: 'name',
            },
            // styleClasses: ["col-12 col-md-6"],
            values: [
              { name: 'Consultation', value: 1 },
              { name: 'Rehabilitation', value: 2 },
              { name: 'Community Psychiatric Service (CPS)', value: 3 },
            ],
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Address',
            model: 'DM_ADDRESS_LINE_1',
            placeholder: 'Address line 1',
            validator: 'string',
          },
          {
            type: 'input',
            inputType: 'text',
            model: 'DM_ADDRESS_LINE_2',
            placeholder: 'Address line 2',
            validator: 'string',
          },
          {
            type: 'input',
            inputType: 'text',
            model: 'DM_ADDRESS_LINE_3',
            placeholder: 'Address line 3',
            validator: 'string',
          },
          {
            type: 'vueMultiSelect',
            placeholder: 'Please select',
            label: 'State',
            model: 'DM_STATE',
            required: true,
            validator: 'required',
            selectOptions: {
              multiple: false,
              closeOnSelect: true,
              maxHeight: 200,
              showLabels: false,
              key: 'value',
              label: 'name',
            },
            // styleClasses: ["col-12 col-md-6"],
            values: [
              { name: 'Selangor', value: 1 },
              { name: 'Kuala Lumpur', value: 2 },
              { name: 'Perak', value: 3 },
            ],
          },
          {
            type: 'vueMultiSelect',
            placeholder: 'Please select',
            label: 'City',
            model: 'DM_CITY',
            required: true,
            validator: 'required',
            selectOptions: {
              multiple: false,
              closeOnSelect: true,
              maxHeight: 200,
              showLabels: false,
              key: 'value',
              label: 'name',
            },
            // styleClasses: ["col-12 col-md-6"],
            values: [
              { name: 'Klang', value: 1 },
              { name: 'Batu Caves', value: 2 },
              { name: 'Subang Jaya', value: 3 },
            ],
          },
          {
            type: 'vueMultiSelect',
            placeholder: 'Please select',
            label: 'Postcode',
            model: 'DM_POSTCODE',
            required: true,
            validator: 'required',
            selectOptions: {
              multiple: false,
              closeOnSelect: true,
              maxHeight: 200,
              showLabels: false,
              key: 'value',
              label: 'name',
            },
            // styleClasses: ["col-12 col-md-6"],
            values: [
              { name: '68100', value: 1 },
              { name: '59200', value: 2 },
              { name: '63000', value: 3 },
            ],
          },
        ],
      },
      // Sosio Demographic
      tabBSchema: {

      },
      // Next Of Kin
      tabCSchema: {

      },
      // Allergy
      tabDSchema: {

      },
      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
        validateAsync: false,
      },
    }
  },
  methods: {

  },
}
</script>
<!-- New step!
     Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
  .app_layout__main {
    background: #686868;
  }

  .display-inline label {
    display: inline !important;
    align-content: center;
    margin-right: 10px;
  }

  .jarakkan-citizenship label {
    margin-right: 230px;
  }

  .jarakkan-gender label {
    margin-right: 270px;
  }

  ul.va-unordered > li::before,
  .content ul > li::before {
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 0;
    margin-top: 0.5rem;
    background-color: #2c82e000;
  }

  .dropdown {
    box-sizing: border-box;
  }

  .center {
    margin-left: 200px;
  }

  .line + .line {
    border-top: 1px solid rgb(189, 184, 184);
    margin-top: 1rem;
    margin-bottom: 5rem;
  }

</style>
