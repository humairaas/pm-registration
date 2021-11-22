<!-- Patient Record (Nurse View) -->
<template>
  <div class="content">
    <div class="container-fluid">
      <h2 class="patient-name">Ms. Nuha Binti Ahmad Soleh</h2>

      <div class="row">
        <!--Demographic--->
        <div class="col-xl-9 mb-3">
          <va-card :title="$t('Demographic')">
            <div class="float-right">
              <router-link to="/patient-management/patient_registration">
                <button type="button" class="btn sizebtn">
                  <i class="fa fa-pencil-square-o"/>
                </button>
              </router-link>
            </div>

            <div class="row mt-2">
              <div class="col-xl-9">
                <div class="row mt-2">
                  <div class="col-md-4"><b>MITS 2.0 Reference No</b></div>
                  <div class="col-md-auto"><b>:</b></div>
                  <div class="col-md-5">MT30399</div>
                </div>

                <div class="row">
                  <div class="col-md-4"><b>Hospital's MRN</b></div>
                  <div class="col-md-auto"><b>:</b></div>
                  <div class="col-md-5"> HS30399</div>
                </div>

                <div class="row">
                  <div class="col-md-4"><b>Mentari's MRN</b></div>
                  <div class="col-md-auto"><b>:</b></div>
                  <div class="col-md-5">HS30399</div>
                </div>

                <div class="row">
                  <div class="col-md-4"><b>Gender</b></div>
                  <div class="col-md-auto"><b>:</b></div>
                  <div class="col-md-5">Female</div>
                </div>

                <div class="row">
                  <div class="col-md-4"><b>Date of Birth</b></div>
                  <div class="col-md-auto"><b>:</b></div>
                  <div class="col-md-5">20/12/2000 (21 years old)</div>
                </div>

                <div class="row">
                  <div class="col-md-4"><b>Marital Status</b></div>
                  <div class="col-md-auto"><b>:</b></div>
                  <div class="col-md-5">Single</div>
                </div>

                <div class="row">
                  <div class="col-md-4"><b>Nationality</b></div>
                  <div class="col-md-auto"><b>:</b></div>
                  <div class="col-md-5">Malaysian</div>
                </div>

                <div class="row mb-3">
                  <div class="col-md-4"><b>Contact No</b></div>
                  <div class="col-md-auto"><b>:</b></div>
                  <div class="col-md-5">018-2875425</div>
                </div>
              </div>
              <div class="col-xl-3">
                <b>Allergies :</b>
                <p>Peanut, Dairy Products, Peanut, Dairy Products, Peanut, Dairy Products</p>
              </div>
            </div>
          </va-card>

        </div>
        <!--Alert--->
        <div class="col-xl">
          <va-card :title="$t('Alert')">
          </va-card>
        </div>
      </div>

      <div class="row">
        <div class="col-xl-9">
          <div class="row mt-3">
            <!--Visit History--->
            <div class="col-xl-12">
              <va-card :title="$t('Visit History')">
              </va-card>
            </div>
          </div>

          <!--Appointment--->
          <div class="row mt-3">
            <div class="col-xl-12">
              <va-card :title="$t('Appointment')">
              </va-card>
            </div>
          </div>

          <!--Clinical Information--->
          <div class="row mt-3">
            <div class="col-xl-12">
              <va-card :title="$t('Clinical Information')">
              </va-card>
            </div>
          </div>

          <!--Attachments--->
          <div class="row mt-3 mb-2">
            <div class="col-xl-12">
              <va-card :title="$t('Attachments')">
              </va-card>
            </div>
          </div>
        </div>

        <!--General Actions-->
        <div class="col-xl mt-3">
          <va-card :title="$t('General Actions')">
            <va-tree-root>
              <va-tree-category label="Clinical Information" class="ga-one">
                <va-tree-node class="ga-two">Navigation 1</va-tree-node>
              </va-tree-category>
              <va-tree-category label="Psychometric Test" class="ga-one">
                <va-tree-category label="Navigation 1" >
                  <va-tree-node class="ga-two">Navigation 1</va-tree-node>
                </va-tree-category>
                <va-tree-node class="ga-two">Navigation 1</va-tree-node>
              </va-tree-category>
              <va-tree-category label="Clinical Documentation" class="ga-one">
                <va-tree-node class="ga-two">Navigation 1</va-tree-node>
              </va-tree-category>
              <va-tree-category label="Appointment" class="ga-one">
                <va-tree-node class="ga-two">Navigation 1</va-tree-node>
              </va-tree-category>
              <va-tree-category label="Attachment" class="ga-one">
                <va-tree-node class="ga-two">Navigation 1</va-tree-node>
              </va-tree-category>
              <va-tree-category label="SHHARP" class="ga-one">
                <va-tree-node class="ga-two">View History</va-tree-node>
                <va-tree-node class="ga-two">Add New Registry</va-tree-node>
              </va-tree-category>
            </va-tree-root>
          </va-card>
        </div>
      </div>
      <div>
        <router-link to="/patient-management/clinical_history">
          <button type="button" class="btn log-button">
            <b>View Transaction Log</b>
          </button>
        </router-link>
      </div>
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

  .ga-two:hover {
    text-decoration: underline;
  }
</style>
