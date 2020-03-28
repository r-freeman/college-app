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
                    // this.fetchCourses();
                }).catch(e => this.$router.push('/login'));

            this.$router.push('/home');
        },
        watch: {
            '$route'(to) {
                document.title = to.meta.title || 'College';
            }
        }
    }
</script>

<style scoped>

</style>
