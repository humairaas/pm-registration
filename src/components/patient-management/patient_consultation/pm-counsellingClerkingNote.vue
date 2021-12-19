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
      selectServiceCategory1: [],
      selectServiceCategory2: [],
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

      radioServiceCategory: [
        { name: 'Assistance/Supervision', value: 1 },
        { name: 'Clinical Work/Procedure', value: 2 },
        { name: 'External', value: 3 },
      ],

      model: {
        SERVICE_LOCATION: '',
        TITLE: 'COUNSELLING CLERKING NOTE',
        DIAGNOSIS_TYPE: '',
        SERVICE_CATEGORY: '',
        SERVICE_COMPLEXITY: '',
        SERVICES: '',
        ICD9_CODE: '',
        ICD9_SUBCODE: '',
        OUTCOME: '',
        MEDICATION: '',

        STAFF_NAME: '',
        DESIGNATION: '',
        ROOM: '',
        DATE: '',
        TIME: '',

        MRN: '',
        PATIENT_NAME: '',
        NRIC_NO: '',
        AGE: '',
        CONTACT_NO: '',
        GENDER: '',

        DIAGNOSIS: '',
        CLINICAL_SUMMARY: '',
        BACKGROUND_HISTORY: '',
        CLINICAL_NOTES: '',
        MANAGEMENT: '',

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
                label: 'STAFF DETAILS',
                styleClasses: 'subtitle',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Staff Name/Seen By',
                model: 'STAFF_NAME',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Designation',
                model: 'DESIGNATION',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Room',
                model: 'ROOM',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Date',
                model: 'DATE',
                styleClasses: 'col-md-6',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Time',
                model: 'TIME',
                styleClasses: 'col-md-6',
              },
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
                type: 'label',
                label: 'CONSULTATION DETAILS',
                styleClasses: 'subtitle',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Diagnosis',
                model: 'DIAGNOSIS',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12',
              },
              {
                type: 'textArea',
                label: 'Clinical Summary',
                model: 'CLINICAL_SUMMARY',
                placeholder: 'Enter Description',
                rows: 3,
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12',
              },
              {
                type: 'textArea',
                label: 'Background History',
                model: 'BACKGROUND_HISTORY',
                placeholder: 'Enter Description',
                rows: 3,
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12',
              },
              {
                type: 'textArea',
                label: 'Clinical Notes',
                model: 'CLINICAL_NOTES',
                placeholder: 'Enter Description',
                rows: 3,
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12',
              },
              {
                type: 'textArea',
                label: 'Management',
                model: 'MANAGEMENT',
                placeholder: 'Enter Description',
                rows: 3,
                required: true,
                validator: 'string',
                styleClasses: 'col-md-12',
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
                    model.ICD9_CODE = ''
                    model.ICD9_SUBCODE = ''
                    model.SERVICES = ''
                  } else if (newVal === 2) {
                    model.SERVICES = ''
                  } else if (newVal === 3) {
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
                  return this.selectServiceCategory1
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
                  return this.selectServiceCategory2
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
        this.selectServiceCategory1 = response.data.serviceCategory1
        this.selectServiceCategory2 = response.data.serviceCategory2
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
