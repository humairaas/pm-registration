<!-- Patient record (Nurse View) -->

<template>
  <div class="content">
    <div class="container-fluid">
 
      <br/>
      <!-- Patient Profile -->
      <div class="row">
        <div class="col-12">
          <va-card :title="$t('Patient Profile')">
            <br>
            
            <div class="float-right">
              <router-link to="/admin/patient-management/patient_registration">
                <button type="button" class="btn sizebtn">
                  <i class="fa fa-pencil-square-o"/>
                </button>
              </router-link>
            </div>
            <table>
              <tr>
                <td><b>MRN</b></td>
                <td>:</td>
                <td>MS10001</td>
              </tr>
              <tr>
                <td><b>Patient Name</b></td>
                <td>:</td>
                <td>MR. Muhammad</td>
              </tr>
              <tr>
                <td><b>Gender</b></td>
                <td>:</td>
                <td>Male</td>
              </tr>
              <tr>
                <td><b>Date of Birth</b></td>
                <td>:</td>
                <td>09/01/1981</td>
              </tr>
              <tr>
                <td><b>Age</b></td>
                <td>:</td>
                <td>40</td>
              </tr>
              <tr>
                <td><b>Marital Status</b></td>
                <td>:</td>
                <td>Single</td>
              </tr>
              <tr>
                <td><b>Nationality</b></td>
                <td>:</td>
                <td>Malaysian</td>
              </tr>
              <tr>
                <td><b>Contact No.</b></td>
                <td>:</td>
                <td>012-3456789</td>
              </tr>
            </table>

            <!-- <div class="row align--center">
              <div class="flex xs12">
                <h4 class="card-title">Patient Profile</h4>
                <button type="button" class="btn" >
                  <i class="fa fa-pencil-square-o"/>
                </button>
              </div>
              <div class="flex md2"  style="margin-right: 50px;" >
                
              </div>
            </div> 
            <br/>

            <p class="p">MRN:</p>
            <p>PATIENT NAME:</p>
            <p>GENDER:</p>
            <p>DATE OF BIRTH:</p>
            <p>AGE:</p>
            <p>MARITAL STATUS:</p>
            <p>NATIONALITY:</p>
            <p>CONTACT NO.:</p>
            <vue-form-generator :model="model" :schema="patientProfile" :options="formOptions" ref="patientProfile" @model-updated="onModelUpdated">                   
            </vue-form-generator> -->
          </va-card>  
        
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-12">
            <va-card>
            <div class="float-right">
              <router-link to="/admin/patient-management/patient_management">
                <button type="button" class="btn btn-primary btn-fill" >
                  <i class="fa fa-calendar" /> &nbsp; Reschedule
                </button>
              </router-link>
            </div>
            <table>
              <tr class = "spacing">
                <td ><b>Next Appointment</b></td>
                <td>:</td>
                <td>19/07/2021</td> 
                <td>-</td>         
                <td>Monday</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>                
                <td><b>Recent Visit</b></td>
                <td>:</td>
                <td></td>
                <td>-</td>
                <td></td>
                <!-- <td>15/06/2021</td> 
                <td>-</td>             
                <td>Tuesday</td> -->
                <td></td>
              </tr>
              <br />
              <br />           
            </table>
            <table>
              <tr>
                <td class="text-monospace font-italic text-muted" style="font-size: 0.9rem;">Created by</td>
                <td>:</td>
                <td>-</td>
                <td></td>
                <td></td>
                <td></td>
                <td class="text-monospace font-italic text-muted" style="font-size: 0.9rem;">Date / Time</td>
                <td>:</td>
                <td>-</td>
              </tr>
            </table>
            </va-card>
            <br/>
            <!-- Clinical Information -->
            <va-card :title="$t('Clinical Information')">
              <div class="float-right">
                <router-link to="/admin/patient-management/clinical_history">
                <button type="button" class="ml-2 btn btn-warning btn-fill btn-md11 " >
                  <i class="fa fa-play-circle" /> &nbsp;View History
                </button>
                </router-link>
              </div>
            <table>
              <tr>
                <td><b>Date / Time</b></td>
                <td>:</td>
                <td>No Information</td>
              </tr>
              <tr>
                <td><b>Temperature (°C)</b></td>
                <td>:</td>
                <td>No Information</td>
              </tr>
              <tr>
                <td><b>Blood Pressure (mm/Hg)</b></td>
                <td>:</td>
                <td>No Information</td>
              </tr>
              <tr>
                <td><b>Pulse Rate (bpm)</b></td>
                <td>:</td>
                <td>No Information</td>
              </tr>
              <tr>
                <td><b>BMI</b></td>
                <td>:</td>
                <td>No Information</td>
              </tr>
              <tr>
                <td><b>Waist Circumference (CM)</b></td>
                <td>:</td>
                <td>No Information</td>
              </tr>
              <br />
              <br />            
            </table>
            <table>
              <tr>
                <td class="text-monospace font-italic text-muted" style="font-size: 0.9rem;">Created by</td>
                <td>:</td>
                <td>-</td>
                <td></td>
                <td></td>
                <td></td>
                <td class="text-monospace font-italic text-muted" style="font-size: 0.9rem;">Date / Time</td>
                <td>:</td>
                <td>-</td>
              </tr>
            </table>
            </va-card>
            <br/>
            <!-- Recent Visit -->
            <va-card :title="$t('Recent Visit')">
              <div class="float-right">
                <router-link to="/admin/patient-management/visit_history">
                <button type="button" class="ml-2 btn btn-warning btn-fill btn-md11 " >
                  <i class="fa fa-play-circle" /> &nbsp;View History
                </button>
                </router-link>
              </div>

              <br />
              No Information
              <br />
              <br />
              <br />
              <table>
                <tr>
                  <td class="text-monospace font-italic text-muted" style="font-size: 0.9rem;">Created by</td>
                  <td>:</td>
                  <td>-</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="text-monospace font-italic text-muted" style="font-size: 0.9rem;">Date / Time</td>
                  <td>:</td>
                  <td>-</td>
                </tr>
              </table>
            </va-card>

            <!-- <br/> -->
            <!-- Medication History 
            <va-card :title="$t('Medication History')">
              <div class="float-right">
                <router-link to="/">
                  <button type="button" class="btn sizebtn">
                    <i class="fa fa-pencil-square-o"/>
                  </button>
                </router-link>
              </div>
              <br />
              No Information
              <br />
              <br />
              <br />
              <table>
                <tr>
                  <td class="text-monospace font-italic text-muted" style="font-size: 0.9rem;">Created by</td>
                  <td>:</td>
                  <td>-</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="text-monospace font-italic text-muted" style="font-size: 0.9rem;">Date / Time</td>
                  <td>:</td>
                  <td>-</td>
                </tr>
              </table>
            </va-card> -->

            <br/>
            <!-- Family History -->
            <va-card :title="$t('Family History')">
              <div class="float-right">
                <router-link to="/admin/patient-management/patient_registration">
                  <button type="button" class="btn sizebtn">
                    <i class="fa fa-pencil-square-o"/>
                  </button>
                </router-link>
              </div>
              <br />
              No Information
              <br />
              <br />
              <br />
              <table>
                <tr>
                  <td class="text-monospace font-italic text-muted" style="font-size: 0.9rem;">Created by</td>
                  <td>:</td>
                  <td>-</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="text-monospace font-italic text-muted" style="font-size: 0.9rem;">Date / Time</td>
                  <td>:</td>
                  <td>-</td>
                </tr>
              </table>
            </va-card>
            <br/>
            <!-- Social History-->
            <va-card :title="$t('Social History')">
              <div class="float-right">
                <router-link to="/admin/patient-management/patient_registration">
                  <button type="button" class="btn sizebtn">
                    <i class="fa fa-pencil-square-o"/>
                  </button>
                </router-link>
              </div>
              <br />
              No Information
              <br />
              <br />
              <br />
              <table>
                <tr>
                  <td class="text-monospace font-italic text-muted" style="font-size: 0.9rem;">Created by</td>
                  <td>:</td>
                  <td>-</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="text-monospace font-italic text-muted" style="font-size: 0.9rem;">Date / Time</td>
                  <td>:</td>
                  <td>-</td>
                </tr>
              </table>
            </va-card>
            
          

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vudal from 'vudal'
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg-core.css'
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Table from '@/components/Table.vue'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueFormGenerator)
Vue.component(Vudal)
// register globally
export default {
  components: {
    Vudal,
    Table,
  },
  mounted () {
    // this.$refs.wizard.maxStep = 5
    // this.$refs.wizard.navigateToTab(5)
  },
  props: {
    value: File,
  },
  data () {
    return {
      applicantPhoto: '',
      show: false,
      show_second: false,
      show_third: false,
      modalClass: 'modal-90per',
   

      model: {
        show1: true,
        //* *Particulars of Applicant (Corporate)*/


      },
      formOptions: {
        // validationErrorClass: "has-error",
        // validationSuccessClass: "has-`success`",
        validateAfterChanged: true,
      },

      
      

    }
  },
  methods: {
    showmodal () {
      this.$modals.simpleModal.$show()
    },

    handleFileChange (e) {
      this.$emit('input', e.target.files[0])
      this.fileName1 = e.target.files[0].name
      console.log(e.target.files[0].name)

    },
    onComplete () {
      alert(JSON.stringify(this.model))
      // this.$router.push("/admin/director-details");
    },

  },
}
</script>
<!-- New step!
     Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
  .app-layout__main {
    background: #e8e8e8;
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
</style>
