export interface Data {
  succeeded: boolean;
  message: string;
  errors: any[];
  data: DetailCourse;
}

export interface DetailCourse {
  id: number;
  previousImage: string;
  name: string;
  objetives: string;
  description: string;
  indexLesson: string;
  bibliography: string;
  cvInstructor: string;
}
