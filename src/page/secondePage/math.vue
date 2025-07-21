<script>
import box from '../../components/box_second.vue'
import navVue from '../../components/navBar.vue'
import footerVue from '../../components/footer.vue'
import dataBase from '../../data/db.json'
import loader from '../../components/loader.vue'
export default {
    data (){
        return {
            db : [],
            isShow:false
        }
    },
    created (){
        document.title = "تولبو | ریاضی"
        dataBase.dataBox.forEach((item)=>{
            if (item.url == '/math')
                this.db = item.item
        })
        setTimeout(() => {
            this.isShow = true
        },  500);
    },
    components : {box,navVue,footerVue,loader}
}
</script>
<template>
    <loader v-show="!isShow"/>
    <div v-show="isShow">
        <navVue/>
        <div class="container_m">
            <div class="c_secondPage">
                <box v-for="item in db" :title="item.title" :subTitle="item.sub" :url="item.url"></box>        
            </div>
        </div>
        <footerVue class="fixF"/>
    </div>
</template>
<style scoped>
@media screen and (min-width:947px)  and (min-height:1046px) {
    .fixF{
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
@media screen and (max-width:947px) and (min-width:890px) and (min-height:1014px) {
    .fixF{
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
@media screen and (max-width:890px) and (min-width:767px) and (min-height:944px) {
    .fixF{
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
@media screen and (max-width:767px) and (min-width:740px) and (min-height:908px) {
    .fixF{
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
@media screen and (max-width:740px) and (min-width:527px) and (min-height:1082px) {
    .fixF{
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
@media screen and (max-width:527px) and (min-width:440px) and (min-height:1030px) {
    .fixF{
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
@media screen and (max-width:440px) and (min-width:0px) and (min-height:1342px) {
    .fixF{
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
</style>