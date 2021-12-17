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

          <div class="mb-3" v-if="patientNotExist==true">
            <va-notification color="danger">
              <va-badge color="danger">
                {{ $t('Incomplete') }}
              </va-badge>
              <span>Patient with the specified NRIC/PASSPORT does not exist.</span>
              <button type="button" class="btn close-button" @click="patientExist = false">
                <span class="fa fa-close"/>
              </button>
            </va-notification>
          </div>

          <va-card>

            <div class="text-center"><h4 class="mt-4 mb-5 text-dark">BOOK APPOINTMENT</h4></div>
            <vue-form-generator :model="model" :schema="schema" :options="formOptions" ref="appointment">
            </vue-form-generator>

            <!-- Button footer-->
            <div class="mt-3">
              <div class="float-left">
                <button @click="cancelAppointment" type="button" class="ml-2 btn btn-fill btn-md btn-red">
                  CANCEL
                </button>
              </div>
              <div class="float-right">
                <button @click="validateForm" type="submit" class="ml-2 btn btn-fill btn-md btn-blue">
                  <div class="fa fa-paper-plane" /> &nbsp; CONFIRM
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
      patientNotExist: false,

      selectAppointmentType: [],
      selectVisitType: [],
      selectPatientCategory: [],
      selectAppointmentTime: [
        { name: '08:00', value: 1 },
        { name: '08:30', value: 1 },
        { name: '09:00', value: 1 },
        { name: '09:30', value: 1 },
        { name: '10:00', value: 1 },
        { name: '10:30', value: 1 },
        { name: '11:00', value: 1 },
        { name: '11:30', value: 1 },
        { name: '12:00', value: 1 },
        { name: '12:30', value: 1 },
        { name: '14:00', value: 1 },
        { name: '14:30', value: 1 },
        { name: '15:00', value: 1 },
        { name: '15:30', value: 1 },
        { name: '16:00', value: 1 },
        { name: '16:30', value: 1 },
      ],
      selectAppointmentDuration: [
        { name: '30 min', value: 1 },
        { name: '1 hour', value: 1 },
        { name: '1 hour 30 min', value: 1 },
        { name: '2 hours', value: 1 },
        { name: '2 hour 30 min', value: 1 },
        { name: '3 hours', value: 1 },
        { name: '3 hour 30 min', value: 1 },
        { name: '4 hours', value: 1 },
      ],
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
        APPOINTMENT_ID: '',
        selectAssignedTeam: [],
      },
      schema: {
        groups: [
          {
            styleClasses: 'row',
            fields: [
              {
                type: 'input',
                inputType: 'text',
                label: 'NRIC/Passport Number',
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
                type: 'vueMultiSelect',
                label: 'Time',
                placeholder: 'Please select',
                model: 'TIME',
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
                  return this.selectAppointmentTime
                },
              },
              {
                type: 'vueMultiSelect',
                label: 'Duration',
                placeholder: 'Please select',
                model: 'DURATION',
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
                  return this.selectAppointmentDuration
                },
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
                onChanged: function (model) {
                  this.$axios
                    .get('http://127.0.0.1:8000/api/getAssignedTeam?id=' + model.PATIENT_CATEGORY.value)
                    .then((response) => {
                      this.model.selectAssignedTeam = response.data.data
                    })
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
                  return this.model.selectAssignedTeam
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

    if (this.$route.query.st === 'edit') {
      var appointmentId = localStorage.getItem('appointmentId')

      this.$axios
        .get('http://127.0.0.1:8000/api/getAppointmentData?appointmentId=' + appointmentId)
        .then((response) => {
          console.log(response.data.data)
          this.model.NRIC_PASSPORT_NO = response.data.data[0].nricPassport
          this.model.DATE = response.data.data[0].date
          this.model.TIME = { value: 1, name: response.data.data[0].time }
          this.model.DURATION = { name: response.data.data[0].duration, value: 1 }
          this.model.APPOINTMENT_TYPE = { value: response.data.data[0].appointmentTypeValue, name: response.data.data[0].appointmentTypeName }
          this.model.VISIT_TYPE = { value: response.data.data[0].visitTypeValue, name: response.data.data[0].visitTypeName }
          this.model.PATIENT_CATEGORY = { value: response.data.data[0].patientCategoryValue, name: response.data.data[0].patientCategoryName }
          this.model.ASSIGNED_TEAM = { value: response.data.data[0].assignedTeamValue, name: response.data.data[0].assignedTeamName }
          this.model.APPOINTMENT_ID = response.data.data[0].appointment_id
        })
    }
  },
  methods: {
    async validateForm () {
      var tabA = this.validateTabA()
      var patientVerified = await this.validatePatient()

      if (tabA && patientVerified) {
        if (this.$route.query.st === 'edit') {
          const data = new FormData()
          data.append('apptData', JSON.stringify(this.model))
          this.$axios
            .post('http://127.0.0.1:8000/api/updateAppointment', data)
            .then((response) => {
              return response.data
            })
          this.launchToast(' Appointment for ' + this.model.NRIC_PASSPORT_NO + ' Updated Successful !')
        } else {
          const data = new FormData()
          data.append('apptData', JSON.stringify(this.model))
          this.$axios
            .post('http://127.0.0.1:8000/api/bookAppointment', data)
            .then((response) => {
              return response.data
            })
          this.launchToast(' Appointment for ' + this.model.NRIC_PASSPORT_NO + ' Booked Successful !')
        }
        this.submitPath = true
        this.$router.push({ name: 'patient-appointmentList' })
      }
    },
    async validatePatient () {
      const url = 'http://127.0.0.1:8000/api/verifyPatient?id=' + this.model.NRIC_PASSPORT_NO
      const response = await this.$axios.get(url)
      if (response.data.data !== '') {
        this.model.PATIENT_FK = JSON.stringify(response.data.data[0].value)
      }

      if (this.model.PATIENT_FK !== '') {
        this.patientNotExist = false
        return true
      } else {
        this.patientNotExist = true
        return false
      }
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
</style>
