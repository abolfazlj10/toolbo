<script>
import loader from '../../../components/loader.vue'
import navBar from '../../../components/navBar.vue'
import footerBox from '../../../components/footer.vue'
import locationBar from '../../../components/locationBar.vue'
import side from '../../../components/sidePage.vue'
import toolsUsage from '../../../components/toolsUsage.vue'
import dbG from '../../../data/db.json'
import { inject } from 'vue'
export default {
    data (){
        return {
            db:[],
            hour:null,
            shamsiN:null,
            shamsiT:null,
            miladiN:null,
            miladiT:null,
            ghamariN:null,
            ghamariT:null,
            events:null,
            unix:0,
            checkNowDate:null,
            isShowTime:true,
            navDayN:0,
            navDayB:0,
            isShow:false,
            monthM:['January','February','March','April','May','June','July','August','September','October','November','December'],
            DayM:['','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
            monthg:['محرم','صفر','ربیع‌الاول','ربیع‌الثانی','جمادی‌الاول','جمادی‌الثانی','رجب','شعبان','رمضان','شوال','ذیقعده','ذیحجه'],
            DayG:['','الأَحَد','الاثنین','الثلاثاء','الأربعاء','الخمیس','الالجمعة','السبت'],
        }
    },
    setup(){
        const dark = inject("dark")
        return{dark}
    },
    methods:{
        hourDate(){
                let hour = new Date

                if (hour.getSeconds() < 10 && hour.getMinutes() < 10 && hour.getHours() < 10)
                    // 00 : 06 : 01
                    this.hour = '0'+ hour.getSeconds()+' :  0'+ hour.getMinutes()+' :  0'+hour.getHours()
                else if (hour.getSeconds() < 10 && hour.getMinutes() < 10)
                    // 22 : 15 : 45
                    this.hour = '0'+ hour.getSeconds()+' :  0'+ hour.getMinutes()+' : '+hour.getHours()
                else if (hour.getSeconds() < 10 && hour.getHours() < 10)
                    // 00 : 20 : 05
                    this.hour = '0'+ hour.getSeconds()+' : '+ hour.getMinutes()+' : 0'+hour.getHours()
                else if (hour.getMinutes() < 10 && hour.getHours() < 10)
                    //00 : 06 : 57
                    this.hour = hour.getSeconds()+' : 0'+ hour.getMinutes()+' : 0'+hour.getHours()
                else if (hour.getMinutes() < 10)
                    // 23 : 06 : 35
                    this.hour = hour.getSeconds()+' : 0'+ hour.getMinutes()+' : ' + hour.getHours()
                else if (hour.getSeconds() < 10)
                    // 23 : 45 : 01
                    this.hour = '0'+hour.getSeconds()+' : '+ hour.getMinutes()+' : ' + hour.getHours()
                else if (hour.getHours() < 10)
                    // 00 : 15 : 45
                    this.hour = hour.getSeconds()+' : '+ hour.getMinutes()+' :  0'+hour.getHours()
                else 
                    // 15 : 30 : 16
                    this.hour = hour.getSeconds() + ' : '+ hour.getMinutes() + ' : ' + hour.getHours()
        },
        async sendReq(status){
            // statusUnix =>  a = after  b = before   else = now
            this.events = null
            if(status == 'a'){
                this.navDayN++
                this.navDayB--
                this.unix += 86400
                try{
                    const send = await fetch('https://api.keybit.ir/time/?timestamp='+this.unix)
                    const data = await send.json()
                    this.chckDateNow(data.date.other.gregorian.iso.en)
                    this.bodyFetch(data)
                }catch(err){console.log(err)}
            }else if (status == 'b'){
                this.navDayN--
                this.navDayB++
                this.unix -= 86400
                try{
                    const send = await fetch('https://api.keybit.ir/time/?timestamp='+this.unix)
                    const data = await send.json()
                    this.chckDateNow(data.date.other.gregorian.iso.en)
                    this.bodyFetch(data)
                }catch(err){console.log(err)}
            }else{
                try{
                    const send = await fetch('https://api.keybit.ir/time/')
                    const data = await send.json()
                        this.navDayN=0
                        this.navDayB=0
                        if(this.checkNowDate == null)
                        this.checkNowDate = data.date.other.gregorian.iso.en
                        this.chckDateNow(data.date.other.gregorian.iso.en)
                        this.unix = data.unix.en
                        this.bodyFetch(data)
                }catch(err){console.log(err)}
            }
        },
        bodyFetch (data){
            var dateL = new Date
            // shamsi
            this.shamsiN = data.date.full.official.iso.en
            this.shamsiT = data.date.weekday.name+' ، '+data.date.day.number.en+' '+data.date.month.name+ ' '+data.date.year.number.en
            // miladi
            this.miladiN = data.date.other.gregorian.iso.en
            let dashLastMiladi = this.miladiN.lastIndexOf('-',)
            let dayMiladi = this.miladiN.slice(dashLastMiladi+1) 
            this.miladiT = this.DayM[data.date.weekday.number.en]+' ، '+dayMiladi+' '+ this.monthM[dateL.getMonth()]+' '+dateL.getFullYear()
            //ghamari
            this.ghamariN = data.date.other.ghamari.iso.en
            // gereftan mah ghamari ba index  this.ghamariN = 1444-5-8  (5)
            let dashFirst = this.ghamariN.indexOf('-')+1
            let dashLast = this.ghamariN.indexOf('-',dashFirst+1)
            let monthG = this.ghamariN.slice(dashFirst,dashLast) 
            this.ghamariT = this.DayG[data.date.weekday.number.en]+' ، '+(this.ghamariN.slice(dashLast+1))+' '+this.monthg[monthG-1] +' '+this.ghamariN.slice(0,dashFirst-1)

            //events day
            this.events = data.date.day.events.local.text
            this.events +=' - '+data.date.day.events.global.text
        },
        chckDateNow(date){
            if(this.checkNowDate == date)
                this.isShowTime = true
            else
                this.isShowTime = false
        }
    },
    async created(){
        document.title='تولبو | تاریخ امروز'
        this.hourDate()
        setInterval(() => {
            this.hourDate()
        }, 1000);
        this.db.push(dbG.dataBox[0].item[1])
        this.db.push(dbG.dataBox[0].item[2])
        this.db.push(dbG.dataBox[0].item[3])
        await this.sendReq()
        this.isShow = true
    },
    components:{locationBar,side,toolsUsage,navBar,footerBox,loader}
}
</script>
<template>
    <loader v-show="!isShow"/>
    <div v-show="isShow">
        <navBar/>
        <locationBar title="تاریخ امروز" PN="زمان" PNR="/time"/>
        <div class="container_m"  v-show="shamsiT != null">
            <div class="c_tools">
            <div class="tool" :class="dark ? 'tool_D' : ''">
                <div class="title_tool">تاریخ خورشیدی ، میلادی و قمری امروز به همراه ساعت ایران</div>
                <div class="hourBox bb">
                    <div>ساعت جاری ایران</div>
                    <div class="hour">{{this.hour}}</div>
                </div>
                <div>
                    <span v-if="isShowTime">تاریخ امروز ایران</span>
                    <div v-if="(!isShowTime && navDayN > 0)">تاریخ {{this.navDayN}} روز بعد</div>
                    <div v-if="(!isShowTime && navDayN < 0)">تاریخ {{this.navDayB}} روز قبل</div>
                    <div class="dateIr bb">
                        <div class="g-1">{{this.shamsiT}}</div>
                        <div class="g-1 colorDN">{{this.shamsiN}}</div>
                    </div>
                    <div class="dateIr bb">
                        <div class="g-1">{{this.ghamariT}}</div>
                        <div class="g-1 colorDN">{{this.ghamariN}}</div>
                    </div>
                    <div class="dateIr bb">
                        <div class="g-1">{{this.miladiT}}</div>
                        <div class="g-1 colorDN">{{this.miladiN}}</div>
                    </div>
                    <div class="dateIr bb">{{(this.events || '-')}}</div>
                    <div class="days">
                        <div class="btnDay" @click="this.sendReq('b')">
                            <div class="fontIcon">&#xe905;</div>
                            <div>روز قبل</div>
                        </div>
                        <div class="btnDay" @click="this.sendReq()">
                            <div class="fontIcon">&#xe906;</div>
                            <div>بازگشت به امروز</div>
                        </div>
                        <div class="btnDay" @click="this.sendReq('a')">
                            <div>روز بعد</div>
                            <div class="fontIcon">&#xe907;</div>
                        </div>
                    </div>
                </div>
            </div>
            <side/>
            <toolsUsage :db="db"></toolsUsage>
        </div>
        </div>
        <footerBox/>
    </div>
</template>
<style scoped>
.hour{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif, Courier, monospace;
    font-weight: bold;
    color: #99c432;
}
.bb{
    border-bottom: 1px solid rgba(0, 0, 0, 0.252);
    padding:9px 0 !important;
}
.dateIr{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 120px;
}
.g-1{
    flex-grow: 1;
}
.days{
    display: flex;
    justify-content: space-between;
    padding: 9px 15px;
    cursor: pointer;
    font-size: 15px;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
}
.btnDay{
    display: flex;
    gap: 5px;
}
.colorDN{
    color: #3b82f6;
}
@media screen and (max-width:1330px) {
    .c_tools{
        grid-template-columns: 1fr 1fr .8fr;
        gap:0;
    }
    .tool{
        grid-column: 1/4;
    }
    .side{
        order:2;
        margin:30px auto 0 auto !important;
    }
    .toolsUsage{
        grid-column: 1/3;
    }
}
@media screen and (max-width:1090px) {
    .title{
        font-size: 17px;
    }
    .c_tools{
        display: block;
    }
    .side{
        order:0;
    }
}
@media screen and (max-width:840px) {
    .c_tools{
        margin: 37px 20px;
    }
    .tool{
        font-size: 16px;
    }
    .bb{
        padding: 5px 0 !important;
    }
    .days{
        font-size: 13px;
    }
}
@media screen and (max-width:640px) {
    .tool{
        font-size: 13px;
    }
    .bb{
        padding: 4px 0 !important;
    }
    .days{
        font-size: 10px;
    }
    .c_tools{
        margin: 20px 0;
    }
}
@media screen and (max-width:540px) {
    .title_tool {
        font-size: 13px;
    }
}
@media screen and (max-width:440px) {
    .title_tool {
        font-size: 11px;
    }
    .tool{
        font-size: 12px;
    }
}
</style>