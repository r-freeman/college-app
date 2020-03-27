<template>
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
                            <router-link to=""
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
                            <div>
                                <button @click="open = !open"
                                        class="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none">
                                    <img class="h-8 w-8 rounded-full"
                                         src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                         alt=""/>
                                </button>
                            </div>
                            <div v-if="open" @click="open = false"
                                 class="fixed top-0 right-0 bottom-0 left-0 w-full h-full">
                            </div>
                            <div v-if="open"
                                 class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                                <div class="py-1 rounded-md bg-white shadow-xs">
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        John Smith
                                    </a>
                                    <a @click="" href="#"
                                       class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Log Out
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    import Education from "@/assets/svg/Education";

    export default {
        name: "Nav",
        components: {
            Education
        },
        data() {
            return {
                open: false,
                activeClass: 'active'
            }
        },
        created() {
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
            }
        }
    }
</script>

<style scoped>
    .active {
        @apply text-white bg-bluegem
    }
</style>
