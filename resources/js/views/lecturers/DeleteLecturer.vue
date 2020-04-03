<template>
    <div class="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-start sm:justify-center sm:my-48">
        <div class="fixed inset-0 transition-opacity">
            <div class="absolute inset-0 bg-black opacity-25"
                 @click="toggleDeleteLecturerModal"></div>
        </div>
        <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                    <div
                        class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <Warning class="h-6 w-6 text-red-500"/>
                    </div>
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 class="text-lg leading-6 font-semibold text-gray-900">
                            Delete Lecturer
                        </h3>
                        <div class="mt-2">
                            <p v-if="hasEnrolments" class="text-sm leading-5 text-gray-500">
                                {{ strings.LECTURER_ENROLMENTS_MODAL_DELETE_TEXT(enrolments.length) }}
                            </p>
                            <p v-else class="text-sm leading-5 text-gray-500">
                                {{ strings.LECTURER_MODAL_DELETE_TEXT }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                    <button @click="deleteLecturer" type="button"
                            class="inline-flex bg-gray-400 select-none justify-center w-full rounded-md border border-transparent px-4 py-2 text-base leading-6 font-medium text-white shadow-sm focus:outline-none transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                            :class="[hasEnrolments ? '' : enabledClass]"
                            :disabled="hasEnrolments">
                            Confirm
                    </button>
                </span>
                <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                    <button @click="toggleDeleteLecturerModal" type="button"
                            class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                    Cancel
                    </button>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import Warning from "@/assets/svg/Warning";
    import * as strings from "@/strings";

    export default {
        name: "DeleteLecturer",
        props: {
            enrolments: {
                type: Array,
                default: () => {
                    return [];
                }
            }
        },
        data() {
            return {
                enabledClass: 'enabled',
                strings
            }
        },
        components: {
            Warning
        },
        computed: {
            hasEnrolments() {
                return this.enrolments.length > 0
            }
        },
        created() {
            // listen for escape key
            const handleEscape = (e) => {
                if (e.key === 'Esc' || e.key === 'Escape') {
                    // hide the nav dropdown
                    this.toggleDeleteLecturerModal();
                }
            };

            // add event handler
            document.addEventListener('keydown', handleEscape);

            // remove event listener when component is about to be destroyed
            this.$once('hook:beforeDestroy', () => {
                document.removeEventListener('keydown', handleEscape);
            })
        },
        methods: {
            toggleDeleteLecturerModal() {
                this.$emit('toggle-delete-lecturer-modal');
            },
            deleteLecturer() {
                this.$emit('delete-lecturer');
            }
        }
    }
</script>

<style scoped>
    .enabled {
        @apply bg-red-500
    }

    .enabled:hover {
        @apply bg-red-600
    }
</style>
