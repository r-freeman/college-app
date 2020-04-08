<template>
    <div>
        <header class="bg-white border-b-2 border-gray-200">
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 h-18">
                <div class="flex h-8 justify-between items-center">
                    <h2 class="text-lg font-semibold leading-tight text-gray-900">
                        Dashboard
                    </h2>
                    <p class="text-sm leading-none text-gray-500">
                        {{ new Date() | moment("dddd, MMMM Do YYYY") }}
                    </p>
                </div>
            </div>
        </header>
        <div class="w-full">
            <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div class="px-4 py-6 sm:px-0">
                    <h3 class="text-lg font-bold antialiased mb-4 text-gray-700">
                        Summary
                    </h3>
                    <div class="grid xs:grid-cols-12 md:grid-cols-3 gap-6">
                        <DashboardCard :items="courses" :item-name="'Courses'" :route="'/courses'"/>
                        <DashboardCard :items="enrolments" :item-name="'Enrolments'" :route="'/enrolments'"/>
                        <DashboardCard :items="lecturers" :item-name="'Lecturers'" :route="'/lecturers'"/>
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
    import _ from "lodash";

    export default {
        name: "Home",
        components: {
            DashboardCard
        },
        created() {
            this.$emit("update:layout", Dashboard);
            if (_.isEmpty(this.courses)) {
                this.$store.dispatch('courses/fetchCourses');
            }
            if (_.isEmpty(this.enrolments)) {
                this.$store.dispatch('enrolments/fetchEnrolments');
            }
            if (_.isEmpty(this.lecturers)) {
                this.$store.dispatch('lecturers/fetchLecturers');
            }
        },
        computed: {
            ...mapGetters('courses', ['courses']),
            ...mapGetters('enrolments', ['enrolments']),
            ...mapGetters('lecturers', ['lecturers'])
        }
    }
</script>

<style scoped>

</style>
