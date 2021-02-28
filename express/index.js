const Joi = require("joi");
const express = require("express");
const app = express();
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
// const schedule = require("./schedule");
const filter = require("./filter");
const store_schedule = require("./store_schedule");
const initial = require("./initial");
var Student = require('./model/Student');
var Schedule = require('./model/Schedule');
var CourseNode = require('./model/CourseNode');

var one_semester = require("./one_semester");
var all_semesters = require("./all_semesters");
var one_schedule = require("./one_schedule");
let rslt = [];

app.use(express.json());
app.use(cors());

// Initilization for database.
// Initialize all course status to 0.
let courseStatus = new Map();
let preferCourse = new Map();
let randomStudentName = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
let student = new Student(-1, randomStudentName, courseStatus, preferCourse);
initial.initilization(student);

// Initialize other user input
let field = "nlp";
let term = "Fall";
let semesters_left = 8;

// The frontend will sent req to this URL for information of courses so that the user can select which course they have taken.
app.get("/api/courses", (req, res) => {
    // Open the database
    let db = new sqlite3.Database("db/JayPath.db", err => {
        if (err) {
            console.error(err.message);
        }
        console.log("Connected to the courses database.");
    });
    let currCourse = [];

    // Extract all the courses and sent it back to the frontend for displaying.
    let sql = `SELECT * FROM courses;`;

    db.all(sql, (err, allCourses) => {
        if (err) {
            return console.error(err.message);
        }
        allCourses.forEach((allCourse) => {
            currCourse.push(allCourse);
        })
    });

    // Close database
    db.close(err => {
        if (err) {
            console.error(err.message);
        }
        console.log("Close the courses connection.");
        // send the result to frontend
        res.send(currCourse);
    });

});

app.get("/api/:field/courses1", (req, res) => {
    console.log("First path: ");
    field = req.params.field;
    let user_semester = [new CourseNode(courseStatus)];
    console.log("user_semester status: " + user_semester[0].get_status);
    let all_semesters_list = all_semesters.get_all_semesters(user_semester, field, term, semesters_left);
    let one_schedule_list = one_schedule.get_schedule(all_semesters_list, preferCourse);
    console.log("first schedule length: " + one_schedule_list[0].length);
    console.log("second schedule length: " + one_schedule_list[1].length);
    console.log("third schedule length: " + one_schedule_list[2].length);

    let curr_path = [];
    let dummy;
    for (let course_node of one_schedule_list[0]) {
        let course_node_status = course_node.get_status;
        for (let course_key of course_node_status.keys()) {
            // skip when the course is not in the schedule
            if (course_node_status.get(course_key) == 0) { continue; }
            // skip when the user has taken the course before
            if (user_semester[0].get_status.get(course_key) == 1) { continue; }

            let new_course = course_key;
            dummy = new_course;
            // make the new course doesn't appear in the current path
            let flag = true;
            for (let old_course of curr_path) {
                if (old_course.id == new_course.id) { flag = false; }
            }

            // add the new course into the current path
            if (flag) { curr_path.push(new_course); }
        }
    }

    // add dummy courses at the begging of the current path for display purpose
    while (curr_path.length < 24 && curr_path.length > 0) { curr_path.splice(0, 0, dummy); }

    store_schedule.store(student, JSON.stringify(curr_path));
    res.send(curr_path);
});

app.get("/api/:field/courses2", (req, res) => {
    console.log("Second path: ");
    field = req.params.field;
    let user_semester = [new CourseNode(courseStatus)];
    console.log("user_semester status: " + user_semester[0].get_status);
    let all_semesters_list = all_semesters.get_all_semesters(user_semester, field, term, semesters_left);
    let one_schedule_list = one_schedule.get_schedule(all_semesters_list, preferCourse);
    console.log("first schedule length: " + one_schedule_list[0].length);
    console.log("second schedule length: " + one_schedule_list[1].length);
    console.log("third schedule length: " + one_schedule_list[2].length);

    let curr_path = [];
    let dummy;
    for (let course_node of one_schedule_list[1]) {
        let course_node_status = course_node.get_status;
        for (let course_key of course_node_status.keys()) {
            // skip when the course is not in the schedule
            if (course_node_status.get(course_key) == 0) { continue; }
            // skip when the user has taken the course before
            if (user_semester[0].get_status.get(course_key) == 1) { continue; }

            let new_course = course_key;
            dummy = new_course;
            // make the new course doesn't appear in the current path
            let flag = true;
            for (let old_course of curr_path) {
                if (old_course.id == new_course.id) { flag = false; }
            }

            // add the new course into the current path
            if (flag) { curr_path.push(new_course); }
        }
    }

    // add dummy courses at the begging of the current path for display purpose
    while (curr_path.length < 24 && curr_path.length > 0) { curr_path.splice(0, 0, dummy); }

    store_schedule.store(student, JSON.stringify(curr_path));
    res.send(curr_path);
});

app.get("/api/:field/courses3", (req, res) => {
    console.log("Third path: ");
    field = req.params.field;
    let user_semester = [new CourseNode(courseStatus)];
    console.log("user_semester status: " + user_semester[0].get_status);
    let all_semesters_list = all_semesters.get_all_semesters(user_semester, field, term, semesters_left);
    let one_schedule_list = one_schedule.get_schedule(all_semesters_list, preferCourse);
    console.log("first schedule length: " + one_schedule_list[0].length);
    console.log("second schedule length: " + one_schedule_list[1].length);
    console.log("third schedule length: " + one_schedule_list[2].length);

    let curr_path = [];
    let dummy;
    for (let course_node of one_schedule_list[2]) {
        let course_node_status = course_node.get_status;
        for (let course_key of course_node_status.keys()) {
            // skip when the course is not in the schedule
            if (course_node_status.get(course_key) == 0) { continue; }
            // skip when the user has taken the course before
            if (user_semester[0].get_status.get(course_key) == 1) { continue; }

            let new_course = course_key;
            dummy = new_course;
            // make the new course doesn't appear in the current path
            let flag = true;
            for (let old_course of curr_path) {
                if (old_course.id == new_course.id) { flag = false; }
            }

            // add the new course into the current path
            if (flag) { curr_path.push(new_course); }
        }
    }

    // add dummy courses at the begging of the current path for display purpose
    while (curr_path.length < 24 && curr_path.length > 0) { curr_path.splice(0, 0, dummy); }

    store_schedule.store(student, JSON.stringify(curr_path));
    res.send(curr_path);
});

app.get("/api/:field/courses", (req, res) => {
    console.log("Returning schedules...");
    // send candidate courses to backend
    let field = String(req.params.field);
    let rslt = [];
    let user_semester = [new CourseNode(courseStatus)];
    console.log("user_semester status: " + user_semester[0].get_status);
    let all_semesters_list = all_semesters.get_all_semesters(user_semester, field, term, semesters_left);
    let one_schedule_list = one_schedule.get_schedule(all_semesters_list, preferCourse);

    for (let s of one_schedule_list) {
        let curr_path = [];
        for (let node of s) {
            let node_status = node.get_status;
            for (let k of node_status.keys()) {
                let course = node_status.get(k);
                let flag = true;
                for (let c of curr_path) {
                    if (c.id == course.id) {
                        flag = false;
                    }
                }
                if (flag) {
                    curr_path.push(course);
                }
            }
        }
        rslt.push(curr_path);
    }
    console.log("Below is the rslt!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log(rslt);
    res.send(rslt);
});

app.post("/api/user_info", (req, res) => {
    let courses_to_add = req.body;
    // Open and connect to database
    let db = new sqlite3.Database("db/JayPath.db", err => {
        if (err) {
            console.error(err.message);
        }
        console.log("Connected to the courses database.");
    });

    // Extract course according to the focus area and sent it back to the front end for displaying.
    let sql = `SELECT * FROM courses WHERE CourseTitle = ?;`;


    for (var i = 0; i < courses_to_add.length; i++) {
        db.get(sql, [courses_to_add[i].trim()], (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            for (const [course, status] of courseStatus.entries()) {
                if (course.CourseTitle == row.CourseTitle) {
                    courseStatus.set(course, 1); //update: course have taken
                    break;
                }
            }
        });
    }

    // Close database
    db.close(err => {
        if (err) {
            console.error(err.message);
        }
        console.log("Close the courses connection.");
    });
});

// API for student's current semester and semester he/she wants to enroll in
app.post("/api/semesters_info", (req, res) => {
    let val = parseInt(req.body[0]);
    if (val > 100) {//spring
        term = "Fall";
        semesters_left = 8 - (val % 100);
    } else {//fall
        term = "Spring";
        semesters_left = 8 - (val % 100);
    }
});



// API for courses the student wants to prioritize
app.post("/api/courses_prioritized", (req, res) => {
    let prefer_to_take = req.body;

    // Open and connect to database
    let db = new sqlite3.Database("db/JayPath.db", err => {
        if (err) {
            console.error(err.message);
        }
        console.log("Connected to the courses database.");
    });

    // Extract course according to the focus area and sent it back to the front end for displaying.
    let sql = `SELECT * FROM courses WHERE CourseTitle = ?;`;

    for (var i = 0; i < prefer_to_take.length; i++) {
        db.get(sql, [prefer_to_take[i].trim()], (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            for (const [course, status] of preferCourse.entries()) {
                if (course.CourseTitle == row.CourseTitle) {
                    preferCourse.set(course, 1); //update: course have taken
                    break;
                }
            }
        });
    }

    // Close database
    db.close(err => {
        if (err) {
            console.error(err.message);
        }
        console.log("Close the courses connection.");
    });
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Listening on port " + port));
