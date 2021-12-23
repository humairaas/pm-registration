<template>
  <div>

    <div class="container">

      <div class = "container" id = "test">
        <h4 class="text-center">Please read each statement and select a number 0, 1 , 2 or 3 that indicates how much the statement applied to you over the past week.</h4>
        <h6 class="text-center">There are no right or wrong answers. Do not spend too much time on any statement.</h6><br>
        <p class="malayHeader">Sila baca setiap kenyataan di bawah dan pilih jawapan anda berdasarkan jawapan 0, 1, 2 atau 3 bagi menggambarkan keadaan anda sepanjang minggu yang lalu.
          Tiada jawapan yang betul atau salah. Jangan mengambil masa yang terlalu lama untuk mana-mana kenyataan.</p>
        <hr class="hr-margin">

        <div class="scale">
          <div class = "r">
            <p id = "num">0</p>
            <p class="indicator">Did not apply to me at all<br><span class="malay">Tidak langsung menggambarkan keadaan saya</span></p>
          </div>

          <div class = "r">
            <p id = "num">1</p>
            <p class="indicator">Applied to me to some degree, or some of the time<br><span class="malay">Sedikit atau jarang-jarang menggambarkan keadaan saya</span></p>
          </div>

          <div class = "r">
            <p id = "num">2</p>
            <p class="indicator">Applied to me to a considerable degree, or a good part of time<br><span class="malay">Banyak atau kerapkali menggambarkan keadaan saya</span></p>
          </div>

          <div class = "r">
            <p id = "num">3</p>
            <p class="indicator">Applied to me very much, or most of the time<br><span class="malay">Sangat banyak atau sangat kerap menggambarkan keadaan saya</span></p>
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
      depressionScore: 0,
      anxietyScore: 0,
      stressScore: 0,
      depressionLevel: '',
      anxietyLevel: '',
      stressLevel: '',
      depressionLevelBm: '',
      anxietyLevelBm: '',
      stressLevelBm: '',
      depressionDesc: '',
      anxietyDesc: '',
      stressDesc: '',
      depressionDescBm: '',
      anxietyDescBm: '',
      stressDescBm: '',
      depressionColour: '',
      anxietyColour: '',
      stressColour: '',
      depressionWidth: [],
      anxietyWidth: [],
      stressWidth: [],
      depressionLabel: [],
      anxietyLabel: [],
      stressLabel: [],
      depressionLabelBm: [],
      anxietyLabelBm: [],
      stressLabelBm: [],

      model: {
        depression: [],
        anxiety: [],
        stress: [],
      },
      schema: {
        fields: [
          {
            type: 'radios',
            label: "<ol start = '1'><li class='label-width'>I found it hard to wind down.<span class='requiredLabel'> *</span><br><span class='malay'>Saya dapati diri saya sukar ditenteramkan.</span></li></ol>",
            model: 'stress[0]',
            values: [0, 1, 2, 3],
            required: true,
            validator: 'required',
            styleClasses: 'odd-row',

          },
          {
            type: 'radios',
            label: "<ol start = '2'><li class='label-width'>I was aware of dryness of my mouth.<span class='requiredLabel'> *</span><br><span class='malay'>Saya sedar mulut saya terasa kering.</span></li></ol>",
            model: 'anxiety[0]',
            values: [0, 1, 2, 3],
            required: true,
            validator: 'required',
            styleClasses: 'even-row',
          },
          {
            type: 'radios',
            label: "<ol start = '3'><li class='label-width'>I couldn't seem to experience any positive feeling at all.<span class='requiredLabel'> *</span><br><span class='malay'>Saya tidak dapat mengalami perasaan positif sama sekali.</span></li></ol>",
            model: 'depression[0]',
            values: [0, 1, 2, 3],
            required: true,
            validator: 'required',
            styleClasses: 'odd-row',
          },
          {
            type: 'radios',
            label: "<ol start = '4'><li class='label-width'>I experienced breathing difficulty (eg, excessively rapid breathing, breathlessness in <br>the absence of physical exertion).<span class='requiredLabel'> *</span><br><span class='malay'>Saya mengalami kesukaran bernafas (contohnya pernafasan yang laju, tercungap-cungap walaupun<br> tidak melakukan senaman fizikal).</span></li></ol>",
            model: 'anxiety[1]',
            values: [0, 1, 2, 3],
            required: true,
            validator: 'required',
            styleClasses: 'even-row',
          },
          {
            type: 'radios',
            label: "<ol start = '5'><li class='label-width'>I found it difficult to work up the initiative to do things.<span class='requiredLabel'> *</span><br><span class='malay'>Saya sukar untuk mendapatkan semangat bagi melakukan sesuatu perkara.</span></li></ol>",
            model: 'depression[1]',
            values: [0, 1, 2, 3],
            required: true,
            validator: 'required',
            styleClasses: 'odd-row',
          },
          {
            type: 'radios',
            label: "<ol start = '6'><li class='label-width'>I tended to over-react to situations.<span class='requiredLabel'> *</span><br><span class='malay'>Saya cenderung untuk bertindak keterlaluan dalam sesuatu keadaan.</span></li></ol>",
            model: 'stress[1]',
            values: [0, 1, 2, 3],
            required: true,
            validator: 'required',
            styleClasses: 'even-row',
          },
          {
            type: 'radios',
            label: "<ol start = '7'><li class='label-width'>I experienced trembling (eg, in the hands).<span class='requiredLabel'> *</span><br><span class='malay'>Saya rasa menggeletar (contohnya pada tangan).</span></li></ol>",
            model: 'anxiety[2]',
            values: [0, 1, 2, 3],
            required: true,
            validator: 'required',
            styleClasses: 'odd-row',
          },
          {
            type: 'radios',
            label: "<ol start = '8'><li class='label-width'>I felt that I was using a lot of nervous energy.<span class='requiredLabel'> *</span><br><span class='malay'>Saya rasa saya menggunakan banyak tenaga dalam keadaan cemas.</span></li></ol>",
            model: 'stress[2]',
            values: [0, 1, 2, 3],
            required: true,
            validator: 'required',
            styleClasses: 'even-row',
          },
          {
            type: 'radios',
            label: "<ol start = '9'><li class='label-width'>I was worried about situations in which I might panic and make a fool of myself.<span class='requiredLabel'> *</span><br><span class='malay'>Saya bimbang keadaan di mana saya mungkin menjadi panik dan melakukan perkara yang <br>membodohkan diri sendiri.</span></li></ol>",
            model: 'anxiety[3]',
            values: [0, 1, 2, 3],
            required: true,
            validator: 'required',
            styleClasses: 'odd-row',
          },
          {
            type: 'radios',
            label: "<ol start = '10'><li class='label-width'>I felt that I had nothing to look forward to.<span class='requiredLabel'> *</span><br><span class='malay'>Saya rasa saya tidak mempunyai apa-apa untuk diharapkan.</span></li></ol>",
            model: 'depression[2]',
            values: [0, 1, 2, 3],
            required: true,
            validator: 'required',
            styleClasses: 'even-row',
          },
          {
            type: 'radios',
            label: "<ol start = '11'><li class='label-width'>I found myself getting agigate.<span class='requiredLabel'> *</span><br><span class='malay'>Saya dapati diri saya semakin gelisah.</span></li></ol>",
            model: 'stress[3]',
            values: [0, 1, 2, 3],
            required: true,
            validator: 'required',
            styleClasses: 'odd-row',
          },
          {
            type: 'radios',
            label: "<ol start = '12'><li class='label-width'>I found it difficult to relax.<span class='requiredLabel'> *</span><br><span class='malay'>Saya rasa sukar untuk relaks.</span></li></ol>",
            model: 'stress[4]',
            values: [0, 1, 2, 3],
            required: true,
            validator: 'required',
            styleClasses: 'even-row',
          },
          {
            type: 'radios',
            label: "<ol start = '13'><li class='label-width'>I felt down-hearted and blue.<span class='requiredLabel'> *</span><br><span class='malay'>Saya rasa sedih dan murung.</span></li></ol>",
            model: 'depression[3]',
            values: [0, 1, 2, 3],
            required: true,
            validator: 'required',
            styleClasses: 'odd-row',
          },
          {
            type: 'radios',
            label: "<ol start = '14'><li class='label-width'>I was intolerant of anything that kept me from getting on with what I was doing.<span class='requiredLabel'> *</span><br><span class='malay'>Saya tidak dapat menahan sabar dengan perkara yang menghalang saya meneruskan apa yang <br>saya lakukan.</span></li></ol>",
            model: 'stress[5]',
            values: [0, 1, 2, 3],
            required: true,
            validator: 'required',
            styleClasses: 'even-row',
          },
          {
            type: 'radios',
            label: "<ol start = '15'><li class='label-width'>I felt I was close to panic.<span class='requiredLabel'> *</span><br><span class='malay'>Saya rasa hampir-hampir menjadi panik/cemas.</span></li></ol>",
            model: 'anxiety[4]',
            values: [0, 1, 2, 3],
            required: true,
            validator: 'required',
            styleClasses: 'odd-row',
          },
          {
            type: 'radios',
            label: "<ol start = '16'><li class='label-width'>I was unable to become enthusiastic about anything.<span class='requiredLabel'> *</span><br><span class='malay'>Saya tidak bersemangat dengan apa jua yang saya lakukan.</span></li></ol>",
            model: 'depression[4]',
            values: [0, 1, 2, 3],
            required: true,
            validator: 'required',
            styleClasses: 'even-row',
          },
          {
            type: 'radios',
            label: "<ol start = '17'><li class='label-width'>I felt I wasn't worth much as a person.<span class='requiredLabel'> *</span><br><span class='malay'>Saya rasa tidak begitu berharga sebagai seorang individu.</span></li></ol>",
            model: 'depression[5]',
            values: [0, 1, 2, 3],
            required: true,
            validator: 'required',
            styleClasses: 'odd-row',
          },
          {
            type: 'radios',
            label: "<ol start = '18'><li class='label-width'>I felt that I was rather touchy.<span class='requiredLabel'> *</span><br><span class='malay'>Saya rasa saya mudah tersentuh.</span></li></ol>",
            model: 'stress[6]',
            values: [0, 1, 2, 3],
            required: true,
            validator: 'required',
            styleClasses: 'even-row',
          },
          {
            type: 'radios',
            label: "<ol start = '19'><li class='label-width'>I was aware of the action of my heart in the absence of physical exertion (eg, sense <br>of heart rate increase, heart missing a beat).<span class='requiredLabel'> *</span><br><span class='malay'>Saya sedar tindakbalas jantung saya walaupun tidak melakukan aktiviti fizikal (contohnya kadar <br>denyutan jantung bertambah, atau denyutan jantung berkurangan).</span></li></ol>",
            model: 'anxiety[5]',
            values: [0, 1, 2, 3],
            required: true,
            validator: 'required',
            styleClasses: 'odd-row',
          },
          {
            type: 'radios',
            label: "<ol start = '20'><li class='label-width'>I felt scared without any good reason.<span class='requiredLabel'> *</span><br><span class='malay'>Saya berasa takut tanpa sebab yang munasabah.</span></li></ol>",
            model: 'anxiety[6]',
            values: [0, 1, 2, 3],
            required: true,
            validator: 'required',
            styleClasses: 'even-row',
          },
          {
            type: 'radios',
            label: "<ol start = '21'><li class='label-width'>I felt that life was meaningless.<span class='requiredLabel'> *</span><br><span class='malay'>Saya rasa hidup ini tidak bermakna.</span></li></ol>",
            model: 'depression[6]',
            values: [0, 1, 2, 3],
            required: true,
            validator: 'required',
            styleClasses: 'odd-row',
          },

        ],
        groups: [
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
    redirectToResult () {
      this.stressScore = this.model.stress.reduce((a, b) => a + b, 0)
      this.anxietyScore = this.model.anxiety.reduce((a, b) => a + b, 0)
      this.depressionScore = this.model.depression.reduce((a, b) => a + b, 0)

      if (this.stressScore >= this.rangeInfo[0].range_min_value && this.stressScore < this.rangeInfo[0].range_max_value + 1) {
        this.stressLevel = this.rangeInfo[0].range_label
        this.stressDesc = this.rangeInfo[0].range_description
        this.stressLevelBm = this.rangeInfo[0].range_label_bm
        this.stressDescBm = this.rangeInfo[0].range_description_bm
        this.stressColour = '#CDEE4A'
      } else if (this.stressScore >= this.rangeInfo[1].range_min_value && this.stressScore < this.rangeInfo[1].range_max_value + 1) {
        this.stressLevel = this.rangeInfo[1].range_label
        this.stressDesc = this.rangeInfo[1].range_description
        this.stressLevelBm = this.rangeInfo[1].range_label_bm
        this.stressDescBm = this.rangeInfo[1].range_description_bm
        this.stressColour = '#EEE84A'
      } else if (this.stressScore >= this.rangeInfo[2].range_min_value && this.stressScore < this.rangeInfo[2].range_max_value + 1) {
        this.stressLevel = this.rangeInfo[2].range_label
        this.stressDesc = this.rangeInfo[2].range_description
        this.stressLevelBm = this.rangeInfo[2].range_label_bm
        this.stressDescBm = this.rangeInfo[2].range_description_bm
        this.stressColour = '#EED14A'
      } else if (this.stressScore >= this.rangeInfo[3].range_min_value && this.stressScore < this.rangeInfo[3].range_max_value + 1) {
        this.stressLevel = this.rangeInfo[3].range_label
        this.stressDesc = this.rangeInfo[3].range_description
        this.stressLevelBm = this.rangeInfo[3].range_label_bm
        this.stressDescBm = this.rangeInfo[3].range_description_bm
        this.stressColour = '#EE9B4A'
      } else {
        this.stressLevel = this.rangeInfo[4].range_label
        this.stressDesc = this.rangeInfo[4].range_description
        this.stressLevelBm = this.rangeInfo[4].range_label_bm
        this.stressDescBm = this.rangeInfo[4].range_description_bm
        this.stressColour = '#EE5D4A'
      }

      this.stressWidth[0] = parseFloat((((this.rangeInfo[0].range_max_value - this.rangeInfo[0].range_min_value + 1) / 22) * 100).toFixed(2))
      this.stressWidth[1] = parseFloat((((this.rangeInfo[1].range_max_value - this.rangeInfo[1].range_min_value + 1) / 22) * 100).toFixed(2))
      this.stressWidth[2] = parseFloat((((this.rangeInfo[2].range_max_value - this.rangeInfo[2].range_min_value + 1) / 22) * 100).toFixed(2))
      this.stressWidth[3] = parseFloat((((this.rangeInfo[3].range_max_value - this.rangeInfo[3].range_min_value + 1) / 22) * 100).toFixed(2))
      this.stressWidth[4] = parseFloat((((this.rangeInfo[4].range_max_value - this.rangeInfo[4].range_min_value + 1) / 22) * 100).toFixed(2))

      this.stressLabel = [this.rangeInfo[0].range_label, this.rangeInfo[1].range_label, this.rangeInfo[2].range_label, this.rangeInfo[3].range_label, this.rangeInfo[4].range_label]
      this.stressLabelBm = [this.rangeInfo[0].range_label_bm, this.rangeInfo[1].range_label_bm, this.rangeInfo[2].range_label_bm, this.rangeInfo[3].range_label_bm, this.rangeInfo[4].range_label_bm]

      if (this.anxietyScore >= this.rangeInfo[5].range_min_value && this.anxietyScore < this.rangeInfo[5].range_max_value + 1) {
        this.anxietyLevel = this.rangeInfo[5].range_label
        this.anxietyDesc = this.rangeInfo[5].range_description
        this.anxietyLevelBm = this.rangeInfo[5].range_label_bm
        this.anxietyDescBm = this.rangeInfo[5].range_description_bm
        this.anxietyColour = '#CDEE4A'
      } else if (this.anxietyScore >= this.rangeInfo[6].range_min_value && this.anxietyScore < this.rangeInfo[6].range_max_value + 1) {
        this.anxietyLevel = this.rangeInfo[6].range_label
        this.anxietyDesc = this.rangeInfo[6].range_description
        this.anxietyLevelBm = this.rangeInfo[6].range_label_bm
        this.anxietyDescBm = this.rangeInfo[6].range_description_bm
        this.anxietyColour = '#EEE84A'
      } else if (this.anxietyScore >= this.rangeInfo[7].range_min_value && this.anxietyScore < this.rangeInfo[7].range_max_value + 1) {
        this.anxietyLevel = this.rangeInfo[7].range_label
        this.anxietyDesc = this.rangeInfo[7].range_description
        this.anxietyLevelBm = this.rangeInfo[7].range_label_bm
        this.anxietyDescBm = this.rangeInfo[7].range_description_bm
        this.anxietyColour = '#EED14A'
      } else if (this.anxietyScore >= this.rangeInfo[8].range_min_value && this.anxietyScore < this.rangeInfo[8].range_max_value + 1) {
        this.anxietyLevel = this.rangeInfo[8].range_label
        this.anxietyDesc = this.rangeInfo[8].range_description
        this.anxietyLevelBm = this.rangeInfo[8].range_label_bm
        this.anxietyDescBm = this.rangeInfo[8].range_description_bm
        this.anxietyColour = '#EE9B4A'
      } else {
        this.anxietyLevel = this.rangeInfo[9].range_label
        this.anxietyDesc = this.rangeInfo[9].range_description
        this.anxietyLevelBm = this.rangeInfo[9].range_label_bm
        this.anxietyDescBm = this.rangeInfo[9].range_description_bm
        this.anxietyColour = '#EE5D4A'
      }

      this.anxietyWidth[0] = parseFloat((((this.rangeInfo[5].range_max_value - this.rangeInfo[5].range_min_value + 1) / 22) * 100).toFixed(2))
      this.anxietyWidth[1] = parseFloat((((this.rangeInfo[6].range_max_value - this.rangeInfo[6].range_min_value + 1) / 22) * 100).toFixed(2))
      this.anxietyWidth[2] = parseFloat((((this.rangeInfo[7].range_max_value - this.rangeInfo[7].range_min_value + 1) / 22) * 100).toFixed(2))
      this.anxietyWidth[3] = parseFloat((((this.rangeInfo[8].range_max_value - this.rangeInfo[8].range_min_value + 1) / 22) * 100).toFixed(2))
      this.anxietyWidth[4] = parseFloat((((this.rangeInfo[9].range_max_value - this.rangeInfo[9].range_min_value + 1) / 22) * 100).toFixed(2))

      this.anxietyLabel = [this.rangeInfo[5].range_label, this.rangeInfo[6].range_label, this.rangeInfo[7].range_label, this.rangeInfo[8].range_label, this.rangeInfo[9].range_label]
      this.anxietyLabelBm = [this.rangeInfo[5].range_label_bm, this.rangeInfo[6].range_label_bm, this.rangeInfo[7].range_label_bm, this.rangeInfo[8].range_label_bm, this.rangeInfo[9].range_label_bm]

      if (this.depressionScore >= this.rangeInfo[10].range_min_value && this.depressionScore < this.rangeInfo[10].range_max_value + 1) {
        this.depressionLevel = this.rangeInfo[10].range_label
        this.depressionDesc = this.rangeInfo[10].range_description
        this.depressionLevelBm = this.rangeInfo[10].range_label_bm
        this.depressionDescBm = this.rangeInfo[10].range_description_bm
        this.depressionColour = '#CDEE4A'
      } else if (this.depressionScore >= this.rangeInfo[11].range_min_value && this.depressionScore < this.rangeInfo[11].range_max_value + 1) {
        this.depressionLevel = this.rangeInfo[11].range_label
        this.depressionDesc = this.rangeInfo[11].range_description
        this.depressionLevelBm = this.rangeInfo[11].range_label_bm
        this.depressionDescBm = this.rangeInfo[11].range_description_bm
        this.depressionColour = '#EEE84A'
      } else if (this.depressionScore >= this.rangeInfo[12].range_min_value && this.depressionScore < this.rangeInfo[12].range_max_value + 1) {
        this.depressionLevel = this.rangeInfo[12].range_label
        this.depressionDesc = this.rangeInfo[12].range_description
        this.depressionLevelBm = this.rangeInfo[12].range_label_bm
        this.depressionDescBm = this.rangeInfo[12].range_description_bm
        this.depressionColour = '#EED14A'
      } else if (this.depressionScore >= this.rangeInfo[13].range_min_value && this.depressionScore < this.rangeInfo[13].range_max_value + 1) {
        this.depressionLevel = this.rangeInfo[13].range_label
        this.depressionDesc = this.rangeInfo[13].range_description
        this.depressionLevelBm = this.rangeInfo[13].range_label_bm
        this.depressionDescBm = this.rangeInfo[13].range_description_bm
        this.depressionColour = '#EE9B4A'
      } else {
        this.depressionLevel = this.rangeInfo[14].range_label
        this.depressionDesc = this.rangeInfo[14].range_description
        this.depressionLevelBm = this.rangeInfo[14].range_label_bm
        this.depressionDescBm = this.rangeInfo[14].range_description_bm
        this.depressionColour = '#EE5D4A'
      }

      this.depressionWidth[0] = parseFloat((((this.rangeInfo[10].range_max_value - this.rangeInfo[10].range_min_value + 1) / 22) * 100).toFixed(2))
      this.depressionWidth[1] = parseFloat((((this.rangeInfo[11].range_max_value - this.rangeInfo[11].range_min_value + 1) / 22) * 100).toFixed(2))
      this.depressionWidth[2] = parseFloat((((this.rangeInfo[12].range_max_value - this.rangeInfo[12].range_min_value + 1) / 22) * 100).toFixed(2))
      this.depressionWidth[3] = parseFloat((((this.rangeInfo[13].range_max_value - this.rangeInfo[13].range_min_value + 1) / 22) * 100).toFixed(2))
      this.depressionWidth[4] = parseFloat((((this.rangeInfo[14].range_max_value - this.rangeInfo[14].range_min_value + 1) / 22) * 100).toFixed(2))

      this.depressionLabel = [this.rangeInfo[10].range_label, this.rangeInfo[11].range_label, this.rangeInfo[12].range_label, this.rangeInfo[13].range_label, this.rangeInfo[14].range_label]
      this.depressionLabelBm = [this.rangeInfo[10].range_label_bm, this.rangeInfo[11].range_label_bm, this.rangeInfo[12].range_label_bm, this.rangeInfo[13].range_label_bm, this.rangeInfo[14].range_label_bm]

      const data = {
        stress: {
          name: 'STRESS',
          nameBm: 'TEKANAN',
          score: this.stressScore,
          level: this.stressLevel,
          desc: this.stressDesc,
          levelBm: this.stressLevelBm,
          descBm: this.stressDescBm,
          colour: this.stressColour,
          width: this.stressWidth,
          label: this.stressLabel,
          labelBm: this.stressLabelBm,
        },
        anxiety: {
          name: 'ANXIETY',
          nameBm: 'KEGELISAHAN',
          score: this.anxietyScore,
          level: this.anxietyLevel,
          desc: this.anxietyDesc,
          levelBm: this.anxietyLevelBm,
          descBm: this.anxietyDescBm,
          colour: this.anxietyColour,
          width: this.anxietyWidth,
          label: this.anxietyLabel,
          labelBm: this.anxietyLabelBm,
        },
        depression: {
          name: 'DEPRESSION',
          nameBm: 'KEMURUNGAN',
          score: this.depressionScore,
          level: this.depressionLevel,
          desc: this.depressionDesc,
          levelBm: this.depressionLevelBm,
          descBm: this.depressionDescBm,
          colour: this.depressionColour,
          width: this.depressionWidth,
          label: this.depressionLabel,
          labelBm: this.depressionLabelBm,
        },
      }
      sessionStorage.setItem('dassData', JSON.stringify(data))

      const testOnly = new FormData()
      testOnly.append('type', '2')
      testOnly.append('score', this.stressScore + '-' + this.anxietyScore + '-' + this.depressionScore)
      this.$axios
        // .post('http://127.0.0.1:8000/api/postTest', testOnly)
        .post('10.22.120.108:8000/api/postTest', testOnly)
        .then((response) => {
          this.$router.push({ name: 'dass-result', query: { id: response.data.id } })
        })
    },
  },
  created () {
    this.$axios.get('https://10.22.120.108:8000/api/getTestRange?type=2')
      .then((response) => { this.rangeInfo = response.data.data }) // edited
      .catch(error => {
        console.error('There was an error!', error)
      })
  },
}
</script>

<style>

#dass {
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
  width: 700px;
}

div.errors.help-block {
  display: none;
  width: 0;
}

.error-field {
  background: #f9c1c6;
}

.form-group.required > label::after {
  display: none;
  width: 0;
}

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

.groupBtn {
  margin-top: 10px;
  display: inline-flex;
  float: right;
}

li {
  padding-left: 20px;
}

.odd-row {
  background-color: rgb(240, 240, 240);
  display: flex !important;
  justify-content: space-between;
  flex-wrap: wrap;
}

.even-row {
  display: flex !important;
  justify-content: space-between;
  flex-wrap: wrap;
}

</style>
