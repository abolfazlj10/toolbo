<script>
import navs from '../../../components/navBar.vue';
import footers from '../../../components/footer.vue';
import locationsbar from '../../../components/locationBar.vue';
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
            txt:null,
            binary:null,
        }
    },
    setup(){
        const dark = inject("dark")
        return{dark}
    },
    methods:{
        addBinary(e){
            const basket = e.target.value
            this.$refs.textINP.value = basket.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
        },
        addTXT(e){
            var basket = '';
            const dataVal = e.target.value
            for (var i = 0; i < dataVal.length; i++) {
                basket += '0'+dataVal[i].charCodeAt(0).toString(2) + ' ';
            }
            this.$refs.bianary.value = basket
        },
        Copy(inp){
            if(inp == 'b')
                navigator.clipboard.writeText(this.$refs.bianary.value);
            else
                navigator.clipboard.writeText(this.$refs.textINP.value);

        }
    },
    async created (){
        document.title='تولبو | تبدیل باینری به متن '
        this.db.push(dbG.dataBox[6].item[1])
        this.db.push(dbG.dataBox[6].item[0])
        this.db.push(dbG.dataBox[6].item[2])

        setTimeout(() => {
            this.isShow = true
        }, 100);
    },
    components:{navs,footers,locationsbar,usageSide,sidePage,loader,dbG}
}
</script>
<template>
    <loader v-show="!isShow"/>
    <div v-show="isShow">
        <navs/>
        <locationsbar title="تبدیل باینری به متن" PN="فناوری"  PNR="/technology"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="dark ? 'tool_D' : ''">
                <div class="title_tool">تبدیل باینری به متن</div> 
                <div class="inputs">
                    <div>
                        <div>باینری (دودویی):</div>
                        <textarea @keydown="addBinary" @paste="addBinary" class="binary" ref="bianary"></textarea>
                        <button class="bn632-hover" @click="Copy('b')"><span class="fontIcon">&#xe906;</span>کپی</button>
                    </div>
                    <div>
                        <div>کلمه یا متن:</div>
                        <textarea @keydown="addTXT" ref="textINP"></textarea>
                        <button class="bn632-hover" @click="Copy()"><span class="fontIcon">&#xe906;</span>کپی</button>
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
textarea{
    width: 95%;
    height: 190px;
    padding: 5px;
    outline:none;
}
.inputs{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap:10px;
    padding: 10px;
    text-align: right;
}
.binary{
    font-family: serif;
    direction: ltr;
}
@media screen and (max-width:640px) {
    textarea{
        height: 150px;
    }        
}
@media screen and (max-width:540px) {
    textarea{
        height: 130px;
    }        
}
</style>