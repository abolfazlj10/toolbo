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
            percent:null,
            number:null,
            decrease:null,
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
            if(this.percent != null && this.number != null && this.percent != "" && this.number != "" ){
                this.showResult = true                
                this.result = (this.percent/100) * this.number
                this.decrease = Number(this.number) - this.result                
                this.result = Number('-' + this.result)                
                this.result = this.result.toLocaleString('en-US')
                this.decrease = this.decrease.toLocaleString('en-US')
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
        document.title='تولبو | محاسبه کاهش درصد  '
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
        <locations title="محاسبه کاهش درصد" PN="اعداد" PNR="/numbers"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="[(!showResult ? 'HTool' : ''),(dark ? 'tool_D' : '')]">
                <div class="title_tool">محاسبه کاهش درصد </div>
                <div class="inputs">
                    <div>
                        <div>درصد کاهش%:</div>
                        <input type="text" placeholder="به طور مثال : 2" v-model="percent" @keydown="keyCheck">
                    </div>
                    <div>
                        <div>عدد:</div>
                        <input type="text" placeholder="به طور مثال : 3" v-model="number" @keydown="keyCheck">
                    </div>
                </div>
                <button class="bn632-hover" @click="convert"><span class="fontIcon">&#xe906;</span>محاسبه </button>
                <div class="result" :class="dark ? 'Result_D':''" v-show="showResult">
                    <div class="title_tool">نتیجه</div>
                    <div class="textResult">
                        <div>با {{percent}}% کاهش {{number}} می شود : <span class="colorC">{{decrease}}</span> </div>
                        <div>میزان کاهش : <span class="colorC">{{result}}</span></div>
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