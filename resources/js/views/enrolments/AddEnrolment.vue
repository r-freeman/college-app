<template>
    <div class="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-start sm:justify-center sm:my-24">
        <div class="fixed inset-0 transition-opacity">
            <div class="absolute inset-0 bg-black opacity-25"
                 @click="toggleAddEnrolmentModal"></div>
        </div>

        <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <ValidationObserver ref="observer" v-slot="{ passes, invalid, changed}">
                <form @submit.prevent="passes(addEnrolment)">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div
                                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                <Add class="h-5 w-5 fill-current text-green-500"/>
                            </div>
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full sm:w-2/3">
                                <h3 class="text-lg leading-6 font-semibold text-gray-900">
                                    Add Enrolment
                                </h3>
                                <div class="my-4 text-left">
                                    <ValidationProvider rules="required" v-slot="{ valid, errors }">
                                        <div class="mb-4">
                                            <label for="date"
                                                   class="block text-sm leading-5 font-semibold text-gray-700">Date</label>
                                            <div class="mt-1 relative rounded-md shadow-sm">
                                                <input v-model="date" id="date" type="date"
                                                       class="form-input date-picker block w-full pl-3 pr-2 sm:text-sm sm:leading-5 text-gray-700 tracking-wide focus:shadow-none focus:outline-none"
                                                       :class="[valid ? validClass : errors[0] ? errorClass : '']"/>
                                            </div>
                                            <p v-show="errors[0]" class="text-xs mt-1 font-semibold text-red-400">
                                                {{errors[0]}}</p>
                                        </div>
                                    </ValidationProvider>
                                    <ValidationProvider rules="required" v-slot="{ valid, errors }">
                                        <div class="mb-4">
                                            <label for="time"
                                                   class="block text-sm leading-5 font-semibold text-gray-700">Time</label>
                                            <div class="mt-1 relative rounded-md shadow-sm">
                                                <input v-model="time" id="time" type="time"
                                                       class="form-input block w-full pl-3 pr-3 sm:text-sm sm:leading-5 text-gray-700 tracking-wide focus:shadow-none focus:outline-none"
                                                       :class="[valid ? validClass : errors[0] ? errorClass : '']"/>
                                            </div>
                                            <p v-show="errors[0]" class="text-xs mt-1 font-semibold text-red-400">
                                                {{errors[0]}}</p>
                                        </div>
                                    </ValidationProvider>
                                    <ValidationProvider rules="required" v-slot="{ valid, errors }">
                                        <div class="mb-4">
                                            <label for="status"
                                                   class="block text-sm leading-5 font-semibold text-gray-700">Status</label>
                                            <div class="mt-1 relative rounded-md shadow-sm">
                                                <select v-model="status"
                                                        class="form-select block w-full px-3 sm:text-sm sm:leading-5 resize-none text-gray-700 tracking-wide focus:shadow-none focus:outline-none"
                                                        :class="[valid ? validClass : errors[0] ? errorClass : '']"
                                                        name="status"
                                                        id="status">
                                                    <option value="assigned">Assigned</option>
                                                    <option value="associate">Associate</option>
                                                    <option value="career_break">Career break</option>
                                                    <option value="interested">Interested</option>
                                                </select>
                                            </div>
                                            <p v-show="errors[0]" class="text-xs mt-1 font-semibold text-red-400">
                                                {{errors[0]}}</p>
                                        </div>
                                    </ValidationProvider>
                                    <ValidationProvider rules="required|integer"
                                                        v-slot="{ valid, errors }">
                                        <div class="mb-4">
                                            <label for="course"
                                                   class="block text-sm leading-5 font-semibold text-gray-700">Course</label>
                                            <div class="mt-1 relative rounded-md shadow-sm">
                                                <select v-model="course"
                                                        class="form-select block w-full pl-3 pr-12 sm:text-sm sm:leading-5 text-gray-700 tracking-wide focus:shadow-none focus:outline-none"
                                                        :class="[valid ? validClass : errors[0] ? errorClass : '']"
                                                        name="course"
                                                        id="course">
                                                    <option v-for="course in courses" :key="course.id"
                                                            :value="course.id">
                                                        {{course.title}}
                                                    </option>
                                                </select>
                                            </div>
                                            <p v-show="errors[0]" class="text-xs mt-1 font-semibold text-red-400">
                                                {{errors[0]}}</p>
                                        </div>
                                    </ValidationProvider>
                                    <ValidationProvider rules="required|integer"
                                                        v-slot="{ valid, errors }">
                                        <div class="mb-4">
                                            <label for="lecturer"
                                                   class="block text-sm leading-5 font-semibold text-gray-700">Lecturer</label>
                                            <div class="mt-1 relative rounded-md shadow-sm">
                                                <select v-model="lecturer"
                                                        class="form-select block w-full pl-3 pr-12 sm:text-sm sm:leading-5 text-gray-700 tracking-wide focus:shadow-none focus:outline-none"
                                                        :class="[valid ? validClass : errors[0] ? errorClass : '']"
                                                        name="lecturer"
                                                        id="lecturer">
                                                    <option v-for="lecturer in lecturers" :key="lecturer.id"
                                                            :value="lecturer.id">
                                                        {{lecturer.name}}
                                                    </option>
                                                </select>
                                            </div>
                                            <p v-show="errors[0]" class="text-xs mt-1 font-semibold text-red-400">
                                                {{errors[0]}}</p>
                                        </div>
                                    </ValidationProvider>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                            <button type="submit"
                                    class="inline-flex bg-gray-400 select-none justify-center w-full rounded-md border border-transparent px-4 py-2 text-base leading-6 font-medium text-white shadow-sm focus:outline-none transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                                    :class="[!invalid && changed ? enabledClass : '']"
                                    :disabled="invalid">
                            Submit
                            </button>
                        </span>
                        <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                            <button @click="toggleAddEnrolmentModal" type="button"
                                    class="inline-flex select-none justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                            Cancel
                            </button>
                        </span>
                    </div>
                </form>
            </ValidationObserver>
        </div>
    </div>
</template>

<script>
    import {ValidationProvider, ValidationObserver} from "vee-validate";
    import Add from "@/assets/svg/Add";
    import Check from "@/assets/svg/Check";
    import Cross from "@/assets/svg/Cross";
    import {mapGetters, mapActions} from "vuex";
    import _ from "lodash";

    export default {
        name: "AddEnrolment",
        data() {
            return {
                validClass: 'valid',
                errorClass: 'error',
                enabledClass: 'enabled'
            }
        },
        components: {
            ValidationProvider,
            ValidationObserver,
            Add,
            Check,
            Cross
        },
        created() {
            if (_.isEmpty(this.courses)) {
                this.fetchCourses();
            }
            if (_.isEmpty(this.lecturers)) {
                this.fetchLecturers();
            }
        },
        computed: {
            date: {
                get() {
                    return this.$store.state.enrolments.date;
                },
                set(val) {
                    this.$store.commit('enrolments/SET_DATE', val);
                }
            },
            time: {
                get() {
                    return this.$store.state.enrolments.time;
                },
                set(val) {
                    this.$store.commit('enrolments/SET_TIME', val);
                }
            },
            status: {
                get() {
                    return this.$store.state.enrolments.status;
                },
                set(val) {
                    this.$store.commit('enrolments/SET_STATUS', val);
                }
            },
            course: {
                get() {
                    return this.$store.state.enrolments.course_id;
                },
                set(val) {
                    this.$store.commit('enrolments/SET_COURSE_ID', val);
                }
            },
            lecturer: {
                get() {
                    return this.$store.state.enrolments.lecturer_id;
                },
                set(val) {
                    this.$store.commit('enrolments/SET_LECTURER_ID', val);
                }
            },
            ...mapGetters('courses', [
                'courses'
            ]),
            ...mapGetters('lecturers', [
                'lecturers'
            ])
        },
        methods: {
            toggleAddEnrolmentModal() {
                this.$emit('toggle-add-enrolment-modal');
            },
            addEnrolment() {
                this.$store.dispatch('enrolments/addEnrolment');
            },
            ...mapActions('courses', [
                'fetchCourses'
            ]),
            ...mapActions('lecturers', [
                'fetchLecturers'
            ])
        }
    }
</script>

<style src="@/assets/css/form.css" scoped>
</style>
