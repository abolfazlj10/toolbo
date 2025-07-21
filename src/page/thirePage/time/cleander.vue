<script>
import navBar from '../../../components/navBar.vue'
import footerBox from '../../../components/footer.vue'
import locationBar from '../../../components/locationBar.vue'
import side from '../../../components/sidePage.vue'
import toolsUs from '../../../components/toolsUsage.vue'
import loader from '../../../components/loader.vue'
import day from '../../../components/day_cleander.vue'
import dbG from '../../../data/db.json'
import { inject } from 'vue'
export default {
    data(){
        return{
            day:null,
            unix:null,
            today:null,
            todaySecond:null,
            isShow:false,
            db:[],
            events:[],
            sat:[],
            sun:[],
            mon:[],
            tue:[],
            wen:[],
            thu:[],
            fri:[],
            monthS : ["فروردین",'اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'],
            yearN:null,
            monthN:null,
            fixed:null
        }
    },
    setup(){
        const dark = inject("dark")
        return{dark}
    },
    methods:{
        async getDaysMonth (){
            try{
                // get unix one day month now for loop => الان 24 آذر => خروجی 1 آذر
                const send = await fetch('https://api.keybit.ir/time/')
                const data = await send.json()
                
                this.day = 86400 * (data.date.day.number.en-1)
                this.unix = data.unix.en - this.day
                this.today = data.date.day.number.en
                this.yearN = data.date.year.number.en
                this.monthN = data.date.month.name

                this.fixed = [data.date.year.number.en , data.date.month.name]
                
                this.sendReq(this.unix)
            }catch(err){console.log(err)}
        },
        async sendReq(un){
            try{
                const send = await fetch('https://api.keybit.ir/time/?timestamp='+un)
                const data = await send.json()
                
                this.getEvents(this.unix)
    
                let dayGhamari = this.getDays(data.date.other.ghamari.iso.en)
                let dayMiladi = this.getDays(data.date.other.gregorian.iso.en)
                this.unix += 86400
                let nameW = data.date.weekday.name
                let numDay = Number(data.date.day.number.en)
                let obj
                var holi = data.date.day.events.local
                    
                if (this.today == data.date.day.number.en){
                    obj = {
                        day : numDay,
                        dayM : dayMiladi,
                        dayG : dayGhamari,
                        dayC : true,
                        dayH : holi != null ? holi.holiday: false,
                    } 
                }else{
                    obj = {
                        day : numDay,
                        dayM : dayMiladi,
                        dayG : dayGhamari,
                        dayH : holi != null ? holi.holiday: false,
                    } 
                }
                switch (nameW) {
                    case 'شنبه':
                        this.sat.push(obj)
                        break;
                    case 'یکشنبه':
                        this.sun.push(obj)
                        break;
                    case 'دوشنبه':
                        this.mon.push(obj)
                        break;
                    case 'سه شنبه':
                        this.tue.push(obj)
                        break;
                    case 'چهارشنبه':
                        this.wen.push(obj)
                        break;
                    case 'پنجشنبه':
                        this.thu.push(obj)
                        break;
                    case 'جمعه':
                        this.fri.push(obj)
                        break;
                }
                if (numDay!=31) this.checkDaysMonth(numDay)
                
            }catch(err){console.log(err);}
        },

        getDays(date){
            // slice number Day 1444-5-14 => 14
            let dash = date.lastIndexOf('-',)
            let dateDay = date.slice(dash+1) 
            return Number(dateDay) 
        },
        async getEvents (d){
            // get date output => events it days add push in array
            try{
                const send = await fetch('https://api.keybit.ir/time/?timestamp='+d)
                const data = await send.json()
                this.events.push({
                    t:data.date.day.events.local.text,
                    h:data.date.day.events.local.holiday,
                    n:Number(data.date.day.number.en)
                })
            }catch(err){}
        },
        async checkDaysMonth(num){
            // check last day month ?29 ? 30 ? 31
            if(num <= 28){
                this.sendReq(this.unix)
            }else{
                if (num == 28 || num == 29 || num == 30){
                    try{
                        const send = await fetch('https://api.keybit.ir/time/?timestamp='+this.unix)
                        const data = await send.json()
                        let today = Number(data.date.day.number.en)
                        if(today == 31 || today == 30){
                            this.sendReq(this.unix)
                        }
                        this.isShow = true
                    }catch(err){}
                }
            }
        },
        async changer(o){
            if(o == 'year')
                this.yearN = this.$refs.year.value
            else 
                this.monthN = this.$refs.month.value
        },
        async changeCleander(){
            if(this.yearN == this.fixed[0]&&this.monthN == this.fixed[1]){
                this.today = this.todaySecond
            }else{
                this.todaySecond = this.today
                this.today = null
            }
            let m = this.monthS.findIndex((e)=>{
                return e == this.monthN
            })
            if(m<=8)
                m = '0'+(m+1)
            else
                m += 1
            var send = await fetch(`https://codingtools.ir/api/v1/service/date-converter?to=miladi&from=date&date=${this.yearN}/${m}/01&time=23:00:00`)
            var data = await send.json()

            this.unix = new Date(data.date)
            this.unix = this.unix.getTime() / 1000
            this.isShow = false
            this.emptyArr()
            await this.sendReq(this.unix);
            this.isShow = true
        },
        emptyArr(){
            this.sat = []
            this.sun = []
            this.mon = []
            this.tue = []
            this.wen = []
            this.thu = []
            this.fri = []
            this.events = []
        },
        async back(){
            if(this.yearN != this.fixed[0]|| this.monthN != this.fixed[1]){
                this.isShow = false
                this.emptyArr()
                await this.getDaysMonth()
                this.isShow = true
            }
        }
    },
    async created(){
        document.title='تولبو | تقویم'
        await this.getDaysMonth()
        this.db.push(dbG.dataBox[0].item[0])
        this.db.push(dbG.dataBox[0].item[2])
        this.db.push(dbG.dataBox[0].item[3])
    },
    components:{locationBar,side,toolsUs,loader,day,footerBox,navBar}
}
</script>
<template>
    <loader v-show="!isShow"/>
    <div v-show="isShow">
        <navBar/>
        <locationBar title="تقویم" PN="زمان" PNR="/time"/>
        <div class="container_m">
            <div class="c_tools">
                <div class="tool" :class="dark ? 'tool_D' : ''">
                    <div class="title_tool">تقویم آنلاین میلادی ، قمری و خورشیدی ایران</div>
                    <div class="week">
                        <div class="selection">
                            <select :value="yearN" @change="changer('year')" ref="year">
                                <option value="1402">1402</option>
                                <option value="1401">1401</option>
                                <option value="1400">1400</option>
                                <option value="1399">1399</option>
                                <option value="1398">1398</option>
                                <option value="1397">1397</option>
                                <option value="1396">1396</option>
                                <option value="1395">1395</option>
                                <option value="1394">1394</option>
                                <option value="1393">1393</option>
                                <option value="1392">1392</option>
                                <option value="1391">1391</option>
                                <option value="1390">1390</option>
                            </select>
                            <select :value="monthN"  @change="changer('month')" ref="month">
                                <option v-for="month in monthS">{{month}}</option>
                            </select>
                            <button @click="this.changeCleander" class="bn632-hover">تغییر</button>
                        </div>
                        <div class="dayTable">
                            <div class="days" >
                            <div class="title">شنبه</div>
                                <div v-for="item in sat">
                                    <div v-if="(item.day != 1) && item.day <= 7" class="wDay"></div>
                                    <div class="boxNum wDay" :class="[(item.dayC ? 'gr':''),(item.dayH?'colorFri':'')]">
                                        <day :item="item"/>
                                    </div>
                                </div>
                            </div>
                            <div class="days" >
                                <div class="title">یکشنبه</div>
                                <div v-for="item in sun">
                                    <div v-if="(item.day != 1 && item.day != 2) && item.day <= 7" class="wDay"></div>
                                    <div class="boxNum wDay" :class="[(item.dayC ? 'gr':''),(item.dayH?'colorFri':'')]">
                                    <day :item="item"/>
                                </div>
                                </div>
                            </div>
                            <div class="days" >
                                <div class="title">دوشنبه</div>
                                <div v-for="item in mon">
                                    <div v-if="(item.day != 1 && item.day != 2 && item.day != 3) && item.day <= 7" class="wDay"></div>
                                    <div class="boxNum wDay" :class="[(item.dayC ? 'gr':''),(item.dayH?'colorFri':'')]">
                                    <day :item="item"/>
                                </div>
                                </div>
                            </div>
                            <div class="days" >
                                <div class="title">سه شنبه</div>
                                <div v-for="item in tue">
                                    <div v-if="(item.day != 1 && item.day != 2 && item.day != 3 && item.day != 4 ) && item.day <= 7" class="wDay"></div>
                                    <div class="boxNum wDay" :class="[(item.dayC ? 'gr':''),(item.dayH?'colorFri':'')]">
                                    <day :item="item"/>
                                </div>
                                </div>
                            </div>
                            <div class="days" >
                                <div class="title">چهارشنبه</div>
                                <div v-for="item in wen">
                                    <div v-if="(item.day != 1 && item.day != 2 && item.day != 3 && item.day != 4 && item.day != 5) && item.day <= 7" class="wDay"></div>
                                    <div class="boxNum wDay" :class="[(item.dayC ? 'gr':''),(item.dayH?'colorFri':'')]">
                                        <day :item="item"/>
                                    </div>
                                </div>
                            </div>
                            <div class="days" >
                                <div class="title">پنجشنبه</div>
                                    <div v-for="item in thu">
                                        <div v-if="(item.day != 1 && item.day != 2 && item.day != 3 && item.day != 4 && item.day != 5 && item.day != 6) && item.day <= 7" class="wDay"></div>
                                        <div class="boxNum wDay" :class="[(item.dayC ? 'gr':''),(item.dayH?'colorFri':'')]">
                                            <day :item="item"/>
                                        </div>
                                    </div>
                            </div>
                            <div class="days" >
                                <div class="title">جمعه</div>
                                    <div v-for="item in fri">
                                        <div v-if="(item.day != 1 && item.day != 2 && item.day != 3 && item.day != 4 && item.day != 5 && item.day != 6 && item.day != 7) && item.day <= 7" class="wDay"></div>
                                        <div class="boxNum wDay colorFri" :class="item.dayC ? 'gr':''">
                                            <day :item="item"/>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div class="back" >
                            <div class="fontIcon" @click="back">&#xe906;</div>
                            <div @click="back">بازگشت به ماه جاری</div>
                        </div>
                        </div>
            <div class="events" :class="dark ? 'events_D' : ''">
                <div  v-for="item in events" :class="(item.h) ? 'colorFri' : ''">
                    <span :class="(item.n == today)?'grE':''">{{item.n+ '  '}}</span>:
                    <span>{{item.t}}</span>
                </div> 
            </div>
            </div>
            <side/>
        <toolsUs :db="db"></toolsUs>
    </div>
        </div>
    <footerBox/>
</div>
</template>
<style scoped>
select{
    height: 35px;
}
.c_tools{
    grid-template-columns: none;
}
.side{
    margin-top: 20px;
    direction: ltr;
}
.tool{
    display: grid;
    grid-template-columns: 2fr 1fr;
}
.dayTable{
    display: grid;
    grid-template-columns: repeat(7,1fr);
    gap: 10px;
    padding: 0 5px;
}
.week{
    padding-bottom: 10px;
}
.events{
    font-size: 12px;
    background-color: #f1f1f1;
    padding: 5px;
    margin: 5px;
    border-radius:5px;
    line-height: 25px;
    text-align: justify;
    overflow-y: scroll;
    transition: all .3s ease-in-out;
}
.events_D{
    background-color: #0e2338;
    box-shadow: 0px 0px 9px 0px #3b82f626;
}
.days{
    padding:5px;
}
.title{
    background-color:#3b82f6;
    color:#fff;
    border-radius:1px;
    box-shadow:2px 2px 6px rgba(0, 0, 0, 0.596);
    padding: 5px 11px;
    font-size:16px;
}
.boxNum{
    border:1px solid rgb(0 0 0 / 24%);
}
.wDay{
    margin-top: 10px;
    width: 80px;
    height: 49px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3px;
    position:relative;
    overflow: hidden;
}
.colorFri{
    color:#F43D47;
}
.gr{
    border: 1px solid #99c432;
}
.grE{
    color: #99c432;
    font-weight: bold;
}
.title_tool{
    grid-column-start: 1;
    grid-column-end: 3;
}
.side{
    margin:20px 0 !important;
}
.selection{
    padding: 10px;
    display: grid;
    grid-template-columns: 120px 120px 150px;
    align-items: center;
    justify-content: space-around;
    gap:5px;
}
.back{
    display: flex;
    justify-content: center;
    align-items: center;
    gap:5px;
    font-size: 15px;
    margin-top: 5px;
}
.back div{
    cursor: pointer;
}
@media screen and (max-width:1330px) {
    .title{
        font-size: 14px;
    }
}
@media screen and (max-width:1150px) {
    .title{
        font-size: 12px;
    }
    .wDay{
        width: 62px;
        height: 39px;
    }
}
@media screen and (max-width:1150px) {
    .title{
        font-size: 11px;
    }
    .wDay{
        width: 55px;
        height: 39px;
    }
    .days{
        padding: 0;
    }
    select{
        font-size: 16px;
    }
    .dayTable{
        gap: 5px;
        padding: 0 5px;
    }
}
@media screen and (max-width:940px) {
    .title{
        font-size: 13px;
    }
    .wDay{
        width: 82px;
        height: 50px;
    }
    .tool{
        display: block;
    }
    .days{
        padding: 5px;
    }
    .c_tools {
        margin: 37px 20px;
    }
    .week{
        padding-bottom: 0;
    }
}
@media screen and (max-width:840px) {
    .title{
        font-size: 12px;
    }
    .wDay{
        width: 60px;
        height: 40px;
    }
    .bn632-hover {
        font-size: 15px;
        padding: 0px 30px;
    }
    select{
        height: 30px;
    }
    .back{
        font-size: 13px;
    }
    .events{
        font-size: 11px;
        line-height: 20px;
    }
}
@media screen and (max-width:740px) {
    .c_tools {
        margin: 20px 0;
    }
    .days{
        padding: 0px;
    }
}
@media screen and (max-width:640px) {
    .wDay{
        width: 57px;
        height: 40px;
    }
    .title{
        font-size: 11px;
    }
}
@media screen and (max-width:540px) {
    .title{
        font-size: 9px;
    }
    .wDay{
        width: 50px;
        height: 30px;
        font-size: 15px;
    }    
    .container_m{
        padding-right: 0;
    }
    .bn632-hover {
        height: 35px;
        padding: 0px 25px;
    }
    select{
        font-size: 14px;
        height: 27px;
    }
}
@media screen and (max-width:540px) {
    .title{
        font-size: 8px;
    }
    .wDay{
        width: 40px;
        height: 30px;
        font-size: 14px;
    }  
    .bn632-hover {
        height: 27px;
        padding: 0px 20px;
        font-size: 14px;
        border-radius: 6px;
    }  
    .dayTable{
        gap: 4px;
        padding: 0 5px;
    }
}
@media screen and (max-width:440px) {
    .title{
        padding:5px 0;
    }
    .wDay{
        width: 35px;
        height: 30px;
        font-size: 14px;
    }  
    .selection{
        grid-template-columns: 100px 100px 100px;
    }
    select{
        font-size: 12px;
    }
    .back{
        font-size: 12px;
    }
    .events{
        font-size: 10px;
    }
}
</style>