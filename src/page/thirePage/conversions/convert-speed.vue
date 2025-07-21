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
            num:null,
            showResult:false,
            result:null,
            typeFrom:'میلیمتر بر دقیقه',
            typeTo:'کیلومتر بر ساعت'
        }
    },
    setup(){
        const dark = inject("dark")
        const warn = inject("warning")
        return{dark,warn,
        shower (){
            this.warn = true
        }}
    },
    methods:{
        convert (){
            if(this.num != null && this.num != ""){
                this.showResult = true                
                if(this.typeFrom == 'کیلومتر بر ساعت' && this.typeTo == 'کیلومتر بر ساعت')
                    this.result = this.num * 1 
                else if(this.typeFrom == 'کیلومتر بر ساعت' && this.typeTo == 'مایل بر ساعت')
                    this.result = this.num * 0.6213711922499999 
                else if(this.typeFrom == 'کیلومتر بر ساعت' && this.typeTo == 'متر بر ساعت')
                    this.result = this.num * 1000 
                else if(this.typeFrom == 'کیلومتر بر ساعت' && this.typeTo == 'متر بر دقیقه')
                    this.result = this.num * 16.6666666667 
                else if(this.typeFrom == 'کیلومتر بر ساعت' && this.typeTo == 'متر بر ثانیه')
                    this.result = this.num * 0.2777777778 
                else if(this.typeFrom == 'کیلومتر بر ساعت' && this.typeTo == 'سانتیمتر بر ساعت')
                    this.result = this.num * 100000 
                else if(this.typeFrom == 'کیلومتر بر ساعت' && this.typeTo == 'سانتیمتر بر دقیقه')
                    this.result = this.num * 1666.6666666667 
                else if(this.typeFrom == 'کیلومتر بر ساعت' && this.typeTo == 'سانتیمتر بر ثانیه')
                    this.result = this.num * 27.7777777778 
                else if(this.typeFrom == 'کیلومتر بر ساعت' && this.typeTo == 'میلیمتر بر ساعت')
                    this.result = this.num * 1000000 
                else if(this.typeFrom == 'کیلومتر بر ساعت' && this.typeTo == 'میلیمتر بر دقیقه')
                    this.result = this.num * 16666.6666666667 
                else if(this.typeFrom == 'کیلومتر بر ساعت' && this.typeTo == 'میلیمتر بر ثانیه')
                    this.result = this.num * 277.7777777778 
                else if(this.typeFrom == 'کیلومتر بر ساعت' && this.typeTo == 'مایل بر دقیقه')
                    this.result = this.num * 0.0103561865 
                else if(this.typeFrom == 'کیلومتر بر ساعت' && this.typeTo == 'مایل بر ثانیه')
                    this.result = this.num * 0.0001726031 
                else if(this.typeFrom == 'کیلومتر بر ساعت' && this.typeTo == 'کیلومتر بر ثانیه')
                    this.result = this.num * 0.0002777778 
                else if(this.typeFrom == 'کیلومتر بر ساعت' && this.typeTo == 'کیلومتر بر دقیقه')
                    this.result = this.num * 0.0166666667

                else if(this.typeFrom == 'مایل بر ساعت' && this.typeTo == 'کیلومتر بر ساعت')
                    this.result = this.num * 1.609344  
                else if(this.typeFrom == 'مایل بر ساعت' && this.typeTo == 'مایل بر ساعت')
                    this.result = this.num * 1
                else if(this.typeFrom == 'مایل بر ساعت' && this.typeTo == 'متر بر ساعت')
                    this.result = this.num * 1609.3439999672 
                else if(this.typeFrom == 'مایل بر ساعت' && this.typeTo == 'متر بر دقیقه')
                    this.result = this.num * 26.8223999995 
                else if(this.typeFrom == 'مایل بر ساعت' && this.typeTo == 'متر بر ثانیه')
                    this.result = this.num * 0.44704 
                else if(this.typeFrom == 'مایل بر ساعت' && this.typeTo == 'سانتیمتر بر ساعت')
                    this.result = this.num * 160934.3999967195 
                else if(this.typeFrom == 'مایل بر ساعت' && this.typeTo == 'سانتیمتر بر دقیقه')
                    this.result = this.num * 2682.2399999453 
                else if(this.typeFrom == 'مایل بر ساعت' && this.typeTo == 'سانتیمتر بر ثانیه')
                    this.result = this.num * 44.7039999991 
                else if(this.typeFrom == 'مایل بر ساعت' && this.typeTo == 'میلیمتر بر ساعت')
                    this.result = this.num * 1609343.9999671953 
                else if(this.typeFrom == 'مایل بر ساعت' && this.typeTo == 'میلیمتر بر دقیقه')
                    this.result = this.num * 26822.3999994533 
                else if(this.typeFrom == 'مایل بر ساعت' && this.typeTo == 'میلیمتر بر ثانیه')
                    this.result = this.num * 447.0399999909 
                else if(this.typeFrom == 'مایل بر ساعت' && this.typeTo == 'مایل بر دقیقه')
                    this.result = this.num * 0.0166666667 
                else if(this.typeFrom == 'مایل بر ساعت' && this.typeTo == 'مایل بر ثانیه')
                    this.result = this.num * 0.0002777778 
                else if(this.typeFrom == 'مایل بر ساعت' && this.typeTo == 'کیلومتر بر ثانیه')
                    this.result = this.num * 0.00044704
                else if(this.typeFrom == 'مایل بر ساعت' && this.typeTo == 'کیلومتر بر دقیقه')
                    this.result = this.num * 0.0268224 

                else if(this.typeFrom == 'متر بر ساعت' && this.typeTo == 'کیلومتر بر ساعت')
                    this.result = this.num * 0.001  
                else if(this.typeFrom == 'متر بر ساعت' && this.typeTo == 'مایل بر ساعت')
                    this.result = this.num * 0.0006213712 
                else if(this.typeFrom == 'متر بر ساعت' && this.typeTo == 'متر بر ساعت')
                    this.result = this.num * 1
                else if(this.typeFrom == 'متر بر ساعت' && this.typeTo == 'متر بر دقیقه')
                    this.result = this.num * 0.0166666667 
                else if(this.typeFrom == 'متر بر ساعت' && this.typeTo == 'متر بر ثانیه')
                    this.result = this.num * 0.0002777778 
                else if(this.typeFrom == 'متر بر ساعت' && this.typeTo == 'سانتیمتر بر ساعت')
                    this.result = this.num * 100 
                else if(this.typeFrom == 'متر بر ساعت' && this.typeTo == 'سانتیمتر بر دقیقه')
                    this.result = this.num * 1.6666666667 
                else if(this.typeFrom == 'متر بر ساعت' && this.typeTo == 'سانتیمتر بر ثانیه')
                    this.result = this.num * 0.0277777778 
                else if(this.typeFrom == 'متر بر ساعت' && this.typeTo == 'میلیمتر بر ساعت')
                    this.result = this.num * 1000 
                else if(this.typeFrom == 'متر بر ساعت' && this.typeTo == 'میلیمتر بر دقیقه')
                    this.result = this.num * 16.6666666667 
                else if(this.typeFrom == 'متر بر ساعت' && this.typeTo == 'میلیمتر بر ثانیه')
                    this.result = this.num * 0.2777777778 
                else if(this.typeFrom == 'متر بر ساعت' && this.typeTo == 'مایل بر دقیقه')
                    this.result = this.num * 0.0000103562 
                else if(this.typeFrom == 'متر بر ساعت' && this.typeTo == 'مایل بر ثانیه')
                    this.result = this.num * 1.726e-7
                else if(this.typeFrom == 'متر بر ساعت' && this.typeTo == 'کیلومتر بر ثانیه')
                    this.result = this.num * 2.778e-7
                else if(this.typeFrom == 'متر بر ساعت' && this.typeTo == 'کیلومتر بر دقیقه')
                    this.result = this.num * 0.0000166667 

                else if(this.typeFrom == 'متر بر دقیقه' && this.typeTo == 'کیلومتر بر ساعت')
                    this.result = this.num * 0.06 
                else if(this.typeFrom == 'متر بر دقیقه' && this.typeTo == 'مایل بر ساعت')
                    this.result = this.num * 0.0372822715 
                else if(this.typeFrom == 'متر بر دقیقه' && this.typeTo == 'متر بر ساعت')
                    this.result = this.num * 60 
                else if(this.typeFrom == 'متر بر دقیقه' && this.typeTo == 'متر بر دقیقه')
                    this.result = this.num * 1
                else if(this.typeFrom == 'متر بر دقیقه' && this.typeTo == 'متر بر ثانیه')
                    this.result = this.num * 0.0166666667 
                else if(this.typeFrom == 'متر بر دقیقه' && this.typeTo == 'سانتیمتر بر ساعت')
                    this.result = this.num * 6000 
                else if(this.typeFrom == 'متر بر دقیقه' && this.typeTo == 'سانتیمتر بر دقیقه')
                    this.result = this.num * 100 
                else if(this.typeFrom == 'متر بر دقیقه' && this.typeTo == 'سانتیمتر بر ثانیه')
                    this.result = this.num * 1.6666666667 
                else if(this.typeFrom == 'متر بر دقیقه' && this.typeTo == 'میلیمتر بر ساعت')
                    this.result = this.num * 60000 
                else if(this.typeFrom == 'متر بر دقیقه' && this.typeTo == 'میلیمتر بر دقیقه')
                    this.result = this.num * 1000 
                else if(this.typeFrom == 'متر بر دقیقه' && this.typeTo == 'میلیمتر بر ثانیه')
                    this.result = this.num * 16.6666666667 
                else if(this.typeFrom == 'متر بر دقیقه' && this.typeTo == 'مایل بر دقیقه')
                    this.result = this.num * 0.0006213712 
                else if(this.typeFrom == 'متر بر دقیقه' && this.typeTo == 'مایل بر ثانیه')
                    this.result = this.num * 0.0000103562 
                else if(this.typeFrom == 'متر بر دقیقه' && this.typeTo == 'کیلومتر بر ثانیه')
                    this.result = this.num * 0.0000166667 
                else if(this.typeFrom == 'متر بر دقیقه' && this.typeTo == 'کیلومتر بر دقیقه')
                    this.result = this.num * 0.001

                else if(this.typeFrom == 'متر بر ثانیه' && this.typeTo == 'کیلومتر بر ساعت')
                    this.result = this.num * 3.6 
                else if(this.typeFrom == 'متر بر ثانیه' && this.typeTo == 'مایل بر ساعت')
                    this.result = this.num * 2.2369362921 
                else if(this.typeFrom == 'متر بر ثانیه' && this.typeTo == 'متر بر ساعت')
                    this.result = this.num * 3600 
                else if(this.typeFrom == 'متر بر ثانیه' && this.typeTo == 'متر بر دقیقه')
                    this.result = this.num * 60 
                else if(this.typeFrom == 'متر بر ثانیه' && this.typeTo == 'متر بر ثانیه')
                    this.result = this.num * 1
                else if(this.typeFrom == 'متر بر ثانیه' && this.typeTo == 'سانتیمتر بر ساعت')
                    this.result = this.num * 360000 
                else if(this.typeFrom == 'متر بر ثانیه' && this.typeTo == 'سانتیمتر بر دقیقه')
                    this.result = this.num * 6000 
                else if(this.typeFrom == 'متر بر ثانیه' && this.typeTo == 'سانتیمتر بر ثانیه')
                    this.result = this.num * 100 
                else if(this.typeFrom == 'متر بر ثانیه' && this.typeTo == 'میلیمتر بر ساعت')
                    this.result = this.num * 3600000 
                else if(this.typeFrom == 'متر بر ثانیه' && this.typeTo == 'میلیمتر بر دقیقه')
                    this.result = this.num * 60000  
                else if(this.typeFrom == 'متر بر ثانیه' && this.typeTo == 'میلیمتر بر ثانیه')
                    this.result = this.num * 1000 
                else if(this.typeFrom == 'متر بر ثانیه' && this.typeTo == 'مایل بر دقیقه')
                    this.result = this.num * 0.0372822715 
                else if(this.typeFrom == 'متر بر ثانیه' && this.typeTo == 'مایل بر ثانیه')
                    this.result = this.num * 0.0006213712 
                else if(this.typeFrom == 'متر بر ثانیه' && this.typeTo == 'کیلومتر بر دقیقه')
                    this.result = this.num * 0.06 
                else if(this.typeFrom == 'متر بر ثانیه' && this.typeTo == 'کیلومتر بر ثانیه')
                    this.result = this.num * 0.001 

                else if(this.typeFrom == 'سانتیمتر بر ساعت' && this.typeTo == 'کیلومتر بر ساعت')
                    this.result = this.num * 0.00001
                else if(this.typeFrom == 'سانتیمتر بر ساعت' && this.typeTo == 'مایل بر ساعت')
                    this.result = this.num * 0.0000062137 
                else if(this.typeFrom == 'سانتیمتر بر ساعت' && this.typeTo == 'متر بر ساعت')
                    this.result = this.num * 0.01 
                else if(this.typeFrom == 'سانتیمتر بر ساعت' && this.typeTo == 'متر بر ثانیه')
                    this.result = this.num * 0.0000027778 
                else if(this.typeFrom == 'سانتیمتر بر ساعت' && this.typeTo == 'متر بر دقیقه')
                    this.result = this.num * 0.0001666667 
                else if(this.typeFrom == 'سانتیمتر بر ساعت' && this.typeTo == 'سانتیمتر بر ساعت')
                    this.result = this.num * 1
                else if(this.typeFrom == 'سانتیمتر بر ساعت' && this.typeTo == 'سانتیمتر بر دقیقه')
                    this.result = this.num * 0.0166666667 
                else if(this.typeFrom == 'سانتیمتر بر ساعت' && this.typeTo == 'سانتیمتر بر ثانیه')
                    this.result = this.num * 0.0002777778 
                else if(this.typeFrom == 'سانتیمتر بر ساعت' && this.typeTo == 'میلیمتر بر ساعت')
                    this.result = this.num * 10 
                else if(this.typeFrom == 'سانتیمتر بر ساعت' && this.typeTo == 'میلیمتر بر دقیقه')
                    this.result = this.num * 0.1666666667 
                else if(this.typeFrom == 'سانتیمتر بر ساعت' && this.typeTo == 'میلیمتر بر ثانیه')
                    this.result = this.num * 0.0027777778 
                else if(this.typeFrom == 'سانتیمتر بر ساعت' && this.typeTo == 'مایل بر دقیقه')
                    this.result = this.num * 1.036e-7
                else if(this.typeFrom == 'سانتیمتر بر ساعت' && this.typeTo == 'مایل بر ثانیه')
                    this.result = this.num *  1.7e-9
                else if(this.typeFrom == 'سانتیمتر بر ساعت' && this.typeTo == 'کیلومتر بر دقیقه')
                    this.result = this.num *  1.667e-7
                else if(this.typeFrom == 'سانتیمتر بر ساعت' && this.typeTo == 'کیلومتر بر ثانیه')
                    this.result = this.num *  2.8e-9

                else if(this.typeFrom == 'سانتیمتر بر دقیقه' && this.typeTo == 'کیلومتر بر ساعت')
                    this.result = this.num * 0.0006 
                else if(this.typeFrom == 'سانتیمتر بر دقیقه' && this.typeTo == 'مایل بر ساعت')
                    this.result = this.num * 0.0003728227 
                else if(this.typeFrom == 'سانتیمتر بر دقیقه' && this.typeTo == 'متر بر ساعت')
                    this.result = this.num * 0.6 
                else if(this.typeFrom == 'سانتیمتر بر دقیقه' && this.typeTo == 'متر بر ثانیه')
                    this.result = this.num * 0.0001666667 
                else if(this.typeFrom == 'سانتیمتر بر دقیقه' && this.typeTo == 'متر بر دقیقه')
                    this.result = this.num * 0.01 
                else if(this.typeFrom == 'سانتیمتر بر دقیقه' && this.typeTo == 'سانتیمتر بر ساعت')
                    this.result = this.num * 60 
                else if(this.typeFrom == 'سانتیمتر بر دقیقه' && this.typeTo == 'سانتیمتر بر دقیقه')
                    this.result = this.num * 1
                else if(this.typeFrom == 'سانتیمتر بر دقیقه' && this.typeTo == 'سانتیمتر بر ثانیه')
                    this.result = this.num * 0.0166666667 
                else if(this.typeFrom == 'سانتیمتر بر دقیقه' && this.typeTo == 'میلیمتر بر ساعت')
                    this.result = this.num * 600 
                else if(this.typeFrom == 'سانتیمتر بر دقیقه' && this.typeTo == 'میلیمتر بر دقیقه')
                    this.result = this.num * 10 
                else if(this.typeFrom == 'سانتیمتر بر دقیقه' && this.typeTo == 'میلیمتر بر ثانیه')
                    this.result = this.num * 0.1666666667 
                else if(this.typeFrom == 'سانتیمتر بر دقیقه' && this.typeTo == 'مایل بر دقیقه')
                    this.result = this.num * 0.0000062137 
                else if(this.typeFrom == 'سانتیمتر بر دقیقه' && this.typeTo == 'مایل بر ثانیه')
                    this.result = this.num * 1.036e-7
                else if(this.typeFrom == 'سانتیمتر بر دقیقه' && this.typeTo == 'کیلومتر بر دقیقه')
                    this.result = this.num * 0.00001 
                else if(this.typeFrom == 'سانتیمتر بر دقیقه' && this.typeTo == 'کیلومتر بر ثانیه')
                    this.result = this.num * 1.667e-7

                else if(this.typeFrom == 'سانتیمتر بر ثانیه' && this.typeTo == 'کیلومتر بر ساعت')
                    this.result = this.num *0.036 
                else if(this.typeFrom == 'سانتیمتر بر ثانیه' && this.typeTo == 'مایل بر ساعت')
                    this.result = this.num * 0.0223693629 
                else if(this.typeFrom == 'سانتیمتر بر ثانیه' && this.typeTo == 'متر بر ساعت')
                    this.result = this.num * 36 
                else if(this.typeFrom == 'سانتیمتر بر ثانیه' && this.typeTo == 'متر بر ثانیه')
                    this.result = this.num * 0.01 
                else if(this.typeFrom == 'سانتیمتر بر ثانیه' && this.typeTo == 'متر بر دقیقه')
                    this.result = this.num * 0.6
                else if(this.typeFrom == 'سانتیمتر بر ثانیه' && this.typeTo == 'سانتیمتر بر ساعت')
                    this.result = this.num * 3600 
                else if(this.typeFrom == 'سانتیمتر بر ثانیه' && this.typeTo == 'سانتیمتر بر دقیقه')
                    this.result = this.num * 60
                else if(this.typeFrom == 'سانتیمتر بر ثانیه' && this.typeTo == 'سانتیمتر بر ثانیه')
                    this.result = this.num * 1
                else if(this.typeFrom == 'سانتیمتر بر ثانیه' && this.typeTo == 'میلیمتر بر ساعت')
                    this.result = this.num * 36000 
                else if(this.typeFrom == 'سانتیمتر بر ثانیه' && this.typeTo == 'میلیمتر بر دقیقه')
                    this.result = this.num * 600 
                else if(this.typeFrom == 'سانتیمتر بر ثانیه' && this.typeTo == 'میلیمتر بر ثانیه')
                    this.result = this.num * 10 
                else if(this.typeFrom == 'سانتیمتر بر ثانیه' && this.typeTo == 'مایل بر دقیقه')
                    this.result = this.num * 0.0003728227
                else if(this.typeFrom == 'سانتیمتر بر ثانیه' && this.typeTo == 'مایل بر ثانیه')
                    this.result = this.num * 0.0000062137 
                else if(this.typeFrom == 'سانتیمتر بر ثانیه' && this.typeTo == 'کیلومتر بر دقیقه')
                    this.result = this.num * 0.0006 
                else if(this.typeFrom == 'سانتیمتر بر ثانیه' && this.typeTo == 'کیلومتر بر ثانیه')
                    this.result = this.num * 0.00001 

                else if(this.typeFrom == 'میلیمتر بر ساعت' && this.typeTo == 'کیلومتر بر ساعت')
                    this.result = this.num * 0.000001 
                else if(this.typeFrom == 'میلیمتر بر ساعت' && this.typeTo == 'مایل بر ساعت')
                    this.result = this.num * 6.214e-7
                else if(this.typeFrom == 'میلیمتر بر ساعت' && this.typeTo == 'متر بر ساعت')
                    this.result = this.num * 0.001 
                else if(this.typeFrom == 'میلیمتر بر ساعت' && this.typeTo == 'متر بر ثانیه')
                    this.result = this.num * 2.778e-7
                else if(this.typeFrom == 'میلیمتر بر ساعت' && this.typeTo == 'متر بر دقیقه')
                    this.result = this.num * 0.0000166667 
                else if(this.typeFrom == 'میلیمتر بر ساعت' && this.typeTo == 'سانتیمتر بر ساعت')
                    this.result = this.num * 0.1 
                else if(this.typeFrom == 'میلیمتر بر ساعت' && this.typeTo == 'سانتیمتر بر دقیقه')
                    this.result = this.num * 0.0016666667 
                else if(this.typeFrom == 'میلیمتر بر ساعت' && this.typeTo == 'سانتیمتر بر ثانیه')
                    this.result = this.num * 0.0000277778 
                else if(this.typeFrom == 'میلیمتر بر ساعت' && this.typeTo == 'میلیمتر بر ساعت')
                    this.result = this.num * 1
                else if(this.typeFrom == 'میلیمتر بر ساعت' && this.typeTo == 'میلیمتر بر دقیقه')
                    this.result = this.num * 0.0166666667 
                else if(this.typeFrom == 'میلیمتر بر ساعت' && this.typeTo == 'میلیمتر بر ثانیه')
                    this.result = this.num * 0.0002777778 
                else if(this.typeFrom == 'میلیمتر بر ساعت' && this.typeTo == 'مایل بر دقیقه')
                    this.result = this.num * 1.04e-8
                else if(this.typeFrom == 'میلیمتر بر ساعت' && this.typeTo == 'مایل بر ثانیه')
                    this.result = this.num * 2e-10
                else if(this.typeFrom == 'میلیمتر بر ساعت' && this.typeTo == 'کیلومتر بر دقیقه')
                    this.result = this.num * 1.67e-8
                else if(this.typeFrom == 'میلیمتر بر ساعت' && this.typeTo == 'کیلومتر بر ثانیه')
                    this.result = this.num * 3e-10

                else if(this.typeFrom == 'میلیمتر بر دقیقه' && this.typeTo == 'کیلومتر بر ساعت')
                    this.result = this.num * 0.00006 
                else if(this.typeFrom == 'میلیمتر بر دقیقه' && this.typeTo == 'مایل بر ساعت')
                    this.result = this.num * 0.0000372823 
                else if(this.typeFrom == 'میلیمتر بر دقیقه' && this.typeTo == 'متر بر ساعت')
                    this.result = this.num * 0.06 
                else if(this.typeFrom == 'میلیمتر بر دقیقه' && this.typeTo == 'متر بر ثانیه')
                    this.result = this.num * 0.0000166667 
                else if(this.typeFrom == 'میلیمتر بر دقیقه' && this.typeTo == 'متر بر دقیقه')
                    this.result = this.num * 0.001 
                else if(this.typeFrom == 'میلیمتر بر دقیقه' && this.typeTo == 'سانتیمتر بر ساعت')
                    this.result = this.num * 6
                else if(this.typeFrom == 'میلیمتر بر دقیقه' && this.typeTo == 'سانتیمتر بر دقیقه')
                    this.result = this.num * 0.1 
                else if(this.typeFrom == 'میلیمتر بر دقیقه' && this.typeTo == 'سانتیمتر بر ثانیه')
                    this.result = this.num * 0.0000277778 
                else if(this.typeFrom == 'میلیمتر بر دقیقه' && this.typeTo == 'میلیمتر بر ساعت')
                    this.result = this.num * 0.0016666667 
                else if(this.typeFrom == 'میلیمتر بر دقیقه' && this.typeTo == 'میلیمتر بر دقیقه')
                    this.result = this.num * 1
                else if(this.typeFrom == 'میلیمتر بر دقیقه' && this.typeTo == 'میلیمتر بر ثانیه')
                    this.result = this.num * 0.0166666667 
                else if(this.typeFrom == 'میلیمتر بر دقیقه' && this.typeTo == 'مایل بر دقیقه')
                    this.result = this.num * 6.214e-7
                else if(this.typeFrom == 'میلیمتر بر دقیقه' && this.typeTo == 'مایل بر ثانیه')
                    this.result = this.num * 1.04e-8
                else if(this.typeFrom == 'میلیمتر بر دقیقه' && this.typeTo == 'کیلومتر بر دقیقه')
                    this.result = this.num * 0.000001
                else if(this.typeFrom == 'میلیمتر بر دقیقه' && this.typeTo == 'کیلومتر بر ثانیه')
                    this.result = this.num * 1.67e-8
                    
                else if(this.typeFrom == 'میلیمتر بر ثانیه' && this.typeTo == 'کیلومتر بر ساعت')
                    this.result = this.num * 0.0036 
                else if(this.typeFrom == 'میلیمتر بر ثانیه' && this.typeTo == 'مایل بر ساعت')
                    this.result = this.num * 0.0022369363 
                else if(this.typeFrom == 'میلیمتر بر ثانیه' && this.typeTo == 'متر بر ساعت')
                    this.result = this.num * 3.6 
                else if(this.typeFrom == 'میلیمتر بر ثانیه' && this.typeTo == 'متر بر ثانیه')
                    this.result = this.num * 0.001 
                else if(this.typeFrom == 'میلیمتر بر ثانیه' && this.typeTo == 'متر بر دقیقه')
                    this.result = this.num * 0.06 
                else if(this.typeFrom == 'میلیمتر بر ثانیه' && this.typeTo == 'سانتیمتر بر ساعت')
                    this.result = this.num * 360 
                else if(this.typeFrom == 'میلیمتر بر ثانیه' && this.typeTo == 'سانتیمتر بر دقیقه')
                    this.result = this.num * 6 
                else if(this.typeFrom == 'میلیمتر بر ثانیه' && this.typeTo == 'سانتیمتر بر ثانیه')
                    this.result = this.num *  0.1 
                else if(this.typeFrom == 'میلیمتر بر ثانیه' && this.typeTo == 'میلیمتر بر ساعت')
                    this.result = this.num * 3600 
                else if(this.typeFrom == 'میلیمتر بر ثانیه' && this.typeTo == 'میلیمتر بر دقیقه')
                    this.result = this.num * 60 
                else if(this.typeFrom == 'میلیمتر بر ثانیه' && this.typeTo == 'میلیمتر بر ثانیه')
                    this.result = this.num * 1
                else if(this.typeFrom == 'میلیمتر بر ثانیه' && this.typeTo == 'مایل بر دقیقه')
                    this.result = this.num * 0.0000372823 
                else if(this.typeFrom == 'میلیمتر بر ثانیه' && this.typeTo == 'مایل بر ثانیه')
                    this.result = this.num *  6.214e-7
                else if(this.typeFrom == 'میلیمتر بر ثانیه' && this.typeTo == 'کیلومتر بر دقیقه')
                    this.result = this.num * 0.00006 
                else if(this.typeFrom == 'میلیمتر بر ثانیه' && this.typeTo == 'کیلومتر بر ثانیه')
                    this.result = this.num * 0.000001 
                    
                else if(this.typeFrom == 'مایل بر دقیقه' && this.typeTo == 'کیلومتر بر ساعت')
                    this.result = this.num * 96.5606400887  
                else if(this.typeFrom == 'مایل بر دقیقه' && this.typeTo == 'مایل بر ساعت')
                    this.result = this.num * 60.0000000563 
                else if(this.typeFrom == 'مایل بر دقیقه' && this.typeTo == 'متر بر ساعت')
                    this.result = this.num * 96560.6400886813 
                else if(this.typeFrom == 'مایل بر دقیقه' && this.typeTo == 'متر بر ثانیه')
                    this.result = this.num * 26.8224000246 
                else if(this.typeFrom == 'مایل بر دقیقه' && this.typeTo == 'متر بر دقیقه')
                    this.result = this.num * 1609.344001478 
                else if(this.typeFrom == 'مایل بر دقیقه' && this.typeTo == 'سانتیمتر بر ساعت')
                    this.result = this.num * 9656064.00886813 
                else if(this.typeFrom == 'مایل بر دقیقه' && this.typeTo == 'سانتیمتر بر دقیقه')
                    this.result = this.num * 160934.4001478022 
                else if(this.typeFrom == 'مایل بر دقیقه' && this.typeTo == 'سانتیمتر بر ثانیه')
                    this.result = this.num *  2682.2400024634 
                else if(this.typeFrom == 'مایل بر دقیقه' && this.typeTo == 'میلیمتر بر ساعت')
                    this.result = this.num * 96560640.0886813 
                else if(this.typeFrom == 'مایل بر دقیقه' && this.typeTo == 'میلیمتر بر دقیقه')
                    this.result = this.num * 1609344.0014780215 
                else if(this.typeFrom == 'مایل بر دقیقه' && this.typeTo == 'میلیمتر بر ثانیه')
                    this.result = this.num * 26822.4000246337 
                else if(this.typeFrom == 'مایل بر دقیقه' && this.typeTo == 'مایل بر دقیقه')
                    this.result = this.num * 1
                else if(this.typeFrom == 'مایل بر دقیقه' && this.typeTo == 'مایل بر ثانیه')
                    this.result = this.num *  0.0166666669 
                else if(this.typeFrom == 'مایل بر دقیقه' && this.typeTo == 'کیلومتر بر دقیقه')
                    this.result = this.num * 1.6093440015 
                else if(this.typeFrom == 'مایل بر دقیقه' && this.typeTo == 'کیلومتر بر ثانیه')
                    this.result = this.num * 0.0268224 

                else if(this.typeFrom == 'مایل بر ثانیه' && this.typeTo == 'کیلومتر بر ساعت')
                    this.result = this.num * 5793.6383276212 
                else if(this.typeFrom == 'مایل بر ثانیه' && this.typeTo == 'مایل بر ساعت')
                    this.result = this.num * 3599.9999550993 
                else if(this.typeFrom == 'مایل بر ثانیه' && this.typeTo == 'متر بر ساعت')
                    this.result = this.num * 5793638.3276212355 
                else if(this.typeFrom == 'مایل بر ثانیه' && this.typeTo == 'متر بر ثانیه')
                    this.result = this.num * 1609.3439798948 
                else if(this.typeFrom == 'مایل بر ثانیه' && this.typeTo == 'متر بر دقیقه')
                    this.result = this.num * 96560.6387936873 
                else if(this.typeFrom == 'مایل بر ثانیه' && this.typeTo == 'سانتیمتر بر ساعت')
                    this.result = this.num * 579363832.7621236 
                else if(this.typeFrom == 'مایل بر ثانیه' && this.typeTo == 'سانتیمتر بر دقیقه')
                    this.result = this.num * 9656063.879368726 
                else if(this.typeFrom == 'مایل بر ثانیه' && this.typeTo == 'سانتیمتر بر ثانیه')
                    this.result = this.num *  160934.3979894787 
                else if(this.typeFrom == 'مایل بر ثانیه' && this.typeTo == 'میلیمتر بر ساعت')
                    this.result = this.num * 5793638327.621236 
                else if(this.typeFrom == 'مایل بر ثانیه' && this.typeTo == 'میلیمتر بر دقیقه')
                    this.result = this.num * 96560638.79368725
                else if(this.typeFrom == 'مایل بر ثانیه' && this.typeTo == 'میلیمتر بر ثانیه')
                    this.result = this.num * 1609343.9798947875 
                else if(this.typeFrom == 'مایل بر ثانیه' && this.typeTo == 'مایل بر دقیقه')
                    this.result = this.num * 59.9999991953 
                else if(this.typeFrom == 'مایل بر ثانیه' && this.typeTo == 'مایل بر ثانیه')
                    this.result = this.num *  1
                else if(this.typeFrom == 'مایل بر ثانیه' && this.typeTo == 'کیلومتر بر دقیقه')
                    this.result = this.num * 96.5606387937 
                else if(this.typeFrom == 'مایل بر ثانیه' && this.typeTo == 'کیلومتر بر ثانیه')
                    this.result = this.num * 1.6093439799 

                else if(this.typeFrom == 'کیلومتر بر دقیقه' && this.typeTo == 'کیلومتر بر ساعت')
                    this.result = this.num * 60 
                else if(this.typeFrom == 'کیلومتر بر دقیقه' && this.typeTo == 'مایل بر ساعت')
                    this.result = this.num * 37.282271535 
                else if(this.typeFrom == 'کیلومتر بر دقیقه' && this.typeTo == 'متر بر ساعت')
                    this.result = this.num * 60000  
                else if(this.typeFrom == 'کیلومتر بر دقیقه' && this.typeTo == 'متر بر ثانیه')
                    this.result = this.num * 16.6666666667 
                else if(this.typeFrom == 'کیلومتر بر دقیقه' && this.typeTo == 'متر بر دقیقه')
                    this.result = this.num * 1000 
                else if(this.typeFrom == 'کیلومتر بر دقیقه' && this.typeTo == 'سانتیمتر بر ساعت')
                    this.result = this.num * 6000000 
                else if(this.typeFrom == 'کیلومتر بر دقیقه' && this.typeTo == 'سانتیمتر بر دقیقه')
                    this.result = this.num * 100000 
                else if(this.typeFrom == 'کیلومتر بر دقیقه' && this.typeTo == 'سانتیمتر بر ثانیه')
                    this.result = this.num *  1666.6666666667 
                else if(this.typeFrom == 'کیلومتر بر دقیقه' && this.typeTo == 'میلیمتر بر ساعت')
                    this.result = this.num * 60000000 
                else if(this.typeFrom == 'کیلومتر بر دقیقه' && this.typeTo == 'میلیمتر بر دقیقه')
                    this.result = this.num * 1000000 
                else if(this.typeFrom == 'کیلومتر بر دقیقه' && this.typeTo == 'میلیمتر بر ثانیه')
                    this.result = this.num * 16666.6666666667 
                else if(this.typeFrom == 'کیلومتر بر دقیقه' && this.typeTo == 'مایل بر دقیقه')
                    this.result = this.num * 0.6213711917 
                else if(this.typeFrom == 'کیلومتر بر دقیقه' && this.typeTo == 'مایل بر ثانیه')
                    this.result = this.num *  0.0103561867 
                else if(this.typeFrom == 'کیلومتر بر دقیقه' && this.typeTo == 'کیلومتر بر دقیقه')
                    this.result = this.num * 1
                else if(this.typeFrom == 'کیلومتر بر دقیقه' && this.typeTo == 'کیلومتر بر ثانیه')
                    this.result = this.num * 0.0166666667 

                else if(this.typeFrom == 'کیلومتر بر ثانیه' && this.typeTo == 'کیلومتر بر ساعت')
                    this.result = this.num * 3600 
                else if(this.typeFrom == 'کیلومتر بر ثانیه' && this.typeTo == 'مایل بر ساعت')
                    this.result = this.num * 2236.9362921 
                else if(this.typeFrom == 'کیلومتر بر ثانیه' && this.typeTo == 'متر بر ساعت')
                    this.result = this.num * 3600000  
                else if(this.typeFrom == 'کیلومتر بر ثانیه' && this.typeTo == 'متر بر ثانیه')
                    this.result = this.num * 1000  
                else if(this.typeFrom == 'کیلومتر بر ثانیه' && this.typeTo == 'متر بر دقیقه')
                    this.result = this.num * 60000 
                else if(this.typeFrom == 'کیلومتر بر ثانیه' && this.typeTo == 'سانتیمتر بر ساعت')
                    this.result = this.num * 360000000 
                else if(this.typeFrom == 'کیلومتر بر ثانیه' && this.typeTo == 'سانتیمتر بر دقیقه')
                    this.result = this.num * 6000000 
                else if(this.typeFrom == 'کیلومتر بر ثانیه' && this.typeTo == 'سانتیمتر بر ثانیه')
                    this.result = this.num * 100000 
                else if(this.typeFrom == 'کیلومتر بر ثانیه' && this.typeTo == 'میلیمتر بر ساعت')
                    this.result = this.num * 3600000000 
                else if(this.typeFrom == 'کیلومتر بر ثانیه' && this.typeTo == 'میلیمتر بر دقیقه')
                    this.result = this.num * 60000000 
                else if(this.typeFrom == 'کیلومتر بر ثانیه' && this.typeTo == 'میلیمتر بر ثانیه')
                    this.result = this.num * 1000000  
                else if(this.typeFrom == 'کیلومتر بر ثانیه' && this.typeTo == 'مایل بر دقیقه')
                    this.result = this.num * 37.2822715 
                else if(this.typeFrom == 'کیلومتر بر ثانیه' && this.typeTo == 'مایل بر ثانیه')
                    this.result = this.num *  0.6213712
                else if(this.typeFrom == 'کیلومتر بر ثانیه' && this.typeTo == 'کیلومتر بر دقیقه')
                    this.result = this.num * 60 
                else if(this.typeFrom == 'کیلومتر بر ثانیه' && this.typeTo == 'کیلومتر بر ثانیه')
                    this.result = this.num * 1

                else
                    this.showResult = false
            }else{
                this.shower()
            }
        },
        keyCheck(e){
            if(e.key == 'Enter')
                this.convert()
            else
                this.showResult = false
        },
        changer(e){
            this.showResult = false
            if(e.target.id == 'to')
                this.typeTo = e.target.value
            else
                this.typeFrom = e.target.value
        },
    },
    created (){
        document.title='تولبو | تبدیل سرعت'
        this.db.push(dbG.dataBox[3].item[1])
        this.db.push(dbG.dataBox[3].item[2])
        this.db.push(dbG.dataBox[3].item[4])
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
        <locations title="تبدیل سرعت" PN="تبدیل ها" PNR="/conversions"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="[(!showResult ? 'HTool' : ''),(dark ? 'tool_D' : '')]"> 
                <div class="title_tool">تبدیل سرعت</div>
                <div class="inputs">
                    <div class="cInputs">
                        <div>مقدار تبدیل:</div>
                        <input type="text" placeholder="به طور مثال : 1" v-model="num" @keydown="keyCheck">
                    </div>
                    <div class="cInputs">
                        <div> تبدیل از:</div>
                        <select id="from" :value="typeFrom" @change="changer">
                            <option value="کیلومتر بر ساعت">کیلومتر بر ساعت </option>
                            <option value="مایل بر ساعت">مایل بر ساعت</option>
                            <option value="متر بر ساعت">متر بر ساعت</option>
                            <option value="متر بر دقیقه">متر بر دقیقه </option>
                            <option value="متر بر ثانیه">متر بر ثانیه</option>
                            <option value="سانتیمتر بر ساعت">سانتیمتر بر ساعت</option>
                            <option value="سانتیمتر بر دقیقه">سانتیمتر بر دقیقه</option>
                            <option value="سانتیمتر بر ثانیه">سانتیمتر بر ثانیه</option>
                            <option value="میلیمتر بر ساعت">میلیمتر بر ساعت</option>
                            <option value="میلیمتر بر دقیقه">میلیمتر بر دقیقه</option>
                            <option value="میلیمتر بر ثانیه ">میلیمتر بر ثانیه </option>
                            <option value="مایل بر دقیقه">مایل بر دقیقه</option>
                            <option value="مایل بر ثانیه">مایل بر ثانیه</option>
                            <option value="کیلومتر بر دقیقه">کیلومتر بر دقیقه</option>
                            <option value="کیلومتر بر ثانیه">کیلومتر بر ثانیه</option>
                        </select>
                    </div>
                    <div class="cInputs">
                        <div> تبدیل به:</div>
                        <select id="to" :value="typeTo" @change="changer">
                            <option value="کیلومتر بر ساعت">کیلومتر بر ساعت </option>
                            <option value="مایل بر ساعت">مایل بر ساعت</option>
                            <option value="متر بر ساعت">متر بر ساعت</option>
                            <option value="متر بر دقیقه">متر بر دقیقه </option>
                            <option value="متر بر ثانیه">متر بر ثانیه</option>
                            <option value="سانتیمتر بر ساعت">سانتیمتر بر ساعت</option>
                            <option value="سانتیمتر بر دقیقه">سانتیمتر بر دقیقه</option>
                            <option value="سانتیمتر بر ثانیه">سانتیمتر بر ثانیه</option>
                            <option value="میلیمتر بر ساعت">میلیمتر بر ساعت</option>
                            <option value="میلیمتر بر دقیقه">میلیمتر بر دقیقه</option>
                            <option value="میلیمتر بر ثانیه">میلیمتر بر ثانیه </option>
                            <option value="مایل بر دقیقه">مایل بر دقیقه</option>
                            <option value="مایل بر ثانیه">مایل بر ثانیه</option>
                            <option value="کیلومتر بر دقیقه">کیلومتر بر دقیقه</option>
                            <option value="کیلومتر بر ثانیه">کیلومتر بر ثانیه</option>
                        </select>
                    </div>
                </div>
                <button class="bn632-hover" @click="convert"><span class="fontIcon">&#xe906;</span>محاسبه </button>
                <div class="result" :class="dark ? 'Result_D':''" v-if="showResult">
                    <div class="textResult">
                        {{num}} {{typeFrom}} معادل <span class="colorC">{{result}}</span> {{typeTo}}
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
.HTool{
    height: 200px;
}
select{
    width: 100%;
    margin-top: 5px;
}
input{
    width: 95%;
    margin-top: 5px;
}
.inputs{
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap:10px;
    padding:10px;
}
.cInputs{
    text-align: right;
}
.result{
    background-color: #f1f1f1;
    margin: 30px 20px;
    border-radius:9px;
    border:1px solid rgba(0, 0, 0, 0.291);
}
.textResult{
    padding: 10px;
}
.colorC{
    color:#3b82f6 !important;
}
</style>