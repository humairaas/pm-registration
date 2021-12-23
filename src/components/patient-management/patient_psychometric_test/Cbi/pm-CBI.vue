<template>
  <div>

    <div class="container">

      <div class = "container" id = "test">
        <h4 class="text-center">Choose the appropriate answer for each question based on the level defined.</h4>
        <p class="malayHeader">Pilih jawapan bagi setiap soalan berdasarkan tahap yang dinyatakan.</p>
        <hr class="hr-margin">

        <div class="scale">
          <div class = "r">
            <p id = "num">1</p>
            <p class="indicator">Always / Very High Degree<br><span class="malay">Sentiasa / Tahap yang Sangat Tinggi</span></p>
          </div>

          <div class = "r">
            <p id = "num">2</p>
            <p class="indicator">Often / High Degree<br><span class="malay">Kerap kali / Tahap tinggi</span></p>
          </div>

          <div class = "r">
            <p id = "num">3</p>
            <p class="indicator">Sometimes / Somewhat High<br><span class="malay">Kadang / Tahap Agak Tinggi</span></p>
          </div>

          <div class = "r">
            <p id = "num">4</p>
            <p class="indicator">Seldom / Low Degree<br><span class="malay">Jarang / Tahap Rendah</span></p>
          </div>

          <div class = "r">
            <p id = "num">5</p>
            <p class="indicator">Never / Almost Never / Very Low Degree<br><span class="malay">Tidak Pernah / Hampir Tidak Pernah / Tahap Sangat Rendah</span></p>
          </div>
        </div>

        <div class = "mt-4">
          <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      rangeInfo: null,
      model: {
        personal: [],
        work: [],
        client: [],
      },
      schema: {
        groups: [{
          legend: 'PART 1: PERSONAL BURNOUT',
          fields: [
            {
              type: 'radios',
              label: "<ol start = '1'><li class='label-width'>How often do you feel tired?<span class='requiredLabel'> *</span><br><span class='malay'>Berapa kerap anda berasa letih?</span></li></ol>",
              model: 'personal[0]',
              values: [
                { name: 1, value: 100 },
                { name: 2, value: 75 },
                { name: 3, value: 35 },
                { name: 4, value: 25 },
                { name: 5, value: 0 },
              ],
              required: true,
              validator: 'required',
              styleClasses: 'odd-row',
            },
            {
              type: 'radios',
              label: "<ol start = '2'><li class='label-width'>How often are you physically exhausted?<span class='requiredLabel'> *</span><br><span class='malay'>Berapa kerap anda berasa letih secara fizikal?</span></li></ol>",
              model: 'personal[1]',
              values: [
                { name: 1, value: 100 },
                { name: 2, value: 75 },
                { name: 3, value: 35 },
                { name: 4, value: 25 },
                { name: 5, value: 0 },
              ],
              required: true,
              validator: 'required',
              styleClasses: 'even-row',
            },
            {
              type: 'radios',
              label: "<ol start = '3'><li class='label-width'>How often are you emotionally exhausted?<span class='requiredLabel'> *</span><br><span class='malay'>Berapa kerap anda berasa letih secara emosi?</span></li></ol>",
              model: 'personal[2]',
              values: [
                { name: 1, value: 100 },
                { name: 2, value: 75 },
                { name: 3, value: 35 },
                { name: 4, value: 25 },
                { name: 5, value: 0 },
              ],
              required: true,
              validator: 'required',
              styleClasses: 'odd-row',
            },
            {
              type: 'radios',
              label: "<ol start = '4'><li class='label-width'>How often do you think: “I can't take it anymore”?<span class='requiredLabel'> *</span><br><span class='malay'>Berapa kerap anda berfikir: “Saya sudah tidak sanggup meneruskannya?”</span></li></ol>",
              model: 'personal[3]',
              values: [
                { name: 1, value: 100 },
                { name: 2, value: 75 },
                { name: 3, value: 35 },
                { name: 4, value: 25 },
                { name: 5, value: 0 },
              ],
              required: true,
              validator: 'required',
              styleClasses: 'even-row',
            },
            {
              type: 'radios',
              label: "<ol start = '5'><li class='label-width'>How often do you feel worn out?<span class='requiredLabel'> *</span><br><span class='malay'>Berapa kerap anda berasa lesu?</span></li></ol>",
              model: 'personal[4]',
              values: [
                { name: 1, value: 100 },
                { name: 2, value: 75 },
                { name: 3, value: 35 },
                { name: 4, value: 25 },
                { name: 5, value: 0 },
              ],
              required: true,
              validator: 'required',
              styleClasses: 'odd-row',
            },
            {
              type: 'radios',
              label: "<ol start = '6'><li class='label-width'>How often do you feel weak and susceptible to illness?<span class='requiredLabel'> *</span><br><span class='malay'>Berapa kerap anda berasa lemah dan senang mendapat penyakit?</span></li></ol>",
              model: 'personal[5]',
              values: [
                { name: 1, value: 100 },
                { name: 2, value: 75 },
                { name: 3, value: 35 },
                { name: 4, value: 25 },
                { name: 5, value: 0 },
              ],
              required: true,
              validator: 'required',
              styleClasses: 'even-row',
            },
          ],
        },
        {
          legend: 'PART 2: WORK-RELATED BURNOUT',
          fields: [
            {
              type: 'radios',
              label: "<ol start = '1'><li class='label-width'>Is your work emotionally exhausting?<span class='requiredLabel'> *</span><br><span class='malay'>Adakah kerja anda meletihkan emosi anda?</span></li></ol>",
              model: 'work[0]',
              values: [
                { name: 1, value: 100 },
                { name: 2, value: 75 },
                { name: 3, value: 35 },
                { name: 4, value: 25 },
                { name: 5, value: 0 },
              ],
              required: true,
              validator: 'required',
              styleClasses: 'odd-row',
            },
            {
              type: 'radios',
              label: "<ol start = '2'><li class='label-width'>Do you feel burn out because of your work?<span class='requiredLabel'> *</span><br><span class='malay'>Adakah anda berasa lesu upaya (burnout) disebabkan pekerjaan anda?</span></li></ol>",
              model: 'work[1]',
              values: [
                { name: 1, value: 100 },
                { name: 2, value: 75 },
                { name: 3, value: 35 },
                { name: 4, value: 25 },
                { name: 5, value: 0 },
              ],
              required: true,
              validator: 'required',
              styleClasses: 'even-row',
            },
            {
              type: 'radios',
              label: "<ol start = '3'><li class='label-width'>Does your work frustate you?<span class='requiredLabel'> *</span><br><span class='malay'>Adakah anda berasa kecewa dengan pekerjaan anda?</span></li></ol>",
              model: 'work[2]',
              values: [
                { name: 1, value: 100 },
                { name: 2, value: 75 },
                { name: 3, value: 35 },
                { name: 4, value: 25 },
                { name: 5, value: 0 },
              ],
              required: true,
              validator: 'required',
              styleClasses: 'odd-row',
            },
            {
              type: 'radios',
              label: "<ol start = '4'><li class='label-width'>Do you feel worn out at the end of the working day?<span class='requiredLabel'> *</span><br><span class='malay'>Adakah anda berasa lesu pada akhir hari bekerja?</span></li></ol>",
              model: 'work[3]',
              values: [
                { name: 1, value: 100 },
                { name: 2, value: 75 },
                { name: 3, value: 35 },
                { name: 4, value: 25 },
                { name: 5, value: 0 },
              ],
              required: true,
              validator: 'required',
              styleClasses: 'even-row',
            },
            {
              type: 'radios',
              label: "<ol start = '5'><li class='label-width'>Are you exhausted in the morning at the thought of another day at work?<span class='requiredLabel'> *</span><br><span class='malay'>Adakah anda keletihan pada waktu pagi apabila memikirkan sehari lagi di tempat kerja?</span></li></ol>",
              model: 'work[4]',
              values: [
                { name: 1, value: 100 },
                { name: 2, value: 75 },
                { name: 3, value: 35 },
                { name: 4, value: 25 },
                { name: 5, value: 0 },
              ],
              required: true,
              validator: 'required',
              styleClasses: 'odd-row',
            },
            {
              type: 'radios',
              label: "<ol start = '6'><li class='label-width'>Do you feel that every working hour is tiring for you?</span><span class='requiredLabel'> *</span><br><span class='malay'>Adakah anda berasa setiap waktu bekerja memenatkan anda?</span></li></ol>",
              model: 'work[5]',
              values: [
                { name: 1, value: 100 },
                { name: 2, value: 75 },
                { name: 3, value: 35 },
                { name: 4, value: 25 },
                { name: 5, value: 0 },
              ],
              required: true,
              validator: 'required',
              styleClasses: 'even-row',
            },
            {
              type: 'radios',
              label: "<ol start = '7'><li class='label-width'>Do you have enough energy for family and friends during leisure time?</span><span class='requiredLabel'> *</span><br><span class='malay'>Adakah anda mempunyai tenaga yang mencukupi untuk keluarga dan rakan rakan pada masa lapang?</span></li></ol>",
              model: 'work[6]',
              values: [
                { name: 1, value: 0 },
                { name: 2, value: 25 },
                { name: 3, value: 35 },
                { name: 4, value: 75 },
                { name: 5, value: 100 },
              ],
              required: true,
              validator: 'required',
              styleClasses: 'odd-row',
            },
          ],
        },
        {
          legend: 'PART 3: CLIENT RELATED BURNOUT',
          fields: [
            {
              type: 'radios',
              label: "<ol start = '1'><li class='label-width'>Do you find it hard to work with clients?<span class='requiredLabel'> *</span><br><span class='malay'>Adakah anda mengalami kesukaran untuk berurusan dengan klien?</span></li></ol>",
              model: 'client[0]',
              values: [
                { name: 1, value: 100 },
                { name: 2, value: 75 },
                { name: 3, value: 35 },
                { name: 4, value: 25 },
                { name: 5, value: 0 },
              ],
              required: true,
              validator: 'required',
              styleClasses: 'odd-row',
            },
            {
              type: 'radios',
              label: "<ol start = '2'><li class='label-width'>Do you find it frustating to work with clients?<span class='requiredLabel'> *</span><br><span class='malay'>Adakah anda berasa berurusan dengan klien mengecewakan?</span></li></ol>",
              model: 'client[1]',
              values: [
                { name: 1, value: 100 },
                { name: 2, value: 75 },
                { name: 3, value: 35 },
                { name: 4, value: 25 },
                { name: 5, value: 0 },
              ],
              required: true,
              validator: 'required',
              styleClasses: 'even-row',
            },
            {
              type: 'radios',
              label: "<ol start = '3'><li class='label-width'>Does it drain your energy to work with clients?<span class='requiredLabel'> *</span><br><span class='malay'>Adakah bekerja dengan klien menghabiskan tenaga anda?</span></li></ol>",
              model: 'client[2]',
              values: [
                { name: 1, value: 100 },
                { name: 2, value: 75 },
                { name: 3, value: 35 },
                { name: 4, value: 25 },
                { name: 5, value: 0 },
              ],
              required: true,
              validator: 'required',
              styleClasses: 'odd-row',
            },
            {
              type: 'radios',
              label: "<ol start = '4'><li class='label-width'>Do you feel that you give more than you get back when you work with clients?<span class='requiredLabel'> *</span><br><span class='malay'>Apabila bekerja dengan klien, adakah anda berasa lebih banyak memberi daripada menerima?</span></li></ol>",
              model: 'client[3]',
              values: [
                { name: 1, value: 100 },
                { name: 2, value: 75 },
                { name: 3, value: 35 },
                { name: 4, value: 25 },
                { name: 5, value: 0 },
              ],
              required: true,
              validator: 'required',
              styleClasses: 'even-row',
            },
            {
              type: 'radios',
              label: "<ol start = '5'><li class='label-width'>Are you tired of working with clients?<span class='requiredLabel'> *</span><br><span class='malay'>Adakah anda bosan bekerja dengan klien?</span></li></ol>",
              model: 'client[4]',
              values: [
                { name: 1, value: 100 },
                { name: 2, value: 75 },
                { name: 3, value: 35 },
                { name: 4, value: 25 },
                { name: 5, value: 0 },
              ],
              required: true,
              validator: 'required',
              styleClasses: 'odd-row',
            },
            {
              type: 'radios',
              label: "<ol start = '6'><li class='label-width'>Do you sometimes wonder how long you will be able to continue working with clients?</span><span class='requiredLabel'> *</span><br><span class='malay'>Adakah anda tertanya-tanya sejauh mana anda mampu meneruskan urusan dengan klien?</span></li></ol>",
              model: 'client[5]',
              values: [
                { name: 1, value: 100 },
                { name: 2, value: 75 },
                { name: 3, value: 35 },
                { name: 4, value: 25 },
                { name: 5, value: 0 },
              ],
              required: true,
              validator: 'required',
              styleClasses: 'even-row',
            },
          ],
        },
        {
          styleClasses: 'groupBtn',
          fields: [
            {
              id: 'rtn',
              type: 'submit',
              label: '',
              onSubmit: () => {
                this.redirectToHome()
              },
              buttonText: 'Return',
              validateBeforeSubmit: false,
            },
            {
              type: 'submit',
              label: '',
              onSubmit: () => {
                this.redirectToResult()
              },
              buttonText: 'Submit',
              validateBeforeSubmit: true,
            },
          ],
        },
        ],
      },
      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
        validateAsync: false,
        validationErrorClass: 'error-field',
      },
    }
  },
  methods: {
    redirectToHome () {
      this.$router.push({ name: 'patient-profile' })
    },
    async redirectToResult () {
      var personalScore = Math.round((this.model.personal.reduce((a, b) => a + b, 0)) / 6)
      var workScore = Math.round((this.model.work.reduce((a, b) => a + b, 0)) / 7)
      var clientScore = Math.round((this.model.client.reduce((a, b) => a + b, 0)) / 6)

      const url = 'http://127.0.0.1:8000/api/getTestRange?type=3'
      const response = await this.$axios.get(url)
      this.rangeInfo = response.data.data

      var personalLevel = ''
      var personalDesc = ''
      var personalColour = ''
      var personalText = ''
      var personalWidth = []
      var personalLabel = []

      if (personalScore >= this.rangeInfo[0].range_min_value && personalScore < this.rangeInfo[0].range_max_value + 1) {
        personalLevel = this.rangeInfo[0].range_label
        personalDesc = this.rangeInfo[0].range_description
        personalColour = '#CDEE4A'
        personalText = 'diagTextNormal'
      } else if (personalScore >= this.rangeInfo[1].range_min_value && personalScore < this.rangeInfo[1].range_max_value + 1) {
        personalLevel = this.rangeInfo[1].range_label
        personalDesc = this.rangeInfo[1].range_description
        personalColour = '#EED14A'
        personalText = 'diagTextNormal'
      } else if (personalScore >= this.rangeInfo[2].range_min_value && personalScore < this.rangeInfo[2].range_max_value + 1) {
        personalLevel = this.rangeInfo[2].range_label
        personalDesc = this.rangeInfo[2].range_description
        personalColour = '#EE9B4A'
        personalText = 'diagTextWarn'
      } else {
        personalLevel = this.rangeInfo[3].range_label
        personalDesc = this.rangeInfo[3].range_description
        personalColour = '#EE5D4A'
        personalText = 'diagTextWarn'
      }

      personalWidth[0] = parseFloat((((this.rangeInfo[0].range_max_value - this.rangeInfo[0].range_min_value + 1) / 101) * 100).toFixed(2))
      personalWidth[1] = parseFloat((((this.rangeInfo[1].range_max_value - this.rangeInfo[1].range_min_value + 1) / 101) * 100).toFixed(2))
      personalWidth[2] = parseFloat((((this.rangeInfo[2].range_max_value - this.rangeInfo[2].range_min_value + 1) / 101) * 100).toFixed(2))
      personalWidth[3] = parseFloat((((this.rangeInfo[3].range_max_value - this.rangeInfo[3].range_min_value + 1) / 101) * 100).toFixed(2))

      personalLabel = [this.rangeInfo[0].range_label, this.rangeInfo[1].range_label, this.rangeInfo[2].range_label, this.rangeInfo[3].range_label]

      var workLevel = ''
      var workDesc = ''
      var workColour = ''
      var workText = ''
      var workWidth = []
      var workLabel = []

      if (workScore >= this.rangeInfo[4].range_min_value && workScore < this.rangeInfo[4].range_max_value + 1) {
        workLevel = this.rangeInfo[4].range_label
        workDesc = this.rangeInfo[4].range_description
        workColour = '#CDEE4A'
        workText = 'diagTextNormal'
      } else if (workScore >= this.rangeInfo[5].range_min_value && workScore < this.rangeInfo[5].range_max_value + 1) {
        workLevel = this.rangeInfo[5].range_label
        workDesc = this.rangeInfo[5].range_description
        workColour = '#EED14A'
        workText = 'diagTextNormal'
      } else if (workScore >= this.rangeInfo[6].range_min_value && workScore < this.rangeInfo[6].range_max_value + 1) {
        workLevel = this.rangeInfo[6].range_label
        workDesc = this.rangeInfo[6].range_description
        workColour = '#EE9B4A'
        workText = 'diagTextWarn'
      } else {
        workLevel = this.rangeInfo[7].range_label
        workDesc = this.rangeInfo[7].range_description
        workColour = '#EE5D4A'
        workText = 'diagTextWarn'
      }

      workWidth[0] = parseFloat((((this.rangeInfo[4].range_max_value - this.rangeInfo[4].range_min_value + 1) / 101) * 100).toFixed(2))
      workWidth[1] = parseFloat((((this.rangeInfo[5].range_max_value - this.rangeInfo[5].range_min_value + 1) / 101) * 100).toFixed(2))
      workWidth[2] = parseFloat((((this.rangeInfo[6].range_max_value - this.rangeInfo[6].range_min_value + 1) / 101) * 100).toFixed(2))
      workWidth[3] = parseFloat((((this.rangeInfo[7].range_max_value - this.rangeInfo[7].range_min_value + 1) / 101) * 100).toFixed(2))

      workLabel = [this.rangeInfo[4].range_label, this.rangeInfo[5].range_label, this.rangeInfo[6].range_label, this.rangeInfo[7].range_label]

      var clientLevel = ''
      var clientDesc = ''
      var clientColour = ''
      var clientText = ''
      var clientWidth = []
      var clientLabel = []

      if (clientScore >= this.rangeInfo[8].range_min_value && clientScore < this.rangeInfo[8].range_max_value + 1) {
        clientLevel = this.rangeInfo[8].range_label
        clientDesc = this.rangeInfo[8].range_description
        clientColour = '#CDEE4A'
        clientText = 'diagTextNormal'
      } else if (clientScore >= this.rangeInfo[9].range_min_value && clientScore < this.rangeInfo[9].range_max_value + 1) {
        clientLevel = this.rangeInfo[9].range_label
        clientDesc = this.rangeInfo[9].range_description
        clientColour = '#EED14A'
        clientText = 'diagTextNormal'
      } else if (clientScore >= this.rangeInfo[10].range_min_value && clientScore < this.rangeInfo[10].range_max_value + 1) {
        clientLevel = this.rangeInfo[10].range_label
        clientDesc = this.rangeInfo[10].range_description
        clientColour = '#EE9B4A'
        clientText = 'diagTextWarn'
      } else {
        clientLevel = this.rangeInfo[11].range_label
        clientDesc = this.rangeInfo[11].range_description
        clientColour = '#EE5D4A'
        clientText = 'diagTextWarn'
      }

      clientWidth[0] = parseFloat((((this.rangeInfo[8].range_max_value - this.rangeInfo[8].range_min_value + 1) / 101) * 100).toFixed(2))
      clientWidth[1] = parseFloat((((this.rangeInfo[9].range_max_value - this.rangeInfo[9].range_min_value + 1) / 101) * 100).toFixed(2))
      clientWidth[2] = parseFloat((((this.rangeInfo[10].range_max_value - this.rangeInfo[10].range_min_value + 1) / 101) * 100).toFixed(2))
      clientWidth[3] = parseFloat((((this.rangeInfo[11].range_max_value - this.rangeInfo[11].range_min_value + 1) / 101) * 100).toFixed(2))

      clientLabel = [this.rangeInfo[8].range_label, this.rangeInfo[9].range_label, this.rangeInfo[10].range_label, this.rangeInfo[11].range_label]

      const data = {
        personal: {
          name: 'PERSONAL BURNOUT',
          score: personalScore,
          level: personalLevel,
          desc: personalDesc,
          colour: personalColour,
          text: personalText,
          width: personalWidth,
          label: personalLabel,
        },
        work: {
          name: 'WORK BURNOUT',
          score: workScore,
          level: workLevel,
          desc: workDesc,
          colour: workColour,
          text: workText,
          width: workWidth,
          label: workLabel,
        },
        client: {
          name: 'CLIENT BURNOUT',
          score: clientScore,
          level: clientLevel,
          desc: clientDesc,
          colour: clientColour,
          text: clientText,
          width: clientWidth,
          label: clientLabel,
        },
      }
      sessionStorage.setItem('cbiData', JSON.stringify(data))

      const testOnly = new FormData()
      testOnly.append('type', '3')
      testOnly.append('score', personalScore + '-' + workScore + '-' + clientScore)
      this.$axios
        .post('http://127.0.0.1:8000/api/postTest', testOnly)
        .then((response) => {
          this.$router.push({ name: 'cbi-result', query: { id: response.data.id } })
        })
    },
  },
}
</script>

<style>

#cbi {
  text-align: center;
  font-weight: bold;
  margin-bottom: 50px;
}

.hr-margin {
  margin: 40px 0 40px 0;
}

#test {
  box-shadow: 0 10px 15px #6b6b6b9c;
  padding: 40px 40px 100px 40px;
  border-radius: 20px;
  margin-bottom: 50px;
}

.legend {
  margin-top: 8px;
  background: #d3d3d3;
  color: #404040;
  font-size: larger;
  padding: 8px 10px 8px 20px;
  border-radius: 5px;
  font-family: serif, Helvetica, Arial, sans-serif;
}

.malay {
  font-style: italic;
  font-size: small;
  color: dimgrey;
}

.malayHeader {
  font-style: italic;
  font-size: small;
  text-align: center;
  padding-left: 50px;
  padding-right: 50px;
}

.label-width {
  width: 650px;
}

/* div.errors.help-block {
  display: none;
  width: 0;
} */

.error-field {
  background: #f9c1c6;
}

/* .form-group.required > label::after {
  display: none;
  width: 0;
} */

.requiredLabel {
  color: red;
}

#num {
  max-height: 30px;
  margin: 10px 20px;
  text-align: center;
  padding: 15px 12px;
  background: #eeeeee;
  border-radius: 20px;
  border-color: grey;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: bold;
  color: #777777;
  display: flex;
  align-items: center;
  justify-content: center;
}

.r {
  display: inline-flex;
  width: 100%;
  align-items: center;
}

.indicator {
  margin: 10px 0;
}

.scale {
  margin: 0 15px 40px 15px;
}

.vue-form-generator .field-wrap {
  align-items: center;
}

@media (max-width: 760px) {
  #test {
    padding: 40px 20px 100px 20px;
    margin-bottom: 50px;
  }

  .label-width {
    width: 100%;
  }
}

@media (min-width: 768px) and (max-width: 992px) {
  #test {
    padding: 40px 20px 100px 20px;
    margin-bottom: 50px;
  }

  .label-width {
    width: 320px;
  }
}

@media (min-width: 992px) and (max-width: 1200px) {
  #test {
    padding: 40px 20px 100px 20px;
    margin-bottom: 50px;
  }

  .label-width {
    width: 500px;
  }
}
</style>
