module.exports = class Course {
  constructor(id, CourseNumber, CourseTitle, Credits, Instructor, DaysOfWeek, StartTimeEndTime, Track, Prerequisite, Conflicts, Term, Area) {
    this.id = id;
    this.CourseNumber = CourseNumber;
    this.CourseTitle = CourseTitle;
    this.Credits = Credits;
    this.Instructor = Instructor;
    this.DaysOfWeek = DaysOfWeek;
    this.StartTimeEndTime = StartTimeEndTime;
    this.Track = Track;
    this.Prerequisite = Prerequisite;
    this.Conflicts = Conflicts;
    this.Term = Term;
    this.Area = Area;
  }


  copy(){
    let copy = new Course(this.id, this.CourseTitle, this.Credits, this.Instructor, this.DaysOfWeek, this.StartTimeEndTime, this.Track, this.Prerequisite, this.Conflicts, this.Term, this.Area);
    return copy;
  }
};
