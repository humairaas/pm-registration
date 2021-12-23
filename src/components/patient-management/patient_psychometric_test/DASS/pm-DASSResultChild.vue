<template>
  <div class="container" id = "test">
    <h3 class="type-name">{{ name }} <br> <span class="type-name-bm">{{nameBm}}</span></h3>
    <div class = "row">
      <div class = "col-lg-auto mb-1">
        <div id = "scoreBox">
          <p id = "score">{{ score }}</p>
          <h5>SCORE</h5>
          <p id="malaySkor">SKOR</p>
        </div>
      </div>
      <div class = "col">
        <div>
          <div id = "diagBox" :style="{ 'background-color': colour }">
            <h1 id="level">{{ level }}</h1>
            <p id="level-bm">{{ levelBm }}</p>
          </div>
          <div class="progress" id = "scales">
            <div class="progress-bar" id = "empty" role="progressbar" :style="{width: (((score-0.5)/21)*100)+'%'}" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
            <div ref="arrow" class="progress-bar" id = "arrow" role="progressbar" :style="{ 'border-bottom': '16px solid'+colour }" style="width: 2%;" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <div class="progress" id = "meter">
            <div class="progress-bar" id = "minimal" role="progressbar" :style="{width: width[0] +'%'}" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
            <div class="progress-bar" id = "mild" role="progressbar" :style="{width: width[1] +'%'}" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
            <div class="progress-bar" id = "moderate" role="progressbar" :style="{width: width[2] +'%'}" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
            <div class="progress-bar" id = "modSevere" role="progressbar" :style="{width: width[3] +'%'}" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
            <div class="progress-bar" id = "Severe" role="progressbar" :style="{width: width[4] +'%'}" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      </div>

      <div class="col-xl-auto mt-1">
        <table class="table table-sm table-hover">
          <tbody>
            <tr>
              <td id = "minimal"></td>
              <td><span class="engLabel">{{label[0]}}</span><span class="malayLabel"> / {{labelBm[0]}}</span></td>
            </tr>
            <tr>
              <td id = "mild"></td>
              <td><span class="engLabel">{{label[1]}}</span><span class="malayLabel"> / {{labelBm[1]}}</span></td>
            </tr>
            <tr>
              <td id = "moderate"></td>
              <td><span class="engLabel">{{label[2]}}</span><span class="malayLabel"> / {{labelBm[2]}}</span></td>
            </tr>
            <tr>
              <td id = "modSevere"></td>
              <td><span class="engLabel">{{label[3]}}</span><span class="malayLabel"> / {{labelBm[3]}}</span></td>
            </tr>
            <tr>
              <td id = "Severe"></td>
              <td><span class="engLabel">{{label[4]}}</span><span class="malayLabel"> / {{labelBm[4]}}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row  mt-3 mb-3 mx-1 align-items-center justify-content-center">
      <div class="col">
        <p id="descEng">{{ desc }}</p>
        <p id="descBm">{{ descBm }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name', 'nameBm', 'score', 'level', 'levelBm', 'desc', 'descBm', 'colour', 'width', 'label', 'labelBm'],
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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

.type-name {
  text-align: center;
  font-weight: bold;
  background: #f0f0f0;
  border-radius: 13px;
  padding: 1%;
}

.type-name-bm {
  font-size: 15px;
  font-weight: lighter;
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
  padding: 20px 40px;
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
}

.meterText {
  width: 20%;
  float: left;
  text-align: center;
  font-size: 12px;
  color: black;
  line-height: 2;
  vertical-align: top;
}

#minimal {
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

#modSevere {
  background-color: #ee9b4a !important;
}

#Severe {
  background-color: #ee5d4a !important;
  text-align: end;
  padding-right: 10px;
}

#descEng {
  color: #404040;
  text-align: center;
  font-size: medium;
}

#descBm {
  color: grey;
  text-align: center;
  font-style: italic;
  font-size: small;
}

.malayLabel {
  font-style: italic;
  font-size: 8px;
  color: grey;
  margin-bottom: 0;
}

.engLabel {
  font-size: 12px;
  color: black;
  margin-bottom: 0;
}

#printBtn {
  float: right;
  padding: 5px;
}

#printImg {
  width: 30px;
  border-radius: 10;
}

#level-bm {
  font-style: italic;
  font-size: 20px;
  color: white;
  text-align: center;
  margin-bottom: 0;
  padding-bottom: 25px;
}

#level {
  padding: 25px 30px 10px 30px;
}

#malaySkor {
  font-style: italic;
  text-align: center;
  color: white;
  font-size: small;
  margin-bottom: 0;
}

.r {
  display: inline-flex;
  width: 100%;
  align-items: center;
}

.num {
  max-height: 30px;
  margin: 0 10px;
  padding: 15px 12px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.indicator {
  margin: 0 0;
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

  #diagTextNormal {
    font-size: 2vw;
  }
}

@media (max-width: 600px) {
  #diagTextNormal {
    font-size: 3vw;
  }
}

</style>
