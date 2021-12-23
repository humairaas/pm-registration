<template>
  <div class="container" id = "test">
    <h3>{{ name }}</h3>
    <div class = "row">
      <div class = "col-lg-auto mb-1">
        <div id = "scoreBox">
          <p id = "score">{{ score }}</p>
          <h5>SCORE</h5>
        </div>
      </div>
      <div class = "col">
        <div>
          <div id = "diagBox" :style="{ 'background-color': colour }">
            <h1>{{ level }}</h1>
          </div>
          <div class="progress" id = "scales">
            <div class="progress-bar" id = "empty" role="progressbar" :style="{width: (score-3)+'%'}" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
            <div ref="arrow" class="progress-bar" id = "arrow" role="progressbar" :style="{ 'border-bottom': '16px solid'+colour }" style="width: 2%;" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <div class="progress" id = "meter">
            <div class="progress-bar" id = "normal" role="progressbar" :style="{width: width[0] +'%'}" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
            <div class="progress-bar" id = "moderate" role="progressbar" :style="{width: width[1] +'%'}" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
            <div class="progress-bar" id = "high" role="progressbar" :style="{width: width[2] +'%'}" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
            <div class="progress-bar" id = "Severe" role="progressbar" :style="{width: width[3] +'%'}" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      </div>
      <div class="col-xl-auto mt-3">
        <table class="table table-sm table-hover">
          <tbody>
            <tr>
              <td id = "normal"></td>
              <td>{{label[0]}}</td>
            </tr>
            <tr>
              <td id = "moderate"></td>
              <td>{{label[1]}}</td>
            </tr>
            <tr>
              <td id = "high"></td>
              <td>{{label[2]}}</td>
            </tr>
            <tr>
              <td id = "Severe"></td>
              <td>{{label[3]}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="row  mt-3 mb-3 mx-1 align-items-center justify-content-center">
      <div class="col">
        <p :id="text">{{ desc }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name', 'score', 'level', 'desc', 'colour', 'text', 'width', 'label'],
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">

#score {
  text-align: center;
  font-weight: bold;
  font-size: 90px;
  margin: 0;
  color: white;
}

h1 {
  text-align: center;
  font-weight: bold;
  color: white;
  padding: 45px 30px 45px 30px;
  margin-bottom: 0;
}

h5 {
  text-align: center;
  font-weight: bold;
  color: white;
}

h3 {
  text-align: center;
  font-weight: bold;
  background: #f0f0f0;
  border-radius: 5px;
  padding: 1%;
}

#test {
  box-shadow: 0 10px 15px #6b6b6b9c;
  padding: 40px 40px 3px 40px;
  border-radius: 20px;
  margin-bottom: 50px;
  width: 70%;
}

#scoreBox {
  background-color: rgb(105, 105, 105);
  border-radius: 10px;
  line-height: 1;
  padding: 30px 40px 30px 40px;
}

#diagBox {
  background-color: #cdee4a;
  border-radius: 10px;
  margin-bottom: 0;
}

/* Score meter */
#empty {
  background-color: transparent;
  color: black;
  word-wrap: normal;
}

#scales {
  background-color: transparent;
  margin: 0 auto;
  width: 96%;
  border-radius: 0;
}

#arrow {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 16px solid #cdee4a;
  background-color: transparent;
}

#meter {
  height: 25px;
  border-radius: 20px;
  margin-left: 2%;
  margin-right: 2%;
}

.meterText {
  float: left;
  text-align: center;
  font-size: 12px;
  color: black;
  line-height: 2;
  vertical-align: top;
}

.meterTextHigh {
  padding-left: 10px;
}

#normal {
  background-color: #cdee4a !important;
  text-align: start;
  padding-left: 10px;
}

#mild {
  background-color: #eee84a !important;
}

#moderate {
  background-color: #eed14a !important;
}

#high {
  background-color: #ee9b4a !important;
}

#Severe {
  background-color: #ee5d4a !important;
  text-align: end;
  padding-right: 10px;
}

#diagTextNormal {
  text-align: center;
  font-size: 20px;
  color: black;
}

#diagTextWarn {
  text-align: center;
  font-size: 20px;
  color: red;
  font-weight: bold;
}

#printBtn {
  float: right;
  padding: 5px;
}

#printImg {
  width: 30px;
  border-radius: 10;
}

@media (max-width: 760px) {
  #test {
    padding: 20px 20px 3px 20px;
    border-radius: 20px;
    margin-bottom: 20px;
    width: 90%;
  }

  #diagBox {
    background-color: #cdee4a;
    border-radius: 10px;
    margin-bottom: 0;
    margin-top: 20px;
  }

  .meterText {
    font-size: 10px;
    margin-top: 5px;
    line-height: 1.2;
  }

  #score {
    text-align: center;
    font-weight: bold;
    font-size: 60px;
    margin: 0;
    color: white;
  }
}
</style>
