<template>
    <div id="app">
        <component :is="layout">
            <router-view :layout.sync="layout"/>
        </component>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "App",
        data() {
            return {
                layout: 'div'
            }
        },
        created() {
            this.fetchUser();
        },
        methods: {
            ...mapActions('auth', ['fetchUser'])
        },
        watch: {
            '$route': {
                handler: (to) => {
                    // change document title to route meta title
                    document.title = to.meta.title || 'College';
                }, immediate: true
            }
        }
    }
</script>

<style scoped>

</style>
