<template>
    <div>
        <AddCourse v-if="addCourseModal"
                   v-on:toggle-add-course-modal="toggleAddCourseModal"/>

        <header class="bg-white border-b-2 border-gray-200">
            <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 h-18">
                <div class="flex justify-between items-center">
                    <h2 class="text-lg font-semibold leading-tight text-gray-900">
                        Courses
                    </h2>
                    <button type="button"
                            @click="toggleAddCourseModal"
                            class="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-400 hover:bg-green-500 focus:outline-none transition duration-150 ease-in-out">
                        Add Course
                    </button>
                </div>
            </div>
        </header>
        <div class="w-full">
            <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div class="px-4 py-6 sm:px-0">
                    <div>
                        <div class="flex flex-col">
                            <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                                <p v-if="!courses.length" class="text-sm font-medium text-center text-gray-500">No
                                    Courses</p>
                                <div v-else
                                     class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg">
                                    <table class="min-w-full">
                                        <thead>
                                        <tr>
                                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Title
                                            </th>
                                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Code
                                            </th>
                                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Description
                                            </th>
                                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Points
                                            </th>
                                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Level
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody class="bg-white">
                                        <Course v-for="course in courses"
                                                :course="course"
                                                :key="course.id"/>
                                        </tbody>
                                        <!--                                        <tfoot class="bg-gray-50">-->
                                        <!--                                        <tr>-->
                                        <!--                                            <td colspan="5"-->
                                        <!--                                                class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">-->
                                        <!--                                                <div class="flex justify-between">-->
                                        <!--                                                    <p class="text-sm leading-5 text-gray-700">-->
                                        <!--                                                        Showing-->
                                        <!--                                                        <span class="font-semibold">1</span>-->
                                        <!--                                                        to-->
                                        <!--                                                        <span class="font-semibold">10</span>-->
                                        <!--                                                        of-->
                                        <!--                                                        <span class="font-semibold">{{ courses.length }}</span>-->
                                        <!--                                                        results-->
                                        <!--                                                    </p>-->

                                        <!--                                                </div>-->
                                        <!--                                            </td>-->
                                        <!--                                        </tr>-->
                                        <!--                                        </tfoot>-->
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Dashboard from "@/layouts/Dashboard";
    import AddCourse from "./AddCourse";
    import Course from "@/components/Course";
    import {mapGetters, mapActions} from "vuex";
    import _ from "lodash";

    export default {
        name: "Courses",
        components: {
            AddCourse,
            Course
        },
        created() {
            this.$emit("update:layout", Dashboard);
            if (_.isEmpty(this.courses)) {
                this.fetchCourses();
            }
        },
        methods: {
            ...mapActions('courses', [
                'toggleAddCourseModal',
                'fetchCourses'
            ])
        },
        computed: {
            ...mapGetters('courses', [
                'courses',
                'addCourseModal'
            ])
        }
    }
</script>

<style scoped>

</style>
