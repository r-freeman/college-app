<template>
    <div id="full">
        <Notifications/>
        <main id="full__main"
              class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <slot/>
        </main>
    </div>
</template>

<script>
    import Notifications from "../components/Notifications";

    export default {
        name: "Full",
        components: {
            Notifications
        }
    }
</script>

<style scoped>

</style>
