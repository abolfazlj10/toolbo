<script>
import navBarVue from '../../../components/navBar.vue';
import footerVue from '../../../components/footer.vue';
import locationBarVue from '../../../components/locationBar.vue';
import toolsUsageVue from '../../../components/toolsUsage.vue';
import side  from '../../../components/sidePage.vue';
import loader from '../../../components/loader.vue';
import dbG from '../../../data/db.json'
import { inject } from 'vue';
export default {
    data (){
        return{
            db:[],
            isShow:false,
            yearKS:null, // S = start - K = khoirshidi
            yearKE:null, // E = end - K = khoirshidi
            monthKS:null, 
            monthKE:null, 
            dayKS:null, 
            dayKE:null, 
            yearMS:null, // S = start - K = khoirshidi
            yearME:null, // E = end - K = khoirshidi
            monthMS:null, 
            monthME:null, 
            dayMS:null, 
            dayME:null, 
            sMonthK:null,
            sYearK:null,
            sDayK:null,
            sMonthM:null,
            sYearM:null,
            sDayM:null,
            typeIsKhorshidi:true,
            showResult:false,
            isErr:false,
            monthK : ["فروردین",'اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'],
            monthM:['January','February','March','April','May','June','July','August','September','October','November','December'],
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
    methods : {
        async sendReq (){
            const send = await fetch('https://api.keybit.ir/time/')
            const data = await send.json()
            this.yearKE = data.date.year.number.en
            this.yearKS = data.date.year.number.en
            this.monthKE = data.date.month.name
            this.monthKS = data.date.month.name
            this.dayKE = data.date.day.number.en
            this.dayKS = data.date.day.number.en - 1
            
            let miladiN = data.date.other.gregorian.iso.en
            let dashFirstMiladi = miladiN.indexOf('-',)
            let dashLastMiladi = miladiN.lastIndexOf('-',)
            let numberMonth = miladiN.slice((dashFirstMiladi+1),dashLastMiladi)
            this.monthMS = this.monthM[Number(numberMonth)-1]
            this.monthME = this.monthM[Number(numberMonth)-1]
            this.dayMS = miladiN.slice(dashLastMiladi+1) -1
            this.dayME = miladiN.slice(dashLastMiladi+1) 
            this.yearMS = miladiN.slice(0,dashFirstMiladi)
            this.yearME = miladiN.slice(0,dashFirstMiladi)
            console.log(this.monthME);
        },
        convert (){
            if(this.typeIsKhorshidi){
                if(this.yearKE != "" && this.yearKS != ""){
                    this.showResult = true
                    this.sMonthK = this.searchMonth(this.monthKE , 'k') - this.searchMonth(this.monthKS , 'k')
                    this.sYearK = this.yearKE - this.yearKS
                    this.sDayK = this.dayKE - this.dayKS
                    if(this.sMonthK < 0){
                        this.sMonthK += 12
                        this.sYearK--
                    }
                    if (this.dayKS > this.dayKE && this.monthKE == this.monthKS  ){
                        this.sMonthK += 12
                        this.sYearK--
                    }
                    if(this.sDayK < 0){
                        this.sDayK += this.is30or31(this.monthKS)
                        this.sMonthK--
                    }
                    if(this.sYearK == 0 && this.sMonthK == 0 && this.sDayK == 0){
                        this.isErr = {status:true,info:'تاریخ شروع باید کوچک تر از تاریخ پایانی باشد.'}
                    }else if(this.sMonthK < 0){
                        this.isErr = {status:true,info:'تاریخ شروع باید کوچک تر از تاریخ پایانی باشد.'}
                    }else if(this.sDayK < 0){
                        this.isErr = {status:true,info:'تاریخ شروع باید کوچک تر از تاریخ پایانی باشد.'}
                    }else if(this.sYearK < 0){
                        this.isErr = {status:true,info:'تاریخ شروع باید کوچک تر از تاریخ پایانی باشد.'}
                    }
                }else{
                    this.showResult = false
                    this.shower()
                }
            }else{
                if(this.yearME != "" && this.yearMS != ""){
                    this.showResult = true
                    this.sMonthM = this.searchMonth(this.monthME) - this.searchMonth(this.monthMS)
                    this.sYearM = this.yearME - this.yearMS
                    this.sDayM = this.dayME - this.dayMS
                    if(this.sMonthM < 0){
                        this.sMonthM += 12
                        this.sYearM--
                    }
                    if(this.sDayM < 0){
                        this.sDayM += this.is30or31(this.sMonthM)
                        this.sMonthM--
                    }  
                    if(this.sYearM == 0 && this.sMonthM == 0 && this.sDayM == 0){
                        this.isErr = {status:true,info:'تاریخ شروع باید کوچک تر از تاریخ پایانی باشد.'}
                    }else if(this.sMonthM < 0){
                        this.isErr = {status:true,info:'تاریخ شروع باید کوچک تر از تاریخ پایانی باشد.'}
                    }else if(this.sDayM < 0){
                        this.isErr = {status:true,info:'تاریخ شروع باید کوچک تر از تاریخ پایانی باشد.'}
                    }else if(this.sYearM < 0){
                        this.isErr = {status:true,info:'تاریخ شروع باید کوچک تر از تاریخ پایانی باشد.'}
                    }
                }else{
                    this.showResult = false
                    this.shower()
                }
            }

        },
        searchMonth (month , t){
            var s 
            if(t){
                s = this.monthK.findIndex((item) => {
                    return item == month
                })
            }else{
                s = this.monthM.findIndex((item) => {
                    return item == month
                })    
            }
            s++ 
            return s
        },
        changer (type){
            this.showResult = false
            this.isErr = false

            if (type == 'monthKS')
                this.monthKS = this.$refs.monthKS.value
            else if (type == 'monthKE')
                this.monthKE = this.$refs.monthKE.value
            else if (type == 'monthMS')
                this.monthMS = this.$refs.monthMS.value
            else if (type == 'monthME')
                this.monthME = this.$refs.monthME.value
            else if(type == 'dayKS')
                this.dayKS = this.$refs.dayKS.value
            else if(type == 'dayKE')
                this.dayKE = this.$refs.dayKE.value
            else if(type == 'dayMS')
                this.dayMS = this.$refs.dayMS.value
            else if(type == 'dayME')
                this.dayME = this.$refs.dayME.value
            
        },
        is30or31(mon){
            switch (mon) {
                case 'فروردین':
                case 'اردیبهشت':
                case 'خرداد':
                case 'تیر':
                case 'مرداد':
                case 'شهریور':
                case 'January':
                case 'March':
                case 'May':
                case 'July':
                case 'August':
                case 'October':
                case 'December':
                    return 31                
                    break;
                case 'اسفند':
                case 'February':
                    return 29
                    break;
            
                default:
                    return 30
                    break;
            }
        },
        changeType (e){
            this.showResult = false
            if (e.target.value == 'k')
                this.typeIsKhorshidi = true
            else
                this.typeIsKhorshidi = false 
        }
    },
    async created(){
        document.title='تولبو | محاسبه اختلاف دو تاریخ '
        await this.sendReq()
        this.db.push(dbG.dataBox[0].item[5])
        this.db.push(dbG.dataBox[0].item[6])
        this.db.push(dbG.dataBox[0].item[7])
        
        this.isShow = true
    },
    components:{navBarVue,footerVue,locationBarVue,toolsUsageVue,side ,loader}
}
</script>
<template>
    <loader v-show="!isShow"/>
    <div v-show="isShow">
        <navBarVue/>
        <locationBarVue title="محاسبه اختلاف دو تاریخ" PN="زمان" PNR="/time"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="dark ? 'tool_D' : ''">
                <div class="title_tool">محاسبه اختلاف دو تاریخ شمسی و میلادی آنلاین </div>
                <div class="typeChange">
                    <div>نوع تاریخ:</div>
                    <div class="inputs">
                        <select @change="changeType">
                            <option value="k">بر اساس تاریخ خورشیدی</option>
                            <option value="m">بر اساس تاریخ میلادی</option>
                        </select>
                    </div>
                </div>
                <div class="typeChange">
                    <div class="tStart"> تاریخ شروع:</div>
                    <div class="inputs">
                        <div>
                            <div>سال:</div>
                            <input v-if="typeIsKhorshidi" required type="text" placeholder="سال" v-model="yearKS" @keypress="changer" @keypress.enter="convert">
                            <input v-else type="text" required placeholder="سال" v-model="yearMS" @keypress="changer" @keypress.enter="convert">
                        </div>
                        <div class="wFit">
                            <div>ماه:</div>
                            <select v-if="typeIsKhorshidi" :value="monthKS"  @change="changer('monthKS')" ref="monthKS">
                                <option v-for="month in monthK" :value="month">{{month}}</option>
                            </select>
                            <select v-else :value="monthMS"  @change="changer('monthMS')" ref="monthMS">
                                <option v-for="month in monthM" :value="month">{{month}}</option>
                            </select>
                        </div>
                        <div class="wFit">
                            <div>روز:</div>
                            <select v-if="typeIsKhorshidi" :value="dayKS" @change="changer('dayKS')" ref="dayKS">
                                <option v-for="i in is30or31(this.monthKS)">{{i}}</option>
                            </select>
                            <select v-else :value="dayMS" @change="changer('dayMS')" ref="dayMS">
                                <option v-for="i in is30or31(this.monthMS)">{{i}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="typeChange">
                    <div class="tEnd">تاریخ پایان:</div>
                    <div class="inputs">
                        <div>
                            <div>سال:</div>
                            <input v-if="typeIsKhorshidi" required type="text" placeholder="سال" v-model="yearKE" @keypress="changer" @keypress.enter="convert">
                            <input v-else type="text" required placeholder="سال" v-model="yearME" @keypress="changer" @keypress.enter="convert">
                        </div>
                        <div class="wFit">
                            <div>ماه:</div>
                            <select v-if="typeIsKhorshidi" :value="monthKE"  @change="changer('monthKE')" ref="monthKE">
                                <option v-for="month in monthK" :value="month">{{month}}</option>
                            </select>
                            <select v-else :value="monthME"  @change="changer('monthME')" ref="monthME">
                                <option v-for="month in monthM" :value="month">{{month}}</option>
                            </select>
                        </div>
                        <div class="wFit">
                            <div>روز:</div>
                            <select v-if="typeIsKhorshidi" :value="dayKE" @change="changer('dayKE')" ref="dayKE">
                                <option v-for="i in is30or31(this.monthKE)">{{i}}</option>
                            </select>
                            <select v-else :value="dayME" @change="changer('dayME')" ref="dayME">
                                <option v-for="i in is30or31(this.monthME)">{{i}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <button class="bn632-hover" @click="convert">محاسبه</button>
                <div class="Result" :class="dark?'Result_D':''" v-show="showResult && !isErr.status">
                    <div class="sResult" v-show="sYearK != 0 && typeIsKhorshidi">
                        <span>{{sYearK}}</span>سال <span></span>
                    </div>
                    <div class="sResult" v-show="sMonthK != 0 && typeIsKhorshidi">
                        <span v-show="sYearK != 0">و</span><span>{{sMonthK}}</span> ماه <span></span>
                    </div>
                    <div class="sResult" v-show="sDayK != 0 && typeIsKhorshidi">
                        <span v-show="sMonthK != 0">و</span><span>{{sDayK}}</span>روز<span></span>
                    </div>

                    <div class="sResult" v-show="sYearM != 0 && !typeIsKhorshidi">
                        <span>{{sYearM}}</span>سال <span></span>
                    </div>
                    <div class="sResult" v-show="sMonthM != 0 && !typeIsKhorshidi">
                        <span v-show="sYearM != 0">و</span><span>{{sMonthM}}</span> ماه <span></span>
                    </div>
                    <div class="sResult" v-show="sDayM != 0 && !typeIsKhorshidi">
                        <span v-show="sMonthM != 0">و</span><span>{{sDayM}}</span>روز<span></span>
                    </div>
                </div>
                <div class="Result" :class="dark?'Result_D':''" v-show="isErr.status">{{isErr.info}}</div>

            </div>
            <side/>
            <toolsUsageVue :db="db"/>
        </div>
        </div>
        <footerVue/>
    </div>
</template>
<style>
.typeChange{
    display: grid;
    grid-template-columns: 1fr 5fr;
    padding: 20px 0;
    align-items: end;
}
.inputs{
    text-align:right;
    display: flex;
    gap:40px;
}
.wFit select{
    width: 170px;
}
.tStart{
    color: #99c432;
}
.tEnd{
    color: #f4485a;
}
.Result{
    background-color: #f1f1f1;
    color: #3b82f6;
    font-size:21px;
    margin: 10px 33px;
    padding:30px;
    border: 1px solid rgba(0, 0, 0, 0.186);
    border-radius:4px;
     display: flex;
    justify-content: center;
}
.Result_D{
    background-color: #0E2337;
    border: 1px solid #3b82f633;
}
.sResult{
    display: flex;
    gap:6px;
}
@media screen and (max-width:1330px){
    .inputs {
        gap: 17px;
    }    
    .Result{
        padding: 21px;
    }
}
@media screen and (max-width:1150px){
    .wFit select {
        width: 160px;
    }
}
@media screen and (max-width:1090px){
    input{
        padding: 0;
    }
}
@media screen and (max-width:1040px){
    .tool{
        padding-bottom: 10px;
    }
}
@media screen and (max-width:940px){
    .tool{
        font-size: 17px;
    }
    .inputs{
        gap:8px;
    }
    .wFit select {
        width: 140px;
    }
    select, input {
        font-size: 17px;
    }
    .Result {
        font-size: 20px;
    }
}
@media screen and (max-width:740px){
    .tool{
        font-size: 16px;
    }
    .inputs{
        gap:5px;
    }
    input{
        width: 150px;
    }
    select, input {
        font-size: 16px;
    }
    .Result {
        font-size: 19px;
    }
    .bn632-hover{
        font-size: 15px;
        padding: 5px 30px;
        height: 38px;
    }
}
@media screen and (max-width:640px){
    .tool{
        font-size: 15px;
    }
    input{
        width: 140px;
    }
    .wFit select {
        width: 130px;
    }
    select, input {
        font-size: 15px;
    }
    .bn632-hover{
        font-size: 15px;
        height: 37px;
    }
    .Result {
        font-size: 18px;
        padding: 16px;
    }
}
@media screen and (max-width:540px){
    .tool{
        font-size: 13px;
    }
    .typeChange{
        align-items: center;
    }
    .wFit select {
        width: 100px;
    }
    input{
        width: 100px;
    }
    .Result {
        font-size: 15px;
        padding: 16px;
    }
    .bn632-hover{
        font-size: 13px;
        height: 35px;
        border-radius: 7px;
    }
}
@media screen and (max-width:440px){
    .tool{
        font-size: 12px;
    }
    .wFit select {
        width: 90px;
    }
    input{
        width: 90px;
    }
    select, input {
        font-size: 14px;
    }
    .bn632-hover{
        font-size: 12px;
        height: 33px;
        border-radius: 5px;
    }
}
</style>