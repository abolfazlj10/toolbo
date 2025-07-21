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
            result:null,
            showResult:false,
            pock:null,
            box:20,
            price:null,
            time:null
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
        convert(){
            if(this.pock != null && this.pock != "" && this.price != null && this.price != "" && this.time != null && this.time != ""){
                this.showResult = true
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
            this.box = e.target.value
        }
    },
    created (){
        document.title='تولبو | محاسبه مصرف سیگار '
        this.db.push(dbG.dataBox[8].item[0])
        this.db.push(dbG.dataBox[8].item[2])
        this.db.push(dbG.dataBox[8].item[3])

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
        <locations title="محاسبه مصرف سیگار" PN="سایر" PNR="/other"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="[(!showResult ? 'HTool' : ''),(dark ? 'tool_D' : '')]">
                <div class="title_tool">محاسبه مصرف سیگار</div>
                <div class="inputs">
                    <div>
                        <div class="title_input">تعداد سیگاری که هر روز مصرف میکنید:</div>
                        <input type="text" placeholder="به طور مثال : 10" v-model="pock" @keydown="keyCheck">
                    </div>
                    <div>
                        <div class="title_input">تعداد سیگار هر پاکت:</div>
                        <select :value="box" @change="changer"><option v-for="i in 20">{{ i }}</option></select>
                    </div>
                    <div>
                        <div class="title_input">قیمت هر پاکت (ریال):</div>
                        <input type="text" placeholder="به طور مثال : 80000" v-model="price" @keydown="keyCheck">
                    </div>
                    <div>
                        <div class="title_input">چند ساله که سیگاری میکشید:</div>
                        <input type="text" placeholder="به طور مثال : 1" v-model="time" @keydown="keyCheck">
                    </div>
                </div>
                <button class="bn632-hover" @click="convert"><span class="fontIcon">&#xe906;</span>محاسبه </button>
                <div class="result" :class="dark ? 'Result_D':''" v-if="showResult">
                        <div class="cell">
                            <div>تعداد سیگاری که کشیدید:</div>
                            <div>{{ (this.time * 365 * this.pock).toLocaleString('en-US') }}</div>
                        </div>
                        <div class="cell">
                            <div>تعداد پاکت سیگاری که خریدید:</div>
                            <div>{{ (this.time * 365 * this.pock / this.box).toLocaleString('en-US') }}</div>
                        </div>
                        <div class="cell">
                            <div>هزینه هفتگی سیگار شما:</div>
                            <div>{{ (7*this.pock/this.box*this.price).toLocaleString('en-US') }} ریال</div>
                        </div>
                        <div class="cell">
                            <div>هزینه ماهانه سیگار شما:</div>
                            <div>{{ (30*this.pock/this.box*this.price).toLocaleString('en-US') }} ریال</div>
                        </div>
                        <div class="cell">
                            <div>هزینه یک سال سیگار شما:</div>
                            <div>{{ (365*this.pock/this.box*this.price).toLocaleString('en-US') }} ریال</div>
                        </div>
                        <div class="cell">
                            <div>کل پولی که بابت خرید سیگار پرداخت کردید:</div>
                            <div>{{ (this.price / this.box * this.pock * (this.time * 365)).toLocaleString('en-US') }} ریال</div>
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
input{
    width: 96%;
}
select{
    width: 103%;
}
.HTool{
    height: 250px;
}
.inputs{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap:10px;
    padding: 10px;
}
.bn632-hover{
    margin: 10px auto ;
}
.result{
    background: #f1f1f1;
    margin: 10px 20px;
    border-radius: 5px;
    padding: 3px;
    border:1px solid rgba(0, 0, 0, 0.328);
}
.cell{
    border-bottom:1px solid rgba(0, 0, 0, 0.437);
    display: grid;
    grid-template-columns: 2fr 1fr;
    margin:2px 5px;
    padding:7px 5px;
}
.cell:last-child{
    border:none;
}
.cell *:last-child{
    text-align: left;
    color:#3b82f6
}
.cell *:first-child{
    text-align: right;
}
@media screen and (max-width:990px) {
    .HTool{
        height:240px;
    }    
}
@media screen and (max-width:940px) {
    .HTool{
        height:240px;
    }   
}
@media screen and (max-width:740px) {
    .HTool{
        height:225px;
    }    
    .title_input{
        font-size: 16px;
    }
}
@media screen and (max-width:640px) {
    .HTool{
        height:210px;
    }    
    .title_input{
        font-size: 14px;
    }
    .tool{
        font-size: 16px;
    }
}
@media screen and (max-width:540px) {
    .tool{
        font-size: 13px;
    }
    .HTool{
        height:200px;
    }    
    .title_input{
        font-size: 11px;
    }
    .cell{
        margin: 2px 0px;
        padding: 7px 2px;
    }
}
@media screen and (max-width:440px) {
    .tool{
        font-size: 11px;
    }
    .HTool{
        height:195px;
    }    
    .title_input{
        font-size: 10px;
        padding-bottom: 5px;
    }
}
</style>