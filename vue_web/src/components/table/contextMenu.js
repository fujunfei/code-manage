export default {
    name: 'airContexMenu',
    props: {
        position: {
            type: Object,
            default: () => {
                return {
                    top: 0,
                    left: 0
                }
            }
        },
        toggleShow:{
            type:Boolean,
            default: false
        },
        menuList : {
            type: Array,
            default: () => []
        }
    },
    render(h) {
        var self = this;
        var menuInfo = [];
        this.menuList.forEach((ele)=>{
            menuInfo.push(h('li',{
                style: {
                    width:"100%",
                    display:"flex"
                },
                class: ['air-table__context--list','ripple'],
                on: {  
                        click:function (){
                            self.$emit('menuClick', ele)
                        }
                    }
                },
            [
                h('i', {
                    class: [ele.icon,'air-table__context--icon']
                }),
                h('span',{class:['air-table__context--info']}, ele.name)
            ]))
        })
        return h(
            'div', {
                style: {
                  width:"300px",
                  padding: "8px 0px",
                  position:"fixed",
                  left: this.position.left + "px",
                  top: this.position.top + "px",
                  display: this.toggleShow ? "block" : "none",
                  zIndex:99999,
                  backgroundColor:"#fff",
                  borderRadius:"4px"
                },
                class: ['air-table__context--menu']
            },
            menuInfo
        );
    },
    computed: {
         
    },
    data() {
        return {
         
        };
    },
    created() {
         
    },
    methods: {
        menuClick(){
             
        }
    }
};