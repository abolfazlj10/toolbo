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
            len : '12',
            Result : '',
            arrTxtCaps : ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
            arrTxt : ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
            numer : ['1','2','3','4','5','6','7','8','9','0'],
            mark : ['(',')','[',']','{','}','&','^','%','$','#','@','!','~','|','/','>','<','-','_','*',';',',',':'],
            symbol : true ,
            num : true ,
            char : true ,
            charCaps : true ,
            CCCNS : ['(',')','[',']','{','}','&','^','%','$','#','@','!','~','|','/','>','<','-','_','*',';',',',':','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0'],
            SNC : ['(',')','[',']','{','}','&','^','%','$','#','@','!','~','|','/','>','<','-','_','*',';',',',':','1','2','3','4','5','6','7','8','9','0','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
            SCCC : ['(',')','[',']','{','}','&','^','%','$','#','@','!','~','|','/','>','<','-','_','*',';',',',':','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
            SNCC : ['(',')','[',']','{','}','&','^','%','$','#','@','!','~','|','/','>','<','-','_','*',';',',',':','1','2','3','4','5','6','7','8','9','0','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
            NCCC : ['1','2','3','4','5','6','7','8','9','0','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
            SN : ['(',')','[',']','{','}','&','^','%','$','#','@','!','~','|','/','>','<','-','_','*',';',',',':','1','2','3','4','5','6','7','8','9','0'],
            SCC : ['(',')','[',']','{','}','&','^','%','$','#','@','!','~','|','/','>','<','-','_','*',';',',',':','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
            SC : ['(',')','[',']','{','}','&','^','%','$','#','@','!','~','|','/','>','<','-','_','*',';',',',':','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
            NC : ['1','2','3','4','5','6','7','8','9','0','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
            NCC : ['1','2','3','4','5','6','7','8','9','0','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
            CCC : ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
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
        convert (){
            this.showResult = true
            if (this.symbol && this.num && this.char && this.charCaps){ // کاراکتر و عدد و حرف و حرف بزرگ
                this.Result = this.cTest(this.CCCNS)
            }else if (this.symbol && this.num && this.charCaps){// کاراکتر و عدد و حرف بزرگ
                this.Result = this.cTest(this.SNCC)
            }else if (this.symbol && this.num && this.char){// کاراکتر و عدد و حرف  
                this.Result = this.cTest(this.SNC)
            }else if (this.symbol && this.charCaps && this.char){//  کاراکتر حرف و حرف بزرگ
                this.Result = this.cTest(this.SCCC)
            }else if (this.num && this.charCaps && this.char){//  عدد و حرف و حرف بزرگ
                this.Result = this.cTest(this.NCCC)
            }else if (this.symbol && this.num){// کاراکتر و عدد
                this.Result = this.cTest(this.SN)
            }else if (this.symbol && this.charCaps){// کاراکتر و حرف بزرگ
                this.Result = this.cTest(this.SCC)
            }else if (this.symbol && this.char){// کاراکتر و حرف
                this.Result = this.cTest(this.SC)
            }else if (this.num && this.char){// عدد و حرف
                this.Result = this.cTest(this.NC)
            }else if (this.num && this.charCaps){// عدد و حرف بزرگ
                this.Result = this.cTest(this.NCC)
            }else if (this.char && this.charCaps){// حرف و حرف بزرگ 
                this.Result = this.cTest(this.CCC)
            }else if (this.symbol){// کاراکتر
                this.Result = this.cTest(this.mark)
            }else if (this.num){// عدد
                this.Result = this.cTest(this.numer)
            }else if (this.char){// حرف
                this.Result = this.cTest(this.arrTxt)
            }else if (this.charCaps){// حرف بزرگ
                this.Result = this.cTest(this.arrTxtCaps)
            }else{
                this.shower()
            }
        },
        cTest (inp){
            var container = ''
            for (var i = 0 ; i < this.len; i++){
                container += inp[Math.floor(Math.random() * inp.length)] 
            }
            return container
        },
        changer(e){
            if(e == 'num'){
                if(this.num){
                    this.num = false
                }else{
                    this.num = true
                }
            }else if (e == 'char'){
                if(this.char){
                    this.char = false
                }else{
                    this.char = true
                }
            }else if (e == 'charCaps'){
                if(this.charCaps){
                    this.charCaps = false
                }else{
                    this.charCaps = true
                }
            }else if (e == 'symbol'){
                if(this.symbol){
                    this.symbol = false
                }else{
                    this.symbol = true
                }
            }else{ // change length password
                this.len = this.$refs.len.value
            }
            this.convert()
        },
        Copy (){
            navigator.clipboard.writeText(this.Result);
        }
    },
    created (){
        document.title='تولبو | تولید پسورد تصادفی '
        this.db.push(dbG.dataBox[6].item[1])
        this.db.push(dbG.dataBox[6].item[2])
        this.db.push(dbG.dataBox[6].item[3])
        this.convert()
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
        <locations title="تولید پسورد تصادفی" PN="فناوری" PNR="/technology"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="dark ? 'tool_D' : ''">
                <div class="title_tool">تولید پسورد تصادفی</div>
                <div class="inputs">
                    <div class="inpLen">
                        <div>طول پسورد (کاراکتر):</div>
                        <select :value="len" @change="changer('len')" ref="len">
                            <option v-for="i in 128" v-show="i != 1 && i != 2 && i != 3" :value="i">{{ i }}</option>
                        </select>
                    </div>
                    <div class="checkeds">
                        <div class="filld">
                            <input type="checkbox" :checked="num" @change="changer('num')">
                            <div @click="changer('num')">عدد 1-9</div>
                        </div>
                        <div class="filld">
                            <input type="checkbox" :checked="char" @change="changer('char')">
                            <div @click="changer('char')"> حروف کوچک a-z</div>
                        </div>
                        <div class="filld">
                            <input type="checkbox" :checked="charCaps" @change="changer('charCaps')">
                            <div @click="changer('charCaps')"> حروف بزرگ A-Z</div>
                        </div>
                        <div class="filld">
                            <input type="checkbox" :checked="symbol" @change="changer('symbol')">
                            <div @click="changer('symbol')"> کاراکترهای خاص</div>
                        </div>
                    </div>
                    <button class="bn632-hover" @click="convert"><span class="fontIcon">&#xe906;</span>تولید پسورد </button>
                </div>
                <div class="result" :class="dark ? 'Result_D':''" v-if="showResult">
                    <div class="title_tool">نتیجه</div>
                    <div class="textResult" id="test">{{ Result }}</div>
                </div>
                <button v-if="showResult" class="bn632-hover" @click="Copy"><span class="fontIcon">&#xe906;</span>کپی</button>
            </div>
            <sidePage/>
            <usageSide :db="db"/>
        </div>
        </div>
        <footers/>
    </div>
</template>
<style scoped>
.checkeds{
    display: grid;
    grid-template-columns: repeat(4,1fr);
    justify-items: center;
}
.inpLen{
    display: flex;
    flex-direction: column;
    margin:0 200px;
}
.inputs{
    display: grid;
    grid-template-rows: repeat(3,70px);
    align-items: center;
}
.filld{
    display: flex;
    align-items: center;
    gap:3px;
    cursor: pointer;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
}
.result{
    background-color:#f1f1f1;
    margin:10px 40px;
    border-radius:10px;
    border: 1px solid rgba(0, 0, 0, 0.253);
}
.textResult{
    margin:10px 0;
    padding:5px 20px;
    color: #3b82f6;
    font-size: 25px;
    overflow-wrap: break-word;
    direction: ltr;
}
@media screen and (max-width:740px){
    .tool{
        font-size: 16px;
    }    
}
@media screen and (max-width:640px){
    .tool{
        font-size: 15px;
    }    
    .inpLen{
        margin:0 150px;
    }
    .textResult{
        font-size: 23px;
        margin:0;
        padding:10px;
    }
}
@media screen and (max-width:540px){
    .inpLen{
        margin:0 100px;
    }
    .checkeds{
        grid-template-columns: repeat(2,1fr);
    }
    .textResult{
        font-size: 21px;
    }
    .result{
        margin: 10px 14px;
    }
}
</style>