<template>
    <div id="dashboard">
        <Nav/>
        <main id="dashboard__main">
            <slot/>
        </main>
    </div>
</template>

<script>
    import Nav from "@/components/Nav";

    export default {
        name: "Dashboard",
        components: {
            Nav
        }
    }
</script>

<style scoped>
</style>
