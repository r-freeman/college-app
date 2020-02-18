<template>
    <div class="Landing">
        <main class="Landing__main">
            <slot/>
        </main>
    </div>
</template>

<script>
    export default {
        name: "Landing"
    }
</script>

<style>
    html, body, #app {
        height: 100%;
    }
    body {
        background: #f5f5f5 !important;
    }
    .Landing {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    .Landing__main {
        width: 100%;
    }
</style>
