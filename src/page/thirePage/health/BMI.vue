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
            showResult:false,
            weight:null,
            height:null,
            result:null,
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
            if(this.weight != null && this.weight != "" && this.height != null && this.height != ""){
                this.result = this.weight / ((this.height / 100) * (this.height / 100))
                this.result = String(this.result)
                let searchDot = this.result.includes('.')
                if(searchDot){
                    this.result = Number(this.result)
                    this.result = this.result.toFixed(2)
                }

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
        }
    },
    created (){
        document.title='تولبو | محاسبه BMI '
        this.db.push(dbG.dataBox[4].item[1])
        this.db.push(dbG.dataBox[8].item[1])
        this.db.push(dbG.dataBox[3].item[0])

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
        <locations title="محاسبه BMI" PN="سلامت" PNR="/health"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="[(!showResult ? 'HTool' : ''),(dark ? 'tool_D' : '')]">
                <div class="title_tool">محاسبه BMI</div>
                <div class="inputs">
                    <div class="fiild">
                        <div>قد(سانتی متر):</div>
                        <input type="text" placeholder="به طور مثال : 180" v-model="height" @keydown="keyCheck">
                    </div>
                    <div class="fiild">
                        <div>وزن(کیلو گرم):</div>
                        <input type="text" placeholder="به طور مثال : 80" v-model="weight" @keydown="keyCheck">
                    </div>
                </div>
                <button class="bn632-hover" @click="convert"><span class="fontIcon">&#xe906;</span>محاسبه </button>
                <div class="result" :class="dark ? 'Result_D':''" v-if="showResult">
                    <div class="textResult">BMI شاخص توده بدنی شما <span class="colorC">{{result}} </span> ،
                        <span v-if="result <= 16.5">شما کمبود وزن شدید دارید </span>
                        <span v-else-if="result > 16.5 && result < 18.5">شما کمبود وزن دارید </span>
                        <span v-else-if="result > 18.5 && result < 25">وزن شما نرمال است</span>
                        <span v-else-if="result > 25 && result < 30">شما اضافه وزن دارید</span>
                        <span v-else-if="result > 30 && result < 35">شما چاقی کلاس 1 دارید</span>
                        <span v-else-if="result > 35 && result < 40">شما چاقی کلاس 2 دارید</span>
                        <span v-else-if="result > 40">شما چاقی کلاس 3 دارید</span>
                        .
                    </div>
                </div>
            </div>
            <sidePage/>
            <usageSide :db="db"/>
            </div>
        </div>
        <footers/>
    </div>
</template>
<style scoped>
.inputs input{
    width: 95%;
}
.HTool{
    height: 200px;
}
.inputs{
    display:grid;
    grid-template-columns: 1fr 1fr;
    gap:10px;
    padding:10px;
}
.bn632-hover{
    margin: 11px auto;
}
.fiild{
    text-align: right;
}
.result{
    background-color: #f1f1f1;
    margin: 30px 20px;
    border-radius:9px;
    border:1px solid rgba(0, 0, 0, 0.291);
}
.textResult{
    padding: 10px;
}
.colorC{
    color:#3b82f6 !important;
}

@media screen and (max-width:1040px) {
    .HTool{
        height: 180px;
    }    
}
@media screen and (max-width:740px) {
    .HTool{
        height: 170px;
    }    
}
@media screen and (max-width:540px) {
    .HTool{
        height: 160px;
    }    
}
@media screen and (max-width:440px) {
    .HTool{
        height: 150px;
    }    
}



</style>