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
            result:[],
            num:null
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
            this.result = []
            if(this.num != null & this.num != ""){
                this.showResult = true
                for (let i = 1; i <= this.num; i++) {
                    var fac = String(this.num / i)
                    if(!fac.includes('.'))
                        this.result.push(fac)
                }
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
        document.title='تولبو | محاسبه فاکتور'
        this.db.push(dbG.dataBox[5].item[1])
        this.db.push(dbG.dataBox[5].item[3])
        this.db.push(dbG.dataBox[5].item[4])

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
        <locations title="محاسبه فاکتور" PN="ریاضی" PNR="/math"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="[(!showResult ? 'HTool' : ''),(dark ? 'tool_D' : '')]">
                <div class="title_tool">محاسبه فاکتور</div>
                <div class="inputs">
                    <div>
                        <div>عدد:</div>
                        <input type="text" placeholder="به طور مثال : 100" @keydown="keyCheck" v-model="num">
                    </div>
                </div>
                <button class="bn632-hover" @click="convert"><span class="fontIcon">&#xe906;</span>محاسبه </button>
                <div class="result" :class="dark ? 'Result_D':''" v-if="showResult">
                    <div class="title_tool">نتیجه</div>
                    <div class="textResult">نتیجه فاکتور : <span class="colorC" v-for="item in result">{{item}}<span v-if="item != 1"> ,</span></span> </div>
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
    width: 300px;
}
.HTool{
    height: 200px;
}
.inputs{
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    align-items:center;
    gap:10px;
    padding:10px;
}
.bn632-hover {
    margin: 17px auto;
}
.result{
    background-color: #f1f1f1;
    margin: 30px 20px;
    border-radius:9px;
    border:1px solid rgba(0, 0, 0, 0.291);
    font-size: 20px;
}
.textResult{
    padding: 10px;
}
.colorC{
    color:#3b82f6 !important;
}
@media screen and (max-width:1040px){
    .inputs input{
        width: 250px;
    }  
    .HTool{
        height: 180px;
    }
    .result{
        font-size: 18px;
    }
}
@media screen and (max-width:740px){
    .HTool{
        height: 170px;
    }
}
@media screen and (max-width:540px){
    .inputs input{
        width: 220px;
    }  
    .HTool{
        height: 160px;
    }
    .result{
        font-size: 17px;
    }
}
@media screen and (max-width:440px){
    .inputs input{
        width: 220px;
    }  
    .HTool{
        height: 155px;
    }
    .result{
        font-size: 16px;
    }
}
</style>