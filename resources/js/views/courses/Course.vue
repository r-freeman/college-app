<template>
    <div>
        <!--        <EditCourse v-if="editCourseModal"-->
        <!--                    v-on:toggle-edit-course-modal="toggleEditCourseModal"/>-->

        <DeleteCourse v-if="deleteCourseModal"
                      v-on:toggle-delete-course-modal="toggleDeleteCourseModal"
                      v-on:delete-course="deleteCourse"/>

        <header class="bg-white border-b-2 border-gray-200">
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 h-18">
                <div class="flex items-center">
                    <h2 class="text-lg font-semibold leading-tight text-gray-900">
                        View Course
                    </h2>
                </div>
            </div>
        </header>
        <div class="w-full h-screen bg-whitesmoke">
            <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div class="px-4 py-6 sm:px-0">
                    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div class="flex justify-between items-center px-4 py-5 border-b border-gray-200 sm:px-6">
                            <h3 class="text-lg leading-6 font-semibold text-gray-900">
                                Course
                            </h3>
                            <div>
                                <button type="button"
                                        class="text-indigo-600 hover:text-indigo-900 font-semibold focus:outline-none"
                                        @click.prevent="">
                                    Edit
                                </button>
                                <button type="button"
                                        class="ml-4 text-red-600 hover:text-red-900 font-semibold focus:outline-none"
                                        @click.prevent="toggleDeleteCourseModal">Delete
                                </button>
                            </div>
                        </div>
                        <div>
                            <dl>
                                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm leading-5 font-medium text-gray-500">
                                        Title
                                    </dt>
                                    <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                        {{ course.title }}
                                    </dd>
                                </div>
                                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm leading-5 font-medium text-gray-500">
                                        Code
                                    </dt>
                                    <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                        {{ course.code }}
                                    </dd>
                                </div>
                                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm leading-5 font-medium text-gray-500">
                                        Description
                                    </dt>
                                    <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                        {{ course.description }}
                                    </dd>
                                </div>
                                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm leading-5 font-medium text-gray-500">
                                        Points
                                    </dt>
                                    <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                        {{ course.points }}
                                    </dd>
                                </div>
                                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm leading-5 font-medium text-gray-500">
                                        Level
                                    </dt>
                                    <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                        {{ course.level }}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Dashboard from "@/layouts/Dashboard";
    import {mapGetters, mapActions} from "vuex";
    // import EditCourse from "./EditCourse";
    import DeleteCourse from "./DeleteCourse";

    export default {
        name: "Course",
        components: {
            // EditCourse,
            DeleteCourse
        },
        created() {
            this.$emit("update:layout", Dashboard);
            this.$store.dispatch('courses/fetchCourse', this.$route.params.id);
        },
        methods: {
            deleteCourse() {
                this.$store.dispatch('courses/deleteCourse', this.$route.params.id)
                    .then(() => {
                        this.$router.push('/courses');
                    });
            },
            ...mapActions('courses', [
                'toggleEditCourseModal',
                'toggleDeleteCourseModal'
            ])
        },
        computed: {
            ...mapGetters('courses', [
                'course',
                'editCourseModal',
                'deleteCourseModal'
            ])
        },
    }
</script>

<style scoped>

</style>
