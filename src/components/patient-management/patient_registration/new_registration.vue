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
              </tab-content>

              <!-- 4th tab: Allergy-->
              <tab-content icon="fa fa-info" title="4. Allergy" :before-change="validateFourthTab">
                <vue-form-generator :model="model" :schema="tabDSchema" :options="formOptions" ref="allergy" @model-updated="onModelUpdated" @submit="onSubmit">
                </vue-form-generator>

                <!--//Modals-->
                <va-modal
                  v-model="showLargeModal"
                  size="large"
                  :title=" $t('Patient Registration Details Preview') "
                  :okText=" $t('Confirm') "
                  :cancelText=" $t('Close') "
                >
                  <div class="modal-preview">
                    <h5 class="tab-title">Demographic</h5>
                    <vue-form-generator class="read-only" :model="model" :schema="tabASchema"></vue-form-generator>
                    <h5 class="tab-title">Sosio Demographic</h5>
                    <vue-form-generator class="sosio-margin read-only" :model="model" :schema="tabBSchema"></vue-form-generator>
                    <h5 class="tab-title">Next of Kin</h5>
                    <vue-form-generator class="read-only" :model="model" :schema="tabCSchema" readonly></vue-form-generator>
                    <h5 class="tab-title">Allergy</h5>
                    <vue-form-generator class="read-only" :model="model" :schema="tabDSchema" readonly></vue-form-generator>
                  </div>
                </va-modal>
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
                  <button v-if="!isLastStep" @click="nextTab" type="button" class="btn btn-info btn-fill btn-md">
                    Next <i class="fa fa-step-forward" />
                  </button>

                  <button v-if="isLastStep" @click="showLargeModal = true" type="button" class="ml-2 btn btn-warning btn-fill btn-md">
                    <i class="fa fa-play-circle" /> &nbsp;View
                  </button>

                  <button v-if="isLastStep" @click="redirectToProfile" type="submit" class="ml-2 btn btn-primary btn-fill btn-md">
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
  name: 'modals',
  components: {
  },
  data () {
    return {
      show: true,
      showLargeModal: false,

      // Demographic  Data
      selectSalutation: [
        { name: 'MR.', value: 1 },
        { name: 'MRS.', value: 2 },
      ],

      radioCitizenship: [
        { value: 1, name: 'Malaysian' },
        { value: 2, name: 'Permanent Resident' },
        { value: 3, name: 'Foreigner' },
      ],

      selectNRICType: [
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

      radioGender: [
        { value: 1, name: 'Male' },
        { value: 2, name: 'Female' },
      ],

      selectServiceType: [
        { name: 'Consultation', value: 1 },
        { name: 'Rehabilitation', value: 2 },
        { name: 'Rehabilitation - SE', value: 3 },
        { name: 'Rehabilitation - ETP', value: 4 },
        { name: 'Rehabilitation - Job Club', value: 5 },
        { name: 'Community Psychiatric Service (CPS)', value: 6 },
      ],

      selectReferralType: [
        { name: 'Self-Referral', value: 1 },
        { name: 'Psychiatric Department Own Hospital', value: 2 },
        { name: 'Government Clinic', value: 3 },
        { name: 'Private Clinic', value: 4 },
        { name: 'Government Hospital', value: 5 },
        { name: 'Private Hospital', value: 6 },
        { name: 'Others', value: 7 },
      ],

      selectIssuingCountry: [
        { id: '1', name: 'Malaysia' },
        { id: '2', name: 'China' },
        { id: '3', name: 'India' },
      ],

      selectState: [
        { id: 'MY-14', name: 'Wilayah Persekutuan Kuala Lumpur' },
        { id: 'MY-15', name: 'Wilayah Persekutuan Labuan' },
        { id: 'MY-16', name: 'Wilayah Persekutuan Putrajaya' },
        { id: 'MY-01', name: 'Johor' },
        { id: 'MY-02', name: 'Kedah' },
        { id: 'MY-03', name: 'Kelantan' },
        { id: 'MY-04', name: 'Melaka' },
        { id: 'MY-05', name: 'Negeri Sembilan' },
        { id: 'MY-06', name: 'Pahang' },
        { id: 'MY-08', name: 'Perak' },
        { id: 'MY-09', name: 'Perlis' },
        { id: 'MY-07', name: 'Pulau Pinang' },
        { id: 'MY-12', name: 'Sabah' },
        { id: 'MY-13', name: 'Sarawak' },
        { id: 'MY-10', name: 'Selangor' },
        { id: 'MY-11', name: 'Terengganu' },
      ],

      selectCity: [
        { id: '1', name: 'Subang Jaya' },
        { id: '2', name: 'Klang' },
        { id: '3', name: 'Ampang Jaya' },
        { id: '3', name: 'Shah Alam' },
        { id: '3', name: 'Petaling Jaya' },
        { id: '3', name: 'Cheras' },
        { id: '3', name: 'Kajang' },
        { id: '3', name: 'Selayang Baru' },
        { id: '3', name: 'Rawang' },
        { id: '3', name: 'Taman Greenwood' },
        { id: '3', name: 'Semenyih' },
        { id: '3', name: 'Serdang' },
      ],

      selectPostcode: [
        '54200',
        '53849',
      ],

      // Socio Demographic Data
      selectRace: [
        { name: 'Malay', value: 1 },
        { name: 'Chinese', value: 2 },
        { name: 'Indian', value: 3 },
        { name: 'Others', value: 4 },
      ],

      selectReligion: [
        { name: 'Islam', value: 1 },
        { name: 'Buddha', value: 2 },
        { name: 'Hindu', value: 3 },
        { name: 'Others', value: 4 },
      ],

      selectMaritalStatus: [
        { name: 'Single', value: 1 },
        { name: 'Married', value: 2 },
        { name: 'Widowed', value: 3 },
        { name: 'Others', value: 4 },
      ],
      selectAccommodation: [
        { name: 'Homeless', value: 1 },
        { name: 'Institution', value: 2 },
        { name: 'Nursing Home', value: 3 },
        { name: 'Others', value: 4 },
      ],

      selectEducationLevel: [
        { name: 'No Info', value: 1 },
        { name: 'Primary', value: 2 },
        { name: 'Secondary', value: 3 },
        { name: 'Tertiary', value: 4 },
      ],
      selectOccupationStatus: [
        { name: 'Employee', value: 1 },
        { name: 'Employer', value: 2 },
        { name: 'student', value: 3 },
        { name: 'Others', value: 4 },
      ],

      selectFeeExemptionStatus: [
        { name: 'Government Servant', value: 1 },
        { name: 'People with Disability (OKU)', value: 2 },
        { name: 'Pensioner', value: 3 },
        { name: 'Others', value: 4 },
      ],

      selectOccupationSector: [
        { name: 'Government', value: 1 },
        { name: 'Private', value: 2 },
        { name: 'Self-Employed', value: 3 },
        { name: 'Others', value: 4 },
      ],

      // Next of Kin Data
      selectRelationship: [
        { name: 'Husband', value: '1' },
        { name: 'Wife', value: '2' },
        { name: 'Father', value: '3' },
      ],

      // Allergy Data
      radioAllergy: [
        { name: 'Yes', value: 1 },
        { name: 'No', value: 0 },
      ],

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
        REFERRAL_LETTER: '',
        DM_ADDRESS_LINE_1: '',
        DM_ADDRESS_LINE_2: '',
        DM_ADDRESS_LINE_3: '',
        DM_POSTCODE: '',
        DM_CITY: '',
        DM_STATE: '',
        EXISTING_PATIENT: '',

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
              return model && (model.CITIZENSHIP === 1 || model.CITIZENSHIP === 2)
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
            styleClasses: 'col-md-12 display-inline',
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
            type: 'upload',
            label: 'Upload Referral Letter',
            model: 'REFERRAL_LETTER',
            inputName: 'file1',
            styleClasses: 'col-md-6',
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
              return this.selectState
            },
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
            styleClasses: 'col-md-6',
            values: () => {
              return this.selectCity
            },
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
            },
            styleClasses: 'col-md-6',
            values: () => {
              return this.selectPostcode
            },
          },
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
            styleClasses: 'col-md-12 display-inline',
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
            model: 'relationship',
            label: 'Relationship',
            placeholder: 'Choose Relationship',
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
              placeholder: 'Choose State',
              selectOptions: {
                multiple: false,
                closeOnSelect: true,
                showLabels: false,
                key: 'value',
                label: 'name',
              },
              // onChanged: function(model){
              //     this.$axios
              //         .get('http://127.0.0.1:8000/api/getCity?state_id=' + model.NOK_STATE)
              //         .then((response) =>{
              //             this.selectCity = response.data.data
              //         })
              // },
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
              placeholder: 'Choose City',
              selectOptions: {
                multiple: false,
                closeOnSelect: true,
                showLabels: false,
                key: 'value',
                label: 'name',
              },
              // onChanged: function(model){
              // this.$axios
              //     .get('http://127.0.0.1:8000/api/getPostcode?city_id=' + model.NOK_CITY)
              //     .then((response) =>{
              //         this.selectPostcode = response.data.data
              //     })
              // },
              values: () => {
                return this.selectCity
              },
              validator: 'required',
              styleClasses: 'col-xl-2',
            },
            {
              type: 'vueMultiSelect',
              model: 'NOK_POSTCODE',
              label: 'Postcode',
              placeholder: 'Choose Postcode',
              selectOptions: {
                multiple: false,
                closeOnSelect: true,
                showLabels: false,
              },
              values: () => {
                return this.selectPostcode
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
      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
        validateAsync: true,
      },
    }
  },
  mounted () {
    // this.$axios
    //     .get('http://127.0.0.1:8000/api/getState?country_id=0')
    //     .then((response) =>{
    //         this.selectState = response.data.data
    //     })
  },
  methods: {
    onSubmit () {
      this.$refs.allergy.validateAfterChanged()
    },
    showPreview () {

    },
    redirectToProfile () {

    },
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
    background-color: orange;
    border-radius: 10px;
    color: white;
  }

  .sosio-margin {
    margin-left: 20px;
  }

  .read-only {
    pointer-events: none;
  }

</style>
