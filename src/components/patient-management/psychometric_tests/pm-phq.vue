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

          <va-card>
            <div class="text-center"><h4 class="mt-5 mb-5 text-dark">PATIENT HEALTH QUESTIONNAIRE (PHQ-9)</h4></div>

            <div class='question'>Over the last 2 weeks, how often have you been bothered by any of the following problems?</div>
            <div class="question-bm">Dalam tempoh 2 minggu yang lepas, berapa kerapkali anda terganggu oleh masalah  berikut?</div>

            <hr class='my-4'>

            <div class ="row justify-content-between">
              <div class="col-lg-auto">
                <div class = "r">
                  <p class = "num">0</p>
                  <p>Not at all<br><span class="bm">Tidak pernah sama sekali</span></p>
                </div>
              </div>
              <div class="col-lg-auto">
                <div class = "r">
                  <p class = "num">1</p>
                  <p>Several days<br><span class="bm">Beberapa hari</span></p>
                </div>
              </div>
              <div class="col-lg-auto">
                <div class = "r">
                  <p class = "num">2</p>
                  <p>More than half the days<br><span class="bm">Lebih dari seminggu</span></p>
                </div>
              </div>
              <div class="col-lg-auto">
                <div class = "r mr-2">
                  <p class = "num">3</p>
                  <p>Nearly everyday<br><span class="bm">Hampir setiap hari</span></p>
                </div>
              </div>
            </div>

            <div class = "mt-4 px-2">
              <vue-form-generator :schema="schema" :model="model" :options="formOptions" ref="phq"></vue-form-generator>
            </div>

            <!-- Buttons -->
            <div class="mt-5 mb-3">
              <div class="float-right">
                <button @click="calculatePhq" type="submit" class="ml-2 btn btn-primary btn-fill btn-md">
                  <div class="fa fa-paper-plane" /> &nbsp;SUBMIT
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
                label: "Little interest or pleasure in doing things.<div class='bm'>Sedikit minat atau keseronokan dalam melakukan kerja-kerja.</div>",
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
                label: "Feeling down, depressed or hopeless.<div class='bm'>Merasa murung, sedih atau tiada harapan.</div>",
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
                label: "Trouble falling/staying asleep, sleeping too much.<div class='bm'>Masalah hendak tidur / semasa tidur, tidur terlalu banyak.</div>",
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
                label: "Feeling tired or having little energy.<div class='bm'>Merasa letih atau kurang bertenaga.</div>",
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
                label: "Poor appetite or over eating.<div class='bm'>Kurang selera atau terlalu banyak makan.</div>",
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
                label: "Feeling bad about yourself - or that you are a failure or have let yourself or your family down.<div class='bm'>Mempunyai perasaan buruk terhadap diri sendiri - ataupun merasa gagal terhadap diri sendiri ataupun menghampakan diri atau keluarga.</div>",
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
                label: "Trouble concentrating on things, such as reading the newspaper or watching television.<div class='bm'>Masalah menumpukan perhatian terhadap perkara-perkara seperti membaca suratkhabar atau menonton televisyen.</div>",
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
                label: "Moving or speaking so slowly that people could have noticed. Or the opposite being so fidgety or restless that you have been moving around a lot more than usual.<div class='bm'>Bergerak atau bercakap terlalu lambat sehingga disedari oleh orang lain. Ataupun bertentangan - terlalu resah atau gelisah sehingga anda bergerak lebih dari biasa.</div>",
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
                label: "Thoughts that you would be better off dead or of hurting yourself in some way.<div class='bm'>Berfikiran bahawa lebih baik jika anda telah mati atau ingin mencederakan diri anda dalam sesuatu cara.</div>",
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
    calculatePhq () {
      var error = this.validatePhq()

      if (error) {
        let NAA = 0
        let SD = 0
        let MTHD = 0
        let NE = 0

        for (const x in this.model) {
          if (this.model[x] === 0) {
            NAA++
          } else if (this.model[x] === 1) {
            SD++
          } else if (this.model[x] === 2) {
            MTHD++
          } else {
            NE++
          }
        }
        var score = NAA * 0 + SD * 1 + MTHD * 2 + NE * 3

        var patientId = JSON.parse(localStorage.getItem('ID'))
        this.submitPath = true

        const data = new FormData()
        data.append('score', JSON.stringify(score))
        this.$axios
          .post('http://127.0.0.1:8000/api/addScreening?patientId=' + patientId + '&psyType=1', data)
          .then((response) => {
            this.$router.push({ path: 'psychometric-test-history' })
          })
        this.launchToast('PHQ-9 Completed')
      }
    },
    validatePhq () {
      return this.$refs.phq.validate()
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
