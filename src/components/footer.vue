<script>
import { inject } from 'vue';

export default {
    setup(){
        const dark = inject("dark");
        return{dark}
    },
    methods:{
        GoScrool(type){
            try {
                let test
                if(type == 'rec'){
                    test = document.getElementById('toolsRecomendend')
                    test.scrollIntoView()
                }
                else if(type == 'up'){
                    window.scrollTo(0,0)
                }
                else if(type == 'tool'){
                    test = document.getElementById('toolsUsage')
                    test.scrollIntoView()
                }
            } catch (error) {
                if(type == 'rec'){
                    this.$router.push({path:'/',query:{'section' : 'recumended'}})
                }
                else if(type == 'tool'){
                    this.$router.push({path:'/',query:{'section' : 'toolsUsage'}})
                }
            }
        }
    }
}
</script>
<template>
    <div class="footer">
        <div @click="GoScrool('up')" title="بالا رفتن" class="UP fontIconNew CP" :class="dark ?'UP_D':''">&#xf077;</div>
        <div class="BC">
            <div class="TB">
                <div class="TBR">
                    <router-link to="/"><img class="TBRI" src="../../public/ToolBo.png" alt="icon brand"></router-link> 
                    <div class="TBRV">v 2.2.2</div>
                </div>
                <div class="TBC">اپلیکیشن تولبو جهت صرفه جویی در زمان کارهای روزمره  با توسعه ابزار های کاربردی ایجاد شده است و میتوانید با انتخاب ابزار مورد نظر از آن استفاده کنید.</div>
                <div class="TBL">
                    <div class="CP" @click="GoScrool('tool')">کاربردی</div>
                    <div class="CP" @click="GoScrool('rec')">پیشنهادی</div>
                    <a href="https://expersian.ir/" class="AF" target="_blank">درباره ما</a>
                </div>
            </div>
            <div class="LC"></div>
            <div class="BD">
                <div><router-link to="/" title="تولبو"><h1 class="B">TOOLBO</h1></router-link></div> 
                <div title="ابوالفضل جمشیدی نژاد">توسعه داده شده توسط ابوالفضل جمشیدی نژاد</div>
            </div>
            <div class="BB"><h1 class="B">TOOLBO</h1></div> 
            <div class="CIS">
                <a style="color:#2AABEE ;" href="http://t.me/abolfazl_j10" target="_blank" class="icon">&#xea95;</a>
                <a href="http://github.com/abolfazlj10" target="_blank" class="icon">&#xeab0;</a>
                <a style="color:#00acee ;" href="http://twitter.com/abolfazl_j10" target="_blank" class="icon">&#xea96;</a>
                <a style="color:#0A66C2;" href="http://linkedin.com/in/abolfazljamshidi/" target="_blank" class="icon">&#xf0e1;</a>
                <a style="color:#E1306C;" href="http://instagram.com/abolfazl_j10" target="_blank" class="icon">&#xea92;</a>
                <a style="color:#FF5733;" href="mailto: abolfazljamshidi101010@gmail.com" target="_blank" class="icon">&#xe903;</a>
            </div>
        </div>
    </div>
</template>
<style scoped>
.BB{ /* Background Brand */
    position: absolute;
    left: -41px;
    top: 64px;
    transform: rotateZ(320deg);
    opacity: .1;
}
.BB .B{ /* Background Brand */
    font-size: 90px;
    color:#ff780a70;
    user-select: none;
}
.footer{
    width: 100%;
    text-align: center;
}
.TB{/* Top Box */
    display: flex;
}
.TBR{/* Top Box Right */
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.TBC{/* Top Box Center */
    flex-grow: 1;
    width: 12%;
    text-align: justify;
}
.TBL{/* Top Box Left */
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    z-index: 2;
}
.AF{ /* About Footer */
    z-index: 2;
}
.TBRI{/* Top Box Right Image */
    width: 40px;
}
.LC{/*Line Center */
    width: 100%;
    height: 2px;
    background-color: #ffffff6e;
    margin:40px 0;
}
.B{ /* brand */
    color: #ff780a;
    font-family: 'Titan One', cursive;
    transition: .3s all cubic-bezier(.4,0,.2,1);
    display: inline;
}
.BD{/* Brand Devs*/
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 18px;
    font-size: 10px;
}
.UP{/* upper */
    background-color: #ffffff;
    display:inline-block;
    padding: 13px;
    font-size:25px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    padding: 13px 40px 17px 40px;
    box-shadow: rgb(0 0 0 / 10%) 0px -4px 12px;
    transition: all .3s ease-in-out;
}
.UP:hover{
    color:#000;
}
.UP_D{
    background-color: #0c243f;
    color: #ffffff;
}
.UP_D:hover{
    color:#f1f1f1;
}
.BC{/* Background Color */
    background-color: #111111;
    color:#fff;
    padding: 40px;
    font-size: 12px;
    position: relative;
    overflow: hidden;
}
.CIS{ /* Container Icon Social Media */
    display: flex;
    justify-content: center;
    margin-top: 30px;
    gap:17px;
    font-size: 18px;
    direction: ltr;
}
@media screen and (max-width:840px){
    .BB .B{ /* Background Brand */
        font-size: 80px;
    }
}
@media screen and (max-width:623px){
    .BC{
        padding: 40px 30px;
    }
    .TBC{
        width: 30%;
    }
}
@media screen and (max-width:640px){
    .BB .B{ /* Background Brand */
        font-size: 70px;
    }
    .BB{
        top: 97px;
    }
}
@media screen and (max-width:405px){
    .TBL{
        justify-content: normal;
        gap: 10px;
    }
    
}
@media screen and (max-width:500px){
    .BB .B{ /* Background Brand */
        font-size: 63px;
    }
    .BB{
        top: 63px;
    }
}
</style>