<template>
    <div>
        <header class="bg-white border-b-2 border-gray-200">
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 h-18">
                <div class="flex justify-between items-center">
                    <h2 class="text-lg font-semibold leading-tight text-gray-900">
                        Dashboard
                    </h2>
                    <p class="text-sm leading-none text-gray-500">
                        {{ new Date() | moment("dddd, MMMM Do YYYY") }}
                    </p>
                </div>
            </div>
        </header>
        <div class="w-full h-screen bg-whitesmoke">
            <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div class="px-4 py-6 sm:px-0">
                    <h3 class="text-lg font-bold antialiased mb-4 text-gray-700">
                        Summary
                    </h3>
                    <div class="grid xs:grid-cols-12 md:grid-cols-3 gap-6">
                        <DashboardCard :items="courses" :itemName="'Courses'" :route="'/courses'"/>
                        <div>
                            <router-link to="/enrolments" tag="div" v-show="ready"
                                         class="bg-white pt-24 pb-3 px-6 rounded-lg shadow transition duration-500 lg:transform hover:scale-110 hover:shadow-lg">
                                <div class="flex items-end">
                                    <div>
                                        <h2 class="text-4xl">1
                                            <span
                                                class="-ml-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                                            Enrolments
                                        </span>
                                        </h2>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                        <DashboardCard :items="lecturers" :itemName="'Lecturers'" :route="'/lecturers'"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import Dashboard from "@/layouts/Dashboard";
    import DashboardCard from "@/components/DashboardCard";
    import TailSpin from "@/assets/svg/TailSpin";
    import _ from "lodash";

    export default {
        name: "Home",
        data() {
            return {
                ready: false
            }
        },
        components: {
            DashboardCard,
            TailSpin
        },
        created() {
            this.$emit("update:layout", Dashboard);
            if (_.isEmpty(this.courses)) {
                this.$store.dispatch('courses/fetchCourses');
            }
            if (_.isEmpty(this.lecturers)) {
                this.$store.dispatch('lecturers/fetchLecturers');
            }
        },
        mounted() {
            this.ready = true;
        },
        computed: {
            ...mapGetters('courses', ['courses']),
            ...mapGetters('lecturers', ['lecturers'])
        }
    }
</script>

<style scoped>

</style>
