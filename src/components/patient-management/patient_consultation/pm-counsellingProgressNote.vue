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

          <va-card>

            <div class="text-center"><h3 class="mt-4 mb-5 text-dark">CLINICAL NOTE</h3></div>
            <vue-form-generator :model="model" :schema="schema" :options="formOptions" ref="clinicalNote">
            </vue-form-generator>
            <h6>{{model}}</h6>

            <!-- Button footer-->
            <div class="mt-3">
              <div class="float-left">
                <button @click="cancelAppointment" type="button" class="ml-2 btn btn-fill btn-md btn-red">
                  CANCEL
                </button>
              </div>
              <div class="float-right">
                <button @click="validateForm" type="submit" class="ml-2 btn btn-fill btn-md btn-blue">
                  <div class="fa fa-paper-plane" /> &nbsp; SUBMIT
                </button>
              </div>
            </div>

          </va-card>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabA: false,
      submitPath: false,

      selectServiceLocation: [],
      selectDiagnosisType: [
        { name: 'One', value: 1 },
        { name: 'Two', value: 2 },
        { name: 'Three', value: 3 },
      ],
      selectICD9Code: [
        { name: 'One', value: 1 },
        { name: 'Two', value: 2 },
        { name: 'Three', value: 3 },
      ],
      selectICD9Subcode: [
        { name: 'One', value: 1 },
        { name: 'Two', value: 2 },
        { name: 'Three', value: 3 },
      ],
      selectServiceComplexity: [],
      selectOutcome: [],

      radioServiceCategory: [],

      radioSessionFrequency: [
        { name: 'Twice a week', value: 1 },
        { name: 'Once a week', value: 2 },
        { name: 'Once in two weeks', value: 3 },
        { name: 'Once a month', value: 4 },
        { name: 'Others', value: 5 },
      ],

      radioTherapyModel: [
        { name: 'Psychodynamic', value: 1 },
        { name: 'Cognitive', value: 2 },
        { name: 'Behavioral', value: 3 },
        { name: 'Systemic', value: 4 },
        { name: 'Supportive', value: 5 },
        { name: 'Eclectic', value: 6 },
        { name: 'Others', value: 7 },
      ],

      radioTherapyMode: [
        { name: 'Individual', value: 1 },
        { name: 'Group', value: 2 },
        { name: 'Couple/Marital', value: 3 },
        { name: 'Family', value: 4 },
        { name: 'Others', value: 5 },
      ],

      radioPatientCondition: [
        { name: 'Improved', value: 1 },
        { name: 'Unchanged', value: 2 },
        { name: 'Worsened', value: 3 },
        { name: 'Others', value: 4 },
      ],

      model: {
        selectServiceCategory1: '',
        selectServiceCategory3: '',

        SERVICE_LOCATION: '',
        TITLE: 'COUNSELLING PROGRESS NOTE',
        DIAGNOSIS_TYPE: '',
        SERVICE_CATEGORY: '',
        SERVICE_COMPLEXITY: '',
        SERVICES: '',
        ICD9_CODE: '',
        ICD9_SUBCODE: '',
        OUTCOME: '',
        MEDICATION: '',

        MRN: '',
        PATIENT_NAME: '',
        NRIC_NO: '',
        AGE: '',
        CONTACT_NO: '',
        GENDER: '',
        DOB: '',

        DATE_PERFORMED: '',
        TIME_PERFORMED: '',
        DIAGNOSIS: '',
        SESSION_FREQUENCY: '',
        SPECIFY_SESSION_FREQUENCY: '',
        THERAPY_MODE: '',
        SPECIFY_THERAPY_MODE: '',
        THERAPY_MODEL: '',
        SPECIFY_THERAPY_MODEL: '',
        THERAPY_SESSION_COMMENT: '',
        PATIENT_CONDITION: '',
        SPECIFY_PATIENT_CONDITION: '',
        PATIENT_CONDITION_COMMENT: '',

        ISSUES: '',
        SESSION_CONDUCT: '',
        SESSION_OUTCOME: '',
        SESSION_DURATION: '',
        TRANSFERENCE: '',
        OTHER_COMMENT: '',

        NAME: '',
        DESIGNATION: '',
        DATE: '',

      },
      schema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                label: 'Location of Services',
                placeholder: 'Select Location of Services',
                model: 'SERVICE_LOCATION',
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
                  return this.selectServiceLocation
                },
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'input',
                inputType: 'text',
                label: 'Title',
                model: 'TITLE',
                disabled: true,
                styleClasses: 'col-md-6',
              },
            ],
          },
          {
            fields: [
              {
                type: 'label',
                label: 'PATIENT DETAILS',
                styleClasses: 'subtitle',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'MRN',
                model: 'MRN',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Patient Name',
                model: 'PATIENT_NAME',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'NRIC No',
                model: 'NRIC_NO',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Age',
                model: 'AGE',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Contact No',
                model: 'CONTACT_NO',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Gender',
                model: 'GENDER',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'DOB',
                model: 'DOB',
                styleClasses: 'col-md-6',
              },
              {
                type: 'label',
                label: 'PSYCHOTHERAPY PROGRESS NOTE',
                styleClasses: 'subtitle',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Date Performed',
                model: 'DATE_PERFORMED',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Time Performed',
                model: 'TIME_PERFORMED',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Diagnosis',
                model: 'DIAGNOSIS',
                styleClasses: 'col-md-6',
              },
              {
                type: 'label',
                label: 'Therapy Session',
                styleClasses: 'row',
              },
              {
                type: 'radios',
                label: 'Frequency of Session',
                model: 'SESSION_FREQUENCY',
                required: true,
                validator: 'required',
                styleClasses: ['col-md-6', 'display-inline'],
                values: () => {
                  return this.radioSessionFrequency
                },
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'SPECIFY_SESSION_FREQUENCY',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
                visible: function (model) {
                  return model && model.SESSION_FREQUENCY === 5
                },
              },
              {
                type: 'radios',
                label: 'Model of Therapy',
                model: 'THERAPY_MODEL',
                required: true,
                validator: 'required',
                styleClasses: ['col-md-6', 'display-inline'],
                values: () => {
                  return this.radioTherapyModel
                },
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'SPECIFY_THERAPY_MODEL',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
                visible: function (model) {
                  return model && model.THERAPY_MODEL === 7
                },
              },
              {
                type: 'radios',
                label: 'Mode of Therapy',
                model: 'THERAPY_MODE',
                required: true,
                validator: 'required',
                styleClasses: ['col-md-6', 'display-inline'],
                values: () => {
                  return this.radioTherapyMode
                },
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'SPECIFY_THERAPY_MODE',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
                visible: function (model) {
                  return model && model.THERAPY_MODE === 5
                },
              },
              {
                type: 'textArea',
                label: 'Comments on Therapy Sessions',
                model: 'THERAPY_SESSION_COMMENT',
                placeholder: 'Enter Comments',
                rows: 2,
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
              },
              {
                type: 'label',
                label: 'Patient\'s Condition',
                styleClasses: 'row',
              },
              {
                type: 'radios',
                label: 'Condition (Since Last Session)',
                model: 'PATIENT_CONDITION',
                required: true,
                validator: 'required',
                styleClasses: ['col-md-6', 'display-inline'],
                values: () => {
                  return this.radioPatientCondition
                },
              },
              {
                type: 'input',
                inputType: 'text',
                model: 'SPECIFY_PATIENT_CONDITION',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
                visible: function (model) {
                  return model && model.PATIENT_CONDITION === 4
                },
              },
              {
                type: 'textArea',
                label: "Comments on Patient's Condition",
                model: 'PATIENT_CONDITION_COMMENT',
                placeholder: 'Enter Comments',
                rows: 2,
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
              },
              {
                type: 'label',
                label: 'SESSION DETAILS',
                styleClasses: 'subtitle',
              },
              {
                type: 'textArea',
                label: 'Issues/Problems Dealt with Today',
                model: 'ISSUES',
                placeholder: 'Enter Issues',
                rows: 3,
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12',
              },
              {
                type: 'textArea',
                label: 'Conduct of Session',
                model: 'SESSION_CONDUCT',
                placeholder: 'Enter Conduct of Session',
                rows: 3,
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12',
              },
              {
                type: 'textArea',
                label: 'Outcome of Session',
                model: 'SESSION_OUTCOME',
                placeholder: 'Enter Outcome of Session',
                rows: 3,
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12',
              },
              {
                type: 'textArea',
                label: 'Transference/Countertransference',
                model: 'TRANSFERENCE',
                placeholder: 'Enter Transference',
                rows: 3,
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12',
              },
              {
                type: 'textArea',
                label: 'Duration of Session',
                model: 'SESSION_DURATION',
                placeholder: 'Enter Duration of Session',
                rows: 3,
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12',
              },
              {
                type: 'textArea',
                label: 'Other Comments',
                model: 'OTHER_COMMENT',
                placeholder: 'Enter Other Comments',
                rows: 3,
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Name',
                model: 'NAME',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Designation',
                model: 'DESIGNATION',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Date',
                model: 'DATE',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-6',
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                label: 'Type of Diagnosis',
                placeholder: 'Select ICD 10/ICD 11 Code',
                model: 'DIAGNOSIS_TYPE',
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
                  return this.selectDiagnosisType
                },
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'radios',
                label: 'Category of Service',
                model: 'SERVICE_CATEGORY',
                required: true,
                validator: 'required',
                styleClasses: ['col-md-6', 'display-inline'],
                values: () => {
                  return this.radioServiceCategory
                },
                onChanged: function (model, newVal, oldVal, field) {
                  if (newVal === 1) {
                    this.$axios
                      .get('http://127.0.0.1:8000/api/getServiceBasedOnCategory?id=' + model.SERVICE_CATEGORY)
                      .then((response) => {
                        this.model.selectServiceCategory1 = response.data.data
                      })
                    model.ICD9_CODE = ''
                    model.ICD9_SUBCODE = ''
                    model.SERVICES = ''
                  } else if (newVal === 2) {
                    model.SERVICES = ''
                  } else if (newVal === 3) {
                    this.$axios
                      .get('http://127.0.0.1:8000/api/getServiceBasedOnCategory?id=' + model.SERVICE_CATEGORY)
                      .then((response) => {
                        model.selectServiceCategory3 = response.data.data
                      })
                    model.ICD9_CODE = ''
                    model.ICD9_SUBCODE = ''
                    model.SERVICES = ''
                  }
                },

              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                label: 'Services',
                placeholder: 'Select Services',
                model: 'SERVICES',
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
                  return this.model.selectServiceCategory1
                },
                visible: function (model) {
                  return model && model.SERVICE_CATEGORY === 1
                },
              },
              {
                type: 'vueMultiSelect',
                label: 'ICD9 Code',
                placeholder: 'Select Code',
                model: 'ICD9_CODE',
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
                  return this.selectICD9Code
                },
                visible: function (model) {
                  return model && model.SERVICE_CATEGORY === 2
                },
              },
              {
                type: 'vueMultiSelect',
                label: 'ICD9 Sub Code',
                placeholder: 'Select Sub Code',
                model: 'ICD9_SUBCODE',
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
                  return this.selectICD9Subcode
                },
                visible: function (model) {
                  return model && model.SERVICE_CATEGORY === 2
                },
              },
              {
                type: 'vueMultiSelect',
                label: 'Services',
                placeholder: 'Select Services',
                model: 'SERVICES',
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
                  return this.model.selectServiceCategory3
                },
                visible: function (model) {
                  return model && model.SERVICE_CATEGORY === 3
                },
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'vueMultiSelect',
                label: 'Complexity of Service',
                placeholder: 'Select Complexity of Service',
                model: 'SERVICE_COMPLEXITY',
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
                  return this.selectServiceComplexity
                },
              },
              {
                type: 'vueMultiSelect',
                label: 'Outcome',
                placeholder: 'Select Outcome',
                model: 'OUTCOME',
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
                  return this.selectOutcome
                },
              },
            ],
          },
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'textArea',
                label: 'Medication',
                model: 'MEDICATION',
                placeholder: 'Please Type Prescription Here',
                rows: 4,
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12',
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
      .get('http://127.0.0.1:8000/api/getPsychiatryClerkingNoteData')
      .then((response) => {
        this.selectServiceLocation = response.data.serviceLocation
        this.selectServiceComplexity = response.data.serviceComplexity
        this.selectOutcome = response.data.serviceOutcome
        this.radioServiceCategory = response.data.serviceCategory
      })
  },
  methods: {
    async cancelAppointment () {
      if (this.$route.query.st === 'edit') {
        var appointmentId = localStorage.getItem('appointmentId')
        const data = new FormData()
        data.append('appointmentId', appointmentId)
        const url = 'http://127.0.0.1:8000/api/deleteAppointment'
        await this.$axios.post(url, data)
        this.submitPath = true
        this.launchToast(' Appointment has been deleted!')
      }
      this.$router.push({ name: 'patient-appointmentList' })
    },
    validateForm () {
      var tabA = this.validateTabA()

      if (tabA) {
        const data = new FormData()
        data.append('psychiatryClerkingNote', JSON.stringify(this.model))
        this.$axios
          .post('http://127.0.0.1:8000/api/savePsychiatryClerkingNote', data)
          .then((response) => {
            return response.data
          })
        this.launchToast('Pyschiatry Clerking Note for the Patient Saved Successfully!')
        this.submitPath = true
        this.$router.push({ name: 'patient-appointmentList' })
      }
    },
    validateTabA () {
      var errors = this.$refs.clinicalNote.validate()
      if (errors) {
        this.tabA = false
        return true
      } else {
        this.tabA = true
        return false
      }
    },
    launchToast (message) {
      this.showToast(
        message,
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

.subtitle {
  font-size: medium;
  background-color: #f0f0f0;
}

.subtitle span {
  margin-top: 3px;
}
</style>
