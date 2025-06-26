// C:\Users\chandhu\OneDrive\Desktop\SUCCESS\app.ts
import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';

// Remove .ts extensions from imports
import { faculty_only, admin_only, student_only } from './lib/middlewares';
import login from './routes/login';
import user_info from './routes/user_info';
import admin_create_user from './routes/admin/create_user';
import admin_course from './routes/admin/course';
import student_course from './routes/student/course';
import faculty_attendance from './routes/faculty/attendance';

// Fee module imports (without .ts)
import student_fee from './routes/student/fee';
import admin_fee from './routes/admin/fee';

// Update the import path to a relative path if db.ts is in ./lib/
import * as db from './lib/db';
import * as auth from './lib/auth';

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use('/api/v1/student', student_only, student_course);
app.use('/api/v1/faculty', faculty_only, faculty_attendance);
app.use('/api/v1/student/fee', student_only, student_fee);
app.use('/api/v1/admin/fee', admin_only, admin_fee);

app.use('/api/v1', login);
app.use('/api/v1', user_info);
app.use('/api/v1', admin_only, admin_create_user);
app.use('/api/v1', admin_only, admin_course);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.originalUrl });
});

app.listen(process.env.PORT, () => {
  console.log(`Express running on port ${process.env.PORT}`);
});