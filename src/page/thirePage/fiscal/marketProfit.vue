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
            price:null,
            profit:null,
            installment:null,
            date:'month',
            sud:null,
            total:null,
            ghest:null,
            showResult:false
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
            this.showResult = false
            this.date = e.target.value
        },
        convert(){
            if((this.price != null && this.price != "") && (this.profit != null && this.profit != "") && (this.installment != null && this.installment != "")){
                this.showResult = true        
                if(this.date == 'year'){
                    this.sud = (this.profit / 100) * this.price
                }else{
                    var percent = (this.profit * this.installment) / 100
                    this.sud = percent * this.price
                }
                this.total = Number(this.sud) + Number(this.price)
                this.ghest = Number(this.total) / Number(this.installment)
                this.sud = Math.floor(this.sud).toLocaleString('en-US')
                this.total = Math.floor(this.total).toLocaleString('en-US')
                this.ghest = Math.floor(this.ghest).toLocaleString('en-US')
            }else{
                this.shower()
            }
        },
        keyCheck (e){
            if(e.key == 'Enter')
                this.convert()
            else
            this.showResult = false

        }
    },
    created (){
        document.title='تولبو | محاسبه سود و قسط در بازار '
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
        <locations title="محاسبه سود و قسط در بازار" PN="مالی" PNR="/fiscal"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="dark ? 'tool_D' : ''">
                <div class="title_tool">محاسبه آنلاین سود و قسط خرید اقساطی گوشی ، کالا و ...</div>
                <div class="inputs">
                    <div>
                        <div class="rText">روش محاسبه سود :</div>
                        <div><select :value="date" @change="changer">
                            <option value="month">ماهانه</option>
                            <option value="year">سالانه</option>
                        </select></div>
                    </div>
                    <div>
                        <div class="rText"> باقیمانده برای قسط بندی: (ریال)</div>
                        <div><input type="text" placeholder="به طور مثال: 50,000,000" v-model="price" @keydown="keyCheck"></div>
                    </div>
                    <div>
                        <div class="rText">نرخ سود:</div>
                        <div><input type="text" placeholder="به طور مثال: 2" v-model="profit" @keydown="keyCheck"></div>
                    </div>
                    <div>
                        <div class="rText">تعداد قسط:</div>
                        <div><input type="text" placeholder="به طور مثال: 12" v-model="installment" @keydown="keyCheck"></div>
                    </div>
                </div>
                <button class="bn632-hover" @click="convert"><span class="fontIcon">&#xe906;</span>محاسبه </button>
                <div class="result" :class="dark ?'Result_D':''" v-show="showResult">
                    <div class="title_tool">نتیجه</div>
                    <div class="bb">
                        <div>قسط ماهانه:</div>
                        <div>{{ghest}} ریال</div>
                    </div>
                    <div class="bb">
                        <div>سود پرداختی:</div>
                        <div>{{sud}} ریال</div>
                    </div>
                    <div class="bb" style="border-bottom:none;">
                        <div>جمع اصل مبلغ و سود پرداختی:</div>
                        <div>{{total}} ریال</div>
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
    width: 95%;
}
select {
    width: 100%;
}
.inputs{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap:20px;
    padding:20px;
}
.bn632-hover {
    margin: 17px auto;
}
.result{
    background-color:#f1f1f1;
    margin:20px;
    border-radius: 9px;
    border:1px solid rgba(0, 0, 0, 0.401);
}
.bb{
    border-bottom:1px solid rgba(0, 0, 0, 0.401);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:5px 10px;
    margin:0 10px;
}
.rText{
    text-align:right;
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
}
@media screen and (max-width:540px){
    .tool{
        font-size: 13px;
    }    
    .title_tool {
        padding: 6px;
    }
}
@media screen and (max-width:440px){
    .tool{
        font-size: 12px;
    }    
    .inputs{
        gap: 12px;
    }
    select, input {
        font-size: 15px;
    }
}
</style>