<script>
import loader from '../components/loader.vue'
import navBar from '../components/navBar.vue'
import footerBox from '../components/footer.vue'
import box_home from '../components/box_home.vue'
import dataBase from '../data/db.json'
import { inject } from "vue";
export default {
    props:['section'],
    data (){
        return {
            db : [{on:[]},{two:[]}],
            isShow:false
        }
    },
    setup() {
        const dark = inject("dark");
        return {dark};
    },
    methods:{
        GP(){
            let test;
            const params = this.$route.query.section
            if(params != {}){
                if(params == 'recumended'){
                    test = document.getElementById('toolsRecomendend')
                    setTimeout(() => {
                        test.scrollIntoView()
                    }, 100);
                }
                else if(params == 'toolsUsage'){
                    test = document.getElementById('toolsUsage')
                    setTimeout(() => {
                        test.scrollIntoView()
                    }, 100);
                }
            }
        }
    },
    async created () {
        this.db[0].on = await dataBase.dataBox
        this.db[1].two = await dataBase.recomendend
        document.title = "تولبو | ToolBo"
        setTimeout(() => {
            this.isShow = true
            this.GP()
        },  500);
    },
    components : {box_home,footerBox,navBar,loader}
}
</script>
<template>
    <loader v-show="!isShow"/>
    <div v-show="isShow">
        <navBar/>
        <div class="C">
            <div class="container_m">
                <h3 class="TS" :class="dark ?'TS_D':''" id="toolsUsage">ابزار های کاربردی</h3>
                <div class="box_tools">
                    <box_home v-for="items in db[0].on " :title="items.title" :icon="items.icon" :link="items.url" :lengthTool="items.item"></box_home>
                </div>
                <h3 class="TS" :class="dark ?'TS_D':''" id="toolsRecomendend">ابزار های پیشنهادی</h3>
                <div class="box_tools">
                    <box_home v-for="items in db[1].two " :title="items.title" :icon="items.icon" :link="items.url" :info="items.info"></box_home>
                </div>
            </div>
        </div>
        <footerBox/>
    </div>
</template>
<style scoped>
.box_tools{
    display: grid;
    grid-template-columns: repeat(4 , 1fr);
    gap: 27px 36px;
}
.C{
    margin-bottom: 56px !important;
    overflow-x:hidden;
}
.TS{/* title section*/
    margin-top: 10px;
    padding:20px 0;
    color:#334155;
    transition: all .3s ease-in-out;
}
.TS_D{/* title section dark */
    color:#ffffff;
}
@media screen and (max-width:1100px) {
    .box_tools{
        grid-template-columns: repeat(3 , 1fr);
        gap: 27px 77px;
    }
}
@media screen and (max-width:974px) {
    .box_tools{
        gap: 27px 39px;
    }
    .TS{
        font-size: 18px;
    }
}
@media screen and (max-width:880px) {
    .box_tools{
        gap: 27px 19px;
    }
}
@media screen and (max-width:776px) {
    .box_tools{
        grid-template-columns: repeat(2 , 1fr);
        gap: 27px 54px;
    }
    .TS{
        padding: 20px 0;
        font-size: 16px;
    }
}
@media screen and (max-width:680px) {
    .TS{
        padding: 20px 0;
        font-size: 15px;
    }
}
@media screen and (max-width:583px) {
    .box_tools{
        gap: 27px 18px;
    }
    .TS{
        padding: 20px 0;
    }
}
@media screen and (max-width:576px) {
    .box_tools{
        grid-template-columns: repeat(1 , 1fr);
    }
    .TS{
        font-size: 14px;
    }
}
@media screen and (max-width:424px) {
    .TS{
        padding: 20px 0;
    }
}
</style>