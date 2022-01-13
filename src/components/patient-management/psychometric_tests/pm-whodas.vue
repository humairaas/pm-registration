<!--
This page is not fully completed [last updated by Humaira': 27/12/2021]
  1. No validation
  2. Add Screening on button click is functioning(new row is added) but only the first data inserted is stored (using vue-form-generator)
-->
<template>
  <div class="content">
    <div class="container-fluid">

      <div class="row">
        <div class="col-12">

          <va-card>
            <div class="text-center"><h4 class="mt-5 mb-5 text-dark">WORLD HEALTH ORGANIZATION DISABILITY ASSESSMENT SCHEDULE 2.0 (WHODAS 2.0)</h4></div>

            <div class='question'>In the last 30 days, how much difficulty did you have in:</div>
            <div class="question-bm">Sepanjang 30 hari yang lalu, berapa banyak kesukaran yang anda telah alami dalam:</div>

            <div v-if='tabIndex==1' class='domain my-4'>
              <div class='domain-name-white'>UNDERSTANDING AND COMMUNICATING</div>
              <div class='bm-white'>PEMAHAMAN DAN KOMUNIKASI</div>
            </div>

            <div v-if='tabIndex==2' class='domain my-4'>
              <div class='domain-name-white'>GETTING AROUND</div>
              <div class='bm-white'>BERGRAK KE SANA SINI</div>
            </div>

            <div v-if='tabIndex==3' class='domain my-4'>
              <div class='domain-name-white'>SELF CARE</div>
              <div class='bm-white'>PENJAGAAN DIRI</div>
            </div>

            <div v-if='tabIndex==4' class='domain my-4'>
              <div class='domain-name-white'>GETTING ALONG WITH PEOPLE</div>
              <div class='bm-white'>BERMESRA DENGAN ORANG RAMAI</div>
            </div>

            <div v-if='tabIndex==5' class='domain my-4'>
              <div class='domain-name white'>LIFE ACTIVITIES - HOUSEHOLD</div>
              <div class='bm-white'>AKTIVITI-AKTIVIT KEHIDUPAN - RUMAH TANGGA</div>
            </div>

            <div v-if='tabIndex==6' class='domain my-4'>
              <div class='domain-name-white'>LIFE ACTIVITIES - SCHOOL / WORK</div>
              <div class='bm-white'>AKTIVIT-AKTIVITI KEHIDUPAN - SEKOLAH / KERJA</div>
            </div>

            <div v-if='tabIndex==7' class='domain my-4'>
              <div class='domain-name-white'>PARTICIPATION IN SOCIETY</div>
              <div class='bm-white'>PENYERTAAN DALAM MASYARAKAT</div>
            </div>

            <div class ="row justify-content-between">
              <div class="col-lg-auto">
                <div class = "r">
                  <p class = "num">1</p>
                  <p>None<br><span class="bm">Tiada</span></p>
                </div>
              </div>
              <div class="col-lg-auto">
                <div class = "r">
                  <p class = "num">2</p>
                  <p>Mild<br><span class="bm">Ringan</span></p>
                </div>
              </div>
              <div class="col-lg-auto">
                <div class = "r">
                  <p class = "num">3</p>
                  <p>Moderate<br><span class="bm">Sederhana</span></p>
                </div>
              </div>
              <div class="col-lg-auto">
                <div class = "r mr-2">
                  <p class = "num">4</p>
                  <p>Severe<br><span class="bm">Teruk</span></p>
                </div>
              </div>
              <div class="col-lg-auto">
                <div class = "r mr-2">
                  <p class = "num">5</p>
                  <p>Extreme or cannot do<br><span class="bm">Melampau atau tidak dapat dilakukan</span></p>
                </div>
              </div>
            </div>

            <div v-if="tabIndex==1" class = "mb-5 mt-4 px-3">
              <vue-form-generator :schema="d1_schema" :model="model" :options="formOptions" ref="whodas1"></vue-form-generator>
            </div>

            <div v-if="tabIndex==2" class = "mb-5 mt-4 px-3">
              <vue-form-generator :schema="d2_schema" :model="model" :options="formOptions" ref="whodas2"></vue-form-generator>
            </div>

            <div v-if="tabIndex==3" class = "mb-5 mt-4 px-3">
              <vue-form-generator :schema="d3_schema" :model="model" :options="formOptions" ref="whodas3"></vue-form-generator>
            </div>

            <div v-if="tabIndex==4" class = "mb-5 mt-4 px-3">
              <vue-form-generator :schema="d4_schema" :model="model" :options="formOptions" ref="whodas4"></vue-form-generator>
            </div>

            <div v-if="tabIndex==5" class = "mb-5 mt-4 px-3">
              <vue-form-generator :schema="d5_schema" :model="model" :options="formOptions" ref="whodas5"></vue-form-generator>
            </div>

            <div v-if="tabIndex==6" class = "mb-5 mt-4 px-3">
              <vue-form-generator :schema="d6_schema" :model="model" :options="formOptions" ref="whodas6"></vue-form-generator>
            </div>

            <div v-if="tabIndex==7" class = "mb-5 mt-4 px-3">
              <vue-form-generator :schema="d7_schema" :model="model" :options="formOptions" ref="whodas7"></vue-form-generator>
            </div>

            <!-- Buttons -->
            <div class="row justify-content-between px-3 mt-5 mb-3">
              <div class="col-xs-auto">
                <button v-if="tabIndex > 1" @click="tabIndex--" type="button" class="btn btn-primary btn-fill btn-md">
                  <div class="fa fa-angle-double-left" /> &nbsp; PREVIOUS
                </button>
              </div>
              <div class="col-xs-auto" v-if="tabIndex < 7" >
                <button @click="validateWhodas" type="button" class="btn btn-info btn-fill btn-md">
                  NEXT <div class="fa fa-angle-double-right" />
                </button>
              </div>
              <div class='col-xs-auto' v-if="tabIndex==7" >
                <button @click="calculateWhodas" type="submit" class="ml-2 btn btn-primary btn-fill btn-md">
                  <div class="fa fa-paper-plane" /> &nbsp;SUBMIT
                </button>
              </div>
            </div>

            <div class='row justify-content-md-center'>
              <va-pagination v-model="tabIndex" :pages="7" :visible-pages="7" disabled/>
            </div>
          </va-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabIndex: 1,
      submitPath: false,

      model: {
        D1: [],
        D2: [],
        D3: [],
        D4: [],
        D5: [],
        D6: [],
        D7: [],
      },
      d1_schema: {
        groups: [
          {
            styleClasses: ['row', 'odd'],
            fields: [
              {
                type: 'label',
                label: '1.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "Concentrating on doing something for ten minutes?<div class='bm'>Menumpu perhatian dalam melakukan sesuatu selama sepuluh minit?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D1[0]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'even'],
            fields: [
              {
                type: 'label',
                label: '2.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "Remembering to do important things?<div class='bm'>Ingat untuk melakukan perkara-perkara penting?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D1[1]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'odd'],
            fields: [
              {
                type: 'label',
                label: '3.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "Analyzing and finding solutions to problems in day-to-day life?<div class='bm'>Menganalisa dan mencari penyelesaian kepada masalah dalam kehidupan seharian?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D1[2]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'even'],
            fields: [
              {
                type: 'label',
                label: '4.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "Learning a new task, for example, learning how to get to a new place?<div class='bm'>Belajar satu tugasan baharu, contohnya, belajar bagaimana untuk pergi ke tempat baharu?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D1[3]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'odd'],
            fields: [
              {
                type: 'label',
                label: '5.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "Generally understanding what people say?<div class='bm'>Secara umum, memahami apa yang dinyatakan orang?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D1[4]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'even'],
            fields: [
              {
                type: 'label',
                label: '6.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "Starting and maintaining a conversation?<div class='bm'>Memulakan dan mengekalkan sebuah perbualan?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D1[5]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
        ],
      },
      d2_schema: {
        groups: [
          {
            styleClasses: ['row', 'odd'],
            fields: [
              {
                type: 'label',
                label: '1.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "Standing for long periods, such as 30 minutes?<div class='bm'>Berdiri untuk jangka masa lama seperti selama 30 minit?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D2[0]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'even'],
            fields: [
              {
                type: 'label',
                label: '2.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "Standing up from sitting down?<div class='bm'>Berdiri selepas duduk?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D2[1]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'odd'],
            fields: [
              {
                type: 'label',
                label: '3.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "Moving around inside your home?<div class='bm'>Bergerak ke sana sini di dalam rumah anda?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D2[2]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'even'],
            fields: [
              {
                type: 'label',
                label: '4.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "Getting out of your home?<div class='bm'>Keluar daripada rumah anda?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D2[3]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'odd'],
            fields: [
              {
                type: 'label',
                label: '5.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "Walking a long distance, such as a kilometer (or equivalent)?<div class='bm'>Berjalan jauh contohnya satu kilometer [atau yang setaraf dengannya]?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D2[4]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
        ],
      },
      d3_schema: {
        groups: [
          {
            styleClasses: ['row', 'odd'],
            fields: [
              {
                type: 'label',
                label: '1.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "Washing your whole body?<div class='bm'>Mencuci seluruh badan anda?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D3[0]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'even'],
            fields: [
              {
                type: 'label',
                label: '2.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "Getting dressed?<div class='bm'>Berpakaian?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D3[1]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'odd'],
            fields: [
              {
                type: 'label',
                label: '3.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "Eating?<div class='bm'>Makan?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D3[2]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'even'],
            fields: [
              {
                type: 'label',
                label: '4.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "Staying by yourself for a few days?<div class='bm'>Tinggal bersendirian untuk beberapa hari?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D3[3]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
        ],
      },
      d4_schema: {
        groups: [
          {
            styleClasses: ['row', 'odd'],
            fields: [
              {
                type: 'label',
                label: '1.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "Dealing with people you do not know?<div class='bm'>Berinteraksi dengan orang yang anda tidak kenali?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D4[0]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'even'],
            fields: [
              {
                type: 'label',
                label: '2.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "Maintaining a friendship?<div class='bm'>Mengekalkan sesebuah persahabatan?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D4[1]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'odd'],
            fields: [
              {
                type: 'label',
                label: '3.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "Getting along with people who are close to you?<div class='bm'>Mengekalkan sesebuah persahabatan?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D4[2]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'even'],
            fields: [
              {
                type: 'label',
                label: '4.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "Making new friends?<div class='bm'>Membuat rakan-rakan baharu?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D4[3]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'even'],
            fields: [
              {
                type: 'label',
                label: '4.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "Sexual activities?<div class='bm'>Aktiviti seksual?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D4[4]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
        ],
      },
      d5_schema: {
        groups: [
          {
            styleClasses: ['row', 'odd'],
            fields: [
              {
                type: 'label',
                label: '1.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "Taking care of your household responsibilities?<div class='bm'>Menjalankan tanggungjawab anda di rumah?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D5[0]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'even'],
            fields: [
              {
                type: 'label',
                label: '2.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "Doing most important household tasks well?<div class='bm'>Menjalankan tugasan yang paling penting di rumah anda dengan baik?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D5[1]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'odd'],
            fields: [
              {
                type: 'label',
                label: '3.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "Getting all of the household work done that you needed to do?<div class='bm'>Menyiapkan semua kerja rumah tangga yang anda perlu lakukan?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D5[2]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'even'],
            fields: [
              {
                type: 'label',
                label: '4.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "Getting your household work done as quickly as needed?<div class='bm'>Menyiapkan semua kerja rumah tangga anda dengan cepat seperti yang diperlukan?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D5[3]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
        ],
      },
      d6_schema: {
        groups: [
          {
            styleClasses: ['row', 'odd'],
            fields: [
              {
                type: 'label',
                label: '1.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "Your day-to-day work/school?<div class='bm'>Kerja/persekolahan harian anda?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D6[0]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'even'],
            fields: [
              {
                type: 'label',
                label: '2.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "Doing your most important work/school tasks well?<div class='bm'>Melakukan kerja/tugasan sekolah anda yang paling penting dengan baik?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D6[1]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'odd'],
            fields: [
              {
                type: 'label',
                label: '3.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "Getting all of the work done that you need to do?<div class='bm'>Menyiapkan semua kerja yang anda perlu lakukan?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D6[2]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'even'],
            fields: [
              {
                type: 'label',
                label: '4.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "Getting your work done as quickly as needed?<div class='bm'>Menyelesaikan kerja anda secepat seperti yang diperlukan?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D6[3]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
        ],
      },
      d7_schema: {
        groups: [
          {
            styleClasses: ['row', 'odd'],
            fields: [
              {
                type: 'label',
                label: '1.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "How much of a problem did you have in joining in community activities(for example, festivities, religious, or other activities) in the same way as anyone else can?<div class='bm'>Berapa banyak masalah yang anda alami dalam menyertai aktiviti-aktiviti komuniti (contohnya, perayaan, keagamaan atau aktiviti lain) dengan cara yang sama seperti orang lain?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D7[0]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'even'],
            fields: [
              {
                type: 'label',
                label: '2.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "How much of a problem did you have because of barriers or hindrances around you?<div class='bm'>Berapa banyak masalah yang anda alami disebabkan oleh halangan atau rintangan dalam dunia di sekeliling anda?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D7[1]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'odd'],
            fields: [
              {
                type: 'label',
                label: '3.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "How much of a problem did you have living with dignity because of the attitudes and actions of others?<div class='bm'>Berapa banyak masalah yang anda alami untuk hidup dengan maruah diri disebabkan sikap dan tindakan orang lain?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D7[2]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'even'],
            fields: [
              {
                type: 'label',
                label: '4.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "How much time did you spend on your health condition or its consequences?<div class='bm'>Berapa banyak anda telah dipengaruhi secara emosi oleh keadaan kesihatan anda?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D7[3]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'odd'],
            fields: [
              {
                type: 'label',
                label: '5.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "How much have you been emotionally affected by your health condition?<div class='bm'>Berapa banyak anda telah dipengaruhi secara emosi oleh keadaan kesihatan anda?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D7[4]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'even'],
            fields: [
              {
                type: 'label',
                label: '6.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "How much has your health been a drain on the financial resources of you or your family?<div class='bm'>Berapa banyak sumber kewangan anda atau keluarga anda telah dihabiskan disebabkan kedaan kesihatan anda?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D7[5]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'odd'],
            fields: [
              {
                type: 'label',
                label: '7.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "How much of a problem did your family have because of your health problems?<div class='bm'>Berapa banyak masalah yang dialami keluarga anda disebabkan masalah-masalah kesihatan anda?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D7[6]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
          {
            styleClasses: ['row', 'even'],
            fields: [
              {
                type: 'label',
                label: '8.',
                styleClasses: 'col-xs',
              },
              {
                type: 'label',
                label: "How much of a problem did you have in doing things by yourself for relaxation or pleasure?<div class='bm'>Berapa banyak masalah yang anda telah alami dalam melakukan perkara-perkara secara sendiri untuk beristirehat atau berseronok?</div>",
                styleClasses: 'col-md',
              },
              {
                type: 'radios',
                model: 'D7[7]',
                values: [
                  { value: 0, name: 1 },
                  { value: 1, name: 2 },
                  { value: 2, name: 3 },
                  { value: 3, name: 4 },
                  { value: 4, name: 5 },
                ],
                required: true,
                validator: 'required',
                styleClasses: 'col-md-auto offset-md-1 psy-display-inline',
              },
            ],
          },
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
    calculateWhodas () {
      var patientId = JSON.parse(localStorage.getItem('ID'))

      var error = this.$refs.whodas7.validate()

      if (error) {
        var sumD1 = this.model.D1.reduce(function (a, b) {
          return a + b
        }, 0)

        var sumD2 = this.model.D2.reduce(function (a, b) {
          return a + b
        }, 0)

        var sumD3 = this.model.D3.reduce(function (a, b) {
          return a + b
        }, 0)

        var sumD4 = this.model.D4.reduce(function (a, b) {
          return a + b
        }, 0)

        var sumD5 = this.model.D5.reduce(function (a, b) {
          return a + b
        }, 0)

        var sumD6 = this.model.D6.reduce(function (a, b) {
          return a + b
        }, 0)

        var sumD7 = this.model.D7.reduce(function (a, b) {
          return a + b
        }, 0)

        var total = sumD1 + sumD2 + sumD3 + sumD4 + sumD5 + sumD6 + sumD7

        var score = total + ' [' + sumD1 + ', ' + sumD2 + ', ' + sumD3 + ', ' + sumD4 + ', ' + sumD5 + ', ' + sumD6 + ', ' + sumD7 + ']'

        this.submitPath = true
        const data = new FormData()
        data.append('score', JSON.stringify(score))
        this.$axios
          .post('http://127.0.0.1:8000/api/addScreening?patientId=' + patientId + '&psyType=4', data)
          .then((response) => {
            this.$router.push({ path: 'psychometric-test-history' })
          })
        this.launchToast('WHODAS 2.0 Completed')
      }
    },
    validateWhodas () {
      var error
      if (this.tabIndex === 1) {
        error = this.$refs.whodas1.validate()
        if (error) {
          this.tabIndex++
          return true
        } else {
          return false
        }
      } else if (this.tabIndex === 2) {
        error = this.$refs.whodas2.validate()
        if (error) {
          this.tabIndex++
          return true
        } else {
          return false
        }
      } else if (this.tabIndex === 3) {
        error = this.$refs.whodas3.validate()
        if (error) {
          this.tabIndex++
          return true
        } else {
          return false
        }
      } else if (this.tabIndex === 4) {
        error = this.$refs.whodas4.validate()
        if (error) {
          this.tabIndex++
          return true
        } else {
          return false
        }
      } else if (this.tabIndex === 5) {
        error = this.$refs.whodas5.validate()
        if (error) {
          this.tabIndex++
          return true
        } else {
          return false
        }
      } else if (this.tabIndex === 6) {
        error = this.$refs.whodas6.validate()
        if (error) {
          this.tabIndex++
          return true
        } else {
          return false
        }
      }
    },
    validateWhodas1 () {
      return this.$refs.whodas1.validate()
    },
    validateWhodas2 () {
      return this.$refs.whodas2.validate()
    },
    validateWhodas3 () {
      return this.$refs.whodas3.validate()
    },
    validateWhodas4 () {
      return this.$refs.whodas4.validate()
    },
    validateWhodas5 () {
      return this.$refs.whodas5.validate()
    },
    validateWhodas6 () {
      return this.$refs.whodas6.validate()
    },
    validateWhodas7 () {
      return this.$refs.whodas7.validate()
    },
    launchToast (text) {
      this.showToast(
        text,
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

<style>
.app-layout__main {
  background: hsl(0, 0%, 91%);
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

ul.va-unordered > li,
.content ul > li {
  padding-left: 0;
}

.center {
  text-align: center;
  margin: auto;
  width: 50%;
}

.odd {
  background-color: rgb(240, 240, 240);
  padding-left: 10px;
  padding-bottom: 20px;
  padding-top: 20px;
}

.even {
  padding-left: 10px;
  padding-bottom: 20px;
  padding-top: 20px;
}

.question {
  font-size: 23px;
  font-weight: 400;
  text-align: center;
}

.question-bm {
  font-style: italic;
  font-size: 20px;
  color: dimgrey;
  text-align: center;
}

.r {
  display: inline-flex;
  width: 100%;
  align-items: center;
}

.num {
  margin-right: 20px;
  text-align: center;
  padding: 6px 12px;
  background: #eeeeee;
  border-radius: 20px;
  border-color: grey;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: bold;
  color: #777777;
}

.bm {
  font-style: italic;
  font-size: small;
  color: dimgrey;
}

.bm-white {
  font-style: italic;
  font-size: small;
  color: white;
}

.psy-display-inline label {
  display: inline !important;
  align-content: center;
  margin-right: 20px;
}

.domain {
  background-color: rgb(146, 145, 145);
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: center;
}

.domain-name-white {
  font-weight: 500;
  color: white;
}

</style>
