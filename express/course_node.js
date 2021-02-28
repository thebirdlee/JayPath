module.exports =  class course_node {
  constructor(course_status) {
    this.status = course_status;
    this.value = -1; // not used for iter3
    this.child_indices = []; // not used for iter3
    this.best_child_index = -1; // not used for iter3

    // extra use?
    this.semester = 0;
    this.curr_path = []; // used for recording the path, excluding itself.
    this.visited = false; // used for dfs
  }

  equals(another_course_node){
    for(let k of this.status.keys()){
      if(this.status.get(k) != another_course_node.get_status.get(k)){
        return false;
      }
    }
    return true;
  }

  get get_semester(){
    return this.semester;
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

  get get_best_child_index() {
  	return this.best_child_index;
  }

  get get_curr_path(){
    return this.curr_path;
  }

  add_one_child(index) {
    this.child_indices.push(index);
  }

  change_node_value(node_value) {
    this.value = node_value;
  }

  change_semester(s){
    this.semester = s;
  }

  set_best_child_index(index) {
    this.best_child_index = index;
  }

  push_to_path(courseNode){
    thsi.curr_path.push(courseNode);
  }

  set_path(path){
    this.curr_path = path;
  }

  ifVisited(){
    return this.visited;
  }

  setVisited(){
    this.visited = true;
  }

};