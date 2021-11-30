<template>
  <va-card>
    <div class="row align--center">
      <div class="flex xs12 md6"><h5>LIST OF APPOINTMENTS</h5></div>
      <div class="flex xs12 md1 offset--md5"><va-button color="warning" size="small" :to="{ name: 'patient_registration'}">+</va-button></div>
    </div>

    <div class="row">
      <div class="flex xs12 md6">
        <va-input
          :value="term"
          :placeholder="$t('Search By Name/NRIC/Passport/MRN')"
          @input="search"
          removable
        >
          <va-icon name="fa fa-search" slot="prepend" />
        </va-input>
      </div>
      <div class="flex xs12 md3">
        <va-date-picker
          v-model="date"
          mode="single"
          placeholder="Filter By Date"
          label="Date"
        />
      </div>
      <div class="flex xs12 md3">
        <va-select
          v-model="service"
          :label="$t('Services')"
          :placeholder="$t('Filter By Service')"
          :options="selectService"
        />
      </div>
    </div>

    <va-data-table
      :fields="fields"
      :data="filteredData"
      :per-page="parseInt(perPage)"
      :hoverable="true"
      clickable
    >

      <template slot="actions">
        <va-button flat small color="#61CE70" icon="fa fa-check" @click="launchToast()" class="ma-0">
        </va-button>
        <va-button flat small color="#75757" icon="fa fa-edit" @click="showForm()" class="ma-0">
        </va-button>
        <va-button flat small color="#DC3545" icon="fa fa-close" @click="launchToast()" class="ma-0">
        </va-button>
      </template>

    </va-data-table>

    <div class="row">
      <div class="flex xs12 md2 offset--md10">
        <va-select
          v-model="perPage"
          :label="$t('tables.perPage')"
          :options="perPageOptions"
          noClear
        />
      </div>
    </div>

  </va-card>
</template>

<script>
import { debounce } from 'lodash'
import users from '../../../data/patient.json'

export default {
  data () {
    return {
      term: '',
      no: 1,
      perPage: '5',
      perPageOptions: ['5', '10', '50', '100'],
      users: users,
      date: '',
      formatDate: '',
      service: '',
      selectService: ['Consultation', 'Rehab', 'Rehab - SE', 'Rehab - ETP', 'Rehab - Job Club', 'CPS'],
    }
  },
  computed: {
    fields () {
      return [{
        name: 'no',
        title: this.$t('NO'),
        width: '30px',
        height: '45px',
        dataClass: 'text-center',
      }, {
        name: 'mrn',
        title: this.$t('MRN'),
        width: '10%',
      }, {
        name: 'salutation',
        title: this.$t('SALUTATION'),
        width: '5%',
      }, {
        name: 'name',
        title: this.$t('NAME'),
        width: '18%',
      }, {
        name: 'nric/passport',
        title: this.$t('NRIC/PASSPORT'),
        width: '15%',
      }, {
        name: 'status',
        title: this.$t('STATUS'),
        width: '5%',
      }, {
        name: 'appointment date',
        title: this.$t('APPT. DATE'),
        width: '10%',
      }, {
        name: 'appointment time',
        title: this.$t('APPT. TIME'),
        width: '10%',
      }, {
        name: 'assigned doctor',
        title: this.$t('ASSIGNED DOCTOR'),
        width: '10%',
      }, {
        name: 'services',
        title: this.$t('SERVICES'),
        width: '5%',
      }, {
        name: '__slot:actions',
        title: this.$t('ACTION'),
        width: '12%',
      }]
    },
    filteredData () {
      if ((!this.term || this.term.length < 1) && this.date === '' && this.service === '') {
        return this.users
      }

      return this.users.filter(item => {
        return item.services.startsWith(this.service) &&
                  item['appointment date'].startsWith(this.formatDate) &&
                  (item.name.toLowerCase().startsWith(this.term.toLowerCase()) ||
                  item.mrn.toLowerCase().startsWith(this.term.toLowerCase()) ||
                  item['nric/passport'].toLowerCase().startsWith(this.term.toLowerCase()))
      })
    },
  },
  methods: {
    getTrendIcon (user) {
      if (user.trend === 'up') {
        return 'fa fa-caret-up'
      }

      if (user.trend === 'down') {
        return 'fa fa-caret-down'
      }

      return 'fa fa-minus'
    },
    getTrendColor (user) {
      if (user.trend === 'up') {
        return 'primary'
      }

      if (user.trend === 'down') {
        return 'danger'
      }

      return 'grey'
    },
    showForm () {
      this.$router.push({ name: 'patient_consultation' })
    },
    launchToast () {
      this.showToast(
        ' Registration Successful !',
        {
          icon: 'fa-check',
          position: 'top-center',
          duration: 2500,
          fullWidth: false,
        },
      )
    },
    search: debounce(function (term) {
      this.term = term
    }, 400),
  },
  watch: {
    date: function () {
      var year = this.date.toString().slice(0, 4)
      var month = this.date.toString().slice(5, 7)
      var day = this.date.toString().slice(8, 10)
      var formatted = day + '-' + month + '-' + year
      this.formatDate = formatted
    },
  },
}
</script>

<style>
thead {
  background-color: #bbf2eb;
}

.va-card__header-title {
  color: #000000 !important;
  font-size: 1rem !important;
}
</style>
