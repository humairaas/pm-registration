<template>
  <div class="content">
    <div class="container-fluid">

      <div class="row">
        <div class="col-12">

          <!-- Form -->
          <va-card>
            <br>
            <b-tabs content-class="mt-3" v-model="tabIndex" fill>

              <!-- RISK FACTORS -->
              <b-tab title="1. Risk Factors" class="py-3 pr-2" active>
                <br/>
                <vue-form-generator :model="model" :schema="tabASchema" :options="formOptions" ref="riskFactors" @model-updated="onModelUpdated">
                </vue-form-generator>
              </b-tab>

              <!-- PROTECTIVE FACTORS -->
              <b-tab title="2. Protective Factors">
                <br/>
                <vue-form-generator :model="model" :schema="tabBSchema" :options="formOptions" ref="protectiveFactors" @model-updated="onModelUpdated" >
                </vue-form-generator>
              </b-tab>

              <!-- THE SELF-HARM ACT AND SUICIDAL INTENT -->
              <b-tab title="3. The Self-Harm Act and Suicidal Intent" class="py-3">
                <va-accordion >
                  <!-- Section A -->
                  <va-collapse>
                    <span slot="header">
                      Section A:<br><b>CURRENT SELF-HARM ACT</b> (within past 2 weeks from time of presentation)
                    </span>
                    <div slot="body">
                      <vue-form-generator :model="model" :schema="tabCASchema" :options="formOptions" ref="selfHarmSectionA" @model-updated="onModelUpdated" >
                      </vue-form-generator>
                    </div>
                  </va-collapse>

                  <!-- Section B -->
                  <va-collapse>
                    <span slot="header">
                      Section B:<br><b>METHOD OF SELF-HARM</b> (please document the recent method only)
                    </span>
                    <div slot="body">
                      <h6 class="mt-3 mb-4 ml-3">Instruction: Please tick (/) in the box provided</h6>
                      <div class="row">
                        <div class="col-lg-auto">
                          <vue-form-generator :schema="tabCB1Schema" :model="model" :options="formOptions" ref="selfHarmSectionB1" @model-updated="onModelUpdated" ></vue-form-generator>
                        </div>
                        <div class="col-lg">
                          <vue-form-generator :schema="tabCB2Schema" :model="model" :options="formOptions" ref="selfHarmSectionB2" @model-updated="onModelUpdated" ></vue-form-generator>
                        </div>
                      </div>
                    </div>
                  </va-collapse>

                  <!-- Section C -->
                  <va-collapse>
                    <span slot="header">
                      Section C:<br><b>HOW DID PATIENT GET IDEA ABOUT METHOD</b>
                    </span>
                    <div slot="body">
                      <h6 class="mt-3 mb-4 ml-3">Instruction: Please tick (/) in the box provided</h6>
                      <vue-form-generator :schema="tabCCSchema" :model="model" :options="formOptions" ref="selfHarmSectionC" @model-updated="onModelUpdated"></vue-form-generator>
                    </div>
                  </va-collapse>

                  <!-- Section D -->
                  <va-collapse>
                    <span slot="header">
                      Section D:<br><b>SUICIDAL INTENT</b>
                    </span>
                    <div slot="body">
                      <div class="row mt-3">
                        <div class="col-lg-3 mt-2">
                          <vue-form-generator :schema="tabCD1Schema" :model="model" :options="formOptions" ref="selfHarmSectionD1" @model-updated="onModelUpdated"></vue-form-generator>
                        </div>
                        <div class="col-lg">
                          <vue-form-generator :schema="tabCD2Schema" :model="model" :options="formOptions" ref="selfHarmSectionD2" @model-updated="onModelUpdated"></vue-form-generator>
                        </div>
                      </div>
                    </div>
                  </va-collapse>

                  <!-- Section E -->
                  <va-collapse>
                    <span slot="header">
                      Section E:<br><b>LEVEL OF SUICIDAL INTENT</b> (Beck's Suicide Intent Scale)
                    </span>
                    <div slot="body">
                      <vue-form-generator :schema="tabCESchema" :model="model" :options="formOptions" ref="selfHarmSectionE" @model-updated="onModelUpdated"></vue-form-generator>
                      <vue-form-generator :schema="totalScoreSchema" :model="model" :options="formOptions" ref="totalScore" @model-updated="onModelUpdated" class="mt-5"></vue-form-generator>
                    </div>
                  </va-collapse>
                </va-accordion>
              </b-tab>

              <!-- SUICIDE RISK -->
              <b-tab title="4. Suicide Risk" class="px-3 py-2 mb-3">
                <h6 class="mb-4">Instruction: Please tick (/) in the box provided</h6>
                <div class="row" >
                  <div class="col-md-3 p-3">
                    <b>Level of Suicide Risk for Current Attempt</b>
                  </div>
                  <div class="col-md mt-3 mr-2 box">
                    <vue-form-generator :schema="tabDSchema" :model="model" :options="formOptions" ref="suicideRisk" @model-updated="onModelUpdated"></vue-form-generator>
                  </div>
                </div>
              </b-tab>

              <!-- HOSPITAL MANAGEMENT -->
              <b-tab title="5. Hospital Management" class="p-3">
                <br/>
                <vue-form-generator :model="model" :schema="tabESchema" :options="formOptions" ref="hospitalManagement" @model-updated="onModelUpdated">
                </vue-form-generator>
                <h6>{{model}}</h6>
              </b-tab>

              <!-- SOURCE DATA PRODUCER -->
              <b-tab title="6. Source Data Producer" class="p-3">
                <br/>
                <vue-form-generator :model="model" :schema="tabFSchema" :options="formOptions" ref="sourceDataProducer" @model-updated="onModelUpdated">
                </vue-form-generator>
              </b-tab>
            </b-tabs>

            <!-- Buttons -->
            <div class="my-3">
              <div class="float-left">
                <button v-if="!tabIndex==0" @click="tabIndex--" type="button" class="btn btn-primary btn-fill btn-md">
                  <div class="fa fa-step-backward" /> &nbsp; Previous
                </button>
              </div>
              <div class="float-right">
                <button v-if="tabIndex < 5" @click="tabIndex++" type="button" class="btn btn-info btn-fill btn-md">
                  Next <div class="fa fa-step-forward" />
                </button>

                <button v-if="tabIndex==5" @click="showLargeModal = true" type="button" class="ml-2 btn btn-warning btn-fill btn-md">
                  <div class="fa fa-play-circle" /> &nbsp;Preview
                </button>

                <button v-if="tabIndex==5" @click="validateForm" type="submit" class="ml-2 btn btn-primary btn-fill btn-md">
                  <div class="fa fa-paper-plane" /> &nbsp;Submit
                </button>
              </div>
            </div>
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
              <!-- RISK FACTORS -->
              <h5 class="sh-tab-title">1. Risk Factors</h5>
              <vue-form-generator class="read-only" :model="model" :schema="tabASchema"></vue-form-generator>

              <!-- PROTECTIVE FACTORS -->
              <h5 class="sh-tab-title">2. Protective Factors</h5>
              <vue-form-generator class="read-only" :model="model" :schema="tabBSchema"></vue-form-generator>

              <!-- THE SELF-HARM ACT AND SUICIDAL INTENT -->
              <h5 class="sh-tab-title">3. The Self-Harm Act and Suicidal Intent</h5>
              <h6 class="sh-sub-title">Section A : CURRENT SELF-HARM ACT (within past 2 weeks from time of presentation)</h6>
              <vue-form-generator class="read-only" :model="model" :schema="tabCASchema"></vue-form-generator>
              <h6 class="sh-sub-title">Section B: METHOD OF SELF-HARM (please document the recent method only)</h6>
              <h6 class="mt-3 mb-4 ml-3">Instruction: Please tick (/) in the box provided</h6>
              <div class="row">
                <div class="col-lg-auto">
                  <vue-form-generator class="read-only" :schema="tabCB1Schema" :model="model"></vue-form-generator>
                </div>
                <div class="col-lg">
                  <vue-form-generator class="read-only" :schema="tabCB2Schema" :model="model"></vue-form-generator>
                </div>
              </div>
              <h6 class="sh-sub-title">Section C: HOW DID PATIENT GET IDEA ABOUT METHOD</h6>
              <h6 class="mt-3 mb-4 ml-3">Instruction: Please tick (/) in the box provided</h6>
              <vue-form-generator class="read-only" :schema="tabCCSchema" :model="model"></vue-form-generator>
              <h6 class="sh-sub-title">Section D: SUICIDAL INTENT</h6>
              <div class="row mt-3">
                <div class="col-lg-3 mt-2">
                  <vue-form-generator class="read-only" :schema="tabCD1Schema" :model="model"></vue-form-generator>
                </div>
                <div class="col-lg">
                  <vue-form-generator class="read-only" :schema="tabCD2Schema" :model="model"></vue-form-generator>
                </div>
              </div>
              <h6 class="sh-sub-title">Section E: LEVEL OF SUICIDAL INTENT (Beck's Suicide Intent Scale)</h6>
              <vue-form-generator class="read-only" :schema="tabCESchema" :model="model"></vue-form-generator>
              <vue-form-generator class="read-only mt-3" :schema="totalScoreSchema" :model="model"></vue-form-generator>

              <!-- SUICIDE RISK -->
              <h5 class="sh-tab-title">4. Suicide Risk</h5>
              <b class="p-3">Level of Suicide Risk for Current Attempt</b>
              <vue-form-generator class="read-only m-4 box" :model="model" :schema="tabDSchema"></vue-form-generator>

              <!-- HOSPITAL MANAGEMENT -->
              <h5 class="sh-tab-title">5. Hospital Management</h5>
              <vue-form-generator class="read-only" :model="model" :schema="tabESchema"></vue-form-generator>

              <!-- SOURCE DATA PRODUCER -->
              <h5 class="sh-tab-title">6. Source Data Producer</h5>
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

// register globally
export default {
  name: 'modals',
  components: {
  },
  data () {
    return {
      tabIndex: 1,

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
      selectOccurance: [
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

      selectOverdoseType: [
        { name: 'Medications, specify', id: 1 },
        { name: 'Illicit substances, specify', id: 2 },
        { name: 'Chemicals (including pesticides), specify', id: 3 },
      ],

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
        SH_DATE: '',
        SH_TIME: '',
        OCCUR: '',
        OCCUR_OTHER_SPECIFY: '',
        METHOD: [],
        OVERDOSE_TYPE: '',
        OVERDOSE_TYPE_SPECIFY: '',
        METHOD_OTHER_SPECIFY: '',
        IDEA: [],
        IDEA_SPECIFY: '',
        INTENT: 2,
        INTENT_YES: [],
        INTENT_OTHER_SPECIFY: '',
        INTENTS: [],
        INTENT_SCORE: '',
        INTENT_LEVEL: '',

        // Suicide Risk
        RISK_LEVEL: '',

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
      // RISK FACTORS
      tabASchema: {
        groups: [
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'label',
                label: '1. Presence of psychiatric disorder',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'Q1',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto display-inline',
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
                styleClasses: 'col-md',
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
                type: 'label',
                label: '2. Hopelessness or despair',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'Q2',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto display-inline',
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'label',
                label: '3. Previous suicide attempt',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'Q3',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto display-inline',
              },
              {
                type: 'input',
                inputType: 'number',
                placeholder: 'Please specify (times)',
                model: 'Q3_SPECIFY',
                min: 0,
                required: true,
                validator: 'number',
                styleClasses: 'col-md',
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
                type: 'label',
                label: '4. Presence of substance use/abuse',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'Q4',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto display-inline',
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
                styleClasses: 'col-md mb-0',
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
                type: 'label',
                label: '5. Family history of suicidal behaviour',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'Q5',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto display-inline',
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'label',
                label: '6. Family history of psychiatric disorder',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'Q6',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto display-inline',
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
                styleClasses: 'col-md',
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
                type: 'label',
                label: '7. Family histroy of substance abuse',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'Q7',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto display-inline',
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
                styleClasses: 'col-md',
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
                type: 'label',
                label: '8. Stressful life events',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'Q8',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto display-inline',
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
                styleClasses: 'col-md',
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
                type: 'label',
                label: '9. Isolation, rejection, or feelings of shame',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'Q9',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto display-inline',
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'label',
                label: '10. Chronic physical illness or condition',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'Q10',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto display-inline',
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
                styleClasses: 'col-md',
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
                type: 'label',
                label: '11. History of physical, sexual or emotional abuse',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'Q11',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto display-inline',
              },
            ],
          },
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'label',
                label: '12. Access to lethal methods/weapons',
                styleClasses: 'col-md-6',
              },
              {
                type: 'radios',
                model: 'Q12',
                values: [
                  { name: 'No', value: 0 },
                  { name: 'Yes', value: 1 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto display-inline',
              },
            ],
          },
        ],
      },
      // PROTECTIVE FACTORS
      tabBSchema: {
        fields: [
          {
            type: 'label',
            label: '1. Ability to cope with stress/tolerate frustrations',
            styleClasses: 'col-md-6',
          },
          {
            type: 'radios',
            model: 'PQ1',
            values: [
              { name: 'No', value: 0 },
              { name: 'Yes', value: 1 },
            ],
            required: true,
            validator: 'required',
            styleClasses: 'col-md-6 display-inline',
          },
          {
            type: 'label',
            label: '2. Strongly held religious/cultural beliefs',
            styleClasses: 'col-md-6',
          },
          {
            type: 'radios',
            model: 'PQ2',
            values: [
              { name: 'No', value: 0 },
              { name: 'Yes', value: 1 },
            ],
            required: true,
            validator: 'required',
            styleClasses: 'col-md-6 display-inline',
          },
          {
            type: 'label',
            label: '3. Realistic life goals or future plans',
            styleClasses: 'col-md-6',
          },
          {
            type: 'radios',
            model: 'PQ3',
            values: [
              { name: 'No', value: 0 },
              { name: 'Yes', value: 1 },
            ],
            required: true,
            validator: 'required',
            styleClasses: 'col-md-6 display-inline',
          },
          {
            type: 'label',
            label: '4. Responsibility to children/beloved pets',
            styleClasses: 'col-md-6',
          },
          {
            type: 'radios',
            model: 'PQ4',
            values: [
              { name: 'No', value: 0 },
              { name: 'Yes', value: 1 },
            ],
            required: true,
            validator: 'required',
            styleClasses: 'col-md-6 display-inline',
          },
          {
            type: 'label',
            label: '5. Social support',
            styleClasses: 'col-md-6',
          },
          {
            type: 'radios',
            model: 'PQ5',
            values: [
              { name: 'No', value: 0 },
              { name: 'Yes', value: 1 },
            ],
            required: true,
            validator: 'required',
            styleClasses: 'col-md-6 display-inline',
          },
          {
            type: 'label',
            label: '6. Positive therapeutic relationship',
            styleClasses: 'col-md-6',
          },
          {
            type: 'radios',
            model: 'PQ6',
            values: [
              { name: 'No', value: 0 },
              { name: 'Yes', value: 1 },
            ],
            required: true,
            validator: 'required',
            styleClasses: 'col-md-6 display-inline',
          },
        ],
      },
      // THE SELF-HARM ACT AND SUICIDAL INTENT
      // -Section A (1)
      tabCASchema: {
        fields: [
          {
            type: 'input',
            inputType: 'date',
            label: 'Date',
            model: 'SH_DATE',
            format: 'YYYY-MM-DD',
            styleClasses: 'col-sm-6',
            required: true,
            validator: 'required',
          },
          {
            type: 'input',
            inputType: 'time',
            label: 'Time',
            model: 'SH_TIME',
            styleClasses: 'col-sm-6',
            required: true,
            validator: 'required',
          },
          {
            type: 'select',
            label: 'Place of Occurance',
            model: 'OCCUR',
            values: () => {
              return this.selectOccurance
            },
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
            label: 'Specify',
            model: 'OCCUR_OTHER_SPECIFY',
            placeholder: 'Other specified areas',
            styleClasses: 'col-sm-3',
            visible: function (model) {
              return model && model.OCCUR === 99
            },
            required: true,
            validator: 'string',
          },
        ],
      },
      // -Section B (2)
      tabCB1Schema: {
        fields: [
          {
            type: 'checklist',
            model: 'METHOD',
            values: [
              { value: 1, name: 'Overdose / Poisoning' },
              { value: 2, name: 'Hanging / suffocation' },
              { value: 3, name: 'Drowning' },
              { value: 4, name: 'Firearms or explosives' },
              { value: 5, name: 'Fire / flames' },
              { value: 6, name: 'Cutting or Piercing' },
              { value: 7, name: 'Jumping from height' },
              { value: 99, name: 'Others, specify' },
            ],
            listBox: true,
            required: true,
            validator: 'array',
            styleClasses: 'col-md-auto',
          },
        ],
      },
      tabCB2Schema: {
        fields: [
          {
            type: 'select',
            model: 'OVERDOSE_TYPE',
            values: () => {
              return this.selectOverdoseType
            },
            selectOptions: {
              hideNoneSelectedText: true,
            },
            visible: function (model) {
              return model && model.METHOD.includes(1)
            },
            required: true,
            validator: 'required',
            styleClasses: 'col-md-6',
          },
          {
            type: 'input',
            inputType: 'text',
            model: 'OVERDOSE_TYPE_SPECIFY',
            placeholder: 'Specify overdose type',
            visible: function (model) {
              if (model.METHOD.includes(1)) {
                return model && (model.OVERDOSE_TYPE === 1 || model.OVERDOSE_TYPE === 2 || model.OVERDOSE_TYPE === 3)
              }
            },
            required: true,
            validator: 'string',
            styleClasses: 'col-md-6',
          },
          {
            type: 'input',
            inputType: 'text',
            model: 'METHOD_OTHER_SPECIFY',
            placeholder: 'Others, specify',
            visible: function (model) {
              return model && model.METHOD.includes(99)
            },
            required: true,
            validator: 'string',
            styleClasses: 'col-md-6',
          },
        ],
      },
      // -Section C (1)
      tabCCSchema: {
        fields: [
          {
            type: 'checklist',
            model: 'IDEA',
            values: [
              { value: 1, name: 'Family, friend, peer group' },
              { value: 2, name: 'Internet (website, social media platform, app, blog, forum, video/photosharing)' },
              { value: 3, name: 'Printed media (newspaper, books, magazine, etc)' },
              { value: 4, name: 'Broadcast media (television, radio)' },
              { value: 99, name: 'Specify patient actual words' },
            ],
            listBox: true,
            required: true,
            validator: 'array',
            styleClasses: 'col-sm-auto',
          },
          {
            type: 'input',
            inputType: 'text',
            model: 'IDEA_SPECIFY',
            placeholder: 'Specify patient actual words',
            styleClasses: 'col-sm-4',
            visible: function (model) {
              return model && model.IDEA.includes(99)
            },
            required: true,
            validator: 'string',
          },
        ],
      },
      // -Section D (2)
      tabCD1Schema: {
        fields: [
          {
            type: 'radios',
            label: 'Was there an intent?',
            model: 'INTENT',
            values: [
              { value: 1, name: 'No' },
              { value: 2, name: 'Yes' },
              { value: 3, name: 'Undetermined' },
            ],
            required: true,
            validator: 'required',
            styleClasses: 'col-xl-auto',
          },
        ],
      },
      tabCD2Schema: {
        fields: [
          {
            type: 'label',
            label: '<h6 class="mt-3 mb-4">Instruction: Please tick (/) in the box<br>If yes, mode of expression (can tick more than 1)</h6>',
            visible: function (model) {
              return model && model.INTENT === 2
            },
          },
          {
            type: 'checklist',
            model: 'INTENT_YES',
            values: [
              { value: 1, name: 'Verbal' },
              { value: 2, name: 'Messaging' },
              { value: 3, name: 'Rehearsing' },
              { value: 4, name: 'Not expressed' },
              { value: 5, name: 'Handwritten' },
              { value: 6, name: 'Social Media' },
              { value: 7, name: 'Efforts to learn more' },
              { value: 99, name: 'Others, specify' },
            ],
            listBox: true,
            visible: function (model) {
              return model && model.INTENT === 2
            },
            required: true,
            validator: 'array',
            styleClasses: 'col-sm-auto',
          },
          {
            type: 'input',
            inputType: 'text',
            model: 'INTENT_OTHER_SPECIFY',
            placeholder: 'Please specify',
            visible: function (model) {
              if (model.INTENT === 2) {
                return model && model.INTENT_YES.includes(99)
              }
            },
            required: true,
            validator: 'string',
            styleClasses: 'col-sm-4',
          },
        ],
      },
      // -Section E (2)
      tabCESchema: {
        fields: [
          {
            type: 'radios',
            label: '<b>1. Isolation</b>',
            model: 'INTENTS[0]',
            values: [
              { value: 0, name: 'Somebody present' },
              { value: 1, name: 'Somebody nearby, or in visual or vocal contact' },
              { value: 2, name: 'No one nearby or in visual or vocal contact' },
            ],
            onChanged: function (model) {
              model.INTENT_SCORE = ''
              model.INTENT_LEVEL = ''
            },
            required: true,
            validator: 'required',
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>2. Timing</b>',
            model: 'INTENTS[1]',
            values: [
              { value: 0, name: 'Intervention is probable' },
              { value: 1, name: 'Intervention is not likely' },
              { value: 2, name: 'Intervention is highly unlikely' },
            ],
            onChanged: function (model) {
              model.INTENT_SCORE = ''
              model.INTENT_LEVEL = ''
            },
            required: true,
            validator: 'required',
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>3. Precautions against discovery / intervention</b>',
            model: 'INTENTS[2]',
            values: [
              { value: 0, name: 'No precautions' },
              { value: 1, name: 'Passive precautions (eg; alone in room with unlocked door)' },
              { value: 2, name: 'Active precautions (as locked door)' },
            ],
            onChanged: function (model) {
              model.INTENT_SCORE = ''
              model.INTENT_LEVEL = ''
            },
            required: true,
            validator: 'required',
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>4. Acting to get help during / after attempt</b>',
            model: 'INTENTS[3]',
            values: [
              { value: 0, name: 'Notified potential helper regarding attempt' },
              { value: 1, name: 'Contacted but did not specifically notify regarding attempt' },
              { value: 2, name: 'Did not contact or notify potential helper' },
            ],
            onChanged: function (model) {
              model.INTENT_SCORE = ''
              model.INTENT_LEVEL = ''
            },
            required: true,
            validator: 'required',
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>5. Final acts in anticipating of death (will, gifts, insurance)</b>',
            model: 'INTENTS[4]',
            values: [
              { value: 0, name: 'None' },
              { value: 1, name: 'Thought about or made some arrangements' },
              { value: 2, name: 'Made definite plans or completed arrangements' },
            ],
            onChanged: function (model) {
              model.INTENT_SCORE = ''
              model.INTENT_LEVEL = ''
            },
            required: true,
            validator: 'required',
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>6. Active preparation for attempt</b>',
            model: 'INTENTS[5]',
            values: [
              { value: 0, name: 'None' },
              { value: 1, name: 'Minimal to moderate' },
              { value: 2, name: 'Extensive' },
            ],
            onChanged: function (model) {
              model.INTENT_SCORE = ''
              model.INTENT_LEVEL = ''
            },
            required: true,
            validator: 'required',
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>7. Suicide note</b>',
            model: 'INTENTS[6]',
            values: [
              { value: 0, name: 'Absence of note' },
              { value: 1, name: 'Note written, but torn up; note thought about' },
              { value: 2, name: 'Presence of note' },
            ],
            onChanged: function (model) {
              model.INTENT_SCORE = ''
              model.INTENT_LEVEL = ''
            },
            required: true,
            validator: 'required',
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>8. Overt communication of intent before the attempt</b>',
            model: 'INTENTS[7]',
            values: [
              { value: 0, name: 'None' },
              { value: 1, name: 'Equivocal communication' },
              { value: 2, name: 'Unequivocal communication' },
            ],
            onChanged: function (model) {
              model.INTENT_SCORE = ''
              model.INTENT_LEVEL = ''
            },
            required: true,
            validator: 'required',
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>9. Allged purpose of attempt</b>',
            model: 'INTENTS[8]',
            values: [
              { value: 0, name: 'To manipulate environment, get attention, get revenge' },
              { value: 1, name: 'Components of above and below' },
              { value: 2, name: 'To escape, surcease, solve problems' },
            ],
            onChanged: function (model) {
              model.INTENT_SCORE = ''
              model.INTENT_LEVEL = ''
            },
            required: true,
            validator: 'required',
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>10. Expectations of fatality</b>',
            model: 'INTENTS[9]',
            values: [
              { value: 0, name: 'Thought that death was unlikely' },
              { value: 1, name: 'Thought that death was possible but not probable' },
              { value: 2, name: 'Thought that death was probable or certain' },
            ],
            onChanged: function (model) {
              model.INTENT_SCORE = ''
              model.INTENT_LEVEL = ''
            },
            required: true,
            validator: 'required',
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: "<b>11. Conception of method's lethality</b>",
            model: 'INTENTS[10]',
            values: [
              { value: 0, name: 'Did less to self that s/he thought would be lethal' },
              { value: 1, name: "Wasn't sure if what s/he did would be lethal" },
              { value: 2, name: 'Equaled or exceed what s/he thought would be lethal' },
            ],
            onChanged: function (model) {
              model.INTENT_SCORE = ''
              model.INTENT_LEVEL = ''
            },
            required: true,
            validator: 'required',
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>12. Seriousness of attempt</b>',
            model: 'INTENTS[11]',
            values: [
              { value: 0, name: 'Did not seriously attempt to end life' },
              { value: 1, name: 'Uncertain about seriousness to end life' },
              { value: 2, name: 'Seriously attempted to end life' },
            ],
            onChanged: function (model) {
              model.INTENT_SCORE = ''
              model.INTENT_LEVEL = ''
            },
            required: true,
            validator: 'required',
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>13. Attitude towards living/dying</b>',
            model: 'INTENTS[12]',
            values: [
              { value: 0, name: 'Did not want to die' },
              { value: 1, name: 'Components of above and below' },
              { value: 2, name: 'Wanted to die' },
            ],
            onChanged: function (model) {
              model.INTENT_SCORE = ''
              model.INTENT_LEVEL = ''
            },
            required: true,
            validator: 'required',
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>14. Conception of medical rescuability</b>',
            model: 'INTENTS[13]',
            values: [
              { value: 0, name: 'Thought death would be unlikely if received medical attention' },
              { value: 1, name: 'Was uncertain if death could be averted by medical attention' },
              { value: 2, name: 'Was certain of death even if received medical attention' },
            ],
            onChanged: function (model) {
              model.INTENT_SCORE = ''
              model.INTENT_LEVEL = ''
            },
            required: true,
            validator: 'required',
            styleClasses: ['my-3', 'col-xl-6'],
          },
          {
            type: 'radios',
            label: '<b>15. Degree of premeditation</b>',
            model: 'INTENTS[14]',
            values: [
              { value: 0, name: 'None; impulsive' },
              { value: 1, name: 'Suicide contemplated for 3 hours or less prior to attempt' },
              { value: 2, name: 'Suicide contemplated for more than 3 hours prior to attempt' },
            ],
            onChanged: function (model) {
              model.INTENT_SCORE = ''
              model.INTENT_LEVEL = ''
            },
            required: true,
            validator: 'required',
            styleClasses: ['my-3', 'col-xl-12'],
          },
        ],
      },
      totalScoreSchema: {
        fields: [
          {
            type: 'input',
            inputType: 'number',
            label: 'Total Score',
            placeholder: 'Click Calculate',
            model: 'INTENT_SCORE',
            required: true,
            validator: 'integer',
            styleClasses: 'col-md-3 read-only',
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Level of Suicidal Intent',
            placeholder: 'Click Calculate',
            model: 'INTENT_LEVEL',
            required: true,
            validator: 'string',
            styleClasses: 'col-md-3 read-only',
          },
          {
            type: 'submit',
            buttonText: 'Calculate',
            onSubmit: (model) => {
              var errors = this.validateTabCE()
              if (errors) {
                var score = 0
                for (let i = 0; i < model.INTENTS.length; i++) {
                  score += model.INTENTS[i]
                }
                model.INTENT_SCORE = score

                if (model.INTENT_SCORE <= 10) {
                  model.INTENT_LEVEL = 'Low Intent'
                } else if (model.INTENT_SCORE > 10 && model.INTENT_SCORE <= 20) {
                  model.INTENT_LEVEL = 'Medium Intent'
                } else {
                  model.INTENT_LEVEL = 'High Intent'
                }
              }
            },
            styleClasses: 'col-md-auto margin-top',
          },
        ],

      },

      // SUICIDE RISK
      tabDSchema: {
        groups: [
          {
            fields: [
              {
                type: 'radios',
                values: [
                  { value: 1, name: 'High' },
                ],
                model: 'RISK_LEVEL',
                required: true,
                styleClasses: 'col-3',
              },
              {
                type: 'label',
                label: 'Psychiatric diagnoses with severe symptoms or acute precipitating events; protective factors not relevant; high suicidal intent',
                styleClasses: 'col-9',
              },
            ],
          },
          {
            fields: [
              {
                type: 'radios',
                values: [
                  { value: 2, name: 'Moderate' },
                ],
                model: 'RISK_LEVEL',
                required: true,
                styleClasses: 'col-3',
              },
              {
                type: 'label',
                label: 'Multiple risk factors, few protective factors, moderate suicidal intent',
                styleClasses: 'col-9',
              },
            ],
          },
          {
            fields: [
              {
                type: 'radios',
                values: [
                  { value: 3, name: 'Low' },
                ],
                model: 'RISK_LEVEL',
                required: true,
                validator: 'required',
                styleClasses: 'col-3',
              },
              {
                type: 'label',
                label: 'Modifiable risk factors, strong protective factors, no or low suicidal intent',
                styleClasses: 'col-9',
              },
            ],
          },
        ],
      },
      // HOSPITAL MANAGEMENT
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

      // SOURCE DATA PRODUCER
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
      this.validateTabCA()
      this.validateTabCB1()
      this.validateTabCB2()
      this.validateTabCC()
      this.validateTabCD1()
      this.validateTabCD2()
      this.validateTabCE()
      this.validateTotalScore()
    },
    validateTabCA () {
      var errors = this.$refs.selfHarmSectionA.validate()
      return errors
    },
    validateTabCB1 () {
      var errors = this.$refs.selfHarmSectionB1.validate()
      return errors
    },
    validateTabCB2 () {
      var errors = this.$refs.selfHarmSectionB2.validate()
      return errors
    },
    validateTabCC () {
      var errors = this.$refs.selfHarmSectionC.validate()
      return errors
    },
    validateTabCD1 () {
      var errors = this.$refs.selfHarmSectionD1.validate()
      return errors
    },
    validateTabCD2 () {
      var errors = this.$refs.selfHarmSectionD2.validate()
      return errors
    },
    validateTabCE () {
      var errors = this.$refs.selfHarmSectionE.validate()
      return errors
    },
    validateTotalScore () {
      var errors = this.$refs.totalScore.validate()
      return errors
    },

    validateTabD () {
      var errors = this.$refs.suicideRisk.validate()
      return errors
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
  .app-layout__main {
    background: hsl(0, 0%, 91%);
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

  ul.va-unordered > li,
  .content ul > li {
    padding-left: 0;
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

  .sh-tab-title {
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 10px;
    background-color: #bf1304;
    border-radius: 10px;
    color: white;
  }

  .sh-sub-title {
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 10px;
    background-color: #f0ecec;
    border-radius: 10px;
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

  // .vue-form-generator .field-radios .radio-list label{
  //   display: inline-table;
  //   margin-right: 1rem;
  // }

  .box {
    border: 1px solid #918f8d;
    padding: 20px;
    border-radius: 10px;
  }

  .vue-form-generator .field-checklist .listbox {
    height: auto;
    max-height: 500px;
    overflow: auto;
  }

  .nav-tabs .nav-link {
    border: 1px solid #918f8d;
    color: #918f8d;
  }

  .nav-tabs .nav-link:hover {
    border: 1px solid #bf1304;
    color: #bf1304;
  }

  .nav-tabs .nav-link.active {
    background-color: #bf1304;
    color: #ffffff;
    border: 1px solid #bf1304;
  }

  .margin-top {
    margin-top: 31px;
  }

</style>
