<script>
import { inject } from 'vue';

export default {
    props : ["title","subTitle","url"],
    setup(){
        const dark = inject("dark")
        return{dark}
    }
}
</script>
<template>
<routerLink :title="subTitle + ' | ' + title" :to="url" class="cUsage">
    <div class="boxUsage" :class="dark ? 'boxUsage_D' : ''">
        <div class="hoverBox"></div>
        <div class="title" :class="dark ? 'title_D' : ''">{{title}}</div>
        <div class="sub icons mt-2">{{subTitle}}</div>
    </div>
</routerLink>
</template>
<style scoped>
.boxUsage{
    background-color: #ffffff73;
    backdrop-filter: blur(20px);
    padding: 24px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
    color: #333333;
    border-radius: 50% 20% / 10% 40%;
    border-radius: 9px;
    transition: .3s all ease;
    text-align: center;
}
.boxUsage_D{
    background-color: #0e2338cf;
    backdrop-filter: blur(20px);
}
.boxUsage:hover{
    box-shadow: 10px 5px 15px 10px rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
}
.title{
    font-size: 18px;
}
.title_D{
    transition: color .3s ease-in-out;
    color:#ffffff;
}
.hoverBox{
    position: absolute;
    /* background: linear-gradient(to right bottom ,#3b82f6,#2570eb); */
    background: linear-gradient(to right bottom ,#609afa,#1e55af);
    backdrop-filter: blur(20px);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: scaleY(0);
    transform-origin: top center;
    transition: all 0.3s ease;
    z-index: 2;
    border-radius:9px;
}
.cUsage{
    position: relative;
}
.cUsage:hover .hoverBox{
    transform: scaleY(1);
}
.cUsage:hover .title{
    color:#fff;
    z-index: 2;
}
.cUsage:hover .sub{
    color:#fff;
    z-index: 2;
}
.sub{
    font-size: 14px;
    margin-top: 10px;
    color:#3b82f6;
}

@media screen and (max-width:940px) {
    .title{
        font-size: 17px;
    }
    .sub{
        font-size: 13px;
    }
}
@media screen and (max-width:840px) {
    .boxUsage{
        padding: 19px 10px;
    }
    .title{
        font-size: 16px;
    }
    .sub{
        font-size: 12px;
    }
}
@media screen and (max-width:640px) {
    .title{
        font-size: 15px;
    }
    .sub{
        font-size: 10px;
    }
}
@media screen and (max-width:540px) {
    .title{
        font-size: 12px;
    }
    .sub{
        font-size: 9px;
    }
}
@media screen and (max-width:440px) {
    .title{
        font-size: 13px;
    }
    .sub{
        font-size: 10px;
    }
}
</style>