<template>
  <div class="content">
    <div class="container-fluid">

      <div class="row">
        <div class="col-12">

          <!-- Notification Alert -->
          <!-- <div class="mb-3" v-if="tabA==true">
            <va-notification color="danger">
              <va-badge color="danger">
                {{ $t('Incomplete') }}
              </va-badge>
              <span>Please fill all <b> Demographic </b> required fields.</span>
              <button type="button" class="btn close-button" @click="tabA = false">
                <span class="fa fa-close"/>
              </button>
            </va-notification>
          </div> -->

          <va-card>
            <h2>BOOK APPOINTMENT</h2>
            <br>
            <!-- Form -->
            <vue-form-generator :model="model" :schema="schema" :options="formOptions" ref="appointment" @model-updated="onModelUpdated">
            </vue-form-generator>
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
      selectAppointmentType: [
        { name: 'Supported Employment', value: '1' },
        { name: 'ETP', value: '2' },
        { name: 'Job Club', value: '3' },
        { name: 'Rehabilitation', value: '4' },
        { name: 'Consultation', value: '5' },
      ],

      selectVisitType: [
        { name: 'New', value: '1' },
        { name: 'Follow Up', value: '2' },
      ],

      selectPatientCategory: [
        { name: 'Daycare', value: '1' },
        { name: 'Outpatient', value: '2' },
      ],

      selectAssignedTeam: [
        { name: 'Team 1', value: '1' },
        { name: 'Team 2', value: '2' },
      ],

      model: {
        NRIC: '',
        DATE: '',
        TIME: '',
        DURATION: '',
        APPOINTMENT_TYPE: '',
        VISIT_TYPE: '',
        PATIENT_CATEGORY: '',
        ASSIGNED_TEAM: '',
      },
      schema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'cleave',
                label: 'NRIC/PASSPORT NUMBER',
                model: 'NRIC',
                required: true,
                cleaveOptions: {
                  blocks: [6, 2, 4],
                  delimiter: '-',
                  numericOnly: true,
                },
                placeholder: 'XXXXXX-XX-XXXX',
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
