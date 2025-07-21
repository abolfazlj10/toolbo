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
            profit:null,
            priceLoan:null,
            dayLoan:null,
            sudDays:null,
            anyDay:null,
            allMonth:null,
            threeMonth:null,
            sixMonth:null,
            NineMonth:null,
            oneYear:null,
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
            if((this.profit != null && this.priceLoan != null && this.dayLoan != null) && (this.profit != '' && this.priceLoan != '' && this.dayLoan != '')){
                this.sudDays = (this.priceLoan*(this.profit/100)*this.dayLoan)/365
                this.anyDay = this.sudDays/this.dayLoan
                this.allMonth = (this.priceLoan*(this.profit/100)*30)/365
                this.threeMonth = (this.priceLoan*(this.profit/100)*90)/365
                this.sixMonth = (this.priceLoan*(this.profit/100)*180)/365
                this.NineMonth = (this.priceLoan*(this.profit/100)*270)/365
                this.oneYear = (this.priceLoan*(this.profit/100)*365)/365

                this.sudDays = Math.round(this.sudDays).toLocaleString('en-US')
                this.anyDay = Math.round(this.anyDay).toLocaleString('en-US')
                this.allMonth = Math.round(this.allMonth).toLocaleString('en-US')
                this.threeMonth = Math.round(this.threeMonth).toLocaleString('en-US')
                this.sixMonth = Math.round(this.sixMonth).toLocaleString('en-US')
                this.NineMonth = Math.round(this.NineMonth).toLocaleString('en-US')
                this.oneYear = Math.round(this.oneYear).toLocaleString('en-US')
                this.showResult = true
            }else{
                this.shower()
            }
        },
        testShowResult (){
            if(this.showResult)
                this.showResult = false
        }
    },
    created (){
        document.title='تولبو | محاسبه سود سپرده'
        this.db.push(dbG.dataBox[1].item[0])
        this.db.push(dbG.dataBox[1].item[2])
        this.db.push(dbG.dataBox[1].item[3])

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
        <locations title="محاسبه سود سپرده" PN="مالی" PNR="/fiscal"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="[(!showResult ? 'HTool' : ''),(dark ? 'tool_D' : '')]">
                <div class="title_tool">محاسبه آنلاین سود سپرده روز شمار</div>
                <div class="inputs">
                    <div class="Selector">
                        <div>درصد نرخ سود:</div>
                        <input type="text" placeholder="مثال : 15 " v-model="profit" @keypress="testShowResult" @keypress.enter="convert">
                    </div>
                    <div class="Selector">
                        <div>مبلغ سپرده (ریال):</div>
                        <input type="text" placeholder="مثال : 50000000 " v-model="priceLoan" @keypress="testShowResult" @keypress.enter="convert">
                    </div>
                    <div class="Selector">
                        <div>مدت زمان (روز):</div>
                        <input type="text" placeholder="مثال : 20 " v-model="dayLoan" @keypress="testShowResult" @keypress.enter="convert">
                    </div>
                </div>
                <button class="bn632-hover" @click="convert"><span class="fontIcon">&#xe906;</span>محاسبه </button>
                <div class="result" :class="dark ? 'Result_D':''" v-show="showResult">
                    <div class="title_tool">نتیجه</div>
                    <div class="showrFild" style="border:none;">
                        <div class="colorDays">سود {{dayLoan}} روز:</div>
                        <div>{{sudDays}} ریال</div>
                    </div>
                    <div class="showrFild">
                        <div>سود روزانه:</div>
                        <div>{{anyDay}} ریال</div>
                    </div>
                    <div class="showrFild">
                        <div>سود ماهانه:</div>
                        <div>{{allMonth}} ریال</div>
                    </div>
                    <div class="showrFild">
                        <div>سود سه ماه:</div>
                        <div>{{threeMonth}} ریال</div>
                    </div>
                    <div class="showrFild">
                        <div>سود شش ماه:</div>
                        <div>{{sixMonth}} ریال</div>
                    </div>
                    <div class="showrFild">
                        <div>سود نه ماه:</div>
                        <div>{{NineMonth}} ریال</div>
                    </div>
                    <div class="showrFild">
                        <div>سود یکسال:</div>
                        <div>{{oneYear}} ریال</div>
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
.hTool{
    height: 200px;
}
.inputs{
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap:10px;
    padding:10px;
}
.Selector{
    text-align: right;
}
.Selector input{
    width: 95%;
}
.bn632-hover{
    margin-top: 20px;
    gap:8px;
}
.result{
    background-color: #f1f1f1;
    margin: 20px;
    border-radius: 9px;
    border:1px solid rgba(0, 0, 0, 0.315);
    color: #343a40;
}
.showrFild{
    border-top: 1px solid rgba(0, 0, 0, 0.336);
    display: flex;
    justify-content: space-between;
    margin: 5px 6px;
    padding: 7px;
}
.titleFild{
    border-bottom: 1px solid rgba(0, 0, 0, 0.336);
    color: #99c432;
    margin: 5px 6px;
    padding: 7px;
    font-size: 18px;
}
.colorDays{
    color: #3b82f6;
}
@media screen and (max-width:940px){
    .tool{
        font-size: 17px;
    }   
}
@media screen and (max-width:740px){
    .tool{
        font-size: 16px;
    }   
    .Selector{
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
}
@media screen and (max-width:640px){
    .bn632-hover{
        font-size: 15px;
        padding: 5px 30px;
        border-radius: 5px;
    }
    select , input{
        font-size: 16px;
    }
}
@media screen and (max-width:540px){
    .bn632-hover{
        font-size: 13px;
        height: 35px;
        padding: 5px 28px;
    } 
    .showrFild{
        padding: 4px;
    }
    .tool{
        font-size: 15px;
    }   
}
@media screen and (max-width:440px){
    .tool{
        font-size: 14px;
    }   
    select , input{
        font-size: 15px;
    }
}
</style>