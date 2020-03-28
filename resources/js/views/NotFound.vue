<template>
    <img :src="NotFound" class="w-64" alt=""/>
</template>

<script>
    import Full from "@/layouts/Full";
    import NotFound from "@/assets/images/NotFound.png";

    export default {
        name: "NotFound",
        data() {
            return {
                NotFound
            }
        },
        created() {
            this.$emit("update:layout", Full);
        }
    }
</script>

<style scoped>

</style>
