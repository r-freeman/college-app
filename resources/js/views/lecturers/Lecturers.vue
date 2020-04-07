<template>
    <div>
        <AddLecturer v-if="addLecturerModal"
                     v-on:toggle-add-lecturer-modal="toggleAddLecturerModal"/>

        <header class="bg-white border-b-2 border-gray-200">
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 h-18">
                <div class="flex h-8 justify-between items-center">
                    <h2 class="text-lg font-semibold leading-tight text-gray-900 hidden md:block">
                        Lecturers
                    </h2>
                    <Search v-on:search="updateQuery" :items="'Lecturers'"/>
                    <button type="button"
                            @click="toggleAddLecturerModal"
                            class="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-400 hover:bg-green-500 focus:outline-none transition duration-150 ease-in-out">
                        Add Lecturer
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
                                <p v-else-if="!filteredLecturers.length"
                                   class="text-sm font-medium text-center text-gray-500">
                                    {{ this.searchQuery !== '' ? `Couldn't find "${this.searchQuery}"`
                                    : 'No Lecturers'}}</p>
                                <div v-else
                                     class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg">
                                    <table class="min-w-full">
                                        <thead>
                                        <tr>
                                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Address
                                            </th>
                                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Phone
                                            </th>
                                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                Enrolments
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody class="bg-white">
                                        <Lecturer v-for="lecturer in filteredLecturers"
                                                  :lecturer="lecturer"
                                                  :key="lecturer.id"/>
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
    import Lecturer from "@/components/Lecturer";
    import Search from "@/components/Search";
    import AddLecturer from "./AddLecturer";
    import TailSpin from "@/assets/svg/TailSpin";
    import {mapGetters, mapActions} from "vuex";
    import _ from "lodash";

    export default {
        name: "Lecturers",
        data() {
            return {
                searchQuery: ''
            }
        },
        components: {
            AddLecturer,
            Lecturer,
            Search,
            TailSpin
        },
        created() {
            this.$emit("update:layout", Dashboard);
            if (_.isEmpty(this.lecturers)) {
                this.fetchLecturers();
            }
        },
        methods: {
            updateQuery(val) {
                this.searchQuery = val;
            },
            ...mapActions('lecturers', [
                'toggleAddLecturerModal',
                'fetchLecturers'
            ])
        },
        computed: {
            filteredLecturers() {
                if (this.searchQuery !== '') {
                    const searchQuery = this.searchQuery.charAt(0).toLowerCase() + this.searchQuery.slice(1);
                    return this.lecturers.filter(lecturer => {
                        return lecturer.name.toLowerCase().indexOf(searchQuery) > -1 ||
                            lecturer.address.toLowerCase().indexOf(searchQuery) > -1 ||
                            lecturer.email.toLowerCase().indexOf(searchQuery) > -1 ||
                            lecturer.phone.toLowerCase().indexOf(searchQuery) > -1
                    })
                }
                return this.lecturers;
            },
            ...mapGetters('lecturers', [
                'lecturers',
                'addLecturerModal',
                'isLoading'
            ])
        }
    }
</script>

<style scoped>

</style>
