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
    data(){
        return{
            isShow:false,
            yearNShamsi:null,
            yearNMiladi:null,
            yearNGhamari:null,
            dayNShamsi:null,
            dayNMiladi:null,
            dayNGhamari:null,
            monthNShamsi:null,
            monthNMialdi:null,
            monthNGhamari:null,
            shamsiN:null,
            shamsiT:null,
            miladiN:null,
            miladiT:null,
            ghamariN:null,
            ghamariT:null,
            replay:0,
            shamsiNFixe:null,
            miladiNFixe:null,
            ghamariNFixe:null,
            type:'shamsi',
            monthS : ["فروردین",'اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'],
            monthM:['January','February','March','April','May','June','July','August','September','October','November','December'],
            DayM:['','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
            monthg:['محرم','صفر','ربیع‌الاول','ربیع‌الثانی','جمادی‌الاول','جمادی‌الثانی','رجب','شعبان','رمضان','شوال','ذیقعده','ذیحجه'],
            DayG:['','الأَحَد','الاثنین','الثلاثاء','الأربعاء','الخمیس','الالجمعة','السبت'],
            db:[]
        }
    },
    setup(){
        const dark = inject("dark")
        return{dark}
    },
    methods:{
        async sendReqNow(){
            try{
                const send = await fetch('https://api.keybit.ir/time/')
                const data = await send.json()
                this.yearNShamsi = data.date.year.number.en
                this.dayNShamsi = data.date.day.number.en
                this.monthNShamsi = data.date.month.name
            }catch(err){console.log(err)}
        },
        async convertor(){   
            try{
                // get index month --output  azar => 8 => 8+1 => 9 = azar
                // request
                let month = this.type == "shamsi"?this.monthS:this.monthM
                let monthN = this.type == "shamsi"?this.monthNShamsi:this.monthNMialdi
                
                var m = month.findIndex((e)=>{
                    return e == monthN
                })
                if(m<=8)
                    m = '0'+(m+1)
                else
                    m++
                
                if(this.type == 'shamsi'){
                    var send = await fetch(`https://codingtools.ir/api/v1/service/date-converter?to=miladi&from=date&date=${this.yearNShamsi}/${m}/${this.dayNShamsi}&time=23:00:00`)
                    var data = await send.json()

                    let date = new Date(data.date)
                    date = date.getTime() / 1000
                    await this.sendReqUnix(date);
                }else{
                    let test = this.yearNMiladi+'/'+m+'/'+this.dayNMiladi
                    
                    let date = new Date(test)
                    date = date.getTime() / 1000
                    await this.sendReqUnix(date);
                }
                // convert date to unix -- output 2022/12/18 => 1671309000
            }catch(err){console.log(err)}
        },
        async sendReqUnix(un){
            try{
                const send = await fetch('https://api.keybit.ir/time/?timestamp='+un)
                const data = await send.json()
                // shamsi
                this.shamsiN = data.date.full.official.iso.en
                this.shamsiT = data.date.weekday.name+' ، '+data.date.day.number.en+' '+data.date.month.name+ ' '+data.date.year.number.en+' - سال '+data.date.year.animal
                // miladi
                this.miladiN = data.date.other.gregorian.iso.en
                let dashFirstMiladi = this.miladiN.indexOf('-',)
                let dashLastMiladi = this.miladiN.lastIndexOf('-',)
                let numberMonth = this.miladiN.slice((dashFirstMiladi+1),dashLastMiladi)
                this.dayNMiladi = this.miladiN.slice(dashLastMiladi+1) 
                this.yearNMiladi = this.miladiN.slice(0,dashFirstMiladi)
                this.monthNMialdi = this.monthM[numberMonth-1]
                this.miladiT = this.DayM[data.date.weekday.number.en]+' ، '+this.dayNMiladi+' '+this.monthNMialdi+' '+this.yearNMiladi
                //ghamari
                this.ghamariN = data.date.other.ghamari.iso.en
                // gereftan mah ghamari ba index  this.ghamariN = 1444-5-8  (5)
                let dashFirst = this.ghamariN.indexOf('-')+1
                let dashLast = this.ghamariN.indexOf('-',dashFirst+1)
                let monthG = this.ghamariN.slice(dashFirst,dashLast) 
                this.dayNGhamari = (this.ghamariN.slice(dashLast+1))
                this.yearNGhamari = this.ghamariN.slice(0,dashFirst-1)
                this.monthNGhamari = this.monthg[monthG-1]
                this.ghamariT = this.DayG[data.date.weekday.number.en]+' ، '+this.dayNGhamari+' '+this.monthNGhamari+' '+this.ghamariN.slice(0,dashFirst-1)
                // change day number ghamari 1444-5-8 => 1444-5-7
                let DayG = this.ghamariN.slice(dashLast+1)
                this.ghamariN = this.ghamariN.slice(0,dashLast+1)
                this.ghamariN += DayG
                if(this.replay == 0){
                    this.shamsiNFixe = this.shamsiN
                    this.ghamariNFixe = this.ghamariN
                    this.miladiNFixe = this.miladiN
                    this.replay++
                }
            }catch(err){console.log(err)}
        },
        changer(type){
            if(type == 'day'){
                if(this.type == 'shamsi')
                    this.dayNShamsi = this.$refs.day.value
                else
                this.dayNMiladi = this.$refs.day.value
            }else{
                if(this.type == 'shamsi')
                    this.monthNShamsi = this.$refs.month.value
                else
                    this.monthNMialdi = this.$refs.month.value
            }
        },
        changeType(e){
            this.type = e.target.value
        },
        returnValue(o){
            if(o == 'day'){
                if(this.type == 'shamsi')
                    return this.dayNShamsi
                else
                    return this.dayNMiladi
            }else{
                if(this.type == 'shamsi')
                    return this.monthNShamsi
                else
                    return this.monthNMialdi
            }
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
        }
    },
    async created(){
        document.title='تولبو | تبدیل تاریخ'
        await this.sendReqNow()
        await this.convertor()
        this.db.push(dbG.dataBox[0].item[1])
        this.db.push(dbG.dataBox[0].item[3])
        this.db.push(dbG.dataBox[0].item[4])
        this.isShow = true
    },
    components:{navBarVue,footerVue,locationBarVue,toolsUsageVue,side ,loader}
}
</script>
<template>
    <loader v-show="!isShow"/>
    <div v-show="isShow">
        <navBarVue/>
        <locationBarVue title="تبدیل تاریخ" PN="زمان" PNR="/time"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="dark ? 'tool_D' : ''">
                <div class="title_tool">تبدیل تاریخ آنلاین خورشید به میلادی </div>
                <div class="c_convert px-5">
                    <div class="convert">
                        <div class="menu">
                            <div>
                                <div class="titleInput">نوع تبدیل</div>
                                <select class="colorI" @change="changeType">
                                    <option value="shamsi">خورشیدی به میلادی و قمری</option>
                                    <option value="miladi">میلادی به خورشیدی و قمری</option>
                                </select>
                            </div>
                            <div>
                                <div class="titleInput">سال</div>
                                <input v-if="type=='shamsi'" class="colorI px-1" type="text" placeholder="سال مورد نظر را وارد کنید" v-model="yearNShamsi" @keydown.enter="convertor">
                                <input v-else class="colorI px-1" type="text" placeholder="سال مورد نظر را وارد کنید" v-model="yearNMiladi" @keydown.enter="convertor">
                            </div>
                            <div>
                                <div class="titleInput">ماه</div>
                                <select class="spaceS colorI" :value="returnValue()" @change="changer()" ref="month">
                                    <option v-if="type == 'shamsi'" v-for="month in monthS">{{month}}</option>
                                    <option v-else v-for="month in monthM">{{month}}</option>
                                </select>
                            </div>
                            <div>
                                <div class="titleInput">روز</div>
                                <select class="spaceS colorI" :value="returnValue('day')" @change="changer('day')" ref="day">
                                    <option v-if="type == 'shamsi'" v-for="i in is30or31(monthNShamsi)">{{i<10?'0'+i:i}}</option>
                                    <option v-else v-for="i in is30or31(monthNMialdi)">{{i<10?'0'+i:i}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="convertBtn">
                        <button @click="this.convertor" class="bn632-hover">تبدیل</button>
                    </div>
                </div>
                <div class="shower" :class="dark ? 'showe_D':''">
                    <div class="shamsi bb">
                        <div>{{shamsiT}}</div>
                        <div>{{shamsiN}}</div>
                    </div>
                    <div class="miladi bb">
                        <div>{{miladiT}}</div>
                        <div>{{miladiN}}</div>
                    </div>
                    <div class="ghamari bb">
                        <div>{{ghamariT}}</div>
                        <div>{{ghamariN}}</div>
                    </div>
                    <div class="allDate">
                        <div class="now">تاریخ امروز :</div>
                        <div>{{shamsiNFixe}}</div>|
                        <div>{{miladiNFixe}}</div>|
                        <div>{{ghamariNFixe}}</div>
                    </div>
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
.menu{
    display: flex;
    justify-content: space-around;
}
.spaceS{
    width: 106px;
    text-align: center;
}
select{
    background: white;
}
input::placeholder{
    font-size: 15px;
}
.tool{
    display: grid;
    grid-template-rows: .3fr 1fr 1.3fr;
    color:#495057;
}
.c_convert{
    display: grid;
    align-items: center;
    grid-template-rows: 76px 64px;
}
.shower{
    background-color: #f1f1f1;
    border-radius: inherit;
    border: 1px solid #0000002e;
    margin: 10px 111px;
    transition: all .3s ease-in-out;
}
.showe_D{
    background-color: #0e2338;
}
.bb{
    border-bottom: 1px solid rgba(0, 0, 0, 0.252);
    padding: 9px 36px !important;
    margin:0 10px;
    display: flex;
    justify-content: space-between;
}
.allDate{
    padding: 9px 5px !important;
    margin:0 10px;
    display: flex;
    justify-content: space-around;
}
.now{
    color: #3b82f6;
}
.colorI{
    color:#495057;
}
@media screen and (max-width: 1090px){
    .c_convert{
        grid-template-rows: 65px 64px;
    }
}
@media screen and (max-width: 940px){
    .tool{
        font-size: 17px;
    }
    select , input{
        font-size: 16px;
    }
}
@media screen and (max-width: 740px){
    select , input{
        font-size: 14px;
    }
    .c_tools{
        margin: 15px 0;
    }
    .shower{
        margin: 10px 70px;
    }
}
@media screen and (max-width: 640px){
    .menu{
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    input{
        width: 90%;
    }
    select{
        width: 94% !important;
    }
    .c_convert{
        grid-template-rows: 107px 66px;
    }
    .tool{
        grid-template-rows: .2fr 1fr 1.1fr;
        font-size: 16px;
    }
    .titleInput{
        font-size: 15px;
    }
    .bn632-hover{
        height: 38px;
        border-radius: 8px;
    }
    .shower{
        margin: 10px 5px;
    }
}
@media screen and (max-width: 540px){
    .tool{
        grid-template-rows: .2fr .9fr .9fr;
        font-size: 14px;
    }
    .bn632-hover{
        height: 30px;
        border-radius: 5px;
        font-size: 14px;
    }
    .c_convert{
        grid-template-rows: 107px 36px;
    }
    .shower{
        margin: 10px 5px 4px 5px;
    }
    .titleInput{
        font-size: 14px;
    }
}
@media screen and (max-width: 440px){
    .title_tool {
        font-size: 12px;
    }
    .titleInput{
        font-size: 12px;
    }
    .tool{
        grid-template-rows: .2fr .5fr .9fr;
        font-size: 12px;
    }
    select, input {
        font-size: 11px;
    }
    .bn632-hover{
        height: 28px;
        font-size: 12px;
        padding: 5px 30px;
    }
    .bb{
        padding: 8px 15px !important;
        margin: 0 5px;
    }
    .c_convert{
        grid-template-rows: 86px 36px;
    }
}
</style>