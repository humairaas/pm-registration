<template>
  <div>

    <div class="mt-5 row justify-content-center" id="print">
      <div class="col-8 text-center">
        <p class="englishSub">Thank you for reaching out to MENTARI Self Test.</p>
        <p class="malaySub">Terima kasih kerana melayari ujian kendiri MENTARI.</p>
      </div>
    </div>

    <div class="row justify-content-center mt-4">
      <div class="col-md-4 text-center">
        <b-button id="print" @click="exportToPDF" size="sm"><b-icon icon="printer" aria-hidden="true"></b-icon> Print</b-button>
      </div>
    </div>

    <div ref="document">
      <!-- <h3 id="print-header">DASS RESULTS</h3> -->
      <result :name="this.data.stress.name" :nameBm="this.data.stress.nameBm" :score="this.data.stress.score" :level="this.data.stress.level" :levelBm="this.data.stress.levelBm" :desc="this.data.stress.desc" :descBm="this.data.stress.descBm" :colour="this.data.stress.colour" :width="this.data.stress.width" :label="this.data.stress.label" :labelBm="this.data.stress.labelBm"></result>
      <result :name="this.data.anxiety.name" :nameBm="this.data.anxiety.nameBm" :score="this.data.anxiety.score" :level="this.data.anxiety.level" :levelBm="this.data.anxiety.levelBm" :desc="this.data.anxiety.desc" :descBm="this.data.anxiety.descBm" :colour="this.data.anxiety.colour" :width="this.data.anxiety.width" :label="this.data.anxiety.label" :labelBm="this.data.anxiety.labelBm"></result>
      <result :name="this.data.depression.name" :nameBm="this.data.depression.nameBm" :score="this.data.depression.score" :level="this.data.depression.level" :levelBm="this.data.depression.levelBm" :desc="this.data.depression.desc" :descBm="this.data.depression.descBm" :colour="this.data.depression.colour" :width="this.data.depression.width" :label="this.data.depression.label" :labelBm="this.data.depression.labelBm"></result>
    </div>

    <div class="btnGroup">
      <button @click="redirectToDass" id = "returnBtn" type="button" class="btn">Return</button>
      <!-- <button  @click="redirectToReqAppt" id = "reqBtn" type="button" class="btn">Request Appointment</button> -->
    </div>

    <div class="mt-5 row justify-content-center text-light bg-dark pt-3" id="print">
      <div class="col-7 text-center">
        <p class="disclaimer">*Please note, this short questionnaire is just a guide and the feelings you may be experiencing could be something other than stress, anxiety or depression.
          (*Sila ambil maklum, ujian ringkas ini adalah sebagai petunjuk sahaja manakala perasaan yang anda sedang hadapi mungkin lebih berat.)</p>
        <p class="disclaimer">*This is not a diagnosis. An accurate diagnosis for any mental health condition or disorder must be provided by a health professional.
          (*Ini bukanlah diagnosis penyakit. Diagnosis yang tepat untuk sesuatu keadaan/ penyakit hendaklah diberikan oleh pegawai perubatan yang bertauliah.)</p>
      </div>
    </div>
  </div>
</template>

<script>
// import result from './dassResultChild'

export default {
  // components: {result},
  data () {
    return {
      data: {},
    }
  },
  methods: {
    exportToPDF () {
      window.print()
    },
    redirectToReqAppt () {
      this.$router.push({ path: '/reqApp', query: { type: 2, id: this.$route.query.id } })
    },
    redirectToDass () {
      this.$router.back()
    },
  },
  created () {
    this.data = JSON.parse(sessionStorage.getItem('dassData'))
  },
}
</script>

<style scoped media="screen">

h2 {
  text-align: center;
  margin-bottom: 10px;
}

#title-print {
  text-align: center;
  padding: 2px;
  position: relative;
  width: 70%;
}

.btnGroup {
  margin-top: 2%;
  display: flex;
  justify-content: space-evenly;
}

#returnBtn:hover {
  opacity: 0.6;
}

#reqBtn:hover {
  opacity: 0.6;
}

#returnBtn {
  margin: 10px;
  background-color: #33b76e;
  padding: 6px 12px;
  border: #33b76e;
  color: white;
  font-size: 14px;
  font-weight: 400;
}

#reqBtn {
  margin: 10px;
  background-color: #2e6da4;
  padding: 6px 12px;
  border: #2e6da4;
  color: white;
  font-size: 14px;
  font-weight: 400;
}

#print-header {
  display: none;
}

.malaySub {
  font-style: italic;
  color: dimgrey;
  font-size: 1vw;
}

.englishSub {
  font-size: 1.5vw;
}

.disclaimer {
  font-size: 1vw;
  font-style: italic;
}

@media (max-width: 760px) {
  .disclaimer {
    font-size: 1.5vw;
  }
}

@media (max-width: 500px) {
  .malaySub {
    font-size: 2vw;
  }

  .englishSub {
    font-size: 3vw;
  }

  .disclaimer {
    font-size: 2vw;
  }
}
</style>

<style scoped media="print">

@page {
  size: 18in 25in;
}

@media print {
  .btnGroup {
    display: none;
  }

  #print {
    display: none;
  }

  #print-header {
    display: block;
    text-align: center;
  }
}

</style>
