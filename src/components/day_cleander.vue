<script>
export default {
    props:['item']
}
</script>
<template>
    <div v-if="item.dayC" class="today"></div>
    <div>{{item.day}}</div>
    <div class="c_day">
        <div>{{item.dayM}}</div>
        <div>{{item.dayG}}</div>
    </div>   
</template>
<style scoped>
.c_day{
    display: flex;
    justify-content:space-around;
    font-size:12px;
}
.today{
    width: 30px;
    height: 10px;
    background: #99c432;
    position: absolute;
    top: 0;
    right: -18%;
    transform: rotate(42deg);
}
@media screen and (max-width:540px) {
    .c_day{
        font-size: 10px;
    }    
    .today{
        right: -28%;
    }
}
@media screen and (max-width:440px) {
    .today{
        right: -34%;
    }
}
</style>