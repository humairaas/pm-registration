<template>
  <div class="content">
    <div class="container-fluid">

      <div class="row">
        <div class="col-12">

          <!-- Form -->
          <va-card>
            <br>
            <b-tabs content-class="mt-3" justified>
              <b-tab title="Risk Factors" active>
                <br/>
                <vue-form-generator :model="model" :schema="tabASchema" :options="formOptions" ref="riskFactors" @model-updated="onModelUpdated">
                </vue-form-generator>
              </b-tab>
              <b-tab title="Protective Factors">
                <br/>
                <vue-form-generator :model="model" :schema="tabBSchema" :options="formOptions" ref="protectiveFactors" @model-updated="onModelUpdated" >
                </vue-form-generator>
              </b-tab>
              <b-tab title="The Self-Harm Act and Suicidal Intent">
                <va-accordion>
                  <va-collapse>
                    <span slot="header">
                      <b>Section A: CURRENT SELF-HARM ACT (within past 2 weeks from time of presentation)</b>
                    </span>
                    <div slot="body">
                      <vue-form-generator :schema="tabCASchema" :model="model" :options="formOptions"></vue-form-generator>
                    </div>
                  </va-collapse>
                  <va-collapse>
                    <span slot="header">
                      <b>Section B: METHOD OF SELF-HARM (please document the recent method only)</b>
                    </span>
                    <div slot="body">
                      <vue-form-generator :schema="tabCBSchema" :model="model" :options="formOptions"></vue-form-generator>
                    </div>
                  </va-collapse>
                  <va-collapse>
                    <span slot="header">
                      <b>Section C: HOW DID PATIENT GET IDEA ABOUT METHOD</b>
                    </span>
                    <div slot="body">
                      <vue-form-generator :schema="tabCCSchema" :model="model" :options="formOptions"></vue-form-generator>
                    </div>
                  </va-collapse>
                  <va-collapse>
                    <span slot="header">
                      <b>Section D: SUICIDAL INTENT</b>
                    </span>
                    <div slot="body">
                      <vue-form-generator :schema="tabCDSchema" :model="model" :options="formOptions"></vue-form-generator>
                    </div>
                  </va-collapse>
                  <va-collapse>
                    <span slot="header">
                      <b>Section E: LEVEL OF SUICIDAL INTENT (Beck's Suicide Intent Scale)</b>
                    </span>
                    <div slot="body">
                      <vue-form-generator :schema="tabCESchema" :model="model" :options="formOptions"></vue-form-generator>
                    </div>
                  </va-collapse>
                </va-accordion>
              </b-tab>
              <b-tab title="Suicide Risk">
                <br/>
                <vue-form-generator :schema="tabDSchema" :model="model" :options="formOptions"></vue-form-generator>
              </b-tab>
              <b-tab title="Hospital Management">
                <br/>
                <vue-form-generator :model="model" :schema="tabESchema" :options="formOptions" ref="hospitalManagement" @model-updated="onModelUpdated">
                </vue-form-generator>
                <h6>{{model}}</h6>
              </b-tab>
              <b-tab title="Source Data Producer">
                <br/>
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
              <vue-form-generator class="read-only" :model="model" :schema="tabASchema"></vue-form-generator>
              <h5 class="tab-title">2. Protective Factors</h5>
              <vue-form-generator class="sosio-margin read-only" :model="model" :schema="tabBSchema"></vue-form-generator>
              <h5 class="tab-title">3. The Self-Harm Act and Suicidal Intent</h5>
              <vue-form-generator class="read-only" :model="model" :schema="tabCASchema"></vue-form-generator>
              <h5 class="tab-title">4. Suicide Risk</h5>
              <vue-form-generator class="read-only" :model="model" :schema="tabDSchema"></vue-form-generator>
              <h5 class="tab-title">5. Hospital Management</h5>
              <vue-form-generator class="read-only" :model="model" :schema="tabESchema"></vue-form-generator>
              <h5 class="tab-title">6. Source Data Producer</h5>
              <vue-form-generator class="read-only" :model="model" :schema="tabFSchema"></vue-form-generator>
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
      selectReferral: [
        { name: 'ED', value: 1 },
        { name: 'Ward', value: 2 },
        { name: 'Clinic', value: 3 },
        { name: 'Mentari', value: 4 },
        { name: 'Others (Specify)', value: 99 },
      ],

      selectArrivalMode: [
        { name: 'Self', value: 1 },
        { name: 'Family', value: 2 },
        { name: 'Ambulance', value: 3 },
        { name: 'Police', value: 4 },
        { name: 'Others (Specify)', value: 99 },
      ],

      radioPhysicalConseq: [
        { name: 'No significant physical harm, no medical treatment required', value: 0 },
        { name: 'Medical attention/surgery required, but no danger to life', value: 1 },
        { name: 'Medical attention/surgery required, had/has danger to life', value: 2 },
        { name: 'Lethal', value: 3 },
        { name: 'Aborted (specify)', value: 99 },
      ],

      radioAdmission: [
        { name: 'No', value: 0 },
        { name: 'Yes', value: 1 },
      ],

      radioDischargeStatus: [
        { name: 'Dead', value: 0 },
        { name: 'Alive', value: 1 },
      ],

      selectPSYMX: [
        { name: 'Transferred to PSY ward', value: 1 },
        { name: 'Given appt to PSY clinic', value: 2 },
        { name: 'Referred to counsellor', value: 3 },
        { name: 'Discharge without any PSY follow-up', value: 4 },
        { name: 'Refer community PSY services', value: 5 },
        { name: 'Others (Specify)', value: 99 },
      ],

      // Source Data Producer Data

      model: {

        // Risk Factors
        Q1: '',
        Q1_SPECIFY: '',
        Q2: '',
        Q3: '',
        Q3_SPECIFY: '',
        Q4: '',
        Q4_SPECIFY: '',
        Q5: '',
        Q6: '',
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
        PQ1: '',
        PQ2: '',
        PQ3: '',
        PQ4: '',
        PQ5: '',
        PQ6: '',

        // The Self-harm Act and Suicidal Intent
        secA: {
          date: '',
          time: '',
          occurance: '',
          occur_other: '',
        },
        secB: {
          method: '',
          m1_select: '',
          m1_specify: '',
          m99_specify: '',
        },
        secC: {
          idea: '',
          idea_specify: '',
        },
        secD: {
          intent: '',
          yes: '',
          y99_specify: '',
        },
        secE: [],
        secE_score: '',

        // Suicide Risk
        level: [],

        // Hospital Management
        REFERRAL: '',
        REFERRAL_SPECIFY: '',
        ARRIVAL_MODE: '',
        ARRIVAL_SPECIFY: '',
        FIRST_ASSESSMENT_DATE: '',
        FIRST_ASSESSMENT_TIME: '',
        PHYSICAL_CONSEQ: '',
        PHYSICAL_CONSEQ_SPECIFY: '',
        ADMISSION: '',
        ADMISSION_SPECIFY: '',
        DISCHARGE_STATUS: '',
        DISCHARGE_DATE: '',
        NO_OF_DAYS: '',
        MAIN_DIAGNOSIS: '',
        EXTERNAL_DIAGNOSIS: '',
        PSYMX: [],
        PSYMX_SPECIFY: '',

        // Source Data Producer
        REG_OFF_NAME: '',
        DESIGNATION: '',
        REPORT_DATE: '',
        HOSPITAL_NAME: '',
        PSYCHIATRIST_NAME: '',
        VERIFICATION_DATE: '',

      },
      // Risk Factors
      tabASchema: {
        groups: [
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'radios',
                label: '1. Presence of psychiatric disorder',
                model: 'Q1',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: ['col-md-7', 'stretch-row'],
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Select diagnosis (can select more than 1)',
                model: 'Q1_SPECIFY',
                required: true,
                validator: 'required',
                selectOptions: {
                  multiple: true,
                  closeOnSelect: false,
                  searchable: true,
                  showLabels: false,
                  clearOnSelect: true,
                  limit: 3,
                  maxHeight: 200,
                },
                styleClasses: ['col-md-5'],
                values: () => {
                  return this.selectDiagnosis
                },
                visible: function (model) {
                  return model && model.Q1 === 1
                },
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'radios',
                label: '2. Hopelessness or despair',
                model: 'Q2',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: ['col-md-7', 'stretch-row'],
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'radios',
                label: '3. Previous suicide attempt',
                model: 'Q3',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: ['col-md-7', 'stretch-row'],
              },
              {
                type: 'input',
                inputType: 'number',
                placeholder: 'Please specify (times)',
                model: 'Q3_SPECIFY',
                min: 0,
                required: true,
                validator: 'number',
                styleClasses: ['col-md-5'],
                visible: function (model) {
                  return model && model.Q3 === 1
                },
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'radios',
                label: '4. Presence of substance use/abuse',
                model: 'Q4',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: ['col-md-7', 'stretch-row'],
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Please specify',
                model: 'Q4_SPECIFY',
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
                styleClasses: ['col-md-5', 'mb-0'],
                values: () => {
                  return this.selectSubstance
                },
                visible: function (model) {
                  return model && model.Q4 === 1
                },
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'radios',
                label: '5. Family history of suicidal behaviour',
                model: 'Q5',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: ['col-md-7', 'stretch-row'],
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'radios',
                label: '6. Family history of psychiatric disorder',
                model: 'Q6',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: ['col-md-7', 'stretch-row'],
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Select diagnosis (can select more than 1)',
                model: 'Q6_SPECIFY',
                required: true,
                validator: 'required',
                selectOptions: {
                  multiple: true,
                  searchable: true,
                  showLabels: false,
                  clearOnSelect: true,
                  closeOnSelect: false,
                  limit: 3,
                  maxHeight: 200,
                },
                styleClasses: ['col-md-5'],
                values: () => {
                  return this.selectDiagnosis
                },
                visible: function (model) {
                  return model && model.Q6 === 1
                },
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'radios',
                label: '7. Family histroy of substance abuse',
                model: 'Q7',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: ['col-md-7', 'stretch-row'],
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Please specify',
                model: 'Q7_SPECIFY',
                required: true,
                validator: 'required',
                selectOptions: {
                  multiple: false,
                  closeOnSelect: true,
                  maxHeight: 200,
                  showLabels: false,
                  label: 'name',
                  key: 'value',
                },
                styleClasses: ['col-md-5'],
                values: () => {
                  return this.selectSubstance
                },
                visible: function (model) {
                  return model && model.Q7 === 1
                },
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'radios',
                label: '8. Stressful life events',
                model: 'Q8',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: ['col-md-7', 'stretch-row'],
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Please specify',
                model: 'Q8_SPECIFY',
                required: true,
                validator: 'required',
                selectOptions: {
                  multiple: false,
                  closeOnSelect: true,
                  maxHeight: 200,
                  showLabels: false,
                  label: 'name',
                  key: 'value',
                },
                styleClasses: ['col-md-5'],
                values: () => {
                  return this.selectStressfulLifeEvents
                },
                visible: function (model) {
                  return model && model.Q8 === 1
                },
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'radios',
                label: '9. Isolation, rejection, or feelings of shame',
                model: 'Q9',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: ['col-md-7', 'stretch-row'],
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'radios',
                label: '10. Chronic physical illness or condition',
                model: 'Q10',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: ['col-md-7', 'stretch-row'],
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Please specify (can choose more than 1)',
                model: 'Q10_SPECIFY',
                required: true,
                validator: 'required',
                selectOptions: {
                  multiple: true,
                  searchable: true,
                  showLabels: false,
                  closeOnSelect: false,
                  limit: 3,
                  maxHeight: 200,
                },
                styleClasses: ['col-md-5'],
                values: () => {
                  return this.selectDiagnosis
                },
                visible: function (model) {
                  return model && model.Q10 === 1
                },
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'radios',
                label: '11. History of physical, sexual or emotional abuse',
                model: 'Q11',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: ['col-md-7', 'stretch-row'],
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'radios',
                label: '12. Access to lethal methods/weapons',
                model: 'Q12',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: ['col-md-7', 'stretch-row'],
              },
            ],
          },
        ],
      },
      // Protective Factors
      tabBSchema: {
        fields: [
          {
            type: 'radios',
            label: '1. Ability to cope with stress/tolerate frustrations',
            model: 'PQ1',
            values: [
              { name: 'No', value: 0 },
              { name: 'Yes', value: 1 },
            ],
            required: true,
            validator: 'required',
            styleClasses: ['stretch-row'],
          },
          {
            type: 'radios',
            label: '2. Strongly held religious/cultural beliefs',
            model: 'PQ2',
            values: [
              { name: 'No', value: 0 },
              { name: 'Yes', value: 1 },
            ],
            required: true,
            validator: 'required',
            styleClasses: ['stretch-row'],
          },
          {
            type: 'radios',
            label: '3. Realistic life goals or future plans',
            model: 'PQ3',
            values: [
              { name: 'No', value: 0 },
              { name: 'Yes', value: 1 },
            ],
            required: true,
            validator: 'required',
            styleClasses: ['stretch-row'],
          },
          {
            type: 'radios',
            label: '4. Responsibility to children/beloved pets',
            model: 'PQ4',
            values: [
              { name: 'No', value: 0 },
              { name: 'Yes', value: 1 },
            ],
            required: true,
            validator: 'required',
            styleClasses: ['stretch-row'],
          },
          {
            type: 'radios',
            label: '5. Social support',
            model: 'PQ5',
            values: [
              { name: 'No', value: 0 },
              { name: 'Yes', value: 1 },
            ],
            required: true,
            validator: 'required',
            styleClasses: ['stretch-row'],
          },
          {
            type: 'radios',
            label: '6. Positive therapeutic relationship',
            model: 'PQ6',
            values: [
              { name: 'No', value: 0 },
              { name: 'Yes', value: 1 },
            ],
            required: true,
            validator: 'required',
            styleClasses: ['stretch-row'],
          },
        ],
      },

      // The Self-harm Act and Suicidal Intent
      tabCASchema: {
        fields: [
          {
            type: 'input',
            inputType: 'date',
            label: 'Date',
            model: 'secA.date',
            format: 'YYYY-MM-DD',
            styleClasses: 'col-sm-6',
            required: true,
            validator: 'required',
          },
          {
            type: 'input',
            inputType: 'time',
            label: 'Time',
            model: 'secA.time',
            styleClasses: 'col-sm-6',
            required: true,
            validator: 'required',
          },
          {
            type: 'select',
            label: 'Place of Occurance',
            model: 'secA.occurance',
            values: [
              { name: 'Home', id: 1 },
              { name: 'Residential instituition', id: 2 },
              { name: 'School & public admin area', id: 3 },
              { name: 'Sports & athletics area', id: 4 },
              { name: 'Street & highway', id: 5 },
              { name: 'Trade & service area', id: 6 },
              { name: 'Industrial & construction area', id: 7 },
              { name: 'Farm / plantation', id: 8 },
              { name: 'Others specified areas', id: 99 },
            ],
            selectOptions: {
              hideNoneSelectedText: true,
            },
            styleClasses: 'col-sm-6',
            required: true,
            validator: 'required',
          },
          {
            type: 'input',
            inputType: 'text',
            label: '&nbsp',
            model: 'secA.occur_other',
            placeholder: 'Other specified areas',
            styleClasses: 'col-sm-3',
            visible: function (model) {
              return model && model.secA.occurance === 99
            },
            required: true,
            validator: 'string',
          },
        ],
      },

      tabCBSchema: {
        fields: [
          {
            type: 'label',
            label: 'Instruction: Please tick (/) in the box provided',
          },
          {
            type: 'checklist',
            values: [
              { value: 1, name: 'Overdose / Poisoning' },
            ],
            listBox: true,
            model: 'secB.method',
            styleClasses: 'col-sm-4',
          },
          {
            type: 'select',
            model: 'secB.m1_select',
            values: [
              { name: 'Medications, specify', id: 1 },
              { name: 'Illicit substances, specify', id: 2 },
              { name: 'Chemicals (including pesticides), specify', id: 3 },
            ],
            selectOptions: {
              hideNoneSelectedText: true,
            },
            styleClasses: 'col-sm-4',
            visible: function (model) {
              return model && model.secB.method.includes(1)
            },
          },
          {
            type: 'input',
            inputType: 'text',
            model: 'secB.m1_specify',
            placeholder: 'Please specify',
            styleClasses: 'col-sm-3',
            visible: function (model) {
              if (model.secB.method.includes(1)) {
                return model && (model.secB.m1_select === 1 || model.secB.m1_select === 2 || model.secB.m1_select === 3)
              }
            },
            required: true,
            validator: 'string',
          },
          {
            type: 'checklist',
            values: [
              { value: 2, name: 'Hanging / suffocation' },
            ],
            listBox: true,
            model: 'secB.method',
            styleClasses: 'col-sm-4',
          },
          {
            type: 'checklist',
            values: [
              { value: 3, name: 'Drowning' },
            ],
            listBox: true,
            model: 'secB.method',
            styleClasses: 'col-sm-4',
          },
          {
            type: 'checklist',
            values: [
              { value: 4, name: 'Firearms or explosives' },
            ],
            listBox: true,
            model: 'secB.method',
            styleClasses: 'col-sm-4',
          },
          {
            type: 'checklist',
            values: [
              { value: 5, name: 'Fire / flames' },
            ],
            listBox: true,
            model: 'secB.method',
            styleClasses: 'col-sm-4',
          },
          {
            type: 'checklist',
            values: [
              { value: 6, name: 'Cutting or Piercing' },
            ],
            listBox: true,
            model: 'secB.method',
            styleClasses: 'col-sm-4',
          },
          {
            type: 'checklist',
            values: [
              { value: 7, name: 'Jumping from height' },
            ],
            listBox: true,
            model: 'secB.method',
            styleClasses: 'col-sm-4',
          },
          {
            type: 'checklist',
            values: [
              { value: 99, name: 'Others, specify' },
            ],
            listBox: true,
            model: 'secB.method',
            styleClasses: 'col-sm-4',
          },
          {
            type: 'input',
            inputType: 'text',
            model: 'secB.m99_specify',
            placeholder: 'Please specify',
            styleClasses: 'col-sm-4',
            visible: function (model) {
              return model && model.secB.method.includes(99)
            },
            required: true,
            validator: 'string',
          },
        ],
      },

      tabCCSchema: {
        fields: [
          {
            type: 'label',
            label: 'Instruction: Please tick (/) in the box provided',
          },
          {
            type: 'checklist',
            values: [
              { value: 1, name: 'Family, friend, peer group' },
            ],
            listBox: true,
            model: 'secC.idea',
            styleClasses: 'col-sm-4',
          },
          {
            type: 'checklist',
            values: [
              { value: 2, name: 'Internet (website, social media platform, app, blog, forum, video/photosharing)' },
            ],
            listBox: true,
            model: 'secC.idea',
            styleClasses: 'col-sm-4',
          },
          {
            type: 'checklist',
            values: [
              { value: 3, name: 'Printed media (newspaper, books, magazine, etc)' },
            ],
            listBox: true,
            model: 'secC.idea',
            styleClasses: 'col-sm-4',
          },
          {
            type: 'checklist',
            values: [
              { value: 4, name: 'Broadcast media (television, radio)' },
            ],
            listBox: true,
            model: 'secC.idea',
            styleClasses: 'col-sm-4',
          },
          {
            type: 'checklist',
            values: [
              { value: 99, name: 'Specify patient actual words' },
            ],
            listBox: true,
            model: 'secC.idea',
            styleClasses: 'col-sm-4',
          },
          {
            type: 'input',
            inputType: 'text',
            model: 'secC.idea_specify',
            placeholder: 'Specify patient actual words',
            styleClasses: 'col-sm-4',
            visible: function (model) {
              return model && model.secC.idea.includes(99)
            },
            required: true,
            validator: 'string',
          },
        ],
      },

      tabCDSchema: {
        fields: [
          {
            type: 'radios',
            label: '&nbsp Was there an intent?',
            model: 'secD.intent',
            values: [
              { value: 1, name: 'No' },
              { value: 2, name: 'Yes' },
              { value: 3, name: 'Undetermined' },
            ],
            required: true,
            validator: 'required',
          },
          {
            type: 'label',
            label: 'Instruction: Please tick (/) in the box<br>If yes, mode of expression (can tick more than 1)',
            visible: function (model) {
              return model && model.secD.intent === 2
            },
          },
          {
            type: 'checklist',
            values: [
              { value: 1, name: 'Verbal' },
            ],
            listBox: true,
            model: 'secD.yes',
            styleClasses: 'col-sm-4',
            visible: function (model) {
              return model && model.secD.intent === 2
            },
          },
          {
            type: 'checklist',
            values: [
              { value: 2, name: 'Messaging' },
            ],
            listBox: true,
            model: 'secD.yes',
            styleClasses: 'col-sm-4',
            visible: function (model) {
              return model && model.secD.intent === 2
            },

          },
          {
            type: 'checklist',
            values: [
              { value: 3, name: 'Rehearsing' },
            ],
            listBox: true,
            model: 'secD.yes',
            styleClasses: 'col-sm-4',
            visible: function (model) {
              return model && model.secD.intent === 2
            },
          },
          {
            type: 'checklist',
            values: [
              { value: 4, name: 'Not expressed' },
            ],
            listBox: true,
            model: 'secD.yes',
            styleClasses: 'col-sm-4',
            visible: function (model) {
              return model && model.secD.intent === 2
            },
          },
          {
            type: 'checklist',
            values: [
              { value: 5, name: 'Handwritten' },
            ],
            listBox: true,
            model: 'secD.yes',
            styleClasses: 'col-sm-4',
            visible: function (model) {
              return model && model.secD.intent === 2
            },
          },
          {
            type: 'checklist',
            values: [
              { value: 6, name: 'Social Media' },
            ],
            listBox: true,
            model: 'secD.yes',
            styleClasses: 'col-sm-4',
            visible: function (model) {
              return model && model.secD.intent === 2
            },
          },
          {
            type: 'checklist',
            values: [
              { value: 7, name: 'Efforts to learn more' },
            ],
            listBox: true,
            model: 'secD.yes',
            styleClasses: 'col-sm-4',
            visible: function (model) {
              return model && model.secD.intent === 2
            },
          },
          {
            type: 'checklist',
            values: [
              { value: 99, name: 'Others, specify' },
            ],
            listBox: true,
            model: 'secD.yes',
            styleClasses: 'col-sm-4',
            visible: function (model) {
              return model && model.secD.intent === 2
            },
          },
          {
            type: 'input',
            inputType: 'text',
            model: 'secD.y99_specify',
            placeholder: 'Please specify',
            styleClasses: 'col-sm-4',
            visible: function (model) {
              if (model.secD.intent === 2) {
                return model && model.secD.yes.includes(99)
              }
            },
            required: true,
            validator: 'string',
          },
        ],
      },

      tabCESchema: {
        fields: [
          {
            type: 'radios',
            label: '<ol><li>Isolation</li></ol>',
            model: 'secE[0]',
            values: [
              { value: 0, name: 'Somebody present' },
              { value: 1, name: 'Somebody nearby, or in visual or vocal contact' },
              { value: 2, name: 'No one nearby or in visual or vocal contact' },
            ],
            required: true,
            validator: 'required',
          },
          {
            type: 'radios',
            label: "<ol  start='2'><li>Timing</li></ol>",
            model: 'secE[1]',
            values: [
              { value: 0, name: 'Intervention is probable' },
              { value: 1, name: 'Intervention is not likely' },
              { value: 2, name: 'Intervention is highly unlikely' },
            ],
            required: true,
            validator: 'required',
            styleClasses: 'line-top',
          },
          {
            type: 'radios',
            label: "<ol start='3'><li>Precautions against discovery / intervention</li></ol>",
            model: 'secE[2]',
            values: [
              { value: 0, name: 'No precautions' },
              { value: 1, name: 'Passive precautions (eg; alone in room with unlocked door' },
              { value: 2, name: 'Active precautions (as locked door)' },
            ],
            required: true,
            validator: 'required',
            styleClasses: 'line-top',
          },
          {
            type: 'radios',
            label: "<ol  start='4'><li>Acting to get help during / after attempt</li></ol>",
            model: 'secE[3]',
            values: [
              { value: 0, name: 'Notified potential helper regarding attempt' },
              { value: 1, name: 'Contacted but did not specifically notify regarding attempt' },
              { value: 2, name: 'Did not contact or notify potential helper' },
            ],
            required: true,
            validator: 'required',
            styleClasses: 'line-top',
          },
          {
            type: 'radios',
            label: "<ol start='5'><li>Final acts in anticipating of death (will, gifts, insurance)</li></ol>",
            model: 'secE[4]',
            values: [
              { value: 0, name: 'None' },
              { value: 1, name: 'Thought about or made some arrangements' },
              { value: 2, name: 'Made definite plans or completed arrangements' },
            ],
            required: true,
            validator: 'required',
            styleClasses: 'line-top',
          },
          {
            type: 'radios',
            label: "<ol start='6'><li>Active preparation for attempt</li></ol>",
            model: 'secE[5]',
            values: [
              { value: 0, name: 'None' },
              { value: 1, name: 'Minimal to moderate' },
              { value: 2, name: 'Extensive' },
            ],
            required: true,
            validator: 'required',
            styleClasses: 'line-top',
          },
          {
            type: 'radios',
            label: "<ol start='7'><li>Suicide note</li></ol>",
            model: 'secE[6]',
            values: [
              { value: 0, name: 'Absence of note' },
              { value: 1, name: 'Note written, but torn up; note thought about' },
              { value: 2, name: 'Presence of note' },
            ],
            required: true,
            validator: 'required',
            styleClasses: 'line-top',
          },
          {
            type: 'radios',
            label: "<ol start='8'><li>Overt communication of intent before the attempt</li></ol>",
            model: 'secE[7]',
            values: [
              { value: 0, name: 'None' },
              { value: 1, name: 'Equivocal communication' },
              { value: 2, name: 'Unequivocal communication' },
            ],
            required: true,
            validator: 'required',
            styleClasses: 'line-top',
          },
          {
            type: 'radios',
            label: "<ol start='9'><li>Allged purpose of attempt</li></ol>",
            model: 'secE[8]',
            values: [
              { value: 0, name: 'To manipulate environment, get attention, get revenge' },
              { value: 1, name: 'Components of above and below' },
              { value: 2, name: 'To escape, surcease, solve problems' },
            ],
            required: true,
            validator: 'required',
            styleClasses: 'line-top',
          },
          {
            type: 'radios',
            label: "<ol start='10'><li>Expectations of fatality</li></ol>",
            model: 'secE[9]',
            values: [
              { value: 0, name: 'Thought that death was unlikely' },
              { value: 1, name: 'Thought that death was possible but not probable' },
              { value: 2, name: 'Thought that death was probable or certain' },
            ],
            required: true,
            validator: 'required',
            styleClasses: 'line-top',
          },
          {
            type: 'radios',
            label: "<ol start='11'><li>Conception of method's lethality</li></ol>",
            model: 'secE[10]',
            values: [
              { value: 0, name: 'Did less to self that s/he thought would be lethal' },
              { value: 1, name: "Wasn't sure if what s/he did would be lethal" },
              { value: 2, name: 'Equaled or exceed what s/he thought would be lethal' },
            ],
            required: true,
            validator: 'required',
            styleClasses: 'line-top',
          },
          {
            type: 'radios',
            label: "<ol start='12'><li>Seriousness of attempt</li></ol>",
            model: 'secE[11]',
            values: [
              { value: 0, name: 'Did not seriously attempt to end life' },
              { value: 1, name: 'Uncertain about seriousness to end life' },
              { value: 2, name: 'Seriously attempted to end life' },
            ],
            required: true,
            validator: 'required',
            styleClasses: 'line-top',
          },
          {
            type: 'radios',
            label: "<ol start='13'><li>Attitude towards living/dying</li></ol>",
            model: 'secE[12]',
            values: [
              { value: 0, name: 'Did not want to die' },
              { value: 1, name: 'Components of above and below' },
              { value: 2, name: 'Wanted to die' },
            ],
            required: true,
            validator: 'required',
            styleClasses: 'line-top',
          },
          {
            type: 'radios',
            label: "<ol start='14'><li>Conception of medical rescuability</li></ol>",
            model: 'secE[13]',
            values: [
              { value: 0, name: 'Thought death would be unlikely if received medical attention' },
              { value: 1, name: 'Was uncertain if death could be averted by medical attention' },
              { value: 2, name: 'Was certain of death even if received medical attention' },
            ],
            required: true,
            validator: 'required',
            styleClasses: 'line-top',
          },
          {
            type: 'radios',
            label: "<ol start='15'><li>Degree of premeditation</li></ol>",
            model: 'secE[14]',
            values: [
              { value: 0, name: 'None; impulsive' },
              { value: 1, name: 'Suicide contemplated for 3 hours or less prior to attempt' },
              { value: 2, name: 'Suicide contemplated for more than 3 hours prior to attempt' },
            ],
            required: true,
            validator: 'required',
            styleClasses: 'line-top',
          },
          {
            type: 'label',
            label: 'Total Score',
            styleClasses: 'line-top',
          },
          {
            type: 'checklist',
            values: [
              { value: 1, name: '0-10  Low Intent' },
            ],
            listBox: true,
            model: 'secE_score',
            styleClasses: 'col-sm-3',
          },
          {
            type: 'checklist',
            values: [
              { value: 2, name: '11-20  Medium Intent' },
            ],
            listBox: true,
            model: 'secE_score',
            styleClasses: 'col-sm-3',
          },
          {
            type: 'checklist',
            values: [
              { value: 3, name: '21+  High Intent' },
            ],
            listBox: true,
            model: 'secE_score',
            styleClasses: 'col-sm-3',
          },

        ],
      },

      // Suicide Risk
      tabDSchema: {
        groups: [
          {
            fields: [
              {
                type: 'checklist',
                values: [
                  { value: 1, name: 'High' },
                ],
                listBox: true,
                model: 'level',
                styleClasses: 'col-4',
                validator: 'required',
              },
              {
                type: 'label',
                label: 'Psychiatric diagnoses with severe symptoms or acute precipitating events; protective factors not relevant; high suicidal intent',
                styleClasses: 'col-8',
              },
            ],
          },
          {
            fields: [
              {
                type: 'checklist',
                values: [
                  { value: 2, name: 'Moderate' },
                ],
                listBox: true,
                model: 'level',
                styleClasses: 'col-4',
                validator: 'required',
              },
              {
                type: 'label',
                label: 'Multiple risk factors, few protective factors, moderate suicidal intent',
                styleClasses: 'col-8',
              },
            ],
          },
          {
            fields: [
              {
                type: 'checklist',
                values: [
                  { value: 3, name: 'Low' },
                ],
                listBox: true,
                model: 'level',
                styleClasses: 'col-4',
                validator: 'required',
              },
              {
                type: 'label',
                label: 'Modifiable risk factors, strong protective factors, no or low suicidal intent',
                styleClasses: 'col-8',
              },
            ],
          },
        ],
      },
      // Hospital Management
      tabESchema: {
        groups: [
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'vueMultiSelect',
                placeholder: 'Please select',
                label: 'Referral or Contact point',
                model: 'REFERRAL',
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
                styleClasses: ['col-md-6'],
                values: () => {
                  return this.selectReferral
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: '',
                placeholder: 'Please specify',
                model: 'REFERRAL_SPECIFY',
                validator: 'string',
                required: true,
                styleClasses: ['col-md-6'],
                visible: function (model) {
                  return model && model.REFERRAL.value === 99
                },
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'vueMultiSelect',
                placeholder: 'Please select',
                label: 'Mode of Arrival',
                model: 'ARRIVAL_MODE',
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
                styleClasses: ['col-md-6'],
                values: () => {
                  return this.selectArrivalMode
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: '',
                placeholder: 'Please specify',
                model: 'ARRIVAL_SPECIFY',
                validator: 'string',
                required: true,
                styleClasses: ['col-md-6'],
                visible: function (model) {
                  return model && model.ARRIVAL_MODE.value === 99
                },
              },
            ],
          },
          {
            styleClasses: ['row', 'align-items-center'],
            fields: [
              {
                type: 'label',
                label: 'First psychiatry assessment after current attempt',
                styleClasses: ['col-md-2'],
              },
              {
                type: 'input',
                inputType: 'date',
                label: 'Date',
                model: 'FIRST_ASSESSMENT_DATE',
                required: true,
                validator: 'date',
                format: 'YYYY/MM/DD',
                styleClasses: ['col-md-5'],
              },
              {
                type: 'input',
                inputType: 'time',
                label: 'Time',
                model: 'FIRST_ASSESSMENT_TIME',
                required: true,
                validator: 'required',
                styleClasses: ['col-md-5'],
              },
            ],
          },
          {
            styleClasses: ['row', 'align-items-end'],
            fields: [
              {
                type: 'radios',
                label: 'Physical consequences of current attempt',
                model: 'PHYSICAL_CONSEQ',
                required: true,
                validator: 'required',
                styleClasses: ['col-md-6'],
                values: () => {
                  return this.radioPhysicalConseq
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: '',
                placeholder: 'Please specify',
                model: 'PHYSICAL_CONSEQ_SPECIFY',
                validator: 'string',
                required: true,
                styleClasses: ['col-md-6'],
                visible: function (model) {
                  return model && model.PHYSICAL_CONSEQ === 99
                },
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'radios',
                label: 'Is patient admitted for current attempt?',
                model: 'ADMISSION',
                required: true,
                validator: 'required',
                styleClasses: ['col-md-6', 'display-inline'],
                values: () => {
                  return this.radioAdmission
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: '',
                placeholder: 'Please specify the first admitting ward',
                model: 'ADMISSION_SPECIFY',
                validator: 'string',
                required: true,
                styleClasses: ['col-md-6'],
                visible: function (model) {
                  return model && model.ADMISSION === 1
                },
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'radios',
                label: 'Status on discharge',
                model: 'DISCHARGE_STATUS',
                required: true,
                validator: 'required',
                styleClasses: ['col-md-6', 'display-inline'],
                values: () => {
                  return this.radioDischargeStatus
                },
              },
            ],
          },
          {
            styleClasses: ['row', 'align-items-center'],
            fields: [
              {
                type: 'label',
                label: 'Discharge details',
                styleClasses: ['col-md-2'],
              },
              {
                type: 'input',
                inputType: 'date',
                label: 'Date',
                model: 'DISCHARGE_DATE',
                required: true,
                validator: 'date',
                format: 'YYYY/MM/DD',
                styleClasses: ['col-md-5'],
              },
              {
                type: 'input',
                inputType: 'number',
                label: 'Number of days in ward',
                model: 'NO_OF_DAYS',
                min: 0,
                required: true,
                validator: 'number',
                styleClasses: ['col-md-5'],
              },
            ],
          },
          {
            styleClasses: ['row', 'align-items-center'],
            fields: [
              {
                type: 'label',
                label: 'Discharge Diagnosis (ICD)',
                styleClasses: ['col-md-2'],
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Main diagnosis',
                placeholder: 'Please specify',
                model: 'MAIN_DIAGNOSIS',
                validator: 'string',
                required: true,
                styleClasses: ['col-md-5'],
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'External causes',
                placeholder: 'Please specify',
                model: 'EXTERNAL_DIAGNOSIS',
                validator: 'string',
                required: true,
                styleClasses: ['col-md-5'],
              },

            ],
          },
          {
            styleClasses: ['row', 'align-items-end'],
            fields: [
              // {
              //   type: 'checklist',
              //   label: 'PSY Mx on Discharge',
              //   model: 'PSYMX',
              //   required: true,
              //   validator: 'array',
              //   styleClasses: ['col-md-6'],
              //   values: () => {
              //     return this.selectPSYMX
              //   },
              // },
              {
                type: 'vueMultiSelect',
                placeholder: 'Please select (can select more than 1)',
                label: 'PSY Mx on Discharge',
                model: 'PSYMX',
                required: true,
                validator: 'required',
                selectOptions: {
                  multiple: true,
                  closeOnSelect: false,
                  searchable: true,
                  showLabels: false,
                  clearOnSelect: true,
                  maxHeight: 200,
                  key: 'value',
                  label: 'name',
                },
                styleClasses: ['col-md-6'],
                values: () => {
                  return this.selectPSYMX
                },
              },
              {
                type: 'input',
                inputType: 'text',
                placeholder: 'Please specify',
                model: 'PSYMX_SPECIFY',
                label: '',
                validator: 'string',
                required: true,
                styleClasses: ['col-md-6'],
                visible: function (model) {
                  if (model.PSYMX.some(e => e.value === 99)) {
                    return true
                  }
                },
              },
            ],
          },
        ],
      },

      // Source Data Producer
      tabFSchema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'input',
                inputType: 'text',
                label: 'Name of Registering Officer',
                model: 'REG_OFF_NAME',
                validator: 'string',
                required: true,
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Name of Hospital',
                model: 'HOSPITAL_NAME',
                validator: 'string',
                required: true,
                styleClasses: 'col-md-6',
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'input',
                inputType: 'text',
                label: 'Designation',
                model: 'DESIGNATION',
                validator: 'string',
                required: true,
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Name of Psychiatrist',
                model: 'PSYCHIATRIST_NAME',
                validator: 'string',
                required: true,
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
                label: 'Date of Reporting',
                model: 'REPORT_DATE',
                min: '1990-01-01',
                required: true,
                validator: 'date',
                format: 'YYYY/MM/DD',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'date',
                label: 'Date of Verification',
                model: 'VERIFICATION_DATE',
                min: '1990-01-01',
                required: true,
                validator: 'date',
                format: 'YYYY/MM/DD',
                styleClasses: 'col-md-6',
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

  .stretch-row {
    display: flex !important;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .vue-form-generator .field-radios .radio-list label {
    display: inline-table;
    margin-right: 1rem;
  }
</style>
