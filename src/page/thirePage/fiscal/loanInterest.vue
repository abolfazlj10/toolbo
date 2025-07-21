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
            priceLoan:null,
            profit:null,
            dateBackLoan:null,
            ghestOld:null,
            allProfitOld:null,
            sumAllOld:null,
            ghestNew:null,
            allProfitNew:null,
            showResult:false,
            sumAllNew:null,

            typeDate:'year'
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
        changer(e){
            let valType = e.target.value
            if(valType == 'year')
                this.typeDate = 'year'
            else
                this.typeDate = 'month'
        },
        result(){
            if(this.priceLoan != null  && this.profit != null  && this.dateBackLoan != null ){
                this.oldEqual()
                this.newEqual()
                this.showResult = true
            }else{
                this.shower()
            }
        },
        oldEqual (){       

            let numberGhest = this.typeDate == 'month' ? Number(this.dateBackLoan) : Number(this.dateBackLoan)*12

            this.allProfitOld = (this.priceLoan * this.profit * ( numberGhest + 1 )) /2400
            
            this.ghestOld = Math.floor( (Number(this.priceLoan) + Number(this.allProfitOld)) / Number(numberGhest) )

            this.sumAllOld = Number(this.allProfitOld) + Number(this.priceLoan)

            this.allProfitOld = Math.round(this.allProfitOld).toLocaleString('en-US')
            this.ghestOld = Math.round(this.ghestOld).toLocaleString('en-US')
            this.sumAllOld = Math.round(this.sumAllOld).toLocaleString('en-US')
        },
        newEqual (){
            let numberGhest = this.typeDate == 'month' ? Number(this.dateBackLoan) : Number(this.dateBackLoan)*12
            
            let power = Math.pow((1200+Number(this.profit))/1200,numberGhest)
            
            this.ghestNew = (Number(this.priceLoan) * (this.profit/1200) * power) / (power - 1 )

            this.allProfitNew = (numberGhest * this.ghestNew) - this.priceLoan

            this.sumAllNew = Number(this.allProfitNew) + Number(this.priceLoan)

            this.ghestNew = Math.round(this.ghestNew).toLocaleString('en-US')
            this.allProfitNew = Math.round(this.allProfitNew).toLocaleString('en-US')
            this.sumAllNew = Math.round(this.sumAllNew).toLocaleString('en-US')
        },
        hidResult (){
            if(this.showResult)
            this.showResult = false
        }
    },
    created (){
        document.title='تولبو | محاسبه سود و اقساط وام '
        this.db.push(dbG.dataBox[1].item[1])
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
        <locations title="محاسبه سود و اقساط وام" PN="مالی" PNR="/fiscal"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="dark ? 'tool_D' : ''">
                <div class="title_tool title_center">محاسبه سود و اقساط وام</div>
                <div class="inputs">
                    <div class="cSelect">
                        <div class="titleSelect">ملبغ وام (ریال) :</div>
                        <input type="text" placeholder="به طور مثال : 10,000,000" v-model="priceLoan" @keypress="hidResult" @keypress.enter="result">
                    </div>
                    <div class="cSelect">
                        <div class="titleSelect">نرخ سود وام:</div>
                        <input type="text" placeholder="به طور مثال : 18" v-model="profit" @keypress="hidResult"  @keypress.enter="result">
                    </div>
                    <div class="cSelect">
                        <div class="titleSelect">مدت بازپرداخت:</div>
                        <input type="text" placeholder="به طور مثال : 3" v-model="dateBackLoan" @keypress="hidResult"  @keypress.enter="result">
                    </div>
                    <div class="cSelect">
                        <div class="titleSelect">بازه زمانی بازپرداخت:</div>
                        <select :value="typeDate" @change="changer">
                            <option value="year">سال</option>
                            <option value="month">ماه</option>
                        </select>
                    </div>
                </div>
                <button class="bn632-hover" @click="result"><span class="fontIcon">&#xe906;</span>محاسبه </button>
                <div v-show="showResult">
                    <div class="resultOld" :class="dark ? 'Result_D':''">
                        <div class="title_tool">فرمول جدید</div>
                        <div>
                            <div class="resultBB">
                                <div class="numResult">قسط ماهانه:</div>
                                <div class="titleBox">{{this.ghestNew}} ریال </div>
                            </div>
                            <div class="resultBB">
                                <div class="numResult">کل سود وام:</div>
                                <div class="titleBox">{{this.allProfitNew}} ریال </div>
                            </div>
                            <div class="resultBB notBB">
                                <div class="numResult">جمع اصل وام و سود وام:</div>
                                <div class="titleBox">{{this.sumAllNew}} ریال </div>
                            </div>
                        </div>
                    </div>
                    <div class="resultOld" :class="dark ? 'Result_D':''">
                        <div class="title_tool">فرمول قدیم</div>
                        <div>
                            <div class="resultBB">
                                <div class="numResult">قسط ماهانه:</div>
                                <div class="titleBox">{{this.ghestOld}} ریال </div>
                            </div>
                            <div class="resultBB">
                                <div class="numResult">کل سود وام:</div>
                                <div class="titleBox">{{this.allProfitOld}} ریال </div>
                            </div>
                            <div class="resultBB notBB">
                                <div class="numResult">جمع اصل وام و سود وام:</div>
                                <div class="titleBox">{{this.sumAllOld}} ریال </div>
                            </div>
                        </div>
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
input , select{
    width: 100%;
    padding: 0;
}
.inputs{
    display: grid;
    grid-template-columns: repeat(2,1fr);
    gap:20px 10px;
    padding:10px;
}
.titleSelect{
    text-align:right;
}
.bn632-hover{
    margin-top: 24px;
}
.resultOld{
    background-color: #f1f1f1;
    margin:20px;
    border-radius: 9px;
    color: #343a40;
    border: 1px solid #3b82f633;
}
.resultBB{
    border-bottom: 1px solid rgba(0, 0, 0, 0.336);
    display: flex;
    justify-content: space-between;
    margin: 5px 6px;
    padding: 7px;
}
.title_tool{
    text-align: right;
}
.title_center{
    text-align: center;
}
.notBB {
    border: none;
}
@media screen and (max-width:1040px) {
    .tool{
        padding-bottom: 1px;
    }
}
@media screen and (max-width:640px) {
    .tool{
        font-size: 15px;
    }
    select, input {
        font-size: 16px;
    }
    .bn632-hover{
        font-size: 14px;
        height: 37px;
        padding: 5px 28px;
        border-radius:6px;
    }
}
@media screen and (max-width:540px) {
    .tool{
        font-size: 14px;
    }
    select, input {
        font-size: 14px;
    }
    .bn632-hover{
        font-size: 13px;
        height: 34px;
        padding: 5px 24px;
        border-radius:5px;
    }
    .title_tool{
        padding: 7px;
    }
}
@media screen and (max-width:440px) {
    .tool{
        font-size: 13px;
    }
    select, input {
        font-size: 13px;
    }
    .title_tool{
        font-size: 12px;
        padding: 8px;
    }    
}
</style>