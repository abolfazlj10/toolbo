<script>
import box from '../../components/box_second.vue'
import dataBase from '../../data/db.json'
import nav_j10 from '../../components/navBar.vue'
import footer_j10 from '../../components/footer.vue'
import loader from '../../components/loader.vue'
export default {
    data (){
        return {
            db : [],
            isShow:false
        }
    },
    created (){
        document.title = "تولبو | سایر"
        dataBase.dataBox.forEach((item)=>{
            if (item.url == '/other')
                this.db = item.item
        })
        setTimeout(() => {
            this.isShow = true
        },  500);
    },
    components : {box,nav_j10,footer_j10,loader}
}
</script>
<template>
    <loader v-show="!isShow"/>
    <div v-show="isShow">
        <nav_j10/>
        <div class="container_m">
            <div class="c_secondPage">
                <box v-for="item in db" :title="item.title" :subTitle="item.sub" :url="item.url"></box>        
            </div>
        </div>
        <footer_j10 class="fixF" />
    </div>
</template>
<style scoped>
@media screen and (min-width:947px)  and (min-height:908px) {
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
@media screen and (max-width:890px) and (min-width:767px) and (min-height:814px) {
    .fixF{
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
@media screen and (max-width:767px) and (min-width:740px) and (min-height:786px) {
    .fixF{
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
@media screen and (max-width:740px) and (min-width:527px) and (min-height:764px) {
    .fixF{
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
@media screen and (max-width:527px) and (min-width:440px) and (min-height:742px) {
    .fixF{
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
@media screen and (max-width:440px) and (min-width:0px) and (min-height:908px) {
    .fixF{
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
</style>