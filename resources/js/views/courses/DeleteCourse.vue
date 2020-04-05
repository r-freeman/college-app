<template>
    <div class="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-start sm:justify-center sm:my-48">
        <div class="fixed inset-0 transition-opacity">
            <div class="absolute inset-0 bg-black opacity-25"
                 @click="toggleDeleteCourseModal"></div>
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
                            Delete Course
                        </h3>
                        <div class="mt-2">
                            <p v-if="hasEnrolments" class="text-sm leading-5 text-gray-500">
                                This course has {{ enrolments.length }} enrolments. Are you sure you want to
                                delete this course and its enrolments?
                            </p>
                            <p v-else class="text-sm leading-5 text-gray-500">
                                {{ strings.COURSE_MODAL_DELETE_TEXT }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                    <button @click="deleteCourse" type="button"
                            class="inline-flex bg-red-500 select-none justify-center w-full rounded-md border border-transparent px-4 py-2 text-base leading-6 font-medium text-white shadow-sm focus:outline-none transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                            :class="[!isDeleting ? 'hover:bg-red-600' : 'bg-red-600']"
                            :disabled="isDeleting">
                        <TailSpin v-if="isDeleting" class="w-6 h-6 mx-auto"/>
                        <span v-else class="block leading-relaxed w-full h-6">Confirm</span>
                    </button>
                </span>
                <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                    <button @click="toggleDeleteCourseModal" type="button"
                            class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                            :disabled="isDeleting">
                    Cancel
                    </button>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import Warning from "@/assets/svg/Warning";
    import TailSpin from "@/assets/svg/TailSpin";
    import * as strings from "@/strings";

    export default {
        name: "DeleteCourse",
        components: {
            Warning,
            TailSpin
        },
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
        computed: {
            hasEnrolments() {
                return this.enrolments.length > 0
            },
            ...mapGetters('courses', ['isDeleting'])
        },
        created() {
            // listen for escape key
            const handleEscape = (e) => {
                if (e.key === 'Esc' || e.key === 'Escape' && !this.isDeleting) {
                    // hide the nav dropdown
                    this.toggleDeleteCourseModal();
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
            toggleDeleteCourseModal() {
                if (!this.isDeleting) {
                    this.$emit('toggle-delete-course-modal');
                }
            },
            deleteCourse() {
                this.$emit('delete-course');
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
