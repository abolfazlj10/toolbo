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
            result:[],
            len:null,
            wid:null,
            Area:null, // مساحت
            Perimeter:null, // محیط
            Diagonal:null, // قطر
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
            this.result = []
            if(this.len != null & this.len != "" && this.wid != null & this.wid != ""){
                this.showResult = true
                this.Area = this.len * this.wid
                this.Perimeter = (this.wid * 2 ) + (this.len * 2)
                this.Diagonal = Math.sqrt((Math.pow(this.len,2))+(Math.pow(this.wid , 2))) 
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
    },
    created (){
        document.title='تولبو | محاسبه محیط و..مستطیل'
        this.db.push(dbG.dataBox[5].item[5])
        this.db.push(dbG.dataBox[5].item[6])
        this.db.push(dbG.dataBox[5].item[8])

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
        <locations title="محاسبه محیط و..مستطیل" PN="ریاضی" PNR="/math"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="[(!showResult ? 'HTool' : ''),(dark ? 'tool_D' : '')]">
                <div class="title_tool">محاسبه محیط و..مستطیل</div>
                <div class="inputs">
                    <div>
                        <div>طول Length:</div>
                        <input type="text" placeholder="به طور مثال : 5" @keydown="keyCheck" v-model="len">
                    </div>
                    <div>
                        <div>عرض Width:</div>
                        <input type="text" placeholder="به طور مثال : 4" @keydown="keyCheck" v-model="wid">
                    </div>
                </div>
                <button class="bn632-hover" @click="convert"><span class="fontIcon">&#xe906;</span>محاسبه </button>
                <div class="result" :class="dark ? 'Result_D':''" v-if="showResult">
                    <div class="title_tool">نتیجه</div>
                    <div class="textResult">
                        <div class="filldResult">
                            <div class="colorC">{{ Area }}</div>
                            <div>مساحت:</div>
                        </div>
                        <div class="filldResult">
                            <div class="colorC">{{Perimeter}}</div>
                            <div>محیط:</div>
                        </div>
                        <div class="filldResult">
                            <div class="colorC">{{Diagonal}}</div>
                            <div>قطر:</div>
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
.inputs input{
    width: 95%;
}
.HTool{
    height: 200px;
}
.inputs{
    display: grid;
    grid-template-columns: 1fr  1fr;
    gap:10px;
    padding:10px;
}
.bn632-hover {
    margin: 17px auto;
}
.result{
    background-color: #f1f1f1;
    margin: 30px 20px;
    border-radius:9px;
    border:1px solid rgba(0, 0, 0, 0.291);
    font-size: 20px;
}
.textResult{
    padding: 5px 10px;
}
.colorC{
    color:#007bff !important;
}
.filldResult{
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
}
.filldResult{
    border-bottom: 1px solid rgba(0, 0, 0, 0.355);
    padding: 2px 4px;
}
.filldResult:last-child{
    border-bottom:none;
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
    .result{
        font-size: 19px;
    }
}
@media screen and (max-width:540px) {
    .HTool{
        height: 165px;
    }    
    .result{
        margin-bottom: 15px;
    }
    .result{
        font-size: 16px;
    }
}
@media screen and (max-width:440px) {
    .HTool{
        height: 160px;
    }    
}
</style>