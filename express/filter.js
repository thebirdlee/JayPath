// const sqlite3 = require("sqlite3").verbose();
module.exports = {
    // filterByPre: function filterByPre(courseStatus, field, courses_track, courses_pre) {
    filterByPre: function filterByPre(courseStatus, field, term) {
        // id, CourseNumber, CourseTitle, Credits, Instructor, DaysOfWeek, 
        // StartTimeEndTime, Track, Prerequisite, Conflicts, Term, Area

        let eligible_course = [];
        let courseList = Array.from(courseStatus.keys());
        for (const [course, status] of courseStatus.entries()) {
            if (status == 0 && (course.Track == field || course.Track == "core" || course.Track == "elective") && (course.Term == term || course.Term == "Both")) {
                // consider to take
                let fulfill_flag = 1;
                let curr_pre = course.Prerequisite.split("-");
                for (var j = 0; j < curr_pre.length; j++) {
                    if (courseStatus.get(courseList[curr_pre[j]]) == 0) {
                        fulfill_flag = 0;  // not fulfill the prerequisite
                        break;
                    }
                }
                if (fulfill_flag == 1) {
                    eligible_course.push(course);  // add a course to courses
                }

            }
        }

        let priorityEligibleCourse = [];

        for (var i = 0; i < eligible_course.length; i++) {
            if (eligible_course[i].Track == field) {
                priorityEligibleCourse.push(eligible_course[i]);
            }
        }

        for (var i = 0; i < eligible_course.length; i++) {
            if (eligible_course[i].Track == 'core') {
                priorityEligibleCourse.push(eligible_course[i]);
            }
        }

        for (var i = 0; i < eligible_course.length; i++) {
            if (eligible_course[i].Track == 'elective') {
                priorityEligibleCourse.push(eligible_course[i]);
            }
        }

        return priorityEligibleCourse
    },
};
