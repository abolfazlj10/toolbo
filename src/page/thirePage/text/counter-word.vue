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
            word:1,
            paragraph:1,
            j:1,
            showResult:false,
        }
    },
    setup(){
        const dark = inject("dark")
        return{dark}
    },
    watch:{
        result (){
            if(this.result == "")
            this.showResult = false
            else
            this.counter()
        }
    },
    methods:{
        counter(){
            this.word = 1
            this.paragraph = 1
            this.j = 0
            var subArray = this.result.split('')
            subArray.forEach((char,index)=>{
                if(char == " ")
                    this.word++
                if(char == '\n' && subArray[index+1] != undefined)
                    this.word++                
                if(char == '\n' && subArray[index+1] != '\n')
                    this.paragraph++
                if(char == '.')
                    this.j++
            })
            this.result = ''
            subArray.forEach(word => {
                this.result += word
            });
            this.showResult = true
        }
    },
    created (){
        document.title='تولبو | شمارش تعداد کلمه '
        this.db.push(dbG.dataBox[7].item[0])
        this.db.push(dbG.dataBox[7].item[1])
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
        <locations title="شمارش تعداد کلمه" PN="متن" PNR="/text"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="dark ? 'tool_D' : ''">
                <div class="title_tool">شمارش تعداد کلمه</div>
                <div>
                    <div class="output">
                        <textarea placeholder="متن مورد نظر خود را تایپ کنید." cols="30" rows="10" v-model="result"></textarea>
                    </div>
                    <div class="result" :class="dark ? 'Result_D':''" v-if="showResult">
                        <div class="cell">
                            <div>تعداد کلمه :</div>
                            <div class="infor">{{ word }}</div>
                        </div>
                        <div class="cell">
                            <div>تعداد کاراکتر :</div>
                            <div class="infor">{{ result.length }}</div>
                        </div>
                        <div class="cell">
                            <div>تعداد جمله:</div>
                            <div class="infor">{{ j }}</div>
                        </div>
                        <div class="cell">
                            <div>تعداد پاراگراف :</div>
                            <div class="infor">{{ paragraph }}</div>
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
.output{
    display: flex;
    justify-content: center;
    padding: 0 10px;
}
.output textarea{
    width: 100%;
    padding: 5px;
    outline: none;
    margin: 10px;
}
.result{
    background: #f1f1f1;
    margin: 10px 20px;
    border-radius: 5px;
    padding: 3px;
    border:1px solid rgba(0, 0, 0, 0.328);
}
.cell{
    border-bottom:1px solid rgba(0, 0, 0, 0.437);
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin:2px 5px;
    padding:7px 5px;
}
.cell:last-child{
    border:none;
}
.cell *:first-child{
    color:#3b82f6;
}
.cell *{
    text-align: start;
}
@media screen and (max-width:1040px){
    .infor{
        text-align: end;
    }
    .cell{
        padding: 3px 5px;
    }
}

</style>