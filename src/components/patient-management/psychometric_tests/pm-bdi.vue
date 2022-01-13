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
            <div class="text-center"><h4 class="mt-5 mb-5 text-dark">BECK DEPRESSION INVENTORY (BDI)</h4></div>

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
      submitPath: false,

    }
  },
  mounted () {
    window.onbeforeunload = function () {
      return 'Data will be lost if you leave the page, are you sure?'
    }
  },
  methods: {
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
</style>
