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
            typeFrom:'ساعت',
            typeTo:'دقیقه'
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
                
                if(this.typeFrom == 'میلی ثانیه' && this.typeTo == 'میلی ثانیه')
                    this.result = this.num * 1 
                else if(this.typeFrom == 'میلی ثانیه' && this.typeTo == 'ثانیه')
                    this.result = this.num * 0.001 
                else if(this.typeFrom == 'میلی ثانیه' && this.typeTo == 'دقیقه')
                    this.result = this.num * 0.000016666666666666667 
                else if(this.typeFrom == 'میلی ثانیه' && this.typeTo == 'ساعت')
                    this.result = this.num * 2.7777777777777776e-8
                else if(this.typeFrom == 'میلی ثانیه' && this.typeTo == 'روز')
                    this.result = this.num * 1.1574074074074074e-8
                else if(this.typeFrom == 'میلی ثانیه' && this.typeTo == 'هفته')
                    this.result = this.num * 1.6534391534391535e-9
                else if(this.typeFrom == 'میلی ثانیه' && this.typeTo == 'ماه')
                    this.result = this.num * 3.8051750380517503e-10
                else if(this.typeFrom == 'میلی ثانیه' && this.typeTo == 'سال')
                    this.result = this.num * 3.1709791983764586e-11
                else if(this.typeFrom == 'میلی ثانیه' && this.typeTo == 'دهه')
                    this.result = this.num * 3.1709791983764588e-12
                else if(this.typeFrom == 'میلی ثانیه' && this.typeTo == 'قرن')
                    this.result = this.num * 3.1709791983764587e-13
                
                else if(this.typeFrom == 'ثانیه' && this.typeTo == 'میلی ثانیه')
                    this.result = this.num * 1000 
                else if(this.typeFrom == 'ثانیه' && this.typeTo == 'ثانیه')
                    this.result = this.num * 1
                else if(this.typeFrom == 'ثانیه' && this.typeTo == 'دقیقه')
                    this.result = this.num * 0.016666666666666666 
                else if(this.typeFrom == 'ثانیه' && this.typeTo == 'ساعت')
                    this.result = this.num * 0.0002777777777777778 
                else if(this.typeFrom == 'ثانیه' && this.typeTo == 'روز')
                    this.result = this.num * 0.000011574074074074073
                else if(this.typeFrom == 'ثانیه' && this.typeTo == 'هفته')
                    this.result = this.num * 0.0000016534391534391535
                else if(this.typeFrom == 'ثانیه' && this.typeTo == 'ماه')
                    this.result = this.num * 3.8051750380517503e-7
                else if(this.typeFrom == 'ثانیه' && this.typeTo == 'سال')
                    this.result = this.num * 3.1709791983764586e-8
                else if(this.typeFrom == 'ثانیه' && this.typeTo == 'دهه')
                    this.result = this.num * 3.1709791983764586e-9
                else if(this.typeFrom == 'ثانیه' && this.typeTo == 'قرن')
                    this.result = this.num * 3.1709791983764586e-10
                
                else if(this.typeFrom == 'دقیقه' && this.typeTo == 'میلی ثانیه')
                    this.result = this.num * 60000 
                else if(this.typeFrom == 'دقیقه' && this.typeTo == 'ثانیه')
                    this.result = this.num * 60 
                else if(this.typeFrom == 'دقیقه' && this.typeTo == 'دقیقه')
                    this.result = this.num * 1
                else if(this.typeFrom == 'دقیقه' && this.typeTo == 'ساعت')
                    this.result = this.num * 0.016666666666666666 
                else if(this.typeFrom == 'دقیقه' && this.typeTo == 'روز')
                    this.result = this.num * 0.0006944444444444445 
                else if(this.typeFrom == 'دقیقه' && this.typeTo == 'هفته')
                    this.result = this.num * 0.0000992063492063492 
                else if(this.typeFrom == 'دقیقه' && this.typeTo == 'ماه')
                    this.result = this.num * 0.000022831050228310503 
                else if(this.typeFrom == 'دقیقه' && this.typeTo == 'سال')
                    this.result = this.num * 0.000001902587519025875 
                else if(this.typeFrom == 'دقیقه' && this.typeTo == 'دهه')
                    this.result = this.num * 1.9025875190258752e-7
                else if(this.typeFrom == 'دقیقه' && this.typeTo == 'قرن')
                    this.result = this.num * 1.902587519025875e-8
                
                else if(this.typeFrom == 'ساعت' && this.typeTo == 'میلی ثانیه')
                    this.result = this.num * 3600000 
                else if(this.typeFrom == 'ساعت' && this.typeTo == 'ثانیه')
                    this.result = this.num * 3600 
                else if(this.typeFrom == 'ساعت' && this.typeTo == 'دقیقه')
                    this.result = this.num * 60 
                else if(this.typeFrom == 'ساعت' && this.typeTo == 'ساعت')
                    this.result = this.num * 1
                else if(this.typeFrom == 'ساعت' && this.typeTo == 'روز')
                    this.result = this.num * 0.041666666666666664
                else if(this.typeFrom == 'ساعت' && this.typeTo == 'هفته')
                    this.result = this.num * 0.005952380952380952 
                else if(this.typeFrom == 'ساعت' && this.typeTo == 'ماه')
                    this.result = this.num * 0.0013698630136986301
                else if(this.typeFrom == 'ساعت' && this.typeTo == 'سال')
                    this.result = this.num * 0.00011415525114155251 
                else if(this.typeFrom == 'ساعت' && this.typeTo == 'دهه')
                    this.result = this.num * 0.000011415525114155251 
                else if(this.typeFrom == 'ساعت' && this.typeTo == 'قرن')
                    this.result = this.num * 0.0000011415525114155251 
                
                else if(this.typeFrom == 'روز' && this.typeTo == 'میلی ثانیه')
                    this.result = this.num * 86400000 
                else if(this.typeFrom == 'روز' && this.typeTo == 'ثانیه')
                    this.result = this.num * 86400 
                else if(this.typeFrom == 'روز' && this.typeTo == 'دقیقه')
                    this.result = this.num * 1440 
                else if(this.typeFrom == 'روز' && this.typeTo == 'ساعت')
                    this.result = this.num * 24 
                else if(this.typeFrom == 'روز' && this.typeTo == 'روز')
                    this.result = this.num * 1
                else if(this.typeFrom == 'روز' && this.typeTo == 'هفته')
                    this.result = this.num * 0.14285714285714285 
                else if(this.typeFrom == 'روز' && this.typeTo == 'ماه')
                    this.result = this.num * 0.03287671232876712 
                else if(this.typeFrom == 'روز' && this.typeTo == 'سال')
                    this.result = this.num * 0.0027397260273972603 
                else if(this.typeFrom == 'روز' && this.typeTo == 'دهه')
                    this.result = this.num * 0.000273972602739726 
                else if(this.typeFrom == 'روز' && this.typeTo == 'قرن')
                    this.result = this.num * 0.000027397260273972603 
                
                else if(this.typeFrom == 'هفته' && this.typeTo == 'میلی ثانیه')
                    this.result = this.num * 604800000 
                else if(this.typeFrom == 'هفته' && this.typeTo == 'ثانیه')
                    this.result = this.num * 604800 
                else if(this.typeFrom == 'هفته' && this.typeTo == 'دقیقه')
                    this.result = this.num * 10080 
                else if(this.typeFrom == 'هفته' && this.typeTo == 'ساعت')
                    this.result = this.num * 168 
                else if(this.typeFrom == 'هفته' && this.typeTo == 'روز')
                    this.result = this.num * 7
                else if(this.typeFrom == 'هفته' && this.typeTo == 'هفته')
                    this.result = this.num * 1
                else if(this.typeFrom == 'هفته' && this.typeTo == 'ماه')
                    this.result = this.num * 0.23013698630136986 
                else if(this.typeFrom == 'هفته' && this.typeTo == 'سال')
                    this.result = this.num * 0.019178082191780823 
                else if(this.typeFrom == 'هفته' && this.typeTo == 'دهه')
                    this.result = this.num * 0.0019178082191780822
                else if(this.typeFrom == 'هفته' && this.typeTo == 'قرن')
                    this.result = this.num * 0.0001917808219178082 
                
                else if(this.typeFrom == 'ماه' && this.typeTo == 'میلی ثانیه')
                    this.result = this.num * 2628000000 
                else if(this.typeFrom == 'ماه' && this.typeTo == 'ثانیه')
                    this.result = this.num * 2628000 
                else if(this.typeFrom == 'ماه' && this.typeTo == 'دقیقه')
                    this.result = this.num * 43800
                else if(this.typeFrom == 'ماه' && this.typeTo == 'ساعت')
                    this.result = this.num * 730 
                else if(this.typeFrom == 'ماه' && this.typeTo == 'روز')
                    this.result = this.num * 30.416666666666668 
                else if(this.typeFrom == 'ماه' && this.typeTo == 'هفته')
                    this.result = this.num * 4.345238095238095 
                else if(this.typeFrom == 'ماه' && this.typeTo == 'ماه')
                    this.result = this.num * 1
                else if(this.typeFrom == 'ماه' && this.typeTo == 'سال')
                    this.result = this.num * 0.08333333333333333 
                else if(this.typeFrom == 'ماه' && this.typeTo == 'دهه')
                    this.result = this.num * 0.008333333333333333 
                else if(this.typeFrom == 'ماه' && this.typeTo == 'قرن')
                    this.result = this.num * 0.0008333333333333334 
                
                else if(this.typeFrom == 'سال' && this.typeTo == 'میلی ثانیه')
                    this.result = this.num * 31536000000 
                else if(this.typeFrom == 'سال' && this.typeTo == 'ثانیه')
                    this.result = this.num * 31536000 
                else if(this.typeFrom == 'سال' && this.typeTo == 'دقیقه')
                    this.result = this.num * 525600 
                else if(this.typeFrom == 'سال' && this.typeTo == 'ساعت')
                    this.result = this.num * 8760 
                else if(this.typeFrom == 'سال' && this.typeTo == 'روز')
                    this.result = this.num * 365 
                else if(this.typeFrom == 'سال' && this.typeTo == 'هفته')
                    this.result = this.num *  52.142857142857146
                else if(this.typeFrom == 'سال' && this.typeTo == 'ماه')
                    this.result = this.num * 12 
                else if(this.typeFrom == 'سال' && this.typeTo == 'سال')
                    this.result = this.num * 1
                else if(this.typeFrom == 'سال' && this.typeTo == 'دهه')
                    this.result = this.num * 0.1 
                else if(this.typeFrom == 'سال' && this.typeTo == 'قرن')
                    this.result = this.num * 0.01 
                
                else if(this.typeFrom == 'دهه' && this.typeTo == 'میلی ثانیه')
                    this.result = this.num * 315360000000 
                else if(this.typeFrom == 'دهه' && this.typeTo == 'ثانیه')
                    this.result = this.num * 315360000 
                else if(this.typeFrom == 'دهه' && this.typeTo == 'دقیقه')
                    this.result = this.num * 5256000 
                else if(this.typeFrom == 'دهه' && this.typeTo == 'ساعت')
                    this.result = this.num * 87600 
                else if(this.typeFrom == 'دهه' && this.typeTo == 'روز')
                    this.result = this.num * 3650 
                else if(this.typeFrom == 'دهه' && this.typeTo == 'هفته')
                    this.result = this.num *  521.4285714285714 
                else if(this.typeFrom == 'دهه' && this.typeTo == 'ماه')
                    this.result = this.num * 120 
                else if(this.typeFrom == 'دهه' && this.typeTo == 'سال')
                    this.result = this.num * 10 
                else if(this.typeFrom == 'دهه' && this.typeTo == 'دهه')
                    this.result = this.num * 1
                else if(this.typeFrom == 'دهه' && this.typeTo == 'قرن')
                    this.result = this.num * 0.1 
                
                else if(this.typeFrom == 'قرن' && this.typeTo == 'میلی ثانیه')
                    this.result = this.num * 3153600000000 
                else if(this.typeFrom == 'قرن' && this.typeTo == 'ثانیه')
                    this.result = this.num * 3153600000 
                else if(this.typeFrom == 'قرن' && this.typeTo == 'دقیقه')
                    this.result = this.num * 52560000 
                else if(this.typeFrom == 'قرن' && this.typeTo == 'ساعت')
                    this.result = this.num * 876000 
                else if(this.typeFrom == 'قرن' && this.typeTo == 'روز')
                    this.result = this.num * 36500 
                else if(this.typeFrom == 'قرن' && this.typeTo == 'هفته')
                    this.result = this.num *  5214.285714285715  
                else if(this.typeFrom == 'قرن' && this.typeTo == 'ماه')
                    this.result = this.num * 1200 
                else if(this.typeFrom == 'قرن' && this.typeTo == 'سال')
                    this.result = this.num * 100 
                else if(this.typeFrom == 'قرن' && this.typeTo == 'دهه')
                    this.result = this.num * 10 
                else if(this.typeFrom == 'قرن' && this.typeTo == 'قرن')
                    this.result = this.num * 0.1 

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
        document.title='تولبو | تبدیل زمان'
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
        <locations title="تبدیل زمان" PN="تبدیل ها" PNR="/conversions"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="[(!showResult ? 'HTool' : ''),(dark ? 'tool_D' : '')]">
                <div class="title_tool">تبدیل زمان</div>
                <div class="inputs">
                    <div class="cInputs">
                        <div>مقدار تبدیل:</div>
                        <input type="text" placeholder="به طور مثال : 1" v-model="num" @keydown="keyCheck">
                    </div>
                    <div class="cInputs">
                        <div> تبدیل از:</div>
                        <select id="from" :value="typeFrom" @change="changer">
                            <option value="میلی ثانیه">میلی ثانیه</option>
                            <option value="ثانیه">ثانیه</option>
                            <option value="دقیقه">دقیقه</option>
                            <option value="ساعت">ساعت</option>
                            <option value="روز">روز</option>
                            <option value="هفته">هفته</option>
                            <option value="ماه">ماه</option>
                            <option value="سال">سال</option>
                            <option value="دهه">دهه</option>
                            <option value="قرن">قرن</option>
                        </select>
                    </div>
                    <div class="cInputs">
                        <div> تبدیل به:</div>
                        <select id="to" :value="typeTo" @change="changer">
                            <option value="میلی ثانیه">میلی ثانیه</option>
                            <option value="ثانیه">ثانیه</option>
                            <option value="دقیقه">دقیقه</option>
                            <option value="ساعت">ساعت</option>
                            <option value="روز">روز</option>
                            <option value="هفته">هفته</option>
                            <option value="ماه">ماه</option>
                            <option value="سال">سال</option>
                            <option value="دهه">دهه</option>
                            <option value="قرن">قرن</option>
                        </select>
                    </div>
                </div>
                <button class="bn632-hover" @click="convert"><span class="fontIcon">&#xe906;</span>محاسبه </button>
                <div class="result" :class="dark ? 'Result_D':''" v-if="showResult">
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