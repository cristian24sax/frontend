export interface Courses {
  succeeded: boolean;
  message: string;
  errors: any[];
  data: DataCourses[];
}

export interface DataCourses {
  id: number;
  name: string;
  description: string;
  durationHours: number;
  nameLevel: string;
}
