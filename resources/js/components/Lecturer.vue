<template>
    <router-link :to="{name: 'viewLecturer', params: {id: lecturer.id}}" tag="tr"
                 class="cursor-pointer">
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            <div class="flex items-center">
                <div>
                    <div class="text-sm leading-5 font-medium text-gray-900">
                        {{ lecturer.name }}
                    </div>
                </div>
            </div>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            <div class="flex items-center">
                <div>
                    <div class="text-sm leading-5 font-medium text-gray-900">
                        {{ lecturer.address }}
                    </div>
                </div>
            </div>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            <div class="text-sm leading-5 font-medium text-gray-900">
                {{ lecturer.email }}
            </div>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 font-medium text-gray-900">
            {{ lecturer.phone }}
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 font-medium text-gray-900">
            {{ lecturerEnrolments }}
        </td>
    </router-link>
</template>

<script>
    export default {
        name: "Lecturer",
        props: ['lecturer'],
        computed: {
            lecturerEnrolments() {
                return this.lecturer.enrolments !== undefined ? this.lecturer.enrolments.length : 0;
            }
        }
    }
</script>

<style scoped>

</style>
