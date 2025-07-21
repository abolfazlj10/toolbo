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
            num1:null,
            num2:null,
            num3:null,
            num4:null,
            num5:null,
            num6:null,
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
            this.num1 = this.num1 == null || this.num1 == "" ? this.num1 = null : this.num1 = Number(this.num1)
            this.num2 = this.num2 == null || this.num2 == "" ? this.num2 = null : this.num2 = Number(this.num2)
            this.num3 = this.num3 == null || this.num3 == "" ? this.num3 = null : this.num3 = Number(this.num3)
            this.num4 = this.num4 == null || this.num4 == "" ? this.num4 = null : this.num4 = Number(this.num4)
            this.num5 = this.num5 == null || this.num5 == "" ? this.num5 = null : this.num5 = Number(this.num5)
            this.num6 = this.num6 == null || this.num6 == "" ? this.num6 = null : this.num6 = Number(this.num6)

            if(this.num1 != null || this.num2 != null || this.num3 != null || this.num4 != null || this.num5 != null || this.num6 != null){
                this.showResult = true

                var numDivison = 0

                if(this.num1 != null)
                    numDivison++
                if(this.num2 != null)
                    numDivison++
                if(this.num3 != null)
                    numDivison++
                if(this.num4 != null)
                    numDivison++
                if(this.num5 != null)
                    numDivison++
                if(this.num6 != null)
                    numDivison++
                    
                this.result = (this.num1 + Number(this.num2) + Number(this.num3) + Number(this.num4) + Number(this.num5) + Number(this.num6)) / numDivison
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
        document.title='تولبو | محاسبه میانگین'
        this.db.push(dbG.dataBox[5].item[0])
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
        <locations title="محاسبه میانگین" PN="ریاضی" PNR="/math"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="dark ? 'tool_D' : ''">
                <div class="title_tool">محاسبه میانگین</div>
                <div class="inputs">
                    <div class="filld">
                        <div>عدد 1:</div>
                        <input type="text" @keydown="keyCheck" v-model="num1" placeholder="به طور مثال : 1">
                    </div>
                    <div class="filld">
                        <div>عدد 2:</div>
                        <input type="text" @keydown="keyCheck" v-model="num2" placeholder="به طور مثال : 2">
                    </div>
                    <div class="filld">
                        <div>عدد 3:</div>
                        <input type="text" @keydown="keyCheck" v-model="num3" placeholder="به طور مثال : 3">
                    </div>
                    <div class="filld">
                        <div>عدد 4:</div>
                        <input type="text" @keydown="keyCheck" v-model="num4" placeholder="به طور مثال : 4">
                    </div>
                    <div class="filld">
                        <div>عدد 5:</div>
                        <input type="text" @keydown="keyCheck" v-model="num5" placeholder="به طور مثال : 5">
                    </div>
                    <div class="filld">
                        <div>عدد 6:</div>
                        <input type="text" @keydown="keyCheck" v-model="num6" placeholder="به طور مثال : 6">
                    </div>
                </div>
                <button class="bn632-hover" @click="convert"><span class="fontIcon">&#xe906;</span>محاسبه </button>
                <div class="result" :class="dark ? 'Result_D':''" v-if="showResult">
                    <div class="title_tool">نتیجه</div>
                    <div class="textResult">میانگین : {{ result }} </div>
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
    width: 95%;
}
.inputs{
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap:10px;
    padding:20px;
}
.filld{
    text-align: right;
}
.bn632-hover {
    margin: 20px auto;
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
@media screen and (max-width:1040px){
    .bn632-hover{
        margin:4px auto;
    } 
    .textResult{
        padding: 10px;
    }   
}
@media screen and (max-width:740px){
    .textResult{
        padding: 10px;
    }   
    .title_tool{
        padding: 8px;
    }
    .result{
        margin: 20px 20px;
    }
}
@media screen and (max-width:540px){
    .textResult{
        font-size: 18px;
    }   
    .title_tool{
        padding: 8px;
    }
}
@media screen and (max-width:440px){
    .textResult{
        font-size: 17px;
    }   
    .inputs{
        grid-template-columns: repeat(2,1fr);
    }
    .title_tool{
        padding: 8px;
    }
}
</style>