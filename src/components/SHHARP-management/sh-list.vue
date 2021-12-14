<template>
  <va-card>

    <div class="row align--center">
      <div class="flex xs12 md6"><h5>LIST OF PATIENTS</h5></div>
      <div class="flex xs12 md1 offset--md5">
        <button @click="$router.push({name: 'shharp-demographic'})" type="button" class="ml-2 btn btn-fill btn-md btn-yellow btn-circle">
          <div class="fa fa-plus" />
        </button>
      </div>
    </div>

    <div class="row">
      <div class="flex xs12 md6 offset--md6">
        <va-input
          :value="term"
          :placeholder="$t('Search By Name/NRIC/Passport/MRN')"
          @input="search"
          removable
        >
          <va-icon name="fa fa-search" slot="prepend" />
        </va-input>
      </div>
    </div>

    <va-data-table
      :fields="fields"
      :data="filteredData"
      :per-page="parseInt(perPage)"
      @row-clicked="showPatientProfile"
      :hoverable="true"
      clickable
    >
      <template slot="no" slot-scope="row">
        {{ row.rowIndex + 1 }}
      </template>

      <template slot="age" slot-scope="props">
        {{ getAge(props.rowData.age) }}
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

export default {
  data () {
    return {
      term: '',
      no: 1,
      perPage: '5',
      perPageOptions: ['5', '10', '50', '100'],
      users: [],
    }
  },
  mounted () {
    this.$axios
      .get('http://127.0.0.1:8000/api/getSHHARPList')
      .then((response) => {
        this.users = response.data.data
      })
  },
  computed: {
    fields () {
      return [
        {
          name: '__slot:no',
          title: this.$t('NO'),
          width: '30px',
          height: '45px',
          dataClass: 'text-center',
        },
        {
          name: 'name',
          title: this.$t('NAME'),
          width: '40%',
        },
        {
          name: '__slot:age',
          title: this.$t('AGE'),
          width: '15%',
        },
        {
          name: 'nricPassport',
          title: this.$t('NRIC/PASSPORT'),
          width: '20%',
        },
        {
          name: 'date',
          title: this.$t('LAST SEEN'),
          width: '20%',
        },
      ]
    },
    filteredData () {
      if (!this.term || this.term.length < 1) {
        return this.users
      }

      return this.users.filter(item => {
        return item.name.toLowerCase().startsWith(this.term.toLowerCase()) ||
                item.nricPassport.toLowerCase().startsWith(this.term.toLowerCase())
      })
    },
  },
  methods: {
    getAge (birthdate) {
      return new Date().getFullYear() - birthdate.toString().substring(0, 4)
    },
    showPatientProfile (user) {
      var ID = {
        patientId: user.patient_id,
      }
      localStorage.setItem('ID', JSON.stringify(ID))
      this.$router.push({ name: 'patient_consultation' })
    },
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
      // alert(JSON.stringify(user))
      this.$router.push({ name: 'patient_consultation' })
    },
    search: debounce(function (term) {
      this.term = term
    }, 400),
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
