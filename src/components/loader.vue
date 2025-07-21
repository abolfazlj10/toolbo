<script></script>
<template>
  <div class="container">
    <span class="loader"></span>
    <div class="B"><router-link to="/">TOOLBO</router-link></div>
    <div class="AT AT1"></div><div class="AT AT2"></div><div class="AT AT3"></div><div class="AT AT4"></div>
  </div>
</template>
<style scoped>
.container{
  position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 25px;
    background: #1B2430;
    background-image: linear-gradient(50deg, #11151C,#1B2430);
    padding: 30px 50px;
    border-radius: 4px;
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    overflow: hidden;
}
.B{ /* brand */
    color: #ff780a;
    text-align:right;
    font-family: 'Titan One', cursive;
    transition: .3s all cubic-bezier(.4,0,.2,1);
    font-size:40px;
    z-index: 5;
}

.loader {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  background: linear-gradient(0deg, rgba(255, 61, 0, 0.2) 33%, #ff3d00 100%);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  z-index: 5;
}
.loader::after {
  content: '';  
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #263238;
}
@keyframes rotation {
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg)}
} 
.AT{ /* All Top */
  position: absolute;
  background-color: #fff;
  box-shadow: 0px 0px 9px 0px #fff;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  bottom: -10%;
}
.AT1{
  right: 50%;
  animation: ATN ease-out 1s .2s infinite;
}
.AT2{
  animation: ATN ease-out 1s .3s infinite;
  right: 40%;
}
.AT3{
  right: 30%;
  animation: ATN ease-out 1s .4s infinite;
}
.AT4{
  right: 60%;
  animation: ATN ease-out 1s .1s infinite;
}
@keyframes ATN {
  from{
    bottom:-0%;
  }  
  to{
    bottom:105%;
  }  
}
</style>