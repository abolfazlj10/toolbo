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
            numOne:null,
            numTwo:null,
            change:null,
            showResult:false,
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
        convert (){
            if(this.numOne != null && this.numTwo != null && this.numOne != "" && this.numTwo != "" ){
                this.showResult = true
                this.result = Number(this.numTwo - this.numOne)/this.numOne*100
                this.change = Number(this.numTwo)-Number(this.numOne)
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
        document.title='تولبو | محاسبه تغییر درصد '
        this.db.push(dbG.dataBox[2].item[1])
        this.db.push(dbG.dataBox[2].item[2])
        this.db.push(dbG.dataBox[2].item[3])

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
        <locations title="محاسبه تغییر درصد" PN="اعداد" PNR="/numbers"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="[(!showResult ? 'HTool' : ''),(dark ? 'tool_D' : '')]">
                <div class="title_tool">محاسبه تغییر درصد</div>
                <div class="inputs">
                    <div>
                        <div>عدد اول:</div>
                        <input type="text" placeholder="به طور مثال : 2" v-model="numOne" @keydown="keyCheck">
                    </div>
                    <div>
                        <div>عدد دوم:</div>
                        <input type="text" placeholder="به طور مثال : 3" v-model="numTwo" @keydown="keyCheck">
                    </div>
                </div>
                <button class="bn632-hover" @click="convert"><span class="fontIcon">&#xe906;</span>محاسبه </button>
                <div class="result" :class="dark ? 'Result_D':''" v-if="showResult">
                    <div class="title_tool">نتیجه</div>
                    <div class="textResult">
                        <div>{{numOne.toLocaleString('en-US')}} با {{result}}% افزایش می شود : <span class="colorC">{{numTwo.toLocaleString('en-US')}}</span> </div>
                        <div>میزان تغییر :  <span class="colorC">{{change.toLocaleString('en-US')}}</span></div>
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
input{
    width: 100%;
}
.Htool{
    height: 220px;
}
.inputs{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap:20px;
    padding:20px;
    text-align:right;
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
</style>