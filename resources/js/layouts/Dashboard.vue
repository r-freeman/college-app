<template>
    <div id="dashboard">
        <Notifications/>
        <Nav/>
        <main id="dashboard__main">
            <slot/>
        </main>
    </div>
</template>

<script>
    import Nav from "@/components/Nav";
    import Notifications from "../components/Notifications";

    export default {
        name: "Dashboard",
        components: {
            Nav,
            Notifications
        }
    }
</script>

<style scoped>
</style>
