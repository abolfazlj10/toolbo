<script>
import box from '../components/box_second.vue'
import { inject } from 'vue';

export default{
    props:["db"],
    setup(){
        const dark = inject("dark")
        return{dark}
    },
    components:{box}
}
</script>

<template>
    <div class="toolsUsage">
        <div class="headingTU" :class="dark ? 'headingTU_D':''">ابزار های مرتبط</div>
        <div class="containerTU">
            <box v-for="item in db" :title="item.title" :subTitle="item.sub" :url="item.url"/>
        </div>
    </div>
</template>

<style>
.headingTU{
    font-size: 20px;
    margin: 20px 0;
    color:#354256;
    transition: all .3s ease-in-out !important;
}
.headingTU_D{
    color:#ffffff;
}
.containerTU{
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap:30px;
}
.titleUT{
    color: #354256;
    font-size:18px;
    transition: all .3s ease-in-out;
}
.sub{
    color: #3b82f6;
    font-size: 12px;
}
@media screen and (max-width:840px) {
    .containerTU {
        grid-template-columns: repeat(2,1fr);
    }
}
@media screen and (max-width:440px) {
    .containerTU {
        grid-template-columns: repeat(1,1fr);
    }
}
</style>