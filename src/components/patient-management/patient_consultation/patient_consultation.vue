<!-- Patient Record (Nurse View) -->

<template>
  <div class="content">
    <div class="container-fluid">
      <br/>
      <h2 class="patient-name">Ms. Nuha Binti Ahmad Soleh</h2>

      <!-- Patient Profile -->
      <va-card :title="$t('Demographic')">

        <div class="float-right">
          <router-link to="/admin/patient-management/patient_registration">
            <button type="button" class="btn sizebtn">
              <i class="fa fa-pencil-square-o"/>
            </button>
          </router-link>
        </div>

        <div class="row">
          <div class="col-md-10">
            <table>
              <tr>
                <td><b>MITS 2.0 Reference No.</b></td>
                <td><b>:</b></td>
                <td>MS10001</td>

                <td><b>Hospital's MRN No.</b></td>
                <td><b>:</b></td>
                <td>MS10001</td>

                <td><b>Mentari's MRN No.</b></td>
                <td><b>:</b></td>
                <td>MS10001</td>
              </tr>
            </table>
            <table>
              <tr>
                <td><b>Patient Name</b></td>
                <td><b>:</b></td>
                <td>Ms. Nuha Binti Ahmad Soleh</td>
              </tr>
              <tr>
                <td><b>Gender</b></td>
                <td><b>:</b></td>
                <td>Female</td>
              </tr>
              <tr>
                <td><b>Date of Birth</b></td>
                <td><b>:</b></td>
                <td>09/01/2000 (21 years old)</td>
              </tr>
              <tr>
                <td><b>Marital Status</b></td>
                <td><b>:</b></td>
                <td>Single</td>
              </tr>
              <tr>
                <td><b>Nationality</b></td>
                <td><b>:</b></td>
                <td>Malaysian</td>
              </tr>
              <tr>
                <td><b>Contact No.</b></td>
                <td><b>:</b></td>
                <td>012-3456789</td>
              </tr>
            </table>
          </div>
          <div class="col-md-2">
            <table>
              <tr>
                <td><b>Allergy :</b></td>
              </tr>
              <tr>
                <td>Peanut, Milk</td>
              </tr>
            </table>
          </div>
        </div>
      </va-card>
      <!-- Appointment -->

      <!-- Clinical Information -->

      <!-- Recent Visit -->

      <!-- Medication History -->

      <!-- Family History -->

      <!-- Social History-->

    </div>
  </div>
</template>
<script>
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg-core.css'
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueFormGenerator)
// register globally
export default {
  components: {
  },
  data () {
    return {
      show: false,
      show_second: false,
      show_third: false,
      modalClass: 'modal-90per',
    }
  },
  methods: {
    showmodal () {
      this.$modals.simpleModal.$show()
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
