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
            result:null,
            num:null,
            powNum:null,
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
            if(this.num != null && this.powNum != null && this.num != "" && this.powNum != ""){
                this.showResult = true
                this.result = Math.pow(this.num , this.powNum)
            }else{
                this.shower()
            }

        },
        keyCheck(e){
            if(e.key == 'Enter')
                this.convert()
            else{
                this.result = null   
                this.showResult = false
            }
        },
    },
    created (){
        document.title='تولبو | محاسبه توان '
        this.db.push(dbG.dataBox[5].item[2])
        this.db.push(dbG.dataBox[5].item[4])
        this.db.push(dbG.dataBox[5].item[5])

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
        <locations title="محاسبه توان" PN="ریاضی" PNR="/math"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="[(!showResult ? 'HTool' : ''),(dark ? 'tool_D' : '')]">
                <div class="title_tool">محاسبه توان</div>
                <div class="inputs">
                    <div>
                        <div>عدد:</div>
                        <input type="text" v-model="num" @keydown="keyCheck" placeholder="به طور مثال : 2">
                    </div>
                    <div>
                        <div>توان:</div>
                        <input type="text" v-model="powNum" @keydown="keyCheck" placeholder="به طور مثال : 3">
                    </div>
                    <div>
                        <div>نتیجه:</div>
                        <input disabled type="text" v-model="result" @keydown="keyCheck" placeholder="به طور مثال : 8">
                    </div>
                </div>
                <button class="bn632-hover" @click="convert"><span class="fontIcon">&#xe906;</span>محاسبه </button>
                <div class="result" :class="dark ? 'Result_D':''" v-if="showResult">
                    <div class="title_tool">نتیجه</div>
                    <div class="textResult">{{ result }} = <span>{{num}}<sup>{{powNum}}</sup></span></div>
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
    display: grid;
    grid-template-columns: repeat(3,1fr);
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
    padding: 20px;
    color:#3b82f6 !important;
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
@media screen and (max-width:540px) {
    .HTool{
        height: 165px;
    }    
    .textResult{
        padding: 13px;
        font-size: 19px;
    }
    .result{
        margin-bottom: 15px;
    }
}
@media screen and (max-width:440px) {
    .HTool{
        height: 160px;
    }    
    .textResult{
        padding: 12px;
        font-size: 17px;
    }
}

</style>