module.exports = {
    check: function check(courseStatus, preferCourse) {
        // check areas: 3 of Applications, Systems, Software, Reasoning, Theory
        // check credits
        let areas = [0, 0, 0, 0, 0];
        let credits = 0;

        for (const [course, status] of courseStatus.entries()) {
            if (status == 1) {
                // have taken this course
                if (course.Area == "Applications") {
                    areas[0]++;
                } else if (course.Area == "Systems") {
                    areas[1]++;
                } else if (course.Area == "Software") {
                    areas[2]++;
                } else if (course.Area == "Reasoning") {
                    areas[3]++;
                } else if (course.Area == "Theory") {
                    areas[4]++;
                }
                credits += course.Credits;
            }
        }

        // check graduation
        let area_count = 0;
        for (var i = 0; i < areas.length; i++) {
            if (areas[i] >= 1) {
                area_count++;
            }
        }
        if (area_count >= 2 && credits >= 60) {
            let fulfill_flag = 1;
            for (const [course, status] of preferCourse.entries()) {
                if (status == 1) {
                    if (courseStatus.get(course) == 0) {
                        fulfill_flag = 0;
                        break;
                    }
                }
            }
            if (fulfill_flag == 1) {
                return true;
            }
        }
        return false;
    },
};