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
            isShow : false,
            isShowResult:false,
            yearNS:null,
            monthNS:null,
            dayNS:null,
            yearNM:null,
            monthNM:null,
            dayNM:null,
            yearSFixK:null,
            monthSFixK:null,
            daySFixK:null,
            yearSFixM:null,
            monthSFixM:null,
            dayMFix:null,
            resultSpaceYK:0,
            resultSpaceMK:0,
            resultSpaceDK:0,
            resultSpaceYM:0,
            resultSpaceMM:0,
            resultSpaceDM:0,
            errInputDate:{statusErr:false,info:""},
            SGMDateT:null,
            dateBirth:null,
            typeYearBirth:null,
            second:null,
            minute:null,
            hour:null,
            day:null,
            week:null,
            month:null,
            type:'shamsi',
            db:[],
            monthS : ["فروردین",'اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'],
            monthM:['January','February','March','April','May','June','July','August','September','October','November','December'],
        }
    },
    setup(){
        const dark = inject("dark")
        return{dark}
    },
    methods:{
        async sendReq(){
            const send = await fetch('https://api.keybit.ir/time/')
            const data = await send.json()
            this.dayNS = data.date.day.number.en
            this.yearNS = Number(data.date.year.number.en)
            this.monthNS = data.date.month.name
            // date fix
            this.yearSFixK = Number(data.date.year.number.en)
            this.monthSFixK = this.getIndexMonth(data.date.month.name,'k')
            this.daySFixK =Number(data.date.day.number.en)
            
            let miladiN = data.date.other.gregorian.iso.en
            let dashFirstMiladi = miladiN.indexOf('-',)
            let dashLastMiladi = miladiN.lastIndexOf('-',)
            let numberMonth = miladiN.slice((dashFirstMiladi+1),dashLastMiladi)
            this.dayNM = miladiN.slice(dashLastMiladi+1) 
            this.yearNM = Number(miladiN.slice(0,dashFirstMiladi))
            this.monthNM = this.monthM[numberMonth-1]

            this.yearSFixM = this.yearNM
            this.monthSFixM = this.getIndexMonth(this.monthM[numberMonth-1])
            this.dayMFix = Number(this.dayNM)
        },
        returnValue(o){
            if(o == 'day'){
                if(this.type == 'shamsi')
                    return this.dayNS
                else
                    return this.dayNM
            }else{
                if(this.type == 'shamsi')
                    return this.monthNS
                else
                    return this.monthNM
            }
        },
        changerType(e){
            this.isShowResult = false

            this.resultSpaceYK = 0
            this.resultSpaceMK = 0
            this.resultSpaceDK = 0
            this.resultSpaceYM = 0
            this.resultSpaceMM = 0
            this.resultSpaceDM = 0

            this.type = e.target.value
        },
        async convertor(){   
            try{
                // get index month --output  azar => 8 => 8+1 => 9 = azar
                // request
                let month = this.type == "shamsi"?this.monthS:this.monthM
                let monthN = this.type == "shamsi"?this.monthNS:this.monthNM
                
                var m = month.findIndex((e)=>{
                    return e == monthN
                })
                if(m<=8)
                    m = '0'+(m+1)
                else
                    m++
                if(this.type == 'shamsi'){
                    var send = await fetch(`https://codingtools.ir/api/v1/service/date-converter?to=miladi&from=date&date=${this.yearNS}/${m}/${this.dayNS}&time=23:00:00`)
                    var data = await send.json()

                    var date = new Date(data.date)
                    date = date.getTime() / 1000
                }else{
                    let test = this.yearNM+'/'+m+'/'+this.dayNM
                    
                    var date = new Date(test)
                    date = date.getTime() / 1000
                }
                await this.sendReqUnix(date);
                // convert date to unix -- output 2022/12/18 => 1671309000
            }catch(err){console.log(err)}
        },
        changer(type){
            this.isShowResult = false
            if(type == 'day'){
                if(this.type == 'shamsi')
                    this.dayNS = this.$refs.day.value
                else
                this.dayNM = this.$refs.day.value
            }else if(type == 'month'){
                if(this.type == 'shamsi'){
                    this.monthNS = this.$refs.month.value
                    if(this.dayNS == 31 && this.is30or31(this.monthNS) == 30)
                        this.dayNS--
                    else if(this.dayNS == 31 && this.is30or31(this.monthNS) == 29)
                        this.dayNS -=2
                }else{
                    this.monthNM = this.$refs.month.value
                    if(this.dayNM == 31 && this.is30or31(this.monthNM) == 30)
                        this.dayNM--
                    else if(this.dayNM == 31 && this.is30or31(this.monthNM) == 29)
                        this.dayNM -=2
                }
            }
        },
        async sendReqUnix(un){
            try{
                // input 1384/03/13
                this.convert()
                // output 17 year 7 month 27 day
                const send = await fetch('https://api.keybit.ir/time/?timestamp='+un)
                const data = await send.json()
                this.isShowResult = true
                // shamsi
                
                // miladi
                let miladiN = data.date.other.gregorian.iso.en
                let dashFirstMiladi = miladiN.indexOf('-',)
                let dashLastMiladi = miladiN.lastIndexOf('-',)
                let numberMonth = miladiN.slice((dashFirstMiladi+1),dashLastMiladi)
                let dayNMiladi = miladiN.slice(dashLastMiladi+1) 
                let yearNMiladi = miladiN.slice(0,dashFirstMiladi)
                let miladiT = dayNMiladi+'-'+numberMonth+'-'+yearNMiladi
                
                // //ghamari
                let ghamariN = data.date.other.ghamari.iso.en
                // gereftan mah ghamari ba index  this.ghamariN = 1444-5-8  (5)
                let dashFirst = ghamariN.indexOf('-')+1
                let dashLast = ghamariN.indexOf('-',dashFirst+1)
                let monthG = ghamariN.slice(dashFirst,dashLast) 
                let dayNGhamari = (ghamariN.slice(dashLast+1)-1)
                let ghamariT = dayNGhamari+'-'+monthG+'-'+ghamariN.slice(0,dashFirst-1)

                // birth
                let birth = (this.yearSFixK+1)+'/'+data.date.month.number.en+'/'+this.dayNS
                let khorshidi = data.date.day.number.en+'-'+data.date.month.number.en+ '-'+data.date.year.number.en

                let yearUser = this.type == 'shamsi'?this.resultSpaceYK:this.resultSpaceYM
                yearUser++
                    
                this.SGMDateT = `<span style=color:#3b82f6 !important;>${data.date.weekday.name}،${khorshidi}</span> شمسی معادل <span style=color:#3b82f6 !important;>${miladiT}</span> میلادی و <span style=color:#3b82f6 !important;>${ghamariT}</span> قمری است.`
                this.dateBirth = `<span style=color:#dc3545 !important;>${yearUser}</span> سالگی شما در تاریخ <span style=color:#3b82f6 !important;>${birth}</span> تمام میشود و باید شمع <span style=color:#dc3545 !important;>${yearUser}</span> را روی کیک قرار دهید.`
                this.typeYearBirth = `<span style=color:#dc3545 !important;>${data.date.year.number.en}</span> سال <span style=color:#3b82f6 !important;>${data.date.year.animal} </span> است.`
                let y = this.type == 'shamsi'? this.resultSpaceYK : this.resultSpaceYM
                let m = this.type == 'shamsi'? this.resultSpaceMK : this.resultSpaceMM
                let d = this.type == 'shamsi'? this.resultSpaceDK : this.resultSpaceDM
                let hu = new Date().getHours()
                let mi = new Date().getMinutes()
                let se = new Date().getSeconds()
                
                this.second = `<span style=color:#3b82f6 !important;>${((y*31536000)+(m*2628000)+(d*86400)+(hu*3600)+(mi*60)+se)} ثانیه </span> از ${khorshidi} گذشته است.`
                this.minute = `<span style=color:#3b82f6 !important;>${((y*525600)+(m*43800)+(d*1440)+(hu*60)+se)} دقیقه</span> از ${khorshidi} گذشته است.`
                this.hour = `<span style=color:#3b82f6 !important;>${((y*8760)+(m*730 )+(d*24)+hu)}ساعت</span> از ${khorshidi} گذشته است.`
                this.day = `<span style=color:#3b82f6 !important;>${((y*365)+(m*30 )+d)} روز </span>از  ${khorshidi} گذشته است.`
                this.week = `<span style=color:#3b82f6 !important;>${((y*52)+(m*4)+(Math.floor(d/7)))} هفته</span> و ${(d%7)} روز از ${khorshidi} گذشته است.`
                this.month = `<span style=color:#3b82f6 !important;>${((y*12)+m)} ماه</span> از ${khorshidi} گذشته است.`

            }catch(err){console.log(err)}
        },
        getIndexMonth(mon,t){
            if(t == "k"){
                var m = this.monthS.findIndex((e)=>{
                    return e == mon
                })
            }else{
                var m = this.monthM.findIndex((e)=>{
                    return e == mon
                }) 
            }
            m++
            return m
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
        convert (){
            if(this.type == 'shamsi'){
                this.resultSpaceMK = this.monthSFixK - this.getIndexMonth(this.monthNS,'k') // 10(دی) - 12 (اسفند) =>
    
                if(this.resultSpaceMK == 1 && Number(this.dayNS) >= this.daySFixK){
                    if(Number(this.dayNS) != this.daySFixK){
                        this.resultSpaceMK--
                    }
                }else if (this.resultSpaceMK != 1 && Number(this.dayNS) > this.daySFixK){
                    this.resultSpaceMK--
                }
                
                if(this.resultSpaceMK < 0){
                    this.resultSpaceMK += 12
                    this.resultSpaceYK = this.yearSFixK - this.yearNS
                    this.resultSpaceYK--
                }else
                    this.resultSpaceYK = this.yearSFixK - this.yearNS
    
                this.resultSpaceDK = 30 - this.dayNS + this.daySFixK
                
                if(this.resultSpaceDK >= 30){
                    this.resultSpaceDK -= 30
                    
                }else{
                    if(this.is30or31(this.monthNS) == 31){
                        this.resultSpaceDK++
                    }else if(this.is30or31(this.monthNS) == 29){
                        this.resultSpaceDK--
                    }
                }
                // zaman aiandeh show erorr
                if(this.yearNS == this.yearSFixK && this.monthSFixK < this.getIndexMonth(this.monthNS,'k'))
                    this.errInputDate = {statusErr:true,info:'زمان آینده انتخاب شده است .'}
                else if(this.yearNS > this.yearSFixK)
                    this.errInputDate = {statusErr:true,info:'زمان آینده انتخاب شده است .'}
                else if(this.daySFixK == Number(this.dayNS) && this.monthSFixK == this.getIndexMonth(this.monthNS,'k') && this.yearNS >= this.yearSFixK)
                    this.errInputDate = {statusErr:true,info:'زمان جاری انتخاب شده است .'}
                else if(this.daySFixK <= Number(this.dayNS) && this.monthSFixK == this.getIndexMonth(this.monthNS,'k') && this.yearNS >= this.yearSFixK)
                    this.errInputDate = {statusErr:true,info:'زمان آینده انتخاب شده است .'}
                else
                    this.errInputDate.statusErr = false 

            }else{
                this.resultSpaceMM = this.monthSFixM - this.getIndexMonth(this.monthNM) // 10(دی) - 12 (اسفند) =>
    
                if(this.resultSpaceMM == 1 && Number(this.dayNM) >= this.dayMFix){
                    if(Number(this.dayNM) != this.dayMFix){
                        this.resultSpaceMM--
                    }
                }else if (this.resultSpaceMM != 1 && Number(this.dayNM) > this.dayMFix){
                    this.resultSpaceMM--
                }
                
                if(this.resultSpaceMM < 0){
                    this.resultSpaceMM += 12
                    this.resultSpaceYM = this.yearSFixM - this.yearNM
                    this.resultSpaceYM--
                }else
                    this.resultSpaceYM = this.yearSFixM - this.yearNM
    
                this.resultSpaceDM = 30 - this.dayNM + this.dayMFix

                if(this.resultSpaceDM >= 30)
                    this.resultSpaceDM -= 30

                // zaman aiandeh show erorr
                if(this.yearNM == this.yearSFixM && this.monthSFixM < this.getIndexMonth(this.monthNM))
                    this.errInputDate = {statusErr:true,info:'زمان آینده انتخاب شده است .'}
                else if(this.yearNM > this.yearSFixM)
                    this.errInputDate = {statusErr:true,info:"زمان آینده انتخاب شده است."}
                else if(this.dayMFix == Number(this.dayNM) && this.monthSFixM == this.getIndexMonth(this.monthNM) && this.yearNM >= this.yearSFixM)
                    this.errInputDate = {statusErr:true,info:"زمان جاری انتخاب شده است ."}
                else if(this.dayMFix <= Number(this.dayNM) && this.monthSFixM == this.getIndexMonth(this.monthNM) && this.yearNM >= this.yearSFixM)
                    this.errInputDate = {statusErr:true,info:"زمان آینده انتخاب شده است ."}
                else
                    this.errInputDate.statusErr = false
                    
            }
        },
    },
    async created(){
        document.title='تولبو | محاسبه سن '
        await this.sendReq()
        this.db.push(dbG.dataBox[0].item[2])
        this.db.push(dbG.dataBox[0].item[4])
        this.db.push(dbG.dataBox[0].item[5])
        this.isShow = true
    },
    components:{navBarVue,footerVue,locationBarVue,toolsUsageVue,side ,loader}
}
</script>
<template>
    <loader v-show="!isShow"/>
    <div v-show="isShow">
        <navBarVue/>
        <locationBarVue title="محاسبه سن" PN="زمان" PNR="/time"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="[(!isShowResult?'heightResult':''),(isShowResult && errInputDate.statusErr?'heightErr':''),(dark ? 'tool_D':'')]">
                <div class="title_tool">محاسبه دقیق سن میلادی ، سن نوزاد ، ازدواج و...</div>
                <div class="inputs">
                    <div>
                        <div class="title">نوع تبدیل:</div>
                        <select class="wFit" @change="changerType">
                            <option value="shamsi">بر اساس تقویم خورشیدی</option>
                            <option value="miladi">بر اساس تقویم میلادی</option>
                        </select>
                    </div>
                    <div>
                        <div class="title">سال:</div>
                        <input v-if="type=='shamsi'" class="wFit" type="text" v-model="yearNS" @keydown.enter="convertor" @keydown="changer">
                        <input v-else class="wFit" type="text" v-model="yearNM" @keydown.enter="convertor" @keydown="changer">
                    </div>
                    <div>
                        <div class="title">ماه:</div>
                        <select class="wFit" :value="returnValue('month')" @change="changer('month')" ref="month">
                            <option v-if="type == 'shamsi'" v-for="month in monthS">{{month}}</option>
                            <option v-else v-for="month in monthM">{{month}}</option>
                        </select>
                    </div>
                    <div>
                        <div class="title">روز:</div>
                        <select class="wFit" :value="returnValue('day')" @change="changer('day')" ref="day">
                            <option v-if="type == 'shamsi'" v-for="i in is30or31(monthNS)">{{i<10?'0'+i:i}}</option>
                            <option v-else v-for="i in is30or31(monthNM)">{{i<10?'0'+i:i}}</option>
                        </select>
                    </div>
                </div>
                <div class="btnC">
                    <button @click="convertor" class="bn632-hover">تبدیل</button>
                </div>
                <div class="result" :class="dark ? 'result_D':''" v-show="isShowResult && !errInputDate.statusErr">
                    <div class="TitRes">
                        <div class="titleShow">نتیجه</div>
                        <div class="space bb" style="color:#3b82f6;">
                            <div class="dateSpace" v-show="resultSpaceYK != 0 || resultSpaceYM != 0">
                                <div v-if="type == 'shamsi'" v-html="resultSpaceYK"></div>
                                <div v-else v-html="resultSpaceYM"></div>
                                <div>سال</div>
                            </div>
                            <div class="dateSpace" v-show="resultSpaceMK != 0 || resultSpaceMM != 0">
                                <span>و</span>
                                <div v-if="type == 'shamsi'" v-html="resultSpaceMK"></div>
                                <div v-else v-html="resultSpaceMM"></div>
                                <div>ماه</div>
                            </div>
                            <div class="dateSpace" v-show="resultSpaceDK != 0 || resultSpaceDM != 0">
                                <span>و</span>
                                <div v-if="type == 'shamsi'" v-html="resultSpaceDK"></div>
                                <div v-else v-html="resultSpaceDM"></div>
                                <div>روز</div>
                            </div>
                        </div>
                        <div class="bb" v-html="SGMDateT"></div>
                        <div class="bb" v-html="dateBirth"></div>
                        <div class="bb" v-html="typeYearBirth"></div>
                        <div class="bb" v-html="second"></div>
                        <div class="bb" v-html="minute"></div>
                        <div class="bb" v-html="hour"></div>
                        <div class="bb" v-html="day"></div>
                        <div class="bb" v-html="week"></div>
                        <div class="bb" v-html="month" style="border:none"></div>
                    </div>
                </div>
                <div class="boxErr result" :class="dark ? 'boxErr_D':''" v-show="isShowResult && errInputDate.statusErr">
                    <div class="titleShow">هشدار</div>
                    <div class="txtErr">{{errInputDate.info}}</div>
                </div>
            </div>
            <side/>
            <toolsUsageVue :db="db"/>
        </div>
        </div>
        <footerVue/>
    </div>
</template>
<style scoped>
.tool{
    display: grid;
    grid-template-rows: .5fr .5fr 90px 5fr;
}
.heightResult{
    height: 200px;
}
.heightErr{
    height: 300px;
}
.inputs{
    display: grid;
    grid-template-columns: repeat(4,1fr);
    gap:25px;
    padding: 10px;
}
.wFit{
    width: 100%;
    height: 29px;
}
.title{
    text-align: right;
}
.result{
    background-color: #f1f1f1;
    border-radius: 7px;
    margin: 5px 10px;
    border:1px solid rgba(0, 0, 0, 0.263);
    transition: all .3s ease-in-out;
}
.result_D{
    background-color: #0e2338;
}
.TitRes{
    text-align: right;
}
.btnC{
    display: flex;
    align-items: center;
    justify-content: center;
}
.space{
    display: flex;
    justify-content: center;
    gap:4px;
}
.dateSpace{
    display: flex;
    gap:6px;
}
.bb{
    border-bottom:1px solid rgba(0, 0, 0, 0.263);
    margin: 0 10px;
    padding: 7px 5px;
}
.titleShow{
    background-color:#3b82f6;
    color:#fff;
    text-align: center;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    padding:3px 0;
}
.Hilight{
    color:#3b82f6 !important;
}
.boxErr{
    display: grid;
    grid-template-rows: .8fr 1fr;
}
.boxErr_D{
    background-color: #0E2337;
}
.txtErr{
    display: flex;
    justify-content: center;
    align-items: center;
}
@media screen and (max-width:940px){
    .c_tools{
        margin: 37px 70px;
    }    
}
@media screen and (max-width:740px){
    .tool{
        font-size: 15px;
    }
    .title{
        font-size: 16px;
    }
    select, input {
        font-size: 15px;
    }
    .tool{
        grid-template-rows: .5fr .4fr 60px 5fr;
    }
    .bn632-hover{
        height: 35px;
        font-size: 15px;
        padding: 5px 30px;
        border-radius: 7px;
    }
    .wFit{
        height: 24px;
    }
    .boxErr{
        grid-template-rows: .1fr .5fr;
        margin-top: 50px;
    }
    .txtErr{
        margin-top: 10px;
    }
}
@media screen and (max-width:640px){
    .c_tools{
        margin: 15px 0 !important;
    }   
    .bb{
        margin: 0 5px;
        padding: 7px 0;
    }
    .tool{
        font-size: 14px;
    }
}
@media screen and (max-width:540px){
    .tool{
        font-size: 13px;
        grid-template-rows: .5fr .4fr 50px 5fr;
    }
    .title{
        font-size: 15px;
    }
    .bn632-hover{
        height: 30px;
        font-size: 14px;
        padding: 5px 30px;
        border-radius: 5px;
    }
    .boxErr{
        margin-top: 70px;
    }
    .txtErr{
        margin-top: 15px;
    }
}
@media screen and (max-width:440px){
    .tool{
        font-size: 12px;
    }
    .bb{
        margin: 0 3px;
        padding: 7px 0;
    }
    .bn632-hover{
        font-size: 13px;
    }
}
</style>