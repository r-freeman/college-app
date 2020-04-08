<template>
    <div v-if="numItems > perPage"
         class="py-4 flex items-center justify-between my-3">
        <div class="flex-1 flex justify-between md:hidden items-center">
            <button type="button"
                    class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white focus:outline-none active:bg-gray-100 active:text-gray-700"
                    :disabled="currentPage === 1"
                    @click="prevPage">
                Previous
            </button>
            <div>
                <p class="text-sm leading-5 text-gray-700">
                    Showing
                    <span class="font-medium">{{ itemsStart }}</span>
                    to
                    <span class="font-medium">{{ itemsEnd }}</span>
                    of
                    <span class="font-medium">{{ numItems }}</span>
                    {{ itemName }}
                </p>
            </div>
            <button type="button"
                    class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white focus:outline-none active:bg-gray-100 active:text-gray-700"
                    :disabled="currentPage === numPages"
                    @click="nextPage">
                Next
            </button>
        </div>
        <div class="hidden md:flex-1 md:flex md:items-center md:justify-between">
            <div>
                <p class="text-sm leading-5 text-gray-700">
                    Showing
                    <span class="font-medium">{{ itemsStart }}</span>
                    to
                    <span
                        class="font-medium">{{ itemsEnd }}</span>
                    of
                    <span class="font-medium">{{ numItems }}</span>
                    {{ itemName }}
                </p>
            </div>
            <div>
                <span class="relative z-0 inline-flex shadow-sm">
                    <button type="button"
                            class="relative inline-flex items-center px-2 py-3 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 focus:outline-none active:bg-gray-100"
                            :disabled="currentPage === 1"
                            @click="prevPage">
                        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                  clip-rule="evenodd"/>
                        </svg>
                    </button>
                    <button v-for="(number) in numPages" type="button" @click="changePage(number)"
                            class="-ml-px relative inline-flex items-center px-4 py-3 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 focus:outline-none active:bg-gray-100"
                            :disabled="currentPage === number"
                            :class="currentPage === number ? activeClass : ''">
                        {{ number }}
                    </button>
                    <button type="button"
                            class="-ml-px relative inline-flex items-center px-2 py-3 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 focus:outline-none active:bg-gray-100"
                            :disabled="currentPage === numPages"
                            @click="nextPage">
                        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                  clip-rule="evenodd"/>
                        </svg>
                    </button>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Pager",
        data() {
            return {
                activeClass: 'active'
            }
        },
        props: {
            itemName: {
                type: String,
                required: true
            },
            numItems: {
                type: Number,
                required: true
            },
            perPage: {
                type: Number,
                required: true
            },
            currentPage: {
                type: Number,
                required: true
            }
        },
        computed: {
            itemsStart() {
                // return start counter of items, where n = 1 is current page number, p = 20 items per page, offset constant = 1
                // (n * p) - p = 20 + offset, is equal to 1, if n changes to 2 equals 21 and so on.
                return (this.currentPage * this.perPage) - this.perPage + 1;
            },
            itemsEnd() {
                // if on the last page return total num items, or (p * n + 1) - offset
                return this.currentPage === this.numPages ? this.numItems : (this.perPage * this.currentPage + 1) - 1;
            },
            numPages() {
                return Math.ceil(this.numItems / this.perPage);
            }
        },
        methods: {
            prevPage() {
                if (this.currentPage > 1) {
                    this.changePage(this.currentPage - 1);
                }
            },
            changePage(number) {
                this.$emit("change-page", number);
            },
            nextPage() {
                if (this.currentPage < this.numPages) {
                    this.changePage(this.currentPage + 1);
                }
            }
        }
    }
</script>

<style scoped>
    .active {
        @apply bg-whitesmoke
    }
</style>
