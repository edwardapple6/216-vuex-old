<template>
    <div>
        <div>Hello {{ name }}</div>

        <v-title title="Vue组件化"></v-title>
        <v-button @click="handleClick">点击按钮</v-button>
        <p>
            <img src="./images/image.png" alt="" style="width: 200px;">
        </p>

        <router-view></router-view>
    </div>
</template>

<script>
// 导入组件
import vTitle from './title.vue';
import vButton from './button.vue';

export default {
    components: {
        vTitle,
        vButton
    },
    /* // 等同于
    // 对象字面量缩写。当对象的 key 和 value 名称一致时，可以缩写成一个。
    components: {
        vTitle: vTitle,
        vButton: vButton
    }, */

    data () {
        return {
            name: 'Vue.js'
        }
    },
    methods: {
        handleClick (e) {
            console.log(e);
        }
    },
}
</script>

<style scoped>
    div {
        color: #f60;
        font-size: 24px;
    }
</style>