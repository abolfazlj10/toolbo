<script>
import navs from '../../../components/navBar.vue';
import footers from '../../../components/footer.vue';
import locations from '../../../components/locationBar.vue';
import usageSide from '../../../components/toolsUsage.vue';
import sidePage from '../../../components/sidePage.vue';
import loader from '../../../components/loader.vue';
import dbG from '../../../data/db.json'
import { inject } from 'vue';
export default {
    data (){
        return{
            db:[],
            isShow:false,
            nums:null,
        }
    },
    setup(){
        const dark = inject("dark")
        return{dark}
    },
    created (){
        document.title='تولبو | تبدیل اعداد '
        this.db.push(dbG.dataBox[2].item[1])
        this.db.push(dbG.dataBox[2].item[2])
        this.db.push(dbG.dataBox[2].item[3])

        setTimeout(() => {
            this.isShow = true
        }, 100);
    },
    components:{navs,footers,locations,usageSide,sidePage,loader,dbG}
}
</script>
<template>
    <loader v-show="!isShow"/>
    <div v-show="isShow">
        <navs/>
        <locations title="تبدیل اعداد" PN="اعداد" PNR="/numbers"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="dark ? 'tool_D' : ''">
                <div class="title_tool">تبدیل اعداد</div>
                <div class="inputs">
                    <div>
                        <div>اعداد فارسی را وارد کنید:</div>
                        <textarea v-model="nums"></textarea>
                    </div>
                    <div>
                        <div>اعداد انگلیسی را وارد کنید:</div>
                        <textarea class="en" v-model="nums"></textarea>
                    </div>
                </div>
            </div>
            <sidePage/>
            <usageSide :db="db"/>
        </div>
        </div>
        <footers/>
    </div>
</template>
<style scoped>
.inputs{
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
}
textarea{
    resize: none;
    padding:5px;
    height: 192px;
    width: 200px;
    outline:none;
}
.en{
    font-family: sans-serif;
}
@media screen and (max-width:540px){
    textarea{
        width: 150px;
        height: 100px;
    }
}
</style>