<template>
    <div class="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-start sm:justify-center sm:my-24 z-10">
        <div class="fixed inset-0">
            <div class="absolute inset-0 bg-black opacity-25"
                 @click="toggleAddCourseModal"></div>
        </div>

        <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <ValidationObserver ref="observer" v-slot="{ passes, invalid, changed}">
                <form @submit.prevent="passes(addCourse)">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div
                                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                <Add class="h-5 w-5 fill-current text-green-500"/>
                            </div>
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full sm:w-2/3">
                                <h3 class="text-lg leading-6 font-semibold text-gray-900">
                                    Add Course
                                </h3>
                                <div class="my-4 text-left">
                                    <ValidationProvider rules="required|alpha_spaces|max:50" v-slot="{ valid, errors }">
                                        <div class="mb-4">
                                            <label for="title"
                                                   class="block text-sm leading-5 font-semibold text-gray-700">Title</label>
                                            <div class="mt-1 relative rounded-md shadow-sm">
                                                <input v-model="title" id="title"
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
                                    <ValidationProvider rules="required|alpha_num|max:5" v-slot="{ valid, errors }">
                                        <div class="mb-4">
                                            <label for="code"
                                                   class="block text-sm leading-5 font-semibold text-gray-700">Code</label>
                                            <div class="mt-1 relative rounded-md shadow-sm">
                                                <input v-model="code" id="code"
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
                                    <ValidationProvider rules="required" v-slot="{ valid, errors }">
                                        <div class="mb-4">
                                            <label for="description"
                                                   class="block text-sm leading-5 font-semibold text-gray-700">Description</label>
                                            <div class="mt-1 relative rounded-md shadow-sm">
                                                <textarea v-model="description"
                                                          class="form-input block w-full px-3 sm:text-sm sm:leading-5 resize-none text-gray-700 tracking-wide focus:shadow-none focus:outline-none"
                                                          :class="[valid ? validClass : errors[0] ? errorClass : '']"
                                                          name="description"
                                                          id="description" cols="30">
                                                </textarea>
                                            </div>
                                            <p v-show="errors[0]" class="text-xs mt-1 font-semibold text-red-400">
                                                {{errors[0]}}</p>
                                        </div>
                                    </ValidationProvider>
                                    <ValidationProvider rules="required|integer|min_value:100|max_value:600"
                                                        v-slot="{ valid, errors }">
                                        <div class="mb-4">
                                            <label for="points"
                                                   class="block text-sm leading-5 font-semibold text-gray-700">Points</label>
                                            <div class="mt-1 relative rounded-md shadow-sm">
                                                <input v-model="points" id="points"
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
                                    <ValidationProvider rules="required|integer|min_value:7|max_value:10"
                                                        v-slot="{ valid, errors }">
                                        <div class="mb-4">
                                            <label for="level"
                                                   class="block text-sm leading-5 font-semibold text-gray-700">Level</label>
                                            <div class="mt-1 relative rounded-md shadow-sm">
                                                <input v-model="level" id="level"
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
                                    :disabled="invalid">Submit
                            </button>
                        </span>
                        <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                            <button @click="toggleAddCourseModal" type="button"
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

    export default {
        name: "AddCourse",
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
            // listen for escape key
            const handleEscape = (e) => {
                if (e.key === 'Esc' || e.key === 'Escape') {
                    // hide the nav dropdown
                    this.toggleAddCourseModal();
                }
            };

            // add event handler
            document.addEventListener('keydown', handleEscape);

            // remove event listener when component is about to be destroyed
            this.$once('hook:beforeDestroy', () => {
                document.removeEventListener('keydown', handleEscape);
            })
        },
        computed: {
            title: {
                get() {
                    return this.$store.state.courses.title;
                },
                set(val) {
                    this.$store.commit('courses/SET_TITLE', val);
                }
            },
            code: {
                get() {
                    return this.$store.state.courses.code;
                },
                set(val) {
                    this.$store.commit('courses/SET_CODE', val);
                }
            },
            description: {
                get() {
                    return this.$store.state.courses.description;
                },
                set(val) {
                    this.$store.commit('courses/SET_DESCRIPTION', val);
                }
            },
            points: {
                get() {
                    return this.$store.state.courses.points;
                },
                set(val) {
                    this.$store.commit('courses/SET_POINTS', val);
                }
            },
            level: {
                get() {
                    return this.$store.state.courses.level;
                },
                set(val) {
                    this.$store.commit('courses/SET_LEVEL', val);
                }
            }
        },
        methods: {
            toggleAddCourseModal() {
                this.$emit('toggle-add-course-modal');
            },
            addCourse() {
                this.$store.dispatch('courses/addCourse');
            }
        }
    }
</script>

<style src="@/assets/css/form.css" scoped>
</style>
