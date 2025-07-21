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
            typeFrom:'گرم',
            typeTo:'کیلوگرم'
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
            if(this.num != null && this.num != ""){
                this.showResult = true                
                if(this.typeFrom == 'گرم' && this.typeTo == 'کیلوگرم')
                    this.result = this.num / 1000
                else if(this.typeFrom == 'گرم' && this.typeTo == 'گرم')
                    this.result = this.num * 1 
                else if(this.typeFrom == 'گرم' && this.typeTo == 'پوند')
                    this.result = this.num * 0.0022046226 
                else if(this.typeFrom == 'گرم' && this.typeTo == 'قیراط')
                    this.result = this.num * 5
                else if(this.typeFrom == 'گرم' && this.typeTo == 'اونس')
                    this.result = this.num * 0.0352739619 
                else if(this.typeFrom == 'گرم' && this.typeTo == 'مثقال')
                    this.result = this.num * 0.21701389 
                else if(this.typeFrom == 'گرم' && this.typeTo == 'خروار')
                    this.result = this.num * 0.0000033333 
                else if(this.typeFrom == 'کیلوگرم' && this.typeTo == 'گرم')
                    this.result = this.num * 1000
                else if(this.typeFrom == 'کیلوگرم' && this.typeTo == 'کیلوگرم')
                    this.result = this.num * 1
                else if(this.typeFrom == 'کیلوگرم' && this.typeTo == 'پوند')
                    this.result = this.num * 2.20462262 
                else if(this.typeFrom == 'کیلوگرم' && this.typeTo == 'قیراط')
                    this.result = this.num * 5000 
                else if(this.typeFrom == 'کیلوگرم' && this.typeTo == 'اونس')
                    this.result = this.num * 35.2739619 
                else if(this.typeFrom == 'کیلوگرم' && this.typeTo == 'مثقال')
                    this.result = this.num * 217.01389 
                else if(this.typeFrom == 'کیلوگرم' && this.typeTo == 'خروار')
                    this.result = this.num * 0.00333333 
                else if(this.typeFrom == 'پوند' && this.typeTo == 'گرم')
                    this.result = this.num * 453.5923703804 
                else if(this.typeFrom == 'پوند' && this.typeTo == 'کیلوگرم')
                    this.result = this.num * 0.4535923704 
                else if(this.typeFrom == 'پوند' && this.typeTo == 'پوند')
                    this.result = this.num * 1 
                else if(this.typeFrom == 'پوند' && this.typeTo == 'قیراط')
                    this.result = this.num * 2267.9618519019  
                else if(this.typeFrom == 'پوند' && this.typeTo == 'اونس')
                    this.result = this.num * 15.9999999909  
                else if(this.typeFrom == 'پوند' && this.typeTo == 'مثقال')
                    this.result = this.num * 98.4358447706 
                else if(this.typeFrom == 'پوند' && this.typeTo == 'خروار')
                    this.result = this.num * 0.0015119731 
                else if(this.typeFrom == 'قیراط' && this.typeTo == 'گرم')
                    this.result = this.num * 0.2
                else if(this.typeFrom == 'قیراط' && this.typeTo == 'کیلوگرم')
                    this.result = this.num * 0.0002  
                else if(this.typeFrom == 'قیراط' && this.typeTo == 'پوند')
                    this.result = this.num * 0.0004409245 
                else if(this.typeFrom == 'قیراط' && this.typeTo == 'قیراط')
                    this.result = this.num * 1
                else if(this.typeFrom == 'قیراط' && this.typeTo == 'اونس')
                    this.result = this.num * 0.0070547924 
                else if(this.typeFrom == 'قیراط' && this.typeTo == 'مثقال')
                    this.result = this.num * 0.043402778 
                else if(this.typeFrom == 'قیراط' && this.typeTo == 'خروار')
                    this.result = this.num * 6.667e-7
                else if(this.typeFrom == 'اونس' && this.typeTo == 'گرم')
                    this.result = this.num * 28.3495231648 
                else if(this.typeFrom == 'اونس' && this.typeTo == 'کیلوگرم')
                    this.result = this.num * 0.0283495232 
                else if(this.typeFrom == 'اونس' && this.typeTo == 'پوند')
                    this.result = this.num * 0.0625
                else if(this.typeFrom == 'اونس' && this.typeTo == 'قیراط')
                    this.result = this.num * 141.7476158242 
                else if(this.typeFrom == 'اونس' && this.typeTo == 'اونس')
                    this.result = this.num * 1
                else if(this.typeFrom == 'اونس' && this.typeTo == 'مثقال')
                    this.result = this.num * 6.1522403016 
                else if(this.typeFrom == 'اونس' && this.typeTo == 'خروار')
                    this.result = this.num * 0.0000944983 
                else if(this.typeFrom == 'مثقال' && this.typeTo == 'گرم')
                    this.result = this.num * 4.6079999764 
                else if(this.typeFrom == 'مثقال' && this.typeTo == 'کیلوگرم')
                    this.result = this.num * 0.004608 
                else if(this.typeFrom == 'مثقال' && this.typeTo == 'پوند')
                    this.result = this.num * 0.010158901
                else if(this.typeFrom == 'مثقال' && this.typeTo == 'قیراط')
                    this.result = this.num * 23.039999882 
                else if(this.typeFrom == 'مثقال' && this.typeTo == 'اونس')
                    this.result = this.num * 0.1625424156 
                else if(this.typeFrom == 'مثقال' && this.typeTo == 'مثقال')
                    this.result = this.num * 1
                else if(this.typeFrom == 'مثقال' && this.typeTo == 'خروار')
                    this.result = this.num * 0.00001536 
                else if(this.typeFrom == 'خروار' && this.typeTo == 'گرم')
                    this.result = this.num * 300000.3000003 
                else if(this.typeFrom == 'خروار' && this.typeTo == 'کیلوگرم')
                    this.result = this.num * 300.0003000003 
                else if(this.typeFrom == 'خروار' && this.typeTo == 'پوند')
                    this.result = this.num * 661.3874473874
                else if(this.typeFrom == 'خروار' && this.typeTo == 'قیراط')
                    this.result = this.num * 1500001.5000015001 
                else if(this.typeFrom == 'خروار' && this.typeTo == 'اونس')
                    this.result = this.num * 10582.1991521992 
                else if(this.typeFrom == 'خروار' && this.typeTo == 'مثقال')
                    this.result = this.num * 65104.2321042321 
                else if(this.typeFrom == 'خروار' && this.typeTo == 'خروار')
                    this.result = this.num * 1
                else
                    this.showResult = false
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
        changer(e){
            this.showResult = false
            if(e.target.id == 'to')
                this.typeTo = e.target.value
            else
                this.typeFrom = e.target.value
        }
    },
    created (){
        document.title='تولبو | تبدیل وزن '
        this.db.push(dbG.dataBox[3].item[1])
        this.db.push(dbG.dataBox[3].item[2])
        this.db.push(dbG.dataBox[3].item[3])
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
        <locations title="تبدیل وزن" PN="تبدیل ها" PNR="/conversions"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="[(!showResult ? 'HTool' : ''),(dark ? 'tool_D' : '')]">
                <div class="title_tool">تبدیل وزن</div>
                <div class="inputs">
                    <div class="cInputs">
                        <div>مقدار تبدیل:</div>
                        <input type="text" placeholder="به طور مثال : 5" v-model="num" @keydown="keyCheck">
                    </div>
                    <div class="cInputs">
                        <div> تبدیل از:</div>
                        <select id="from" :value="typeFrom" @change="changer">
                            <option value="گرم">گرم</option>
                            <option value="کیلوگرم">کیلوگرم</option>
                            <option value="پوند">پوند</option>
                            <option value="قیراط">قیراط</option>
                            <option value="اونس">اونس</option>
                            <option value="مثقال">مثقال</option>
                            <option value="خروار">خروار</option>
                        </select>
                    </div>
                    <div class="cInputs">
                        <div> تبدیل به:</div>
                        <select id="to" :value="typeTo" @change="changer">
                            <option value="کیلوگرم">کیلوگرم</option>
                            <option value="گرم">گرم</option>
                            <option value="پوند">پوند</option>
                            <option value="قیراط">قیراط</option>
                            <option value="اونس">اونس</option>
                            <option value="مثقال">مثقال</option>
                            <option value="خروار">خروار</option>
                        </select>
                    </div>
                </div>
                <button class="bn632-hover" @click="convert"><span class="fontIcon">&#xe906;</span>محاسبه </button>
                <div class="result" :class="dark ? 'Result_D':''" v-if="showResult">
                    <div class="title_tool">نتیجه</div>
                    <div class="textResult">
                        {{num}} {{typeFrom}} معادل <span class="colorC">{{result}}</span> {{typeTo}}
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
.HTool{
    height: 200px;
}
select{
    width: 100%;
    margin-top: 5px;
}
input{
    width: 95%;
    margin-top: 5px;
}
.inputs{
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap:10px;
    padding:10px;
}
.cInputs{
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

</style>