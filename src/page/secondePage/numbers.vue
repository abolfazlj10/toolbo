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
        document.title = "تولبو | اعداد"
        dataBase.dataBox.forEach((item)=>{
            if (item.url == '/numbers')
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
@media screen and (min-height:1046px) and (min-width:947px) {
    .fixF{
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
@media screen and (min-height:1014px) and (min-width:890px) and (max-width:947px) {
    .fixF{
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
@media screen and (min-height:946px) and (min-width:767px) and (max-width:890px) {
    .fixF{
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
@media screen and (min-height:898px) and (min-width:740px) and (max-width:767px) {
    .fixF{
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
@media screen and (min-height:1080px) and (min-width:527px) and (max-width:740px) {
    .fixF{
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
@media screen and (min-height:1030px) and (min-width:440px) and (max-width:527px) {
    .fixF{
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
</style>