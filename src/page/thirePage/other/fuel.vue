<script>
import navs from '../../../components/navBar.vue';
import footers from '../../../components/footer.vue';
import locations from '../../../components/locationBar.vue';
import usageSide from '../../../components/toolsUsage.vue';
import sidePage from '../../../components/sidePage.vue';
import loader from '../../../components/loader.vue';
import dbG from '../../../data/db.json'
import { inject } from 'vue';
export default {
    data (){
        return{
            db:[],
            isShow:false,
            result:null,
            showResult:false,
            fuel:null,
            distance:null,
        }
    },
    setup(){
        const dark = inject("dark")
        const warn = inject("warning")
        return{dark,warn,
        shower (){
            this.warn = true
        }}
    },
    methods:{
        convert(){
            if(this.fuel != null && this.fuel != "" && this.distance != null && this.distance != ""){
                this.result = (this.fuel * 100 / this.distance).toFixed(2)
                this.showResult = true
            }else{
                this.shower()
            }
        },
        keyCheck(e){
            if(e.key == 'Enter')
                this.convert()
            else
                this.showResult = false
        },
    },
    created (){
        document.title='تولبو | محاسبه مصرف بنزین خودرو '
        this.db.push(dbG.dataBox[8].item[1])
        this.db.push(dbG.dataBox[8].item[2])
        this.db.push(dbG.dataBox[8].item[3])
        setTimeout(() => {
            this.isShow = true
        }, 100);
    },
    components:{navs,footers,locations,usageSide,sidePage,loader,dbG}
}
</script>
<template>
    <loader v-show="!isShow"/>
    <div v-show="isShow">
        <navs/>
        <locations title="محاسبه مصرف بنزین خودرو" PN="سایر" PNR="/other"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="[(!showResult ? 'HTool' : ''),(dark ? 'tool_D' : '')]">
                <div class="title_tool">محاسبه مصرف بنزین خودرو</div>
                <div class="inputs">
                    <div>
                        <div>مقدار بنزین (لیتر):</div>
                        <input type="text" placeholder="به طور مثال : 40" v-model="fuel" @keydown="keyCheck">
                    </div>
                    <div>
                        <div>مسافت طی شده (کیلومتر):</div>
                        <input type="text" placeholder="به طور مثال : 500" v-model="distance" @keydown="keyCheck">
                    </div>
                </div>
                <button class="bn632-hover" @click="convert"><span class="fontIcon">&#xe906;</span>محاسبه </button>
                <div class="result" :class="dark ? 'Result_D':''" v-if="showResult">مصرف بنزین خودرو شما با میانگین سرعت طی شده <span style="color:#3b82f6;">{{result}} لیتر </span>در هر ۱۰۰ کیلومتر است.</div>
            </div>
            <sidePage/>
            <usageSide :db="db"/>
        </div>
        </div>
        <footers/>
    </div>
</template>
<style scoped>
input{
    width: 95%;
}
.HTool{
    height: 200px;
}
.inputs{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap:10px;
    padding: 10px;
}
.bn632-hover{
    margin: 10px auto ;
}
.result{
    border:1px solid rgba(0, 0, 0, 0.304);
    background-color: #f1f1f1;
    margin: 38px 50px;
    border-radius:5px;
    padding: 10px;
}
@media screen and (max-width:1040px) {
    .HTool{
        height: 190px;
    }    
}
@media screen and (max-width:940px) {
    .HTool{
        height: 185px;
    }    
}
@media screen and (max-width:840px) {
    .HTool{
        height: 180px;
    }    
}
@media screen and (max-width:640px) {
    .result{
        margin: 25px 30px;
    }
}
@media screen and (max-width:540px) {
    .HTool{
        height: 165px;
    } 
}
@media screen and (max-width:440px) {
    .HTool{
        height: 160px;
    }   
}
</style>