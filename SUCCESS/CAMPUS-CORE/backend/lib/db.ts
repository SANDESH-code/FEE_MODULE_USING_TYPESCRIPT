import mongoose from 'mongoose';
import { jwt_decode } from './auth';

if (!process.env.MONGODB_URL) {
  console.error("MONGODB_URL is not defined in .env file");
  process.exit(1);
}

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL!);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
})();

export interface User {
  _id?: string;
  rollno?: string;
  email: string;
  pass_hash: string;
  name: string;
  type: 'student' | 'faculty' | 'admin';
  courses?: mongoose.Types.ObjectId[];
}

const UserSchema = new mongoose.Schema<User>({
  email: { type: String, required: true, unique: true, lowercase: true },
  pass_hash: { type: String, required: true },
  name: { type: String, required: true },
  rollno: { type: String, required: false, unique: true, sparse: true, uppercase: true },
  type: { type: String, required: true, enum: ['student', 'faculty', 'admin'] },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
});

export const UserModel = mongoose.model<User>('User', UserSchema);

export interface Course {
  _id?: string;
  title: string;
  description: string;
  resource_link: string;
  attendance_needed: boolean;
}

const CourseSchema = new mongoose.Schema<Course>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  resource_link: { type: String, required: false },
  attendance_needed: { type: Boolean, required: true, default: false },
});

export const CourseModel = mongoose.model<Course>('Course', CourseSchema);

export interface Attendance {
  _id?: string;
  course_id: mongoose.Types.ObjectId;
  student_id: mongoose.Types.ObjectId;
  date: Date;
  marked_by: mongoose.Types.ObjectId;
}

const AttendanceSchema = new mongoose.Schema<Attendance>({
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  marked_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export const AttendanceModel = mongoose.model<Attendance>('Attendance', AttendanceSchema);

// ... [rest of your db.ts implementation remains the same]