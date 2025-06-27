// C:\Users\chandhu\OneDrive\Desktop\SUCCESS\backend\routes\student\fee.ts

import { Router, Request, Response } from 'express'; // Import Request, Response for better typing
import * as db from '../../lib/db';
import { student_only } from '../../lib/middlewares';
import { z } from 'zod';
import mongoose from 'mongoose';

// Define a custom Request type to include the `user` property
interface CustomRequest extends Request {
  user?: db.User; // `student_only` middleware adds `user`
}

const router = Router();

// Zod schema for semester query parameter
const GetFeeRecordsQuerySchema = z.object({
  semester: z.string().optional().transform(s => s ? parseInt(s) : undefined), // Convert to number
  academic_year: z.string().optional(),
});


/**
 * @route GET /api/v1/student/fee
 * @description Get fee records for the logged-in student.
 * Can filter by semester and academic year.
 * @access Student Only
 */
router.get('/', student_only, async (req: CustomRequest, res: Response) => {
  try {
    // Ensure req.user exists and has an _id
    if (!req.user || !req.user._id) {
      res.status(401).json({ error: 'Unauthorized: Student ID not found.' });
      return;
    }
    const studentId = req.user._id.toString(); // Convert ObjectId to string for functions

    const query = GetFeeRecordsQuerySchema.safeParse(req.query);
    if (!query.success) {
      res.status(400).json({ error: 'Invalid query parameters', details: query.error.errors });
      return;
    }

    const { semester, academic_year } = query.data;

    let feeRecords: db.Fee[];

    if (semester || academic_year) {
      // If specific semester/academic_year is requested
      const filter: any = { student_id: studentId };
      if (semester !== undefined) filter.semester = semester;
      if (academic_year) filter.academic_year = academic_year;

      feeRecords = await db.FeeModel.find(filter).lean().exec();
    } else {
      // Get all fee records for the student if no filter is specified
      feeRecords = await db.getStudentFees(studentId);
    }

    if (feeRecords.length === 0) {
      res.status(404).json({ message: 'No fee records found for this student based on criteria.' });
      return;
    }

    res.status(200).json(feeRecords.map(record => ({
      _id: record._id?.toString(), // Convert ObjectId to string
      semester: record.semester,
      academic_year: record.academic_year,
      total_amount: record.total_amount,
      paid_amount: record.paid_amount,
      balance_amount: record.total_amount - record.paid_amount, // Calculate balance dynamically
      payment_status: record.payment_status,
      due_date: record.due_date,
      payment_history: record.payment_history.map(t => ({
        amount: t.amount,
        payment_date: t.payment_date,
        transaction_id: t.transaction_id,
        payment_method: t.payment_method
      }))
    })));
    return;

  } catch (error: any) {
    console.error('Error fetching student fee records:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

/**
 * @route GET /api/v1/student/fee/current
 * @description Get current semester fee for the logged-in student.
 * @access Student Only
 */
router.get('/current', student_only, async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user || !req.user._id) {
      res.status(401).json({ error: 'Unauthorized: Student ID not found.' });
      return;
    }
    const studentId = req.user._id.toString();

    const fee = await db.getCurrentSemesterFee(studentId);
    if (!fee) {
      res.status(404).json({ error: "No upcoming fee record found for current semester." });
      return;
    }

    res.status(200).json({
      _id: fee._id?.toString(),
      semester: fee.semester,
      academic_year: fee.academic_year,
      total_amount: fee.total_amount,
      paid_amount: fee.paid_amount,
      balance_amount: fee.total_amount - fee.paid_amount,
      payment_status: fee.payment_status,
      due_date: fee.due_date,
      payment_history: fee.payment_history.map(t => ({
        amount: t.amount,
        payment_date: t.payment_date,
        transaction_id: t.transaction_id,
        payment_method: t.payment_method
      }))
    });
    return;
  } catch (error: any) {
    console.error('Error fetching current semester fee:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

/**
 * @route GET /api/v1/student/fee/:feeId
 * @description Get a specific fee record by ID for the logged-in student.
 * @access Student Only
 */
router.get('/:feeId', student_only, async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user || !req.user._id) {
      res.status(401).json({ error: 'Unauthorized: Student ID not found.' });
      return;
    }
    const studentId = req.user._id.toString();
    const feeId = req.params.feeId;

    const feeRecord = await db.FeeModel.findOne({
      _id: new mongoose.Types.ObjectId(feeId),
      student_id: new mongoose.Types.ObjectId(studentId)
    }).lean<db.Fee>().exec();

    if (!feeRecord) {
      res.status(404).json({ message: 'Fee record not found or does not belong to this student.' });
      return;
    }

    res.status(200).json({
      _id: feeRecord._id?.toString(),
      semester: feeRecord.semester,
      academic_year: feeRecord.academic_year,
      total_amount: feeRecord.total_amount,
      paid_amount: feeRecord.paid_amount,
      balance_amount: feeRecord.total_amount - feeRecord.paid_amount,
      payment_status: feeRecord.payment_status,
      due_date: feeRecord.due_date,
      payment_history: feeRecord.payment_history.map(t => ({
        amount: t.amount,
        payment_date: t.payment_date,
        transaction_id: t.transaction_id,
        payment_method: t.payment_method
      }))
    });

  } catch (error: any) {
    console.error('Error fetching specific student fee record:', error);
    if (error.name === 'CastError' && error.path === '_id') {
      res.status(400).json({ error: 'Invalid Fee ID format.' });
      return;
    }
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});


export default router;
