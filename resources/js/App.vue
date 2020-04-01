<template>
    <div id="app">
        <component :is="layout">
            <router-view :layout.sync="layout"/>
        </component>
    </div>
</template>

<script>
    import authService from "./services/auth";

    export default {
        name: "App",
        data() {
            return {
                layout: 'div'
            }
        },
        created() {
            authService.isLoggedIn()
                .then(() => {
                }).catch(e => this.$router.push('/login'));

            // this.$router.push('/home');
        },
        watch: {
            '$route': {
                handler: (to, from) => {
                    // change document title to route meta title
                    document.title = to.meta.title || 'College';
                }, immediate: true
            }
        }
    }
</script>

<style scoped>

</style>
