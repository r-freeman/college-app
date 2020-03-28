<template>
    <div id="full">
        <main id="full__main"
              class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <slot/>
        </main>
    </div>
</template>

<script>
    export default {
        name: "Full"
    }
</script>

<style scoped>

</style>