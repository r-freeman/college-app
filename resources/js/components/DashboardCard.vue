<template>
    <transition v-if="isReady"
                enter-active-class="transition duration-100"
                enter-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition duration-100"
                leave-class="opacity-100"
                leave-to-class="opacity-0">>
        <router-link :to="route" tag="div"
                     class="bg-white pt-24 pb-3 px-6 rounded-lg shadow cursor-pointer transition duration-500 lg:transform hover:scale-110 hover:shadow-lg">
            <div class="flex items-end">
                <div>
                    <h2 class="text-4xl">{{ items.length }}
                        <span class="-ml-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                             {{ itemName }}
                        </span>
                    </h2>
                </div>
            </div>
        </router-link>
    </transition>
    <div v-else class="flex justify-center items-center py-12 md:p-0">
        <TailSpin :fill="'#374150'" class="w-8 h-8"/>
    </div>
</template>

<script>
    import TailSpin from "@/assets/svg/TailSpin";

    export default {
        name: "DashboardCard",
        components: {
            TailSpin
        },
        props: {
            items: {
                type: Array,
                default: () => {
                    return [];
                }
            },
            itemName: {
                type: String,
                required: true
            },
            route: {
                type: String,
                required: true
            }
        },
        computed: {
            isReady() {
                return this.items.length > 10
            }
        }
    }
</script>

<style scoped>

</style>
