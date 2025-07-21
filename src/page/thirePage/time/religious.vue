<script>
import navBarVue from '../../../components/navBar.vue';
import footerVue from '../../../components/footer.vue';
import locationBarVue from '../../../components/locationBar.vue';
import toolsUsageVue from '../../../components/toolsUsage.vue';
import side  from '../../../components/sidePage.vue';
import loader from '../../../components/loader.vue';
import dbG from '../../../data/db.json'
import dbR from '../../../data/religious.json'
import { inject } from 'vue';
export default {
    data(){
        return{
            db:[],
            resultS:[],
            showCity:false,
            search:'',
            dbCity:null,
            isShow:false,
            showReligious:false,
            NameCity:null,
            date:null,
            eMorining:null,
            eNoon:null,
            eMaghreb:null,
            Sunrise:null, // tolou sobh
            Sunset:null, // ghorob aftab
            Midnight:null, // nimeShab sharii
        }
    },
    setup(){
        const dark = inject("dark")
        return{dark}
    },
    methods:{
        async sendReq(num){
            const send = await fetch('https://prayer.aviny.com/api/prayertimes/'+num)
            const data = await send.json()
            await this.getDateNow()
            this.NameCity = data.CityName
            this.eMorining = this.rSecond(data.Imsaak)
            this.eNoon = this.rSecond(data.Noon)
            this.eMaghreb = this.rSecond(data.Maghreb)
            this.Sunrise = this.rSecond(data.Sunrise)
            this.Sunset = this.rSecond(data.Sunset)
            this.Midnight = this.rSecond(data.Midnight)
        },
        async getDateNow (){
            const send = await fetch('https://api.keybit.ir/time/')
            const data = await send.json()
            this.date = data.date.weekday.name+' '+ data.date.day.number.en+' '+data.date.month.name+' '+data.date.year.number.en+' - '+this.rSecond(data.time24.full.en)
        },
        keySearch(){
            this.resultS = this.dbCity.filter((key)=>{
                return key.Name.search(this.search) == 0
            })

            if(this.search.length >= 2 && this.resultS.length > 0)
                this.showCity = true
            else 
                this.showCity = false
            this.showReligious = false
        },
        async selectCity(city){
            await this.sendReq(city)
            this.showCity = false
            this.showReligious = true
        },
        rSecond(time){
            let test = time.lastIndexOf(':')
            return time.slice(0,test)
        }
    },
    async created(){
        document.title='تولبو |  اوقات شرعی '
        this.dbCity = dbR.city
        await this.getDateNow()
        
        this.db.push(dbG.dataBox[0].item[3])
        this.db.push(dbG.dataBox[0].item[5])
        this.db.push(dbG.dataBox[0].item[6])

        this.isShow = true
    },
    components:{navBarVue,footerVue,locationBarVue,toolsUsageVue,side ,loader}
}
</script>
<template>
    <loader v-show="!isShow"/>
    <div v-show="isShow">
        <navBarVue/>
        <locationBarVue title=" اوقات شرعی" PN="زمان" PNR="/time"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="[(!showReligious ? 'HTool' : ''),(dark ? 'tool_D' : '')]">
                <div class="title_tool">اوقات شرعی شهر های ایران</div>
                <div class="cadr">
                    <div class="CityCadr">
                        <div>شهر مورد نظر خود را وارد کنید :</div>
                        <div>
                            <input type="text" placeholder="به طور مثال : تهران" v-model="search" @keydown="keySearch" class="City">
                            <div v-show="showCity" class="complateBox">
                                <div class="complateItem" :class="dark ? 'complateItem_D':''" v-for="city in resultS" @click="selectCity(city.Code)">{{city.Name}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-show="showReligious" class="result" :class="dark ? 'result_D':''">
                    <div class="titileResult">اوقات شرعی {{NameCity}}</div>
                    <div class="date">{{date}}</div>
                    <div class="bb">
                        <div class="rel"><span class="TC"> اذان صبح :</span><span>{{eMorining}}</span></div>
                        <div class="rel"><span class="TC"> طلوع آفتاب :</span><span>{{Sunrise}}</span></div>
                    </div>
                    <div class="bb">
                        <div class="rel"><span class="TC">  اذان ظهر :</span><span>{{eNoon}}</span></div>
                        <div class="rel"><span class="TC">  غروب آفتاب :</span><span>{{Sunset}}</span></div>
                    </div>
                    <div class="bb" style="border-bottom:none;">
                        <div class="rel"><span class="TC"> اذان مغرب:</span><span>{{eMaghreb}}</span></div>
                        <div class="rel"><span class="TC"> نیمه شب شرعی :</span><span>{{Midnight}}</span></div>
                    </div>
                </div>
            </div>
            <side/>
            <toolsUsageVue :db="db"/>
        </div>
        </div>
        <footerVue/>
    </div>
</template>
<style scoped>
.heightTool{
    height: 180px;
}
.cadr{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}   
.CityCadr{
    margin-top: 20px;
    margin-bottom: 10px;
    width: 250px;
    text-align: right;
}
.City{
    margin-top: 10px;
    width: 100%;
    padding:0 5px;
}
.complateBox{
    max-height:200px;
    overflow-y: scroll;
    border:1px solid rgba(0, 0, 0, 0.384);
}
.complateItem{
    border-bottom:1px solid rgba(0, 0, 0, 0.384);
    text-align:center;
    padding:4px 0;
    cursor:pointer;
    background-color: #f1f1f1;
    transition: .1s ease-in all;
}
.complateItem_D{
    background-color: #0e2338;
}
.complateItem:hover{
    background-color: #cbc9c9;
}
.complateItem_D:hover{
    background-color: #132f49;
}
.result{
    background-color: #f1f1f1;
    margin:20px;
    border:1px solid rgba(0, 0, 0, 0.432);
    border-radius: 5px;
    transition: all .3s ease-in-out;
}
.result_D{
    background-color:#0e2338;
}
.titileResult{
    background-color: #3b82f6;
    color:#fff;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    padding:7px;
    transition: all .3s ease-in-out;
}
.date{
    margin:5px 0;
}
.bb{
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-bottom:1px solid rgba(0, 0, 0, 0.37);
    padding:8px 0;
    margin:0 15px;
}
.rel{
    display: flex;
    justify-content: center;
    gap:5px;
}
.TC{
    color: #3b82f6;
}
@media screen and (max-width:640px){
    .City,.tool{
        font-size:16px;
    }    
}
@media screen and (max-width:540px){
    .City,.tool{
        font-size:15px;
    }    
    .complateBox{
        max-height: 140px;
    }
}
@media screen and (max-width:440px){
    .City,.tool{
        font-size:14px;
    }    
    .bb{
        margin: 0 4px;
    }
}
</style>