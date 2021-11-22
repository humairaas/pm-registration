<template>
  <div class="content">
    <div class="container-fluid">

      <div class="row">
        <div class="col-12">

          <!-- Notification Alert -->
          <div class="mb-3" v-if="tabA==true">
            <va-notification color="danger">
              <va-badge color="danger">
                {{ $t('Incomplete') }}
              </va-badge>
              <span>Please fill all <b> Demographic </b> required fields.</span>
              <button type="button" class="btn close-button" @click="hideNoti('tabA')">
                <span class="fa fa-close"/>
              </button>
            </va-notification>
          </div>
          <div class="mb-3" v-if="tabB==true">
            <va-notification color="danger">
              <va-badge color="danger">
                {{ $t('Incomplete') }}
              </va-badge>
              <span>Please fill all <b> Sosio Demographic </b> required fields.</span>
              <button type="button" class="btn close-button" @click="hideNoti('tabB')">
                <span class="fa fa-close"/>
              </button>
            </va-notification>
          </div>
          <div class="mb-3" v-if="tabC==true">
            <va-notification color="danger">
              <va-badge color="danger">
                {{ $t('Incomplete') }}
              </va-badge>
              <span>Please fill all <b> Next of Kin </b> required fields.</span>
              <button type="button" class="btn close-button" @click="hideNoti('tabC')">
                <span class="fa fa-close"/>
              </button>
            </va-notification>
          </div>
          <div class="mb-3" v-if="tabD==true">
            <va-notification color="danger">
              <va-badge color="danger">
                {{ $t('Incomplete') }}
              </va-badge>
              <span>Please fill all <b> Allergy </b> required fields.</span>
              <button type="button" class="btn close-button" @click="hideNoti('tabD')">
                <span class="fa fa-close"/>
              </button>
            </va-notification>
          </div>

          <!-- Form -->
          <va-card>
            <form-wizard  color="#f2a444" error-color="#a94442" ref="wizard">
              <h3 slot="title"></h3>

              <!-- 1st tab: Risk Factors-->
              <tab-content icon="fa fa-user-circle-o" title="1. Risk Factors">
                <vue-form-generator :model="model" :schema="tabASchema" :options="formOptions" ref="riskFactors" @model-updated="onModelUpdated">
                </vue-form-generator>
                <h6>{{model}}</h6>
              </tab-content>

              <!-- 2nd tab: Protective Factors-->
              <tab-content icon="fa fa-vcard" title="2. Protective Factors">
                <vue-form-generator :model="model" :schema="tabBSchema" :options="formOptions" ref="protectiveFactors" @model-updated="onModelUpdated" >
                </vue-form-generator>
              </tab-content>

              <!-- 3rd tab: The Self-harm Act and Suicidal Intent-->
              <tab-content icon="fa fa-group" title="3. The Self-harm Act and Suicidal Intent">
                <vue-form-generator :model="model" :schema="tabCSchema" :options="formOptions" ref="theSelfHarmActAndSuicidalIntent" @model-updated="onModelUpdated" >
                </vue-form-generator>
              </tab-content>

              <!-- 4th tab: Suicide Risk-->
              <tab-content icon="fa fa-info" title="4. Suicide Risk">
                <vue-form-generator :model="model" :schema="tabDSchema" :options="formOptions" ref="suicideRisk" @model-updated="onModelUpdated">
                </vue-form-generator>
              </tab-content>

              <!-- 5th tab: Hospital Management-->
              <tab-content icon="fa fa-info" title="5. Hospital Management">
                <vue-form-generator :model="model" :schema="tabESchema" :options="formOptions" ref="hospitalManagement" @model-updated="onModelUpdated">
                </vue-form-generator>
              </tab-content>

              <!-- 4th tab: Source Data Producer-->
              <tab-content icon="fa fa-info" title="6. Source Data Producer">
                <vue-form-generator :model="model" :schema="tabFSchema" :options="formOptions" ref="sourceDataProducer" @model-updated="onModelUpdated">
                </vue-form-generator>
              </tab-content>

              <!-- Button footer-->
              <template slot="footer" slot-scope="{
                activeTabIndex,
                isLastStep,
                nextTab,
                prevTab
              }">
                <div class="float-left">
                  <button v-if="activeTabIndex > 0" @click="prevTab" type="button" class="btn btn-primary btn-fill btn-md">
                    <div class="fa fa-step-backward" /> &nbsp; Previous
                  </button>
                </div>

                <div class="float-right">
                  <button v-if="!isLastStep" @click="nextTab" type="button" class="btn btn-info btn-fill btn-md">
                    Next <div class="fa fa-step-forward" />
                  </button>

                  <button v-if="isLastStep" @click="showLargeModal = true" type="button" class="ml-2 btn btn-warning btn-fill btn-md">
                    <div class="fa fa-play-circle" /> &nbsp;Preview
                  </button>

                  <button v-if="isLastStep" @click="validateForm" type="submit" class="ml-2 btn btn-primary btn-fill btn-md">
                    <div class="fa fa-paper-plane" /> &nbsp;Submit
                  </button>
                </div>
              </template>
            </form-wizard>
          </va-card>

          <!-- Modal -->
          <va-modal
            v-model="showLargeModal"
            size="large"
            :okText=" $t('Confirm') "
            :cancelText=" $t('Close') "
            :hide-default-actions= "true"
          >
            <div class="modal-preview">
              <h5 class="tab-title">1. Risk Factors</h5>
              <vue-form-generator class="read-only" :model="model" :schema="tabAModalSchema"></vue-form-generator>
              <h5 class="tab-title">2. Protective Factors</h5>
              <vue-form-generator class="sosio-margin read-only" :model="model" :schema="tabBSchema"></vue-form-generator>
              <h5 class="tab-title">3. The Self-Harm Act and Suicidal Intent</h5>
              <vue-form-generator class="read-only" :model="model" :schema="tabCSchema"></vue-form-generator>
              <h5 class="tab-title">4. Suicide Risk</h5>
              <vue-form-generator class="read-only" :model="model" :schema="tabDModalSchema"></vue-form-generator>
              <h5 class="tab-title">5. Hospital Management</h5>
              <vue-form-generator class="read-only" :model="model" :schema="tabEModalSchema"></vue-form-generator>
              <h5 class="tab-title">6. Source Data Producer</h5>
              <vue-form-generator class="read-only" :model="model" :schema="tabFModalSchema"></vue-form-generator>
              <div style="float: right;">
                <button @click="showLargeModal = false" type="button" class="ml-2 btn btn-secondary btn-fill btn-md">
                  Close
                </button>
              </div>
            </div>
          </va-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg-core.css'
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import * as servicesModule1 from '../../../app/module1/services01'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-select/dist/vue-select.css'

import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
Vue.use(VueFormWizard)

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueFormGenerator)
Vue.component('multiselect', Multiselect)

// cleave.js
require('cleave.js')
require('cleave.js/dist/addons/cleave-phone.my')

// register globally
export default {
  name: 'modals',
  components: {
  },
  data () {
    return {
      tabA: false,
      tabB: false,
      tabC: false,
      tabD: false,
      tabE: false,
      tabF: false,

      show: true,
      showLargeModal: false,

      submitPath: false,

      // Risk Factors Data

      // Protective Factors Data

      // The Self-harm Act and Suicidal Intent Data

      // Suicide Risk Data

      // Hospital Management Data

      // Source Data Producer Data

      model: {
        // Risk Factors

        // Protective Factors

        // The Self-harm Act and Suicidal Intent

        // Suicide Risk

        // Hospital Management

        // Source Data Producer

      },

      // Risk Factors
      tabASchema: {
        fields: [

        ],
      },
      // Protective Factors
      tabBSchema: {
        fields: [

        ],
      },

      // The Self-harm Act and Suicidal Intent
      tabCSchema: {
        fields: [

        ],
      },

      // Suicide Risk
      tabDSchema: {
        fields: [

        ],
      },

      // Hospital Management
      tabESchema: {
        fields: [

        ],
      },

      // Source Data Producer
      tabFSchema: {
        fields: [

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
    validateForm () {
      var tabA = this.validateTabA()
      var tabB = this.validateTabB()
      var tabC = this.validateTabC()
      var tabD = this.validateTabD()
      var tabE = this.validateTabE()
      var tabF = this.validateTabF()

      if (tabA && tabB && tabC && tabD && tabE && tabF) {
        this.launchToast()
        this.submitPath = true
        this.$router.push({ path: 'patient_consultation' })
      }
    },
    validateTabA () {
      var errors = this.$refs.riskFactors.validate()
      if (errors) {
        this.tabA = false
        return true
      } else {
        this.tabA = true
        return false
      }
    },
    validateTabB () {
      var errors = this.$refs.protectiveFactors.validate()
      if (errors) {
        this.tabB = false
        return true
      } else {
        this.tabB = true
        return false
      }
    },
    validateTabC () {
      var errors = this.$refs.theSelfHarmActAndSuicidalIntent.validate()
      if (errors) {
        this.tabC = false
        return true
      } else {
        this.tabC = true
        return false
      }
    },
    validateTabD () {
      var errors = this.$refs.suicideRisk.validate()
      if (errors) {
        this.tabD = false
        return true
      } else {
        this.tabD = true
        return false
      }
    },
    validateTabE () {
      var errors = this.$refs.hospitalManagement.validate()
      if (errors) {
        this.tabE = false
        return true
      } else {
        this.tabE = true
        return false
      }
    },
    validateTabF () {
      var errors = this.$refs.sourceDataProducer.validate()
      if (errors) {
        this.tabF = false
        return true
      } else {
        this.tabF = true
        return false
      }
    },
    hideNoti (tab) {
      if (tab === 'tabA') {
        this.tabA = false
      }
      if (tab === 'tabB') {
        this.tabB = false
      }
      if (tab === 'tabC') {
        this.tabC = false
      }
      if (tab === 'tabD') {
        this.tabD = false
      }
      if (tab === 'tabE') {
        this.tabE = false
      }
      if (tab === 'tabF') {
        this.tabF = false
      }
    },
    launchToast () {
      this.showToast(
        this.model.DM_NAME + ' Registration Successful !',
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
<!-- New step!
     Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
  .app_layout__main {
    background: #686868;
  }

  .display-inline label {
    display: inline !important;
    align-content: center;
    margin-right: 10px;
  }

  .jarakkan-citizenship label {
    margin-right: 230px;
  }

  .jarakkan-gender label {
    margin-right: 270px;
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

  .dropdown {
    box-sizing: border-box;
  }

  .center {
    margin-left: 200px;
  }

  .line + .line {
    border-top: 1px solid rgb(189, 184, 184);
    margin-top: 1rem;
    margin-bottom: 5rem;
  }

  .modal-preview {
    padding: 10px;
  }

  .tab-title {
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 10px;
    background-color: #f2a444;
    border-radius: 10px;
    color: white;
  }

  .sosio-margin {
    margin-left: 20px;
  }

  .read-only {
    pointer-events: none;
  }

  .close-button {
    color: rgb(227, 75, 74);
    position: absolute;
    right: 0;
    width: 70px;
  }

  .close-button:hover {
    color: black;
  }

  .close-button:focus {
    box-shadow: none !important;
  }
</style>
