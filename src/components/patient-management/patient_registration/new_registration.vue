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
              <button type="button" class="btn close-button" @click="hideNoti('tabA')">
                <span class="fa fa-close"/>
              </button>
            </va-notification>
          </div>
          <div class="mb-3" v-if="tabB==true">
            <va-notification color="danger">
              <va-badge color="danger">
                {{ $t('Incomplete') }}
              </va-badge>
              <span>Please fill all <b> Sosio Demographic </b> required fields.</span>
              <button type="button" class="btn close-button" @click="hideNoti('tabB')">
                <span class="fa fa-close"/>
              </button>
            </va-notification>
          </div>
          <div class="mb-3" v-if="tabC==true">
            <va-notification color="danger">
              <va-badge color="danger">
                {{ $t('Incomplete') }}
              </va-badge>
              <span>Please fill all <b> Next of Kin </b> required fields.</span>
              <button type="button" class="btn close-button" @click="hideNoti('tabC')">
                <span class="fa fa-close"/>
              </button>
            </va-notification>
          </div>
          <div class="mb-3" v-if="tabD==true">
            <va-notification color="danger">
              <va-badge color="danger">
                {{ $t('Incomplete') }}
              </va-badge>
              <span>Please fill all <b> Allergy </b> required fields.</span>
              <button type="button" class="btn close-button" @click="hideNoti('tabD')">
                <span class="fa fa-close"/>
              </button>
            </va-notification>
          </div>

          <!-- Form -->
          <va-card>
            <form-wizard  color="#f2a444" error-color="#a94442" ref="wizard">
              <h3 slot="title"></h3>

              <!-- 1st tab: Demographic-->
              <tab-content icon="fa fa-user-circle-o" title="1. Demographic">
                <vue-form-generator :model="model" :schema="tabASchema" :options="formOptions" ref="demographic" @model-updated="onModelUpdated">
                </vue-form-generator>
              </tab-content>

              <!-- 2nd tab: Socio Demographic-->
              <tab-content icon="fa fa-vcard" title="2. Socio Demographic">
                <vue-form-generator :model="model" :schema="tabBSchema" :options="formOptions" ref="socioDemographic" @model-updated="onModelUpdated" >
                </vue-form-generator>
              </tab-content>

              <!-- 3rd tab: Next of Kin-->
              <tab-content icon="fa fa-group" title="3. Next of Kin">
                <vue-form-generator :model="model" :schema="tabCSchema" :options="formOptions" ref="nextOfKin" @model-updated="onModelUpdated" >
                </vue-form-generator>
              </tab-content>

              <!-- 4th tab: Allergy-->
              <tab-content icon="fa fa-info" title="4. Allergy">
                <vue-form-generator :model="model" :schema="tabDSchema" :options="formOptions" ref="allergy" @model-updated="onModelUpdated">
                </vue-form-generator>
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
                    <div class="fa fa-step-backward" /> &nbsp; Previous
                  </button>
                </div>

                <div class="float-right">
                  <button v-if="!isLastStep" @click="nextTab" type="button" class="btn btn-info btn-fill btn-md">
                    Next <div class="fa fa-step-forward" />
                  </button>

                  <button v-if="isLastStep" @click="showLargeModal = true" type="button" class="ml-2 btn btn-warning btn-fill btn-md">
                    <div class="fa fa-play-circle" /> &nbsp;Preview
                  </button>

                  <button v-if="isLastStep" @click="validateForm" type="submit" class="ml-2 btn btn-primary btn-fill btn-md">
                    <div class="fa fa-paper-plane" /> &nbsp;Submit
                  </button>
                </div>
              </template>
            </form-wizard>
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
              <h5 class="tab-title">1. Demographic</h5>
              <vue-form-generator class="read-only" :model="model" :schema="tabAModalSchema"></vue-form-generator>
              <h5 class="tab-title">2. Sosio Demographic</h5>
              <vue-form-generator class="sosio-margin read-only" :model="model" :schema="tabBSchema"></vue-form-generator>
              <h5 class="tab-title">3. Next of Kin</h5>
              <vue-form-generator class="read-only" :model="model" :schema="tabCSchema"></vue-form-generator>
              <h5 class="tab-title">4. Allergy</h5>
              <vue-form-generator class="read-only" :model="model" :schema="tabDModalSchema"></vue-form-generator>
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

      show: true,
      showLargeModal: false,

      submitPath: false,

      // Demographic  Data
      selectSalutation: [],
      radioCitizenship: [],
      selectNRICType: [],
      radioGender: [],
      selectServiceType: [],
      selectReferralType: [],
      selectIssuingCountry: [],
      selectState: [],
      selectDMCity: [],
      selectDMPostcode: [],
      selectBranch: [],

      // Socio Demographic Data
      selectRace: [],
      selectReligion: [],
      selectMaritalStatus: [],
      selectAccommodation: [],
      selectEducationLevel: [],
      selectOccupationStatus: [],
      selectFeeExemptionStatus: [],
      selectOccupationSector: [],

      // Next of Kin Data
      selectRelationship: [],

      // Allergy Data
      radioAllergy: [
        { name: 'Yes', value: 1 },
        { name: 'No', value: 0 },
      ],

      // Form Model
      model: {
        // Demographic
        SALUTATION: '',
        DM_NAME: '',
        CITIZENSHIP: '',
        NRIC_TYPE: '',
        NRIC_NO: '',
        PASSPORT_NO: '',
        PASSPORT_EXPIRY_DATE: '',
        ISSUING_COUNTRY: '',
        GENDER: '',
        BIRTH_DATE: '',
        AGE: '',
        DM_MOBILE_NO: '',
        DM_HOUSE_NO: '',
        HOSPITAL_MRN: '',
        MENTARI_MRN: '',
        SERVICE_TYPE: '',
        REFERRAL_TYPE: '',
        SPECIFY_REFERRAL: '',
        REFERRAL_LETTER: [],
        DM_ADDRESS_LINE_1: '',
        DM_ADDRESS_LINE_2: '',
        DM_ADDRESS_LINE_3: '',
        DM_POSTCODE: '',
        DM_CITY: '',
        DM_STATE: '',
        EXISTING_PATIENT: '',
        BRANCH: '',

        // Socio Demographic
        RACE: '',
        SPECIFY_RACE: '',
        RELIGION: '',
        SPECIFY_RELIGION: '',
        MARITAL_STATUS: '',
        SPECIFY_MARITAL_STATUS: '',
        ACCOMMODATION: '',
        SPECIFY_ACCOMMODATION: '',
        EDUCATION_LEVEL: '',
        OCCUPATION_STATUS: '',
        SPECIFY_OCCUPATION_STATUS: '',
        FEE_EXEMPTION_STATUS: '',
        SPECIFY_FEE_EXEMPTION_STATUS: '',
        OCCUPATION_SECTOR: '',
        SPECIFY_OCCUPATION_SECTOR: '',

        // Next Of Kin
        NOK_NAME: '',
        NOK_RELATIONSHIP: '',
        NOK_MOBILE_NO: '',
        NOK_HOUSE_NO: '',
        NOK_ADDRESS_L1: '',
        NOK_ADDRESS_L2: '',
        // NOK_ADDRESS_L3: "",
        NOK_STATE: '',
        NOK_CITY: '',
        NOK_POSTCODE: '',

        // Allergy
        ALLERGY: [],
        DRUG_ALL_SPECIFY: '',
        SUPP_ALL_SPECIFY: '',
        OTHERS_SPECIFY: '',

        // Preview Modal
        MD_CITIZENSHIP: '',
        MD_EXISTING_PATIENT: '',
        MD_GENDER: '',
        MD_ALLERGY: [],

        selectCity: [],
        selectPostcode: [],
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
            styleClasses: 'col-md-3',
            values: () => {
              return this.selectSalutation
            },
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Name (as in NRIC)',
            model: 'DM_NAME',
            validator: 'string',
            required: true,
            styleClasses: 'col-md-9',
          },
          {
            type: 'radios',
            label: 'Citizenship',
            model: 'CITIZENSHIP',
            required: true,
            validator: 'required',
            styleClasses: 'col-md-12',
            values: () => {
              return this.radioCitizenship
            },
            onChanged: function (model) {
              model.MD_CITIZENSHIP = model.CITIZENSHIP
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
            styleClasses: 'col-md-6',
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
            styleClasses: 'col-md-6',
            visible: function (model) {
              return model && (model.NRIC_TYPE.value === 2 || model.CITIZENSHIP === 2)
            },
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'NRIC NO',
            model: 'NRIC_NO',
            validator: 'string',
            required: true,
            styleClasses: 'col-md-6',
            visible: function (model) {
              return model && (model.NRIC_TYPE.value === 1 || model.NRIC_TYPE.value === 3 || model.NRIC_TYPE.value === 4 ||
                              model.NRIC_TYPE.value === 5 || model.NRIC_TYPE.value === 6 || model.NRIC_TYPE.value === 7 ||
                              model.NRIC_TYPE.value === 8 || model.NRIC_TYPE.value === 9 || model.NRIC_TYPE.value === 10 ||
                              model.NRIC_TYPE.value === 11)
            },
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Passport NO',
            model: 'PASSPORT_NO',
            validator: 'string',
            required: true,
            styleClasses: 'col-md-4',
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
            styleClasses: 'col-md-4',
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
            styleClasses: 'col-md-4',
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
            styleClasses: 'col-12',
            values: () => {
              return this.radioGender
            },
            onChanged: function (model) {
              model.MD_GENDER = model.GENDER
            },
          },
          {
            type: 'input',
            inputType: 'date',
            label: 'Date of Birth',
            model: 'BIRTH_DATE',
            placeholder: 'Enter Date',
            required: true,
            format: 'YYYY/MM/DD',
            styleClasses: 'col-md-6',
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
            styleClasses: 'col-md-6',
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
            styleClasses: 'col-md-6',
          },
          {
            type: 'cleave',
            label: 'House Phone Number',
            model: 'DM_HOUSE_NO',
            cleaveOptions: {
              phone: true,
              phoneRegionCode: 'MY',
            },
            validator: 'required',
            styleClasses: 'col-md-6',
          },
          {
            type: 'input',
            inputType: 'text',
            label: "Hospital's MRN Number",
            model: 'HOSPITAL_MRN',
            validator: 'string',
            required: true,
            styleClasses: 'col-md-6',
          },
          {
            type: 'input',
            inputType: 'text',
            label: "Mentari's MRN Number",
            model: 'MENTARI_MRN',
            validator: 'string',
            required: true,
            styleClasses: 'col-md-6',
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
            styleClasses: 'col-md-4',
            values: () => {
              return this.selectServiceType
            },
          },
          {
            type: 'vueMultiSelect',
            placeholder: 'Please select',
            label: 'Type of Referral',
            model: 'REFERRAL_TYPE',
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
            styleClasses: 'col-md-4',
            values: () => {
              return this.selectReferralType
            },
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'To Specify',
            model: 'SPECIFY_REFERRAL',
            validator: 'string',
            required: true,
            styleClasses: 'col-md-4',
            visible: function (model) {
              return model && model.REFERRAL_TYPE.value === 7
            },
          },
          {
            labels: 'Upload Referral Letter',
            accept: '.xlxs',
            multiple: true,
            text: 'Choose a File',
            model: 'REFERRAL_LETTER',
            type: 'vfg-custom-file-excel',
            styleClasses: 'col-md-6',
            hint: '*Please upload excel only (max file size 2MB)',
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Address',
            model: 'DM_ADDRESS_LINE_1',
            placeholder: 'Address line 1',
            validator: 'string',
            styleClasses: 'col-md-12',
          },
          {
            type: 'input',
            inputType: 'text',
            model: 'DM_ADDRESS_LINE_2',
            placeholder: 'Address line 2',
            validator: 'string',
            styleClasses: 'col-md-12',
          },
          {
            type: 'input',
            inputType: 'text',
            model: 'DM_ADDRESS_LINE_3',
            placeholder: 'Address line 3',
            validator: 'string',
            styleClasses: 'col-md-12',
          },
          {
            type: 'vueMultiSelect',
            placeholder: 'Please select',
            label: 'State',
            model: 'DM_STATE',
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
            onChanged: function (model) {
              this.$axios
                .get('http://127.0.0.1:8000/api/getDMCity?state_id=' + model.DM_STATE.id)
                .then((response) => {
                  model.selectDMCity = response.data.data
                })
            },
            values: () => {
              return this.selectState
            },
          },
          {
            type: 'vueMultiSelect',
            placeholder: 'Please select',
            label: 'City',
            model: 'DM_CITY',
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
            values: function (model) {
              return model.selectDMCity
            },
            onChanged: function (model) {
              this.$axios
                .get('http://127.0.0.1:8000/api/getDMPostcode?city_id=' + model.DM_CITY.id)
                .then((response) => {
                  model.selectDMPostcode = response.data.data
                })
            },
          },
          {
            type: 'vueMultiSelect',
            placeholder: 'Please select',
            label: 'Postcode',
            model: 'DM_POSTCODE',
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
            values: function (model) {
              return model.selectPostcode
            },
          },
        ],
        groups: [
          {
            styleClasses: ['row'],
            fields: [
              {
                type: 'radios',
                label: 'Is this person an existing patient?',
                model: 'EXISTING_PATIENT',
                required: true,
                values: [
                  { value: 1, name: 'Yes' },
                  { value: 2, name: 'No' },
                ],
                validator: 'required',
                styleClasses: 'col-md-6',
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Please select',
                label: 'Mentari Branch',
                model: 'BRANCH',
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
                  return this.selectBranch
                },
                visible: function (model) {
                  return model && model.EXISTING_PATIENT === 1
                },
                onChanged: function (model) {
                  model.MD_EXISTING_PATIENT = model.EXISTING_PATIENT
                },
              },
            ],
          },
        ],
      },
      // Sosio Demographic
      tabBSchema: {
        groups: [
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
                styleClasses: 'col-md-4',
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
                styleClasses: 'col-md-2',
                visible: function (model) {
                  return model && model.RACE.value === 4
                },
              },
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
                styleClasses: 'col-md-4',
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
                styleClasses: 'col-md-2',
                visible: function (model) {
                  return model && model.RELIGION.value === 4
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
                styleClasses: 'col-md-4',
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
                styleClasses: 'col-md-2',
                visible: function (model) {
                  return model && model.MARITAL_STATUS.value === 4
                },
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Please select',
                label: 'Accommodation',
                model: 'ACCOMMODATION',
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
                styleClasses: 'col-md-4',
                values: () => {
                  return this.selectAccommodation
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'To Specify',
                model: 'SPECIFY_ACCOMMODATION',
                validator: 'string',
                required: true,
                styleClasses: 'col-md-2',
                visible: function (model) {
                  return model && model.ACCOMMODATION.value === 4
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
                styleClasses: 'col-md-4',
                values: () => {
                  return this.selectEducationLevel
                },
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Please select',
                label: 'Occupation Status',
                model: 'OCCUPATION_STATUS',
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
                styleClasses: 'col-md-4',
                values: () => {
                  return this.selectOccupationStatus
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'To Specify',
                model: 'SPECIFY_OCCUPATION_STATUS',
                validator: 'string',
                required: true,
                styleClasses: 'col-md-2',
                visible: function (model) {
                  return model && model.OCCUPATION_STATUS.value === 4
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
                label: 'Fee Exemption Status',
                model: 'FEE_EXEMPTION_STATUS',
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
                styleClasses: 'col-md-4',
                values: () => {
                  return this.selectFeeExemptionStatus
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'To Specify',
                model: 'SPECIFY_FEE_EXEMPTION_STATUS',
                validator: 'string',
                required: true,
                styleClasses: 'col-md-2',
                visible: function (model) {
                  return model && model.FEE_EXEMPTION_STATUS.value === 4
                },
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Please select',
                label: 'Occupation Sector',
                model: 'OCCUPATION_SECTOR',
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
                styleClasses: 'col-md-4',
                values: () => {
                  return this.selectOccupationSector
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'To Specify',
                model: 'SPECIFY_OCCUPATION_SECTOR',
                validator: 'string',
                required: true,
                styleClasses: 'col-md-2',
                visible: function (model) {
                  return model && model.OCCUPATION_SECTOR.value === 4
                },
              },
            ],
          },
        ],
      },
      // Next Of Kin
      tabCSchema: {
        fields: [
          {
            type: 'input',
            inputType: 'text',
            label: 'Name (as in NRIC)',
            placeholder: 'Enter Full Name',
            model: 'NOK_NAME',
            required: true,
            validator: 'string',
            styleClasses: 'col-xl-8',
          },
          {
            type: 'vueMultiSelect',
            model: 'NOK_RELATIONSHIP',
            label: 'Relationship',
            placeholder: 'Please Select',
            selectOptions: {
              multiple: false,
              closeOnSelect: true,
              showLabels: false,
              key: 'value',
              label: 'name',
            },
            values: () => {
              return this.selectRelationship
            },
            required: true,
            validator: 'required',
            styleClasses: 'col-xl-4',
          },
          {
            type: 'cleave',
            label: 'Mobile Phone Number',
            model: 'NOK_MOBILE_NO',
            placeholder: 'Enter Mobile Phone Number',
            cleaveOptions: {
              phone: true,
              phoneRegionCode: 'MY',
            },
            required: true,
            validator: 'required',
            styleClasses: 'col-xl-4',
          },
          {
            type: 'cleave',
            label: 'House Phone Number',
            model: 'NOK_HOUSE_NO',
            placeholder: 'Enter House Phone Number',
            cleaveOptions: {
              phone: true,
              phoneRegionCode: 'MY',
            },
            validator: 'required',
            styleClasses: 'col-xl-4',
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Address',
            model: 'NOK_ADDRESS_L1',
            placeholder: 'Address Line 1',
            validator: 'string',
            styleClasses: 'col-xl-8',
          },
          {
            type: 'input',
            inputType: 'text',
            model: 'NOK_ADDRESS_L2',
            placeholder: 'Address Line 2',
            validator: 'string',
            styleClasses: 'col-xl-8',
          },
          // {
          //     type: 'input',
          //     inputType: 'text',
          //     model: 'NOK_ADDRESS_L3',
          //     placeholder: 'Address Line 3',
          //     validator: 'string',
          //     styleClasses: "col-md-8"
          // },
        ],
        groups: [{
          fields: [
            {
              type: 'vueMultiSelect',
              model: 'NOK_STATE',
              label: 'State',
              placeholder: 'Please Select',
              selectOptions: {
                multiple: false,
                closeOnSelect: true,
                showLabels: false,
                key: 'value',
                label: 'name',
              },
              onChanged: function (model) {
                this.$axios
                  .get('http://127.0.0.1:8000/api/getCity?state_id=' + model.NOK_STATE.id)
                  .then((response) => {
                    model.selectCity = response.data.data
                  })
              },
              values: () => {
                return this.selectState
              },
              validator: 'required',
              styleClasses: 'col-xl-2',
            },
            {
              type: 'vueMultiSelect',
              model: 'NOK_CITY',
              label: 'City',
              placeholder: 'Please Select',
              selectOptions: {
                multiple: false,
                closeOnSelect: true,
                showLabels: false,
                key: 'value',
                label: 'name',
              },
              onChanged: function (model) {
                this.$axios
                  .get('http://127.0.0.1:8000/api/getPostcode?city_id=' + model.NOK_CITY.id)
                  .then((response) => {
                    model.selectPostcode = response.data.data
                  })
              },
              values: function (model) {
                return model.selectCity
              },
              validator: 'required',
              styleClasses: 'col-xl-2',
            },
            {
              type: 'vueMultiSelect',
              model: 'NOK_POSTCODE',
              label: 'Postcode',
              placeholder: 'Please Select',
              selectOptions: {
                multiple: false,
                closeOnSelect: true,
                showLabels: false,
                key: 'value',
                label: 'name',
              },
              values: function (model) {
                return model.selectPostcode
              },
              validator: 'required',
              styleClasses: 'col-xl-2',
            },
          ],
        }],
      },
      // Allergy
      tabDSchema: {
        groups: [
          {
            styleClasses: 'row col',
            legend: '',
            fields: [
              {
                type: 'label',
                label: 'Drug Allergy',
                styleClasses: 'col-sm-5 mt-1',
              },
              {
                type: 'radios',
                model: 'ALLERGY[0]',
                values: () => {
                  return this.radioAllergy
                },
                onChanged: function (model) {
                  model.MD_ALLERGY = model.ALLERGY
                },
                required: true,
                validator: 'required',
                styleClasses: 'col-xs1',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'To specify',
                model: 'DRUG_ALL_SPECIFY',
                placeholder: '',
                visible: function (model) {
                  return model && model.ALLERGY[0] === 1
                },
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
              },
            ],
          },
          {
            styleClasses: 'row col',
            legend: '',
            fields: [
              {
                type: 'label',
                label: 'Traditional Medication / Supplement Allergy',
                styleClasses: 'col-sm-5 mt-1',
              },
              {
                type: 'radios',
                model: 'ALLERGY[1]',
                values: () => {
                  return this.radioAllergy
                },
                required: true,
                validator: 'required',
                styleClasses: 'col-xs1',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'To specify',
                model: 'SUPP_ALL_SPECIFY',
                placeholder: '',
                visible: function (model) {
                  return model && model.ALLERGY[1] === 1
                },
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
              },
            ],
          },
          {
            styleClasses: 'row col',
            legend: '',
            fields: [
              {
                type: 'label',
                label: 'Others',
                styleClasses: 'col-sm-5 mt-1',
              },
              {
                type: 'radios',
                model: 'ALLERGY[2]',
                values: () => {
                  return this.radioAllergy
                },
                required: true,
                validator: 'required',
                styleClasses: 'col-xs1',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'To specify',
                model: 'OTHERS_SPECIFY',
                placeholder: '',
                visible: function (model) {
                  return model && model.ALLERGY[2] === 1
                },
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
              },
            ],
          },
        ],
      },

      // Demographic Modal Preview
      tabAModalSchema: {
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
            styleClasses: 'col-md-3',
            values: () => {
              return this.selectSalutation
            },
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Name (as in NRIC)',
            model: 'DM_NAME',
            validator: 'string',
            required: true,
            styleClasses: 'col-md-9',
          },
          {
            type: 'radios',
            label: 'Citizenship',
            model: 'CITIZENSHIP',
            required: true,
            validator: 'required',
            styleClasses: 'col-md-12',
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
            styleClasses: 'col-md-6',
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
            styleClasses: 'col-md-6',
            visible: function (model) {
              return model && (model.NRIC_TYPE.value === 2 || model.CITIZENSHIP === 2)
            },
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'NRIC NO',
            model: 'NRIC_NO',
            validator: 'string',
            required: true,
            styleClasses: 'col-md-6',
            visible: function (model) {
              return model && (model.NRIC_TYPE.value === 1 || model.NRIC_TYPE.value === 3 || model.NRIC_TYPE.value === 4 ||
                              model.NRIC_TYPE.value === 5 || model.NRIC_TYPE.value === 6 || model.NRIC_TYPE.value === 7 ||
                              model.NRIC_TYPE.value === 8 || model.NRIC_TYPE.value === 9 || model.NRIC_TYPE.value === 10 ||
                              model.NRIC_TYPE.value === 11)
            },
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Passport NO',
            model: 'PASSPORT_NO',
            validator: 'string',
            required: true,
            styleClasses: 'col-md-4',
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
            styleClasses: 'col-md-4',
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
            styleClasses: 'col-md-4',
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
            styleClasses: 'col-12 display-inline',
            values: () => {
              return this.radioGender
            },
          },
          {
            type: 'input',
            inputType: 'date',
            label: 'Date of Birth',
            model: 'BIRTH_DATE',
            placeholder: 'Enter Date',
            required: true,
            format: 'YYYY/MM/DD',
            styleClasses: 'col-md-6',
          },
          {
            type: 'input',
            inputType: 'number',
            label: 'Age',
            model: 'AGE',
            min: 0,
            validator: 'number',
            styleClasses: 'col-md-6',
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
            styleClasses: 'col-md-6',
          },
          {
            type: 'cleave',
            label: 'House Phone Number',
            model: 'DM_HOUSE_NO',
            cleaveOptions: {
              phone: true,
              phoneRegionCode: 'MY',
            },
            validator: 'required',
            styleClasses: 'col-md-6',
          },
          {
            type: 'input',
            inputType: 'text',
            label: "Hospital's MRN Number",
            model: 'HOSPITAL_MRN',
            validator: 'string',
            required: true,
            styleClasses: 'col-md-6',
          },
          {
            type: 'input',
            inputType: 'text',
            label: "Mentari's MRN Number",
            model: 'MENTARI_MRN',
            validator: 'string',
            required: true,
            styleClasses: 'col-md-6',
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
            styleClasses: 'col-md-4',
            values: () => {
              return this.selectServiceType
            },
          },
          {
            type: 'vueMultiSelect',
            placeholder: 'Please select',
            label: 'Type of Referral',
            model: 'REFERRAL_TYPE',
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
            styleClasses: 'col-md-4',
            values: () => {
              return this.selectReferralType
            },
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'To Specify',
            model: 'SPECIFY_REFERRAL',
            validator: 'string',
            required: true,
            styleClasses: 'col-md-4',
            visible: function (model) {
              return model && model.REFERRAL_TYPE.value === 7
            },
          },
          {
            labels: 'Upload Referral Letter',
            accept: '.xlxs',
            multiple: true,
            text: 'Choose a File',
            model: 'REFERRAL_LETTER',
            type: 'vfg-custom-file-excel',
            styleClasses: 'col-md-6',
            hint: '*Please upload excel only (max file size 2MB)',
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Address',
            model: 'DM_ADDRESS_LINE_1',
            placeholder: 'Address line 1',
            validator: 'string',
            styleClasses: 'col-md-12',
          },
          {
            type: 'input',
            inputType: 'text',
            model: 'DM_ADDRESS_LINE_2',
            placeholder: 'Address line 2',
            validator: 'string',
            styleClasses: 'col-md-12',
          },
          {
            type: 'input',
            inputType: 'text',
            model: 'DM_ADDRESS_LINE_3',
            placeholder: 'Address line 3',
            validator: 'string',
            styleClasses: 'col-md-12',
          },
          {
            type: 'vueMultiSelect',
            placeholder: 'Please select',
            label: 'State',
            model: 'DM_STATE',
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
              return this.selectState
            },
          },
          {
            type: 'vueMultiSelect',
            placeholder: 'Please select',
            label: 'City',
            model: 'DM_CITY',
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
              return this.selectDMCity
            },
          },
          {
            type: 'vueMultiSelect',
            placeholder: 'Please select',
            label: 'Postcode',
            model: 'DM_POSTCODE',
            validator: 'required',
            selectOptions: {
              multiple: false,
              closeOnSelect: true,
              maxHeight: 200,
              showLabels: false,
            },
            styleClasses: 'col-md-6',
            values: () => {
              return this.selectDMPostcode
            },
          },
        ],
        groups: [
          {
            fields: [
              {
                type: 'radios',
                label: 'Is this person an existing patient?',
                model: 'EXISTING_PATIENT',
                required: true,
                values: [
                  { value: 1, name: 'Yes' },
                  { value: 2, name: 'No' },
                ],
                validator: 'required',
                styleClasses: 'col-md-6 display-inline',
              },
              {
                type: 'vueMultiSelect',
                placeholder: 'Please select',
                label: 'Mentari Branch',
                model: 'BRANCH',
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
                  return this.selectBranch
                },
                visible: function (model) {
                  return model && model.EXISTING_PATIENT === 1
                },
              },
            ],
            validator: 'required',
            styleClasses: 'col-md-12 display-inline',
          },
        ],
      },
      // Allergy Modal Preview
      tabDModalSchema: {
        groups: [
          {
            styleClasses: 'row col',
            legend: '',
            fields: [
              {
                type: 'label',
                label: 'Drug Allergy',
                styleClasses: 'col-sm-5 mt-1',
              },
              {
                type: 'radios',
                model: 'MD_ALLERGY[0]',
                values: () => {
                  return this.radioAllergy
                },
                required: true,
                validator: 'required',
                styleClasses: 'col-xs1',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'To specify',
                model: 'DRUG_ALL_SPECIFY',
                placeholder: '',
                visible: function (model) {
                  return model && model.ALLERGY[0] === 1
                },
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
              },
            ],
          },
          {
            styleClasses: 'row col',
            legend: '',
            fields: [
              {
                type: 'label',
                label: 'Traditional Medication / Supplement Allergy',
                styleClasses: 'col-sm-5 mt-1',
              },
              {
                type: 'radios',
                model: 'MD_ALLERGY[1]',
                values: () => {
                  return this.radioAllergy
                },
                required: true,
                validator: 'required',
                styleClasses: 'col-xs1',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'To specify',
                model: 'SUPP_ALL_SPECIFY',
                placeholder: '',
                visible: function (model) {
                  return model && model.ALLERGY[1] === 1
                },
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
              },
            ],
          },
          {
            styleClasses: 'row col',
            legend: '',
            fields: [
              {
                type: 'label',
                label: 'Others',
                styleClasses: 'col-sm-5 mt-1',
              },
              {
                type: 'radios',
                model: 'MD_ALLERGY[2]',
                values: () => {
                  return this.radioAllergy
                },
                required: true,
                validator: 'required',
                styleClasses: 'col-xs1',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'To specify',
                model: 'OTHERS_SPECIFY',
                placeholder: '',
                visible: function (model) {
                  return model && model.ALLERGY[2] === 1
                },
                required: true,
                validator: 'string',
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
    this.$axios
      .get('http://127.0.0.1:8000/api/getState?country_id=1')
      .then((response) => {
        this.selectState = response.data.data
      })

    this.$axios
      .get('http://127.0.0.1:8000/api/getSalutation')
      .then((response) => {
        this.selectSalutation = response.data.data
      })

    this.$axios
      .get('http://127.0.0.1:8000/api/getCitizenship')
      .then((response) => {
        this.radioCitizenship = response.data.data
      })

    this.$axios
      .get('http://127.0.0.1:8000/api/getNRICType')
      .then((response) => {
        this.selectNRICType = response.data.data
      })

    this.$axios
      .get('http://127.0.0.1:8000/api/getIssuingCountry')
      .then((response) => {
        this.selectIssuingCountry = response.data.data
      })

    this.$axios
      .get('http://127.0.0.1:8000/api/getGender')
      .then((response) => {
        this.radioGender = response.data.data
      })

    this.$axios
      .get('http://127.0.0.1:8000/api/getServiceType')
      .then((response) => {
        this.selectServiceType = response.data.data
      })

    this.$axios
      .get('http://127.0.0.1:8000/api/getReferralType')
      .then((response) => {
        this.selectReferralType = response.data.data
      })

    this.$axios
      .get('http://127.0.0.1:8000/api/getBranch')
      .then((response) => {
        this.selectBranch = response.data.data
      })

    this.$axios
      .get('http://127.0.0.1:8000/api/getRace')
      .then((response) => {
        this.selectRace = response.data.data
      })

    this.$axios
      .get('http://127.0.0.1:8000/api/getReligion')
      .then((response) => {
        this.selectReligion = response.data.data
      })

    this.$axios
      .get('http://127.0.0.1:8000/api/getMaritalStatus')
      .then((response) => {
        this.selectMaritalStatus = response.data.data
      })

    this.$axios
      .get('http://127.0.0.1:8000/api/getAccommodation')
      .then((response) => {
        this.selectAccommodation = response.data.data
      })

    this.$axios
      .get('http://127.0.0.1:8000/api/getEducationLevel')
      .then((response) => {
        this.selectEducationLevel = response.data.data
      })

    this.$axios
      .get('http://127.0.0.1:8000/api/getOccupationStatus')
      .then((response) => {
        this.selectOccupationStatus = response.data.data
      })

    this.$axios
      .get('http://127.0.0.1:8000/api/getFeeExemptionStatus')
      .then((response) => {
        this.selectFeeExemptionStatus = response.data.data
      })

    this.$axios
      .get('http://127.0.0.1:8000/api/getOccupationSector')
      .then((response) => {
        this.selectOccupationSector = response.data.data
      })

    this.$axios
      .get('http://127.0.0.1:8000/api/getRelationship')
      .then((response) => {
        this.selectRelationship = response.data.data
      })
  },
  methods: {
    validateForm () {
      var tabA = this.validateTabA()
      var tabB = this.validateTabB()
      var tabC = this.validateTabC()
      var tabD = this.validateTabD()

      if (tabA && tabB && tabC && tabD) {
        this.launchToast()
        this.submitPath = true
        this.$router.push({ path: 'patient_consultation' })
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
    validateTabB () {
      var errors = this.$refs.socioDemographic.validate()
      if (errors) {
        this.tabB = false
        return true
      } else {
        this.tabB = true
        return false
      }
    },
    validateTabC () {
      var errors = this.$refs.nextOfKin.validate()
      if (errors) {
        this.tabC = false
        return true
      } else {
        this.tabC = true
        return false
      }
    },
    validateTabD () {
      var errors = this.$refs.allergy.validate()
      if (errors) {
        this.tabD = false
        return true
      } else {
        this.tabD = true
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
