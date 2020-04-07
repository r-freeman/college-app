<template>
    <div>
        <AddEnrolment v-if="addEnrolmentModal"
                      v-on:toggle-add-enrolment-modal="toggleAddEnrolmentModal"/>

        <header class="bg-white border-b-2 border-gray-200">
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 h-18">
                <div class="flex h-8 justify-between items-center">
                    <h2 class="text-lg font-semibold leading-tight text-gray-900 hidden md:block">
                        Enrolments
                    </h2>
                    <Search v-on:search="updateQuery" :items="'Enrolments'"/>
                    <button type="button"
                            @click="toggleAddEnrolmentModal"
                            class="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-400 hover:bg-green-500 focus:outline-none transition duration-150 ease-in-out">
                        Add Enrolment
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
                                <p v-else-if="!filteredEnrolments.length"
                                   class="text-sm font-medium text-center text-gray-500">
                                    {{ this.searchQuery !== '' ? `Couldn't find "${this.searchQuery}"`
                                    : 'No Enrolments'}}</p>
                                <div v-else
                                     class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg">
                                    <table class="min-w-full">
                                        <thead>
                                        <tr>
                                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Time
                                            </th>
                                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Course
                                            </th>
                                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Lecturer
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody class="bg-white">
                                        <Enrolment v-for="enrolment in filteredEnrolments"
                                                   :enrolment="enrolment"
                                                   :key="enrolment.id"/>
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
    import Enrolment from "@/components/Enrolment";
    import Search from "@/components/Search";
    import AddEnrolment from "./AddEnrolment";
    import TailSpin from "@/assets/svg/TailSpin";
    import {mapGetters, mapActions} from "vuex";
    import _ from "lodash";

    export default {
        name: "Enrolments",
        data() {
            return {
                searchQuery: ''
            }
        },
        components: {
            Enrolment,
            Search,
            TailSpin,
            AddEnrolment
        },
        created() {
            this.$emit("update:layout", Dashboard);
            if (_.isEmpty(this.enrolments)) {
                this.fetchEnrolments();
            }
        },
        methods: {
            updateQuery(val) {
                this.searchQuery = val;
            },
            ...mapActions('enrolments', [
                'toggleAddEnrolmentModal',
                'fetchEnrolments'
            ])
        },
        computed: {
            filteredEnrolments() {
                if (this.searchQuery !== '') {
                    const searchQuery = this.searchQuery.charAt(0).toLowerCase() + this.searchQuery.slice(1);
                    return this.enrolments.filter(enrolment => {
                        return enrolment.status.toLowerCase().indexOf(searchQuery) > -1 ||
                            enrolment.course.title.toLowerCase().indexOf(searchQuery) > -1 ||
                            enrolment.lecturer.name.toLowerCase().indexOf(searchQuery) > -1
                    })
                }
                return this.enrolments;
            },
            ...mapGetters('enrolments', [
                'enrolments',
                'addEnrolmentModal',
                'isLoading'
            ])
        }
    }
</script>

<style scoped>

</style>
