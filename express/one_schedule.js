var CourseNode = require("./model/CourseNode");
var check_graduation = require("./check_graduation");
var check_graduation_by_prefer = require("./check_graduation_by_prefer");

module.exports = {
    /**
     * Get up to three course schedules for the user
     * @param  {List<List<CourseNode>>} all_semesters_list  The list of CourseNode list for all the semesters
     * @param  {List<Course>}           user_prefer_courses The list of user preferred courses
     * @return {List<CourseNode>}                           The list course schedules for the user
     */
    get_schedule: function get_schedule(all_semesters_list, user_prefer_courses) {
        let first_schedule = [];
        let second_schedule = [];
        let third_schedule = [];
        let all_schedules_list = [first_schedule, second_schedule, third_schedule];

        // return empty schedule if all_semesters_list is empty
        if (all_semesters_list.length == 0) {return all_schedules_list;}

        // check graduation
        let graudation_node_count = 0;
        let graudation_prefer_node_count = 0;
        for (var i = 0; i < all_semesters_list[all_semesters_list.length - 1].length; i++) {
            let curr_node = all_semesters_list[all_semesters_list.length - 1][i];
            if (check_graduation.check(curr_node.get_status)) {
                // check graudation with user preference
                if (check_graduation_by_prefer.check(curr_node.get_status, user_prefer_courses)) {
                    curr_node.change_node_value(5000);
                    graudation_prefer_node_count++;
                }
                graudation_node_count++; // count the number of course nodes that can graduate
            } else {
                curr_node.change_node_value(0);
            }
        }

        console.log();
        console.log("graudation_node_count: " + graudation_node_count);
        console.log("graudation_prefer_node_count: " + graudation_prefer_node_count);

        // return empty schedule if cannot graduate
        if (graudation_node_count == 0) {return all_schedules_list;}

        // update all CourseNode values by looping backwards starting from the second to last semester
        for (var i = all_semesters_list.length - 2; i >= 0; i--) {
            // looping over every course node in one semester
            for (var j = 0; j < all_semesters_list[i].length; j++) { // all_semesters_list[i][j] is a CourseNode
                // get indices of child CourseNode at the next semester
                let child_indices_list = all_semesters_list[i][j].get_child_indices;
                // calculate the sum of all child CourseNode values
                let sum = 0;
                for (var k = 0; k < child_indices_list.length; k++) {
                    sum += all_semesters_list[i + 1][child_indices_list[k]].get_value;
                }
                // change score of this CourseNode
                all_semesters_list[i][j].change_node_value(sum);
            }
        }

        // get all CourseNode values for the first semester
        let first_semester_values_list = [];
        let first_semester_positive_node_count = 0;
        for (var i = 0; i < all_semesters_list[0].length; i++) {
            let node_value = all_semesters_list[0][i].get_value;
            first_semester_values_list.push(node_value);
            if (node_value > 0) {first_semester_positive_node_count++;}
        }
        console.log("first_semester_values_list " + first_semester_values_list);
        
        // get the first schedule
        if (first_semester_positive_node_count > 0) {
            var max_first_semester_value = Math.max(...first_semester_values_list); // destructuring assignment to extract data from arrays into distinct variables
            var max_first_semester_index = first_semester_values_list.findIndex(element => element == max_first_semester_value);
            first_schedule = get_path_from_first_semester_course_node_index(max_first_semester_index, all_semesters_list);
        }

        // get the second schedule
        if (first_semester_positive_node_count > 1) {
            first_semester_values_list[max_first_semester_index] = -1; // replace the max value from the first schedule
            var second_max_first_semester_value = Math.max(...first_semester_values_list); // destructuring assignment to extract data from arrays into distinct variables
            var second_max_first_semester_index = first_semester_values_list.findIndex(element => element == second_max_first_semester_value);
            second_schedule = get_path_from_first_semester_course_node_index(second_max_first_semester_index, all_semesters_list);

        }

        // get the third schedule
        if (first_semester_positive_node_count > 2) {
            first_semester_values_list[second_max_first_semester_index] = -1; // replace the max value from the second schedule
            var third_max_first_semester_value = Math.max(...first_semester_values_list); // destructuring assignment to extract data from arrays into distinct variables
            var third_max_first_semester_index = first_semester_values_list.findIndex(element => element == third_max_first_semester_value);
            third_schedule = get_path_from_first_semester_course_node_index(third_max_first_semester_index, all_semesters_list);
        }

        all_schedules_list = [first_schedule, second_schedule, third_schedule];
        return all_schedules_list;
    },
};

/**
 * Get up to three course schedules for the user
 * @param  {Integer}                first_semester_index  The index of the CourseNode at the first semester
 * @param  {List<List<CourseNode>>} all_semesters_list    The list of CourseNode list for all the semesters
 * @return {List<CourseNode>}                             The list course schedules for the user
 */
function get_path_from_first_semester_course_node_index(first_semester_index, all_semesters_list) {
    let schedule = [];
    schedule.push(all_semesters_list[0][first_semester_index]); // add the first semester CoursNode
    
    let parent_index = first_semester_index;
    for (var i = 0; i < all_semesters_list.length - 1; i++) { // stop at the second last semester since we are extracting child nodes
        // find the best child CourseNode
        let child_indices_list = all_semesters_list[i][parent_index].get_child_indices;
        let child_values_list = [];
        for (var k = 0; k < child_indices_list.length; k++) {
            child_values_list.push(all_semesters_list[i+1][child_indices_list[k]].get_value); // get the child node value
        }
        let best_child_value = Math.max(...child_values_list); // destructuring assignment to extract data from arrays into distinct variables
        let best_child_index = child_values_list.findIndex(element => element == best_child_value); // only return the first max index

        // push the best child CourseNode into the schedule
        schedule.push(all_semesters_list[i+1][best_child_index]);
        // the best child CourseNode becomes the parent CourseNode for the next semester
        parent_index = best_child_index;
    }
    return schedule;
}


