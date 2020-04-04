<template>
    <div class="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-start sm:justify-center sm:my-24">
        <div class="fixed inset-0 transition-opacity">
            <div class="absolute inset-0 bg-black opacity-25"
                 @click="toggleEditLecturerModal"></div>
        </div>

        <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <ValidationObserver ref="observer" v-slot="{ passes, invalid, changed}">
                <form @submit.prevent="passes(editLecturer)">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div
                                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                                <Edit class="h-6 w-6 p-1 fill-current text-indigo-500"/>
                            </div>
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full sm:w-2/3">
                                <h3 class="text-lg leading-6 font-semibold text-gray-900">
                                    Edit Lecturer
                                </h3>
                                <div class="my-4 text-left">
                                    <ValidationProvider rules="required|max:50" v-slot="{ valid, errors }">
                                        <div class="mb-4">
                                            <label for="name"
                                                   class="block text-sm leading-5 font-semibold text-gray-700">Name</label>
                                            <div class="mt-1 relative rounded-md shadow-sm">
                                                <input v-model="name" id="name"
                                                       class="form-input block w-full pl-3 pr-8 sm:text-sm sm:leading-5 text-gray-700 tracking-wide focus:shadow-none focus:outline-none"
                                                       :class="[valid ? validClass : errors[0] ? errorClass : '']"/>
                                                <Check v-show="valid"
                                                       class="absolute right-0 w-4 h-4 -mt-7 mr-2 fill-current text-green-400"/>
                                                <Cross v-show="errors[0]"
                                                       class="absolute right-0 w-4 h-4 -mt-7 mr-2 fill-current text-red-400"/>
                                            </div>
                                            <p v-show="errors[0]" class="text-xs mt-1 font-semibold text-red-400">
                                                {{errors[0]}}</p>
                                        </div>
                                    </ValidationProvider>
                                    <ValidationProvider rules="required|max:100" v-slot="{ valid, errors }">
                                        <div class="mb-4">
                                            <label for="address"
                                                   class="block text-sm leading-5 font-semibold text-gray-700">Address</label>
                                            <div class="mt-1 relative rounded-md shadow-sm">
                                                <textarea v-model="address"
                                                          class="form-input block w-full px-3 sm:text-sm sm:leading-5 resize-none text-gray-700 tracking-wide focus:shadow-none focus:outline-none"
                                                          :class="[valid ? validClass : errors[0] ? errorClass : '']"
                                                          name="address"
                                                          id="address" cols="30">
                                                </textarea>
                                            </div>
                                            <p v-show="errors[0]" class="text-xs mt-1 font-semibold text-red-400">
                                                {{errors[0]}}</p>
                                        </div>
                                    </ValidationProvider>
                                    <ValidationProvider rules="required|email|max:50" v-slot="{ valid, errors }">
                                        <div class="mb-4">
                                            <label for="email"
                                                   class="block text-sm leading-5 font-semibold text-gray-700">Email</label>
                                            <div class="mt-1 relative rounded-md shadow-sm">
                                                <input v-model="email" id="email"
                                                       class="form-input block w-full pl-3 pr-12 sm:text-sm sm:leading-5 text-gray-700 tracking-wide focus:shadow-none focus:outline-none"
                                                       :class="[valid ? validClass : errors[0] ? errorClass : '']"/>
                                                <Check v-show="valid"
                                                       class="absolute right-0 w-4 h-4 -mt-7 mr-2 fill-current text-green-400"/>
                                                <Cross v-show="errors[0]"
                                                       class="absolute right-0 w-4 h-4 -mt-7 mr-2 fill-current text-red-400"/>
                                            </div>
                                            <p v-show="errors[0]" class="text-xs mt-1 font-semibold text-red-400">
                                                {{errors[0]}}</p>
                                        </div>
                                    </ValidationProvider>
                                    <ValidationProvider rules="required|max:20"
                                                        v-slot="{ valid, errors }">
                                        <div class="mb-4">
                                            <label for="phone"
                                                   class="block text-sm leading-5 font-semibold text-gray-700">Phone</label>
                                            <div class="mt-1 relative rounded-md shadow-sm">
                                                <input v-model="phone" id="phone"
                                                       class="form-input block w-full pl-3 pr-12 sm:text-sm sm:leading-5 text-gray-700 tracking-wide focus:shadow-none focus:outline-none"
                                                       :class="[valid ? validClass : errors[0] ? errorClass : '']"/>
                                                <Check v-show="valid"
                                                       class="absolute right-0 w-4 h-4 -mt-7 mr-2 fill-current text-green-400"/>
                                                <Cross v-show="errors[0]"
                                                       class="absolute right-0 w-4 h-4 -mt-7 mr-2 fill-current text-red-400"/>
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
                                    :disabled="!changed">
                            Update
                            </button>
                        </span>
                        <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                            <button @click="toggleEditLecturerModal" type="button"
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
    import {ValidationObserver, ValidationProvider} from "vee-validate";
    import Check from "@/assets/svg/Check";
    import Edit from "@/assets/svg/Edit";
    import Cross from "@/assets/svg/Cross";

    export default {
        name: "EditLecturer",
        data() {
            return {
                validClass: 'valid',
                errorClass: 'error',
                enabledClass: 'enabled'
            }
        },
        components: {
            ValidationObserver,
            ValidationProvider,
            Check,
            Edit,
            Cross
        },
        computed: {
            name: {
                get() {
                    return this.$store.state.lecturers._lecturer.name;
                },
                set(val) {
                    this.$store.commit('lecturers/EDIT_LECTURER_NAME', val);
                }
            },
            address: {
                get() {
                    return this.$store.state.lecturers._lecturer.address;
                },
                set(val) {
                    this.$store.commit('lecturers/EDIT_LECTURER_ADDRESS', val);
                }
            },
            email: {
                get() {
                    return this.$store.state.lecturers._lecturer.email;
                },
                set(val) {
                    this.$store.commit('lecturers/EDIT_LECTURER_EMAIL', val);
                }
            },
            phone: {
                get() {
                    return this.$store.state.lecturers._lecturer.phone;
                },
                set(val) {
                    this.$store.commit('lecturers/EDIT_LECTURER_PHONE', val);
                }
            }
        },
        methods: {
            toggleEditLecturerModal() {
                this.$emit('toggle-edit-lecturer-modal');
            },
            editLecturer() {
                this.$store.dispatch('lecturers/editLecturer');
            }
        }
    }
</script>

<style src="@/assets/css/form.css" scoped>
</style>
