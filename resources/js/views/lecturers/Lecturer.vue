<template>
    <div>
        <EditLecturer v-if="editLecturerModal"
                      v-on:toggle-edit-lecturer-modal="toggleEditLecturerModal"/>

        <DeleteLecturer v-if="deleteLecturerModal"
                        :enrolments="lecturer.enrolments"
                        v-on:toggle-delete-lecturer-modal="toggleDeleteLecturerModal"
                        v-on:delete-lecturer="deleteLecturer"/>

        <header class="bg-white border-b-2 border-gray-200">
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 h-18">
                <div class="flex items-center">
                    <h2 class="text-lg font-semibold leading-tight text-gray-900">
                        View Lecturer
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
                                Lecturer
                            </h3>
                            <div>
                                <button type="button"
                                        class="text-indigo-600 hover:text-indigo-900 font-semibold focus:outline-none"
                                        @click.prevent="toggleEditLecturerModal">
                                    Edit
                                </button>
                                <button type="button"
                                        class="ml-4 text-red-600 hover:text-red-900 font-semibold focus:outline-none"
                                        @click.prevent="toggleDeleteLecturerModal">Delete
                                </button>
                            </div>
                        </div>
                        <div>
                            <dl>
                                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm leading-5 font-medium text-gray-500">
                                        Name
                                    </dt>
                                    <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                        {{ lecturer.name }}
                                    </dd>
                                </div>
                                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm leading-5 font-medium text-gray-500">
                                        Address
                                    </dt>
                                    <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                        {{ lecturer.address }}
                                    </dd>
                                </div>
                                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm leading-5 font-medium text-gray-500">
                                        Email
                                    </dt>
                                    <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                        {{ lecturer.email }}
                                    </dd>
                                </div>
                                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm leading-5 font-medium text-gray-500">
                                        Phone
                                    </dt>
                                    <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                        {{ lecturer.phone }}
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
    import EditLecturer from "./EditLecturer";
    import DeleteLecturer from "./DeleteLecturer";

    export default {
        name: "Lecturer",
        components: {
            EditLecturer,
            DeleteLecturer
        },
        created() {
            this.$emit("update:layout", Dashboard);
            this.$store.dispatch('lecturers/fetchLecturer', this.$route.params.id);
        },
        methods: {
            deleteLecturer() {
                this.$store.dispatch('lecturers/deleteLecturer', this.$route.params.id)
                    .then(() => {
                        this.$router.push('/lecturers');
                    });
            },
            ...mapActions('lecturers', [
                'toggleEditLecturerModal',
                'toggleDeleteLecturerModal'
            ])
        },
        computed: {
            ...mapGetters('lecturers', [
                'lecturer',
                'editLecturerModal',
                'deleteLecturerModal'
            ])
        },
    }
</script>

<style scoped>

</style>
