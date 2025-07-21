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
            num:null,
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
            if(this.num != null && this.num != "" ){
                this.showResult = true
                this.result = Num2persian(this.num)
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
        document.title='تولبو | تبدیل اعداد به حروف فارسی '
        this.db.push(dbG.dataBox[2].item[5])
        this.db.push(dbG.dataBox[2].item[6])
        this.db.push(dbG.dataBox[2].item[8])
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
        <locations title="تبدیل اعداد به حروف فارسی" PN="اعداد" PNR="/numbers"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="[(!showResult ? 'HTool' : ''),(dark ? 'tool_D' : '')]">
                <div class="title_tool">تبدیل اعداد به حروف فارسی</div>
                <div class="inputs">
                    <div>عدد :</div>
                    <input type="text" v-model="num" placeholder="به طور مثال : 123" @keydown="keyCheck">
                </div>
                <button class="bn632-hover" @click="convert"><span class="fontIcon">&#xe906;</span>محاسبه </button>
                <div class="result" :class="dark ? 'Result_D':''" v-if="showResult">
                    <div class="textResult">{{result}}</div>
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
    width: 30%;
}
.Htool{
    height: 220px;
}
.inputs{
    padding: 20px;
    text-align: right;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.result{
    background-color: #f1f1f1;
    margin: 30px 20px;
    border-radius:9px;
    border:1px solid rgba(0, 0, 0, 0.291);
}
.textResult{
    padding: 10px;
    color:#3b82f6 !important;
}
</style>