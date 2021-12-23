<template>
  <div>

    <div class="row justify-content-center">
      <div class="col-md-4 text-center">
        <b-button id="print" @click="exportToPDF" size="sm"><b-icon icon="printer" aria-hidden="true"></b-icon> Print</b-button>
      </div>
    </div>

    <div ref="document">
      <h3 id="print-header">CBI RESULTS</h3>
      <result :name="this.data.personal.name" :score="this.data.personal.score" :level="this.data.personal.level" :desc="this.data.personal.desc" :colour="this.data.personal.colour" :text="this.data.personal.text" :width="this.data.personal.width" :label="this.data.personal.label"></result>
      <result :name="this.data.work.name" :score="this.data.work.score" :level="this.data.work.level" :desc="this.data.work.desc" :colour="this.data.work.colour" :text="this.data.work.text" :width="this.data.work.width" :label="this.data.work.label"></result>
      <result :name="this.data.client.name" :score="this.data.client.score" :level="this.data.client.level" :desc="this.data.client.desc" :colour="this.data.client.colour" :text="this.data.client.text" :width="this.data.client.width" :label="this.data.client.label"></result>
    </div>

    <div class="btnGroup">
      <button @click="redirectToCbi" id = "returnBtn" type="button" class="btn">Return</button>
      <button  @click="redirectToReqAppt" id = "reqBtn" type="button" class="btn">Request Appointment</button>
    </div>
  </div>
</template>

<script>
// import result from './pm-CBIResultChild.vue'

export default {
  // components: { result },
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
      this.$router.push({ path: '/reqApp', query: { type: 3, id: this.$route.query.id } })
    },
    redirectToCbi () {
      this.$router.push({ path: '/cbi' })
    },
  },
  created () {
    this.data = JSON.parse(sessionStorage.getItem('cbiData'))
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

</style>

<style scoped media="print">

@page {
  size: 18in 20in;
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
