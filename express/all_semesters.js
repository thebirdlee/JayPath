var CourseNode = require("./model/CourseNode");
const one_semester = require("./one_semester");
const grad = require("./check_graduation");

module.exports = {
    /**
     * Get the CourseNode list for all next semester
     * @param  {List<CourseNode>} user_semester_list The CourseNode list for the user semester
     * @param  {String}           field              The focus area of the user
     * @param  {String}           term               The term (Fall or Spring) of the current semester
     * @param  {Integer}          semesters_left     The number of semesters left
     * @return {{List<List<CourseNode>>}             The list of CourseNode list for all the semesters
     */
    get_all_semesters: function get_all_semesters(user_semester_list, field, term, semesters_left) {
        let all_semesters = []; // store the CourseNode list for all the semesters
        
        let curr_semester_nodes_list = []; // the CourseNode list for the current semester
        while (all_semesters.length < semesters_left) {
            // generate the next semester nodes based on the previous semester nodes
            if (all_semesters.length == 0) { // use user semester if generating the first semester
                curr_semester_nodes_list = one_semester.get_one_semester(user_semester_list, field, term);
            } else {
                curr_semester_nodes_list = one_semester.get_one_semester(all_semesters[all_semesters.length - 1], field, term);
            }
            
            // exit if no more courses to take
            if (curr_semester_nodes_list.length == 0) {
                console.log("no more courses to take, exiting...");
                let testNodeList = [all_semesters[all_semesters.length - 1][0]];
                console.log(all_semesters[all_semesters.length - 1][0].get_status);
                return all_semesters;
            }

            // add current semester node list into all semesters
            all_semesters.push(curr_semester_nodes_list);
            
            // change term for generating next semester
            if (term == "Fall") { term = "Spring"; }
            else {term = "Fall";}
        }
        return all_semesters;
    }
};