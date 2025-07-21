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
            typeFrom:'سانتیگراد',
            typeTo:'فارنهایت'
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
                
                if(this.typeFrom == 'سانتیگراد' && this.typeTo == 'سانتیگراد')
                    this.result = this.num * 1
                else if(this.typeFrom == 'سانتیگراد' && this.typeTo == 'کلوین')
                    this.result = Number(this.num) + 273.15 
                else if(this.typeFrom == 'سانتیگراد' && this.typeTo == 'فارنهایت')
                    this.result = this.num * 1.8 + 32
                else if(this.typeFrom == 'سانتیگراد' && this.typeTo == 'رانکین')
                    this.result = (Number(this.num) + 273.15) * 1.8
                else if(this.typeFrom == 'سانتیگراد' && this.typeTo == 'رومیر')
                    this.result = this.num * 0.8 
                else if(this.typeFrom == 'سانتیگراد' && this.typeTo == 'رومر')
                    this.result = this.num * 0.525 + 7.5
                else if(this.typeFrom == 'سانتیگراد' && this.typeTo == 'دلیزل')
                    this.result = (100 - this.num) * 1.5
                else if(this.typeFrom == 'سانتیگراد' && this.typeTo == 'نیوتن')
                    this.result = this.num * 0.33 
                else if(this.typeFrom == 'کلوین' && this.typeTo == 'سانتیگراد')
                    this.result = this.num - 273.15
                else if(this.typeFrom == 'کلوین' && this.typeTo == 'کلوین')
                    this.result = this.num * 1
                else if(this.typeFrom == 'کلوین' && this.typeTo == 'فارنهایت')
                    this.result = this.num * 1.8 - 459.67
                else if(this.typeFrom == 'کلوین' && this.typeTo == 'رانکین')
                    this.result = this.num * 9/5
                else if(this.typeFrom == 'کلوین' && this.typeTo == 'رومیر')
                    this.result = this.num - 273.15 * 4/5
                else if(this.typeFrom == 'کلوین' && this.typeTo == 'رومر')
                    this.result = (this.num - 273.15) * 21/40 + 7.5
                else if(this.typeFrom == 'کلوین' && this.typeTo == 'دلیزل')
                    this.result = (373.15 - this.num) * 3/2
                else if(this.typeFrom == 'کلوین' && this.typeTo == 'نیوتن')
                    this.result = (this.num - 273.15) * 33/100
                else if(this.typeFrom == 'فارنهایت' && this.typeTo == 'سانتیگراد')
                    this.result = (this.num - 32) * 5/9
                else if(this.typeFrom == 'فارنهایت' && this.typeTo == 'کلوین')
                    this.result = (Number(this.num) + 459.67) * 5/9
                else if(this.typeFrom == 'فارنهایت' && this.typeTo == 'فارنهایت')
                    this.result = this.num * 1
                else if(this.typeFrom == 'فارنهایت' && this.typeTo == 'رانکین')
                    this.result = Number(this.num) + 459.67
                else if(this.typeFrom == 'فارنهایت' && this.typeTo == 'رومیر')
                    this.result = (this.num - 32) * 4/9
                else if(this.typeFrom == 'فارنهایت' && this.typeTo == 'رومر')
                    this.result = ((this.num - 32) * (7/24)) + 7.5
                else if(this.typeFrom == 'فارنهایت' && this.typeTo == 'دلیزل')
                    this.result = (212 - this.num) * 5/6
                else if(this.typeFrom == 'فارنهایت' && this.typeTo == 'نیوتن')
                    this.result =(this.num -32) * (11/60)
                else if(this.typeFrom == 'رانکین' && this.typeTo == 'سانتیگراد')
                    this.result = (this.num - 491.67) * (5/9)
                else if(this.typeFrom == 'رانکین' && this.typeTo == 'کلوین')
                    this.result = this.num * (5/9)
                else if(this.typeFrom == 'رانکین' && this.typeTo == 'فارنهایت')
                    this.result = this.num - 459.67
                else if(this.typeFrom == 'رانکین' && this.typeTo == 'رانکین')
                    this.result = this.num * 1
                else if(this.typeFrom == 'رانکین' && this.typeTo == 'رومیر')
                    this.result = (this.num - 491.67) * (4/9)
                else if(this.typeFrom == 'رانکین' && this.typeTo == 'رومر')
                    this.result = (this.num - 491.67) * (7/24) + 7.5
                else if(this.typeFrom == 'رانکین' && this.typeTo == 'دلیزل')
                    this.result = (671.67 - this.num )* (5/6)
                else if(this.typeFrom == 'رانکین' && this.typeTo == 'نیوتن')
                    this.result = (this.num - 491.67) * (11/60)
                else if(this.typeFrom == 'رومیر' && this.typeTo == 'سانتیگراد')
                    this.result = this.num * (5/4)
                else if(this.typeFrom == 'رومیر' && this.typeTo == 'کلوین')
                    this.result = (this.num * (5/4)) + 273.15
                else if(this.typeFrom == 'رومیر' && this.typeTo == 'فارنهایت')
                    this.result = (this.num * 9/4) + 32
                else if(this.typeFrom == 'رومیر' && this.typeTo == 'رانکین')
                    this.result = (this.num * (9/4)) + 491.67
                else if(this.typeFrom == 'رومیر' && this.typeTo == 'رومیر')
                    this.result = this.num * 1
                else if(this.typeFrom == 'رومیر' && this.typeTo == 'رومر')
                    this.result = (this.num * (21/32)) + 7.5
                else if(this.typeFrom == 'رومیر' && this.typeTo == 'دلیزل')
                    this.result = (80 - this.num) * 15/8
                else if(this.typeFrom == 'رومیر' && this.typeTo == 'نیوتن')
                    this.result = this.num * 0.4125 
                else if(this.typeFrom == 'رومر' && this.typeTo == 'سانتیگراد')
                    this.result = (this.num - 7.5) * (40/21)
                else if(this.typeFrom == 'رومر' && this.typeTo == 'کلوین')
                    this.result = ((this.num - 7.5) * (40/21)) + 273.15
                else if(this.typeFrom == 'رومر' && this.typeTo == 'فارنهایت')
                    this.result = ((this.num - 7.5) * (24/7)) + 32
                else if(this.typeFrom == 'رومر' && this.typeTo == 'رانکین')
                    this.result = ((this.num - 7.5) * (24/7)) + 491.67
                else if(this.typeFrom == 'رومر' && this.typeTo == 'رومیر')
                    this.result =  (this.num - 7.5) * (32/21)
                else if(this.typeFrom == 'رومر' && this.typeTo == 'رومر')
                    this.result = this.num * 1
                else if(this.typeFrom == 'رومر' && this.typeTo == 'دلیزل')
                    this.result = (60 - this.num) * (20/7)
                else if(this.typeFrom == 'رومر' && this.typeTo == 'نیوتن')
                    this.result = (this.num - 7.5) * (22/35)
                else if(this.typeFrom == 'دلیزل' && this.typeTo == 'سانتیگراد')
                    this.result = 100 - this.num * 2/3
                else if(this.typeFrom == 'دلیزل' && this.typeTo == 'کلوین')
                    this.result = 373.15 - this.num * 2/3
                else if(this.typeFrom == 'دلیزل' && this.typeTo == 'فارنهایت')
                    this.result = 212 - this.num * 6/5
                else if(this.typeFrom == 'دلیزل' && this.typeTo == 'رانکین')
                    this.result = 671.67 - this.num * 6/5 
                else if(this.typeFrom == 'دلیزل' && this.typeTo == 'رومیر')
                    this.result = 80 - this.num * 8/15
                else if(this.typeFrom == 'دلیزل' && this.typeTo == 'رومر')
                    this.result = 60 - this.num * 7/20
                else if(this.typeFrom == 'دلیزل' && this.typeTo == 'دلیزل')
                    this.result = this.num * 1
                else if(this.typeFrom == 'دلیزل' && this.typeTo == 'نیوتن')
                    this.result = 33 - this.num * 11/50
                else if(this.typeFrom == 'نیوتن' && this.typeTo == 'سانتیگراد')
                    this.result = this.num * 100/33
                else if(this.typeFrom == 'نیوتن' && this.typeTo == 'کلوین')
                    this.result = (this.num * 100/33) + 273.15
                else if(this.typeFrom == 'نیوتن' && this.typeTo == 'فارنهایت')
                    this.result = this.num * 60/11 + 32
                else if(this.typeFrom == 'نیوتن' && this.typeTo == 'رانکین')
                    this.result = (this.num * 60/11) + 491.67
                else if(this.typeFrom == 'نیوتن' && this.typeTo == 'رومیر')
                    this.result = this.num * (80/33)
                else if(this.typeFrom == 'نیوتن' && this.typeTo == 'رومر')
                    this.result = (this.num * 35/22) + 7.5
                else if(this.typeFrom == 'نیوتن' && this.typeTo == 'دلیزل')
                    this.result = (33 - this.num) * (50/11)
                else if(this.typeFrom == 'نیوتن' && this.typeTo == 'نیوتن')
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
        },
    },
    created (){
        document.title='تولبو | تبدیل دما '
        this.db.push(dbG.dataBox[3].item[1])
        this.db.push(dbG.dataBox[3].item[3])
        this.db.push(dbG.dataBox[3].item[4])
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
        <locations title="تبدیل دما" PN="تبدیل ها" PNR="/conversions"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="[(!showResult ? 'HTool' : ''),(dark ? 'tool_D' : '')]">
                <div class="title_tool">تبدیل دما</div>
                <div class="inputs">
                    <div class="cInputs">
                        <div>مقدار تبدیل:</div>
                        <input type="text" placeholder="به طور مثال : 1" v-model="num" @keydown="keyCheck">
                    </div>
                    <div class="cInputs">
                        <div> تبدیل از:</div>
                        <select id="from" :value="typeFrom" @change="changer">
                            <option value="سانتیگراد">سانتیگراد سلسیوس</option>
                            <option value="کلوین">کلوین</option>
                            <option value="فارنهایت">فارنهایت</option>
                            <option value="رانکین">رانکین</option>
                            <option value="رومیر">رومیر</option>
                            <option value="رومر">رومر </option>
                            <option value="دلیزل">دلیزل</option>
                            <option value="نیوتن">نیوتن</option>
                        </select>
                    </div>
                    <div class="cInputs">
                        <div> تبدیل به:</div>
                        <select id="to" :value="typeTo" @change="changer">
                            <option value="سانتیگراد">سانتیگراد سلسیوس</option>
                            <option value="کلوین">کلوین</option>
                            <option value="فارنهایت">فارنهایت</option>
                            <option value="رانکین">رانکین</option>
                            <option value="رومیر">رومیر</option>
                            <option value="رومر">رومر</option>
                            <option value="دلیزل">دلیزل</option>
                            <option value="نیوتن">نیوتن</option>
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