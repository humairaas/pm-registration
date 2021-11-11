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
                <vue-form-generator :model="model" :schema="firstTabASchema" :options="formOptions" ref="firstTabForm" @model-updated="onModelUpdated">                   
                </vue-form-generator>
                
                <!-- Contoh collapse -->
                <!-- 
                <br />
                <div >
                  
                    <va-collapse>
                        <span slot="header" class="display-6">Socio Demographic</span>
                        <div slot="body">
                            <br />
                            <vue-form-generator :model="model" :schema="firstTabBSchema" :options="formOptions" ref="secondTabForm" @model-updated="onModelUpdated" >
                            </vue-form-generator>

                        </div>
                    </va-collapse>
                  
                </div>             

                <br />
                <div>
                    
                      <va-collapse>
                          <span slot="header" class="display-6">Next Of Kin</span>
                          <div slot="body">
                              <br />
                              <vue-form-generator :model="model" :schema="firstTabCSchema" :options="formOptions" ref="secondTabForm" @model-updated="onModelUpdated" >
                              </vue-form-generator> 
                                  <div>
                                      <multiselect v-model="value" :options="options"></multiselect>
                                  </div>
                          </div>
                      </va-collapse>
                    
                </div>

                <br />
                <div>
                    
                      <va-collapse>
                          <span slot="header" class="display-6">Allergy</span>
                          <div slot="body">
                              <br />
                              <vue-form-generator :model="model" :schema="firstTabDSchema" :options="formOptions" ref="secondTabForm" @model-updated="onModelUpdated" >
                              </vue-form-generator> 
                                  <div>
                                      <multiselect v-model="value" :options="options"></multiselect>
                                  </div>
                          </div>
                      </va-collapse>
                    
                </div>-->
              </tab-content>

              <!-- 2nd tab: Socio Demographic-->  
              <tab-content icon="fa fa-vcard" title="2. Socio Demographic" :before-change="validateThirdTab">
                  <vue-form-generator :model="model" :schema="firstTabBSchema" :options="formOptions" ref="secondTabForm" @model-updated="onModelUpdated" >
                  </vue-form-generator>  
                  <div>
                    <multiselect v-model="value" :options="options"></multiselect>
                  </div>         
              </tab-content>

              <!-- 3rd tab: Next of Kin-->
              <tab-content icon="fa fa-group" title="3. Next of Kin" :before-change="validateFourthTab">
                <vue-form-generator :model="model" :schema="firstTabCSchema" :options="formOptions" ref="secondTabForm" @model-updated="onModelUpdated" >
                </vue-form-generator> 
                <div>
                  <multiselect v-model="value" :options="options"></multiselect>
                </div>             
              </tab-content>

              <!-- 4th tab: Allergy--> 
              <tab-content icon="fa fa-info" title="4. Allergy" :before-change="validateFourthTab">
                <vue-form-generator :model="model" :schema="firstTabDSchema" :options="formOptions" ref="secondTabForm" @model-updated="onModelUpdated" >
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
import Vudal from 'vudal'
import Multiselect from 'vue-multiselect'
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg-core.css'
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import vSelect from 'vue-select'
//import * as servicesModule1 from '../../../app/module1/services01'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-select/dist/vue-select.css';

import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
Vue.use(VueFormWizard)

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueFormGenerator)
Vue.component(Vudal)
Vue.component('multiselect', Multiselect)
Vue.component('v-select', vSelect)
// register globally
export default {
  components: {
    Vudal,
    vSelect,
  },
  mounted () {
    // this.$refs.wizard.maxStep = 5
    // this.$refs.wizard.navigateToTab(5)
    this.getSalutation();
    console.log(JSON.stringify(this))
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
      uploadedFileFields: [
        {
          key: 'actions',
          label: '',
        },
        // A column that needs custom formatting
        {
          key: 'fileName',
          label: 'Document',
        },
        {
          key: 'file',
          label: 'Action',
        },
      ],
      uploadFileFields: [
        // A virtual column that doesn't exist in items
        {
          key: 'actions',
          label: '',
        },
        // A column that needs custom formatting
        {
          key: 'fileName',
          label: 'Document',
        },
        {
          key: 'chooseFile',
          label: 'Choose File',
        },
      ],

      
      currentPage: 1,
      filter: null,
      directorList: [],
      
      fields: [
        // A virtual column that doesn't exist in items
        {
          key: 'index',
          label: 'No',
        },
        // A column that needs custom formatting
        {
          key: 'name',
          label: 'Name',
        },
        {
          key: 'DIR_icNo',
          label: 'IC No.',
        },
        {
          key: 'DIR_effectiveDate',
          label: 'Effective Date',
        },
        {
          key: 'DIR_endDate',
          label: 'End Date',
        },
        {
          key: 'actions',
          label: 'Action',
        },
      ],
      showView: false,
      contactPersonValue: null,
      visibleIc: true,
      visibleIcType : true,
      visibleIcOthers: false,
      visiblePassport : false,
      visiblePassportExpiry : false,
      visibleToSpecify : false,
      visibleUpload: false,

      //Socio Demographic -Others
      visibleOthersRace: false,
      visibleOthersReligion: false,
      visibleOthersMarital: false,
      visibleOthersAccommodation: false,
      visibleOthersOccStatus: false,
      visibleOthersFee: false,
      visibleOthersOccSector: false,
      
      //Allergy -Yes
      visibleAllergy1: false,
      visibleAllergy1Detail: false,
      visibleAllergy2: false,
      visibleAllergy2Detail: false,
      visibleAllergy3: false,
      visibleAllergy3Detail: false,


      citizenship: [
        {
        name: 'Malaysian',
        value: '1',      
        selected: true, 
        styleClasses: 'col-md-4 jarak',
        },
        {
          name: 'Permanent Resident',
          value: '2',
          styleClasses: 'col-md-4 jarak',
          
        },
        {
          name: 'Foreigner',
          value: '3',
          styleClasses: 'col-md-4 jarak',
          
        },
      ],

      gender: [{
        name: 'Male',
        value: '1',
        selected: true,
      },
      {
        name: 'Female',
        value: '2',
      },
      ],

      selectServices: [{
        name: 'Consultation',
        id: '1',
      },
      {
        name: 'Rehabilitation',
        id: '2',
      },
      {
        name: 'Community Psychiatric Service (CPS)',
        id: '3',
      },
      ],

      postcode: [
        '40000',
        '40100',
        '40150',
        '40160',
        '40170',
        '40200',
        '40300',
        '40400',
        '40450',
        '40460',
        '40470',
        '40500',
        '40502',
        '40503',
        '40505',
        '40512',
        '40517',
        '40520',
        '40529',
        '40542',
        '40548',
        '40550',
        '40551',
        '40560',
        '40564',
        '40570',
        '40572',
        '40576',
        '40578',
        '40582',
        '40590',
        '40592',
        '40594',
        '40596',
        '40598',
        '40604',
        '40607',
        '40608',
        '40610',
        '40612',
        '40620',
        '40622',
        '40626',
        '40632',
        '40646',
        '40648',
        '40660',
        '40664',
        '40670',
        '40672',
        '40673',
        '40674',
        '40675',
        '40676',
        '40680',
        '40690',
        '40700',
        '40702',
        '40704',
        '40706',
        '40708',
        '40710',
        '40712',
        '40714',
        '40716',
        '40718',
        '40720',
        '40722',
        '40724',
        '40726',
        '40728',
        '40730',
        '40732',
        '40800',
        '40802',
        '40804',
        '40806',
        '40808',
        '40810',
        '40990',
        '41000',
        '41050',
        '41100',
        '41150',
        '41200',
        '41250',
        '41300',
        '41400',
        '41506',
        '41560',
        '41586',
        '41672',
        '41700',
        '41710',
        '41720',
        '41900',
        '41902',
        '41904',
        '41906',
        '41908',
        '41910',
        '41912',
        '41914',
        '41916',
        '41918',
        '41990',
        '42000',
        '42009',
        '42100',
        '42200',
        '42300',
        '42500',
        '42507',
        '42509',
        '42600',
        '42610',
        '42700',
        '42800',
        '42920',
        '42940',
        '42960',
        '43000',
        '43007',
        '43009',
        '43100',
        '43200',
        '43207',
        '43300',
        '43400',
        '43500',
        '43558',
        '43600',
        '43650',
        '43700',
        '43800',
        '43807',
        '43809',
        '43900',
        '43950',
        '44000',
        '44010',
        '44020',
        '44100',
        '44110',
        '44200',
        '44300',
        '45000',
        '45100',
        '45200',
        '45207',
        '45209',
        '45300',
        '45400',
        '45500',
        '45600',
        '45607',
        '45609',
        '45620',
        '45700',
        '45800',
        '46000',
        '46050',
        '46100',
        '46150',
        '46200',
        '46300',
        '46350',
        '46400',
        '46506',
        '46547',
        '46549',
        '46551',
        '46564',
        '46582',
        '46598',
        '46662',
        '46668',
        '46672',
        '46675',
        '46700',
        '46710',
        '46720',
        '46730',
        '46740',
        '46750',
        '46760',
        '46770',
        '46780',
        '46781',
        '46782',
        '46783',
        '46784',
        '46785',
        '46786',
        '46787',
        '46788',
        '46789',
        '46790',
        '46791',
        '46792',
        '46793',
        '46794',
        '46795',
        '46796',
        '46797',
        '46798',
        '46799',
        '46800',
        '46801',
        '46802',
        '46803',
        '46804',
        '46805',
        '46806',
        '46860',
        '46870',
        '46960',
        '46962',
        '46964',
        '46966',
        '46968',
        '46970',
        '46972',
        '46974',
        '46976',
        '46978',
        '47000',
        '47100',
        '47110',
        '47120',
        '47130',
        '47140',
        '47150',
        '47160',
        '47170',
        '47180',
        '47190',
        '47200',
        '47300',
        '47301',
        '47307',
        '47308',
        '47400',
        '47410',
        '47500',
        '47507',
        '47509',
        '47600',
        '47610',
        '47620',
        '47630',
        '47640',
        '47650',
        '47800',
        '47810',
        '47820',
        '47830',
        '48000',
        '48010',
        '48020',
        '48050',
        '48100',
        '48200',
        '48300',
        '53100',
        '55100',
        '56000',
        '56100',
        '63000',
        '63100',
        '63200',
        '63300',
        '64000',
        '68000',
        '68100',
      ],
      city: [{
        id: '1',
        name: 'Subang Jaya',
      },
      {
        id: '2',
        name: 'Klang',
      },
      {
        id: '3',
        name: 'Ampang Jaya',
      },
      {
        id: '3',
        name: 'Shah Alam',
      },
      {
        id: '3',
        name: 'Petaling Jaya',
      },
      {
        id: '3',
        name: 'Cheras',
      },
      {
        id: '3',
        name: 'Kajang',
      },
      {
        id: '3',
        name: 'Selayang Baru',
      },
      {
        id: '3',
        name: 'Rawang',
      },
      {
        id: '3',
        name: 'Taman Greenwood',
      },
      {
        id: '3',
        name: 'Semenyih',
      },
      {
        id: '3',
        name: 'Serdang',
      },
        // "Banting",
        // "Balakong",
        // "Gombak Setia",
        // "Kuala Selangor",
        // "Serendah",
        // "Bukit Beruntung",
        // "Pengkalan Kundang",
        // "Jenjarom",
        // "Sungai Besar",
        // "Batu Arang",
        // "Tanjung Sepat",
        // "Kuang",
        // "Kuala Kubu Baharu",
        // "Batang Berjuntai",
        // "Bandar Baru Salak Tinggi",
        // "Sekinchan",
        // "Sabak",
        // "Tanjung Karang",
        // "Beranang",
        // "Sungai Pelek"
      ],
      states: [{
        id: 'MY-14',
        name: 'Wilayah Persekutuan Kuala Lumpur',
      },
      {
        id: 'MY-15',
        name: 'Wilayah Persekutuan Labuan',
      },
      {
        id: 'MY-16',
        name: 'Wilayah Persekutuan Putrajaya',
      },
      {
        id: 'MY-01',
        name: 'Johor',
      },
      {
        id: 'MY-02',
        name: 'Kedah',
      },
      {
        id: 'MY-03',
        name: 'Kelantan',
      },
      {
        id: 'MY-04',
        name: 'Melaka',
      },
      {
        id: 'MY-05',
        name: 'Negeri Sembilan',
      },
      {
        id: 'MY-06',
        name: 'Pahang',
      },
      {
        name: 'Perak',
        id: 'MY-08',
      },
      {
        id: 'MY-09',
        name: 'Perlis',
      },
      {
        id: 'MY-07',
        name: 'Pulau Pinang',
      },
      {
        id: 'MY-12',
        name: 'Sabah',
      },
      {
        id: 'MY-13',
        name: 'Sarawak',
      },
      {
        id: 'MY-10',
        name: 'Selangor',
      },
      {
        id: 'MY-11',
        name: 'Terengganu',
      },
      ],
      
      salutations: [
      // {
      //   name: 'BRIG. GEN. (B)',
      //   id: '1',
      // },
      // {
      //   name: 'CIK',
      //   id: '2',
      // },
      // {
      //   name: 'DATIN',
      //   id: '3',
      // },
      // {
      //   name: 'DATIN SERI',
      //   id: '4',
      // },
      // {
      //   name: 'DATO',
      //   id: '5',
      // },
      // {
      //   name: 'DATUK',
      //   id: '6',
      // },
      // {
      //   name: 'DATUK SERI',
      //   id: '7',
      // },
      // {
      //   name: 'DR',
      //   id: '8',
      // },
      // {
      //   name: 'EN',
      //   id: '9',
      // },
      // {
      //   name: 'MR.',
      //   id: '11',
      // },
      // {
      //   name: 'MS.',
      //   id: '12',
      // },
      // {
      //   name: 'PN.',
      //   id: '13',
      // },
      // {
      //   name: 'PROF.',
      //   id: '14',
      // },
      // {
      //   name: 'PUAN SRI',
      //   id: '15',
      // },
      // {
      //   name: 'TAN SRI',
      //   id: '16',
      // },
      // {
      //   name: 'TENGKU',
      //   id: '17',
      // },
      // {
      //   name: 'TUAN',
      //   id: '18',
      // },
      // {
      //   name: 'TUAN HAJI',
      //   id: '19',
      // },
      // {
      //   name: 'TUNKU',
      //   id: '20',
      // },
      // {
      //   name: 'Y.A.B',
      //   id: '21',
      // },
      // {
      //   name: 'Y.B',
      //   id: '22',
      // },
      // {
      //   name: 'Y.BHG.',
      //   id: '23',
      // },
      // {
      //   name: 'Y.M.TUNKU DATO',
      //   id: '24',
      // },
      // {
      //   name: 'No Information',
      //   id: '25',
      // },
      ],

      icTypes: [{
        name: 'NRIC (New)',
        id: '1',
        selected: true,
      },
      {
        name: 'NRIC (Old)',
        id: '2',
      },
      {
        name: 'NRIC (ARMY)',
        id: '3',
      },
      {
        name: 'NRIC (Permanent Resident)',
        id: '4',
      },
      ],
      
      //Data Untuk Socio Demographic
      applicantPhoto: '',
      show: false,
      show_second: false,
      show_third: false,
      modalClass: 'modal-90per',
      uploadedFileFields: [
        {
          key: 'actions',
          label: '',
        },
      ],
      selectRace: [
        {
          name: 'Malay',
          id: '1',
        },
        {
          name: 'Indian',
          id: '2',
        },
        {
          name: 'Chinese',
          id: '3',
        },
        {
          name: 'Orang Asli',
          id: '4',
        },
        {
          name: 'Bumiputra Sabah',
          id: '5',
        },
        {
          name: 'Bumiputra Sarawak',
          id: '6',
        },
        {
          name: 'Others',
          id: '7',
        },
      ],
      selectReligion: [
        {
          name: 'No Info',
          id: '1',
        },
        {
          name: 'Islam',
          id: '2',
        },
        {
          name: 'Christianity',
          id: '3',
        },
        {
          name: 'Buddhism',
          id: '4',
        },
        {
          name: 'Hinduism',
          id: '5',
        },
        {
          name: 'Sikhism',
          id: '6',
        },
        {
          name: 'Atheist',
          id: '7',
        },
        {
          name: 'Others',
          id: '8',
        },
      ],
      selectMarital: [
        {
          name: 'No Info',
          id: '1',
        },
        {
          name: 'Single',
          id: '2',
        },
        {
          name: 'Married',
          id: '3',
        },
        {
          name: 'Widowed',
          id: '4',
        },
        {
          name: 'Divorced',
          id: '5',
        },
        {
          name: 'Others',
          id: '6',
        },
      ],
      selectAccommodation: [
        {
          name: 'Private Residence',
          id: '1',
        },
        {
          name: 'Psychiatric Hospital',
          id: '2',
        },
        {
          name: 'Homeless',
          id: '3',
        },
        {
          name: 'Institution',
          id: '4',
        },
        {
          name: 'Nursing Home',
          id: '5',
        },
        {
          name: 'Others',
          id: '6',
        },
      ],
      selectEducation: [
        {
          name: 'No Info',
          id: '1',
        },
        {
          name: 'Primary',
          id: '2',
        },
        {
          name: 'Secondary',
          id: '3',
        },
        {
          name: 'Tertiary',
          id: '4',
        },
      ],
      selectFee: [
        {
          name: 'Government Servant ',
          id: '1',
        },
        {
          name: 'People with Disability (OKU)',
          id: '2',
        },
        {
          name: 'Pensioner',
          id: '3',
        },
        {
          name: 'School & IPTA',
          id: '4',
        },
        {
          name: 'Others',
          id: '5',
        },
      ],
      selectOccupation: [
        {
          name: 'Disabled/ Permanently Sick ',
          id: '1',
        },
        {
          name: 'Employee',
          id: '2',
        },
        {
          name: 'Employer',
          id: '3',
        },
        {
          name: 'Homemaker',
          id: '4',
        },
        {
          name: 'Own Account Worker',
          id: '5',
        },
        {
          name: 'Retired',
          id: '6',
        },
        {
          name: 'Student',
          id: '7',
        },
        {
          name: 'Unemployed',
          id: '8',
        },
        {
          name: 'Unpaid Family Worker',
          id: '9',
        },
        {
          name: 'Others',
          id: '10',
        },
      ],
      selectOccSector: [
        {
          name: 'Government',
          id: '1',
        },
        {
          name: 'Private',
          id: '2',
        },
        {
          name: 'Self-employed',
          id: '3',
        },
        {
          name: 'Government Pensioner',
          id: '4',
        },
        {
          name: 'Others',
          id: '5',
        },
      ],

      //Data Untuk Next Of Kin
      selectRelationship: [
        {
          name: 'Husband',
          id: '1',
        },
        {
          name: 'Wife',
          id: '2',
        },
        {
          name: 'Father',
          id: '3',
        },
        {
          name: 'Mother',
          id: '4',
        },
        {
          name: 'Biological Child',
          id: '5',
        },
        {
          name: 'Stepchild',
          id: '6',
        },
        {
          name: 'Adopted Child',
          id: '7',
        },
        {
          name: 'Grandfather',
          id: '8',
        },
        {
          name: 'Grandmother',
          id: '9',
        },
        {
          name: 'Siblings',
          id: '10',
        },
        {
          name: 'Guardian',
          id: '11',
        },
        {
          name: 'Others',
          id: '12',
        },
      ],
      //Data Untuk Allergn
      allergy: [
      {
        name: 'Yes',
        value: '2',
      },
        {
        name: 'No',
        value: '1',
        selected: true,
      },
      
      ],

      model: {
        show1: true,
        //* *Particulars of Applicant (Corporate)*/

        companyName: '',
        coRegNo: '',
        newCoRegNo: '',
        address: '',
        address2: '',
        address3: '',
        postcode: '',
        country: '',
        city: '',
        state: '',
        telNo: '',
        faxNo: '',
        email: '',
        applicationType: '',
        incorporateDate: '',
        setupType: '',

        structureType: '',
        approachType: '',
        dpNumber: '',
        consultantNumber: '',
        //* *Authorised Representative(s) */
        salutation: '',
        firstName: '',
        middleName: '',
        LastName: '',
        position: '',
        AR_icNo: '',
        AR_passport: '',
        passportExpiryDate: '',
        AR_citizenship: '1',
        AR_address: '',
        AR_address2: '',
        AR_postcode: '',
        AR_country: '',
        AR_city: '',
        AR_state: '',
        AR_telNo: '',
        AR_faxNo: '',
        AR_email: '',


        //MITS 2.0 - Demographic Data
        //salutation: '',
        name: '',
        Pt_citizenship:'1',
        //icType: '',
        icNo: '',
        passport: '',
        passportExpiryDate: '',
        passportToSpecify: '',
        gender: '1',
        age: '',
        //services: '',
        file1: '',
        dateOfBirth: '',
        address: '',
        address2: '',
        address3: '',
        postcode: '',
        //city: '',
        //state: '',
        country: '',  
        telNo: '',
        faxNo: '',
        email: '',
        applicationType: '',
        //Socio Demographic Data
        race: '',
        raceOthers: '',
        religion: '',
        religionOthers: '',
        maritalStatus: '',
        maritalOthers: '',
        accommodation: '',
        accommodationOthers: '',
        educationLevel: '',
        feeStatus: '',
        feeOthers: '',
        occupation: '',
        occStatusOthers: '',
        occupationSector: '',
        occSectorOthers: '',
        //Next of Kin
        nameNOK: '',
        relationship: '',
        othersRelationship: '',
        address: '',
        address2: '',
        address3: '',
        telNo: '',
        //Allergy
        allergy1: '1',
        allergy2: '1',
        allergy3: '1',
        allergy1detail: '',
        allergy2detail: '',
        allergy3detail: '',

      },
      formOptions: {
        // validationErrorClass: "has-error",
        // validationSuccessClass: "has-`success`",
        validateAfterChanged: true,
      },
      firstTabASchema: {
        groups: [{
          styleClasses: 'row',
          legend: '',
          fields: [
          {
            type: 'select',
            model: 'salutation',
            label: 'Salutation',
            //hint: 'Select Salutation',
            placeholder: 'Select Salutation',
            required: true,
            validator: 'required',
            styleClasses: 'col-md-3 dropdown',
            selectOptions: {
              multiple: false,
              key: '',
              label: '',
              searchable: true,
              noneSelectedText: 'Select Salutation',
            },
            values: (model, schema) => {
              return this.salutations
            },
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Name (as in NRIC)',
            model: 'name',
            placeholder: 'Enter Name (as in NRIC)',
            required: true,
            validator: 'string',
            styleClasses: 'col-md-9',
           
          },
          {
            type: 'radios',
            label: 'Citizenship',
            model: 'Pt_citizenship',
            values: () => {
              return this.citizenship
            },
            styleClasses: 'col-md-12 display-inline jarakkan-citizenship',
          },
          {
            type: 'select',
            model: 'icType',
            label: 'NRIC Type',
            //hint: 'Select NRIC Type',
            required: true,
            styleClasses: 'col-md-5',
            selectOptions: {
              multiple: false,
              key: 'name',
              label: 'name',
              searchable: true,
              noneSelectedText: 'Select NRIC Type'
            },        
            values: () => {
              return this.icTypes
            },
            visible: (model, field, form) => {
              return this.visibleIcType            
            },            
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'To Specify',
            model: 'AR_icNo',
            placeholder: 'Enter NRIC No.',
            required: true,
            styleClasses: 'col-md-2',
            visible: (model, field, form) => {
              return this.visibleIcOthers
            },
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'NRIC No',
            model: 'icNo',
            placeholder: 'Enter NRIC No.',
            required: true,
            validator: ['string', this.validateIC],
            styleClasses: 'col-md-5',
            visible: (model, field, form) => {
              return this.visibleIc
            },
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Passport No.',
            model: 'AR_passport',
            placeholder: 'Enter Passport No.',
            required: true,
            validator: 'string',
            styleClasses: 'col-md-4',
            visible: (model, field, form) => {
              return this.visiblePassport
            },
          },
          {
            type: 'input',
            inputType: 'date',
            label: 'Passport Expiry Date',           
            placeholder: 'Enter Passport Expiry Date',
            model: 'passportExpiryDate',
            required: true,
            formatted: 'DD/MM/YYYY',
            styleClasses: 'col-md-4',
            visible: (model, field, form) => {
              return this.visiblePassportExpiry
            },
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'To Specify',
            model: 'passportToSpecify',
            placeholder: '',
            required: true,
            validator: 'string',
            styleClasses: 'col-md-4',
            visible: (model, field, form) => {
              return this.visibleToSpecify
            },
          }, 
          {
            type: 'radios',
            label: 'Gender',
            model: 'gender',
            values: () => {
              return this.gender
            },        
            styleClasses: 'col-md-12 display-inline jarakkan-gender',
          },
          {           
            type: 'input',
            inputType: 'date',
            label: 'Date of Birth',
            model: 'dateOfBirth',
            placeholder: 'Enter Date',
            required: true,
            formatted: 'DD/MM/YYYY',
            styleClasses: 'col-md-5',
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Age',
            model: 'age',
            placeholder: 'Enter Age',
            required: true,
            validator: 'string',
            styleClasses: 'col-md-5',
          },
          {
            type: 'input',
            inputType: 'number',
            label: 'Mobile Phone Number',
            model: 'mobileNo',
            placeholder: 'Enter Mobile Phone Number',
            required: true,
            validator: 'number',
            styleClasses: 'col-md-5',
          },
          {
            type: 'input',
            inputType: 'number',
            label: 'House Phone Number',
            model: 'houseNo',
            placeholder: 'Enter House Phone Number',
            required: true,
            validator: 'number',
            styleClasses: 'col-md-5',
          },
          {
            type: 'select',
            label: 'Types of Services',
            model: 'services',
            placeholder: 'Select Type of Services',
            //hint: 'Select Type of Services',
            required: true,
            validator: 'required',
            styleClasses: 'col-md-5',
            selectOptions: {
              multiple: false,
              key: 'name',
              label: 'name',
              noneSelectedText: "Select Type of Service"
            },
            values: (model, schema) => {
              return this.selectServices
            },  
          },
          {
            type: 'upload',
            label: 'Upload Referral Letter',
            model: 'file1',
            inputName: 'file1',
            styleClasses: 'col-md-5',
            onChanged(model, schema, event){
              console.log(model,schema,event);
            },
            visible: (model, field, form) => {
              return this.visibleUpload
            },
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Address',
            model: 'address',
            placeholder: 'Enter street address',
            hint: 'Street Address line 1',
            validator: 'string',
            styleClasses: 'col-md-12',
          },
          {
            type: 'input',
            inputType: 'text',
            model: 'address2',
            placeholder: 'Enter street address',
            hint: 'Street Address line 2',
            styleClasses: 'col-md-12',
          },
          {
            type: 'input',
            inputType: 'text',
            model: 'address3',
            placeholder: 'Enter street address',
            hint: 'Street Address line 3',
            styleClasses: 'col-md-12',
          },
          {
            type: 'input',
            inputType: 'text',
            model: 'postcode',
            label: 'Postcode',
            placeholder: 'Enter Your Postcode',
            required: true,
            styleClasses: 'col-md-6',
          },
          {
            type: 'select',
            model: 'city',
            label: 'City',
            //hint: 'Select Your City',
            
            validator: 'required',
            styleClasses: 'col-md-6',
            selectOptions: {
              multiple: false,
              key: 'name',
              label: 'name',
              searchable: true,
              noneSelectedText: 'Select Your City',
            },
            values: (model, schema) => {
              return this.city
            },
          },
          {
            type: 'select',
            model: 'state',
            label: 'State',
            //hint: 'Select Your State',
            validator: 'required',
            styleClasses: 'col-md-6',
            selectOptions: {
              multiple: false,
              key: 'name',
              label: 'name',
              searchable: true,
              noneSelectedText: 'Select Your State',
            },
            values: (model, schema) => {
              return this.states
            },
          },

          ],         
        },    
        ],
      },

      //Socio Demographic
      firstTabBSchema: {
        groups: [
          //first row
          {
            styleClasses: 'row line',
            legend: '',
            fields: [
              {
                type: 'select',
                model: 'race',
                label: 'Race',
                placeholder: 'Select Race',
                hint: 'Select Race',
                //required: true,
                validator: 'required',
                styleClasses: 'col-md-4',
                selectOptions: {
                  multiple: false,
                  key: 'name',
                  label: 'name',
                  searchable: true,
                  noneSelectedText: 'Select Race'
                },
                values: (model, schema) => {
                  return this.selectRace
                }
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'To specify',
                model: 'raceOthers',
                placeholder: '',
                required: true,
                styleClasses: 'col-md-2',
                visible: (model, field, form) => {
                  return this.visibleOthersRace
                },
              },
              {
                type: 'select',
                model: 'religion',
                label: 'Religion',
                hint: 'Select Religion',
                placeholder: 'Select Religion',
                //required: true,
                validator: 'required',
                styleClasses: 'col-md-4',
                selectOptions: {
                  multiple: false,
                  key: 'name',
                  label: 'name',
                  searchable: true,
                  noneSelectedText: 'Select Religion'
                },
                values: (model, schema) => {
                  return this.selectReligion
                }
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'To specify',
                model: 'religionOthers',
                placeholder: '',
                required: true,
                styleClasses: 'col-md-2',
                visible: (model, field, form) => {
                  return this.visibleOthersReligion
                },
              },
            ],
          },
          //2nd row
          {
            styleClasses: 'row line',
            legend: '',
            fields: [
              {
                type: 'select',
                model: 'maritalStatus',
                label: 'Marital Status',
                hint: 'Select Marital Status',
                placeholder: 'Select Marital Status',
                //required: true,
                validator: 'required',
                styleClasses: 'col-md-4',
                selectOptions: {
                  multiple: false,
                  key: 'name',
                  label: 'name',
                  searchable: true,
                  noneSelectedText: 'Select Marital Status'
                },
                values: (model, schema) => {
                  return this.selectMarital
                }
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'To specify',
                model: 'maritalOthers',
                placeholder: '',
                required: true,
                styleClasses: 'col-md-2',
                visible: (model, field, form) => {
                  return this.visibleOthersMarital
                },
              },
              {
                type: 'select',
                model: 'accommodation',
                label: 'Accommodation',
                hint: 'Select Accommodation',
                //required: true,
                validator: 'required',
                styleClasses: 'col-md-4',
                selectOptions: {
                  multiple: false,
                  key: 'name',
                  label: 'name',
                  searchable: true,
                  noneSelectedText: 'Select Accommodation'
                },
                values: () => {
                  return this.selectAccommodation
                }
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'To specify',
                model: 'accommodationOthers',
                placeholder: '',
                required: true,
                styleClasses: 'col-md-2',
                visible: (model, field, form) => {
                  return this.visibleOthersAccommodation
                },
              },
            ],
          },
          //3rd row
          {
            styleClasses: 'row line',
            legend: '',
            fields: [
              {
                type: 'select',
                model: 'educationLevel',
                label: 'Education Level',
                hint: 'Select Education Level',
                //required: true,
                validator: 'required',
                styleClasses: 'col-md-4',
                selectOptions: {
                  multiple: false,
                  key: 'name',
                  label: 'name',
                  searchable: true,
                  noneSelectedText: 'Select Education Level'
                },
                values: (model, schema) => {
                  return this.selectEducation
                }
              },
              {
                type: 'select',
                model: 'occupation',
                label: 'Occupation Status',
                hint: 'Select Occupation Status',
                //required: true,
                validator: 'required',
                styleClasses: 'col-md-4',
                selectOptions: {
                  multiple: false,
                  key: 'name',
                  label: 'name',
                  searchable: true,
                  noneSelectedText: 'Select Occupation Status'
                },
                values: (model, schema) => {
                  return this.selectOccupation
                }
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'To specify',
                model: 'occStatusOthers',
                placeholder: '',
                required: true,
                styleClasses: 'col-md-2',
                visible: (model, field, form) => {
                  return this.visibleOthersOccStatus
                },
              },
            ],
          },
          //4th row
          {
            styleClasses: 'row line',
            legend: '',
            fields: [
              {
                type: 'select',
                model: 'feeStatus',
                label: 'Fee Exemption Status',
                hint: 'Select Fee Exemption Status',
                required: true,
                validator: 'required',
                styleClasses: 'col-md-4',
                selectOptions: {
                  multiple: false,
                  key: 'name',
                  label: 'name',
                  searchable: true,
                  noneSelectedText: 'Select Fee Exemption Status'
                },
                values: (model, schema) => {
                  return this.selectFee
                }
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'To specify',
                model: 'feeOthers',
                placeholder: '',
                required: true,
                styleClasses: 'col-md-2',
                visible: (model, field, form) => {
                  return this.visibleOthersFee
                },
              },
              {
                type: 'select',
                model: 'occupationSector',
                label: 'Occupation Sector',
                hint: 'Select Occupation Sector',
                required: true,
                validator: 'string',
                styleClasses: 'col-md-4',
                selectOptions: {
                  multiple: false,
                  key: 'name',
                  label: 'name',
                  searchable: true,
                },
                values: (model, schema) => {
                  return this.selectOccSector
                }
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'To specify',
                model: 'occSectorOthers',
                placeholder: '',
                required: true,
                styleClasses: 'col-md-2',
                visible: (model, field, form) => {
                  return this.visibleOthersOccSector
                },
              },
            ],
          },

        ],
      },

      //Next of Kin
      firstTabCSchema: {
        groups: [{
          styleClasses: 'row',
          legend: '',
          fields: [
          {
            type: 'input',
            inputType: 'text',
            label: 'Name (as in NRIC)',
            model: 'nameNOK',
            placeholder: 'Enter Name (as in NRIC)',
            required: true,
            validator: 'string',
            styleClasses: 'col-md-9',
          },
          {
            type: 'select',
            model: 'relationship',
            label: 'Relationship',
            hint: 'Choose Relationship',
            required: true,
            validator: 'required',
            styleClasses: 'col-md-3',
            selectOptions: {
              multiple: false,
              key: 'name',
              label: 'name',
              searchable: true,
            },
            values: (model, schema) => {
              return this.selectRelationship
            }
          },
          {
            type: 'input',
            inputType: 'number',
            label: 'Mobile Phone Number',
            model: 'mobileNo',
            placeholder: 'Enter Mobile Phone Number',
            required: true,
            validator: 'number',
            styleClasses: 'col-md-5',
          },
          {
            type: 'input',
            inputType: 'number',
            label: 'House Phone Number',
            model: 'houseNo',
            placeholder: 'Enter House Phone Number',
            required: true,
            validator: 'number',
            styleClasses: 'col-md-5',
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Address',
            model: 'address',
            placeholder: 'Enter street address',
            hint: 'Street Address',
            required: true,
            validator: 'string',
            styleClasses: 'col-md-12',
          },
          {
            type: 'input',
            inputType: 'text',
            model: 'address2',
            placeholder: 'Enter street address',
            hint: 'Street Address line 2',
            styleClasses: 'col-md-12',
          },
          {
            type: 'input',
            inputType: 'text',
            model: 'address3',
            placeholder: 'Enter street address',
            hint: 'Street Address line 3',
            styleClasses: 'col-md-12',
          },
          {
            type: 'input',
            inputType: 'text',
            model: 'postcode',
            label: 'Postcode',
            placeholder: 'Enter Your Postcode',
            required: true,
            styleClasses: 'col-md-6',
          },
          {
            type: 'select',
            model: 'city',
            label: 'City',
            hint: 'Select Your City',
            
            validator: 'required',
            styleClasses: 'col-md-6',
            selectOptions: {
              multiple: false,
              key: 'name',
              label: 'name',
              searchable: true,
              noneSelectedText: 'Select Your City',
            },
            values: (model, schema) => {
              return this.city
            },
          },
          {
            type: 'select',
            model: 'state',
            label: 'State',
            hint: 'Select Your State',
            validator: 'required',
            styleClasses: 'col-md-6',
            selectOptions: {
              multiple: false,
              key: 'name',
              label: 'name',
              searchable: true,
              noneSelectedText: 'Select Your State',
            },
            values: (model, schema) => {
              return this.states
            },
          },

          ],
        },   
        ],
      },

      //Allergy
      firstTabDSchema: {
        groups: [
        {
            styleClasses: 'row col',
            legend: '',
            fields: [
                {
                    type: 'label',
                    label: 'Drug Allergy',
                    styleClasses: 'col-sm-5 mt-1',
                },
                {
                    type: 'radios',
                    model: 'allergy1',
                    styleClasses: 'col-xs1',
                    values: () => {
                      return this.allergy
                    }
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'To Specify',
                    model: 'allergy1detail',
                    placeholder: '',
                    required: true,
                    validator: 'string',
                    styleClasses: 'col-md-6',
                    visible: (model, field, form) => {
                      return this.visibleAllergy1           
                    },
            
                },          
            ],
        },
        {
            styleClasses: 'row col',
            legend: '',
            fields: [
                {
                    type: 'label',
                    label: 'Traditional Medication / Supplement Allergy',
                    styleClasses: 'col-sm-5 mt-1',
                },
                {
                    type: 'radios',
                    model: 'allergy2',
                    styleClasses: 'col-xs1',
                    values: () => {
                      return this.allergy
                    }
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'To Specify',
                    model: 'allergy2detail',
                    placeholder: '',
                    required: true,
                    validator: 'string',
                    styleClasses: 'col-md-6',
                    visible: (model, field, form) => {
                      return this.visibleAllergy2           
                    },
            
                },          
            ],
        },  
        {
            styleClasses: 'row col',
            legend: '',
            fields: [
                {
                    type: 'label',
                    label: 'Others',
                    styleClasses: 'col-sm-5 mt-1',
                },
                {
                    type: 'radios',
                    model: 'allergy3',
                    styleClasses: 'col-xs1',
                    values: () => {
                      return this.allergy
                    }
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'To Specify',
                    model: 'allergy3detail',
                    placeholder: '',
                    required: true,
                    validator: 'string',
                    styleClasses: 'col-md-6',
                    visible: (model, field, form) => {
                      return this.visibleAllergy3           
                    },
            
                },          
            ],
        },  
        /* 
        {
            styleClasses: ['row col'],
            legend: '',
            fields: [
                {
                    type: 'label',
                    label: 'Others',
                    styleClasses: 'col-sm-5 mt-1',
                },
                {
                    type: 'checkbox',
                    model: 'allergy3',
                    default: false,
                    styleClasses: 'col-xs1 mt-2',
                },
                {
                    type: 'label',
                    label: 'Yes',
                    styleClasses: 'col-xs1',
                    },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'To Specify',
                    model: 'allergy3detail',
                    placeholder: '',
                    required: true,
                    validator: 'string',
                    styleClasses: 'col-md-6',
                }, 

            ]

        }*/
        ],
      },
      

      declarationSchema: {
        groups: [

          {
            styleClasses: ['row col'],
            legend: '',
            fields: [{
              type: 'checkbox',
              model: 'AI_term1',
              default: false,
              // required: true,
              // validator: "required",
              styleClasses: 'col-sm-1 mt-1',
            },
            {
              type: 'label',
              label: 'We agree to abide by the applicable Terms and Conditions  of use for this system and relevant laws and rules issued by FIMM.',
              // validator: "required",
              styleClasses: 'col-sm-11',
            },
            ],
          },
          {
            styleClasses: ['row col'],
            legend: '',
            fields: [{
              type: 'checkbox',
              model: 'AI_term2',
              default: false,
              // required: true,
              // validator: "required",
              styleClasses: 'col-sm-1 mt-1',
            },
            {
              type: 'label',
              label: 'We hereby confirm that the information given herein and in any other document provided by us for purposes of our application and registration with FIMM is true and accurate.',
              // validator: "required",
              styleClasses: 'col-sm-11',
            },
            ],
          },
          {
            styleClasses: ['row col'],
            legend: '',
            fields: [{
              type: 'checkbox',
              model: 'AI_term3',
              default: false,
              required: true,
              // validator: "required",
              styleClasses: 'col-sm-1 mt-1',
            },
            {
              type: 'label',
              label: 'Further, we hereby confirm and under take to ensure that, pursuant to the Personal Data Protection Act 2010, we have the consent of our officers, employees and unit trust consultants for the disclosure to and use by FIMM of their personal data.',
              // validator: "required",
              styleClasses: 'col-sm-11',
            },
            ],
          },
        ],
      },
    }
  },
  methods: {
    showmodal () {
      this.$modals.simpleModal.$show()
    },
    uploadImage (item) {
      item.selected = true
      if (item.type == 'photo') {
        console.log(this.$refs.applicantPhoto.files[0])
        this.applicantPhoto = this.$refs.applicantPhoto.files[0]
        const reader = new FileReader()
        reader.addEventListener(
          'load',
          function () {
            this.$refs.applicantPhotoDisplay.src = reader.result
          }.bind(this),
          false,
        )

        reader.readAsDataURL(this.applicantPhoto)
        console.log(item.selected)
        // item.selected = true;
      }

    },
    uploadFile () {
      // console.log(this.$refs.file.files[0]);
      if (this.$refs.file.files[0] !== undefined) {
        this.showView = true
      } else {
        this.showView = false
      }
    },

    validateIC (value) {
      //* * must contain letter only (lowercase and uppercase) */
      const expression1 = /^[0-9]+$/
      // let expression2 = /^[a-zA-Z]*[A-Z]+[a-zA-Z]*$/;
      // //** must contain at least one uppercase letter, one lower case letter and one number */
      // let expression4 = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]+)$/;
      // //** must contain at least one uppercase letter, one lower case letter, one number and one character */
      // let expression5 = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])([a-zA-Z0-9#?!@$%^&*-]+)$/;
      // //** must contain at least one uppercase letter, one lower case letter, one number and one character with minimum length*/
      // let expression6 = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])([a-zA-Z0-9#?!@$%^&*-]+).{8}$/;

      console.log(expression1.test(value))
      if (!expression1.test(value)) {
        // this.passwordStrength = "";
        return ['Ic must contain number only']
      }
    },
    
    onModelUpdated (newVal, schema) {
      console.log(newVal)
      //Citizenship
      if (schema === 'Pt_citizenship') {
        if (newVal === '1') {
          this.visibleIc = true
          this.visibleIcType = true
          this.visiblePassport = false
          this.visiblePassportExpiry = false
          this.visibleToSpecify = false
        }
        else if (newVal === '2'){
          this.visibleIc = true
          this.visibleIcType = false
          this.visiblePassport = false
          this.visiblePassportExpiry = false
          this.visibleToSpecify = false
        }
        else {
          this.visibleIc = false
          this.visibleIcType = false
          this.visiblePassport = true
          this.visiblePassportExpiry = true
          this.visibleToSpecify = true
        }
      }
      //Type of Services 
      if (schema === 'services') {
        if (newVal === '2' || newVal === '3') {
          this.visibleUpload = true
        }
        else {
          this.visibleUpload = false
        }
      }
      //Socio Demographic
      if (schema === 'race') {
        if (newVal === '7') {
          this.visibleOthersRace = true
        }
        else {
          this.visibleOthersRace = false
        }
      }
      if (schema === 'religion') {
        if (newVal === '8') {
          this.visibleOthersReligion = true
        }
        else {
          this.visibleOthersReligion = false
        }
      }
      if (schema === 'maritalStatus') {
        if (newVal === '6') {
          this.visibleOthersMarital = true
        }
        else {
          this.visibleOthersMarital = false
        }
      }
      if (schema === 'accommodation') {
        if (newVal === '6') {
          this.visibleOthersAccommodation = true
        }
        else {
          this.visibleOthersAccommodation = false
        }
      }
      if (schema === 'occupation') {
        if (newVal === '10') {
          this.visibleOthersOccStatus = true
        }
        else {
          this.visibleOthersOccStatus = false
        }
      }
      if (schema === 'feeStatus') {
        if (newVal === '5') {
          this.visibleOthersFee = true
        }
        else {
          this.visibleOthersFee = false
        }
      }
      if (schema === 'occupationSector') {
        if (newVal === '5') {
          this.visibleOthersOccSector = true
        }
        else {
          this.visibleOthersOccSector = false
        }
      }
      //Allergy 
      if (schema === 'allergy1') {
        if (newVal === '1') {
          this.visibleAllergy1 = false}
        else {
          this.visibleAllergy1 = true
        }
      }
      if (schema === 'allergy2') {
        if (newVal === '1') {
          this.visibleAllergy2 = false
        }
        else {
          this.visibleAllergy2 = true
        }
      }
      if (schema === 'allergy3') {
        if (newVal === '1') {
          this.visibleAllergy3 = false
        }
        else {
          this.visibleAllergy3 = true
        }
      }
    
    },


    handleFileChange (e) {
      this.$emit('input', e.target.files[0])
      this.fileName1 = e.target.files[0].name
      console.log(e.target.files[0].name)

    },
    onComplete () {
      alert(JSON.stringify(this.model))

    },
    validatePassword (value) {
      //* * must contain letter only (lowercase and uppercase) */
      const expression1 = /^[a-zA-Z]+$/
      const expression2 = /^[a-zA-Z]*[A-Z]+[a-zA-Z]*$/
      //* * must contain at least one uppercase letter, one lower case letter and one number */
      const expression4 = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]+)$/
      //* * must contain at least one uppercase letter, one lower case letter, one number and one character */
      const expression5 = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])([a-zA-Z0-9#?!@$%^&*-]+)$/
      //* * must contain at least one uppercase letter, one lower case letter, one number and one character with minimum length*/
      const expression6 = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])([a-zA-Z0-9#?!@$%^&*-]+).{8}$/

      console.log(expression1.test(value))
      if (!expression1.test(value)) {
        this.passwordStrength = ''
        return ['Password must contain letter only']
      }
    },
    isEqualTo (value, field, model) {
      if (!_.has(field, 'equals')) return ['Confirm password is required']
      const a = _.get(model, _.get(field, 'equals'))
      const b = value
      if (_.isEqual(a, b)) return []
      return ['Password do not match']
    },

    // Back-end Test
    getSalutation: async function() {
      const response = await servicesModule1.getSalutation();
      this.salutations = response;
    },


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
