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
              <span>Please fill all required fields.</span>
              <button type="button" class="btn close-button" @click="tabA = false">
                <span class="fa fa-close"/>
              </button>
            </va-notification>
          </div>

          <!-- <div class="mb-3" v-if="!this.model.PATIENT_FK">
            <va-notification color="danger">
              <va-badge color="danger">
                {{ $t('Incomplete') }}
              </va-badge>
              <span>Patient with NRIC/PASSPORT ({{this.model.NRIC_PASSPORT_NO}}) does not exist.</span>
            </va-notification>
          </div> -->

          <va-card>

            <div class="text-center"><h4 class="mt-4 mb-5 text-dark">BOOK APPOINTMENT</h4></div>
            <vue-form-generator :model="model" :schema="schema" :options="formOptions" ref="appointment" @model-updated="onModelUpdated">
            </vue-form-generator>

            <!-- Button footer-->
            <div class="float-left">
              <button @click="navigateBack" type="button" class="btn btn-primary btn-fill btn-md">
                <div class="fa fa-step-backward" /> &nbsp; Cancel
              </button>
            </div>
            <div class="float-right">
              <button @click="validateForm" type="submit" class="ml-2 btn btn-primary btn-fill btn-md">
                <div class="fa fa-paper-plane" /> &nbsp; Confirm
              </button>
            </div>

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
import { BootstrapVue, IconsPlugin, TabsPlugin } from 'bootstrap-vue'
// import * as servicesModule1 from '../../../app/module1/services01'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-select/dist/vue-select.css'

import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
Vue.use(TabsPlugin)
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

export default {
  data () {
    return {
      tabA: false,
      submitPath: false,

      selectAppointmentType: [],
      selectVisitType: [],
      selectPatientCategory: [],
      selectAssignedTeam: [],

      model: {
        NRIC_PASSPORT_NO: '',
        DATE: '',
        TIME: '',
        DURATION: '',
        APPOINTMENT_TYPE: '',
        VISIT_TYPE: '',
        PATIENT_CATEGORY: '',
        ASSIGNED_TEAM: '',
        PATIENT_FK: '',
      },
      schema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'input',
                inputType: 'text',
                label: 'NRIC/PASSPORT NUMBER',
                model: 'NRIC_PASSPORT_NO',
                required: true,
                validator: 'string',
                hint: "Without ''-''",
                styleClasses: 'col-md-6',
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'input',
                inputType: 'date',
                label: 'Date',
                model: 'DATE',
                placeholder: 'Enter Date',
                required: true,
                validator: 'date',
                format: 'YYYY/MM/DD',
                styleClasses: 'col-md-4',
              },
              {
                type: 'input',
                inputType: 'time',
                label: 'Time',
                model: 'TIME',
                styleClasses: 'col-md-4',
                required: true,
                validator: 'required',
              },
              {
                type: 'input',
                inputType: 'number',
                label: 'Duration',
                model: 'DURATION',
                min: 0,
                required: true,
                validator: 'number',
                styleClasses: 'col-md-4',
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                label: 'Appointment Type',
                placeholder: 'Please select',
                model: 'APPOINTMENT_TYPE',
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
                styleClasses: 'col-md-6',
                values: () => {
                  return this.selectAppointmentType
                },
              },
              {
                type: 'vueMultiSelect',
                label: 'Type of Visit',
                placeholder: 'Please select',
                model: 'VISIT_TYPE',
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
                styleClasses: 'col-md-6',
                values: () => {
                  return this.selectVisitType
                },
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                label: 'Category of Patient',
                placeholder: 'Please select',
                model: 'PATIENT_CATEGORY',
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
                styleClasses: 'col-md-6',
                values: () => {
                  return this.selectPatientCategory
                },
              },
              {
                type: 'vueMultiSelect',
                label: 'Assigned Team',
                placeholder: 'Please select',
                model: 'ASSIGNED_TEAM',
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
                styleClasses: 'col-md-6',
                values: () => {
                  return this.selectAssignedTeam
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
    this.$axios
      .get('http://127.0.0.1:8000/api/getVisitType')
      .then((response) => {
        this.selectVisitType = response.data.data
      })

    this.$axios
      .get('http://127.0.0.1:8000/api/getPatientCategory')
      .then((response) => {
        this.selectPatientCategory = response.data.data
      })

    this.$axios
      .get('http://127.0.0.1:8000/api/getAppointmentType')
      .then((response) => {
        this.selectAppointmentType = response.data.data
      })

    this.$axios
      .get('http://127.0.0.1:8000/api/getAssignedTeam')
      .then((response) => {
        this.selectAssignedTeam = response.data.data
      })
  },
  methods: {
    navigateBack () {
      this.$router.push({ name: 'patient-appointmentList' })
    },
    validateForm () {
      var tabA = this.validateTabA()
      this.validatePatient()

      if (tabA && this.model.PATIENT_FK) {
        const data = new FormData()
        data.append('apptData', JSON.stringify(this.model))
        this.$axios
          .post('http://127.0.0.1:8000/api/bookAppointment', data)
          .then((response) => {
            return response.data
          })
        this.launchToast()
        this.submitPath = true
        this.$router.push({ name: 'patient-appointmentList' })
      }
    },
    validatePatient () {
      this.$axios
        .get('http://127.0.0.1:8000/api/verifyPatient?id=' + this.model.NRIC_PASSPORT_NO)
        .then((response) => {
          this.model.PATIENT_FK = response.data.data
        })
      console.log('patient id: ', this.model.PATIENT_FK)
    },
    validateTabA () {
      var errors = this.$refs.appointment.validate()
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
        ' Appointment for ' + this.model.NRIC_PASSPORT_NO + ' Booked Successful !',
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

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
.app-layout__main {
  background: hsl(0, 0%, 91%);
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
</style>
