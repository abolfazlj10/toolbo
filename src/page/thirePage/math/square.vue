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
            if(this.len != null & this.len != ""){
                this.showResult = true
                this.Area = this.len * this.len
                this.Perimeter = this.len * 4
                this.Diagonal = Math.sqrt(2) * this.len
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
        document.title='تولبو | محاسبه محیط و..مربع'
        this.db.push(dbG.dataBox[5].item[5])
        this.db.push(dbG.dataBox[5].item[6])
        this.db.push(dbG.dataBox[5].item[7])

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
        <locations title="محاسبه محیط و..مربع" PN="ریاضی" PNR="/math"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="dark ? 'tool_D' : ''">
                <div class="title_tool">محاسبه محیط و..مربع</div>
                <div class="inputs">
                    <div>
                        <div>طول یک ضلع:</div>
                        <input type="text" placeholder="به طور مثال : 5" @keydown="keyCheck" v-model="len">
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
    width: 300px;
}
.inputs{
    display: flex;
    justify-content: center;
    align-items: center;
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
    .bn632-hover{
        margin-bottom: 10px;
    }
}
@media screen and (max-width:740px) {
    .result{
        font-size: 17px;
        margin-bottom: 15px;
    }
}
@media screen and (max-width:540px) {
    .bn632-hover{
        margin-bottom: 8px;
    }
    .result{
        font-size: 16px;
    }
    .inputs input{
        width: 250px;
    }
}
@media screen and (max-width:440px) {
    .textResult{
        font-size: 15px;
    }
    .inputs input{
        width: 240px;
    }
}
</style> 