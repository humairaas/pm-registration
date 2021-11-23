<template>
  <div class="content">
    <div class="container-fluid">

      <div class="row">
        <div class="col-12">

          <!-- Form -->
          <va-card>
            <br>
            <b-tabs content-class="mt-3">
              <b-tab title="Risk Factors" active>
                <vue-form-generator :model="model" :schema="tabASchema" :options="formOptions" ref="riskFactors" @model-updated="onModelUpdated">
                </vue-form-generator>
              </b-tab>
              <b-tab title="Protective Factors">
                <vue-form-generator :model="model" :schema="tabBSchema" :options="formOptions" ref="protectiveFactors" @model-updated="onModelUpdated" >
                </vue-form-generator>
              </b-tab>
              <b-tab title="Tab C">
                <p>I'm the first tab</p>
              </b-tab>
              <b-tab title="Tab D">
                <p>I'm the second tab</p>
              </b-tab>
              <b-tab title="Hospital Management">
                <vue-form-generator :model="model" :schema="tabESchema" :options="formOptions" ref="hospitalManagement" @model-updated="onModelUpdated">
                </vue-form-generator>
              </b-tab>
              <b-tab title="Source Data Producer">
                <vue-form-generator :model="model" :schema="tabFSchema" :options="formOptions" ref="sourceDataProducer" @model-updated="onModelUpdated">
                </vue-form-generator>
              </b-tab>
            </b-tabs>
          </va-card>

          <!-- Modal -->
          <va-modal
            v-model="showLargeModal"
            size="large"
            :okText=" $t('Confirm') "
            :cancelText=" $t('Close') "
            :hide-default-actions= "true"
          >
            <div class="modal-preview">
              <h5 class="tab-title">1. Risk Factors</h5>
              <vue-form-generator class="read-only" :model="model" :schema="tabAModalSchema"></vue-form-generator>
              <h5 class="tab-title">2. Protective Factors</h5>
              <vue-form-generator class="sosio-margin read-only" :model="model" :schema="tabBSchema"></vue-form-generator>
              <h5 class="tab-title">3. The Self-Harm Act and Suicidal Intent</h5>
              <vue-form-generator class="read-only" :model="model" :schema="tabCSchema"></vue-form-generator>
              <h5 class="tab-title">4. Suicide Risk</h5>
              <vue-form-generator class="read-only" :model="model" :schema="tabDModalSchema"></vue-form-generator>
              <h5 class="tab-title">5. Hospital Management</h5>
              <vue-form-generator class="read-only" :model="model" :schema="tabEModalSchema"></vue-form-generator>
              <h5 class="tab-title">6. Source Data Producer</h5>
              <vue-form-generator class="read-only" :model="model" :schema="tabFModalSchema"></vue-form-generator>
              <div style="float: right;">
                <button @click="showLargeModal = false" type="button" class="ml-2 btn btn-secondary btn-fill btn-md">
                  Close
                </button>
              </div>
            </div>
          </va-modal>
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
  name: 'modals',
  components: {
  },
  data () {
    return {
      tabA: false,
      tabB: false,
      tabC: false,
      tabD: false,
      tabE: false,
      tabF: false,

      show: true,
      showLargeModal: false,

      submitPath: false,

      // Risk Factors Data
      selectDiagnosis: [
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
      ],

      selectSubstance: [
        { name: 'Alcohol', value: 0 },
        { name: 'Opioids', value: 1 },
        { name: 'Cannabinoids', value: 2 },
        { name: 'Sedatives or hypnotics', value: 3 },
        { name: 'Cocaine', value: 4 },
        { name: 'Other stimulants (including amphetamine-type)', value: 5 },
        { name: 'Hallucinogens', value: 6 },
        { name: 'Volatile solvents', value: 7 },
      ],

      selectStressfulLifeEvents: [
        { name: 'Intimate relationship problems', value: 0 },
        { name: 'Other relationship problems', value: 1 },
        { name: 'Death of loved one', value: 2 },
        { name: 'Job-related problems', value: 3 },
        { name: 'Financial problems', value: 4 },
        { name: 'Academic-related problems', value: 5 },
        { name: 'Criminals/Legal problems', value: 6 },
      ],

      // Protective Factors Data

      // The Self-harm Act and Suicidal Intent Data

      // Suicide Risk Data

      // Hospital Management Data

      // Source Data Producer Data

      model: {

        // Risk Factors
        Q1: '',
        Q1_ICD: '',
        Q1_SPECIFY: '',
        Q2: '',
        Q3: '',
        Q3_SPECIFY: '',
        Q4: '',
        Q4_SPECIFY: '',
        Q5: '',
        Q6: '',
        Q6_ICD: '',
        Q6_SPECIFY: '',
        Q7: '',
        Q7_SPECIFY: '',
        Q8: '',
        Q8_SPECIFY: '',
        Q9: '',
        Q10: '',
        Q10_SPECIFY: '',
        Q11: '',
        Q12: '',

        // Protective Factors

        // The Self-harm Act and Suicidal Intent

        // Suicide Risk

        // Hospital Management

        // Source Data Producer

      },

      // Risk Factors
      tabASchema: {
        groups: [
          {
            styleClasses: ['row', 'odd-row'],
            fields: [
              {
                type: 'radios',
                label: "<ol start = '1'><li class='label-width'>Presence of psychiatric disorder</li></ol>",
                model: 'Q1',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: ['col-md-7', 'odd-row', 'mb-0'],
                disabled: () => {
                  return this.disable
                },
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Select diagnosis (can select more than 1)',
                model: 'Q1_SPECIFY',
                required: true,
                validator: 'required',
                values: [
                  'one',
                  'two',
                  'three',
                  'four',
                  'five',
                  'six',
                  'seven',
                  'eight',
                ],
                selectOptions: {
                  multiple: true,
                  closeOnSelect: false,
                  searchable: true,
                  showLabels: false,
                  clearOnSelect: true,
                  limit: 3,
                  maxHeight: 200,
                },
                styleClasses: ['col-md-5', 'mb-0'],
                visible: function (model) {
                  return model && model.Q1 === 1
                },
                disabled: () => {
                  return this.disable
                },
              },
            ],
          },
          {
            styleClasses: ['row', 'even-row'],
            fields: [
              {
                type: 'radios',
                label: "<ol start = '2'><li class='label-width'>Hopelessness or despair</li></ol>",
                model: 'Q2',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: ['col-md-7', 'even-row', 'mb-0'],
                disabled: () => {
                  return this.disable
                },
              },
            ],
          },
          {
            styleClasses: ['row', 'odd-row'],
            fields: [
              {
                type: 'radios',
                label: "<ol start = '3'><li class='label-width'> Previous suicide attempt</li></ol>",
                model: 'Q3',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: ['col-md-7', 'odd-row', 'mb-0'],
                disabled: () => {
                  return this.disable
                },
              },
              {
                type: 'input',
                inputType: 'number',
                placeholder: 'Please specify (times)',
                model: 'Q3_SPECIFY',
                min: 0,
                required: true,
                validator: 'number',
                styleClasses: ['col-md-5', 'mb-0'],
                visible: function (model) {
                  return model && model.Q3 === 1
                },
                disabled: () => {
                  return this.disable
                },
              },
            ],
          },
          {
            styleClasses: ['row', 'even-row'],
            fields: [
              {
                type: 'radios',
                label: "<ol start = '4'><li class='label-width'>Presence of substance use/abuse</li></ol>",
                model: 'Q4',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: ['col-md-7', 'even-row', 'mb-0'],
                disabled: () => {
                  return this.disable
                },
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Please specify',
                model: 'Q4_SPECIFY',
                required: true,
                validator: 'required',
                values: [
                  { name: 'Alcohol', value: 0 },
                  { name: 'Opioids', value: 1 },
                  { name: 'Cannabinoids', value: 2 },
                  { name: 'Sedatives or hypnotics', value: 3 },
                  { name: 'Cocaine', value: 4 },
                  { name: 'Other stimulants (including amphetamine-type)', value: 5 },
                  { name: 'Hallucinogens', value: 6 },
                  { name: 'Volatile solvents', value: 7 },
                ],
                selectOptions: {
                  multiple: false,
                  closeOnSelect: true,
                  maxHeight: 200,
                  showLabels: false,
                  key: 'value',
                  label: 'name',
                },
                styleClasses: ['col-md-5', 'mb-0'],
                visible: function (model) {
                  return model && model.Q4 === 1
                },
                disabled: () => {
                  return this.disable
                },
              },
            ],
          },
          {
            styleClasses: ['row', 'odd-row'],
            fields: [
              {
                type: 'radios',
                label: "<ol start = '5'><li class='label-width'>Family history of suicidal behaviour</li></ol>",
                model: 'Q5',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: ['col-md-7', 'odd-row', 'mb-0'],
                disabled: () => {
                  return this.disable
                },
              },
            ],
          },
          {
            styleClasses: ['row', 'even-row'],
            fields: [
              {
                type: 'radios',
                label: "<ol start = '6'><li class='label-width'>Family history of psychiatric disorder</li></ol>",
                model: 'Q6',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: ['col-md-7', 'even-row', 'mb-0'],
                disabled: () => {
                  return this.disable
                },
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Select diagnosis (can select more than 1)',
                model: 'Q6_SPECIFY',
                required: true,
                validator: 'required',
                values: [
                  'one',
                  'two',
                  'three',
                  'four',
                  'five',
                  'six',
                  'seven',
                  'eight',
                ],
                selectOptions: {
                  multiple: true,
                  searchable: true,
                  showLabels: false,
                  clearOnSelect: true,
                  closeOnSelect: false,
                  limit: 3,
                  maxHeight: 200,
                },
                styleClasses: ['col-md-5', 'mb-0'],
                visible: function (model) {
                  return model && model.Q6 === 1
                },
                disabled: () => {
                  return this.disable
                },
              },
            ],
          },
          {
            styleClasses: ['row', 'odd-row'],
            fields: [
              {
                type: 'radios',
                label: "<ol start = '7'><li class='label-width'>Family histroy of substance abuse</li></ol>",
                model: 'Q7',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: ['col-md-7', 'odd-row', 'mb-0'],
                disabled: () => {
                  return this.disable
                },
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Please specify',
                model: 'Q7_SPECIFY',
                required: true,
                validator: 'required',
                values: [
                  { name: 'Alcohol', value: 0 },
                  { name: 'Opioids', value: 1 },
                  { name: 'Cannabinoids', value: 2 },
                  { name: 'Sedatives or hypnotics', value: 3 },
                  { name: 'Cocaine', value: 4 },
                  { name: 'Other stimulants (including amphetamine-type)', value: 5 },
                  { name: 'Hallucinogens', value: 6 },
                  { name: 'Volatile solvents', value: 7 },
                ],
                selectOptions: {
                  multiple: false,
                  closeOnSelect: true,
                  maxHeight: 200,
                  showLabels: false,
                  label: 'name',
                  key: 'value',
                },
                styleClasses: ['col-md-5', 'mb-0'],
                visible: function (model) {
                  return model && model.Q7 === 1
                },
                disabled: () => {
                  return this.disable
                },
              },
            ],
          },
          {
            styleClasses: ['row', 'even-row'],
            fields: [
              {
                type: 'radios',
                label: "<ol start = '8'><li class='label-width'>Stressful life events</li></ol>",
                model: 'Q8',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: ['col-md-7', 'even-row', 'mb-0'],
                disabled: () => {
                  return this.disable
                },
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Please specify',
                model: 'Q8_SPECIFY',
                required: true,
                validator: 'required',
                values: [
                  { name: 'Intimate relationship problems', value: 0 },
                  { name: 'Other relationship problems', value: 1 },
                  { name: 'Death of loved one', value: 2 },
                  { name: 'Job-related problems', value: 3 },
                  { name: 'Financial problems', value: 4 },
                  { name: 'Academic-related problems', value: 5 },
                  { name: 'Criminals/Legal problems', value: 6 },
                ],
                selectOptions: {
                  multiple: false,
                  closeOnSelect: true,
                  maxHeight: 200,
                  showLabels: false,
                  label: 'name',
                  key: 'value',
                },
                styleClasses: ['col-md-5', 'mb-0'],
                visible: function (model) {
                  return model && model.Q8 === 1
                },
                disabled: () => {
                  return this.disable
                },
              },
            ],
          },
          {
            styleClasses: ['row', 'odd-row'],
            fields: [
              {
                type: 'radios',
                label: "<ol start = '9'><li class='label-width'>Isolation, rejection, or feelings of shame</li></ol>",
                model: 'Q9',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: ['col-md-7', 'odd-row', 'mb-0'],
                disabled: () => {
                  return this.disable
                },
              },
            ],
          },
          {
            styleClasses: ['row', 'even-row'],
            fields: [
              {
                type: 'radios',
                label: "<ol start = '10'><li class='label-width'>Chronic physical illness or condition</li></ol>",
                model: 'Q10',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: ['col-md-7', 'even-row', 'mb-0'],
                disabled: () => {
                  return this.disable
                },
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Please specify (can choose more than 1)',
                model: 'Q10_SPECIFY',
                required: true,
                validator: 'required',
                values: [
                  'one',
                  'two',
                  'three',
                  'four',
                  'five',
                  'six',
                  'seven',
                  'eight',
                ],
                selectOptions: {
                  multiple: true,
                  searchable: true,
                  showLabels: false,
                  closeOnSelect: false,
                  limit: 3,
                  maxHeight: 200,
                },
                styleClasses: ['col-md-5', 'mb-0'],
                visible: function (model) {
                  return model && model.Q10 === 1
                },
                disabled: () => {
                  return this.disable
                },
              },
            ],
          },
          {
            styleClasses: ['row', 'odd-row'],
            fields: [
              {
                type: 'radios',
                label: "<ol start = '11'><li class='label-width'>History of physical, sexual or emotional abuse</li></ol>",
                model: 'Q11',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: ['col-md-7', 'odd-row', 'mb-0'],
                disabled: () => {
                  return this.disable
                },
              },
            ],
          },
          {
            styleClasses: ['row', 'even-row'],
            fields: [
              {
                type: 'radios',
                label: "<ol start = '12'><li class='label-width'>Access to lethal methods/weapons</li></ol>",
                model: 'Q12',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: ['col-md-7', 'even-row', 'mb-0'],
                disabled: () => {
                  return this.disable
                },
              },
            ],
          },
          {
            styleClasses: 'groupBtn',
            fields: [
              {
                type: 'submit',
                onSubmit: () => {
                  this.redirectToNext()
                },
                label: '',
                buttonText: 'Next',
                validateBeforeSubmit: true,
                visible: () => {
                  return this.showButton
                },
              },
            ],
          },
        ],
      },
      // Protective Factors
      tabBSchema: {
        fields: [

        ],
      },

      // The Self-harm Act and Suicidal Intent
      tabCSchema: {
        fields: [

        ],
      },

      // Suicide Risk
      tabDSchema: {
        fields: [

        ],
      },

      // Hospital Management
      tabESchema: {
        fields: [

        ],
      },

      // Source Data Producer
      tabFSchema: {
        fields: [

        ],
      },

      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
      },
    }
  },
  mounted () {
    window.onbeforeunload = function () {
      return 'Data will be lost if you leave the page, are you sure?'
    }
  },
  methods: {
    validateForm () {
      var tabA = this.validateTabA()
      var tabB = this.validateTabB()
      var tabC = this.validateTabC()
      var tabD = this.validateTabD()
      var tabE = this.validateTabE()
      var tabF = this.validateTabF()

      if (tabA && tabB && tabC && tabD && tabE && tabF) {
        this.launchToast()
        this.submitPath = true
        this.$router.push({ path: 'patient_consultation' })
      }
    },
    validateTabA () {
      var errors = this.$refs.riskFactors.validate()
      if (errors) {
        this.tabA = false
        return true
      } else {
        this.tabA = true
        return false
      }
    },
    validateTabB () {
      var errors = this.$refs.protectiveFactors.validate()
      if (errors) {
        this.tabB = false
        return true
      } else {
        this.tabB = true
        return false
      }
    },
    validateTabC () {
      var errors = this.$refs.theSelfHarmActAndSuicidalIntent.validate()
      if (errors) {
        this.tabC = false
        return true
      } else {
        this.tabC = true
        return false
      }
    },
    validateTabD () {
      var errors = this.$refs.suicideRisk.validate()
      if (errors) {
        this.tabD = false
        return true
      } else {
        this.tabD = true
        return false
      }
    },
    validateTabE () {
      var errors = this.$refs.hospitalManagement.validate()
      if (errors) {
        this.tabE = false
        return true
      } else {
        this.tabE = true
        return false
      }
    },
    validateTabF () {
      var errors = this.$refs.sourceDataProducer.validate()
      if (errors) {
        this.tabF = false
        return true
      } else {
        this.tabF = true
        return false
      }
    },
    hideNoti (tab) {
      if (tab === 'tabA') {
        this.tabA = false
      }
      if (tab === 'tabB') {
        this.tabB = false
      }
      if (tab === 'tabC') {
        this.tabC = false
      }
      if (tab === 'tabD') {
        this.tabD = false
      }
      if (tab === 'tabE') {
        this.tabE = false
      }
      if (tab === 'tabF') {
        this.tabF = false
      }
    },
    launchToast () {
      this.showToast(
        this.model.DM_NAME + ' Registration Successful !',
        {
          icon: 'fa-check',
          position: 'top-center',
          duration: 2500,
          fullWidth: false,
        },
      )
    },
  },
  beforeRouteLeave (to, from, next) {
    if (this.submitPath === true) {
      next(true)
    } else {
      const answer = window.confirm('Changes you made may not be saved.')
      if (answer) {
        next(true)
      } else {
        next(false)
      }
    }
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

  .modal-preview {
    padding: 10px;
  }

  .tab-title {
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 10px;
    background-color: #f2a444;
    border-radius: 10px;
    color: white;
  }

  .sosio-margin {
    margin-left: 20px;
  }

  .read-only {
    pointer-events: none;
  }

  .close-button {
    color: rgb(227, 75, 74);
    position: absolute;
    right: 0;
    width: 70px;
  }

  .close-button:hover {
    color: black;
  }

  .close-button:focus {
    box-shadow: none !important;
  }
</style>
