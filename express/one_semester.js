const init = require("./initial");
const filter = require("./filter");
var CourseNode = require("./model/CourseNode");

module.exports = {
    /**
     * Get the CourseNode list for the next semester
     * @param  {List<CourseNode>} prev_semester_nodes_list The CourseNode list for the previous semester
     * @param  {String}           field                    The focus area of the user
     * @param  {String}           term                     The term (Fall or Spring) of the current semester
     * @return {List<CourseNode>}                          The CourseNode list for the current semester
     */
    get_one_semester: function get_one_semester(prev_semester_nodes_list, field, term) {
        console.log("prev_semester_nodes_list length: " + prev_semester_nodes_list.length);
        let curr_semester_nodes_list = []; // store the CourseNode list for current semester

        // loop for all CourseNode in the previous semester
        for (var i = 0; i < prev_semester_nodes_list.length; i++) {
            // get a list of child CourseNode based on a given course node
            let child_nodes_list = get_child_nodes(prev_semester_nodes_list[i], field, term);
            // add child CourseNode in the current semester nodes list
            // note: make sure there is no duplicates!!!
            for (var j = 0; j < child_nodes_list.length; j++) {
                // check if the child node is in the current semester nodes list
                let child_node_idx = curr_semester_nodes_list.findIndex(element => child_nodes_list[j].equals(element));
                if (child_node_idx == -1) {
                    // add a new child node into the current semester nodes list
                    curr_semester_nodes_list.push(child_nodes_list[j]);
                    // remember the child node index
                    prev_semester_nodes_list[i].add_one_child(curr_semester_nodes_list.length - 1);
                } else {
                    // remember the child node index
                    prev_semester_nodes_list[i].add_one_child(child_node_idx);
                }
            }
        }
        console.log("cur_semester_nodes_list length: " + curr_semester_nodes_list.length);
        return curr_semester_nodes_list;
    }
};

/**
 * Get the child CourseNode list from one CourseNode
 * @param  {CourseNode} prev_course_node The previous CourseNode
 * @param  {String}     field            The focus area of the user
 * @param  {String}     term             The term (Fall or Spring) of the current semester
 * @return {List<CourseNode>}            The child CourseNode list
 */
function get_child_nodes(prev_course_node, field, term) {
    let prev_course_status = prev_course_node.get_status; // get the course status {Map<Course, Integer>}
    let eligible_courses = filter.filterByPre(prev_course_status, field, term); // filter out all the eligible courses
    let child_nodes_list = select_from_eligible(prev_course_status, eligible_courses); // select child CourseNode from all the eligible courses
    return child_nodes_list;
}

/**
 * Get the child CourseNode list from one CourseNode
 * @param  {Map<Course, Integer>} prev_course_status The course status of the previous CourseNode
 * @param  {List<Course>}         eligible_courses   The eligible courses that the user can take
 * @return {List<CourseNode>}                        The child CourseNode list
 */
function select_from_eligible(prev_course_status, eligible_courses) {
    let child_nodes_list = [];

    // return empty list if no eligible courses
    if (eligible_courses.length == 0) {return child_nodes_list}
    
    let count = 0; // count the number of child CourseNode
    
    // loop over all the eligible courses
    for (let i = 0; i < eligible_courses.length; i++) {
        // get the conflict course ids for course1
        let course1_conflict_ids_str = eligible_courses[i].Conflicts.split("-");
        let conflict_ids = new Set();
        for(s of course1_conflict_ids_str) {conflict_ids.add(parseInt(s));}

        for (let j = i + 1; j < eligible_courses.length; j++) {
            // reject course2 if there is a time conflict
            if(conflict_ids.has(eligible_courses[j].id)) {continue;}

            // get the conflict course ids for course1
            let course2_conflict_ids_str = eligible_courses[j].Conflicts.split("-");
            let conflict_ids_2 = new Set();
            for(s of course2_conflict_ids_str) { conflict_ids_2.add(parseInt(s));}

            for (let k = j + 1; k < eligible_courses.length; k++) {
                // reject course3 if there is a time conflict
                if(conflict_ids.has(eligible_courses[k].id) || conflict_ids_2.has(eligible_courses[k].id)) {continue;}
                
                // Now we have found three courses that doesn't conflict
                // Add the CourseNode into child_nodes_list by updating the course status {Map<Course, Integer>} first
                let course_status_new = new Map();
                for(let c of prev_course_status.keys()){
                    course_status_new.set(c, prev_course_status.get(c));
                    if(c.id == eligible_courses[i].id || c.id == eligible_courses[j].id || c.id == eligible_courses[k].id){
                        course_status_new.set(c, 1);
                    }
                }

                // Add the CourseNode into child_nodes_list
                let course_node_new = new CourseNode(course_status_new);
                child_nodes_list.push(course_node_new);
                count++;
                if(count > 3){ // can generate 4 child nodes currently
                    i = Number.MAX_VALUE;
                    j = Number.MAX_VALUE;
                    k = Number.MAX_VALUE;
                }
            }
        }
        return child_nodes_list;
    }
}