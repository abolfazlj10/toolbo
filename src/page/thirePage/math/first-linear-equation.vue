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
            x:null,
            y:null,
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
            if(this.x != null && this.y != null && this.x != "" && this.y != ""){
                this.showResult = true
                if(this.y < 0){
                    this.result = this.y / this.x
                    this.result = `-${this.result}`
                }
                else
                    this.result = `-${this.y}` / this.x
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
        document.title='تولبو | محاسبه معادله درجه یک'
        this.db.push(dbG.dataBox[5].item[1])
        this.db.push(dbG.dataBox[5].item[2])
        this.db.push(dbG.dataBox[5].item[3])

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
        <locations title="محاسبه معادله درجه یک" PN="ریاضی" PNR="/math"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="[(!showResult ? 'HTool' : ''),(dark ? 'tool_D' : '')]">
                <div class="title_tool">محاسبه معادله درجه یک</div>
                <div class="inputs">
                    <input type="text" v-model="x" @keydown="keyCheck">
                    <div>+X</div>
                    <input type="text" v-model="y" @keydown="keyCheck">
                    <div>0 =</div>
                </div>
                <button class="bn632-hover" @click="convert"><span class="fontIcon">&#xe906;</span>محاسبه </button>
                <div class="result" :class="dark ? 'Result_D':''" v-if="showResult">
                    <div class="title_tool">نتیجه</div>
                    <div class="textResult">X = {{result}}</div>
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
.HTool{
    height: 200px;
    grid-template-rows: 1fr 5fr 1fr !important;
}
.tool{
    display: grid;
    grid-template-rows: 0.1fr 1fr 0.5fr 2.5fr;
}
.inputs{
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    align-items:center;
    gap:10px;
    padding:10px;
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
@media screen and (max-width:740px) {
    .tool{
        grid-template-rows: 0.1fr 1fr 0.1fr 1.5fr;
    }
}
@media screen and (max-width:640px) {
    .inputs{
        gap: 7px;
        padding: 10px 0;
    }
    .tool{
        grid-template-rows: 0.1fr 1fr 0.1fr 2fr;
    }
}
@media screen and (max-width:540px) {
    input{
        width: 34%;
    }
    .textResult{
        padding: 10px;
    }
    .result{
        font-size: 17px;
    }
}
</style>