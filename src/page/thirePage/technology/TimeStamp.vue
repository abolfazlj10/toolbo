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
            showResult:false,
            unix:null,
            miladiN:null,
            miladiT:null,
            TimeMiladi:null,
            shamsiN:null,
            shamsiT:null,
            DayM:['','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
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
    methods:{
        async convert(){
            if(this.unix != null && this.unix != ""){
                await this.sendReq()
                this.showResult = true
            }else{
                this.shower()
            }
        },
        async sendReq(){
            const send = await fetch('https://api.keybit.ir/time/?timestamp='+this.unix)
            const data = await send.json()
            var dateL = new Date
            this.miladiN = data.date.other.gregorian.usual.en
            let dashLastMiladi = this.miladiN.lastIndexOf('-',)
            let dayMiladi = this.miladiN.slice(dashLastMiladi+1) 
            this.miladiT = this.DayM[data.date.weekday.number.en]+' ، '+dayMiladi+' '+ this.monthM[dateL.getMonth()]+' '+dateL.getFullYear()

            this.TimeMiladi = data.time24.full.en

            this.shamsiN = data.date.full.official.usual.en
            this.shamsiT = data.date.weekday.name+' ، '+data.date.day.number.en+' '+data.date.month.name+ ' '+data.date.year.number.en

        },
        keyCheck(e){
            if(e.key == 'Enter')
                this.convert()
            else
                this.showResult = false
        },
    },
    async created (){
        document.title='تولبو | تبدیل تایم استمپ '
        this.db.push(dbG.dataBox[6].item[0])
        this.db.push(dbG.dataBox[6].item[1])
        this.db.push(dbG.dataBox[6].item[3])
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
        <locations title="تبدیل تایم استمپ" PN="فناوری" PNR="/technology"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="[(!showResult ? 'HTool' : ''),(dark ? 'tool_D' : '')]">
                <div class="title_tool">تبدیل تایم استمپ</div>
                <div class="inputs">
                    <div>زمان یونیکس:</div>
                    <input type="text" placeholder="به طور مثال : 1676191432" v-model="unix" @keydown="keyCheck">
                </div>
                <button class="bn632-hover" @click="convert"><span class="fontIcon">&#xe906;</span>محاسبه </button>
                <div v-if="showResult" class="result" :class="dark ? 'Result_D':''">
                    <div class="title_tool">نتیجه</div>
                    <div class="textResult">
                        <div class="filld">{{ TimeMiladi }} {{ miladiN }}</div>
                        <div class="filld">{{ TimeMiladi }} {{ miladiT }}</div>
                        <div class="filld">{{ TimeMiladi }} {{ shamsiN }}</div>
                        <div class="filld">{{ TimeMiladi }} {{ shamsiT }}</div>
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
.inputs{
    margin: 20px;
}
.inputs input{
    width: 400px;
}
.result{
    background-color:#f1f1f1;
    margin:10px 50px;
    border:1px solid rgba(0, 0, 0, 0.33);
    border-radius:9px;
}
.filld{
    padding:5px 10px;
    border-bottom:1px solid rgba(0, 0, 0, 0.231);
    text-align: left;
    margin: 0 10px;
}
.filld:last-child{
    border: none;
}
@media screen and (max-width:1040px) {
    .HTool{
        height: 190px;
    }    
}
@media screen and (max-width:940px) {
    .HTool{
        height: 185px;
    }    
}
@media screen and (max-width:840px) {
    .HTool{
        height: 180px;
    }    
}
@media screen and (max-width:740px) {
    .title_tool{
        padding: 8px;
    }
}
@media screen and (max-width:540px) {
    .HTool{
        height: 165px;
    }    
    .textResult{
        font-size: 15px;
    }
    .result{
        margin: 10px 30px;
    }
    .inputs input{
        width: 300px;
    }    
}
@media screen and (max-width:440px) {
    .HTool{
        height: 160px;
    }
    .textResult{
        font-size: 14px;
    }
    .filld{
        padding: 5px;
        margin: 0 5px;
    }
}
</style>