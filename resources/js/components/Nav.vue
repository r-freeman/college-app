<template>
    <div>
        <nav class="bg-iris">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <Education class="w-8 h-8 text-white fill-current"/>
                        </div>
                        <div class="hidden md:block">
                            <div class="ml-10 flex items-baseline">
                                <router-link to="/home"
                                             class="px-3 py-2 rounded-md text-sm font-semibold focus:outline-none focus:text-white"
                                             :class="[currentPage.includes('home') ? activeClass : 'text-tropicalblue hover:text-white']">
                                    Home
                                </router-link>
                                <router-link to="/courses"
                                             class="ml-4 px-3 py-2 rounded-md text-sm font-semibold focus:outline-none focus:text-white"
                                             :class="[currentPage.includes('course') ? activeClass : 'text-tropicalblue hover:text-white']">
                                    Courses
                                </router-link>
                                <router-link to=""
                                             class="ml-4 px-3 py-2 rounded-md text-sm font-semibold focus:outline-none focus:text-white"
                                             :class="[currentPage.includes('enrolment') ? activeClass : 'text-tropicalblue hover:text-white']">
                                    Enrolments
                                </router-link>
                                <router-link to=""
                                             class="ml-4 px-3 py-2 rounded-md text-sm font-semibold focus:outline-none focus:text-white"
                                             :class="[currentPage.includes('lecturer') ? activeClass : 'text-tropicalblue hover:text-white']">
                                    Lecturers
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div class="hidden md:block">
                        <div class="ml-4 flex items-center md:ml-6">
                            <div class="ml-3 relative">
                                <div v-if="open" @click="open = false"
                                     class="fixed inset-0 w-full h-full">
                                </div>
                                <div>
                                    <button @click="open = !open"
                                            class="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none">
                                        <img class="h-8 w-8 rounded-full"
                                             :src="Avatar"
                                             alt=""/>
                                    </button>
                                </div>
                                <transition
                                    enter-active-class="transition ease-out duration-100"
                                    enter-class="transform opacity-0 scale-75"
                                    enter-to-class="transform opacity-100 scale-100"
                                    leave-active-class="transition ease-in duration-100"
                                    leave-class="transform opacity-100 scale-100"
                                    leave-to-class="transform opacity-0 scale-75">
                                    <div v-if="open"
                                         class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                                        <div class="py-1 rounded-md bg-white shadow-xs">
                                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                Settings
                                            </a>
                                            <a @click="logout" href="#"
                                               class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                Log Out
                                            </a>
                                        </div>
                                    </div>
                                </transition>
                            </div>
                        </div>
                    </div>
                    <div class="-mr-2 flex md:hidden">
                        <button @click="open = !open"
                                class="inline-flex items-center justify-center p-2 text-tropicalblue hover:text-white focus:outline-none focus:text-white">
                            <svg class="w-8 h-8 fill-current" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path :class="[!open ? 'inline-flex' : 'hidden']"
                                      d="M4 6h16M4 12h16m-7 6h7"/>
                                <path :class="[!open ? 'hidden' : 'inline-flex']"
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div v-if="open" class="md:hidden">
                <div class="px-2 pt-2 pb-3 sm:px-3">
                    <router-link to="home"
                                 class="block px-3 py-2 rounded-md text-base font-semibold focus:outline-none focus:text-white"
                                 :class="[currentPage.includes('home') ? activeClass : 'text-tropicalblue hover:text-white']">
                        Home
                    </router-link>
                    <router-link to="courses"
                                 class="mt-1 block px-3 py-2 rounded-md text-base font-semibold focus:outline-none focus:text-white"
                                 :class="[currentPage.includes('courses') ? activeClass : 'text-tropicalblue hover:text-white']">
                        Courses
                    </router-link>
                    <router-link to="enrolments"
                                 class="mt-1 block px-3 py-2 rounded-md text-base font-semibold focus:outline-none focus:text-white"
                                 :class="[currentPage.includes('enrolments') ? activeClass : 'text-tropicalblue hover:text-white']">
                        Enrolments
                    </router-link>
                    <router-link to="lecturers"
                                 class="mt-1 block px-3 py-2 rounded-md text-base font-semibold focus:outline-none focus:text-white"
                                 :class="[currentPage.includes('lecturers') ? activeClass : 'text-tropicalblue hover:text-white']">
                        Lecturers
                    </router-link>
                </div>
                <div class="pt-4 pb-3 border-b border-gray-200 bg-white">
                    <div class="flex items-center px-5">
                        <div class="flex-shrink-0">
                            <img class="h-10 w-10 rounded-full"
                                 :src="Avatar"
                                 alt=""/>
                        </div>
                        <div class="ml-3">
                            <div class="text-base font-semibold leading-none text-gray-700">{{ user.name }}</div>
                            <div class="mt-1 text-sm leading-none text-gray-400">{{ user.email }}</div>
                        </div>
                    </div>
                    <div class="mt-3 px-2">
                        <a href="#"
                           class="mt-1 block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100">Settings</a>
                        <a @click="logout" href="#"
                           class="mt-1 block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100">Log
                            Out</a>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    import Education from "@/assets/svg/Education";
    import Avatar from "@/assets/images/avatar.png";
    import {mapGetters, mapActions} from "vuex";

    export default {
        name: "Nav",
        components: {
            Education
        },
        data() {
            return {
                Avatar,
                open: false,
                activeClass: 'active'
            }
        },
        created() {
            this.fetchUser();

            // listen for escape key
            const handleEscape = (e) => {
                if (e.key === 'Esc' || e.key === 'Escape') {
                    // hide the nav dropdown
                    this.open = false;
                }
            };

            // add event handler
            document.addEventListener('keydown', handleEscape);

            // remove event listener when component is about to be destroyed
            this.$once('hook:beforeDestory', () => {
                document.removeEventListener('keydown', handleEscape);
            })
        },
        computed: {
            currentPage() {
                return this.$route.name.toLowerCase();
            },
            ...mapGetters('auth', ['user'])
        },
        methods: {
            logout() {
                this.$store.dispatch('auth/logout')
                    .then(() => {
                        this.$router.push('/login');
                    }).catch(e => {

                });
            },
            ...mapActions('auth', ['fetchUser'])
        }
    }
</script>

<style scoped>
    .active {
        @apply text-white bg-bluegem
    }
</style>
