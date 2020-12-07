<template>
    <div>
        背景色切换
        <span style="background:#67C23A" @click="changeTheme('green')"></span>
        <span style="background:#F56C6C" @click="changeTheme('pink')"></span>
        <span style="background:#E6A23C" @click="changeTheme('orange')"></span>
        <span style="background:#909399" @click="changeTheme('default')"></span>
    </div>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
    data() {
        return {
            // current_theme: 'default'
        }
    },
    methods: {
        ...mapMutations('user', ['setTheme']),
        changeTheme(type) {
            document.getElementById('app').className = type;
            this.setTheme(type);
        }
    }
}
</script>
<style lang="less" scoped>
    div {
        position: absolute;
        right: 20px;
        top: 20px;
        span {
            display: inline-block;
            position: relative;
            width: 100px;
            height: 50px;
        }
        span:active::before {
            .plus_color()   //less的mixins用法
        }
        .plus_color {
            display: block;
            content: '';
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 10%)
        }
    }
</style>