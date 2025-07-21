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
            height:null,
            weight:null,
            age:null,
            resultWoman:null,
            resultMan:null,
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
            if(this.weight != null && this.weight != "" && this.height != null && this.height != ""&& this.age != null && this.age != ""){                
                this.resultMan = 66.47 + (13.75 * this.weight) + (5.003 * this.height) - (6.755 * this.age)
                this.resultMan = Math.floor(this.resultMan)
                this.resultWoman = 655.1 + (9.563 * this.weight) + (1.850 * this.height) - (4.676 * this.age)
                this.resultWoman = Math.floor(this.resultWoman)
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
        document.title='تولبو | محاسبه BMR '
        this.db.push(dbG.dataBox[4].item[0])
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
        <locations title=" محاسبه BMR" PN="سلامت" PNR="/health"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="[(!showResult ? 'HTool' : ''),(dark ? 'tool_D' : '')]">
                <div class="title_tool"> محاسبه BMR</div>
                <div class="inputs">
                    <div class="fiild">
                        <div>قد(سانتی متر):</div>
                        <input type="text" placeholder="به طور مثال : 180" v-model="height" @keydown="keyCheck">
                    </div>
                    <div class="fiild">
                        <div>وزن(کیلو گرم):</div>
                        <input type="text" placeholder="به طور مثال : 80" v-model="weight" @keydown="keyCheck">
                    </div>
                    <div class="fiild">
                        <div>سن:</div>
                        <input type="text" placeholder="به طور مثال : 25" v-model="age" @keydown="keyCheck">
                    </div>
                </div>
                <button class="bn632-hover" @click="convert"><span class="fontIcon">&#xe906;</span>محاسبه </button>
                <div class="result" :class="dark ? 'Result_D':''" v-if="showResult">
                    <div class="textResult">
                        <div class="filldResult">
                            اگر شما مرد هستید: <span class="colorC">{{resultMan}}</span>  کالری بدن شما در ۲۴ ساعت نیاز دارد.
                        </div>
                        <div class="filldResult">
                            اگر شما زن هستید: <span class="colorC">{{resultWoman}}</span>  کالری بدن شما در ۲۴ ساعت نیاز دارد.
                        </div>
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
    grid-template-columns: 1fr 1fr 1fr;
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
    padding: 10px;
}
.colorC{
    color:#3b82f6 !important;
}
.filldResult{
    padding: 5px 0;
}
.filldResult:last-child{
    border-top:1px solid rgba(0, 0, 0, 0.208);
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