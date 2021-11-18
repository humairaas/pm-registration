<template>
  <va-card :title="$t('LIST OF PATIENTS')">

    <div class="row align--center">
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
        <va-select
          v-model="branch"
          :label="$t('Branch')"
          :options="selectBranch"
          noClear
        />
      </div>
      <div class="flex xs12 md3">
        <va-select
          v-model="service"
          :label="$t('Services')"
          :options="selectService"
          noClear
        />
      </div>
    </div>

    <va-data-table
      :fields="fields"
      :data="filteredData"
      :per-page="parseInt(perPage)"
      @row-clicked="showUser"
      clickable
    >
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
import users from '../../data/patient.json'

export default {
  data () {
    return {
      term: '',
      perPage: '5',
      perPageOptions: ['5', '10', '50', '100'],
      users: users,
      branch: '',
      selectBranch: ['Mentari Selayang', 'Mentari Klang', 'Mentari Kluang'],
      service: '',
      selectService: ['Consultation', 'Rehab', 'Rehab - SE', 'Rehab - ETP', 'Rehab - Job Club',
        'CPS'],
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
        width: '20%',
      }, {
        name: 'age',
        title: this.$t('AGE'),
        width: '5%',
      }, {
        name: 'nric/passport',
        title: this.$t('NRIC/PASSPORT'),
        width: '15%',
      }, {
        name: 'next visit',
        title: this.$t('NEXT VISIT'),
        width: '10%',
      },
      {
        name: 'assigned doctor',
        title: this.$t('ASSIGNED DOCTOR'),
        width: '15%',
      }, {
        name: 'services',
        title: this.$t('SERVICES'),
        width: '15%',
      }]
    },
    filteredData () {
      if ((!this.term || this.term.length < 1) && this.branch === '' && this.service === '') {
        return this.users
      }

      return this.users.filter(item => {
        return item.services.startsWith(this.service) &&
                  item.branch.startsWith(this.branch) &&
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
    showUser (user) {
      alert(JSON.stringify(user))
    },
    search: debounce(function (term) {
      this.term = term
    }, 400),
  },
}
</script>

<style>

</style>
