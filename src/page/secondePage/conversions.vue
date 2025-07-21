<script>
import box from '../../components/box_second.vue'
import dataBase from '../../data/db.json'
import navBar from '../../components/navBar.vue'
import footerVue from '../../components/footer.vue'
import loader from '../../components/loader.vue'
export default {
    data (){
        return {
            db : [],
            isShow:false
        }
    },
    created (){
        document.title = "تولبو | تبدیل ها"
        dataBase.dataBox.forEach((item)=>{
            if (item.url == '/conversions')
                this.db = item.item
        })
        setTimeout(() => {
            this.isShow = true
        },  500);
    },
    components : {box,navBar,footerVue,loader}
}
</script>
<template>
    <loader v-show="!isShow"/>
        <div v-show="isShow">
        <navBar/>
        <div class="container_m">
            <div class="c_secondPage">
                <box v-for="item in db" :title="item.title" :subTitle="item.sub" :url="item.url"></box>        
            </div>
        </div>
        <footerVue class="fixF"/>
    </div>
</template>
<style scoped>
@media screen and (min-width:947px)  and (min-height:906px) {
    .fixF{
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
@media screen and (max-width:947px) and (min-width:890px) and (min-height:880px) {
    .fixF{
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
@media screen and (max-width:890px) and (min-width:767px) and (min-height:810px) {
    .fixF{
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
@media screen and (max-width:767px) and (min-width:740px) and (min-height:812px) {
    .fixF{
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
@media screen and (max-width:740px) and (min-width:527px) and (min-height:868px) {
    .fixF{
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
@media screen and (max-width:527px) and (min-width:440px) and (min-height:836px) {
    .fixF{
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
@media screen and (max-width:440px) and (min-width:0px) and (min-height:1006px) {
    .fixF{
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
</style>