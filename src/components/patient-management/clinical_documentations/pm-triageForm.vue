<template>
  <div class="content">
    <div class="container-fluid">

      <div class="row">
        <div class="col-12">

          <va-card>
            <br>
            <b-tabs content-class="mt-3 px-5 pb-5" v-model="tabIndex" fill>

              <b-tab title="1. Triage Form" active>
                <h5>Part A: Risk Evaluation</h5>
                <table class="triage-table mb-3">
                  <tr>
                    <th>Risk Assessment Descriptions</th>
                    <th></th>
                  </tr>
                  <tr>
                    <td>History of aggressive and impulsive behaviour</td>
                    <td><input type="checkbox" true-value=1 false-value=0 v-model="model.HISTORY"></td>
                  </tr>
                  <tr>
                    <td>History of criminal case</td>
                    <td><input type="checkbox" true-value=1 false-value=0 v-model="model.CRIMINAL"></td>
                  </tr>
                  <tr>
                    <td>Detereoration of clinical condition</td>
                    <td><input type="checkbox" true-value=1 false-value=0 v-model="model.CLINICAL"></td>
                  </tr>
                  <tr>
                    <td>Neglect of self-care</td>
                    <td><input type="checkbox" true-value=1 false-value=0 v-model="model.SELFCARE"></td>
                  </tr>
                </table>

                <table class="triage-table mt-3" >
                  <tr>
                    <th>Criteria</th>
                    <th class="center">Idea (Yes)</th>
                    <th class="center">Attempt (Yes)</th>
                  </tr>
                  <tr>
                    <td>Suicidal behaviour</td>
                    <td class="center"><input type="checkbox" true-value=1 false-value=0 v-model="model.IDEA_SUICIDAL"></td>
                    <td class="center"><input type="checkbox" true-value=1 false-value=0 v-model="model.ATTEMPT_SUICIDAL"></td>
                  </tr>
                  <tr>
                    <td>Homicidal</td>
                    <td class="center"><input type="checkbox" true-value=1 false-value=0 v-model="model.IDEA_HOMICIDAL"></td>
                    <td class="center"><input type="checkbox" true-value=1 false-value=0 v-model="model.ATTEMPT_HOMICIDAL"></td>
                  </tr>
                  <tr>
                    <td>Aggressive</td>
                    <td class="center"><input type="checkbox" true-value=1 false-value=0 v-model="model.IDEA_AGGRESIVE"></td>
                    <td class="center"><input type="checkbox" true-value=1 false-value=0 v-model="model.ATTEMPT_AGGRESIVE"></td>
                  </tr>
                </table>

                <h5>Part B: Social Support</h5>
                <input type="checkbox" id="no-family" true-value=1 false-value=0 v-model="model.NO_FAMILY" class="ml-3">
                <label for="no-family" class="ml-4">Has no family, friends or guardian</label>
                <br>
                <input type="checkbox" id="homeless" true-value=1 false-value=0 v-model="model.HOMELESS" class="ml-3">
                <label for="homeless" class="ml-4">Homeless</label>

                <h5>Part C: Capacity to Work Together</h5>
                <input type="checkbox" id="no-family" true-value=1 false-value=0 v-model="model.TOGETHER" class="ml-3">
                <label for="no-family" class="ml-4">Cannot give commitment to work together</label>
                <br>
                <input type="checkbox" id="homeless" true-value=1 false-value=0 v-model="model.INTEREST" class="ml-3">
                <label for="homeless" class="ml-4">Showed no interest in treatment</label>
                <br>

                <h5 style="float: left;">Part D: Screening</h5>
                <div class="float-right">
                  <button type="button" class="btn sizebtn" @click="addNewScreening">
                    <div class="fa fa-plus-circle"/>
                  </button>
                </div>
                <table class=" triage-table mt-3" >
                  <tr>
                    <th>Screening Test</th>
                    <th>Score</th>
                  </tr>
                  <tr>
                    <td><vue-form-generator :model="model" :schema="testSchema" :options="formOptions" ref="test"></vue-form-generator></td>
                    <td><vue-form-generator :model="model" :schema="scoreSchema" :options="formOptions" ref="score"></vue-form-generator></td>
                  </tr>
                </table>

              </b-tab>

              <b-tab title="2. Outcome">
                <h5>Part E: Outcome</h5>
                <vue-form-generator :model="model" :schema="schema" :options="formOptions" ref="triageOutcome">
                </vue-form-generator>
              </b-tab>

              <b-tab title="3. Book Appointment">
              </b-tab>
            </b-tabs>

            <!-- Buttons -->
            <div class="my-3">
              <div class="float-left">
                <button v-if="!tabIndex==0" @click="tabIndex--" type="button" class="btn btn-primary btn-fill btn-md">
                  <div class="fa fa-step-backward" /> &nbsp; Previous
                </button>
              </div>
              <div class="float-right">
                <button v-if="tabIndex < 2" @click="tabIndex++" type="button" class="btn btn-info btn-fill btn-md">
                  Next <div class="fa fa-step-forward" />
                </button>

                <button v-if="tabIndex==2" @click="validateTriage" type="submit" class="ml-2 btn btn-primary btn-fill btn-md">
                  <div class="fa fa-paper-plane" /> &nbsp;Submit
                </button>
              </div>
            </div>
          </va-card>

          <!-- <va-card class="p-5">
            <div class="text-center"><h4 class="mt-4 mb-5 text-dark">TRIAGE FORM</h4></div>

            <h5>Part A: Risk Evaluation</h5>
            <table class="triage-table mt-3 mb-3">
              <tr>
                <th>Risk Assessment Descriptions</th>
                <th></th>
              </tr>
              <tr>
                <td>History of aggressive and impulsive behaviour</td>
                <td><input type="checkbox" true-value=1 false-value=0 v-model="model.HISTORY"></td>
              </tr>
              <tr>
                <td>History of criminal case</td>
                <td><input type="checkbox" true-value=1 false-value=0 v-model="model.CRIMINAL"></td>
              </tr>
              <tr>
                <td>Detereoration of clinical condition</td>
                <td><input type="checkbox" true-value=1 false-value=0 v-model="model.CLINICAL"></td>
              </tr>
              <tr>
                <td>Neglect of self-care</td>
                <td><input type="checkbox" true-value=1 false-value=0 v-model="model.SELFCARE"></td>
              </tr>
            </table>

            <table class="triage-table mt-3" >
              <tr>
                <th>Criteria</th>
                <th class="center">Idea (Yes)</th>
                <th class="center">Attempt (Yes)</th>
              </tr>
              <tr>
                <td>Suicidal behaviour</td>
                <td class="center"><input type="checkbox" true-value=1 false-value=0 v-model="model.IDEA_SUICIDAL"></td>
                <td class="center"><input type="checkbox" true-value=1 false-value=0 v-model="model.ATTEMPT_SUICIDAL"></td>
              </tr>
              <tr>
                <td>Homicidal</td>
                <td class="center"><input type="checkbox" true-value=1 false-value=0 v-model="model.IDEA_HOMICIDAL"></td>
                <td class="center"><input type="checkbox" true-value=1 false-value=0 v-model="model.ATTEMPT_HOMICIDAL"></td>
              </tr>
              <tr>
                <td>Aggressive</td>
                <td class="center"><input type="checkbox" true-value=1 false-value=0 v-model="model.IDEA_AGGRESIVE"></td>
                <td class="center"><input type="checkbox" true-value=1 false-value=0 v-model="model.ATTEMPT_AGGRESIVE"></td>
              </tr>
            </table>

            <h5>Part B: Social Support</h5>
            <input type="checkbox" id="no-family" true-value=1 false-value=0 v-model="model.NO_FAMILY" class="ml-3">
            <label for="no-family" class="ml-4">Has no family, friends or guardian</label>
            <br>
            <input type="checkbox" id="homeless" true-value=1 false-value=0 v-model="model.HOMELESS" class="ml-3">
            <label for="homeless" class="ml-4">Homeless</label>

            <h5>Part C: Capacity to Work Together</h5>
            <input type="checkbox" id="no-family" true-value=1 false-value=0 v-model="model.TOGETHER" class="ml-3">
            <label for="no-family" class="ml-4">Cannot give commitment to work together</label>
            <br>
            <input type="checkbox" id="homeless" true-value=1 false-value=0 v-model="model.INTEREST" class="ml-3">
            <label for="homeless" class="ml-4">Showed no interest in treatment</label>

            <h5>Part D: Outcome</h5>
            <vue-form-generator :model="model" :schema="schema" :options="formOptions" ref="triageOutcome">
            </vue-form-generator>

            <div class="mt-3">
              <div class="float-left">
                <button @click="$router.push({ path: 'patient-profile' })" type="button" class="ml-2 btn btn-fill btn-md btn-blue">
                  <div class="fa fa-undo" /> &nbsp; Return
                </button>
              </div>
            </div>

            <div class="mt-3">
              <div class="float-right">
                <button @click="validateTriage" type="submit" class="ml-2 btn btn-fill btn-md btn-blue">
                  <div class="fa fa-paper-plane" /> &nbsp; Submit
                </button>
              </div>
            </div>
          </va-card> -->

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
        HISTORY: 0,
        CRIMINAL: 0,
        CLINICAL: 0,
        SELFCARE: 0,

        IDEA_SUICIDAL: 0,
        ATTEMPT_SUICIDAL: 0,
        IDEA_HOMICIDAL: 0,
        ATTEMPT_HOMICIDAL: 0,
        IDEA_AGGRESIVE: 0,
        ATTEMPT_AGGRESIVE: 0,

        NO_FAMILY: 0,
        HOMELESS: 0,
        TOGETHER: 0,
        INTEREST: 0,

        TEST: '',
        SCORE: '',

        TREATMENT: '',
        PLACEMENT: '',
      },
      schema: {
        fields: [
          {
            type: 'radios',
            label: '<b>Treatment</b>',
            model: 'TREATMENT',
            values: [
              { value: 0, name: 'Checked immediately' },
              { value: 1, name: 'Given an appointment (within 2 weeks)' },
              { value: 2, name: 'Given a regular appointment (within 2-6 weeks)' },
            ],
            required: true,
            validator: 'required',
            styleClasses: 'ml-3',
          },
          {
            type: 'radios',
            label: '<b>Placement<b>',
            model: 'PLACEMENT',
            values: [
              { value: 0, name: 'Referred to the main hospital' },
              { value: 1, name: 'Discharge with treatment' },
            ],
            required: true,
            validator: 'required',
            styleClasses: 'ml-3',
          },
        ],
      },
      testSchema: {
        fields: [
          {
            type: 'select',
            model: 'SCREENING.TEST',
            values: [
              { id: 0, name: 'PHQ' },
              { id: 1, name: 'DASS' },
              { id: 2, name: 'WHODAS' },
            ],
            required: true,
            validator: 'required',
            styleClasses: 'mr-5',
          },
        ],
      },
      scoreSchema: {
        fields: [
          {
            type: 'input',
            inputType: 'number',
            model: 'SCREENING.SCORE',
            required: true,
            validator: 'number',
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
  },
  methods: {
    addNewScreening () {

    },
    validateTriage () {
      var errors = this.$refs.triageOutcome.validate()

      if (errors) {
        var patientId = JSON.parse(localStorage.getItem('ID'))
        this.submitPath = true

        const data = new FormData()
        data.append('triageData', JSON.stringify(this.model))
        this.$axios
          .post('http://127.0.0.1:8000/api/addTriage?patientId=' + patientId, data)
          .then((response) => {
            this.$router.push({ path: 'patient-profile' })
          })
        this.launchToast('Triage Form Added')
      }
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

.triage-table {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

.center {
  text-align: center;
}

@media screen and (max-width: 1000px) {
  .clinical-card {
    width: 100%;
  }
}

</style>
