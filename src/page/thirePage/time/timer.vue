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
            setHour:null,
            setMinute:null,
            setSecond:null,
            startTimer:false,
            soundClock:false,
            isPuase:false,
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
        start(){
            if ((this.setSecond != null&&this.setSecond != "") || (this.setMinute != null&&this.setMinute != "") || (this.setHour != null&&this.setHour != "")) {
                this.startTimer = true
                this.mountTime()
            }else{
                this.shower()
            }
        },
        mountTime (){
            this.MinsAndSum()

            var timer = setInterval(() => {
                if(!this.isPuase){
                this.setSecond--
                if(this.setSecond == -1){
                    this.setMinute--
                    this.setSecond = 59
                }
                if(this.setMinute == -1){
                    this.setHour--
                    this.setMinute = 59
                }
                if(!this.startTimer){
                    clearInterval(timer)
                    this.endSoundClock()
                }
                if((Number(this.setSecond == 0) || this.setSecond == null) && (Number(this.setMinute == 0) || this.setMinute == null) && (Number(this.setHour == 0)||this.setHour == null) && this.startTimer){
                    setTimeout(() => {
                        document.title='تولبو | شمارش معکوس زمان '
                    }, 10000)
                    this.soundClock = true
                    this.PlaySoundWin()
                    clearInterval(timer)
                }
                document.title = `تولبو | ${this.zeroPaste(this.setSecond)} : ${this.zeroPaste(this.setMinute)} : ${this.zeroPaste(this.setHour)}`
            }
            }, 1000);
        },
        PlaySoundWin (){
            const musicTest = document.getElementById('elSound')
            musicTest.play()
            var sounder = setInterval(() => {

                if(!this.soundClock){
                    clearInterval(sounder)
                }else{
                    musicTest.play()
                }
            }, 1000)
        },
        endSoundClock (){
            this.soundClock = false
            this.startTimer = false
            const musicTest = document.querySelectorAll('audio')
            musicTest.forEach((el)=>{
                el.pause()
            })
            this.setSecond = null
            this.setMinute = null
            this.setHour = null
        },
        btnPause (){
            if(this.soundClock){
                this.endSoundClock()
            }else{
                this.isPuase = true
            }
        },
        zeroPaste (inp){
            if(inp < 10 && inp!=null)
                return '0'+inp
            else if(inp == null)
                return '00'
            else
                return inp
        },
        MinsAndSum (){

            if(this.setSecond > 60){
                this.setMinute = Math.floor(this.setSecond/60)
                this.setSecond %= 60
            }
            if(this.setMinute > 60){
                this.setHour = Math.floor(this.setMinute/60)
                this.setMinute %= 60
            }
        }
    },
    created (){
        document.title='تولبو | شمارش معکوس زمان '
        this.db.push(dbG.dataBox[0].item[5])
        this.db.push(dbG.dataBox[0].item[7])
        this.db.push(dbG.dataBox[0].item[8])
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
        <locationBarVue title="شمارش معکوس زمان" PN="زمان" PNR="/time"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="dark ? 'tool_D' : ''">
                <div class="title_tool">زمان سنج و تایمر شمارش معکوس زمان آنلاین  </div>
                <div class="inputs" v-if="!startTimer">
                    <div>
                        <div>ثانیه:</div>
                        <input type="text" placeholder="مثال : 1" v-model="setSecond" @keyup.enter="start">
                    </div>
                    <div>
                        <div>دقیقه:</div>
                        <input type="text" placeholder="مثال : 1" v-model="setMinute" @keyup.enter="start">
                    </div>
                    <div>
                        <div>ساعت:</div>
                        <input type="text" placeholder="مثال : 1" v-model="setHour" @keyup.enter="start">
                    </div>
                    <button class="bn632-hover" @click="start"><span class="fontIcon">&#xe90b;</span> شروع </button>
                </div>
                <div v-else class="C_Timer">
                    <div class="Timer">
                        {{zeroPaste(setSecond) || 0}} : {{zeroPaste(setMinute) || 0}} : {{zeroPaste( setHour)|| 0}}
                    </div>
                    <div class="btnEndTime">
                        <button v-if="!isPuase" class="bn632-hover" @click="btnPause"><span class="fontIcon">&#xe909;</span> توقف </button>
                        <button v-else class="bn632-hover" @click="isPuase = false"><span class="fontIcon">&#xe900;</span> ادامه </button>
                        <button class="bn632-hover" @click="endSoundClock"><span class="fontIcon">&#xe90c;</span> تنظیم مجدد </button>
                    </div>
                </div>
            </div>
            <audio id="elSound">
                <source src="../../../../public/sound/alarm.mp3">
            </audio>
            <side/>
            <toolsUsageVue :db="db"/>
        </div>
        </div>
        <footerVue/>
    </div>
</template>
<style scoped>
input{
    width: 95%;
    padding:0 5px;
    margin-top: 5px;
}
.tool{
    height: 195px;
    display: grid;
    grid-template-rows: .5fr 2fr;
}
.inputs{
    padding: 0 10px;
    display: grid;
    grid-template-columns: repeat(3 , 1fr);
    gap:20px;
    text-align: right;
    align-self: center;
}
.bn632-hover{
    grid-column-start: 2;
}
.btnEndTime{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 6px;
    gap: 30px;
}
.btnEndTime .bn632-hover {
    width: 170px;
}
.C_Timer{
    align-self: center;
}
.Timer{
    font-family: sans-serif;
    font-weight: 700;
    font-size:23px;
    color:#99c432;
}
@media screen and (max-width:940px){
    .tool{
        font-size: 17px;
    }
}
@media screen and (max-width:740px){
    .Timer{
        font-size: 22px;
    }
    .btnEndTime .bn632-hover{
        width: 165px;
        font-size: 15px;
        padding: 5px 25px;
    }
}
@media screen and (max-width:640px){
    .tool{
        font-size: 16px;
    }
    select, input {
        font-size: 17px;
    }
    .btnEndTime{
        margin-top: 30px;
    }
}
@media screen and (max-width:540px){
    .tool{
        font-size: 15px;
    }
    select, input {
        font-size: 16px;
    }
    .bn632-hover{
        font-size: 15px;
        padding: 5px 30px;
        height: 38px;
    }
    .btnEndTime{
        margin-top: 40px;
    }
}
@media screen and (max-width:440px){
    .Timer{
        font-size: 20px;
    }
    .btnEndTime .bn632-hover{
        width: 125px;
        font-size: 14px;
        padding: 5px 15px;
    }
}
</style>