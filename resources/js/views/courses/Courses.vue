<template>
    <div>
        <AddCourse v-if="addCourseModal"
                   v-on:toggle-add-course-modal="toggleAddCourseModal"/>

        <header class="bg-white border-b-2 border-gray-200">
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 h-18">
                <div class="flex h-8 justify-between items-center">
                    <h2 class="text-lg font-semibold leading-tight text-gray-900 hidden md:block">
                        Courses
                    </h2>
                    <Search v-on:search="updateQuery" :items="'Courses'"/>
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
                                <TailSpin v-if="isLoading" :fill="'#374150'" class="w-8 h-8 mx-auto"/>
                                <p v-else-if="!filteredCourses.length"
                                   class="text-sm font-medium text-center text-gray-500">
                                    {{ this.searchQuery !== '' ? `Couldn't find "${this.searchQuery}"`
                                    : 'No Courses'}}</p>
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
                                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Enrolments
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody class="bg-white">
                                        <Course v-for="course in filteredCourses"
                                                :course="course"
                                                :key="course.id"/>
                                        </tbody>
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
    import Search from "@/components/Search";
    import TailSpin from "@/assets/svg/TailSpin";
    import {mapGetters, mapActions} from "vuex";
    import _ from "lodash";

    export default {
        name: "Courses",
        data() {
            return {
                searchQuery: ''
            }
        },
        components: {
            AddCourse,
            Course,
            Search,
            TailSpin
        },
        created() {
            this.$emit("update:layout", Dashboard);
            if (_.isEmpty(this.courses)) {
                this.fetchCourses();
            }
        },
        methods: {
            updateQuery(val) {
                this.searchQuery = val;
            },
            ...mapActions('courses', [
                'toggleAddCourseModal',
                'fetchCourses'
            ])
        },
        computed: {
            filteredCourses() {
                if (this.searchQuery !== '') {
                    const searchQuery = this.searchQuery.charAt(0).toLowerCase() + this.searchQuery.slice(1);
                    return this.courses.filter(course => {
                        return course.title.toLowerCase().indexOf(searchQuery) > -1 ||
                            course.code.toLowerCase().indexOf(searchQuery) > -1 ||
                            course.description.toLowerCase().indexOf(searchQuery) > -1
                    })
                }
                return this.courses;
            },
            ...mapGetters('courses', [
                'courses',
                'addCourseModal',
                'isLoading'
            ])
        }
    }
</script>

<style scoped>

</style>
