<template>
  <div class="about">
    <h1>Strona nie została jeszcze aktywowana</h1>
    <p class="zoom-area"><b>Przepraszamy</b> wróć do nas za jakiś czas</p>
    <section class="error-container">
      <span>S</span>
      <span>o</span>
      <span>o</span>
      <span>n</span>
    </section>
    <div class="link-container">
      <router-link to="/informatyka"> Wróc do wyników </router-link>
    </div>
  </div>
</template>

<style lang='css'>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,600,700");
@import url("https://fonts.googleapis.com/css?family=Catamaran:400,800");
.link-container a {
  text-decoration: none;
  color: black;
}
.error-container {
  text-align: center;
  font-size: 180px;
  font-family: "Catamaran", sans-serif;
  font-weight: 800;
  margin: 20px 15px;
}
.error-container > span {
  display: inline-block;
  line-height: 0.7;
  position: relative;
  color: #ffb485;
}
.error-container > span {
  display: inline-block;
  position: relative;
  vertical-align: middle;
}
.error-container > span:nth-of-type(1) {
  color: #d1f2a5;
  animation: colordancing 4s infinite;
}
.error-container > span:nth-of-type(4) {
  color: #d1f2a5;
  animation: colordancing 4s infinite;
}
.error-container > span:nth-of-type(3) {
  color: #f56991;
  animation: colordancing2 4s infinite;
}
.error-container > span:nth-of-type(2) {
  color: #f56991;
  animation: colordancing2 4s infinite;
}

.screen-reader-text {
  position: absolute;
  top: -9999em;
  left: -9999em;
}
@keyframes shadowsdancing {
  0% {
    box-shadow: inset 30px 0 0 rgba(209, 242, 165, 0.4),
      inset 0 30px 0 rgba(239, 250, 180, 0.4),
      inset -30px 0 0 rgba(255, 196, 140, 0.4),
      inset 0 -30px 0 rgba(245, 105, 145, 0.4);
  }
  25% {
    box-shadow: inset 30px 0 0 rgba(245, 105, 145, 0.4),
      inset 0 30px 0 rgba(209, 242, 165, 0.4),
      inset -30px 0 0 rgba(239, 250, 180, 0.4),
      inset 0 -30px 0 rgba(255, 196, 140, 0.4);
  }
  50% {
    box-shadow: inset 30px 0 0 rgba(255, 196, 140, 0.4),
      inset 0 30px 0 rgba(245, 105, 145, 0.4),
      inset -30px 0 0 rgba(209, 242, 165, 0.4),
      inset 0 -30px 0 rgba(239, 250, 180, 0.4);
  }
  75% {
    box-shadow: inset 30px 0 0 rgba(239, 250, 180, 0.4),
      inset 0 30px 0 rgba(255, 196, 140, 0.4),
      inset -30px 0 0 rgba(245, 105, 145, 0.4),
      inset 0 -30px 0 rgba(209, 242, 165, 0.4);
  }
  100% {
    box-shadow: inset 30px 0 0 rgba(209, 242, 165, 0.4),
      inset 0 30px 0 rgba(239, 250, 180, 0.4),
      inset -30px 0 0 rgba(255, 196, 140, 0.4),
      inset 0 -30px 0 rgba(245, 105, 145, 0.4);
  }
}
@keyframes colordancing {
  0% {
    color: #d1f2a5;
  }
  25% {
    color: #f56991;
  }
  50% {
    color: #ffc48c;
  }
  75% {
    color: #effab4;
  }
  100% {
    color: #d1f2a5;
  }
}
@keyframes colordancing2 {
  0% {
    color: #ffc48c;
  }
  25% {
    color: #effab4;
  }
  50% {
    color: #d1f2a5;
  }
  75% {
    color: #f56991;
  }
  100% {
    color: #ffc48c;
  }
}

/* demo stuff */
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
body {
  background-color: #416475;
  margin-bottom: 50px;
}
html,
button,
input,
select,
textarea {
  font-family: "Montserrat", Helvetica, sans-serif;
  color: #92a4ad;
}
h1 {
  text-align: center;
  margin: 30px 15px;
}
.zoom-area {
  max-width: 490px;
  margin: 30px auto 30px;
  font-size: 19px;
  text-align: center;
}
.link-container {
  text-align: center;
}
a.more-link {
  text-transform: uppercase;
  font-size: 13px;
  background-color: #92a4ad;
  padding: 10px 15px;
  border-radius: 0;
  color: #416475;
  display: inline-block;
  margin-right: 5px;
  margin-bottom: 5px;
  line-height: 1.5;
  text-decoration: none;
  margin-top: 50px;
  letter-spacing: 1px;
}
</style>
