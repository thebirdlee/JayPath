var Student = require('./model/Student');
const initial = require("./initial");

var CourseNode = require("./model/CourseNode");
var one_semester = require("./one_semester");
var all_semesters = require("./all_semesters");
var one_schedule = require("./one_schedule");

// initialization
let courseStatus = new Map();
let preferCourse = new Map();
let randomStudentName = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
let student = new Student(-1, randomStudentName, courseStatus, preferCourse);
initial.initilization(student);

// construct user input
let field = "r";
let term = "Fall";
let semesters_left = 8;

// initialize the user_semester_list
let user_semester_list = [new CourseNode(courseStatus)];

// Test case 1: one_semester
let one_semester_list = one_semester.get_one_semester(user_semester_list, field, term);
console.log("one_semester_list length: " + one_semester_list.length);
console.log("one_semester_list first element: " + one_semester_list[0]);
console.log();

// Test case 2: all_semesters
let all_semesters_list = all_semesters.get_all_semesters(user_semester_list, field, term, semesters_left);
console.log("all_semesters_list length: " + all_semesters_list.length);
console.log("all_semesters_list first element length: " + all_semesters_list[0].length);
console.log();

// Test case 3: one_schedule_list
let one_schedule_list = one_schedule.get_schedule(all_semesters_list, preferCourse);
console.log("first schedule: " + one_schedule_list[0].length);
console.log("second schedule: " + one_schedule_list[1].length);
console.log("third schedule: " + one_schedule_list[2].length);
console.log();
console.log("courseMap:");
courseMap = one_schedule_list[2][1].status;
console.log(courseMap);
console.log();