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
            showResult:false,
            result:null,
            nums:1,
            numberNumber:1,
            arrResult:[]
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
                this.arrResult = []
                this.generate()
            }else{
                this.shower()
            }
        },
        keyCheck(e){
            this.checkNumber()
            if(e.key == 'Enter')
                this.convert()
            else
                this.showResult = false
        },
        random(min, max) {
            return min + Math.random() * (max - min);
        },
        test (){
            this.nums = (this.numTwo - this.numOne)+1
        },
        generate(){
            for(let i = 1 ; i <= this.numberNumber ; i++){
                let numRandom = Math.floor(this.random(Number(this.numOne),Number(this.numTwo)))
                this.arrResult.push(numRandom)
            }
        },
        checkNumber(){
            if(Number(this.numOne) < Number(this.numTwo))
                this.test()
            else
                this.nums = 1
        },
        changer(e){
            this.showResult = false
            let tarVal = e.target.value
            this.numberNumber = tarVal
        }
    },
    watch:{
        numTwo (){
            this.checkNumber()
        }
    },
    created (){
        document.title='تولبو | تولید اعداد تصادفی '
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
        <locations title="تولید اعداد تصادفی" PN="اعداد" PNR="/numbers"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="[(!showResult ? 'HTool' : ''),(dark ? 'tool_D' : '')]">
                <div class="title_tool">تولید اعداد تصادفی</div>
                <div class="inputs">
                    <div>
                        <div>از عدد:</div>
                        <input type="text" placeholder="به طور مثال : 2" v-model="numOne" @keydown="keyCheck">
                    </div>
                    <div>
                        <div>تا عدد:</div>
                        <input type="text" placeholder="به طور مثال : 3" v-model="numTwo" @keydown="keyCheck">
                    </div>
                    <div>
                        <div>تعداد اعداد :</div>
                        <select @change="changer" :value="numberNumber">
                            <option v-for="i in Number(nums)">{{i}}</option>
                        </select>
                    </div>
                </div>
                <button class="bn632-hover" @click="convert"><span class="fontIcon">&#xe906;</span>محاسبه </button>
                <div class="result" :class="dark ? 'Result_D':''" v-if="showResult">
                    <div class="title_tool">نتیجه</div>
                    <div class="textResult">
                        <span v-for="(item , i) in arrResult">{{item}}<span v-if="i != arrResult.length-1"> - </span></span>
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
input,select{
    width: 100%;
}
.Htool{
    height: 220px;
}
.inputs{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
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
@media screen  and (max-width:440px){
    input {
        height: 24px;
    }    
}
</style>