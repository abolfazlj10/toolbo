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
            typeFrom:'متر',
            typeTo:'کیلومتر'
        }
    },
    setup(){
        const dark = inject("dark")
        const warn = inject("warning")
        return{dark,warn,
        shower (){
            this.warn = true
        }}    },
    methods:{
        convert (){
            if(this.num != null && this.num != ""){
                this.showResult = true              
                if(this.typeFrom == 'میلیمتر' && this.typeTo == 'میلیمتر')
                    this.result = this.num * 1
                else if(this.typeFrom == 'میلیمتر' && this.typeTo == 'متر')
                    this.result = this.num * 0.001 
                else if(this.typeFrom == 'میلیمتر' && this.typeTo == 'کیلومتر')
                    this.result = this.num * 0.000001
                else if(this.typeFrom == 'میلیمتر' && this.typeTo == 'سانتی متر')
                    this.result = this.num * 0.1
                else if(this.typeFrom == 'میلیمتر' && this.typeTo == 'اینچ')
                    this.result = this.num * 0.0393700787 
                else if(this.typeFrom == 'میلیمتر' && this.typeTo == 'فیت')
                    this.result = this.num * 0.0032808399 
                else if(this.typeFrom == 'میلیمتر' && this.typeTo == 'مایل')
                    this.result = this.num * 6.214e-7
                else if(this.typeFrom == 'میلیمتر' && this.typeTo == 'فرسنگ')
                    this.result = this.num * 1.603e-7
                else if(this.typeFrom == 'میلیمتر' && this.typeTo == 'وجب')
                    this.result = this.num * 0.0044444444 
                else if(this.typeFrom == 'متر' && this.typeTo == 'میلیمتر')
                    this.result = this.num * 1000 
                else if(this.typeFrom == 'متر' && this.typeTo == 'متر')
                    this.result = this.num * 1
                else if(this.typeFrom == 'متر' && this.typeTo == 'کیلومتر')
                    this.result = this.num * 0.001 
                else if(this.typeFrom == 'متر' && this.typeTo == 'سانتی متر')
                    this.result = this.num * 100 
                else if(this.typeFrom == 'متر' && this.typeTo == 'اینچ')
                    this.result = this.num * 39.37007874 
                else if(this.typeFrom == 'متر' && this.typeTo == 'فیت')
                    this.result = this.num * 3.280839895 
                else if(this.typeFrom == 'متر' && this.typeTo == 'مایل')
                    this.result = this.num * 0.0006213712 
                else if(this.typeFrom == 'متر' && this.typeTo == 'فرسنگ')
                    this.result = this.num * 0.00016026 
                else if(this.typeFrom == 'متر' && this.typeTo == 'وجب')
                    this.result = this.num * 4.44444444 
                else if(this.typeFrom == 'کیلومتر' && this.typeTo == 'میلیمتر')
                    this.result = this.num * 1000000 
                else if(this.typeFrom == 'کیلومتر' && this.typeTo == 'متر')
                    this.result = this.num * 1000 
                else if(this.typeFrom == 'کیلومتر' && this.typeTo == 'کیلومتر')
                    this.result = this.num * 1
                else if(this.typeFrom == 'کیلومتر' && this.typeTo == 'سانتی متر')
                    this.result = this.num * 100000 
                else if(this.typeFrom == 'کیلومتر' && this.typeTo == 'اینچ')
                    this.result = this.num * 39370.07874 
                else if(this.typeFrom == 'کیلومتر' && this.typeTo == 'فیت')
                    this.result = this.num * 3280.839895 
                else if(this.typeFrom == 'کیلومتر' && this.typeTo == 'مایل')
                    this.result = this.num * 0.6213712 
                else if(this.typeFrom == 'کیلومتر' && this.typeTo == 'فرسنگ')
                    this.result = this.num * 0.16026 
                else if(this.typeFrom == 'کیلومتر' && this.typeTo == 'وجب')
                    this.result = this.num * 4444.44444
                else if(this.typeFrom == 'سانتی متر' && this.typeTo == 'میلیمتر')
                    this.result = this.num * 10
                else if(this.typeFrom == 'سانتی متر' && this.typeTo == 'متر')
                    this.result = this.num * 0.01 
                else if(this.typeFrom == 'سانتی متر' && this.typeTo == 'کیلومتر')
                    this.result = this.num * 0.00001 
                else if(this.typeFrom == 'سانتی متر' && this.typeTo == 'سانتی متر')
                    this.result = this.num * 1 
                else if(this.typeFrom == 'سانتی متر' && this.typeTo == 'اینچ')
                    this.result = this.num * 0.3937007874 
                else if(this.typeFrom == 'سانتی متر' && this.typeTo == 'فیت')
                    this.result = this.num * 0.032808399 
                else if(this.typeFrom == 'سانتی متر' && this.typeTo == 'مایل')
                    this.result = this.num * 0.0000062137 
                else if(this.typeFrom == 'سانتی متر' && this.typeTo == 'فرسنگ')
                    this.result = this.num * 0.0000016026 
                else if(this.typeFrom == 'سانتی متر' && this.typeTo == 'وجب')
                    this.result = this.num * 0.0444444444 
                else if(this.typeFrom == 'اینچ' && this.typeTo == 'میلیمتر')
                    this.result = this.num * 25.4000000001 
                else if(this.typeFrom == 'اینچ' && this.typeTo == 'متر')
                    this.result = this.num * 0.0254 
                else if(this.typeFrom == 'اینچ' && this.typeTo == 'کیلومتر')
                    this.result = this.num * 0.0000254 
                else if(this.typeFrom == 'اینچ' && this.typeTo == 'سانتی متر')
                    this.result = this.num * 2.54  
                else if(this.typeFrom == 'اینچ' && this.typeTo == 'اینچ')
                    this.result = this.num * 1
                else if(this.typeFrom == 'اینچ' && this.typeTo == 'فیت')
                    this.result = this.num * 0.0833333333 
                else if(this.typeFrom == 'اینچ' && this.typeTo == 'مایل')
                    this.result = this.num * 0.0000157828 
                else if(this.typeFrom == 'اینچ' && this.typeTo == 'فرسنگ')
                    this.result = this.num * 0.0000040706 
                else if(this.typeFrom == 'اینچ' && this.typeTo == 'وجب')
                    this.result = this.num * 0.1128888888 
                else if(this.typeFrom == 'فیت' && this.typeTo == 'میلیمتر')
                    this.result = this.num * 304.8000000012 
                else if(this.typeFrom == 'فیت' && this.typeTo == 'متر')
                    this.result = this.num * 0.3048 
                else if(this.typeFrom == 'فیت' && this.typeTo == 'کیلومتر')
                    this.result = this.num * 0.0003048 
                else if(this.typeFrom == 'فیت' && this.typeTo == 'سانتی متر')
                    this.result = this.num * 30.4800000001   
                else if(this.typeFrom == 'فیت' && this.typeTo == 'اینچ')
                    this.result = this.num * 12 
                else if(this.typeFrom == 'فیت' && this.typeTo == 'فیت')
                    this.result = this.num * 1
                else if(this.typeFrom == 'فیت' && this.typeTo == 'مایل')
                    this.result = this.num * 0.0001893939 
                else if(this.typeFrom == 'فیت' && this.typeTo == 'فرسنگ')
                    this.result = this.num * 0.0000488472 
                else if(this.typeFrom == 'فیت' && this.typeTo == 'وجب')
                    this.result = this.num * 1.3546666653 
                else if(this.typeFrom == 'مایل' && this.typeTo == 'میلیمتر')
                    this.result = this.num * 1609343.9798947875 
                else if(this.typeFrom == 'مایل' && this.typeTo == 'متر')
                    this.result = this.num * 1609.3439798948 
                else if(this.typeFrom == 'مایل' && this.typeTo == 'کیلومتر')
                    this.result = this.num * 1.6093439799 
                else if(this.typeFrom == 'مایل' && this.typeTo == 'سانتی متر')
                    this.result = this.num * 160934.3979894787 
                else if(this.typeFrom == 'مایل' && this.typeTo == 'اینچ')
                    this.result = this.num * 63359.9992082028 
                else if(this.typeFrom == 'مایل' && this.typeTo == 'فیت')
                    this.result = this.num * 5279.9999340169 
                else if(this.typeFrom == 'مایل' && this.typeTo == 'مایل')
                    this.result = this.num * 1
                else if(this.typeFrom == 'مایل' && this.typeTo == 'فرسنگ')
                    this.result = this.num * 0.2579134662 
                else if(this.typeFrom == 'مایل' && this.typeTo == 'وجب')
                    this.result = this.num * 7152.6399034909 
                else if(this.typeFrom == 'فرسنگ' && this.typeTo == 'میلیمتر')
                    this.result = this.num * 6239860.227130913 
                else if(this.typeFrom == 'فرسنگ' && this.typeTo == 'متر')
                    this.result = this.num * 6239.8602271309 
                else if(this.typeFrom == 'فرسنگ' && this.typeTo == 'کیلومتر')
                    this.result = this.num * 6.2398602271 
                else if(this.typeFrom == 'فرسنگ' && this.typeTo == 'سانتی متر')
                    this.result = this.num * 623986.0227130912 
                else if(this.typeFrom == 'فرسنگ' && this.typeTo == 'اینچ')
                    this.result = this.num * 245663.7884687383 
                else if(this.typeFrom == 'فرسنگ' && this.typeTo == 'فیت')
                    this.result = this.num * 20471.9823723949 
                else if(this.typeFrom == 'فرسنگ' && this.typeTo == 'مایل')
                    this.result = this.num * 3.8772694372 
                else if(this.typeFrom == 'فرسنگ' && this.typeTo == 'فرسنگ')
                    this.result = this.num * 1
                else if(this.typeFrom == 'فرسنگ' && this.typeTo == 'وجب')
                    this.result = this.num * 27732.7120928491 
                else if(this.typeFrom == 'وجب' && this.typeTo == 'میلیمتر')
                    this.result = this.num * 225.000000225 
                else if(this.typeFrom == 'وجب' && this.typeTo == 'متر')
                    this.result = this.num * 0.2250000002 
                else if(this.typeFrom == 'وجب' && this.typeTo == 'کیلومتر')
                    this.result = this.num * 0.000225 
                else if(this.typeFrom == 'وجب' && this.typeTo == 'سانتی متر')
                    this.result = this.num * 22.5000000225 
                else if(this.typeFrom == 'وجب' && this.typeTo == 'اینچ')
                    this.result = this.num * 8.8582677254 
                else if(this.typeFrom == 'وجب' && this.typeTo == 'فیت')
                    this.result = this.num * 0.7381889771 
                else if(this.typeFrom == 'وجب' && this.typeTo == 'مایل')
                    this.result = this.num * 0.0001398085 
                else if(this.typeFrom == 'وجب' && this.typeTo == 'فرسنگ')
                    this.result = this.num * 0.0000360585 
                else if(this.typeFrom == 'وجب' && this.typeTo == 'وجب')
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
        document.title='تولبو | تبدیل طول '
        this.db.push(dbG.dataBox[3].item[0])
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
        <locations title="تبدیل طول" PN="تبدیل ها" PNR="/conversions"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="[(!showResult ? 'HTool' : ''),(dark ? 'tool_D' : '')]">
                <div class="title_tool">تبدیل طول</div>
                <div class="inputs">
                    <div class="cInputs">
                        <div>مقدار تبدیل:</div>
                        <input type="text" placeholder="به طور مثال : 1" v-model="num" @keydown="keyCheck">
                    </div>
                    <div class="cInputs">
                        <div> تبدیل از:</div>
                        <select id="from" :value="typeFrom" @change="changer">
                            <option value="میلیمتر">میلیمتر</option>
                            <option value="سانتی متر">سانتی متر</option>
                            <option value="متر">متر</option>
                            <option value="کیلومتر">کیلومتر</option>
                            <option value="اینچ">اینچ</option>
                            <option value="فیت">فیت - پا</option>
                            <option value="مایل">مایل</option>
                            <option value="فرسنگ">فرسنگ - فرسخ</option>
                            <option value="وجب">وجب</option>
                        </select>
                    </div>
                    <div class="cInputs">
                        <div> تبدیل به:</div>
                        <select id="to" :value="typeTo" @change="changer">
                            <option value="میلیمتر">میلیمتر</option>
                            <option value="سانتی متر">سانتی متر</option>
                            <option value="متر">متر</option>
                            <option value="کیلومتر">کیلومتر</option>
                            <option value="اینچ">اینچ</option>
                            <option value="فیت">فیت - پا</option>
                            <option value="مایل">مایل</option>
                            <option value="فرسنگ">فرسنگ - فرسخ</option>
                            <option value="وجب">وجب</option>
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