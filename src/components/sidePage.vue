<script>
import db from '../data/db.json'
import { inject } from 'vue';

export default{
    data(){
        return{
            isShow:false,
            dis:false,
            isElem:false
        }
    },
    setup(){
        const dark = inject("dark");
        const favourite = inject("arrFAV");
        return{dark,favourite,
            operationManageFAV(data){
                const search = this.favourite.some((item)=>{
                    return item.title == data.title
                })
                if(!search){
                    this.favourite.push(data)
                    localStorage.setItem("favourite",JSON.stringify(this.favourite))
                    this.isElem = true
                }else{
                    const findeObj = this.favourite.findIndex((item)=>{
                        return item.title == data.title
                    })
                    this.favourite.splice(findeObj,1)
                    localStorage.setItem("favourite",JSON.stringify(this.favourite))
                    this.isElem = false
                }
            }
        }
    },
    methods:{
        manageFAV(){
            let title = document.title.replace('تولبو | ','')

            var finder = null
            db.dataBox.forEach((item)=>{
                item.item.filter((dataI)=>{
                    if(dataI.title == title){
                        finder =  dataI
                    }
                })
            })
            this.operationManageFAV(finder)

            if(!this.isShow)
                this.isShow = true
                
        },
        isElemFunc(){
            let title = document.title.replace('تولبو | ','');
            const search = this.favourite.some((item)=>{
                return item.title == title
            })
            if(!search)
                this.isElem = false
            else
                this.isElem = true
        }
    },
    watch:{
        isShow(a){
            if(a){
                this.dis = true
                setTimeout(() => {
                    this.isShow = false
                }, 2000);
            }else{
                setTimeout(() => {
                    this.dis = false
                }, 800);
            }
        }
    },
    created(){
        this.isElemFunc()
    }
}
</script>

<template>
    <div class="side">
        <div class='at-container'>
            <div v-if="!isElem" :class="isShow?'at-item':'at-items'" v-show="dis">
                <div>با موفقیت حذف شد. :)</div>
                <div class="borderNotif"></div>
            </div>
            <div v-else :class="isShow?'at-item':'at-items'" v-show="dis">
                <div>با موفقیت اضافه شد. :)</div>
                <div class="borderNotif"></div>
            </div>
        </div>
        <div class="info" :class="dark ? 'info_D':''">
            <div>
                <span class="fontIcon IH">&#xe914;</span>در صورتی که این ابزار برای شما کاربردی بوده است میتوانید از طریق دکمه زیر آن را به ابزار های کاربردی اضافه کنید.</div>
            <button @click="manageFAV" class="btnAdd" :class="isElem ? 'btnAdd_A' : ''">
                <span v-if="isElem">حذف کردن </span>
                <span v-else>اضافه کردن</span>
            </button>
        </div>
    </div>
</template>

<style scoped>
.side{
    margin:0 auto;
    display: flex;
    flex-direction: column;
    gap:20px;
    align-items: flex-end;
}
.info{
    background-color: #fff;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
    text-align: justify!important;
    padding: 20px;
    font-size: 13px;
    line-height: 2;
    display: flex;
    flex-direction: column;
    transition: all .3s ease-in-out;
    max-width: 151px;
}

.info_D{
    background-color:#0c243f ;
    color: #ffffff;
}
.btnAdd{
    box-shadow:none;
}
.info .fontIcon{
    font-size:18px
}
.btnAdd{
    text-align: center;
    background-color:#f4485a;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 0px 3px #f4485a;
    transition: .1s all ease-in;
}
.btnAdd:hover{
    background-color: #f0384b;
    box-shadow: 0px 0px 5px #f4485a;
}
.btnAdd_A{
    background-color:#f4485abd;
}
.btnAdd_A:hover{
    background-color: #f44859d7;
    box-shadow: 0px 0prgba(247, 68, 86, 0.741)0;
}
.IH{
    color: #f4485a;
}
.at-item {
    background-color:#3b82f6;
    color:#fff;
}
.at-items {
    background-color:#3b82f6;
    color:#fff;
}
@media screen and (max-width:640px) {
    .info{
        font-size: 11px;
        padding: 16px;
        max-width: 135px;
    }    
}
@media screen and (max-width:540px) {
    .btnAdd{
        font-size: 12px;
    }
}
@media screen and (max-width:440px) {
    .info{
        font-size: 10px;
        padding: 16px;
        max-width: 125px;
    } 
    .btnAdd{
        font-size: 10px;
    }
}
</style>