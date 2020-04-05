<template>
    <div class="flex flex-col items-center">
        <h3 class="text-lg font-bold leading-tight antialiased text-gray-700 mb-4">
            <span class="block text-5xl">404</span>
            Not Found
        </h3>
        <router-link to="/"
                     class="text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
            Return to home
        </router-link>
    </div>
</template>

<script>
    import Full from "@/layouts/Full";

    export default {
        name: "NotFound",
        created() {
            this.$emit("update:layout", Full);
        }
    }
</script>

<style scoped>

</style>
