module.exports =  class CourseNode {
  constructor(course_status) {
    this.status = course_status; // Map<Course, Integer>, record if any course is taken or not
    this.value = -1; // Integer, record value based on graduation requirement
    this.child_indices = []; // List<Integer>, index positions of its child nodes at next semester
  }

  // compare to CourseNode
  equals(AnotherCourseNode){
    for(let k of this.status.keys()){
      if(this.status.get(k) != AnotherCourseNode.get_status.get(k)){
        return false;
      }
    }
    return true;
  }

  // getter
  get get_status() {
  	return this.status;
  }

  get get_value() {
  	return this.value;
  }

  get get_child_indices() {
  	return this.child_indices;
  }

  // method
  add_one_child(index) {
    this.child_indices.push(index);
  }

  change_node_value(node_value) {
    this.value = node_value;
  }
};