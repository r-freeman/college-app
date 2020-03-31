<template>
    <div class="fixed inset-0 flex items-start justify-end px-4 py-6 sm:p-6 pointer-events-none z-10">
        <div class="max-w-sm w-full">
            <transition-group
                tag="div"
                enter-active-class="transform ease-out duration-300 transition"
                enter-class="translate-x-8 opacity-0"
                enter-to-class="translate-x-0 opacity-100"
                leave-active-class="transition ease-in duration-300"
                leave-class="opacity-100"
                leave-to-class="opacity-0"
                move-class="transition duration-1000">
                <Notification
                    v-for="(notification, i) in sortedNotifications"
                    :key="notification.id"
                    :status="notification.status"
                    :title="notification.title"
                    :message="notification.message"
                    :class="i > 0 ? 'mt-4' : ''">
                </Notification>
            </transition-group>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import Notification from "./Notification";

    export default {
        name: "Notifications",
        components: {
            Notification
        },
        computed: {
            ...mapGetters('notifications', [
                'sortedNotifications'
            ])
        },
    }
</script>

<style scoped>

</style>
