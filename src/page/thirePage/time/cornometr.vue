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
            setHour:0,
            setMinute:0,
            setSeconds:0,
            setMiniSeconds:0,
            start:false,
            pause:false,
            ListTime : []
        }
    },
    setup(){
        const dark = inject("dark")
        return{dark}
    },
    methods:{
        ConterTimer(){
            this.start = true
            this.pause = false
            var timer = setInterval(() => {
                if(!this.start)
                clearInterval(timer)
                if(!this.pause ){
                    if(this.start){
                        this.setMiniSeconds++
                    }
                    if(this.setMiniSeconds == 99){
                        this.setMiniSeconds = 0
                        this.setSeconds++
                    }
                    if(this.setSeconds == 60){
                        this.setSeconds = 0
                        this.setMinute++
                    }
                    if(this.setMinute == 60){
                        this.setMinute = 0
                        this.setHour++
                    }
                }
            }, 10);
        },
        zeroPaste (inp){
            if(inp < 10)
                return '0'+inp
            else
                return inp
        },
        eneTimer (){
            this.start = false
            this.setHour = 0
            this.setMinute = 0
            this.setSeconds = 0
            this.setMiniSeconds = 0
            this.ListTime = []
        },
        addToList (){
            this.ListTime.push(`${this.zeroPaste(this.setMiniSeconds)} : ${this.zeroPaste(this.setSeconds)} : ${this.zeroPaste(this.setMinute)} : ${this.zeroPaste(this.setHour)}`)
        }
    },
    created(){
        document.title='تولبو | کرنومتر آنلاین '
        this.db.push(dbG.dataBox[0].item[7])
        this.db.push(dbG.dataBox[0].item[6])
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
        <locationBarVue title="کرنومتر آنلاین" PN="زمان" PNR="/time"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="[(dark ? 'tool_D' : ''),(ListTime.length == 0? 'HTool':'')]">
                <div class="title_tool">کرنومتر آنلاین </div>
                <div>زمان سپری شده</div>  
                <div class="timer">
                    <div>{{zeroPaste(setMiniSeconds)}}</div>:
                    <div>{{zeroPaste(setSeconds)}}</div>:
                    <div>{{zeroPaste(setMinute)}}</div>:
                    <div>{{zeroPaste(setHour)}}</div>
                </div>
                <button v-show="!start" class="bn632-hover" @click="ConterTimer"><span class="fontIcon">&#xe90b;</span> شروع </button>
                <div v-show="start" class="btns">
                    <button class="bn632-hover" @click="addToList"><span class="fontIcon">&#xe900;</span> اضافه به لیست </button>
                    <button class="bn632-hover" @click="pause ? pause = false :pause = true"><span class="fontIcon">&#xe909;</span> توقف </button>
                    <button class="bn632-hover" @click="eneTimer"><span class="fontIcon">&#xe90c;</span> تنطیم مجدد </button>
                </div>
                <div v-show="ListTime.length != 0" class="list"  :class="dark ? 'list_D' : ''">
                    <div class="titleList">زمان های ثبت شده</div>
                    <div v-for="item in ListTime" class="itemList">{{item}}</div>
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
    grid-template-rows: .4fr 1fr 1fr 1fr;
    align-items: center;
}
.HTool{
    height: 250px;
}
.timer{
    font-family: sans-serif;
    font-weight: 700;
    font-size: 30px;
    display: flex;
    justify-content: center;
    gap:5px;
    color:#99c432;
}
.btns{
    display: flex;
}
.list{
    min-height: 138px;
    font-family: sans-serif;
    background-color: #f1f1f1;
    border-radius: 5px;
    margin: 20px;
    border: 1px solid #3b82f633;
    transition: all .3s ease-in-out;
}
.list_D{
    background-color: #0e2338;
    border: 1px solid #3b82f633;
}
.itemList{
    padding:5px;
    border-top:1px solid rgba(0, 0, 0, 0.296);
    margin:0 10px;
}
.titleList{
    color: #99c432 !important;
    padding:5px;
    margin:0 10px;
    font-family: IranSans;
}
@media screen and (max-width:740px){
    .bn632-hover{
        padding: 5px 30px;
        font-size: 15px;
    }
    .list{
        font-weight:700;
    }
}
@media screen and (max-width:540px){
    .timer{
        font-size: 27px;
    }
    .HTool{
        height: 220px;
    }
    .bn632-hover{
        padding: 5px 15px;
        font-size: 14px;
        height: 38px;
    }
}
@media screen and (max-width:440px){
    .bn632-hover{
        font-size: 13px;
    }
}
</style>