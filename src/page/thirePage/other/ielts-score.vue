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
            speaking:5,
            writing:5,
            reading:5,
            listening:5,
        }
    },
    setup(){
        const dark = inject("dark")
        return{dark}
    },
    methods:{
        convert(){
            this.result = (Number(this.speaking) + Number(this.writing) + Number(this.reading) + Number(this.listening)) / 4
            this.showResult = true
        },
        changer(inp){
            if(inp == 's')
                this.speaking = this.$refs.speaking.value
            else if(inp == 'w')
                this.writing = this.$refs.writing.value
            else if(inp == 'r')
                this.reading = this.$refs.reading.value
            else if(inp == 'l')
                this.listening = this.$refs.listening.value

                this.convert()
        }
    },
    created (){
        document.title='تولبو | محاسبه نمره آزمون IELTS '
        this.db.push(dbG.dataBox[8].item[0])
        this.db.push(dbG.dataBox[8].item[1])
        this.db.push(dbG.dataBox[8].item[2])
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
        <locations title="محاسبه نمره آزمون IELTS" PN="سایر" PNR="/other"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="[(!showResult ? 'HTool' : ''),(dark ? 'tool_D' : '')]">
                <div class="title_tool">محاسبه نمره آزمون IELTS</div>
                <div class="inputs">
                    <div>
                        <div>اسپیکینگ Speaking:</div>
                        <select :value="speaking" @change="changer('s')" ref="speaking">
                            <option value="0">0</option>
                            <option value="0.5">0.5</option>
                            <option value="1">1</option>
                            <option value="1.5">1.5</option>
                            <option value="2">2</option>
                            <option value="2.5">2.5</option>
                            <option value="3">3</option>
                            <option value="3.5">3.5</option>
                            <option value="4">4</option>
                            <option value="4.5">4.5</option>
                            <option value="5">5</option>
                            <option value="5.5">5.5</option>
                            <option value="6">6</option>
                            <option value="6.5">6.5</option>
                            <option value="7">7</option>
                            <option value="7.5">7.5</option>
                            <option value="8">8</option>
                            <option value="8.5">8.5</option>
                            <option value="9">9</option>
                        </select>
                    </div>
                    <div>
                        <div>رایتینگ Writing:</div>
                        <select :value="writing" @change="changer('w')" ref="writing">
                            <option value="0">0</option>
                            <option value="0.5">0.5</option>
                            <option value="1">1</option>
                            <option value="1.5">1.5</option>
                            <option value="2">2</option>
                            <option value="2.5">2.5</option>
                            <option value="3">3</option>
                            <option value="3.5">3.5</option>
                            <option value="4">4</option>
                            <option value="4.5">4.5</option>
                            <option value="5">5</option>
                            <option value="5.5">5.5</option>
                            <option value="6">6</option>
                            <option value="6.5">6.5</option>
                            <option value="7">7</option>
                            <option value="7.5">7.5</option>
                            <option value="8">8</option>
                            <option value="8.5">8.5</option>
                            <option value="9">9</option>
                        </select>
                    </div>
                    <div>
                        <div>ریدینگ Reading:</div>
                        <select :value="reading" @change="changer('r')" ref="reading">
                            <option value="0">0</option>
                            <option value="0.5">0.5</option>
                            <option value="1">1</option>
                            <option value="1.5">1.5</option>
                            <option value="2">2</option>
                            <option value="2.5">2.5</option>
                            <option value="3">3</option>
                            <option value="3.5">3.5</option>
                            <option value="4">4</option>
                            <option value="4.5">4.5</option>
                            <option value="5">5</option>
                            <option value="5.5">5.5</option>
                            <option value="6">6</option>
                            <option value="6.5">6.5</option>
                            <option value="7">7</option>
                            <option value="7.5">7.5</option>
                            <option value="8">8</option>
                            <option value="8.5">8.5</option>
                            <option value="9">9</option>
                        </select>
                    </div>
                    <div>
                        <div>لیسنینگ Listening:</div>
                        <select :value="listening" @change="changer('l')" ref="listening">
                            <option value="0">0</option>
                            <option value="0.5">0.5</option>
                            <option value="1">1</option>
                            <option value="1.5">1.5</option>
                            <option value="2">2</option>
                            <option value="2.5">2.5</option>
                            <option value="3">3</option>
                            <option value="3.5">3.5</option>
                            <option value="4">4</option>
                            <option value="4.5">4.5</option>
                            <option value="5">5</option>
                            <option value="5.5">5.5</option>
                            <option value="6">6</option>
                            <option value="6.5">6.5</option>
                            <option value="7">7</option>
                            <option value="7.5">7.5</option>
                            <option value="8">8</option>
                            <option value="8.5">8.5</option>
                            <option value="9">9</option>
                        </select>
                    </div>
                </div>
                <button class="bn632-hover" @click="convert"><span class="fontIcon">&#xe906;</span>محاسبه </button>
                <div class="result" :class="dark ? 'Result_D':''" v-if="showResult">Overall = {{result}}</div>
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
    padding: 10px;
    color:#3b82f6 ;
    font-size: 25px;
}
@media screen and (max-width:1040px) {
    .HTool{
        height: 240px;
    }    
    .result{
        font-size: 24px;
    }
}
@media screen and (max-width:640px) {
    .result{
        font-size: 22px;
    }
    .HTool{
        height: 220px;
    }    
}
@media screen and (max-width:540px) {
    .result{
        font-size: 20px;
    }
    .HTool{
        height: 215px;
    }   
}
@media screen and (max-width:440px) {
    .HTool{
        height: 205px;
    }    
}
</style>