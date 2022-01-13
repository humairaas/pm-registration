<!--
This page is not fully completed [last updated by Humaira': 27/12/2021]
  1. No validation
  2. Add Screening on button click is functioning(new row is added) but only the first data inserted is stored (using vue-form-generator)
-->
<template>
  <div class="content">
    <div class="container-fluid">

      <div class="row">
        <div class="col-12">

          <va-card class='px-3'>
            <div class="text-center"><h4 class="mt-5 mb-5 text-dark">DEPRESSION, ANXIETY AND STRESS SCALE (DASS)</h4></div>

            <div class='question'>Please read each statement and select a number 0, 1 , 2 or 3 that indicates how much the statement applied to you over the past week. There are no right or wrong answers. Do not spend too much time on any statement.</div>
            <div class="question-bm">Sila baca setiap kenyataan di bawah dan pilih jawapan anda berdasarkan jawapan 0, 1, 2 atau 3 bagi menggambarkan keadaan anda sepanjang minggu yang lalu. Tiada jawapan yang betul atau salah. Jangan mengambil masa yang terlalu lama untuk mana-mana kenyataan.</div>

            <hr class='my-4'>

            <div class = "r">
              <p class = "num">0</p>
              <p>Indicator<br><span class="bm">Indicator</span></p>
            </div>
            <div class = "r">
              <p class = "num">1</p>
              <p>Indicator<br><span class="bm">Indicator</span></p>
            </div>
            <div class = "r">
              <p class = "num">2</p>
              <p>Indicator<br><span class="bm">Indicator</span></p>
            </div>
            <div class = "r">
              <p class = "num">3</p>
              <p>Indicator<br><span class="bm">Indicator</span></p>
            </div>

            <div class = "mt-4 px-2">
              <vue-form-generator :schema="schema" :model="model" :options="formOptions" ref="dass"></vue-form-generator>
            </div>

            <!-- Buttons -->
            <div class="mt-5 mb-3">
              <div class="float-right">
                <button @click="calculateDass" type="submit" class="ml-2 btn btn-primary btn-fill btn-md">
                  <div class="fa fa-paper-plane" /> &nbsp;Submit
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
      tabIndex: 1,
      submitPath: false,

      model: {
        Q1: '',
        Q2: '',
        Q3: '',
        Q4: '',
        Q5: '',
        Q6: '',
        Q7: '',
        Q8: '',
        Q9: '',
      },
      schema: {
        groups: [
          {
            styleClasses: ['row', 'odd'],
            fields: [
              {
                type: 'label',
                label: '1.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: '',
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'Q1',
                values: [0, 1, 2, 3],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'even'],
            fields: [
              {
                type: 'label',
                label: '2.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: '',
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'Q2',
                values: [0, 1, 2, 3],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'odd'],
            fields: [
              {
                type: 'label',
                label: '3.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: '',
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'Q3',
                values: [0, 1, 2, 3],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'even'],
            fields: [
              {
                type: 'label',
                label: '4.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: '',
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'Q4',
                values: [0, 1, 2, 3],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'odd'],
            fields: [
              {
                type: 'label',
                label: '5.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: '',
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'Q5',
                values: [0, 1, 2, 3],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'even'],
            fields: [
              {
                type: 'label',
                label: '6.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: '',
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'Q6',
                values: [0, 1, 2, 3],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'odd'],
            fields: [
              {
                type: 'label',
                label: '7.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: '',
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'Q7',
                values: [0, 1, 2, 3],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'even'],
            fields: [
              {
                type: 'label',
                label: '8.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: '',
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'Q8',
                values: [0, 1, 2, 3],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'odd'],
            fields: [
              {
                type: 'label',
                label: '9.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: '',
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'Q9',
                values: [0, 1, 2, 3],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
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
  },
  methods: {
    calculateDass () {
      var error = this.validateDass()
      this.submitPath = true

      if (error) {
        // do score calculation

        // var patientId = JSON.parse(localStorage.getItem('ID'))

        // const data = new FormData()
        // data.append('score', JSON.stringify(score))
        // this.$axios
        //   .post('http://127.0.0.1:8000/api/addScreening?patientId=' + patientId + '&psyType=2', data)
        //   .then((response) => {
        //     this.$router.push({ path: 'psychometric-test-history' })
        //   })
        this.launchToast('DASS Completed')
      }
    },
    validateDass () {
      return this.$refs.dass.validate()
    },
    launchToast (text) {
      this.showToast(
        text,
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

ul.va-unordered > li,
.content ul > li {
  padding-left: 0;
}

.center {
  text-align: center;
}

.odd {
  background-color: rgb(240, 240, 240);
  padding-left: 10px;
  padding-bottom: 20px;
  padding-top: 20px;
}

.even {
  padding-left: 10px;
  padding-bottom: 20px;
  padding-top: 20px;
}

.question {
  font-size: 23px;
  font-weight: 400;
  text-align: center;
}

.question-bm {
  font-style: italic;
  font-size: 20px;
  color: dimgrey;
  text-align: center;
}

.r {
  display: inline-flex;
  width: 100%;
  align-items: center;
}

.num {
  margin-right: 20px;
  text-align: center;
  padding: 6px 12px;
  background: #eeeeee;
  border-radius: 20px;
  border-color: grey;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: bold;
  color: #777777;
}

.bm {
  font-style: italic;
  font-size: small;
  color: dimgrey;
}

.psy-display-inline label {
  display: inline !important;
  align-content: center;
  margin-right: 20px;
}

</style>
