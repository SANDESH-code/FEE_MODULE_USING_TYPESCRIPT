// C:\Users\chandhu\OneDrive\Desktop\SUCCESS\backend\routes\student\result.ts

import { Router, Request, Response } from 'express';
import * as db from '../../lib/db';
import { student_only } from '../../lib/middlewares';
import { z } from 'zod';
import mongoose from 'mongoose';

// Define a custom Request type to include the `user` property
interface CustomRequest extends Request {
  user?: db.User;
}

const router = Router();

// Zod schema for query parameters to get results
const GetResultsQuerySchema = z.object({
  semester: z.string().optional().transform(s => s ? parseInt(s) : undefined), // Optional semester number
  academic_year: z.string().optional(), // Optional academic year
});

/**
 * @route GET /api/v1/student/result
 * @description Get all result records or filter by semester/academic year for the logged-in student.
 * @access Student Only
 */
router.get('/', student_only, async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    if (!req.user || !req.user._id) {
      res.status(401).json({ error: 'Unauthorized: Student ID not found.' });
      return;
    }
    const studentId = req.user._id.toString();

    const query = GetResultsQuerySchema.safeParse(req.query);

    if (!query.success) {
      res.status(400).json({ error: 'Invalid query parameters', details: query.error.errors });
      return;
    }

    const { semester, academic_year } = query.data;

    let results: db.Result[];

    if (semester !== undefined && academic_year) {
      // Get specific semester's results
      const result = await db.getStudentResultBySemester(studentId, semester, academic_year);
      results = result ? [result] : [];
    } else {
      // Get all results for the student
      results = await db.getStudentResults(studentId);
    }

    if (results.length === 0) {
      res.status(404).json({ message: 'No result records found for this student based on the criteria.' });
      return;
    }

    res.status(200).json(results.map(result => ({
      _id: result._id?.toString(),
      semester: result.semester,
      academic_year: result.academic_year,
      course_results: result.course_results.map(cr => ({
        course_id: cr.course_id?.toString(),
        course_title: (cr.course_id as any)?.title || 'N/A', // Populated course title
        grade: cr.grade,
        marks: cr.marks
      })),
      gpa: result.gpa,
      published_date: result.published_date
    })));

  } catch (error: any) {
    console.error('Error fetching student results:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

/**
 * @route GET /api/v1/student/result/:resultId
 * @description Get a specific result record by ID for the logged-in student.
 * @access Student Only
 */
router.get('/:resultId', student_only, async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: 'Unauthorized: Student ID not found.' });
    }
    const studentId = req.user._id.toString();
    const resultId = req.params.resultId;

    if (!mongoose.Types.ObjectId.isValid(resultId)) {
      return res.status(400).json({ error: 'Invalid Result ID format.' });
    }

    const resultRecord = await db.ResultModel.findOne({
      _id: new mongoose.Types.ObjectId(resultId),
      student_id: new mongoose.Types.ObjectId(studentId)
    })
    .populate('course_results.course_id', 'title')
    .lean<db.Result>()
    .exec();

    if (!resultRecord) {
      return res.status(404).json({ message: 'Result record not found or does not belong to this student.' });
    }

    res.status(200).json({
      _id: resultRecord._id?.toString(),
      semester: resultRecord.semester,
      academic_year: resultRecord.academic_year,
      course_results: resultRecord.course_results.map(cr => ({
        course_id: cr.course_id?.toString(),
        course_title: (cr.course_id as any)?.title || 'N/A',
        grade: cr.grade,
        marks: cr.marks
      })),
      gpa: resultRecord.gpa,
      published_date: resultRecord.published_date
    });

  } catch (error: any) {
    console.error('Error fetching specific student result record:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

export default router;
