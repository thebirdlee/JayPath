const sqlite3 = require("sqlite3").verbose();
var Course = require('./model/Course');
module.exports = {
    initilization: function initilization(student) {
        // open the database
        let db = new sqlite3.Database("db/JayPath.db", err => {
            if (err) {
                console.error(err.message);
            }
            console.log("Connected to the courses database for initialization!");
        });
        db.run(
            "CREATE TABLE IF NOT EXISTS courses(id INTEGER NOT NULL PRIMARY KEY, CourseNumber TEXT, CourseTitle TEXT, Credits INTEGER, Instructor TEXT, DaysOfWeek TEXT, StartTimeEndTime TEXT, Track TEXT, Prerequisite STRING, Conflicts STRING, Term STRING, Area STRING)"
        );

        db.run(
            "CREATE TABLE IF NOT EXISTS Students(id INTEGER NOT NULL PRIMARY KEY, Name STRING)"
        );

        db.run(
            "CREATE TABLE IF NOT EXISTS Schedules(id INTEGER NOT NULL PRIMARY KEY, Content STRING, StudentID INTEGER)"
        );

        // hardcode for the first iteration: add courses manually
        // plan to retrive courses from SIS API in the following iteration

        // Track: big data, computational biology, nlp, Robotics, Information securities

        // TODO: Instead of hardcode like this, create all the course using the course class
        // TODO: Each course now will has a listOfPre attribuate
        courseInfo = [
            [
                0,
                "AS.110.302",
                "Differential Equations and Applications",
                4,
                "L. Sun",
                "M, T, W, F",
                "12:00PM - 12:50PM, 1:30PM - 2:20PM, 12:00PM - 12:50PM, 12:00PM - 12:50PM",
                "core",
                "",
                "3-25-38-19-8-26-16-23-27-33-42",
                "Both",
                "N/A"
            ],
            [
                1,
                "EN.601.104",
                "Computer Ethics",
                1,
                "T. Leschke",
                "W",
                "4:30PM - 6:30PM",
                "core",
                "",
                "",
                "Both",
                "N/A"
            ],
            [
                2,
                "EN.500.112",
                "Gateway Computing: JAVA",
                3,
                "S. More",
                "M, W, F",
                "9:00AM - 9:50AM, 9:00AM - 9:50AM, 9:00AM - 9:50AM",
                "core",
                "",
                "41",
                "Both",
                "N/A"
            ],
            [
                3,
                "EN.601.220",
                "Intermediate Programming",
                4,
                "D. Hovemeyer",
                "M, W, F",
                "12:00PM - 1:15PM, 12:00PM - 1:15PM, 12:00PM - 1:15PM",
                "core",
                "2",
                "25-38-0",
                "Both",
                "N/A"
            ],
            [
                4,
                "EN.601.226",
                "Data Structures",
                4,
                "J. Selinski",
                "M, W, F",
                "1:30PM - 2:45PM, 1:30PM - 2:45PM, 1:30PM - 2:45PM",
                "core",
                "3",
                "14-15-17-36-44",
                "Both",
                "N/A"
            ],
            [
                5,
                "EN.601.229",
                "Computer System Fundamentals",
                3,
                "P. Koehn",
                "M, W, F",
                "10:00AM - 10:50AM, 10:00AM - 10:50AM, 10:00AM - 10:50AM",
                "core",
                "3",
                "11-12-13-45",
                "Both",
                "N/A"
            ],
            [
                6,
                "EN.601.231",
                "Automata & Computation Theory",
                3,
                "S. Kosaraju",
                "T, Th",
                "9:00AM - 10:15AM, 9:00AM - 10:15AM",
                "core",
                "3",
                "18-29-34-39",
                "Both",
                "N/A"
            ],
            [
                7,
                "EN.601.433",
                "Intro Algorithms",
                3,
                "M. Dinitz",
                "T, Th",
                "12:00PM - 1:15PM, 12:00PM - 1:15PM",
                "core",
                "3-6-12",
                "40-9-20-24-28",
                "Both",
                "Theory"
            ],
            [
                8,
                "EN.601.290",
                "User Interfaces and Mobile Applications",
                3,
                "J. Selinski",
                "T, Th",
                "3:00PM - 4:15PM, 3:00PM - 4:15PM",
                "elective",
                "3",
                "19-26-16-23-27-33-42-0",
                "Spring",
                "N/A",
            ],
            [
                9,
                "EN.601.421",
                "Object Oriented Software Engineering",
                3,
                "A. Madooei",
                "T, Th",
                "12:00PM - 1:15PM, 12:00PM - 1:15PM",
                "elective",
                "3",
                "7-40-20-24-28",
                "Both",
                "Software"
            ],
            [
                10,
                "AS.110.108",
                "Calculus I",
                4,
                "J. Cutrone",
                "M",
                "8:00AM - 10:00AM",
                "core",
                "",
                "",
                "Fall",
                "N/A"
            ],
            [
                11,
                "AS.110.109",
                "Calculus II",
                4,
                "J. Kong",
                "M, T, Th, F",
                "10:00AM - 10:50AM, 10:00AM - 10:50AM, 4:30PM - 5:20PM, 10:00AM - 10:50AM",
                "core",
                "10",
                "5-12-13-45-23",
                "Both",
                "N/A"
            ],
            [
                12,
                "EN.553.171",
                "Discrete Mathematics",
                4,
                "B. Castello",
                "M, W, F, Th",
                "10:00AM - 10:50AM, 10:00AM - 10:50AM, 10:00AM - 10:50AM, 9:00AM - 9:50AM",
                "core",
                "",
                "5-6-11-13-18-29-34-39-45",
                "Both",
                "N/A"
            ],
            [
                13,
                "AS.110.201",
                "Linear Algebra",
                4,
                "J. Han",
                "MWF, Th",
                "10:00AM - 10:50AM, 10:00AM - 10:50AM, 10:00AM - 10:50AM, 1:30PM - 2:20",
                "core",
                "11",
                "5-11-12-45",
                "Both",
                "N/A"
            ],
            [
                14,
                "EN.553.420",
                "Intro to Probability",
                4,
                "J. Wierman",
                "M, W, F, Th",
                "1:30PM - 2:20PM, 1:30PM - 2:20PM, 1:30PM - 2:20PM, 10:30AM - 11:20AM",
                "core",
                "11-13",
                "4-15-17-36-44",
                "Both",
                "N/A"
            ],
            [
                15,
                "EN.553.430",
                "Introduction to Statistics",
                4,
                "D. Athreya",
                "MWF, Th",
                "1:30PM - 2:45PM, 1:30PM - 2:45PM, 1:30PM - 2:45PM, 9:00AM - 9:50AM",
                "core",
                "11-13-14",
                "4-6-14-17-18-29-34-36-39-44",
                "Both",
                "N/A"
            ],
            [
                16,
                "AS.270.114",
                "Guided Tour: The Planets",
                3,
                "K. Lewis, D. Sing",
                "T, Th",
                "3:00PM - 4:15PM, 3:00PM - 4:15PM",
                "core",
                "",
                "19-8-26-23-33-42-0",
                "Spring",
                "N/A"
            ],
            [
                17,
                "AS.050.116",
                "Visual Cognition",
                3,
                "L. Isik",
                "M, W",
                "1:30PM - 2:45PM, 1:30PM - 2:45PM",
                "core",
                "",
                "4-14-15-44",
                "Spring",
                "N/A"
            ],
            [
                18,
                "AS.171.108",
                "General Physics for Physical Science Majors(AL)",
                4,
                "D. Sing",
                "T, Th, F",
                "9:00AM - 10:15AM, 9:00AM - 10:15AM, 8:00AM - 8:50AM",
                "core",
                "",
                "6-12-34-45-39-15",
                "Spring",
                "N/A"
            ],
            [
                19,
                "AS.173.111",
                "General Physics Laboratory",
                1,
                "J. Mumford",
                "T",
                "1:30PM - 4:20PM",
                "core",
                "",
                "8-26-16-23-27-33-42-0",
                "Both",
                "N/A"
            ],
            [
                20,
                "AS.200.110",
                "Introduction to Cognitive Psychology",
                3,
                "J. Flombaum",
                "T, Th",
                "12:00PM - 1:15PM, 12:00PM - 1:15PM",
                "core",
                "",
                "7-40-9",
                "Spring",
                "N/A"
            ],
            [
                21,
                "AS.200.133",
                "Introduction to Social Psychology",
                3,
                "S. Drigotas",
                "M, W, F",
                "11:00AM - 11:50AM, 11:00AM - 11:50AM, 11:00AM - 11:50AM",
                "core",
                "",
                "30-46",
                "Both",
                "N/A"
            ],
            [
                22,
                "EN.661.110",
                "Professional Writing and Communication",
                3,
                "S. Smith",
                "T, Th",
                "10:30AM - 11:45AM, 10:30AM - 11:45AM",
                "core",
                "",
                "",
                "Both",
                "N/A"
            ],
            [
                23,
                "EN.601.315",
                "Databases",
                3,
                "D. Yarowsky",
                "T, Th",
                "3:00PM - 4:15PM, 3:00PM - 4:15PM",
                "bd",
                "3",
                "19-8-26-16-0-33-42-11",
                "Both",
                "Software"
            ],
            [
                24,
                "EN.601.434",
                "Randomized and Big Data Algorithms",
                3,
                "V. Braverman",
                "T, Th",
                "12:00PM - 1:15PM, 12:00PM - 1:15PM",
                "bd",
                "3",
                "7-9-28",
                "Fall",
                "N/A"
            ],
            [
                25,
                "EN.601.419",
                "Cloud Computing",
                3,
                "S. Ghorbani Khaledi",
                "M, W",
                "12:00PM - 1:15PM, 12:00PM - 1:15PM",
                "bd",
                "3",
                "3-38-0",
                "Both",
                "N/A"
            ],
            [
                26,
                "EN.601.350",
                "Genomic Data Science",
                3,
                "S. Salzberg",
                "T, Th",
                "3:00PM - 4:15PM, 3:00PM - 4:15PM",
                "cb",
                "3",
                "19-8-16-23-33-42-0",
                "Spring",
                "N/A"
            ],
            [
                27,
                "EN.601.455",
                "Computer Integrated Surgery",
                3,
                "R. Taylor",
                "T, Th",
                "1:30PM - 2:45PM, 1:30PM - 2:45PM",
                "cb",
                "3",
                "19-23-0",
                "Fall",
                "Applications"
            ],
            [
                28,
                "EN.601.447",
                "Computational Genomics: Sequences",
                3,
                "B. Langmead",
                "T, Th",
                "12:00PM - 1:15PM, 12:00PM - 1:15PM",
                "cb",
                "3",
                "7-9-24",
                "Fall",
                "Applications"
            ],
            [
                29,
                "EN.601.464",
                "Artificial Intelligence",
                3,
                "J. Sedoc, B. Van Durme",
                "T, Th",
                "9:00AM - 10:15AM, 9:00AM - 10:15AM",
                "nlp",
                "3",
                "6-19-34",
                "Fall",
                "Reasoning"
            ],
            [
                30,
                "EN.601.465",
                "Natural Language Processing",
                3,
                "K. Duh",
                "M, W, F",
                "11:00AM - 11:50AM, 11:00AM - 11:50AM, 11:00AM - 11:50AM",
                "nlp",
                "3",
                "21",
                "Fall",
                "Applications"
            ],
            [
                31,
                "EN.601.475",
                "Machine Learning",
                3,
                "P. Graff",
                "M, W, F",
                "4:30PM - 5:45PM, 4:30PM - 5:45PM, 4:30PM - 5:45PM",
                "nlp",
                "3-11-13-14-15",
                "",
                "Both",
                "Reasoning"
            ],
            [
                32,
                "EN.601.463",
                "Algorithms for Sensor-Based Robotics",
                3,
                "S. Leonard",
                "T, Th",
                "4:30PM - 5:45PM, 4:30PM - 5:45PM",
                "r",
                "3",
                "",
                "Both",
                "Applications"
            ],
            [
                33,
                "EN.601.456",
                "Computer Integrated Surgery II",
                3,
                "R. Taylor",
                "T, Th",
                "1:30PM - 2:45PM, 1:30PM - 2:45PM",
                "r",
                "3-26",
                "19-8-26-16-23-42-0",
                "Spring",
                "Applications"
            ],
            [
                34,
                "EN.601.461",
                "Computer Vision",
                3,
                "G. Hager",
                "T, Th",
                "9:00AM - 10:15AM, 9:00AM - 10:15AM",
                "r",
                "3-11-13-14-15",
                "6-18-29-39",
                "Both",
                "Applications"
            ],
            [
                35,
                "EN.650.672",
                "Security Analytics",
                3,
                "L. Ding",
                "M",
                "6:00PM - 8:30PM",
                "is",
                "3",
                "",
                "Fall",
                "N/A"
            ],
            [
                36,
                "EN.650.663",
                "Cloud Computing Security",
                3,
                "C. Monson",
                "F",
                "1:30PM - 4:00PM",
                "is",
                "3",
                "4-14-15",
                "Fall",
                "N/A"
            ],
            [
                37,
                "EN.650.624",
                "Network Security",
                3,
                "R. Johnston",
                "M, W",
                "3:00PM - 4:15PM, 3:00PM - 4:15PM",
                "is",
                "3",
                "43",
                "Spring",
                "Software"
            ],
            [
                38,
                "EN.601.445",
                "Pratical Cryptographic Systems",
                3,
                "M. Green",
                "M, W",
                "12:00PM - 1:15PM, 12:00PM - 1:15PM",
                "is",
                "3",
                "3-25-0",
                "Spring",
                "N/A"
            ],
            [
                39,
                "EN.601.454",
                "Augmented Reality",
                3,
                "N. Navab",
                "T, Th",
                "8:30AM - 10:15AM, 8:30AM - 10:15AM",
                "r",
                "3",
                "6-12-15-18-34-45",
                "Spring",
                "Applications"
            ],
            [
                40,
                "EN.601.466",
                "Information Retrieval and Web Agents",
                3,
                "S. Moreira",
                "T, Th",
                "12:00PM - 1:15PM, 12:00PM - 1:15PM",
                "bd",
                "3",
                "7-9-20",
                "Spring",
                "Applications"
            ],
            [
                41,
                "EN.601.482",
                "Machine Learning: Deep Learning",
                4,
                "S. Moreira",
                "M, W, F",
                "8:30AM - 9:45AM, 8:30AM - 9:45AM, 8:30AM - 9:45AM",
                "nlp",
                "3-11-13-14-15-30",
                "2",
                "Both",
                "Reasoning"
            ],
            [
                42,
                "EN.601.486",
                "Machine Learning: Artificial Intelligence System Design & Development",
                3,
                "M. Unberath",
                "T, Th",
                "1:30PM - 2:45PM, 1:30PM - 2:45PM",
                "nlp",
                "3-11-13-14-15-30",
                "19-8-26-16-23-33-0",
                "Spring",
                "N/A"
            ],
            [
                43,
                "AS.171.205",
                "Introduction to Practical Data Sciecne: Beautiful Data",
                3,
                "S. Szalay",
                "M, W",
                "3:00PM - 4:15PM, 3:00PM - 4:15PM",
                "core",
                "",
                "37",
                "Spring",
                "N/A"
            ],
            [
                44,
                "EN.553.402",
                "Research and Design in Applied Mathematics: Data Mining",
                4,
                "T. Budavari",
                "M, W, F",
                "1:30PM - 2:55PM, 1:30PM - 2:55PM, 1:30PM - 2:55PM",
                "core",
                "",
                "4-14-15-17",
                "Spring",
                "N/A"
            ],
            [
                45,
                "EN.553.361",
                "Introduction to Optimization",
                4,
                "Z. Lubberts",
                "M, W, Th, F",
                "10:00AM - 10:50AM, 10:00AM - 10:50AM, 9:00AM - 9:50AM, 10:00AM - 10:50AM",
                "core",
                "",
                "5-6-11-12-13-15-18-29-34-39",
                "Both",
                "N/A"
            ],
            [
                46,
                "EN.553.362",
                "Introduction to Optimization II",
                4,
                "D. Fishkind",
                "M, W, Th, F",
                "11:00AM - 11:50AM, 11:00AM - 11:50AM, 3:00PM - 3:50PM, 11:00AM - 11:50AM",
                "core",
                "45",
                "21",
                "Spring",
                "N/A"
            ]
        ];
        // create the statement for the insertion of just ONE record
        let queryInfo =
            "INSERT OR REPLACE INTO courses(id, CourseNumber, CourseTitle, Credits, Instructor, DaysOfWeek, StartTimeEndTime, Track, Prerequisite, Conflicts, Term, Area) " +
            "VALUES (?, ?, ? ,?, ?, ?, ? ,?, ?, ?, ?, ?)";

        // 'prepare' returns a 'statement' object which allows us to
        // bind the same query to different parameters each time we run it
        let statement = db.prepare(queryInfo);

        // run the query over and over for each inner array
        for (var i = 0; i < courseInfo.length; i++) {
            statement.run(courseInfo[i], function (err) {
                if (err) throw err;
            });
        }
        statement.finalize();

        for (var i = 0; i < courseInfo.length; i++) {
            currCourse = new Course(courseInfo[i][0], courseInfo[i][1], courseInfo[i][2], courseInfo[i][3], courseInfo[i][4], courseInfo[i][5], courseInfo[i][6], courseInfo[i][7], courseInfo[i][8], courseInfo[i][9], courseInfo[i][10], courseInfo[i][11]);
            student.courseStatus.set(currCourse, 0);
            student.preferCourse.set(currCourse, 0);
        }

        let sql = `INSERT INTO Students (Name) VALUES (?);`;
        let sql2 = `SELECT * FROM Students WHERE Name = ?;`;

        db.serialize(() => {
            db.run(sql, [student.name], function (err) {
                if (err) {
                    return console.log(err.message);
                }
                console.log("A new Student has been initialized!");
            })
                .get(sql2, [student.name], (err, row) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    student_ID = row.id;
                });
        });

        // close the database
        db.close(err => {
            if (err) {
                console.error(err.message);
            }
            student.id = student_ID;
            console.log("Close database for initialization!");
        });
    },
};
