<template>
  <div class="content">
    <div class="container-fluid">

      <div class="row">
        <div class="col-12">

          <!-- Notification Alert -->
          <div class="mb-3" v-if="tabA==true">
            <va-notification color="danger">
              <va-badge color="danger">
                {{ $t('Incomplete') }}
              </va-badge>
              <span>Please fill all <b> Demographic </b> required fields.</span>
              <button type="button" class="btn close-button" @click="tabA = false">
                <span class="fa fa-close"/>
              </button>
            </va-notification>
          </div>

          <!-- Form -->
          <va-card>
            <form-wizard color="#bf1304" error-color="#a94442" ref="wizard">
              <h3 slot="title"></h3>

              <!-- 1st tab: Demographic-->
              <tab-content icon="fa fa-user-circle-o" title="1. Demographic">
                <vue-form-generator :model="model" :schema="schema" :options="formOptions" ref="demographic" @model-updated="onModelUpdated">
                </vue-form-generator>
              </tab-content>

              <!-- Button footer-->
              <template slot="footer" slot-scope="{
              }">
                <div class="float-right">
                  <button v-if="update==false" @click="validateForm" type="submit" class="ml-2 btn btn-primary btn-fill btn-md">
                    <div class="fa fa-paper-plane" /> &nbsp;SUBMIT
                  </button>
                  <button v-if="update==true" @click="validateUpdateForm" type="submit" class="ml-2 btn btn-primary btn-fill btn-md">
                    <div class="fa fa-paper-plane" /> &nbsp;UPDATE
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
  name: 'modals',
  components: {
  },
  data () {
    return {
      tabA: false,
      submitPath: false,
      update: false,

      // Demographic  Data
      radioCitizenship: [],
      selectNRICType: [],
      selectIssuingCountry: [],
      selectEmpStatus: [],
      radioGender: [],

      // Socio Demographic Data
      selectRace: [],
      selectIncomeStatus: [],
      selectReligion: [],
      selectMaritalStatus: [],
      selectEducationLevel: [],

      // Form Model
      model: {
        SH_NAME: '',
        CITIZENSHIP: '',
        NRIC_TYPE: '',
        NRIC_NO: '',
        PASSPORT_NO: '',
        PASSPORT_EXPIRY_DATE: '',
        ISSUING_COUNTRY: '',
        GENDER: '',
        BIRTH_DATE: '',
        AGE: '',
        HOSPITAL_MRN: '',
        MENTARI_MRN: '',
        EMPLOYMENT_STATUS: '',
        INCOME_STATUS: '',
        RACE: '',
        SPECIFY_RACE: '',
        RELIGION: '',
        SPECIFY_RELIGION: '',
        MARITAL_STATUS: '',
        SPECIFY_MARITAL_STATUS: '',
        EDUCATION_LEVEL: '',
        EDUCATION_LEVEL_SPECIFY: '',
      },

      // Demographic
      schema: {
        groups: [
          {
            fields: [
              {
                type: 'input',
                inputType: 'text',
                label: 'Name (as in NRIC)',
                model: 'SH_NAME',
                validator: 'string',
                required: true,
                styleClasses: 'col-lg-8',
              },
            ],
          },
          {
            fields: [
              {
                type: 'radios',
                label: 'Citizenship',
                model: 'CITIZENSHIP',
                required: true,
                validator: 'required',
                styleClasses: 'col-lg-12',
                values: () => {
                  return this.radioCitizenship
                },
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
                  allowEmpty: false,
                  key: 'value',
                  label: 'name',
                },
                styleClasses: 'col-lg-4',
                values: () => {
                  return this.selectNRICType
                },
                visible: function (model) {
                  return model && model.CITIZENSHIP === 1
                },
              },
              {
                type: 'cleave',
                label: 'NRIC NO',
                model: 'NRIC_NO',
                required: true,
                cleaveOptions: {
                  blocks: [6, 2, 4],
                  delimiter: '-',
                  numericOnly: true,
                },
                placeholder: 'XXXXXX-XX-XXXX',
                styleClasses: 'col-lg-4',
                visible: function (model) {
                  return model && model.NRIC_TYPE.value === 2 && model.CITIZENSHIP === 1
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'NRIC NO',
                model: 'NRIC_NO',
                validator: 'string',
                required: true,
                styleClasses: 'col-lg-4',
                visible: function (model) {
                  return model && (model.CITIZENSHIP === 1 || model.CITIZENSHIP === 2) && (model.NRIC_TYPE.value !== 2)
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Passport NO',
                model: 'PASSPORT_NO',
                validator: 'string',
                required: true,
                styleClasses: 'col-lg-4',
                visible: function (model) {
                  return model && model.CITIZENSHIP === 3
                },
              },
              {
                type: 'input',
                inputType: 'date',
                label: 'Expiry Date',
                model: 'PASSPORT_EXPIRY_DATE',
                placeholder: 'Enter Date',
                required: true,
                format: 'YYYY/MM/DD',
                min: 1,
                styleClasses: 'col-lg-4',
                visible: function (model) {
                  return model && model.CITIZENSHIP === 3
                },
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Please select',
                label: 'Issuing Country',
                model: 'ISSUING_COUNTRY',
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
                styleClasses: 'col-lg-4',
                values: () => {
                  return this.selectIssuingCountry
                },
                visible: function (model) {
                  return model && model.CITIZENSHIP === 3
                },
              },
              {
                type: 'radios',
                label: 'Gender',
                model: 'GENDER',
                required: true,
                validator: 'required',
                styleClasses: 'col-lg-12',
                values: () => {
                  return this.radioGender
                },
              },
            ],
          },
          {
            fields: [
              {
                type: 'input',
                inputType: 'date',
                label: 'Date of Birth',
                model: 'BIRTH_DATE',
                placeholder: 'Enter Date',
                required: true,
                format: 'YYYY/MM/DD',
                styleClasses: 'col-lg-4',
                onChanged: function (model, newVal, oldVal, field) {
                  model.AGE = new Date().getFullYear() - model.BIRTH_DATE.toString().substring(0, 4)
                },
              },
              {
                type: 'input',
                inputType: 'number',
                label: 'Age',
                model: 'AGE',
                min: 0,
                validator: 'number',
                styleClasses: 'col-lg-4',
              },
            ],
          },
          {
            fields: [
              {
                type: 'input',
                inputType: 'text',
                label: "Hospital's MRN Number",
                model: 'HOSPITAL_MRN',
                validator: 'string',
                required: true,
                styleClasses: 'col-lg-4',
              },
              {
                type: 'input',
                inputType: 'text',
                label: "Mentari's MRN Number",
                model: 'MENTARI_MRN',
                validator: 'string',
                required: true,
                styleClasses: 'col-lg-4',
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                placeholder: 'Please select',
                label: 'Employment Status',
                model: 'EMPLOYMENT_STATUS',
                required: true,
                validator: 'required',
                selectOptions: {
                  multiple: false,
                  closeOnSelect: true,
                  maxHeight: 200,
                  showLabels: false,
                  allowEmpty: false,
                  key: 'value',
                  label: 'name',
                },
                styleClasses: 'col-lg-4 ml-3',
                values: () => {
                  return this.selectEmpStatus
                },
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                placeholder: 'Please select',
                label: 'Household Income Status (monthly)',
                model: 'INCOME_STATUS',
                required: true,
                validator: 'required',
                selectOptions: {
                  multiple: false,
                  closeOnSelect: true,
                  maxHeight: 200,
                  showLabels: false,
                  allowEmpty: false,
                  key: 'value',
                  label: 'name',
                },
                styleClasses: 'col-lg-4 ml-3',
                values: () => {
                  return this.selectIncomeStatus
                },
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                placeholder: 'Please select',
                label: 'Race',
                model: 'RACE',
                required: true,
                validator: 'required',
                selectOptions: {
                  multiple: false,
                  closeOnSelect: true,
                  maxHeight: 200,
                  showLabels: false,
                  allowEmpty: false,
                  key: 'value',
                  label: 'name',
                },
                styleClasses: 'col-lg-4 ml-3',
                values: () => {
                  return this.selectRace
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'To Specify',
                model: 'SPECIFY_RACE',
                validator: 'string',
                required: true,
                styleClasses: 'col-lg-4',
                visible: function (model) {
                  return model && model.RACE.value === 99
                },
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                placeholder: 'Please select',
                label: 'Religion',
                model: 'RELIGION',
                required: true,
                validator: 'required',
                selectOptions: {
                  multiple: false,
                  closeOnSelect: true,
                  maxHeight: 200,
                  showLabels: false,
                  allowEmpty: false,
                  key: 'value',
                  label: 'name',
                },
                styleClasses: 'col-lg-4 ml-3',
                values: () => {
                  return this.selectReligion
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'To Specify',
                model: 'SPECIFY_RELIGION',
                validator: 'string',
                required: true,
                styleClasses: 'col-lg-4',
                visible: function (model) {
                  return model && model.RELIGION.value === 99
                },
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                placeholder: 'Please select',
                label: 'Marital Status',
                model: 'MARITAL_STATUS',
                required: true,
                validator: 'required',
                selectOptions: {
                  multiple: false,
                  closeOnSelect: true,
                  maxHeight: 200,
                  showLabels: false,
                  allowEmpty: false,
                  key: 'value',
                  label: 'name',
                },
                styleClasses: 'col-lg-4 ml-3',
                values: () => {
                  return this.selectMaritalStatus
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'To Specify',
                model: 'SPECIFY_MARITAL_STATUS',
                validator: 'string',
                required: true,
                styleClasses: 'col-lg-4',
                visible: function (model) {
                  return model && model.MARITAL_STATUS.value === 99
                },
              },

            ],

          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                placeholder: 'Please select',
                label: 'Education Level',
                model: 'EDUCATION_LEVEL',
                required: true,
                validator: 'required',
                selectOptions: {
                  multiple: false,
                  closeOnSelect: true,
                  maxHeight: 200,
                  showLabels: false,
                  allowEmpty: false,
                  key: 'value',
                  label: 'name',
                },
                styleClasses: 'col-lg-4 ml-3',
                values: () => {
                  return this.selectEducationLevel
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'To Specify',
                model: 'EDUCATION_LEVEL_SPECIFY',
                validator: 'string',
                required: true,
                styleClasses: 'col-lg-4',
                visible: function (model) {
                  return model && model.EDUCATION_LEVEL.value === 99
                },
              },

            ],
          },
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
    this.$axios
      .get('http://127.0.0.1:8000/api/getDemographicData')
      .then((response) => {
        this.radioCitizenship = response.data.citizenship
        this.radioGender = response.data.gender
        this.selectNRICType = response.data.NRICType
        this.selectIssuingCountry = response.data.issuingCountry
        this.selectEmpStatus = response.data.employmentStatus
        this.selectIncomeStatus = this.getHouseholdIncome(response.data.householdIncome)
        this.selectRace = response.data.race
        this.selectReligion = response.data.religion
        this.selectMaritalStatus = response.data.marital
        this.selectEducationLevel = response.data.education
      })

    if (this.$route.query.st === 'edit') {
      var patientId = JSON.parse(localStorage.getItem('ID'))
      this.update = true

      this.$axios
        .get('http://127.0.0.1:8000/api/getSHHARPDemographic?patientId=' + patientId)
        .then((response) => {
          this.model.SH_NAME = response.data.data[0].name
          this.model.CITIZENSHIP = response.data.data[0].citizenship_fk
          this.model.NRIC_TYPE = { value: response.data.data[0].nric_type_fk, name: response.data.data[0].nric_type }
          this.model.NRIC_NO = response.data.data[0].nric_no
          this.model.PASSPORT_NO = response.data.data[0].passport_no
          this.model.PASSPORT_EXPIRY_DATE = response.data.data[0].date_expiry
          this.model.ISSUING_COUNTRY = { value: response.data.data[0].issuing_country_fk, name: response.data.data[0].issuing_country }
          this.model.GENDER = response.data.data[0].gender_fk
          this.model.BIRTH_DATE = response.data.data[0].birthdate
          this.model.AGE = new Date().getFullYear() - response.data.data[0].birthdate.toString().substring(0, 4)
          this.model.HOSPITAL_MRN = response.data.data[0].hospital_mrn
          this.model.MENTARI_MRN = response.data.data[0].mentari_mrn
          this.model.EMPLOYMENT_STATUS = { value: response.data.data[0].employment_status_fk, name: response.data.data[0].employment_status }
          this.model.INCOME_STATUS = this.selectIncomeStatus[response.data.data[0].household_income_fk]
          this.model.RACE = { value: response.data.data[0].ethnic_fk, name: response.data.data[0].ethnic }
          this.model.RELIGION = { value: response.data.data[0].religion_fk, name: response.data.data[0].religion }
          this.model.MARITAL_STATUS = { value: response.data.data[0].marital_fk, name: response.data.data[0].marital }
          this.model.EDUCATION_LEVEL = { value: response.data.data[0].education_fk, name: response.data.data[0].education }
        })
    }
  },
  methods: {
    getHouseholdIncome (response) {
      const tempHousehold = []
      const n = response.length
      for (var i = 0; i < n; i++) {
        if (response[i].min === 0) {
          tempHousehold[i] = { value: response[i].value, name: 'Less than RM ' + (response[i].max + 1) }
        } else if (i === n - 1) {
          tempHousehold[i] = { value: response[i].value, name: 'RM ' + (response[i].min) + ' and above' }
        } else {
          tempHousehold[i] = { value: response[i].value, name: 'RM ' + response[i].min + ' - ' + 'RM ' + response[i].max }
        }
      }
      return tempHousehold
    },
    validateForm () {
      var tabA = this.validateTabA()

      if (tabA) {
        this.submitPath = true

        const data = new FormData()
        data.append('ptData', JSON.stringify(this.model))
        this.$axios
          .post('http://127.0.0.1:8000/api/registerDemoSHHARP', data)
          .then((response) => {
            // var ID = {
            //   patientId: response.data.patientId,
            //   shharpId: response.data.patientPassportId,
            // }
            localStorage.setItem('ID', response.data.patientId)
            this.$router.push({ path: 'SHHARP-profile' })
          })
        this.launchToast('Registration Successful')
      }
    },
    validateUpdateForm () {
      var tabA = this.validateTabA()

      if (tabA) {
        this.submitPath = true
        var patientId = JSON.parse(localStorage.getItem('ID'))

        const data = new FormData()
        data.append('ptData', JSON.stringify(this.model))
        this.$axios
          .post('http://127.0.0.1:8000/api/updateSHHARPDemographic?patientId=' + patientId, data)
          .then((response) => {
            // var ID = {
            //   patientId: response.data.patientId,
            //   shharpId: response.data.patientPassportId,
            // }
            localStorage.setItem('ID', response.data.patientId)
            this.$router.push({ path: 'SHHARP-profile' })
          })
        this.launchToast('Details Updated')
      }
    },
    validateTabA () {
      var errors = this.$refs.demographic.validate()
      if (errors) {
        this.tabA = false
        return true
      } else {
        this.tabA = true
        return false
      }
    },
    launchToast () {
      this.showToast(
        this.model.SH_NAME + ' Registration Successful !',
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
  .app-layout__main {
    background: hsl(0, 0%, 91%);
  }

  .display-inline {
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
