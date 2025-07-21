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
            IP:null,
        }
    },
    setup(){
        const dark = inject("dark")
        return{dark}
    },
    methods:{
        async sendReq(){
            const send = await fetch('http://ip-api.com/json/')
            const data = await send.json()
            this.IP = data.query
        }
    },
    async created (){
        document.title='تولبو | IP آی پی من چیست ؟ '
        this.db.push(dbG.dataBox[6].item[0])
        this.db.push(dbG.dataBox[6].item[2])
        this.db.push(dbG.dataBox[6].item[3])
        await this.sendReq()
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
        <locations title="IP آی پی من چیست ؟" PN="فناوری" PNR="/technology"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="dark ? 'tool_D' : ''">
                <div class="title_tool">IP آی پی من چیست ؟</div>
                <div class="result" :class="dark ? 'Result_D':''">
                    <div>آدرس IP من :</div>
                    <div class="IP">{{ IP }}</div>
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
.tool{
    height: 150px;
}
.result{
    margin: 20px 20px 10px 20px;
    background-color: #f1f1f1;
    border:1px solid rgba(0, 0, 0, 0.372);
}
.IP{
    color:#3b82f6;
    font-size:27px;
}

</style>