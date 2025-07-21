<script>
import { inject } from 'vue';

export default {
    props : ["title","icon","link","lengthTool","info"],
    data (){
        return {
            s : '&#x',
            firstTxtTools : " ابزار محاسباتی"
        }
    },
    setup(){
        const dark = inject("dark")
        return{dark}
    }
}
</script>
<template>
    <RouterLink :title="title +' | '+ lengthTool.length+firstTxtTools" :to="link" v-if="lengthTool != undefined" class="container_box">
        <div class="box_h" :class="dark ?'box_h_D':''">
            <div class="iconBox fontIconNew" :class="dark ?'iconBox_D':''" v-html="s+icon"></div>
            <div class="notifi"></div>
            <div class="title">{{title}}</div>
            <div class="tools_length">{{lengthTool.length+firstTxtTools}}</div>
        </div>
    </RouterLink>
    <a :href="link" :title="title +' | '+ info" target="_blank" v-else class="container_box">
        <div class="box_h" :class="dark ?'box_h_D':''">
            <div class="iconBox fontIconNew" :class="dark ?'iconBox_D':''" v-html="s+icon"></div>
            <div class="notifi"></div>
            <div class="title">{{title}}</div>
            <div class="tools_length">{{info}}</div>
        </div>
    </a>
</template>
<style scoped>
.box_h{
    background-color: #ffffff8f;
    backdrop-filter: blur(20px);
    color:#334155;
    height: 128px;
    padding: 18px 0;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 9%), 0 2px 10px 0 rgb(0 0 0 / 4%);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    border-radius: 9px;
    transition: all .3s ease-in-out;
}
.box_h_D{
    background-color: #0e2338cf;
    backdrop-filter: blur(20px);
    color: #ffffff;
}
.iconBox{
    padding: 10px;
    margin-top: -46px;
    background-color: #FFFFFF;
    width: 50%;
    color: #3b82f6;
    font-size: 25px;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 9%), 0 2px 10px 0 rgb(0 0 0 / 4%);
    border-radius: 4px;
    border-radius: 9px;
    z-index: 3;
    position: relative;
    transition: all .3s ease-in-out;
}
.iconBox_D{
    background-color:#0c243f;
}
.container_box{
    margin-top: 20px;
    position: relative;
    transition: .2s ease all;
}
.notifi{
    background-color: #3b82f6;
    width: 0%;
    height: 10px;
    position: absolute;
    top: 0;
    border-top-left-radius: 9px;
    border-top-right-radius: 9px;
    transition: .2s ease width;
}
.container_box:hover .notifi {
    width: 100%;
}
.tools_length{
    font-size: 12px;
    padding: 0px 30px;
    line-height: 19px;
}
.container_box:hover .iconBox{
    color: #FFFFFF;
    background-color: #3b82f6;
    transition: .2s ease all;
}
.title {
    font-size: 16px;
}
@media screen and (max-width:1255px) {
    .box_h{
        height: 122px;
    }
}
@media screen and (max-width:1222px) {
    .box_h{
        height: 114px;
    }
    .iconBox{
        font-size: 22px;
    }
    .title {
        font-size: 15px;
    }
    .tools_length{
        font-size: 11px;
    }
}
@media screen and (max-width:1100px) {
    .box_h{
        height: 135px;
    }
}
@media screen and (max-width:1035px) {
    .box_h{
        height: 115px;
    }
}
</style>