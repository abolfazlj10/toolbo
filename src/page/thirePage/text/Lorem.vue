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
            lan:'fa',
            type:'p',
            num:1,
            loremP:['لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'],
            loremJ:[['لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.','چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.','کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد.','در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.'],['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.','Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.','Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.','Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.']],
            loremW:[['لورم','ایپسوم','متن','ساختگی','با','تولید','سادگی','نامفهوم','از','صنعت','چاپ','و','با','استفاده','از','طراحان','گرافیک','است.','چاپگرها','و','متون','بلکه','روزنامه','و','مجله','در','ستون','و','سطرآنچنان','که','لازم','است','و','برای','شرایط','فعلی','تکنولوژی','مورد','نیاز','و','کاربردهای','متنوع','با','هدف','بهبود','ابزارهای','کاربردی','می','باشد.','کتابهای','زیادی','در','شصت','و','سه','درصد','گذشته','حال','و','آینده','شناخت','فراوان','جامعه','و','متخصصان','را','می','طلبد','تا','با','نرم','افزارها','شناخت','بیشتری','را','برای','طراحان','رایانه','ای','علی','الخصوص','طراحان','خلاقی','و','فرهنگ','پیشرو','در','زبان','فارسی','ایجاد','کرد.','در','این','صورت','می','توان','امید','داشت','که','تمام','و','دشواری','موجود','در','ارائه','راهکارها','و','شرایط','سخت','تایپ','به','پایان','رسد','و','زمان','مورد','نیاز','شامل','حروفچینی','دستاوردهای','اصلی','و','جوابگوی','سوالات','پیوسته','اهل','دنیای','موجود','طراحی','اساسا','مورد','استفاده','قرار','گیرد.'],['Lorem','ipsum','dolor','sit','amet,','consectetur','adipiscing','elit,','sed','do','eiusmod','tempor','incididunt','ut','labore','et','dolore','magna','aliqua.','Ut','enim','ad','minim','veniam,','quis','nostrud','exercitation','ullamco','laboris','nisi','ut','aliquip','ex','ea','commodo','consequat.','Duis','aute','irure','dolor','in','reprehenderit','in','voluptate','velit','esse','cillum','dolore','eu','fugiat','nulla','pariatur.','Excepteur','sint','occaecat','cupidatat','non','proident,','sunt','in','culpa','qui','officia','deserunt','mollit','anim','id','est','laborum.']],
            loremH:[['ل','و','ر','م',' ','ا','ی','پ','س','و','م',' ','م','ت','ن',' ','س','ا','خ','ت','گ','ی',' ','ب','ا',' ','ت','و','ل','ی','د',' ','س','ا','د','گ','ی',' ','ن','ا','م','ف','ه','و','م',' ','ا','ز',' ','ص','ن','ع','ت',' ','چ','ا','پ',' ','و',' ','ب','ا',' ','ا','س','ت','ف','ا','د','ه',' ','ا','ز',' ','ط','ر','ا','ح','ا','ن',' ','گ','ر','ا','ف','ی','ک',' ','ا','س','ت','.',' ','چ','ا','پ','گ','ر','ه','ا',' ','و',' ','م','ت','و','ن',' ','ب','ل','ک','ه',' ','ر','و','ز','ن','ا','م','ه',' ','و',' ','م','ج','ل','ه',' ','د','ر',' ','س','ت','و','ن',' ','و',' ','س','ط','ر','آ','ن','چ','ن','ا','ن',' ','ک','ه',' ','ل','ا','ز','م',' ','ا','س','ت',' ','و',' ','ب','ر','ا','ی',' ','ش','ر','ا','ی','ط',' ','ف','ع','ل','ی',' ','ت','ک','ن','و','ل','و','ژ','ی',' ','م','و','ر','د',' ','ن','ی','ا','ز',' ','و',' ','ک','ا','ر','ب','ر','د','ه','ا','ی',' ','م','ت','ن','و','ع',' ','ب','ا',' ','ه','د','ف',' ','ب','ه','ب','و','د',' ','ا','ب','ز','ا','ر','ه','ا','ی',' ','ک','ا','ر','ب','ر','د','ی',' ','م','ی',' ','ب','ا','ش','د','.',' ','ک','ت','ا','ب','ه','ا','ی',' ','ز','ی','ا','د','ی',' ','د','ر',' ','ش','ص','ت',' ','و',' ','س','ه',' ','د','ر','ص','د',' ','گ','ذ','ش','ت','ه','،',' ','ح','ا','ل',' ','و',' ','آ','ی','ن','د','ه',' ','ش','ن','ا','خ','ت',' ','ف','ر','ا','و','ا','ن',' ','ج','ا','م','ع','ه',' ','و',' ','م','ت','خ','ص','ص','ا','ن',' ','ر','ا',' ','م','ی',' ','ط','ل','ب','د',' ','ت','ا',' ','ب','ا',' ','ن','ر','م',' ','ا','ف','ز','ا','ر','ه','ا',' ','ش','ن','ا','خ','ت',' ','ب','ی','ش','ت','ر','ی',' ','ر','ا',' ','ب','ر','ا','ی',' ','ط','ر','ا','ح','ا','ن',' ','ر','ا','ی','ا','ن','ه',' ','ا','ی',' ','ع','ل','ی',' ','ا','ل','خ','ص','و','ص',' ','ط','ر','ا','ح','ا','ن',' ','خ','ل','ا','ق','ی',' ','و',' ','ف','ر','ه','ن','گ',' ','پ','ی','ش','ر','و',' ','د','ر',' ','ز','ب','ا','ن',' ','ف','ا','ر','س','ی',' ','ا','ی','ج','ا','د',' ','ک','ر','د','.',' ','د','ر',' ','ا','ی','ن',' ','ص','و','ر','ت',' ','م','ی',' ','ت','و','ا','ن',' ','ا','م','ی','د',' ','د','ا','ش','ت',' ','ک','ه',' ','ت','م','ا','م',' ','و',' ','د','ش','و','ا','ر','ی',' ','م','و','ج','و','د',' ','د','ر',' ','ا','ر','ا','ئ','ه',' ','ر','ا','ه','ک','ا','ر','ه','ا',' ','و',' ','ش','ر','ا','ی','ط',' ','س','خ','ت',' ','ت','ا','ی','پ',' ','ب','ه',' ','پ','ا','ی','ا','ن',' ','ر','س','د',' ','و',' ','ز','م','ا','ن',' ','م','و','ر','د',' ','ن','ی','ا','ز',' ','ش','ا','م','ل',' ','ح','ر','و','ف','چ','ی','ن','ی',' ','د','س','ت','ا','و','ر','د','ه','ا','ی',' ','ا','ص','ل','ی',' ','و',' ','ج','و','ا','ب','گ','و','ی',' ','س','و','ا','ل','ا','ت',' ','پ','ی','و','س','ت','ه',' ','ا','ه','ل',' ','د','ن','ی','ا','ی',' ','م','و','ج','و','د',' ','ط','ر','ا','ح','ی',' ','ا','س','ا','س','ا',' ','م','و','ر','د',' ','ا','س','ت','ف','ا','د','ه',' ','ق','ر','ا','ر',' ','گ','ی','ر','د','.'],["L","o","r","e","m"," ","i","p","s","u","m"," ","d","o","l","o","r"," ","s","i","t"," ","a","m","e","t",","," ","c","o","n","s","e","c","t","e","t","u","r"," ","a","d","i","p","i","s","c","i","n","g"," ","e","l","i","t",","," ","s","e","d"," ","d","o"," ","e","i","u","s","m","o","d"," ","t","e","m","p","o","r"," ","i","n","c","i","d","i","d","u","n","t"," ","u","t"," ","l","a","b","o","r","e"," ","e","t"," ","d","o","l","o","r","e"," ","m","a","g","n","a"," ","a","l","i","q","u","a","."," ","U","t"," ","e","n","i","m"," ","a","d"," ","m","i","n","i","m"," ","v","e","n","i","a","m",","," ","q","u","i","s"," ","n","o","s","t","r","u","d"," ","e","x","e","r","c","i","t","a","t","i","o","n"," ","u","l","l","a","m","c","o"," ","l","a","b","o","r","i","s"," ","n","i","s","i"," ","u","t"," ","a","l","i","q","u","i","p"," ","e","x"," ","e","a"," ","c","o","m","m","o","d","o"," ","c","o","n","s","e","q","u","a","t","."," ","D","u","i","s"," ","a","u","t","e"," ","i","r","u","r","e"," ","d","o","l","o","r"," ","i","n"," ","r","e","p","r","e","h","e","n","d","e","r","i","t"," ","i","n"," ","v","o","l","u","p","t","a","t","e"," ","v","e","l","i","t"," ","e","s","s","e"," ","c","i","l","l","u","m"," ","d","o","l","o","r","e"," ","e","u"," ","f","u","g","i","a","t"," ","n","u","l","l","a"," ","p","a","r","i","a","t","u","r","."," ","E","x","c","e","p","t","e","u","r"," ","s","i","n","t"," ","o","c","c","a","e","c","a","t"," ","c","u","p","i","d","a","t","a","t"," ","n","o","n"," ","p","r","o","i","d","e","n","t",","," ","s","u","n","t"," ","i","n"," ","c","u","l","p","a"," ","q","u","i"," ","o","f","f","i","c","i","a"," ","d","e","s","e","r","u","n","t"," ","m","o","l","l","i","t"," ","a","n","i","m"," ","i","d"," ","e","s","t"," ","l","a","b","o","r","u","m","."]],
            result:null
        }
    },
    setup(){
        const dark = inject("dark")
        return{dark}
    },
    watch:{
        num(){
            this.creator(this.type)
        },
        type(n){
            this.creator(n)
        },
        lan(){
            this.creator(this.type)
        }
    },
    methods:{
        convertP(){
            this.result = ''
            for(let i = 0 ; i < this.num ; i++){
                if(i+1 == this.num){
                    if(this.lan == 'fa')
                        this.result += this.loremP[0]
                    else
                        this.result += this.loremP[1]
                }
                else{
                    if(this.lan == 'fa')
                        this.result += this.loremP[0] + "\n \n"
                    else
                        this.result += this.loremP[1] + "\n \n"
                }
            }
        },
        C_J(){
            this.result = ''
            var counter = 0
            if(this.lan == 'fa'){
                for(let i = 0 ; counter < this.num; i++){
                    if(i == this.loremJ[0].length)
                        i = 0
                    counter++
                    this.result += this.loremJ[0][i]
                }
            }else{
                for(let i = 0 ; counter < this.num; i++){
                    if(i == this.loremJ[1].length)
                        i = 0
                    counter++
                    this.result += this.loremJ[1][i]
                }
            }
        },
        C_W(){
            this.result = ''
            var counter = 0
            if(this.lan == 'fa'){
                for(let i = 0 ; counter < this.num; i++){
                    if(i == this.loremW[0].length)
                        i = 0
                    counter++
                    this.result += this.loremW[0][i] + ' '
                }
            }else{
                for(let i = 0 ; counter < this.num; i++){
                    if(i == this.loremW[1].length)
                        i = 0
                    counter++
                    this.result += this.loremW[1][i] + ' '
                }
            }
        },
        C_H(){
            this.result = ''
            var counter = 0
            if(this.lan == 'fa'){
                for(let i = 0 ; counter < this.num; i++){
                    if(i == this.loremH[0].length)
                        i = 0
                    counter++
                    this.result += this.loremH[0][i] + ' '
                }
            }else{
                for(let i = 0 ; counter < this.num; i++){
                    if(i == this.loremH[1].length)
                        i = 0
                    counter++
                    this.result += this.loremH[1][i] + ' '
                }
            }
        },
        creator(n){
            if(n == 'p'){
                this.convertP()
            }
            else if(n == 'j'){
                this.C_J()
            }
            else if(n == 'w'){
                this.C_W()
            }
            else if(n == 'h'){
                this.C_H()
            }
        },
        changer(inp){
            if(inp == 'lan'){
                this.lan = this.$refs.lan.value
            }else if(inp == 'type'){
                this.type = this.$refs.type.value
            }

        },
        copy(){
            navigator.clipboard.writeText(this.result);
        }
    },
    created (){
        document.title='تولبو | تولید متن تصادفی لورم ایپسوم '
        this.db.push(dbG.dataBox[7].item[0])
        this.db.push(dbG.dataBox[7].item[2])
        this.db.push(dbG.dataBox[6].item[3])
        this.creator(this.type)
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
        <locations title="تولید متن تصادفی لورم ایپسوم" PN="متن" PNR="/text"/>
        <div class="container_m">
            <div class="c_tools">
            <div class="tool" :class="dark ? 'tool_D' : ''">
                <div class="title_tool">تولید متن تصادفی لورم ایپسوم</div>
                <div>
                    <div class="inputs">
                        <div>
                            <div>زبان:</div>
                            <select :value="lan" @change="changer('lan')" ref="lan">
                                <option value="fa">فارسی</option>
                                <option value="en">انگلیسی</option>
                            </select>
                        </div>
                        <div>
                            <div>نوع متن:</div>
                            <select :value="type" @change="changer('type')" ref="type">
                                <option value="p">پاراگراف</option>
                                <option value="j">جمله</option>
                                <option value="w">کلمه</option>
                                <option value="h">حرف</option>
                            </select>
                        </div>
                        <div>
                            <div>متن:</div>
                            <input type="text" v-model="num">
                        </div>
                    </div>
                    <div class="output">
                        <textarea cols="30" rows="10" v-model="result" :style="lan == 'fa'?'direction:rtl':'direction:ltr'"></textarea>
                    </div>
                    <button class="bn632-hover" @click="copy()"><span class="fontIcon">&#xe906;</span>کپی</button>
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
    gap:10px;
    padding: 10px;
}
.inputs *{
    flex-grow:1;
}
.inputs input{
    width: 95%;    
}
.inputs select{
    width: 100%;    
}
.output{
    display: flex;
    justify-content: center;
    padding: 0 10px;
}
.output textarea{
    width: 100%;
    padding: 5px;
    outline: none;
}
.bn632-hover{
    margin: 15px auto;
}
</style>