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
            result:null
        }
    },
    setup(){
        const dark = inject("dark")
        return{dark}
    },
    methods:{
        CapitalizedCase(){
            this.cases('low')
            var subArray = this.result.split('')
            subArray[0] = subArray[0].toUpperCase()
            subArray.forEach(function (word , index){
                if(word == " "){
                    subArray[index+1] = subArray[index+1].toUpperCase()
                }
            })
            this.result = ''
            subArray.forEach(word => {
                this.result += word
            });
        },
        cases(inp){
            var subArray = this.result.split('')
            subArray.forEach(function (word , index){
                if(inp == 'low')
                    subArray[index] = subArray[index].toLowerCase()
                else
                    subArray[index] = subArray[index].toUpperCase()
            })
            this.result = ''
            subArray.forEach(word => {
                this.result += word
            });
        },
        SentenceCase(){
            this.cases('low')
            var subArray = this.result.split('')
            subArray.forEach(function (word , index){
                if(word == '\n')
                subArray[index+1] = subArray[index+1].toUpperCase()
            })
            subArray[0] = subArray[0].toUpperCase()
            this.result = ''
            subArray.forEach(word => {
                this.result += word
            });
        },
        aLtErNaTiNgCase(){
            var subArray = this.result.split('')
            subArray.forEach(function (word , index){
                if(index % 2 == 0)
                    subArray[index] = subArray[index].toLowerCase()
                else
                    subArray[index] = subArray[index].toUpperCase()
            })
            this.result = ''
            subArray.forEach(word => {
                this.result += word
            });
        },
        Inverse(){
            var subArray = this.result.split('')
            var subS
            subArray.forEach(function (word , index){
                subS = word.toUpperCase()
                if(subS != word)
                    subArray[index] = word.toUpperCase()
                else
                    subArray[index] = word.toLowerCase()
            })

            this.result = ''
            subArray.forEach(word => {
                this.result += word
            });
        },
        copy(){
            navigator.clipboard.writeText(this.result);
        }
    },
    created (){
        document.title='تولبو | تبدیل حروف انگلیسی '
        this.db.push(dbG.dataBox[7].item[1])
        this.db.push(dbG.dataBox[7].item[2])
        this.db.push(dbG.dataBox[6].item[3])
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
        <locations title="تبدیل حروف انگلیسی" PN="متن" PNR="/text"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="dark ? 'tool_D' : ''">
                <div class="title_tool">تبدیل حروف انگلیسی</div>
                <div class="content">
                    <textarea class="textBox" cols="30" rows="10" placeholder="متن خود را به زبان انگلیسی تایپ یا جای گذاری کنید" v-model="result"></textarea>
                    <div class="inputs_btn">
                        <button @click="CapitalizedCase" class="bn632-hover">Capitalized Case</button>
                        <button @click="cases('low')" class="bn632-hover">lower Case</button>
                        <button @click="cases" class="bn632-hover">UPPER Case</button>
                        <button @click="SentenceCase" class="bn632-hover">Sentence Case</button>
                        <button @click="aLtErNaTiNgCase" class="bn632-hover">aLtErNaTiNg Case</button>
                        <button @click="Inverse" class="bn632-hover">Inverse Case</button>
                        <button @click="CapitalizedCase" class="bn632-hover">Title Case</button>
                        <button @click="result = null" class="bn632-hover">Clear</button>
                        <button @click="copy" class="bn632-hover copy">Copy</button>
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
.content{
    display: flex;
    flex-direction: column;
    padding: 20px;
}
.textBox{
    direction:ltr;
    padding: 5px;
    outline: none;
}
.inputs_btn{
    display: grid;
    grid-template-columns: repeat(4,1fr);
    gap:0 30px;
    margin-top: 10px;
}
.bn632-hover{
    font-family: IranSans;
    width: 100%;
    border-radius: 17px;
    padding: 5px 10px;
}
.copy{
    grid-column:2/4;
    width: 50%;
}
@media screen and (max-width:940px) {
    .bn632-hover{
        padding:5px;
    }    
    .inputs_btn{
        gap: 0 16px;
    }
}
@media screen and (max-width:740px) {
    .inputs_btn{
        grid-template-columns: repeat(3,1fr);
    } 
    .copy{
        grid-column: 3/4;
        width:100%;
    }
}
@media screen and (max-width:540px) {
    .inputs_btn{
        grid-template-columns: repeat(2,1fr);
    }  
    .copy{
        grid-column: 1/3;
        width:50%;
    }
    .bn632-hover{
        border-radius: 9px;
    }
}
</style>