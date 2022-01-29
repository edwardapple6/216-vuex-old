<template>
    <div>
        <h1>首页</h1>
        <router-link to="/index">"跳转到 index</router-link>
        <router-link to="/about">"跳转到 about</router-link>

        <!--
            <div data-v-24e0737a="">
                <h1>首页</h1>
                <a href="/index" class="router-link-exact-active router-link-active">"跳转到 index</a>
                <a href="/about" class="">"跳转到 about</a>
            </div>

            使用 <router-link> 在 HTML5 的 History 模式下会 拦截点击 ，避免浏览器重新加载页面。

            <router-link> 常用prop:
            to           // 指定需要跳转的路径，可以用 v-bind 动态设置
            tag          // 指定渲染成什么标签，比如 <router-link to="/about" tag="li"> 渲染的结果就是 <li> 而不是 <a>
            replace      // 使用 replace 不会留下 History 记录，所以导航后不能用后退键返回上一个页面，如 <router-link to="/about" replace>
            active-class // 当 <router-link> 对应的路由匹配成功时，会自动给当前元素设置一个名为 router-link-active 的 class ，设置 prop: acrive-class 可以修改默认的名称
                         // 在做类似导航栏时，可以使用该功能高亮显示当前页面对应的导航菜单项，但是一般不会修改 active-class ，直接使用默认值 router-link-active 就可以。
        -->

        <br>
        {{ count }}
        <button @click="handleIncrement">+1</button>
        <button @click="handleDecrease">-1</button>
        <button @click="handleIncrementMore">+5</button>
        <div>{{ list }}</div>
        <div>{{ listCount }}</div>
        <button @click="handleActionIncrement">action +1</button>
        <button @click="handleAsyncIncrement">async +1</button>
    </div>
</template>
<script>
export default {
    computed: {
        count () {
            return this.$store.state.count;
        },
        list () {
            return this.$store.getters.filteredList;
        },
        listCount () {
            return this.$store.getters.listCount;
        }
    },
    methods: {
        handleIncrement () {
            this.$store.commit('increment');
        },
        handleDecrease () {
            this.$store.commit('decrease');
        },
        handleIncrementMore () {
            this.$store.commit('increment', 5);
        },
        handleActionIncrement () {
            this.$store.dispatch('increment');
        },
        handleAsyncIncrement () {
            this.$store.dispatch('asyncIncrement').then(() => {
                console.log(this.$store.state.count);
            });
        }
    }
}
</script>