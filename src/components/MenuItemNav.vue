<script>
import { inject } from 'vue';

export default{
    data(){
        return{
            isDesktop:false,
        }
    },
    props:["data","i","isShow"],
    setup(){
        const dark = inject("dark")
        return{dark}
    },
    methods:{
        checkSize(){
            if(window.innerWidth > 700)
                this.isDesktop = true
            else
                this.isDesktop = false
        },
        showLinkDesktop(e){
            if(e.target.className == 'MD_I' || e.target.className == 'MD_I MD_ID'){
                const elemNum = e.target.getAttribute('data-Symbol')
                this.elemShow = this.$emit('sele',elemNum,'tools')
            }
        },
        showLink(e){
            const elemNum = e.target.getAttribute('data-Symbol')
            this.elemShow = this.$emit('sele',elemNum,'tools')
        }
    },
    created(){
        this.checkSize()
        window.addEventListener('resize',this.checkSize)
    }
}
</script>
<template>
    <router-link v-if="isDesktop" :to="data.url" :title="data.item.length + ' ابزار محاسباتی'" class="MD_I" :class="dark ? 'MD_ID':''" @mouseover="showLinkDesktop" :data-symbol="'Item_'+i">
        <div class="MD_I_T">{{data.title}}</div>
        <span class="fontIconNew MD_I_I">&#xe903;</span>
        <div class="MD_I_D showBox" :class="dark ? 'MD_I_D_D':''" v-show="isShow == 'Item_'+i">
            <router-link v-for="item in data.item" :title="item.sub" :to="item.url"><div class="MD_I_D_I" :class="dark ? 'MD_I_D_I_D':''">{{ item.title }}</div></router-link>
        </div>
    </router-link>
    <div v-else :title="data.item.length + ' ابزار محاسباتی'" class="MD_I" @click="showLink" :class="dark ? 'MD_ID':''" :data-symbol="'Item_'+i">
        <div :data-symbol="'Item_'+i" class="MD_I_T">{{data.title}}</div>
        <span :data-symbol="'Item_'+i" class="fontIconNew MD_I_I">&#xe903;</span>
        <div class="MD_I_D showBox" :class="dark ? 'MD_I_D_D':''" v-show="isShow == 'Item_'+i">
            <router-link v-for="item in data.item" :title="item.sub" :to="item.url"><div class="MD_I_D_I" :class="dark ? 'MD_I_D_I_D':''">{{ item.title }}</div></router-link>
        </div>
    </div>
</template>
<style scoped>
.MD_I{/* Menu Drop Item */
    padding:8px 20px;
    border-radius: 6px;
    gap: 50px;
    display: grid;
    grid-template-columns: 50px 20px;
    transition:.1s all ease-out;
    align-items: center;
    position: relative;
}
.MD_I:hover{
    background-color: #3b82f6;
    color: #ebf2fe;
}
.MD_ID{
    color: #ffffff;
}
.MD_I_T{
    font-size: 13px;
}
.MD_I_D{
    background-color:#ffffff;
    position: absolute;
    top: 0;
    right:100%;
    border-radius: 7px;
    padding:5px 3px;
    margin-right: 4px;
    width: 220px;
    z-index: 1;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}
.MD_I_D_D{
    background-color:#0e2338;
    color:#ffffff;
    box-shadow: #3b83f617 0px 4px 12px;
}
.MD_I_D_I{ /* menu drop item drop item*/
    color:#334155;
    font-size: 13px;
    border-radius: 6px;
    padding:5px 20px;
    transition: .1s all cubic-bezier(.4,0,.2,1);
}
.MD_I_D_I_D{
    color:#ffffff;
}
.MD_I_D_I:hover{
    background-color: #3b82f6;
    color: #ebf2fe;
}
.showBox{
    animation:showBox .3s ease  forwards;
}
@keyframes showBox {
    0%{
        opacity: .5;
        right: 90%;
    }
    50%{
        opacity: 1;
    }
}
@media screen and (max-width:878px) {
    .MD_I_T{
        font-size: 11px;
    }
    .MD_I{
        gap: 35px;
    }
}
@media screen and (max-width:878px) {
    .MD_I_D{
        width: 200px;
    }
    .MD_I_D_I{
        font-size: 11px;
    }
}
@media screen and (max-width:740px) {
    .MD_I_D{
        width: 145px;
    }
    .MD_I_D_I{
        font-size: 10px;
    }
}
@media screen and (max-width:540px) {
    .MD_I_D{
        width: 135px;
    }
    .MD_I_D_I{
        font-size: 9px;
    }
}
@media screen and (max-width:489px) {
    .MD_I_T{
        font-size: 9px;
    }
}
</style>