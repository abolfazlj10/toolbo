<script>
import dbG from '../data/db.json'
import item from '../components/MenuItemNav.vue'
import { inject } from "vue";
export default{
    data(){
        return{
            db:[],
            dbFavourite:[],
            dbfavFix:[],
            elemShow:null,
            showConinerMenu:false,
            showConinerMenuFAV:false,
            addPosition:false,
            containerNav:true,
            searcher:"",
            dbSearcher : {parent:[],child:[],recumended:[]}
        }
    },
    setup() {
        const dark = inject("dark");
        const arrFAV = inject("arrFAV");
        return {
        dark,
        arrFAV,
        changer() {
            if(this.dark)
                this.dark = false
            else
                this.dark = true
        }
        };
    },
    watch:{
        searcher(){
            this.dbSearcher = {parent:[],child:[],recumended:[]}
            if(this.searcher.length > 1){
                dbG.dataBox.forEach((item)=>{
                    if(item.title.includes(this.searcher))
                    this.dbSearcher.parent.push(item)
                })
    
                dbG.dataBox.forEach((data)=>{
                    data.item.forEach((item)=>{
                        if(item.title.includes(this.searcher) || item.sub.includes(this.searcher))
                        this.dbSearcher.child.push(item)
                    })
                })
    
                dbG.recomendend.forEach((item)=>{
                    if(item.title.includes(this.searcher))
                    this.dbSearcher.recumended.push(item)
                })
            }
        }
    },
    methods:{
        navStyle(){
            if(window.innerWidth > 1000){
                if(document.documentElement.scrollTop >= 170)
                    this.addPosition = true
                else
                    this.addPosition = false
            }
            if(window.innerWidth > 900){
                this.containerNav = true
            }else{
                this.containerNav = false
            }
        },
        selectitem(inp,type){
            if(type == 'tools'){
                this.elemShow = inp
                this.showConinerMenu = true
            }
        },
        shower(inp,type){
            if(type == 'tools'){
                if(inp){
                    if(this.dark)
                        this.$refs.boxTool.className = 'MD MD_D showBox'
                    else
                        this.$refs.boxTool.className = 'MD showBox'
                    this.showConinerMenu = true
                }
                else{
                    this.$refs.boxTool.className = 'MD hideBox'
                    setTimeout(() => {
                        this.showConinerMenu = false
                        this.elemShow = null
                    }, 100);
                }  
            }else{
                if(inp){
                    if(this.dark)
                        this.$refs.favourite.className = 'MDF MDF_D showBox'
                    else
                        this.$refs.favourite.className = 'MDF showBox'
                    this.showConinerMenuFAV = true
                }
                else{
                    this.$refs.favourite.className = 'MDF hideBox'
                    setTimeout(() => {
                        this.showConinerMenuFAV = false
                        this.elemShow = null
                    }, 100);
                }  
            }
        },
        GoScrool(type){
            try {
                let test
                if(type == 'rec')
                test = document.getElementById('toolsRecomendend')
                else
                test = document.getElementById('toolsUsage')
                test.scrollIntoView()
            } catch (error) {
                if(type == 'rec'){
                    this.$router.push({path:'/',query:{'section' : 'recumended'}})
                }
                else{
                    this.$router.push({path:'/',query:{'section' : 'toolsUsage'}})
                }
            }
        }
    },
    created(){
        this.navStyle()
        this.db = dbG.dataBox
        window.addEventListener("resize",this.navStyle)
        window.addEventListener("scroll",this.navStyle)
    },
    components:{item}
}
</script>
<template>
    <div :class="containerNav ? 'container_m' : ''">
        <div class="nav" id="top">
            <router-link class="SB" to="/" title="تولبو"><div class="N_T" :class="dark ?'N_C_D':''"><img src="../../public/ToolBo.png" alt="icon brand"></div></router-link>
            <div class="N_C" :class="dark ?'N_C_D':''">
                <router-link to="/" title="تولبو"><h1 class="B">TOOLBO</h1></router-link>
                <div class="S">
                    <input class="S_I" v-model="searcher" :class="dark ?'S_I_D':''" type="search" name="searchTool" placeholder="دنبال چی میگردی...">
                    <div v-if="dbSearcher.parent.length != 0 || dbSearcher.child.length != 0 || dbSearcher.recumended.length != 0" class="S_Box" :class="dark ? 'S_Box_D':''">
                        <router-link v-for="item in dbSearcher.parent" :title="item.item.length + ' ابزار محاسباتی'" :to="item.url" class="S_Item">
                            <div class="S_Item_T">{{ item.title }}</div>                            
                            <div class="S_Item_S" :class="dark ? 'S_Item_SD' : ''">{{ item.item.length }} ابزار محاسباتی</div>                            
                        </router-link>
                        <router-link v-for="item in dbSearcher.child" :title="item.sub" :to="item.url" class="S_Item">
                            <div class="S_Item_T">{{ item.title }}</div>
                            <div class="S_Item_S" :class="dark ? 'S_Item_SD' : ''">{{ item.sub }}</div>                            
                        </router-link>
                        <a v-for="item in dbSearcher.recumended" target="_blank" :title="item.info" :href="item.url" class="S_Item">
                            <div class="S_Item_T">{{ item.title }}</div>                            
                            <div class="S_Item_S" :class="dark ? 'S_Item_SD' : ''">{{ item.info }} </div>                            
                        </a>
                    </div>
                    <div v-if="dbSearcher.parent.length == 0 && dbSearcher.child.length == 0 && dbSearcher.recumended.length == 0 && searcher.length > 1" class="S_Box S_Box_NotF" :class="dark ? 'S_Box_D':''">پیدا نکردیم که ... :(</div>
                </div>
                <div @click="changer" class="T" :title="dark ? 'تیره':'روشن'" :class="dark ?'TD':''">
                    <div class="TI fontIconNew">&#xe900;</div>
                    <div class="TI fontIconNew">&#xe901;</div>
                    <span class="MT" :class="dark ?'MTD':''"></span>
                </div>
            </div>
            <div class="N_B" :class="[(addPosition ? 'fixNav container_m' : ''),(dark ?'N_B_D':'')]">
                <div class="N_B_OM" @mouseover="shower(true,'tools')" @mouseleave="shower(false,'tools')"><span>دسته بندی ها</span><span class="fontIconNew OM_I" :class="dark ? 'OM_I_D':''">&#xe902;</span>
                    <div class="MD showBox" :class="dark ? 'MD_D':''" v-show="showConinerMenu" ref="boxTool">
                        <item v-for="(item,i) in db" :data="item" :i="i" @sele="selectitem" :isShow="elemShow"/>
                    </div>
                </div>
                <div class="N_B_OM" @mouseover="shower(true)" @mouseleave="shower(false)">
                    <span>مورد علاقه</span><span class="fontIconNew OM_I" :class="dark ? 'OM_I_D':''">&#xe902;</span>
                    <div class="MDF showBox" :class="dark ? 'MDF_D':''" v-show="showConinerMenuFAV" ref="favourite">
                        <div v-if="arrFAV.length == 0" class="MD_IFDI">خالی</div>
                        <router-link v-for="item in arrFAV" :title="item.sub" :to="item.url" class="MD_IF" :class="dark ? 'MD_IFD':''">
                            <span class="MD_I_T">{{item.title}}</span>
                        </router-link>
                    </div>
                </div>
                <div class="CP" @click="GoScrool">کاربردی</div>
                <div class="CP" @click="GoScrool('rec')">پیشنهادی</div>
                <a href="https://expersian.ir/" target="_blank">درباره ما</a>
            </div>
        </div>
    </div>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Titan+One&display=swap');
.nav{
    margin:10px ;
    padding:10px 0;
    text-align: center;
    position: relative;
}
.SB{
    box-shadow: rgba(0, 0, 0, 0.1) 5px -5px 12px;
}
.N_T{ /* nav top */
    background-color: #ffffff;
    display:inline-block;
    padding: 13px 40px 6px 40px;
    font-weight: bold;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    transition: all .3s ease-in-out;
}
.N_T img{
    width: 45px;
}
.N_C{ /* nav center */
    background-color: #ffffff;
    display: grid;
    grid-template-columns: 1fr 12fr 2fr;
    align-items: center;
    padding:25px 50px;
    border-radius:18px;
    transition: all .3s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}
.N_C_D{
    background-color: #0e2338;
}
.N_B{ /* nav bottom */
    background-color:#d2d6de;
    color:#334155;
    width: 92%;
    margin:auto;
    font-size:15px;
    display: flex;
    justify-content: center;
    gap:80px;
    border-bottom-left-radius:18px;
    border-bottom-right-radius:18px;
    transition: background .3s ease-in-out, color .3s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}
.N_B > *:hover {
    color:#5c6777;
}
.N_B > *{
    transition: .1s all cubic-bezier(.4,0,.2,1);
    display: flex;
    align-items: center;
}
.N_B_D{
    background-color: #0c243f;
    color:#ffffff;
}
.N_B_D > *:hover{
    color:#d1dae7;
}
.N_B > * {
    padding:15px 0;
}
.B{ /* brand */
    color: #ff780a;
    text-align:right;
    font-family: 'Titan One', cursive;
    transition: .3s all cubic-bezier(.4,0,.2,1);
}
.B:hover{
    color:#ff7300e4;
}
.S{ /* search */
    padding:0 40px;
    position: relative;
}
.S_Box{
    background-color: #d2d6de7d;
    backdrop-filter: blur(8px);
    position: absolute;
    width: 91%; 
    min-height: 50px;
    max-height: 202px;
    z-index: 4;
    box-shadow: 0px 0px 9px 0px #3b82f624;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    transition: all .3s ease-in-out;
    animation:showsearch .5s ease  forwards;
}
.S_Box_NotF{
    justify-content: center;
}
.S_Box_D{
    background-color: #0c243fbf;
    color:#ffffff;
}
.S_Box::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.S_Box::-webkit-scrollbar-track {
    border: 1px solid #2d8bff7d;
  border-radius: 7px;
}
 
/* Handle */
.S_Box::-webkit-scrollbar-thumb {
  background: #2d8bff; 
  border-radius: 7px;
}

/* Handle on hover */
.S_Box::-webkit-scrollbar-thumb:hover {
  background: #2d8bffbd; 
}

.S_Item{
    border-bottom: 1px solid #00000029;
    padding: 8px 12px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: flex-start;
    
}
.S_Item_T{
    font-size: 16px;
}
.S_Item_S{
    font-size: 13px;
    color: #000000ad;
}
.S_Item_SD{
    color:#ffffffa8;
}
.S_I{/* search input */
    width: 100%;
    border:none;
    padding: 10px;
    font-size: 13px;
    text-align: right;
    border-radius: 10px;
    font-size: 12px;
    transition: all .3s ease-in-out;
    color:#000;
    background: none;
    border-bottom: 3px solid #d2d6de;
}
.S_I_D{
    background: none;
    border-bottom: 3px solid #1b314c;
    color:#fff;
}
.S_I:focus{
    border-bottom: 3px solid #2d8bff;
}
.S_I_D::placeholder{
    color:#f1f1f1;
    transition: all .3s ease-in-out;
}
.T{ /* theme */
    align-items: center;
    background: #d2d6de;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    flex-wrap: wrap;
    height: 32px;
    justify-content: space-between;
    padding: 0 15px;
    position: relative;
    width: 56px;
    font-size: 20px;
    color: #000000;
    justify-self: center;
    transition: all .3s ease-in-out;
}
.TD{/* theme dark */
    background-color: #1b314c;   
    color:#ffffff;
}
.TI{/* tehm icon*/
    z-index: 10;
    font-size: 17px;
}
.MT{/*Marker_them*/
    box-shadow: 0 4px 250px rgb(47 79 162 / 14%);
    background: #ffffff;
    border-radius: 5px;
    height: 80%;
    width: 50%;
    position: absolute;
    left: 28%;
    top: 50%;
    transform:translate(-50% , -50%);
    transition: all .3s ease-in-out;
    z-index: 1;
}
.MTD{
    left: 70%;
    background-color: #d2d6de5c;
}
.N_B_OM{/* nav bottom open menu */
    display: flex;
    justify-content: center;
    align-items: center;
    cursor:pointer;
    position: relative;
}
.OM_I{/* open menu icon */
    color:#334155;
    font-size:20px;
    transition: all .3s ease-in-out;
}
.OM_I_D{
    color:#ffffff;
}
.OM_I:hover{/* open menu icon */
    color:#334155;
}

.MD{/* Menu Drop */
    background-color: #ffffff;
    position: absolute;
    margin-top: -8px;
    top: 100%;
    left: 0;
    border-radius: 7px;
    padding:5px 3px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    z-index: 5;
    transition: .3s all cubic-bezier(.4,0,.2,1);
}
.MD_D{
    background-color:#0e2338;
    color:#ffffff ;
    box-shadow: #3b83f617 0px 4px 12px;
}
.MDF{/* Menu favourite Drop */
    background-color: #ffffff;
    position: absolute;
    margin-top: -8px;
    top: 100%;
    right: -65%;
    border-radius: 7px;
    padding:5px 3px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    z-index: 5;
    transition: .3s all cubic-bezier(.4,0,.2,1);
}
.MDF_D{
    background-color:#0e2338;
    color:#ffffff ;
    box-shadow: #3b83f617 0px 4px 12px;
}
.showBox{
    animation:showBox .3s ease  forwards;
}
.hideBox{
    animation:hidebox .3s ease  forwards;
}
@keyframes showBox {
    0%{
        top: 200%;
        opacity: .5;
    }
    50%{
        opacity: 1;
    }
    100%{
        top: 100%;
    }
}
@keyframes hidebox {
    0%{
        top: 100%;
        opacity: 1;
    }
    50%{
        opacity: 0;
    }
    100%{
        top: 200%;
    }
}
.fixNav{
    position: fixed;
    top: 2%;
    left: 50%;
    transform: translate(-50% , -50%);
    width: 64%;
    z-index: 10;
}
.MD_IF{/* Menu Drop Item */
    padding: 8px 20px;
    border-radius: 6px;
    display: flex;
    width: 185px;
    transition: .1s all ease-out;
    justify-content: center;
}
.MD_IF:hover{
    background-color: #3b82f6;
    color: #ebf2fe;
}
.MD_IFD{
    color: #ffffff;
}
.MD_IFDI{
    padding: 8px 20px;
    border-radius: 6px;
    display: flex;
    width: 185px;
    transition: .1s all ease-out;
    justify-content: center;
    cursor:auto;
}
@keyframes showsearch {
    0%{
        top: 100%;
        opacity: .5;
    }
    50%{
        opacity: 1;
    }
    100%{
        top: 100%;
    }
}

@media screen and (max-width:1000px) {
    .N_B{
        font-size: 13px;
    }
    .N_B > * {
        padding: 11px 0;
    }
    .N_C{
        padding: 19px 50px;
    }
    .S_I{
        border-bottom: 1px solid #d2d6de;
    }
    .S_I:focus{
        border-bottom: 1px solid #2d8bff;
    }
    .S_I_D{
        border-bottom: 1px solid #1b314c;
    }
    .B{
        font-size: 30px;
    }
}
@media screen and (max-width:878px) {
    .MD_I_T , .MD_IFDI{
        font-size: 11px;
    }
    .MD_IF , .MD_IFDI{
        width: 150px;
    }
}
@media screen and (max-width:840px) {
    .N_B{
        gap:50px;
    }
}
@media screen and (max-width:833px) {
    .N_T{
        padding: 10px 30px 3px 30px;
    }
    .N_T img{
        width: 40px;
    }
    .B{
        font-size: 27px;
    }
    .TI{
        font-size: 15px;
    }
    .S_I{
        padding: 7px 10px;
    }
    .N_B{
        font-size: 12px;
        gap: 60px;
    }
    .T{
        height: 30px;
        width: 50px;
    }
}
@media screen and (max-width:757px) {
    .S{
        padding:0 20px;
    }
    .B{
        font-size: 26px;
    }
    .N_B{
        gap: 51px;
    }
    .nav{
        margin: 2px 10px;
    }
    .S_Box{
        width: 92%;
    }
}
@media screen and (max-width:660px) {
    .N_B{
        font-size: 10px;
        gap: 45px;
        border-bottom-left-radius: 13px;
        border-bottom-right-radius: 13px;
    }
    .N_C{
        border-radius: 13px;
    }
}
@media screen and (max-width:606px) {
    .S_I{
        font-size: 11px;
    }
    .B{
        font-size: 24px;
    }
    .N_C{
        padding: 19px 33px;
    }

}
@media screen and (max-width:540px) {
    .N_B{
        gap:30px;
    }
}
@media screen and (max-width:526px) {
    .TI{
        font-size: 12px;
    }
}
@media screen and (max-width:490px) {
    .N_B{
        gap: 30px;
        font-size: 9px;
    }
    .T{
        height: 27px;
        width: 43px;
    }
    .B{
        font-size: 21px;
    }
    .N_T img{
        width: 30px;
    }
    .S{
        padding: 0 7px;
    }
    .N_C{
        padding: 17px 20px;
    }

}
@media screen and (max-width:450px) {
    .B{
        font-size: 19px;
    }
    .N_C{
        padding: 15px 17px;
        border-radius: 10px;
    }
    .N_B{
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        gap: 25px;
    }
    .N_B > *{
        padding: 7px 0;
    }
    .S_I{
        font-size: 9px;
    }
    .N_T{
        padding: 8px 25px 2px 25px;
    }
    .N_T img{
        width: 24px;
    }
    .T{
        height: 24px;
        width: 36px;
        padding: 0px 10px;
    }
    .MTD{
        width: 45%;
    }
}
@media screen and (max-width:440px) {
    .N_B{
        font-size: 8px;
    }
}
@media screen and (max-width:1330px) {
    .S_Box{
        width: 89%;
    }
}

@media screen and (max-width:1116px) {
    .S_Box{
        width: 89%;
    }
}
@media screen and (max-width:1090px) {
    .S_Box{
        width: 87%;
    }
}
@media screen and (max-width:1036px) {
    .S_Box{
        width: 86%;
    }
}
@media screen and (max-width:951px) {
    .S_Box{
        width: 86%;
    }
}
@media screen and (max-width:940px) {
    .S_Box{
        width: 84%;
    }
}
@media screen and (max-width:900px) {
    .S_Box{
        width: 84%;
    }
}
@media screen and (max-width:840px) {
    .S_Box{
        width: 80%;
    }
}
@media screen and (max-width:825px) {
    .S_Box{
        width: 80%;
    }
}
@media screen and (max-width:772px) {
    .S_Box{
        width: 80%;
    }
    .S_Item_T{
        font-size: 15px;
    }
    .S_Item_S{
        font-size: 11px;
    }
    .S_Item{
        gap:0;
        padding: 4px 10px;
    }
}
@media screen and (max-width:757px) {
    .S_Box{
        width: 91%;
    }
}
@media screen and (max-width:740px) {
    .S_Box{
        width: 87%;
    }
    .MD_IF , .MD_IFDI{
        width: 125px;
    }
}
@media screen and (max-width:658px) {
    .S_Box{
        width: 86%;
    }
    .MD_I{
        gap: 16px;
    }
}
@media screen and (max-width:640px) {
    .S_Box{
        width: 80%;
    }
    .S_Item_S{
        font-size: 8px;
    }
    .S_Item_T{
        font-size: 12px;
    }
}
@media screen and (max-width:600px) {
    .S_Box{
        width: 84%;
    }
    
}
@media screen and (max-width:575px) {
    .S_Box{
        width: 88%;
    }
    .S_Item_T{
        font-size: 12px;
    }
    .S_Item_S{
        font-size: 9px;
    }
}
@media screen and (max-width:575px) {
    .S_Box{
        width: 86%;
    }
}
@media screen and (max-width:540px) {
    .MD_IF , .MD_IFDI{
        width: 100px;
    }
    .MD_I_T ,.MD_IFDI{
        font-size: 10px;
    }
    .S_Box{
        width: 75%;
    }
}
@media screen and (max-width:511px) {
    .S_Box{
        width: 75%;
    }
    
}
@media screen and (max-width:489px) {
    .S_Box{
        width: 94%;
    }
    .S_Item_S{
        font-size: 7px;
    }
    .S_Item_T{
        font-size: 10px;
    }
    .MD_I{
        gap: 10px;
    }
    .MD_I{
        padding: 8px 10px;
    }
}
@media screen and (max-width:440px) {
    .S_Box{
        width: 89%;
    }
}
</style>