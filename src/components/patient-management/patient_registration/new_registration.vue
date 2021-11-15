<template>
  <div class="content">
    <div class="container-fluid">

      <div class="row">
        <div class="col-12">
          <va-card>
            <form-wizard  @on-complete="onComplete" color="orange" error-color="#a94442" finish-button-text="Submit" ref="wizard">
              <h3 slot="title" ></h3>

              <!-- 1st tab: Demographic-->
              <tab-content icon="fa fa-user-circle-o" title="1. Demographic" :before-change="validateSecondTab">
                <vue-form-generator :model="model" :schema="tabASchema" :options="formOptions" ref="demographic" @model-updated="onModelUpdated">
                </vue-form-generator>
              </tab-content>

              <!-- 2nd tab: Socio Demographic-->
              <tab-content icon="fa fa-vcard" title="2. Socio Demographic" :before-change="validateThirdTab">
                <vue-form-generator :model="model" :schema="tabBSchema" :options="formOptions" ref="sosioDemographic" @model-updated="onModelUpdated" >
                </vue-form-generator>
                <div>
                  <multiselect v-model="value" :options="options"></multiselect>
                </div>
              </tab-content>

              <!-- 3rd tab: Next of Kin-->
              <tab-content icon="fa fa-group" title="3. Next of Kin" :before-change="validateFourthTab">
                <vue-form-generator :model="model" :schema="tabCSchema" :options="formOptions" ref="nextOfKin" @model-updated="onModelUpdated" >
                </vue-form-generator>
                <div>
                  <multiselect v-model="value" :options="options"></multiselect>
                </div>
              </tab-content>

              <!-- 4th tab: Allergy-->
              <tab-content icon="fa fa-info" title="4. Allergy" :before-change="validateFourthTab">
                <vue-form-generator :model="model" :schema="tabDSchema" :options="formOptions" ref="allergy" @model-updated="onModelUpdated" >
                </vue-form-generator>
                <div>
                  <multiselect v-model="value" :options="options"></multiselect>
                </div>
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
                    <i class="fa fa-step-backward" /> &nbsp; Previous
                  </button>
                </div>
                <div class="float-right">

                  <button @click="nextTab" type="button" class="btn btn-info btn-fill btn-md">
                    <i class="fa fa-edit" /> &nbsp;Save
                  </button>

                  <button v-if="isLastStep" @click="showmodal" type="button" class="ml-2 btn btn-warning btn-fill btn-md">
                    <i class="fa fa-play-circle" /> &nbsp;View
                  </button>
                  <button v-if="isLastStep" @click="nextTab" type="button" class="ml-2 btn btn-primary btn-fill btn-md">
                    Submit
                  </button>
                </div>
              </template>
            </form-wizard>
          </va-card>
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

// register globally
export default {
  components: {
  },
  data () {
    return {

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

</style>
