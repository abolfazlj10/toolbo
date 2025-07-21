<script>
export default{
    props:["title","PN","PNR"]
}
</script>
<template>
<div class="container_m">
    <div class="titleBox">
        <div class="title">{{title}}</div>
        <div class="location">
            <div class="fontIcon">&#xe904</div>
            <RouterLink to="/">خانه</RouterLink>
            <div class="slash">/</div>
            <RouterLink :to="PNR">{{PN}}</RouterLink>
            <div class="slash">/</div>
            <RouterLink to="#">{{title}}</RouterLink>
        </div>
    </div>
</div>
</template>
<style scoped>
a{
    transition: .1s all ease-in;
}
.titleBox{
    background-color: #3b82f6;
    color: #fff !important;
    width: 60%;
    margin-top: 10px;
    border-radius: 4px;
    padding: 8px 16px;
    text-align: right;
    margin-right: 70px;

}
.location{
    display: flex;
    gap: 5px;
    color: #ffffffc7;
    font-size: 13px;
    margin-top: 5px;
}
.fontIcon{
    color: #ffffffc7;
    cursor: default;
}
a:hover{
    color: #ffffff88;
}
.slash{
    cursor: default;
}
@media screen and (max-width:840px) {
    .titleBox{
        margin-right: 20px;
    }
}
@media screen and (max-width:740px) {
    .titleBox{
        padding: 5px 14px;
        width: 50%;
    }
    .location{
        font-size: 11px;
        gap:4px;
    }
}
@media screen and (max-width:640px) {
    .titleBox{
        margin-right: 0;
    }
}
@media screen and (max-width:540px) {
    .title{
        font-size: 12px;
    }
    .location{
        font-size: 9px;
        gap:4px;
    }
}
</style>