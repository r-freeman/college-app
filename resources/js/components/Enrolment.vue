<template>
    <router-link :to="{name: 'viewEnrolment', params: {id: enrolment.id}}" tag="tr"
                 class="cursor-pointer">
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            <div class="flex items-center">
                <div>
                    <div class="text-sm leading-5 font-medium text-gray-900">
                        {{ enrolment.date | moment("Do MMMM YYYY") }}
                    </div>
                </div>
            </div>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            <div class="flex items-center">
                <div>
                    <div class="text-sm leading-5 font-medium text-gray-900">
                        {{ [enrolment.time, ["hh:mm:ss", "HH:mm:ss", "HH:mm"] ] | moment("hh:mm A") }}
                    </div>
                </div>
            </div>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            <div class="text-xs font-bold rounded-full text-center uppercase py-1 px-3 inline antialiased"
                 :class="enrolmentStatus(enrolment.status)">
                {{ enrolment.status.replace("_", " ") }}
            </div>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 font-medium text-gray-900">
            {{ enrolment.course.title }}
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 font-medium text-gray-900">
            {{ enrolment.lecturer.name }}
        </td>
    </router-link>
</template>

<script>
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
        props: ['enrolment'],
        methods: {
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
            }
        }
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
