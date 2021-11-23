<template>
  <div class="content">
    <div class="container-fluid">

      <div class="row">
        <div class="col-12">

          <!-- Form -->
          <va-card>
            <br>
            <b-tabs content-class="mt-3">
              <b-tab title="Tab A">
                <p>I'm the first tab</p>
              </b-tab>
              <b-tab title="Tab B">
                <p>I'm the second tab</p>
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
                <vue-form-generator :schema="tabDSchema" :model="model" :options="formOptions"></vue-form-generator>
              </b-tab>
              <b-tab title="Tab E">
                <p>I'm the first tab</p>
              </b-tab>
              <b-tab title="Tab F">
                <p>I'm the second tab</p>
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

      // Protective Factors Data

      // The Self-harm Act and Suicidal Intent Data

      // Suicide Risk Data

      // Hospital Management Data

      // Source Data Producer Data

      model: {
        // Risk Factors

        // Protective Factors

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

        // Source Data Producer

      },
      // Risk Factors
      tabASchema: {
        fields: [

        ],
      },
      // Protective Factors
      tabBSchema: {
        fields: [

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
