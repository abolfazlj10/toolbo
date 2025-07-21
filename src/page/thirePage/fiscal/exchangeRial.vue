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
            type:'tuman',
            valInp:null,
            result:null,
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
            this.result = null
            this.valInp = null
            this.type = e.target.value
        },
        cumma (e){
            var num
            if(e.target.value == null)
                num = e.target.value
            else 
                num = this.removeCumma(this.valInp)
            if(num.length > 3){
                let arr = []
                let numbers = e.target.value
                for (let i = 0; i < numbers.length; i++) {
                    arr.push(numbers[i])
                }

                if(numbers.length <= 6){   
                    arr.splice(arr.length-3,0,',')
                }else if(numbers.length <= 9){
                    for(let i = 3 ; i <= 7 ; i+=4){
                        arr.splice(arr.length-i,0,',')
                    }
                }else if(numbers.length <= 12){
                    for(let i = 3 ; i <= 11 ; i+=4){
                        arr.splice(arr.length-i,0,',')
                    }
                }else if(numbers.length <= 15){
                    for(let i = 3 ; i <= 15 ; i+=4){
                        arr.splice(arr.length-i,0,',')
                    }
                }else if(numbers.length <= 18){
                    for(let i = 3 ; i <= 19 ; i+=4){
                        arr.splice(arr.length-i,0,',')
                    }
                }else if(numbers.length <= 21){
                    for(let i = 3 ; i <= 23 ; i+=4){
                        arr.splice(arr.length-i,0,',')
                    }
                }else if(numbers.length <= 24){
                    for(let i = 3 ; i <= 27 ; i+=4){
                        arr.splice(arr.length-i,0,',')
                    }
                }

                let num = null
                arr.forEach((item)=>{
                    if(num == null)
                    num = item
                    else
                    num += item
                })
                this.valInp = null
                this.valInp = num
            }
        },
        removeCumma(inp){
            let arr = []
            let numbers = inp
            for (let i = 0; i < numbers.length; i++) {
                arr.push(numbers[i])
            }
            let test = arr.findIndex((indexes)=>{
                return indexes == ','
            })
            arr.splice(1,test)
            let num = null
            arr.forEach((item)=>{
                if(num == null)
                num = item
                else
                num += item
            })
            // return num
            let findetest = arr.findIndex((indexes)=>{
                return indexes == ','
            })
            if(findetest == -1)
                return num
            else{
                this.valInp = this.removeCumma(num)
            }
                
        },
        convert (){
            if(this.valInp != null && this.valInp != ""){
                if(this.type == 'tuman'){
                    this.result = Number(this.valInp+'0').toLocaleString('en-US')
                }else{
                    var len = this.valInp.length
                    for (let i = 0; i < this.valInp.length; i++) {
                        if((len-1) != i){
                            if(this.result == null)
                                this.result = this.valInp[i]
                            else
                                this.result += this.valInp[i]
    
                        }
                    }
                    this.result = Number(this.result).toLocaleString('en-US')
                }
                this.showResult = true
            }else{
                this.shower()
            }
        },
        keyInput(e){
            if(e.key == 'Enter')
                this.convert()
            else
            this.showResult = false
        }
    },
    created (){
        document.title='تولبو | تبدیل تومان به ریال و ریال به تومان '
        this.db.push(dbG.dataBox[1].item[1])
        this.db.push(dbG.dataBox[1].item[2])
        this.db.push(dbG.dataBox[1].item[4])

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
        <locations title="تبدیل تومان به ریال و برعکس" PN="مالی" PNR="/fiscal"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="[(!showResult ? 'HTool' : ''),(dark ? 'tool_D' : '')]">
                <div class="title_tool">تبدیل تومان به ریال و ریال به تومان</div>
                <div class="inputs">
                    <div>
                        <div>نوع تبدیل:</div>
                        <select :value="type" @change="changer"> 
                            <option value="tuman">تومان به ریال</option>
                            <option value="rial">ریال به تومان</option>
                        </select>
                    </div>
                    <div>
                        <div v-if="type == 'rial'">مبلغ را به ریال وارد کنید:</div>
                        <div v-else>مبلغ را به تومان وارد کنید:</div>
                        <input type="text" placeholder="به طور مثال : 10000" @keydown="keyInput" v-model="valInp">
                    </div>                
                </div>
                <button class="bn632-hover" @click="convert"><span class="fontIcon">&#xe906;</span>محاسبه </button>
                <div class="result" :class="dark ? 'Result_D':''" v-show="showResult">
                    <div class="title_tool" v-show="type == 'tuman'">نتیجه به ریال</div>
                    <div class="title_tool" v-show="type != 'tuman'">نتیجه به تومان</div>
                    <div class="numResult">
                        <div v-show="type == 'tuman'">{{result}} ریال</div>
                        <div v-show="type != 'tuman'">{{result}} تومان</div>
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
select , input{
    width: 100%;
}
.hTool{
    height: 200px;
}
.inputs{
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    gap:20px;
    padding:20px;
}
.result{
    background-color: #f1f1f1;
    margin:20px;
    border-radius:9px;
	border: 1px solid #3b82f633;
}
.numResult{
    display: flex;
    align-items: center;
    justify-content: center;
    padding:15px;
    font-size: 22px;
}
@media screen and (max-width:940px) {
    .numResult{
        font-size: 21px;
    }
}
@media screen and (max-width:640px) {
    .numResult{
        font-size: 20px;
    }
}
@media screen and (max-width:540px) {
    .numResult{
        font-size: 19px;
    }
}
@media screen and (max-width:440px) {
    .tool{
        font-size: 14px;
    }    
    select , input{
        font-size: 15px;
    }
    .numResult{
        font-size: 19px;
    }
}
</style>