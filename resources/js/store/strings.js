// common
export const SUCCESS = 'Success';
export const ERROR = 'Error';

// courses
export const COURSES_RETRIEVE_FAILED = 'Failed to retrieve courses.';
export const COURSE_ADDED = 'Course was added successfully.';
export const COURSE_ADD_FAILED = 'Failed to add course.';
export const COURSE_UPDATED = 'Course was updated successfully.';
export const COURSE_UPDATE_FAILED = 'Failed to update course.';
export const COURSE_DELETED = 'Course was deleted successfully.';
export const COURSE_DELETE_FAILED = 'Failed to delete course.';
export const COURSE_MODAL_DELETE_TEXT = 'Are you sure you want to delete this course? This action cannot be undone.';
export const COURSE_ENROLMENTS_MODAL_DELETE_TEXT = (enrolmentCount) => {
    return `This course belongs to ${enrolmentCount} enrolments and cannot be deleted.`
};

// lecturers
export const LECTURERS_RETRIEVE_FAILED = 'Failed to retrieve lecturers.';
