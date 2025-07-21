<script>
import icon from './components/iconCover.vue'
import { provide, ref } from "vue";
export default{
  components:{icon},
  setup() {
    const favourite = JSON.parse(localStorage.getItem("favourite"))
    var arrFAV;
    if(favourite == null)
      arrFAV = ref([])
    else
      arrFAV = favourite
    provide("arrFAV",arrFAV)

    const mode = JSON.parse(localStorage.getItem("dark")) 
    var dark;
    if(mode == null)
      dark = ref(false);
    else
      dark = ref(mode);

    provide("dark", dark);

    const isShow = ref(false)
    provide("warning",isShow)

    return {
      dark,
      arrFAV,
      isShow
    };
  },
  data(){
    return{
      dis:false,
    }
  },
  methods:{
    checkMode(){
      if(this.dark){
        localStorage.setItem('dark',this.dark)
        document.body.classList.add('body_D')
      }else{
        localStorage.setItem('dark',this.dark)
        document.body.classList.remove('body_D')
      }
    }
  },
  watch:{
    dark(){
      this.checkMode()
    },
    isShow(a){
      if(a){
          this.dis = true
          setTimeout(() => {
              this.isShow = false
          }, 2000);
      }else{
          setTimeout(() => {
              this.dis = false
          }, 800);
      }
    }
  },
  created(){
    this.checkMode()
  }
}
</script>
<template>
    <div class='at-container'>
      <div :class="isShow?'at-item':'at-items'" v-show="dis">
        <div>فیلد ها را کامل کنید. :)</div>
        <div class="borderNotif"></div>
      </div>      
    </div>
  <icon/>
  <router-view/>
</template>
<style>
@import '../src/assets/base.css';
div.at-container {
  position: fixed;
  top:1%;
  right: 1%;
  font-size: 14px;
  z-index: 5;
}
.at-item {
  position: relative;
  width: 150px; height: 40px; 
  background-color:#f4485a;color:#fff;border-radius: 5px;
  display: flex; 
  justify-content: center;
  align-items:center;    
  flex-direction: column;
  animation: fade-in-right 1s ease 0s 1 normal none;
}
.borderNotif{
  position:absolute;
  width: 100%;
  height: 5px;
  bottom: 0;
  right: 0;
  border-bottom-right-radius: 5px;
  background-color: #fff;
  animation: borderNotif 3s ease 0s 1 normal none;
}
@keyframes fade-in-right {
        
    0% {
        transform:translateX(50px);
        opacity:0;
    }
    100% {
        transform:translateX(0);
        opacity:1;
    }
}
.at-items {
  position: relative;
  width: 150px; height: 40px; 
  background-color:#f4485a;color:#fff;border-radius: 5px;
  display: flex; 
  justify-content: center;
  align-items:center;    
  flex-direction: column;
  animation: fade-out-right 1s ease 0s 1 normal none;
}
@keyframes fade-out-right {
    0% {
        transform:translateX(0);
        opacity:1;
    }
    100% {
        transform:translateX(50px);
        opacity:0;
    }
}
@keyframes borderNotif {
  from{
    width: 100%
  }
  to{
    width: 0%;
  }
}
@media screen and (max-width:740px){
  div.at-container{
    font-size: 12px;
  }
  .at-items{
    width: 134px;
    height: 35px;
  }
  .at-item{
    width: 134px;
    height: 35px;
  }
}
@media screen and (max-width:540px){
  div.at-container{
    font-size: 10px;
  }
  .at-items{
    width: 112px;
    height: 30px;
  }
  .at-item{
    width: 112px;
    height: 30px;
  }
}
</style>