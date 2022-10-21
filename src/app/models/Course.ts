export interface CourseSemester {
  name: string;
  value: string;
}

export interface CourseYear {
  name: string;
  value: string;
  semesters?: CourseSemester[];
}