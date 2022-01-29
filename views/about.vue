<template>
    <div>
        <h1>介绍页</h1>
        <button @click="handleRouter">跳转到 user</button>


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
        handleRouter () {
            console.log('this.$router', this.$router)
            this.$router.push('/user/123') // 类似于 window.location.href
            /*
            $router 还有其他一些方法

            replace // 类似于 <router-link> 的 replace 功能，它不会向 history 添加新记录，而是替换掉当前 history 记录，
                    // 如 this.$router.replace('user/123');

            go      // 类似于 window.history.go() ,在 history 记录中向前或者后退多少步，参数是整数，
                    // 如 this.$router.go(-1);
                    // 如 this.$router.go(2);
             */
        },


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
    },
}
</script>