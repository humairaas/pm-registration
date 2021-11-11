<template>
  <va-card :title="$t('Clinical Information')">
      <div class="flex  md3 offset--md11 ">
        <va-button  icon="fa fa-plus"></va-button>
      </div>
    
    <va-data-table
      :fields="fields"
      :data="filteredData"
      :per-page="parseInt(perPage)"
      @row-clicked="showUser"
      clickable
    >
      <template slot="trend" slot-scope="props">
        <va-icon :name="getTrendIcon(props.rowData)" :color="getTrendColor(props.rowData)" />
      </template>

        <template slot="icon">
        <va-icon name="fa fa-trash" color="secondary" />
      </template>
      <template slot="icon2">
        <va-icon name="fa fa-edit" color="secondary" />
      </template>
      
      <template slot="status" slot-scope="props">
        <va-badge :color="props.rowData.color">
          {{ props.rowData.status }}
        </va-badge>
      </template>

    </va-data-table>
  </va-card>
</template>

<script>
import { debounce } from 'lodash'
import users from '../../../data/users.json'

export default {
  data () {
    return {
      term: null,
      perPage: '1',
      perPageOptions: ['4', '6', '10', '20'],
      sizesList: ['MENTARI SELAYANG', 'MENTARI SG. BULOH', 'MENTARI PUTRAJAYA', 'MENTARI MELAKA'],
      services: ['Consultation', 'Rehabilitation', 'Community Psychiatric Services'],
      users: users,
    }
  },
  formOptions: {
        // validationErrorClass: "has-error",
        // validationSuccessClass: "has-`success`",
        validateAfterChanged: true,
      },
  thirdTabSchema:{
        groups: [
          {
          styleClasses: "row",
          fields: [
           {
            type: 'input',
            inputType: 'date',
            label: 'Date  ',
            model: 'incorporationDate',
            placeholder: 'Enter date',
            required: true,
            styleClasses: 'col-md-4',
          },
             {
            type: 'vueMultiSelect',
            model: 'services',
            label: 'Services',
            placeholder: 'Select Services',
            required: true,
            validator: 'required',
            styleClasses: 'col-md-4',
            selectOptions: {
              multiple: false,
              key: 'name',
              label: 'name',
              searchable: true,
            },
          values: (model, schema) => {
            return this.services
          }
          },
          ],
        }],
      },
  computed: {
    fields () {
      return [{
        name: 'no',
        width: '40px',
        height: '45px',
        dataClass: 'text-center',
      weight: '',
      height: '',
      result: 'Click "Calculate"'

      },
      {
        name: 'appt_date',
        title: this.$t('Date'),
        width: '10%',
      },
      {
        name: 'temperature',
        title: this.$t('Temperature (°C)'),
      },
      {
        name: 'blood_pressure',
        title: this.$t('Blood Prssure (mm/Hg)'),
      },
       {
        name: 'pulse_rate',
        title: this.$t('Pulse Rate (bpm)'),
      },
       {
        name: 'weight',
        title: this.$t('Weight (KG)'),
      },
      {
        name: 'height',
        title: this.$t('Height(CM)'),
      },
      {
        name: 'bmi',
        title: this.$t('BMI'),
         width: '5%',
      },
      {
        name: 'waist',
        title: this.$t('Waist Circumference (CM)'),
      },
      {
        name: 'taken_by',
        title: this.$t('Taken By'),
      },
      {
        title: this.$t('Actions'),
        name: '__slot:icon',
        dataClass: 'text-center',
      }]
    },
    filteredData () {
      if (!this.term || this.term.length < 1) {
        return this.users
      }

      return this.users.filter(item => {
        return item.fullName.toLowerCase().startsWith(this.term.toLowerCase())
      })
    },
  },
   model: {
        show1: true,
        services: '',
   },
  methods: {
      calculate() {
      let weight = parseFloat(this.weight)
      let height = parseFloat(this.height) / 100
      this.result = weight / (height * height)
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
      alert(JSON.stringify(user))
    },
    search: debounce(function (term) {
      this.term = term
    }, 400),
  },
}
</script>
<style lang="scss" >
.va-card__header-title {
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.0375rem;
  text-transform: uppercase;
  color: #104fca;
}
</style>
