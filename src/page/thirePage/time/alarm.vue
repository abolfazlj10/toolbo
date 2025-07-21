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
            isShow:false,
            db:[],
            timeNS:0,
            timeNM:0,
            timeNH:0,
            setHour:0,
            setMinute:0,
            StartTime:false,
            GoHour:0,
            GoMinute:0,
            GoSeconds:0,
            timeSet:null,
            soundClock:false,
            counterSetTimer:0,
            spaceAlarm:1,
        }
    },
    setup(){
        const dark = inject("dark")
        return{dark}
    },
    methods:{
        hourDate(){
            let time = new Date
            this.timeNS = time.getSeconds()
            this.timeNM = time.getMinutes()
            this.timeNH = time.getHours()
        },
        hourDateOne(){
            this.hourDate()
            let time = new Date
            this.setHour = time.getMinutes() != 59 ? time.getHours() : time.getHours() +1
            this.setMinute =  time.getMinutes() != 59 ? time.getMinutes()+1 : '0'          
        },
        changer(type){
            if(type == 'hour')
                this.setHour = this.$refs.hour.value
            else
                this.setMinute = this.$refs.minute.value
        },
        start(){
            this.timeSet = `${this.zeroPaste(this.setMinute)} : ${this.zeroPaste(this.setHour)}`
            this.StartTime = true
            // short -> s - space 
            let time = new Date
            
            this.GoHour = this.setHour - time.getHours()
            this.GoMinute = this.setMinute - time.getMinutes()
            this.GoSeconds = 60-time.getSeconds()
            
            if(this.GoMinute < 0){
                this.GoHour--
                this.GoMinute += 60
            }
            if(this.setMinute != time.getMinutes()){
                this.GoMinute--
            }else{
                this.GoHour = 23
                this.GoMinute = 59
            }
            if(this.GoHour < 0){
                this.GoHour += 24
            }
            
            this.mountTime()
            this.counterSetTimer++
        },
        mountTime (){
            
            var timer = setInterval(() => {
                this.GoSeconds--
                if(this.GoSeconds == -1){
                    this.GoMinute--
                    this.GoSeconds = 59
                }
                if(this.GoMinute == -1){
                    this.GoHour--
                    this.GoMinute = 59
                }
                document.title = `تولبو | ${this.zeroPaste(this.GoSeconds)} : ${this.zeroPaste(this.GoMinute)} : ${this.zeroPaste(this.GoHour)}`
                if(!this.StartTime)
                    clearInterval(timer)
                if(this.GoSeconds == 0 && this.GoMinute == 0 && this.GoHour == 0){
                    setTimeout(() => {
                        document.title='تولبو | تنظیم زنگ هشدار آنلاین '
                    }, 10000)
                    this.soundClock = true
                    this.PlaySoundWin()
                    clearInterval(timer)
                }
            }, 1000);
        },
        zeroPaste (inp){
            if(inp < 10)
                return '0'+inp
            else
                return inp
        },
        PlaySoundWin (){
            const musicTest = document.getElementById('elSound')
            musicTest.play()
            var sounder = setInterval(() => {

                if(!this.soundClock){
                    clearInterval(sounder)
                    this.counterSetTimer = 0
                }else{
                    musicTest.play()
                }
            }, 1000)
        },
        pauseTimer(){
            this.soundClock = false
            this.StartTime = false
            this.counterSetTimer = 0
        },
        betweenAlarm(e){
            this.spaceAlarm = e.target.value
        },
        pauseAndPlayAlarm (){
            this.StartTime = false
            this.soundClock = false
            this.mountTime()
            this.GoSeconds = 0 
            this.GoMinute = this.spaceAlarm
            this.GoHour = 0
            this.StartTime = true
        }
    },
    watch:{
        soundClock(newData){
            if(!newData){
                const musicTest = document.querySelectorAll('audio')
                musicTest.forEach((el)=>{
                    el.pause()
                })
            }
        }
    },
    created(){       
        document.title='تولبو | تنظیم زنگ هشدار آنلاین '
        this.hourDateOne() 
        setInterval(() => {
            this.hourDate()
        }, 1000);
        this.db.push(dbG.dataBox[0].item[4])
        this.db.push(dbG.dataBox[0].item[6])
        this.db.push(dbG.dataBox[0].item[7])
        setTimeout(() => {
            this.isShow = true
        }, 500);
    },
    components:{navBarVue,footerVue,locationBarVue,toolsUsageVue,side ,loader}
}
</script>
<template>
    <loader v-show="!isShow"/>
    <div v-show="isShow">
        <navBarVue/>
        <locationBarVue title="تنظیم زنگ هشدار آنلاین" PN="زمان" PNR="/time"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="[(!StartTime ? 'HTool' : ''),(dark ? 'tool_D' : '')]">
                <div class="title_tool">تنظیم زنگ هشدار و آلارم آنلاین</div>
                <div class="hourTimer">
                    <div>زمان فعلی</div>
                    <div class="hourN">{{zeroPaste(timeNS)}} : {{zeroPaste(timeNM)}} : {{zeroPaste(timeNH)}}</div>
                </div>
                <div class="inputs">
                    <div>
                        <div class="TSelect">ساعت:</div>
                        <select :value="setHour" @change="changer('hour')" ref="hour">
                            <option value="0">00</option>
                            <option v-for="i in 23">{{i}}</option>
                        </select>
                    </div>
                    <div>
                        <div class="TSelect">دقیقه:</div>
                        <select :value="setMinute" @change="changer()" ref="minute">
                            <option value="0">00</option>
                            <option v-for="i in 59">{{i}}</option>
                        </select>
                    </div>
                    <div>
                        <div class="TSelect">فاصله تکرار:</div>
                        <select @change="betweenAlarm">
                            <option value="1">1 دقیقه</option>
                            <option value="5">5 دقیقه</option>
                            <option value="10">10 دقیقه</option>
                            <option value="20">20 دقیقه</option>
                            <option value="60">60 دقیقه</option>
                        </select>
                    </div>
                </div>
                <button class="bn632-hover" @click="counterSetTimer == 0? start() :''" v-show="!StartTime"> 
                    <span class="fontIcon">&#xe900;</span> 
                    <span>تنظیم هشدار </span>
                </button>
                <button class="bn632-hover" @click="pauseTimer" v-show="StartTime"> 
                    <span class="fontIcon">&#xe909;</span> 
                    <span> توقف هشدار </span>
                </button>
                <button class="bn632-hover" @click="pauseAndPlayAlarm" v-show="soundClock"> 
                    <span class="fontIcon">&#xe909;</span> 
                    <span> تعویق </span>
                </button>
                <div v-show="StartTime" class="timer" :class="dark ? 'timer_D':''">
                    <div class="c_time">
                        <span>زمان باقیمانده</span>
                        <div class="c_timeNumber">
                            <div class="hourTimer">{{zeroPaste(GoSeconds)}}</div>:
                            <div class="hourTimer">{{zeroPaste(GoMinute)}}</div>:
                            <div class="hourTimer"> {{zeroPaste(GoHour)}}</div>
                        </div>
                        <div>ساعت برای <span class="timeSet">{{timeSet}}</span> تنظیم شده</div>
                    </div>
                </div>
            </div>
            <side/>
            <toolsUsageVue :db="db"/>
        </div>
        </div>
        <footerVue/>
        <audio id="elSound">
            <source src="../../../../public/sound/alarm.mp3">
        </audio>
    </div>
</template>
<style scoped> 

select{
    width: 100%;
}
.HTool{
    height: 265px;
}
.hourTimer{
    font-size: 22px;
    margin-top: 7px;
    display: flex;
    flex-direction: column;
    gap:8px;
}
.hourN{
    color: #99c432;
    font-size: 23px;
    font-family: sans-serif;
    font-weight: 700;
}
.inputs{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap:10px;
    padding:5px;
}
.TSelect{
    text-align:right;
}
.bn632-hover{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    margin:13px auto;
    width: 180px;
}
.timer{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    padding:10px;
    background-color: #f1f1f1;
    border-radius: 9px;
    transition: all .3s ease-in-out;
}
.timer_D{
    background-color: #0e2338;
}
.c_time{
    line-height: 30px;
    border: 1px solid rgba(0, 0, 0, 0.355);
    padding:10px 50px;
    border-radius:3px;
    font-size: 16px;
}
.c_timeNumber{
    display: flex;
    justify-content: center;
    align-items: center;
    gap:4px;
    font-family:sans-serif;
    color:red;
    font-weight: 700;
}
.timeSet{
    color: #3b82f6;
    font-family: sans-serif;
    font-weight: 700;
}
@media screen and (max-width:740px){
    .tool{
        font-size: 17px;    
    }
    .hourTimer{
        font-size: 20px;
    }
}
@media screen and (max-width:640px){
    .tool{
        font-size: 16px;    
    }
    .hourTimer{
        font-size: 19px;
    }
    .hourN{
        font-size: 23px;
    }
    .HTool{
        height: 240px;
    }
}
@media screen and (max-width:540px){
    .tool{
        font-size: 13px;    
    }
    .hourTimer{
        font-size: 17px;
    }
    .hourN{
        font-size: 20px;
    }
    select, input {
        font-size: 16px;
    }
    .bn632-hover{
        font-size: 14px;
        width: 160px;
        padding: 5px 30px;
    }
    .HTool{
        height: 220px;
    }
}
@media screen and (max-width:440px){
    select, input {
        font-size: 15px;
    }
    .bn632-hover{
        font-size: 13px;
        width: 140px;
        padding: 5px 10px;
        border-radius: 8px;
        height: 35px;
    }
}
</style>