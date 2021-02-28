module.exports = class Admin {
    constructor(id) {
        this.id = id;
    }
    // Functions below are Nice-to-have functions for an admin to 
    // open the database and change the course information. 
    setCourseTime(courseTitle, newTime){ 
    	let db = new sqlite3.Database("../db/JayPath.db", err => {
	        if (err) {
	            console.error(err.message);
	        }
	        console.log("Connected to the courses database.");
	    });
	    
    	let sql = `SELECT * FROM courses WHERE CourseTitle = ?;`;
        for (var i = 0; i < course_id.length; i++) {
            db.all(sql, [course_id[i]], (err, allcourse) => {
                if (err) {
                    return console.error(err.message);
                }
                allcourse.forEach(course => {
                    courses.push(course);
                })
            });
        }

	    // Close database
	    db.close(err => {
	        if (err) {
	            console.error(err.message);
	        }
	        console.log("Close the courses connection.");
	        // send the result to frontend
	        res.send(currCourse);
	    });
    } 


    setCourseTrack(){ 
        let db = new sqlite3.Database("../db/JayPath.db", err => {
	        if (err) {
	            console.error(err.message);
	        }
	        console.log("Connected to the courses database.");
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
    } 


    setCoursePre(){ 
        let db = new sqlite3.Database("../db/JayPath.db", err => {
	        if (err) {
	            console.error(err.message);
	        }
	        console.log("Connected to the courses database.");
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
    }
}