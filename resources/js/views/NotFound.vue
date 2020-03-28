<template>
    <div class="flex">
        <h3 class="text-lg font-bold antialiased text-gray-700">404 Not Found</h3>
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
