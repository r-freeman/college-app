<template>
    <div>
        <EditEnrolment v-if="editEnrolmentModal"
                       v-on:toggle-edit-enrolment-modal="toggleEditEnrolmentModal"/>
        <DeleteEnrolment v-if="deleteEnrolmentModal"
                         v-on:toggle-delete-enrolment-modal="toggleDeleteEnrolmentModal"
                         v-on:delete-enrolment="deleteEnrolment"/>

        <header class="bg-white border-b-2 border-gray-200">
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 h-18">
                <div class="flex h-8 justify-between items-center">
                    <h2 class="text-lg font-semibold leading-tight text-gray-900">
                        View Enrolment
                    </h2>
                    <button type="button"
                            @click="goBack"
                            class="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-400 hover:bg-blue-500 focus:outline-none transition duration-150 ease-in-out">
                        Back to Enrolments
                    </button>
                </div>
            </div>
        </header>
        <div class="w-full">
            <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div class="px-4 py-6 sm:px-0">
                    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div class="flex justify-between items-center px-4 py-5 border-b border-gray-200 sm:px-6">
                            <h3 class="text-lg leading-6 font-semibold text-gray-900">
                                Enrolment
                            </h3>
                            <div>
                                <button type="button"
                                        class="text-indigo-600 hover:text-indigo-900 font-semibold focus:outline-none"
                                        @click.prevent="toggleEditEnrolmentModal">
                                    Edit
                                </button>
                                <button type="button"
                                        class="ml-4 text-red-600 hover:text-red-900 font-semibold focus:outline-none"
                                        @click.prevent="toggleDeleteEnrolmentModal">Delete
                                </button>
                            </div>
                        </div>
                        <div>
                            <dl>
                                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm leading-5 font-medium text-gray-500">
                                        Date
                                    </dt>
                                    <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                        {{ enrolment.date | moment("Do MMMM YYYY") }}
                                    </dd>
                                </div>
                                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm leading-5 font-medium text-gray-500">
                                        Time
                                    </dt>
                                    <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                        {{ [enrolment.time, ["hh:mm:ss", "HH:mm:ss", "HH:mm"] ] | moment("hh:mm A") }}
                                    </dd>
                                </div>
                                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm leading-5 font-medium text-gray-500">
                                        Status
                                    </dt>
                                    <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                        <div
                                            class="text-xs font-bold rounded-full text-center uppercase py-1 px-3 inline antialiased"
                                            :class="enrolmentStatus(enrolment.status)">
                                            {{ enrolment.status.replace("_", " ") }}
                                        </div>
                                    </dd>
                                </div>
                                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm leading-5 font-medium text-gray-500">
                                        Course
                                    </dt>
                                    <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                        {{ enrolment.course.title }}
                                    </dd>
                                </div>
                                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm leading-5 font-medium text-gray-500">
                                        Lecturer
                                    </dt>
                                    <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                        {{ enrolment.lecturer.name }}
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
    import EditEnrolment from "./EditEnrolment";
    import DeleteEnrolment from "./DeleteEnrolment";
    import {mapGetters, mapActions} from "vuex";

    export default {
        name: "Enrolment",
        data() {
            return {
                interestedClass: 'interested',
                assignedClass: 'assigned',
                associateClass: 'associate',
                careerBreakClass: 'career-break'
            }
        },
        components: {
            EditEnrolment,
            DeleteEnrolment
        },
        created() {
            this.$emit("update:layout", Dashboard);
            this.$store.dispatch('enrolments/fetchEnrolment', this.$route.params.id);
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            enrolmentStatus(status) {
                if (status === 'interested') {
                    return this.interestedClass;
                } else if (status === 'assigned') {
                    return this.assignedClass;
                } else if (status === 'associate') {
                    return this.associateClass;
                } else if (status === 'career_break') {
                    return this.careerBreakClass;
                }
            },
            deleteEnrolment() {
                this.$store.dispatch('enrolments/deleteEnrolment', {id: this.$route.params.id})
                    .then(() => {
                        this.$router.push('/enrolments');
                    });
            },
            ...mapActions('enrolments', [
                'toggleEditEnrolmentModal',
                'toggleDeleteEnrolmentModal'
            ])
        },
        computed: {
            ...mapGetters('enrolments', [
                'enrolment',
                'editEnrolmentModal',
                'deleteEnrolmentModal'
            ])
        },
    }
</script>

<style scoped>
    .interested {
        @apply bg-blue-100 text-blue-400
    }

    .assigned {
        @apply bg-green-100 text-green-400
    }

    .associate {
        @apply bg-teal-100 text-teal-400
    }

    .career-break {
        @apply bg-orange-100 text-orange-400
    }
</style>
