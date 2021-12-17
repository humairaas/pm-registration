<!-- Patient Record (Nurse View) -->
<template>
  <div class="content">
    <div class="container-fluid">
      <router-link :to="{ name: 'patient-profile'}">
        <h2 class="patient-name">{{pt_data[0].name}}</h2>
      </router-link>

      <div class="row">
        <!--Demographic--->
        <div class="col-xl-9 mb-3">
          <va-card :title="$t('Demographic')">
            <div class="float-right">
              <router-link :to="{ name: 'shharp-demographic', query: { st: 'edit'}}">
                <button type="button" class="btn sizebtn">
                  <div class="fa fa-pencil-square-o"/>
                </button>
              </router-link>
            </div>

            <div class="row mt-2">
              <div class="col-xl-9">
                <div class="row mt-2">
                  <div class="col-sm-4"><b>MITS 2.0 Reference No</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm-5">MT30399</div>
                </div>

                <div class="row">
                  <div class="col-sm-4"><b>Hospital's MRN</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm-5">{{pt_data[0].hospital_mrn}}</div>
                </div>

                <div class="row">
                  <div class="col-sm-4"><b>Mentari's MRN</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm-5">{{pt_data[0].mentari_mrn}}</div>
                </div>

                <div class="row">
                  <div class="col-sm-4"><b>Gender</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm-5">{{pt_data[0].gender}}</div>
                </div>

                <div class="row">
                  <div class="col-sm-4"><b>Date of Birth</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm-5">{{birthdate}} ({{age}} years old)</div>
                </div>

                <div class="row">
                  <div class="col-sm-4"><b>Marital Status</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm-5">{{pt_data[0].marital}}</div>
                </div>

                <div class="row">
                  <div class="col-sm-4"><b>Nationality</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm-5">Malaysian</div>
                </div>

                <div class="row mb-3">
                  <div class="col-sm-4"><b>Contact No</b></div>
                  <div class="col-sm-auto"><b>:</b></div>
                  <div class="col-sm-5">{{pt_data[0].phone_no_1}}</div>
                </div>
              </div>
              <div class="col-xl-3 mb-3">
                <b>Allergies :</b>
                <i v-if="empty"> No allergies</i>
                <div v-for="allergy in allergies" :key="allergy.allergy_desc">
                  {{allergy.allergy_desc}}
                </div>
              </div>
            </div>
          </va-card>

        </div>
        <!--Alert--->
        <div class="col-xl">
          <va-card :title="$t('Alert')">
            <div class="float-right">
              <router-link :to="{}">
                <button type="button" class="btn sizebtn">
                  <div class="fa fa-pencil-square-o"/>
                </button>
              </router-link>
            </div>
            <div class="row mt-2 mb-5">
              Severe depression
            </div>
            <button type="button" class="ml-2 btn btn-fill btn-md btn-blue">
              Add Alert
            </button>
          </va-card>
        </div>
      </div>

      <div class="row">
        <div class="col-xl-12">
          <div class="row mt-3">
            <!--Visit History--->
            <div class="col-xl-12">
              <va-card :title="$t('SHHARP Registry History')">
                <div class="float-right">
                  <router-link :to="{ name: 'shharp-registry'}">
                    <button type="button" class="btn sizebtn">
                      <div class="fa fa-plus-circle"/>
                    </button>
                  </router-link>
                </div>
                <va-data-table
                  :fields="shharpFields"
                  :data="shharpRecords"
                  :per-page="5"
                >
                  <template slot="no" slot-scope="row">
                    {{ row.rowIndex + 1 }}
                  </template>

                  <template slot="date" slot-scope="props">
                    {{ getDate(props.rowData.dateTime) }}
                  </template>

                  <template slot="time" slot-scope="props">
                    {{ getTime(props.rowData.dateTime) }}
                  </template>

                  <template slot="actions">
                    <va-button flat small icon="fa fa-eye" @click="view(props.rowData.patient_id)" style="color: #51ad5e;">
                    </va-button>
                    <va-button flat small color="black" icon="fa fa-pencil-square-o" @click="editDraft(props.rowData.patient_id)">
                    </va-button>
                  </template>
                </va-data-table>
              </va-card>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      pt_data: [],
      allergies: [],
      birthdate: '',
      age: '',
      date: '',
      time: '',
      empty: true,

      shharpRecords: [],
    }
  },
  computed: {
    shharpFields () {
      return [
        {
          name: '__slot:no',
          title: this.$t('NO'),
          width: '5%',
          height: '45px',
          dataClass: 'text-center',
        },
        {
          name: '__slot:date',
          title: 'DATE',
          width: '15%',
        },
        {
          name: '__slot:time',
          title: 'TIME',
          width: '15%',
        },
        {
          name: 'status',
          title: 'STATUS',
          width: '10%',
        },
        {
          name: 'hospital',
          title: 'HOSPITAL',
          width: '20%',
        },
        {
          name: 'psychiatrist',
          title: 'CREATED BY',
          width: '18%',
        },
        {
          name: '__slot:actions',
          title: 'ACTION',
          width: '12%',
        },
      ]
    },
  },
  methods: {
    getDate (datetime) {
      const d = new Date(datetime)
      const newDate = d.toLocaleDateString('en-MY')
      return newDate
    },
    getTime (datetime) {
      // return datetime.substring(11, 19)
      const d = new Date(datetime)
      const newDate = d.toLocaleTimeString('en-MY')
      return newDate
    },
    view (patientId) {
      var ID = {
        patientId: patientId,
      }
      localStorage.setItem('ID', JSON.stringify(ID))
      this.$router.push({ path: 'shharp-registry', query: { st: 'view' } })
    },
    editDraft (patientId) {
      var ID = {
        patientId: patientId,
      }
      localStorage.setItem('ID', JSON.stringify(ID))
      this.$router.push({ path: 'shharp-registry', query: { st: 'edit' } })
    },
  },
  mounted () {
    var getID = JSON.parse(localStorage.getItem('ID'))
    this.$axios
      .get('http://127.0.0.1:8000/api/getPatientProfile?patient_id=' + getID.patientId)
      .then((response) => {
        this.pt_data = response.data.data
        this.birthdate = this.getDate(response.data.data[0].birthdate)
        this.age = new Date().getFullYear() - response.data.data[0].birthdate.toString().substring(0, 4)
        this.allergies = response.data.allergy
        if (this.allergies.length > 0) {
          this.empty = false
        }
      })

    this.$axios
      .get('http://127.0.0.1:8000/api/getSHHARPHistory?patientId=' + getID.patientId)
      .then((response) => {
        this.shharpRecords = response.data.data
      })
  },

}
</script>
<!-- New step!
     Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
  .app-layout__main {
    background: hsl(0, 0%, 91%);
  }

  .p {
    font-size: 0.9rem;
  }

  .spacing {
    margin-right: 500px;
    width: 300px;
  }

  .sizebtn {
    font-size: 2rem;
  }

  .line {
    border-top: 1px solid rgb(189, 184, 184);
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .log-button:hover {
    text-decoration: underline;
    color: blue;
  }

  .no-padding {
    padding: none;
    margin: none;
  }

  .ga-one {
    border-radius: 0.375rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 1rem;
    box-shadow: 0 2px 3px 0 rgba(168, 168, 168, 0.795);
    margin-bottom: 5px;
    cursor: pointer;
    background-color: #f5f8f9;
  }

  .ga-two {
    color: #212529;
  }

  .ga-two:hover {
    text-decoration: underline;
  }
</style>
