<template>
    <div class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto">
        <div class="rounded-lg shadow-xs overflow-hidden">
            <div class="p-4">
                <div class="flex items-start">
                    <div class="flex-shrink-0">
                        <Check v-if="status === 'success'" class="w-6 h-6 text-green-400 fill-current"/>
                        <Cross v-else class="w-6 h-6 text-red-400 fill-current"/>
                    </div>
                    <div class="ml-3 w-0 flex-1 pt-0.5">
                        <p class="text-sm leading-5 font-semibold text-gray-900">
                            {{ title }}
                        </p>
                        <p class="mt-1 text-sm leading-5 text-gray-500">
                            {{ message }}
                        </p>
                    </div>
                    <div class="ml-4 flex-shrink-0 flex">
                        <button class="inline-flex text-gray-400 focus:outline-none">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                 stroke-width="2" viewBox="0 0 24 24" class="w-5 h-5 fill-current">
                                <path d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Check from "../assets/svg/Check";
    import Cross from "../assets/svg/Cross";

    export default {
        name: "Notification",
        props: ['status', 'title', 'message'],
        components: {
            Check,
            Cross
        }
    }
</script>

<style scoped>

</style>
