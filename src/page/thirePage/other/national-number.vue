<script>
import navs from '../../../components/navBar.vue';
import footers from '../../../components/footer.vue';
import locations from '../../../components/locationBar.vue';
import usageSide from '../../../components/toolsUsage.vue';
import sidePage from '../../../components/sidePage.vue';
import loader from '../../../components/loader.vue';
import dbG from '../../../data/db.json'
import datas from '../../../data/national-num.json'
import { inject } from 'vue';
export default {
    data (){
        return{
            db:[],
            isShow:false,
            type:'number',
            searchNumberCard:null,
            resultSearchNumber:{city:null,num:null},
            searchNameBank:null,
            showSearchBox:false,
            resultSearchBank:null,
            resultBox:false,
        }
    },
    setup(){
        const dark = inject("dark")
        return{dark}
    },
    methods:{
        checkNumber(){
            if(this.searchNumberCard.length != 3)
                this.resultSearchNumber = {city:null,num:null}
            else if(this.searchNumberCard.length == 3 && this.resultSearchNumber.city == null)
                this.resultSearchNumber = {city:'err',num:null}
        },
        showResultNumber(){
            if(this.searchNumberCard != null && this.searchNumberCard.length == 3){
                datas['national-number'].forEach((item)=>{
                    item.num.forEach((num)=>{
                        if(Number(num) == Number(this.searchNumberCard)){
                            this.resultSearchNumber = item   
                        }
                    })
                })
            }
        },
        showHelp(){
            if(this.searchNameBank.length !=0){
                this.resultSearchBank = datas['national-number'].filter((item)=>{
                    return item.city.search(this.searchNameBank) == 0
                })
                this.showSearchBox = true
                this.resultBox = false
            }else{
                this.resultBox = false
                this.resultSearchBank = datas['national-number']
                this.showSearchBox = false
            }
            
        },
        selectBank(e){
            this.searchNameBank = e.target.innerHTML
            this.showSearchBox = false
            this.resultBox = true
        },
        hiddeonBox(e){
            if(e.target.className == 'searchNameBank' || e.target.className == 'item'){}
            else
                this.showSearchBox = false
        },
        btnSearch (){
            var check = datas['national-number'].filter((item)=>{
                  return item.city.search(this.searchNameBank) == 0
            })
            if(check.length == 1){
                this.resultSearchBank = check
                this.showSearchBox = false
                this.resultBox = true
            }
        }
    },
    watch:{
        searchNumberCard(){
            this.showResultNumber()
        },
        searchNameBank(){
            this.showHelp()
        }
    },
    created (){
            // console.log(datas['national-number']);
        document.title='تولبو | جستجو کد ملی شهر ها '
        this.resultSearchBank = this.banks
        this.db.push(dbG.dataBox[8].item[1])
        this.db.push(dbG.dataBox[8].item[2])
        this.db.push(dbG.dataBox[8].item[3])
        setTimeout(() => {
            this.isShow = true
        }, 100);
    },
    components:{navs,footers,locations,usageSide,sidePage,loader,dbG}
}
</script>
<template>
    <loader v-show="!isShow"/>
    <div v-show="isShow" @click="hiddeonBox">
        <navs/>
        <locations title="جستجو کد ملی شهر ها" PN="سایر" PNR="/other"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="dark ? 'tool_D' : ''">
                <div class="title_tool">جستجو کد ملی شهر ها </div>
                <div class="navigation">
                    <div class="itemNav" :class="type=='number'?'selected':''" @click="type='number'">جستجو شهر بر اساس شماره ملی</div>
                    <div class="itemNav" :class="type!='number'?'selected':''" @click="type='bank'">جتسجو پیش شماره ملی براساس شهر</div>
                </div>
                <div class="inputs" v-show="type == 'number'">
                    <div class="label">
                        <div>سه رقم اول شماره ملی :</div>
                        <div><input type="text" placeholder="به طور مثال : 264" v-model="searchNumberCard" @keydown="checkNumber"></div>
                    </div>
                    <button class="bn632-hover"><span class="fontIcon">&#xe906;</span>جستجو </button>
                </div>
                <div class="inputs" v-show="type != 'number'">
                    <div class="label">
                        <div>نام شهر:</div>
                        <div class="c_complate">
                            <input class="searchNameBank" type="text" placeholder="نام شهر مورد نظر را وارد کنید." @keypress.enter="btnSearch" v-model="searchNameBank" @focus="showSearchBox ? showSearchBox = false : showSearchBox = true">
                            <div class="complate" :class="dark ? 'complate_D':''" v-show="showSearchBox">
                                <div class="item" :class="dark?'item_D':''" v-for="banks in resultSearchBank" @click="selectBank">{{banks.city}}</div>
                            </div>
                        </div>
                    </div>
                    <button class="bn632-hover" @click="btnSearch"><span class="fontIcon">&#xe906;</span>جستجو </button>
                </div>
                <div class="result" :class="dark ? 'Result_D':''" v-show="resultSearchNumber.city != null && resultSearchNumber.city != 'err'&& type == 'number'">
                    <span>نتیجه : </span>
                    <span class="colorCustom">{{resultSearchNumber.city}}</span>
                </div>
                
                <div class="result" :class="dark ? 'Result_D':''" v-show="resultSearchNumber.city == 'err'&& type == 'number'">
                    <span>نتیجه : </span>
                    <span class="colorCustom">برای این شماره کارت، بانکی پیدا نشد!</span>
                </div>
                <div class="result" :class="dark ? 'Result_D':''" v-if="type != 'number' && resultBox">
                    <span>نتیجه : </span>
                    <span class="colorCustom" v-for="(item , index) in resultSearchBank[0].num"><span v-if="index != 0"> - </span>{{item }}</span>
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
.navigation{
    background-color:#0e2338;
    color:#fff;
    display: flex; 
    padding: 0 10px;
    gap:20px;
}
.itemNav{
    cursor:pointer;
    padding:10px;
}
.selected{
    animation:test ease .5s;
    border-bottom: 4px solid #99c432;
}
@keyframes test{
    from{
        opacity:0;
        color:#212172;
    }
    to{
        opacity: 1;
        color:#fff;
    }
}
.inputs{
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap:50px;
    padding:20px;
    justify-content: center;
}
.inputs input{
    margin-top: 10px;
    width: 300px;
}
.result{
    background:#f1f1f1;
    border-radius: 5px;
    padding:20px;
    margin:20px;
    border:1px solid rgba(0, 0, 0, 0.356);
}
.colorCustom{
    color: #3b82f6 !important;
}
.c_complate{
    position: relative;
}
.complate{
    max-height: 200px;
    overflow-y: scroll;
    width: 300px;
    margin:0 auto;
    position: absolute;
    background-color: #ffffff;
}
.complate_D{
    background-color: #0e2338;
}
.item{
    border-bottom:1px solid #000 ;
    padding:5px;
    cursor:pointer;
    transition: .1s all ease;
}
.item:hover{
    background-color: #dfdfdf;
}
.item_D{
    border: 1px solid #3b82f633;
}
.item_D:hover{
    background-color: #173049;
}
@media screen and (max-width:740px) {
    .itemNav{
        font-size: 16px;
    }
    .complate{
        max-height: 130px;
    }
}
@media screen and (max-width:640px) {
    .itemNav{
        font-size: 14px;
    }
    .inputs{
        gap:20px;
    }
    .result{
        margin:0 20px;
    }
}
@media screen and (max-width:540px) {
    .tool{
        font-size: 17px;
    }
    .itemNav{
        font-size: 12px;
        padding:10px 0px;
    }
    .inputs{
        padding-bottom: 0;
    }
}
@media screen and (max-width:440px) {
    .tool{
        font-size: 16px;
    }
    .itemNav{
        font-size: 11px;
        padding:10px 0px;
    }
    .inputs{
        padding-bottom: 0;
    }
}

</style>