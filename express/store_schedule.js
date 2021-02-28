const sqlite3 = require("sqlite3").verbose();
module.exports = {
    store: function store(student, schedule) {
        let db = new sqlite3.Database("db/JayPath.db", err => {
            if (err) {
                console.error(err.message);
            }
        });

        let sql = `INSERT INTO Schedules (Content, StudentID) VALUES (?, ?);`;

        db.run(sql, [schedule, student.id], function (err) {
            if (err) {
                return console.log(err.message);
            }
            console.log("Storing the schedule to database!");
        });

        // close the database
        db.close(err => {
            if (err) {
                console.error(err.message);
            }
        });
    },
};